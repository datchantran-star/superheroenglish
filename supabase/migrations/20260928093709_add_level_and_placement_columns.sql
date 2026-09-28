/*
# Add level and placement_done columns to children

1. Modified Tables
- `children`
  - `level` (integer, NOT NULL, DEFAULT 1) — the child's English proficiency level (1-5), determined by the placement test. Used as input for AI-generated lesson difficulty in future days.
  - `placement_done` (boolean, NOT NULL, DEFAULT false) — whether the child has completed the initial placement test. New profiles start false; set to true after the 15-question test is finished.

2. Security
- No new policies needed. The table already has full anon/authenticated CRUD policies.
- The existing UPDATE policy covers the new columns automatically.

3. Important Notes
- Both columns have safe defaults so existing rows are backfilled automatically.
- `level` defaults to 1 (beginner) so children who somehow skip the test still get a valid level.
- `placement_done` defaults to false so only profiles created BEFORE this migration that already have lessons are treated as having placement done — but since we check `placement_done` explicitly, existing profiles will be prompted to take the test on next login. This is acceptable since the test is quick and only runs once.
*/

ALTER TABLE children
  ADD COLUMN IF NOT EXISTS level integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS placement_done boolean NOT NULL DEFAULT false;
