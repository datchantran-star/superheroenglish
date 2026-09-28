import { Check, Lock, Star } from 'lucide-react';
import type { LessonStage } from '@/types';

interface Props {
  stages: LessonStage[];
  completed: boolean;
}

const STAGE_ICONS = ['⚡', '🧗', '⚔️'];
const STAGE_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-amber-500 to-orange-400',
  'from-red-500 to-pink-400',
];

export default function AdventureMap({ stages, completed }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
      <h3 className="text-white font-black text-lg mb-1 flex items-center gap-2">
        <span className="text-2xl">🗺️</span>
        Bản đồ phiêu lưu
      </h3>
      <p className="text-blue-300 text-sm mb-6">Hành trình 3 chặng của bạn</p>

      <div className="relative">
        {/* Connecting path */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/30 via-amber-500/30 to-red-500/30 rounded-full" />

        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isCompleted = completed;
            const isLocked = false; // All stages visible; locked state managed in lesson flow
            return (
              <div key={stage.id} className="relative flex items-start gap-4">
                {/* Node */}
                <div
                  className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${STAGE_COLORS[idx]} shadow-lg flex-shrink-0 ${
                    isCompleted ? 'ring-2 ring-green-400' : ''
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  ) : isLocked ? (
                    <Lock className="w-7 h-7 text-white/70" />
                  ) : (
                    <span className="text-3xl">{STAGE_ICONS[idx]}</span>
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 bg-white/5 rounded-2xl p-4 border ${isCompleted ? 'border-green-400/30' : 'border-white/10'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-black text-sm">{stage.title}</p>
                    {isCompleted && (
                      <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <span>3</span>
                      </div>
                    )}
                  </div>
                  <p className="text-blue-300 text-xs">{stage.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
