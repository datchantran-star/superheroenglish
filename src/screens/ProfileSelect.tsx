import { useEffect, useState } from 'react';
import { Settings as SettingsIcon, Plus, Sparkles } from 'lucide-react';
import { getChildren, deleteChild } from '@/lib/api';
import type { ChildProfile } from '@/types';

interface Props {
  onSelectChild: (child: ChildProfile) => void;
  onAddProfile: () => void;
  onOpenSettings: () => void;
}

const AVATAR_OPTIONS = ['🦸', '🦸‍♀️', '🦸‍♂️', '🦹', '🦹‍♀️', '🧙', '🧙‍♀️', '🥷', '🤖', '👾', '🦊', '🐯'];

export default function ProfileSelect({ onSelectChild, onAddProfile, onOpenSettings }: Props) {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getChildren();
        setChildren(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not load profiles');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id: string) {
    try {
      await deleteChild(id);
      setChildren((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete profile');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl shadow-blue-500/30 mb-4 animate-float">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-2">
            SuperHero English
          </h1>
          <p className="text-blue-300 text-lg font-medium">Học tiếng Anh qua phiêu lưu siêu anh hùng</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-6xl animate-bounce mb-3">🦸</div>
            <p className="text-blue-300 font-bold">Đang tải hồ sơ...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-6 text-center mb-6">
            <p className="text-red-300 font-bold">{error}</p>
          </div>
        ) : children.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-blue-200 text-lg font-bold mb-6">Chưa có hồ sơ nào. Hãy tạo hồ sơ đầu tiên!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => onSelectChild(child)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (confirm(`Xóa hồ sơ "${child.name}"?`)) handleDelete(child.id);
                }}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="text-6xl mb-3 group-hover:animate-bounce">{child.avatar}</div>
                <p className="text-white font-bold text-lg mb-1">{child.name}</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                    <span>⭐</span>
                    <span>{child.stars}</span>
                  </div>
                  {child.placement_done && (
                    <div className="flex items-center gap-1 text-cyan-400 font-bold text-sm">
                      <span>⚡</span>
                      <span>C{child.level}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onAddProfile}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-lg rounded-2xl py-4 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Tạo hồ sơ mới
        </button>

        <button
          onClick={onOpenSettings}
          className="mt-4 text-blue-300 hover:text-white transition-colors flex items-center gap-2 mx-auto font-medium"
        >
          <SettingsIcon className="w-5 h-5" />
          Cài đặt
        </button>
      </div>
    </div>
  );
}
