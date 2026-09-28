/*
# Create tables for SuperHero English app

1. New Tables
- `children`: Stores child profiles (name, avatar emoji, star count)
  - `id` (uuid, primary key)
  - `name` (text, not null) — child's display name
  - `avatar` (text, not null) — emoji used as avatar
  - `stars` (int, default 0) — total stars earned across all lessons
  - `created_at` (timestamptz)
- `daily_lessons`: Stores per-child daily lesson completion records
  - `id` (uuid, primary key)
  - `child_id` (uuid, FK to children, on delete cascade)
  - `lesson_date` (date, not null) — the day this lesson is for
  - `lesson_key` (text, not null) — identifies which lesson content to load
  - `stars_earned` (int, default 0) — stars earned for this lesson
  - `completed` (boolean, default false)
  - `completed_at` (timestamptz, nullable)
  - Unique constraint on (child_id, lesson_date) so only one lesson per child per day

2. Security
- Enable RLS on both tables.
- This is a no-auth app (no sign-in screen); data is intentionally shared/public
  so policies use `TO anon, authenticated` with `USING (true)`.
*/

CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar text NOT NULL DEFAULT '🦸',
  stars integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE children ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_children" ON children;
CREATE POLICY "anon_select_children" ON children FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_children" ON children;
CREATE POLICY "anon_insert_children" ON children FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_children" ON children;
CREATE POLICY "anon_update_children" ON children FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_children" ON children;
CREATE POLICY "anon_delete_children" ON children FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS daily_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  lesson_date date NOT NULL,
  lesson_key text NOT NULL,
  stars_earned integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE (child_id, lesson_date)
);

ALTER TABLE daily_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_daily_lessons" ON daily_lessons;
CREATE POLICY "anon_select_daily_lessons" ON daily_lessons FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_daily_lessons" ON daily_lessons;
CREATE POLICY "anon_insert_daily_lessons" ON daily_lessons FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_daily_lessons" ON daily_lessons;
CREATE POLICY "anon_update_daily_lessons" ON daily_lessons FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_daily_lessons" ON daily_lessons;
CREATE POLICY "anon_delete_daily_lessons" ON daily_lessons FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_daily_lessons_child_date ON daily_lessons(child_id, lesson_date);
