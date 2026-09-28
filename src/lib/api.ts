import { supabase } from '@/lib/supabase';
import { pickLessonKeyForDate, getLessonByKey } from '@/lib/lessons';
import type { ChildProfile, Lesson } from '@/types';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getChildren(): Promise<ChildProfile[]> {
  const { data, error } = await supabase
    .from('children')
    .select('id, name, avatar, stars, level, placement_done')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ChildProfile[];
}

export async function getChildById(id: string): Promise<ChildProfile | null> {
  const { data, error } = await supabase
    .from('children')
    .select('id, name, avatar, stars, level, placement_done')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as ChildProfile) ?? null;
}

export async function createChild(name: string, avatar: string): Promise<ChildProfile> {
  const { data, error } = await supabase
    .from('children')
    .insert({ name, avatar })
    .select('id, name, avatar, stars, level, placement_done')
    .single();
  if (error) throw new Error(error.message);
  return data as ChildProfile;
}

export async function deleteChild(id: string): Promise<void> {
  const { error } = await supabase.from('children').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function getOrCreateTodayLesson(child: ChildProfile): Promise<Lesson> {
  const today = todayStr();
  const lessonKey = pickLessonKeyForDate(today, child.level);

  const { data: existing, error: selErr } = await supabase
    .from('daily_lessons')
    .select('id, child_id, lesson_date, lesson_key, stars_earned, completed, completed_at')
    .eq('child_id', child.id)
    .eq('lesson_date', today)
    .maybeSingle();

  if (selErr) throw new Error(selErr.message);

  if (existing) return existing as Lesson;

  const { data: created, error: insErr } = await supabase
    .from('daily_lessons')
    .insert({
      child_id: child.id,
      lesson_date: today,
      lesson_key: lessonKey,
      stars_earned: 0,
      completed: false,
    })
    .select('id, child_id, lesson_date, lesson_key, stars_earned, completed, completed_at')
    .single();

  if (insErr) throw new Error(insErr.message);
  return created as Lesson;
}

export async function completeLesson(
  lessonId: string,
  childId: string,
  starsEarned: number,
): Promise<ChildProfile | null> {
  // 1. Mark the lesson as completed (scoped to this exact lesson row)
  const { error: lessonErr } = await supabase
    .from('daily_lessons')
    .update({ completed: true, stars_earned: starsEarned, completed_at: new Date().toISOString() })
    .eq('id', lessonId);
  if (lessonErr) throw new Error(lessonErr.message);

  // 2. Atomically increment stars on the active child's profile.
  //    We read the current stars, add the earned amount, and write back.
  //    This is scoped to childId so it always targets the logged-in profile.
  const { data: child, error: childErr } = await supabase
    .from('children')
    .select('stars')
    .eq('id', childId)
    .maybeSingle();
  if (childErr) throw new Error(childErr.message);

  if (child) {
    const newStars = (child.stars ?? 0) + starsEarned;
    const { error: updateErr } = await supabase
      .from('children')
      .update({ stars: newStars })
      .eq('id', childId);
    if (updateErr) throw new Error(updateErr.message);

    // Return the refreshed profile so the caller can update UI state
    return getChildById(childId);
  }
  return null;
}

export async function savePlacementResult(
  childId: string,
  level: number,
): Promise<ChildProfile | null> {
  const { error } = await supabase
    .from('children')
    .update({ level, placement_done: true })
    .eq('id', childId);
  if (error) throw new Error(error.message);
  return getChildById(childId);
}

export function getLessonContent(lessonKey: string) {
  return getLessonByKey(lessonKey);
}
