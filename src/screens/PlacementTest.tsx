import { useState } from 'react';
import { ArrowLeft, Check, X, Star, Zap, Trophy } from 'lucide-react';
import type { ChildProfile } from '@/types';
import { PLACEMENT_QUESTIONS, scoreToLevel, LEVEL_LABELS } from '@/lib/placement';
import { savePlacementResult } from '@/lib/api';

interface Props {
  child: ChildProfile;
  onDone: (updatedChild: ChildProfile) => void;
  onBack: () => void;
}

type TestPhase = 'intro' | 'questions' | 'result';

export default function PlacementTest({ child, onDone, onBack }: Props) {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [savedLevel, setSavedLevel] = useState<number | null>(null);

  const question = PLACEMENT_QUESTIONS[qIndex];
  const totalQuestions = PLACEMENT_QUESTIONS.length;
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
    if (qIndex < totalQuestions - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      finishTest();
    }
  }

  async function finishTest() {
    const level = scoreToLevel(correctCount);
    setSavedLevel(level);
    setSaving(true);
    try {
      const updated = await savePlacementResult(child.id, level);
      if (updated) {
        setPhase('result');
        setSaving(false);
        // Auto-advance after showing result for a few seconds
        setTimeout(() => {
          onDone(updated);
        }, 100);
      } else {
        setPhase('result');
        setSaving(false);
      }
    } catch {
      // Even if save fails, proceed with the level
      setPhase('result');
      setSaving(false);
    }
  }

  // === INTRO PHASE ===
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-8xl mb-6 animate-float">⚡</div>
          <h1 className="text-4xl font-black text-white mb-3">Đo Lực Chiến</h1>
          <p className="text-blue-200 text-lg font-medium mb-2">
            Chào {child.name}! Trước khi bắt đầu phiêu lưu, hãy làm bài kiểm tra năng lực để chúng mình biết trình độ của bạn.
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-8 mt-6">
            <div className="flex items-center justify-center gap-4 text-sm font-bold text-blue-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <span>15 câu hỏi</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span>Từ dễ đến khó</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setPhase('questions')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl py-4 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <Zap className="w-6 h-6" />
            Bắt đầu đo lực!
          </button>
          <button
            onClick={onBack}
            className="mt-4 text-blue-300 hover:text-white transition-colors flex items-center gap-2 mx-auto font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  // === RESULT PHASE ===
  if (phase === 'result' && savedLevel !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-8xl mb-4 animate-float">🏆</div>
          <h1 className="text-4xl font-black text-white mb-2">Hoàn thành!</h1>
          <p className="text-blue-200 text-lg font-medium mb-6">
            Bạn trả lời đúng {correctCount}/{totalQuestions} câu.
          </p>

          <div className="bg-gradient-to-br from-yellow-500/20 to-amber-400/10 backdrop-blur-md border border-yellow-400/30 rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 font-black text-sm uppercase tracking-wider">Cấp độ của bạn</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((l) => (
                <Star
                  key={l}
                  className={`w-8 h-8 transition-all duration-500 ${
                    l <= savedLevel ? 'text-yellow-400 fill-yellow-400 scale-100' : 'text-white/15 scale-75'
                  }`}
                />
              ))}
            </div>
            <p className="text-3xl font-black text-white mb-1">Cấp {savedLevel}</p>
            <p className="text-yellow-300 font-bold text-lg">{LEVEL_LABELS[savedLevel]}</p>
          </div>

          <p className="text-blue-200 font-medium mb-6">
            Các bài học phiêu lưu sẽ được điều chỉnh theo cấp độ của bạn!
          </p>

          <div className="text-blue-300 text-sm font-medium flex items-center justify-center gap-2">
            <div className="text-2xl animate-spin-slow">🦸</div>
            Đang chuyển sang phiêu lưu...
          </div>
        </div>
      </div>
    );
  }

  // === SAVING TRANSITION ===
  if (saving) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl animate-spin-slow mb-4">🦸</div>
          <p className="text-white text-xl font-black">Đang lưu kết quả...</p>
        </div>
      </div>
    );
  }

  // === QUESTIONS PHASE ===
  const progress = ((qIndex + (showResult ? 1 : 0)) / totalQuestions) * 100;
  const difficultyStars = '⭐'.repeat(question.difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <span className="text-xl">{child.avatar}</span>
            <span className="text-white font-bold text-sm">{child.name}</span>
          </div>
          <div className="text-yellow-400 font-black text-sm">
            {difficultyStars}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-300 font-bold text-sm">
              Câu {qIndex + 1} / {totalQuestions}
            </span>
            <span className="text-blue-300 font-bold text-sm">
              Đúng: {correctCount}
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-6">
          <div className="text-center mb-6">
            {question.type === 'image' && question.emoji && (
              <div className="text-8xl mb-4">{question.emoji}</div>
            )}
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
              {isCorrect ? '✅ Chính xác!' : `❌ Đáp án đúng là "${question.options[question.correctIndex]}"`}
            </div>
          )}
        </div>

        {showResult && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl py-4 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            {qIndex < totalQuestions - 1 ? 'Câu tiếp theo 👉' : 'Xem kết quả 🏆'}
          </button>
        )}
      </div>
    </div>
  );
}
