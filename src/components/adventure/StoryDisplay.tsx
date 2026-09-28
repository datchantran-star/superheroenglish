import { useState } from 'react';
import { Check, Star } from 'lucide-react';
import type { StoryBeat } from '@/types';

interface Props {
  beats: StoryBeat[];
  onDone: () => void;
  buttonLabel: string;
}

export default function StoryDisplay({ beats, onDone, buttonLabel }: Props) {
  const [index, setIndex] = useState(0);
  const visible = beats.slice(0, index + 1);

  function handleNext() {
    if (index < beats.length - 1) {
      setIndex(index + 1);
    } else {
      onDone();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-lg space-y-4 mb-8">
        {visible.map((beat, i) => (
          <div
            key={i}
            className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex items-center gap-4 ${
              i === index ? 'animate-slide-up' : ''
            }`}
          >
            <span className="text-5xl flex-shrink-0">{beat.emoji}</span>
            <p className="text-white text-lg font-medium leading-relaxed">{beat.text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl px-8 py-4 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-blue-500/30 flex items-center gap-2"
      >
        {index < beats.length - 1 ? (
          <>
            <span>Tiếp tục</span>
            <span className="text-2xl">👉</span>
          </>
        ) : (
          <>
            <Check className="w-6 h-6" />
            {buttonLabel}
          </>
        )}
      </button>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {beats.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i <= index ? 'bg-cyan-400 w-6' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
