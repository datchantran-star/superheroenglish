import { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { QuizQuestion } from '@/types';

interface Props {
  quiz: QuizQuestion[];
  onDone: (correctCount: number) => void;
}

export default function QuizStage({ quiz, onDone }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = quiz[qIndex];
  const isCorrect = selected === question.correctIndex;

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === question.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    if (qIndex < quiz.length - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      onDone(correctCount);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-[60vh]">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🧗</div>
        <h2 className="text-2xl font-black text-white mb-1">Vượt chướng ngại vật</h2>
        <p className="text-blue-300 font-medium">Chọn đáp án đúng để phá vỡ rào chắn</p>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {quiz.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === qIndex ? 'bg-cyan-400 w-8' : i < qIndex ? 'bg-green-400 w-4' : 'bg-white/20 w-4'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-6">
        <div className="text-center mb-6">
          {/* Show emoji only for image-type questions */}
          {question.type === 'image' && question.emoji && (
            <div className="text-8xl mb-4">{question.emoji}</div>
          )}
          {/* Type badge */}
          <div className="inline-block mb-3">
            <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
              question.type === 'image' ? 'bg-cyan-400/20 text-cyan-300' : 'bg-amber-400/20 text-amber-300'
            }`}>
              {question.type === 'image' ? '🖼️ Nhìn hình đoán chữ' : '🌐 Dịch nghĩa'}
            </span>
          </div>
          <p className="text-white text-xl font-black">{question.question}</p>
        </div>

        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const showCorrect = showResult && idx === question.correctIndex;
            const showWrong = showResult && isSelected && idx !== question.correctIndex;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full font-black text-lg rounded-2xl py-4 px-6 transition-all duration-200 flex items-center justify-between ${
                  showCorrect
                    ? 'bg-green-500 text-white scale-105'
                    : showWrong
                    ? 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-cyan-400 text-white'
                    : selected !== null
                    ? 'bg-white/5 text-blue-300/50'
                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02]'
                }`}
              >
                <span>{opt}</span>
                {showCorrect && <Check className="w-6 h-6" strokeWidth={3} />}
                {showWrong && <X className="w-6 h-6" strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`mt-4 text-center font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? '✅ Chính xác! Năng lượng +1' : `❌ Sai rồi! Đáp án đúng là "${question.options[question.correctIndex]}"`}
          </div>
        )}
      </div>

      {showResult && (
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl px-8 py-4 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-blue-500/30 flex items-center gap-2"
        >
          {qIndex < quiz.length - 1 ? 'Câu tiếp theo 👉' : 'Hoàn thành chặng!'}
        </button>
      )}
    </div>
  );
}
