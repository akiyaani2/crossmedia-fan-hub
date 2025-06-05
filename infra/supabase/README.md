# Supabase Local Development

This directory contains Supabase-specific configurations, migrations, and edge functions.

## Running Supabase Locally

To run Supabase locally using the Supabase CLI (for a local Postgres instance, Auth, Storage emulators, etc.):

1.  **Install Supabase CLI:**
    ```bash
    npm install -g supabase
    ```

2.  **Login (if you haven't already):
    ```bash
    supabase login
    ```

3.  **Link your project (optional, if you have a remote project you want to sync with sometimes):
    ```bash
    # supabase link --project-ref YOUR_PROJECT_ID
    ```

4.  **Start Supabase services:**
    Navigate to this directory (`infra/supabase`) in your terminal and run:
    ```bash
    supabase start
    ```
    This will start the Supabase stack locally. Note the API URL, anon key, and service role key provided in the output.

5.  **Apply migrations (if you have them):
    ```bash
    supabase db reset # Resets local DB and applies migrations
    ```
    Or apply new migrations:
    ```bash
    # supabase migration up
    ```

6.  **Stop Supabase services:**
    ```bash
    supabase stop
    ```

## Environment Variables
When running Supabase locally, use the local credentials provided by `supabase start` in your `.env` files for other services (e.g., `frontend/.env.local`, `scripts/.env`). 