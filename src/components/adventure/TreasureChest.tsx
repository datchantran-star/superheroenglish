import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import type { StoryBeat } from '@/types';

interface Props {
  beats: StoryBeat[];
  onDone: () => void;
}

export default function TreasureChest({ beats, onDone }: Props) {
  const [opened, setOpened] = useState(false);
  const [starsShown, setStarsShown] = useState(0);

  useEffect(() => {
    if (!opened) return;
    const timer = setInterval(() => {
      setStarsShown((s) => {
        if (s >= 3) {
          clearInterval(timer);
          return 3;
        }
        return s + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [opened]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      {/* Story beats */}
      {opened && (
        <div className="w-full max-w-lg space-y-3 mb-8 animate-slide-up">
          {beats.map((beat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md border border-yellow-400/30 rounded-3xl p-5 flex items-center gap-4"
            >
              <span className="text-4xl flex-shrink-0">{beat.emoji}</span>
              <p className="text-white text-lg font-medium leading-relaxed">{beat.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Treasure chest */}
      <div className="relative mb-8 flex items-center justify-center">
        <div
          className={`text-9xl transition-transform duration-700 cursor-pointer select-none ${
            opened ? 'scale-110' : 'hover:scale-105 animate-float'
          }`}
          onClick={() => setOpened(true)}
        >
          {opened ? '🎁' : '🧰'}
        </div>

        {opened && (
          <>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl animate-bounce">✨</div>
            <div className="absolute -top-8 -left-4 text-4xl animate-pulse">⭐</div>
            <div className="absolute -top-8 -right-4 text-4xl animate-pulse">🌟</div>
          </>
        )}
      </div>

      {!opened ? (
        <button
          onClick={() => setOpened(true)}
          className="bg-gradient-to-r from-yellow-500 to-amber-400 text-white font-black text-xl rounded-2xl px-10 py-5 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-amber-500/40 flex items-center gap-3"
        >
          <span className="text-2xl">🗝️</span>
          Mở Rương kho báu!
        </button>
      ) : (
        <div className="text-center">
          {/* Stars animation */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {[0, 1, 2].map((i) => (
              <Star
                key={i}
                className={`w-12 h-12 transition-all duration-500 ${
                  i < starsShown ? 'text-yellow-400 fill-yellow-400 scale-100' : 'text-white/20 scale-50'
                }`}
              />
            ))}
          </div>
          <p className="text-3xl font-black text-yellow-400 mb-2">+{starsShown} sao!</p>
          <p className="text-blue-200 font-bold text-lg mb-8">Bạn đã hoàn thành phiêu lưu hôm nay!</p>

          <button
            onClick={onDone}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl px-8 py-4 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-blue-500/30"
          >
            Về trang chủ 🏠
          </button>
        </div>
      )}
    </div>
  );
}
