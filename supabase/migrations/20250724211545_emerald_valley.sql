/*
  # Fix captain_phone null constraint

  1. Changes
    - Make captain_phone column nullable since it's not collected in the registration form
    - This allows registrations to be submitted without requiring a phone number

  2. Security
    - No changes to RLS policies needed
*/

-- Make captain_phone nullable
ALTER TABLE registrations ALTER COLUMN captain_phone DROP NOT NULL;