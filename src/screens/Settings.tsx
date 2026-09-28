import { ArrowLeft, Volume2, Info } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function Settings({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="text-blue-300 hover:text-white transition-colors flex items-center gap-2 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
          <h2 className="text-3xl font-black text-white mb-6">Cài đặt</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-4">
              <Volume2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-white font-bold">Âm thanh</p>
                <p className="text-blue-300 text-sm">Hiệu ứng âm thanh đang bật</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4">
              <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold">Về SuperHero English</p>
                <p className="text-blue-300 text-sm mt-1">
                  Ứng dụng học tiếng Anh cho trẻ em qua chế độ phiêu lưu 3 chặng. Mỗi ngày là một nhiệm vụ mới!
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-white font-bold mb-1">Phiên bản</p>
              <p className="text-blue-300 text-sm">1.0.0 — Adventure Story Mode</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
