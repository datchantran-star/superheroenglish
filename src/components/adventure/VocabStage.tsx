import { useState } from 'react';
import { Check, Volume2 } from 'lucide-react';
import type { VocabItem } from '@/types';

interface Props {
  vocab: VocabItem[];
  onDone: () => void;
}

export default function VocabStage({ vocab, onDone }: Props) {
  const [learned, setLearned] = useState<Set<number>>(new Set());

  function toggleLearned(idx: number) {
    setLearned((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }

  function speak(word: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.8;
      window.speechSynthesis.speak(utter);
    }
  }

  const allLearned = learned.size === vocab.length;

  return (
    <div className="flex flex-col items-center min-h-[60vh]">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">⚡</div>
        <h2 className="text-2xl font-black text-white mb-1">Thu thập năng lượng</h2>
        <p className="text-blue-300 font-medium">Chạm vào từng từ để học cách phát âm</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
        {vocab.map((item, idx) => {
          const isLearned = learned.has(idx);
          return (
            <button
              key={idx}
              onClick={() => {
                speak(item.word);
                toggleLearned(idx);
              }}
              className={`relative bg-white/10 backdrop-blur-md border rounded-3xl p-5 text-center transition-all duration-300 hover:scale-105 ${
                isLearned ? 'border-green-400/50 bg-green-400/10' : 'border-white/20'
              }`}
            >
              {isLearned && (
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-green-400 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
              <div className="text-6xl mb-3">{item.emoji}</div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <p className="text-white font-black text-xl">{item.word}</p>
                <Volume2 className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-blue-300 text-sm font-medium">{item.translation}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={onDone}
        disabled={!allLearned}
        className={`font-black text-lg rounded-2xl px-8 py-4 transition-all duration-300 flex items-center gap-2 ${
          allLearned
            ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:scale-105 active:scale-95 shadow-lg shadow-green-500/30'
            : 'bg-white/10 text-blue-300/50 cursor-not-allowed'
        }`}
      >
        {allLearned ? (
          <>
            <Check className="w-6 h-6" />
            Năng lượng đã đầy!
          </>
        ) : (
          `Học thêm ${vocab.length - learned.size} từ nữa...`
        )}
      </button>
    </div>
  );
}
