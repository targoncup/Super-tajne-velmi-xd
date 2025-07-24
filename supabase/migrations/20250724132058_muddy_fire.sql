/*
  # Add logo column to registrations table

  1. Changes
    - Add `logo` column to `registrations` table to store team logo data
    - Column will store JSONB data with logo information (name, type, size, data)

  2. Security
    - No changes to RLS policies needed as existing policies cover the new column
*/

-- Add logo column to registrations table
ALTER TABLE registrations 
ADD COLUMN logo JSONB DEFAULT NULL;