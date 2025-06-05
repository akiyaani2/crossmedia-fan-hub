# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies that might be needed by torch or other libraries
# (This might vary depending on the base image and specific library needs)
# RUN apt-get update && apt-get install -y --no-install-recommends some-dependency && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
# Using --no-cache-dir can reduce image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable (optional, can be set at runtime)
# ENV MODEL_CACHE=/path/to/persistent/cache # Example for caching models

# Run embed_service.py when the container launches
# Use uvicorn to run the FastAPI app
# --host 0.0.0.0 makes it accessible externally
# --port 8000 matches the EXPOSE directive
CMD ["uvicorn", "embed_service:app", "--host", "0.0.0.0", "--port", "8000"] 