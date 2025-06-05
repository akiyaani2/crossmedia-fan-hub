# file: embed_service.py (Text-Only MVP)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import (
    DistilBertTokenizer, DistilBertModel
    # Removed CLIP and Wav2Vec2 imports
)
# Removed PIL and io imports
import requests # Still potentially useful if text data needs fetching, keeping for now

app = FastAPI(title="Constellation Embed Service (Text-Only MVP)")

# --- Model Loading --- 
print("Loading text embedding model...")
try:
    # Load only the text model
    tokenizer = DistilBertTokenizer.from_pretrained("distilroberta-base")
    text_model = DistilBertModel.from_pretrained("distilroberta-base")
    print("Text model (distilroberta-base) loaded successfully.")
except Exception as e:
    print(f"ERROR loading text model: {e}")
    # Consider exiting if the core model fails to load
    raise RuntimeError(f"Failed to load text model: {e}")

# --- Fusion Layer --- 
# Kept simple fusion layer, assuming text embeddings are 768d
# Adjust input dimension if using a different text model
fusion_layer = torch.nn.Sequential(
    torch.nn.Linear(768, 512),
    torch.nn.LayerNorm(512)
)

class EmbedRequest(BaseModel):
    modality: str = "text"      # Fixed to "text" for MVP
    data: str                  # Text string to embed

@app.post("/embed")
async def embed(req: EmbedRequest):
    # Simplified logging for text-only
    print(f"Received request for text embedding.")
    try:
        # --- Modality Processing --- 
        # Only process text
        if req.modality != "text":
             # Should not happen with Pydantic default, but good practice
             raise ValueError(f"Unsupported modality '{req.modality}'. This service only supports 'text'.")

        tokens = tokenizer(req.data, return_tensors="pt", truncation=True, max_length=512)
        with torch.no_grad():
            out = text_model(**tokens).last_hidden_state[:,0] # [CLS] token

        # --- Embedding Calculation & Fusion --- 
        raw_vec = out.detach() # Shape: (1, 768)
        
        with torch.no_grad():
            fused = fusion_layer(raw_vec) # Shape: (1, 512)

        # --- Response --- 
        response_data = {
            "vec": raw_vec.squeeze().tolist(),
            "fused_vec": fused.squeeze().tolist()
        }
        print(f"Successfully processed text. Returning vectors.")
        return response_data

    except ValueError as e: # Catch specific errors like modality mismatch
         print(f"ERROR processing request: {e}")
         raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"ERROR processing text request: {e}") 
        raise HTTPException(status_code=500, detail=f"Internal server error during text embedding: {type(e).__name__}")

# Health check endpoint (unchanged)
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Main block for local execution (unchanged)
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000) 