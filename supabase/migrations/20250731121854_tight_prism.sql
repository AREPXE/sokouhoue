/*
  # Create user_compositions table

  1. New Tables
    - `user_compositions`
      - `id` (uuid, primary key)
      - `first_name` (text, user's first name)
      - `last_name` (text, user's last name)
      - `photo_url` (text, URL to uploaded photo)
      - `price` (numeric, price value)
      - `photo_x` (numeric, photo X position)
      - `photo_y` (numeric, photo Y position)
      - `photo_size` (numeric, photo size)
      - `name_x` (numeric, name text X position)
      - `name_y` (numeric, name text Y position)
      - `name_size` (numeric, name text size)
      - `price_x` (numeric, price text X position)
      - `price_y` (numeric, price text Y position)
      - `price_size` (numeric, price text size)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `user_compositions` table
    - Add policy for public access to read and insert data
    - Add policy for public access to count records

  3. Storage
    - Create storage bucket for user photos
    - Set up public access policy for photo uploads
*/

-- Create the user_compositions table
CREATE TABLE IF NOT EXISTS user_compositions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  photo_url text NOT NULL,
  price numeric NOT NULL,
  photo_x numeric NOT NULL DEFAULT 50,
  photo_y numeric NOT NULL DEFAULT 50,
  photo_size numeric NOT NULL DEFAULT 100,
  name_x numeric NOT NULL DEFAULT 50,
  name_y numeric NOT NULL DEFAULT 20,
  name_size numeric NOT NULL DEFAULT 24,
  price_x numeric NOT NULL DEFAULT 50,
  price_y numeric NOT NULL DEFAULT 80,
  price_size numeric NOT NULL DEFAULT 20,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_compositions ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to insert and select
CREATE POLICY "Allow public access to user_compositions"
  ON user_compositions
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for user photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-photos', 'user-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public access to storage bucket
CREATE POLICY "Allow public access to user-photos bucket"
  ON storage.objects
  FOR ALL
  TO public
  USING (bucket_id = 'user-photos')
  WITH CHECK (bucket_id = 'user-photos');