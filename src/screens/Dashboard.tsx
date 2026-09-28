import { ArrowLeft, Star, Play, Clock, Zap } from 'lucide-react';
import { getLessonContent } from '@/lib/api';
import { LEVEL_LABELS } from '@/lib/placement';
import type { ChildProfile, Lesson } from '@/types';
import MissionCard from '@/components/adventure/MissionCard';
import AdventureMap from '@/components/adventure/AdventureMap';

interface Props {
  child: ChildProfile;
  lesson: Lesson;
  onStartLesson: () => void;
  onBack: () => void;
  onTimeUp: () => void;
}

export default function Dashboard({ child, lesson, onStartLesson, onBack }: Props) {
  const content = getLessonContent(lesson.lesson_key);
  const levelLabel = LEVEL_LABELS[child.level] ?? 'Tân binh';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-blue-300 hover:text-white transition-colors flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Hồ sơ
          </button>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2">
            <span className="text-3xl">{child.avatar}</span>
            <div>
              <p className="text-white font-bold text-sm">{child.name}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  <span>{child.stars}</span>
                </div>
                <div className="flex items-center gap-1 text-cyan-400 font-bold text-sm">
                  <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                  <span>C{child.level} · {levelLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Card */}
        {content && (
          <MissionCard
            title={content.missionTitle}
            story={content.missionStory}
            emoji={content.missionEmoji}
            lessonTitle={content.title}
            theme={content.theme}
          />
        )}

        {/* Adventure Map */}
        {content && (
          <AdventureMap stages={content.stages} completed={lesson.completed} />
        )}

        {/* Start Button */}
        <button
          onClick={onStartLesson}
          disabled={lesson.completed}
          className={`w-full mt-6 font-black text-xl rounded-2xl py-5 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
            lesson.completed
              ? 'bg-green-500/20 border border-green-500/40 text-green-300 cursor-default'
              : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:scale-[1.02] active:scale-95 shadow-blue-500/30'
          }`}
        >
          {lesson.completed ? (
            <>
              <CheckIcon className="w-6 h-6" />
              Đã hoàn thành hôm nay!
            </>
          ) : (
            <>
              <Play className="w-6 h-6 fill-white" />
              Bắt đầu phiêu lưu
            </>
          )}
        </button>

        {/* Daily tip */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-200 text-sm font-medium">
            Mẹo: Hoàn thành cả 3 chặng để mở Rương kho báu và nhận sao thưởng!
          </p>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
