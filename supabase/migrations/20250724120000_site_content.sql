/*
  # Create site_content table to store editable page content

  1. New Tables
    - `site_content`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `data` (jsonb)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `site_content` table
    - Add policies for public read and update
*/

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read content" ON site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public upsert content" ON site_content
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public update content" ON site_content
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION update_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trg_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_site_content_updated_at();
