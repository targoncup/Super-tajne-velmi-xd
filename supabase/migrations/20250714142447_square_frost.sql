/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `team_name` (text)
      - `team_tag` (text)
      - `captain_name` (text)
      - `captain_email` (text)
      - `captain_phone` (text)
      - `captain_discord` (text)
      - `players` (jsonb) - array of player objects
      - `substitutes` (jsonb) - array of substitute objects
      - `coach` (jsonb) - coach object
      - `agree_to_rules` (boolean)
      - `agree_to_streaming` (boolean)
      - `status` (text) - pending, approved, rejected
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `registrations` table
    - Add policies for public registration and admin management
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  team_tag text NOT NULL,
  captain_name text NOT NULL,
  captain_email text NOT NULL,
  captain_phone text NOT NULL,
  captain_discord text NOT NULL,
  players jsonb NOT NULL DEFAULT '[]'::jsonb,
  substitutes jsonb NOT NULL DEFAULT '[]'::jsonb,
  coach jsonb NOT NULL DEFAULT '{}'::jsonb,
  agree_to_rules boolean NOT NULL DEFAULT false,
  agree_to_streaming boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert registrations (public registration)
CREATE POLICY "Anyone can register teams"
  ON registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read registrations (for admin panel)
CREATE POLICY "Anyone can read registrations"
  ON registrations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to update registrations (for admin status changes)
CREATE POLICY "Anyone can update registrations"
  ON registrations
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Allow anyone to delete registrations (for admin management)
CREATE POLICY "Anyone can delete registrations"
  ON registrations
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();