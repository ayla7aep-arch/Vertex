/*
# Vertex Resources Platform - Initial Schema

This migration creates the foundational database schema for the Vertex Resources platform,
a premium hub for video editors and creators to discover and download creative resources.

1. New Tables
- `profiles`: User profiles extending Supabase auth.users. Stores display name, bio, avatar, and creator status.
- `resources`: Main resource items including presets, overlays, audio, sfx, fonts, tutorials, and project files.
- `favorites`: User favorites/bookmarks for resources.
- `ratings`: User ratings (1-5 stars) for resources.
- `comments`: User comments on resources.

2. Security (RLS)
- Row Level Security enabled on all tables.
- Owner-scoped policies for profiles (users manage their own profile).
- Public read for resources, creator-scoped write.
- Owner-scoped favorites, ratings, comments (users manage their own).

3. Relationships
- profiles.id -> auth.users.id (one-to-one)
- resources.creator_id -> profiles.id (many-to-one)
- favorites.user_id -> profiles.id, favorites.resource_id -> resources.id
- ratings.user_id -> profiles.id, ratings.resource_id -> resources.id
- comments.user_id -> profiles.id, comments.resource_id -> resources.id

4. Notes
- Uses DEFAULT auth.uid() for owner columns to support front-end inserts without passing user_id.
- Resources are publicly readable (TO anon, authenticated) for browsing.
- Only creators can create/update/delete their own resources.
- Favorites, ratings, comments are owner-scoped to authenticated users.
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name text NOT NULL,
    bio text DEFAULT '',
    avatar_url text DEFAULT '',
    is_creator boolean DEFAULT false,
    is_verified boolean DEFAULT false,
    followers_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL DEFAULT '',
    category text NOT NULL CHECK (category IN ('audio', 'sfx', 'overlay', 'preset', 'project', 'font', 'tutorial')),
    creator_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
    thumbnail_url text NOT NULL DEFAULT '',
    download_url text DEFAULT '',
    file_size integer DEFAULT 0,
    downloads_count integer DEFAULT 0,
    likes_count integer DEFAULT 0,
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Resource tags junction table
CREATE TABLE IF NOT EXISTS resource_tags (
    resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
    tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (resource_id, tag_id)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
    resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, resource_id)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
    resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE (user_id, resource_id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
    resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_resources_creator ON resources(creator_id);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_featured ON resources(featured);
CREATE INDEX IF NOT EXISTS idx_resources_created ON resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_resource ON favorites(resource_id);
CREATE INDEX IF NOT EXISTS idx_ratings_resource ON ratings(resource_id);
CREATE INDEX IF NOT EXISTS idx_comments_resource ON comments(resource_id);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT
    TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE
    TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Public profiles for browsing creators
DROP POLICY IF EXISTS "profiles_public_read" ON profiles;
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT
    TO anon, authenticated USING (is_creator = true);

-- Resources policies - publicly readable
DROP POLICY IF EXISTS "resources_public_read" ON resources;
CREATE POLICY "resources_public_read" ON resources FOR SELECT
    TO anon, authenticated USING (true);

-- Creators can insert their own resources
DROP POLICY IF EXISTS "resources_insert_own" ON resources;
CREATE POLICY "resources_insert_own" ON resources FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = creator_id);

-- Creators can update their own resources
DROP POLICY IF EXISTS "resources_update_own" ON resources;
CREATE POLICY "resources_update_own" ON resources FOR UPDATE
    TO authenticated USING (auth.uid() = creator_id) WITH CHECK (auth.uid() = creator_id);

-- Creators can delete their own resources
DROP POLICY IF EXISTS "resources_delete_own" ON resources;
CREATE POLICY "resources_delete_own" ON resources FOR DELETE
    TO authenticated USING (auth.uid() = creator_id);

-- Tags - public read
DROP POLICY IF EXISTS "tags_public_read" ON tags;
CREATE POLICY "tags_public_read" ON tags FOR SELECT
    TO anon, authenticated USING (true);

-- Resource tags - public read
DROP POLICY IF EXISTS "resource_tags_public_read" ON resource_tags;
CREATE POLICY "resource_tags_public_read" ON resource_tags FOR SELECT
    TO anon, authenticated USING (true);

-- Favorites policies
DROP POLICY IF EXISTS "favorites_read_own" ON favorites;
CREATE POLICY "favorites_read_own" ON favorites FOR SELECT
    TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "favorites_insert_own" ON favorites;
CREATE POLICY "favorites_insert_own" ON favorites FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "favorites_delete_own" ON favorites;
CREATE POLICY "favorites_delete_own" ON favorites FOR DELETE
    TO authenticated USING (auth.uid() = user_id);

-- Ratings policies
DROP POLICY IF EXISTS "ratings_public_read" ON ratings;
CREATE POLICY "ratings_public_read" ON ratings FOR SELECT
    TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "ratings_insert_own" ON ratings;
CREATE POLICY "ratings_insert_own" ON ratings FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "ratings_update_own" ON ratings;
CREATE POLICY "ratings_update_own" ON ratings FOR UPDATE
    TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "ratings_delete_own" ON ratings;
CREATE POLICY "ratings_delete_own" ON ratings FOR DELETE
    TO authenticated USING (auth.uid() = user_id);

-- Comments policies
DROP POLICY IF EXISTS "comments_public_read" ON comments;
CREATE POLICY "comments_public_read" ON comments FOR SELECT
    TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "comments_insert_own" ON comments;
CREATE POLICY "comments_insert_own" ON comments FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "comments_update_own" ON comments;
CREATE POLICY "comments_update_own" ON comments FOR UPDATE
    TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "comments_delete_own" ON comments;
CREATE POLICY "comments_delete_own" ON comments FOR DELETE
    TO authenticated USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_resources_updated_at ON resources;
CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ratings_updated_at ON ratings;
CREATE TRIGGER update_ratings_updated_at
    BEFORE UPDATE ON ratings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();