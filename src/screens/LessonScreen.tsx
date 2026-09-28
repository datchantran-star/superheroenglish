import { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import type { ChildProfile, Lesson } from '@/types';
import { getLessonContent, completeLesson } from '@/lib/api';
import StoryDisplay from '@/components/adventure/StoryDisplay';
import VocabStage from '@/components/adventure/VocabStage';
import QuizStage from '@/components/adventure/QuizStage';
import TreasureChest from '@/components/adventure/TreasureChest';

interface Props {
  child: ChildProfile;
  lesson: Lesson;
  onBack: () => void;
  onComplete: (starsEarned: number) => void;
}

type Phase = 'intro' | 'vocab' | 'quiz' | 'outro' | 'treasure';

interface StageState {
  phase: Phase;
  stageIndex: number;
}

export default function LessonScreen({ child, lesson, onBack, onComplete }: Props) {
  const content = getLessonContent(lesson.lesson_key);
  const [state, setState] = useState<StageState>({ phase: 'intro', stageIndex: 0 });
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const [currentStars, setCurrentStars] = useState(child.stars);

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-bold text-xl mb-4">Không tìm thấy bài học</p>
          <button onClick={onBack} className="text-cyan-400 font-bold">Quay lại</button>
        </div>
      </div>
    );
  }

  const currentStage = content.stages[state.stageIndex];

  function goNextStage() {
    if (state.stageIndex < content!.stages.length - 1) {
      setState({ phase: 'intro', stageIndex: state.stageIndex + 1 });
    } else {
      setState({ phase: 'treasure', stageIndex: state.stageIndex });
    }
  }

  async function handleTreasureDone() {
    if (finishing) return;
    setFinishing(true);
    const starsEarned = 3;

    try {
      // completeLesson atomically increments stars on the active child's profile
      // and returns the refreshed profile. We use child.id — never a hardcoded name.
      const refreshed = await completeLesson(lesson.id, child.id, starsEarned);
      if (refreshed) {
        // Update the star display in the header to reflect the DB-confirmed value
        setCurrentStars(refreshed.stars);
        onComplete(refreshed.stars - child.stars);
      } else {
        onComplete(starsEarned);
      }
    } catch {
      // Even if DB fails, let the user proceed with optimistic update
      onComplete(starsEarned);
    }
    onBack();
  }

  // Header
  const header = (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onBack}
        className="text-blue-300 hover:text-white transition-colors flex items-center gap-2 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Thoát
      </button>

      {/* Stage progress indicator */}
      <div className="flex items-center gap-2">
        {content.stages.map((s, i) => (
          <div
            key={s.id}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black transition-all ${
              i === state.stageIndex && state.phase !== 'treasure'
                ? 'bg-cyan-400 text-slate-900'
                : i < state.stageIndex || state.phase === 'treasure'
                ? 'bg-green-400/20 text-green-300'
                : 'bg-white/10 text-blue-300/50'
            }`}
          >
            {i < state.stageIndex || state.phase === 'treasure' ? '✓' : i + 1}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-white font-bold text-sm">{currentStars}</span>
      </div>
    </div>
  );

  // Stage title bar
  const stageTitle =
    state.phase !== 'treasure' ? (
      <div className="text-center mb-4">
        <p className="text-cyan-400 font-black text-sm uppercase tracking-wider">
          {currentStage.title}
        </p>
        <p className="text-blue-300 text-sm">{currentStage.subtitle}</p>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {header}
        {stageTitle}

        {state.phase === 'intro' && (
          <StoryDisplay
            beats={currentStage.storyIntro}
            buttonLabel="Bắt đầu thu thập!"
            onDone={() => setState((s) => ({ ...s, phase: 'vocab' }))}
          />
        )}

        {state.phase === 'vocab' && (
          <VocabStage
            vocab={currentStage.vocab}
            onDone={() => setState((s) => ({ ...s, phase: 'quiz' }))}
          />
        )}

        {state.phase === 'quiz' && (
          <QuizStage
            quiz={currentStage.quiz}
            onDone={(correct) => {
              setTotalCorrect((t) => t + correct);
              setState((s) => ({ ...s, phase: 'outro' }));
            }}
          />
        )}

        {state.phase === 'outro' && (
          <StoryDisplay
            beats={currentStage.storyOutro}
            buttonLabel={
              state.stageIndex < content.stages.length - 1 ? 'Đến chặng tiếp theo!' : 'Mở rương kho báu!'
            }
            onDone={goNextStage}
          />
        )}

        {state.phase === 'treasure' && (
          <TreasureChest beats={content.finaleStory} onDone={handleTreasureDone} />
        )}
      </div>
    </div>
  );
}
