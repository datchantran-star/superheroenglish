import { ArrowLeft, Star, Trophy, Home } from 'lucide-react';
import type { ChildProfile } from '@/types';

interface Props {
  child: ChildProfile;
  onBack: () => void;
}

export default function TimeUp({ child, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="text-8xl mb-6 animate-float">⏰</div>
        <h1 className="text-4xl font-black text-white mb-3">Hết giờ rồi!</h1>
        <p className="text-blue-200 text-lg font-medium mb-8">
          Hôm nay bạn đã học rất tốt. Hãy nghỉ ngơi và quay lại ngày mai nhé, {child.name}!
        </p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <span className="text-4xl font-black text-white">{child.stars}</span>
          </div>
          <p className="text-blue-300 font-bold">Tổng sao tích lũy</p>
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl py-4 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
        >
          <Home className="w-6 h-6" />
          Về trang chủ
        </button>
      </div>
    </div>
  );
}
