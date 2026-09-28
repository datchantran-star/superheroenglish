import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { createChild } from '@/lib/api';
import type { ChildProfile } from '@/types';

interface Props {
  onBack: () => void;
  onCreated: (child: ChildProfile) => void;
}

const AVATAR_OPTIONS = ['🦸', '🦸‍♀️', '🦸‍♂️', '🦹', '🦹‍♀️', '🧙', '🧙‍♀️', '🥷', '🤖', '👾', '🦊', '🐯'];

export default function AddProfile({ onBack, onCreated }: Props) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!name.trim()) {
      setError('Vui lòng nhập tên');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const child = await createChild(name.trim(), avatar);
      onCreated(child);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create profile');
    } finally {
      setLoading(false);
    }
  }

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
          <h2 className="text-3xl font-black text-white mb-6 text-center">Tạo hồ sơ anh hùng</h2>

          <label className="block text-blue-200 font-bold mb-2">Tên siêu anh hùng</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên..."
            maxLength={20}
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-blue-300/50 font-bold text-lg focus:outline-none focus:border-cyan-400 mb-6"
          />

          <label className="block text-blue-200 font-bold mb-3">Chọn biểu tượng</label>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {AVATAR_OPTIONS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-4xl rounded-2xl p-3 transition-all duration-200 ${
                  avatar === a
                    ? 'bg-cyan-400/30 border-2 border-cyan-400 scale-110'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 mb-4">
              <p className="text-red-300 font-bold text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl py-4 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              'Đang tạo...'
            ) : (
              <>
                <Check className="w-6 h-6" />
                Bắt đầu phiêu lưu
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
