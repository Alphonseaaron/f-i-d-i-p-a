/*
  # Admin Panel Schema

  1. New Tables
    - `site_config`
      - `id` (uuid, primary key)
      - `name` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `logo_url` (text)
      - `favicon_url` (text)
      - `social_links` (jsonb)
      - `updated_at` (timestamp)

    - `sections`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `order` (integer)
      - `updated_at` (timestamp)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `image_url` (text)
      - `author` (text)
      - `author_photo` (text)
      - `author_bio` (text)
      - `status` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `image_url` (text)
      - `status` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `programs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `image_url` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Site Config Table
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  meta_title text,
  meta_description text,
  logo_url text,
  favicon_url text,
  social_links jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read site config"
  ON site_config
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update site config"
  ON site_config
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Sections Table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  image_url text,
  "order" integer,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read sections"
  ON sections
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to modify sections"
  ON sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  image_url text,
  author text,
  author_photo text,
  author_bio text,
  status text DEFAULT 'draft',
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  image_url text,
  status text DEFAULT 'draft',
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Programs Table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage programs"
  ON programs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_sections_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();