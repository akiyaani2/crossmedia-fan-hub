-- Enable pgcrypto extension for gen_random_uuid
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create media_items table
CREATE TABLE IF NOT EXISTS public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security and allow public reads
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON public.media_items
  FOR SELECT
  TO public
  USING (true); 