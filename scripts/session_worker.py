# scripts/session_worker.py

import os
import json
import time
import logging
import numpy as np
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime, timezone # Import timezone

# --- Setup --- 
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load environment variables from .env file located in the scripts directory
load_dotenv(dotenv_path="scripts/.env") 

SUPA_URL = os.getenv("SUPABASE_URL")
SUPA_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
ALPHA = float(os.getenv("ALPHA", 0.7)) # EWMA decay factor
POLL_INTERVAL = int(os.getenv("POLL_INTERVAL", 30)) # Check interval in seconds
STATE_FILE = "scripts/.session_state.json" # File to store the last timestamp

# --- Validation & Initialization --- 
if not SUPA_URL or not SUPA_KEY:
    logging.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.")
    exit(1)

try:
    supabase: Client = create_client(SUPA_URL, SUPA_KEY)
    logging.info("Supabase client initialized successfully.")
except Exception as e:
    logging.error(f"Failed to initialize Supabase client: {e}")
    exit(1)

# Load the last processed timestamp from the state file
def load_last_timestamp():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, 'r') as f:
                state = json.load(f)
                # Validate timestamp format if needed
                return state.get("last_ts", datetime(1970, 1, 1, tzinfo=timezone.utc).isoformat())
        except (json.JSONDecodeError, IOError) as e:
            logging.error(f"Error reading state file {STATE_FILE}: {e}. Starting from epoch.")
            return datetime(1970, 1, 1, tzinfo=timezone.utc).isoformat()
    else:
        logging.info(f"State file {STATE_FILE} not found. Starting from epoch.")
        return datetime(1970, 1, 1, tzinfo=timezone.utc).isoformat()

# Save the last processed timestamp to the state file
def save_last_timestamp(ts_string):
    try:
        with open(STATE_FILE, 'w') as f:
            json.dump({"last_ts": ts_string}, f)
        logging.debug(f"Saved last timestamp {ts_string} to {STATE_FILE}")
    except IOError as e:
        logging.error(f"Error writing state file {STATE_FILE}: {e}")

# --- Core Logic --- 
def fetch_new_interactions(since_ts):
    """Fetches new interactions using the Supabase RPC function."""
    try:
        logging.debug(f"Fetching interactions since {since_ts}")
        response = supabase.rpc("get_recent_user_interactions", {"since_ts": since_ts}).execute()
        # Check for PostgREST errors if response.data is not as expected
        if hasattr(response, 'error') and response.error:
             logging.error(f"Error fetching interactions: {response.error.message}")
             return []
        return response.data or []
    except Exception as e:
        logging.error(f"Exception calling RPC get_recent_user_interactions: {e}")
        return []

def get_old_vector(user_id):
    """Retrieves the current vector for a user."""
    try:
        response = supabase.table("user_vectors").select("vec").eq("user_id", user_id).maybe_single().execute() # Use maybe_single()
        if hasattr(response, 'error') and response.error:
            logging.error(f"Error fetching vector for user {user_id}: {response.error.message}")
            return None
        return np.array(response.data["vec"]) if response.data and response.data.get("vec") else None
    except Exception as e:
        logging.error(f"Exception fetching vector for user {user_id}: {e}")
        return None

def upsert_user_vector(user_id, new_vec):
    """Upserts the updated vector for a user."""
    try:
        response = supabase.table("user_vectors").upsert({
            "user_id": user_id,
            "vec": new_vec.tolist() # Convert numpy array to list for JSON
        }).execute()
        if hasattr(response, 'error') and response.error:
             logging.error(f"Error upserting vector for user {user_id}: {response.error.message}")
    except Exception as e:
        logging.error(f"Exception upserting vector for user {user_id}: {e}")

def process_batch(batch):
    """Processes a batch of interactions, updating user vectors."""
    if not batch:
        return
    
    logging.info(f"Processing batch of {len(batch)} interactions.")
    # Group interactions by user_id
    user_interactions = {}
    for interaction in batch:
        uid = interaction.get("user_id")
        strength = interaction.get("strength")
        fused_vec_list = interaction.get("fused_vec")
        if uid and strength is not None and fused_vec_list:
            try:
                vec = np.array(fused_vec_list, dtype=np.float32) # Ensure float32
                if vec.shape == (512,): # Validate vector shape
                    user_interactions.setdefault(uid, []).append((strength, vec))
                else:
                    logging.warning(f"Skipping interaction {interaction.get('interaction_id')} for user {uid}: Invalid fused_vec shape {vec.shape}")
            except Exception as e:
                 logging.warning(f"Skipping interaction {interaction.get('interaction_id')} for user {uid}: Error processing fused_vec: {e}")
        else:
            logging.warning(f"Skipping interaction due to missing data: {interaction}")

    updated_users = 0
    for uid, events in user_interactions.items():
        if not events:
            continue
        
        logging.debug(f"Updating vector for user: {uid} based on {len(events)} events.")
        # Calculate weighted average for the current batch (session representation)
        weights = np.array([e[0] for e in events], dtype=np.float32)
        vecs = np.stack([e[1] for e in events]) # Already float32
        
        # Avoid division by zero if weights sum to 0
        weight_sum = weights.sum()
        if weight_sum == 0:
            logging.warning(f"Skipping update for user {uid}: sum of interaction strengths is zero.")
            continue
            
        session_repr = np.sum(weights[:, None] * vecs, axis=0) / weight_sum

        # Get the user's existing vector
        old_vec = get_old_vector(uid)

        # Apply EWMA update
        if old_vec is None:
            new_vec = session_repr # First interaction sets the vector
            logging.debug(f"User {uid}: Initial vector set.")
        else:
            # Ensure old_vec is also float32 for consistent calculation
            old_vec = old_vec.astype(np.float32)
            new_vec = ALPHA * old_vec + (1 - ALPHA) * session_repr
            logging.debug(f"User {uid}: Vector updated via EWMA.")

        # Upsert the new vector
        upsert_user_vector(uid, new_vec)
        updated_users += 1
        
    logging.info(f"Batch processed. Updated vectors for {updated_users} users.")

# --- Main Loop --- 
if __name__ == "__main__":
    logging.info("Starting session worker...")
    last_ts = load_last_timestamp()
    logging.info(f"Starting processing from timestamp: {last_ts}")

    while True:
        try:
            logging.info(f"Polling for new interactions since {last_ts}...")
            interaction_batch = fetch_new_interactions(last_ts)

            if interaction_batch:
                # Get the timestamp of the latest interaction in this batch
                latest_ts_in_batch = interaction_batch[-1]["ts"]
                process_batch(interaction_batch)
                # Update last_ts only after successful processing
                last_ts = latest_ts_in_batch
                save_last_timestamp(last_ts) # Persist state
            else:
                logging.info("No new interactions found.")
            
            logging.info(f"Sleeping for {POLL_INTERVAL} seconds...")
            time.sleep(POLL_INTERVAL)

        except KeyboardInterrupt:
            logging.info("Shutdown signal received. Exiting worker...")
            break
        except Exception as e:
            logging.error(f"Unhandled error in main loop: {e}. Retrying after {POLL_INTERVAL} seconds...")
            time.sleep(POLL_INTERVAL) # Wait before retrying after a major error 