/*
  # Create user_compositions table

  1. New Tables
    - `user_compositions`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `photo_url` (text, optional - URL to uploaded photo)
      - `price` (numeric, required)
      - `photo_x` (integer, default 50 - photo X position)
      - `photo_y` (integer, default 50 - photo Y position)
      - `photo_size` (integer, default 100 - photo size)
      - `name_x` (integer, default 50 - name X position)
      - `name_y` (integer, default 50 - name Y position)
      - `name_size` (integer, default 16 - name font size)
      - `price_x` (integer, default 50 - price X position)
      - `price_y` (integer, default 50 - price Y position)
      - `price_size` (integer, default 16 - price font size)
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `user_compositions` table
    - Add policy for public read access (since this appears to be a public composition tool)
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS user_compositions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  photo_url text,
  price numeric NOT NULL,
  photo_x integer DEFAULT 50,
  photo_y integer DEFAULT 50,
  photo_size integer DEFAULT 100,
  name_x integer DEFAULT 50,
  name_y integer DEFAULT 50,
  name_size integer DEFAULT 16,
  price_x integer DEFAULT 50,
  price_y integer DEFAULT 50,
  price_size integer DEFAULT 16,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_compositions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to compositions
CREATE POLICY "Allow public read access"
  ON user_compositions
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert access to create new compositions
CREATE POLICY "Allow public insert access"
  ON user_compositions
  FOR INSERT
  TO public
  WITH CHECK (true);