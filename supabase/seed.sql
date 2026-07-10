-- =====================================================
-- VERTEX RESOURCES - Seed Data Script
-- =====================================================
-- Run this in Supabase SQL Editor to populate the database
-- with sample creators and resources.
--
-- Usage:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Paste this entire script
-- 3. Click "Run"
-- =====================================================

-- Create sample creators
INSERT INTO profiles (id, display_name, bio, avatar_url, is_creator, is_verified, followers_count)
VALUES
  (gen_random_uuid(), 'Alex Chen', 'Motion graphics artist and color grading specialist. Creating cinematic presets for 5+ years.', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100', true, true, 12500),
  (gen_random_uuid(), 'Maya Rodriguez', 'Video editor and effects enthusiast. Love creating dynamic transitions and overlays.', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100', true, true, 8900),
  (gen_random_uuid(), 'Jordan Kim', 'Sound designer and audio engineer. Crafting immersive soundscapes and tutorials.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100', true, true, 15000),
  (gen_random_uuid(), 'Emma Wilson', 'Music producer and audio creator. Specializing in lo-fi beats and ambient tracks.', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100', true, true, 18200),
  (gen_random_uuid(), 'Sarah Park', 'Visual effects artist. Creating stunning overlays and light effects.', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100', true, false, 6500),
  (gen_random_uuid(), 'Mike Torres', 'Type designer and graphic artist. Modern fonts for contemporary designs.', 'https://images.pexels.com/photos/937279/pexels-photo-937279.jpeg?w=100', true, false, 4200)
ON CONFLICT (id) DO NOTHING;

-- Create tags
INSERT INTO tags (name) VALUES
  ('cinematic'),
  ('lut'),
  ('color-grading'),
  ('professional'),
  ('transitions'),
  ('dynamic'),
  ('travel'),
  ('music-video'),
  ('ambient'),
  ('soundscape'),
  ('film'),
  ('immersive'),
  ('lo-fi'),
  ('chill'),
  ('background'),
  ('beats'),
  ('titles'),
  ('animation'),
  ('modern'),
  ('premiere'),
  ('light-leaks'),
  ('flares'),
  ('overlay'),
  ('geometric'),
  ('sans-serif'),
  ('tech'),
  ('course'),
  ('davinci-resolve'),
  ('vhs'),
  ('retro'),
  ('vintage'),
  ('80s'),
  ('90s'),
  ('epic'),
  ('whoosh'),
  ('impact'),
  ('riser'),
  ('neon'),
  ('glow'),
  ('vibrant'),
  ('documentary'),
  ('emotional'),
  ('storytelling')
ON CONFLICT (name) DO NOTHING;

-- Add resources for each creator
INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Cinematic Color Grading Pack',
  'Professional LUTs for achieving that cinematic look in your videos. Includes 25+ color presets.',
  'preset',
  id,
  'https://images.pexels.com/photos/3013846/pexels-photo-3013846.jpeg?w=400',
  true,
  12450,
  2340
FROM profiles WHERE display_name = 'Alex Chen' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Energetic Transitions Pack',
  'Dynamic transition effects perfect for travel vlogs, music videos, and promotional content.',
  'overlay',
  id,
  'https://images.pexels.com/photos/2860807/pexels-photo-2860807.jpeg?w=400',
  true,
  8920,
  1567
FROM profiles WHERE display_name = 'Maya Rodriguez' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Ambient Sound Collection',
  '200+ ambient soundscapes for creating immersive audio environments. Perfect for filmmakers.',
  'sfx',
  id,
  'https://images.pexels.com/photos/1598485/pexels-photo-1598485.jpeg?w=400',
  true,
  6780,
  1234
FROM profiles WHERE display_name = 'Jordan Kim' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Lo-Fi Beats Pack',
  'Chill lo-fi background music perfect for study videos, vlogs, and atmospheric content.',
  'audio',
  id,
  'https://images.pexels.com/photos/1648239/pexels-photo-1648239.jpeg?w=400',
  true,
  15230,
  3456
FROM profiles WHERE display_name = 'Emma Wilson' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Modern Title Templates',
  'Sleek and modern title animations for Premiere Pro and After Effects.',
  'project',
  id,
  'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?w=400',
  false,
  9870,
  1890
FROM profiles WHERE display_name = 'Alex Chen' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Light Leaks & Flares',
  'Beautiful light leak overlays and lens flares to add warmth to your footage.',
  'overlay',
  id,
  'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400',
  true,
  11240,
  2345
FROM profiles WHERE display_name = 'Sarah Park' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Geometric Sans Collection',
  'Modern geometric sans-serif fonts perfect for tech brands and modern designs.',
  'font',
  id,
  'https://images.pexels.com/photos/1327398/pexels-photo-1327398.jpeg?w=400',
  false,
  5670,
  987
FROM profiles WHERE display_name = 'Mike Torres' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Mastering Color Grading',
  'Complete course on professional color grading techniques using DaVinci Resolve.',
  'tutorial',
  id,
  'https://images.pexels.com/photos/2387360/pexels-photo-2387360.jpeg?w=400',
  true,
  8450,
  1678
FROM profiles WHERE display_name = 'Jordan Kim' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Retro VHS Effects',
  'Vintage VHS-style effects and overlays for that nostalgic 80s/90s aesthetic.',
  'overlay',
  id,
  'https://images.pexels.com/photos/2769314/pexels-photo-2769314.jpeg?w=400',
  false,
  7230,
  1456
FROM profiles WHERE display_name = 'Maya Rodriguez' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Cinematic Sound Design',
  'Epic cinematic sound effects including whooshes, impacts, and risers.',
  'sfx',
  id,
  'https://images.pexels.com/photos/3755943/pexels-photo-3755943.jpeg?w=400',
  true,
  10890,
  2134
FROM profiles WHERE display_name = 'Emma Wilson' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Neon Glow Pack',
  'Vibrant neon glow effects and color presets for eye-catching visuals.',
  'preset',
  id,
  'https://images.pexels.com/photos/3571555/pexels-photo-3571555.jpeg?w=400',
  false,
  6780,
  1234
FROM profiles WHERE display_name = 'Sarah Park' LIMIT 1;

INSERT INTO resources (title, description, category, creator_id, thumbnail_url, featured, downloads_count, likes_count)
SELECT
  'Documentary Music Pack',
  'Emotionally compelling music tracks perfect for documentary storytelling.',
  'audio',
  id,
  'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?w=400',
  false,
  4560,
  987
FROM profiles WHERE display_name = 'Jordan Kim' LIMIT 1;

-- Link tags to resources (example for first resource)
INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Cinematic Color Grading Pack'
  AND t.name IN ('cinematic', 'lut', 'color-grading', 'professional');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Energetic Transitions Pack'
  AND t.name IN ('transitions', 'dynamic', 'travel', 'music-video');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Ambient Sound Collection'
  AND t.name IN ('ambient', 'soundscape', 'film', 'immersive');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Lo-Fi Beats Pack'
  AND t.name IN ('lo-fi', 'chill', 'background', 'beats');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Modern Title Templates'
  AND t.name IN ('titles', 'animation', 'modern', 'premiere');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Light Leaks & Flares'
  AND t.name IN ('light-leaks', 'flares', 'overlay', 'cinematic');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Geometric Sans Collection'
  AND t.name IN ('geometric', 'sans-serif', 'modern', 'tech');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Mastering Color Grading'
  AND t.name IN ('course', 'color-grading', 'davinci-resolve', 'professional');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Retro VHS Effects'
  AND t.name IN ('vhs', 'retro', 'vintage', '80s', '90s');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Cinematic Sound Design'
  AND t.name IN ('cinematic', 'epic', 'whoosh', 'impact', 'riser');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Neon Glow Pack'
  AND t.name IN ('neon', 'glow', 'vibrant', 'overlay');

INSERT INTO resource_tags (resource_id, tag_id)
SELECT r.id, t.id
FROM resources r, tags t
WHERE r.title = 'Documentary Music Pack'
  AND t.name IN ('documentary', 'emotional', 'storytelling', 'film');

-- Verify the data
SELECT 'Profiles created:' as stat, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'Resources created:', COUNT(*) FROM resources
UNION ALL
SELECT 'Tags created:', COUNT(*) FROM tags;
