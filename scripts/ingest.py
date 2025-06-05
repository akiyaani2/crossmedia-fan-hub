# scripts/ingest.py

import os
import requests
from supabase import create_client, Client
from dotenv import load_dotenv
import logging

# --- Setup --- 
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

load_dotenv() # Load environment variables from .env file

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
EMBED_API_URL = os.environ.get("EMBEDDING_SERVICE_URL", "http://localhost:8000/embed")

if not SUPABASE_URL or not SUPABASE_KEY:
    logging.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.")
    exit(1)

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    logging.info("Supabase client initialized successfully.")
except Exception as e:
    logging.error(f"Failed to initialize Supabase client: {e}")
    exit(1)

def call_embedding_service(text_content: str) -> dict | None:
    """Calls the embedding service API for the given text."""
    try:
        response = requests.post(EMBED_API_URL, json={"modality": "text", "data": text_content})
        response.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Error calling embedding service: {e}")
        return None
    except Exception as e:
        logging.error(f"Unexpected error during embedding service call: {e}")
        return None

def process_unembedded_works():
    """Fetches text works without embeddings and processes them."""
    logging.info("Checking for unembedded text works...")

    try:
        # Fetch works of type 'text' with non-null body
        # Check if an embedding already exists for this work ID and 'text' modality
        # Note: This assumes `asset_embeddings.asset_id` maps to `works.id`
        # Adjust table/column names if your schema is different.
        response = supabase.rpc(
            'get_unembedded_text_works' # Name of the SQL function we need to create
            # We could also do this with a complex select/join query, 
            # but an RPC function is cleaner.
        ).execute()

        if not response.data:
            logging.info("No new text works found to embed.")
            return

        works_to_process = response.data
        logging.info(f"Found {len(works_to_process)} text works to process.")

        processed_count = 0
        error_count = 0

        for work in works_to_process:
            work_id = work.get('id')
            work_body = work.get('body')
            work_title = work.get('title') # Assuming title exists for media_assets
            work_creator = work.get('creator_id') # Assuming creator_id exists

            if not work_id or not work_body:
                logging.warning(f"Skipping work due to missing ID or body: {work}")
                error_count += 1
                continue

            logging.info(f"Processing work ID: {work_id} Title: {work_title[:50]}...")

            # 1. Get embeddings
            embedding_data = call_embedding_service(work_body)
            if not embedding_data:
                logging.error(f"Failed to get embedding for work ID: {work_id}. Skipping.")
                error_count += 1
                continue

            # 2. Upsert into media_assets (optional, based on your schema goal)
            # Creates/updates the entry in the unified assets table.
            try:
                media_asset_data = {
                    "id": work_id,
                    "type": "text", 
                    "title": work_title,
                    # Add other relevant fields mapped from works table if needed
                    "creator_id": work_creator
                }
                # Remove None values before upsert
                media_asset_data = {k: v for k, v in media_asset_data.items() if v is not None}
                supabase.table("media_assets").upsert(media_asset_data).execute()
                logging.info(f"Upserted work ID {work_id} into media_assets.")
            except Exception as e:
                logging.error(f"Failed to upsert work ID {work_id} into media_assets: {e}")
                # Decide if you want to continue to embedding insertion or skip
                error_count += 1
                continue 
            
            # 3. Insert into asset_embeddings
            try:
                embedding_insert_data = {
                    "asset_id": work_id,
                    "modality": "text",
                    "vec": embedding_data["vec"],
                    "fused_vec": embedding_data["fused_vec"]
                }
                supabase.table("asset_embeddings").insert(embedding_insert_data).execute()
                logging.info(f"Successfully inserted embedding for work ID: {work_id}")
                processed_count += 1
            except Exception as e:
                # Handle potential duplicate key errors gracefully if the RPC check wasn't perfect
                if "duplicate key value violates unique constraint" in str(e):
                    logging.warning(f"Embedding for work ID {work_id} already exists (constraint violation). Skipping insertion.")
                else:
                    logging.error(f"Failed to insert embedding for work ID {work_id}: {e}")
                    error_count += 1

    except Exception as e:
        logging.error(f"An error occurred while fetching or processing works: {e}")
        return

    logging.info(f"Finished processing. Successful: {processed_count}, Errors/Skipped: {error_count}")

if __name__ == "__main__":
    logging.info("Starting ingestion worker...")
    # Ensure the embedding service is running locally first!
    process_unembedded_works()
    logging.info("Ingestion worker finished.") 