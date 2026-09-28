export type Screen =
  | 'profiles'
  | 'add-profile'
  | 'dashboard'
  | 'lesson'
  | 'time-up'
  | 'settings'
  | 'placement-test';

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  stars: number;
  level: number;
  placement_done: boolean;
}

export interface Lesson {
  id: string;
  child_id: string;
  lesson_date: string;
  lesson_key: string;
  stars_earned: number;
  completed: boolean;
  completed_at: string | null;
}

export type StageId = 1 | 2 | 3;

export interface VocabItem {
  word: string;
  emoji: string;
  translation: string;
}

export type QuizType = 'translate' | 'image';

export interface QuizQuestion {
  type: QuizType;
  question: string;
  emoji: string;
  options: string[];
  correctIndex: number;
}

export interface StoryBeat {
  text: string;
  emoji: string;
}

export interface LessonStage {
  id: StageId;
  title: string;
  subtitle: string;
  storyIntro: StoryBeat[];
  vocab: VocabItem[];
  quiz: QuizQuestion[];
  storyOutro: StoryBeat[];
}

export interface LessonContent {
  key: string;
  title: string;
  theme: string;
  missionTitle: string;
  missionStory: string;
  missionEmoji: string;
  stages: LessonStage[];
  finaleStory: StoryBeat[];
}

export interface PlacementQuestion {
  type: QuizType;
  question: string;
  emoji: string;
  options: string[];
  correctIndex: number;
  difficulty: number;
}
