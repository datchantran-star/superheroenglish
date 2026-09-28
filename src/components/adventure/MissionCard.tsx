import { Sparkles } from 'lucide-react';

interface Props {
  title: string;
  story: string;
  emoji: string;
  lessonTitle: string;
  theme: string;
}

export default function MissionCard({ title, story, emoji, lessonTitle, theme }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-400/10 backdrop-blur-md border border-cyan-400/30 rounded-3xl p-6 mb-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-400/20">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-cyan-400 font-black text-sm uppercase tracking-wider">Nhiệm vụ hôm nay</span>
        </div>

        <h2 className="text-2xl font-black text-white mb-3">{title}</h2>

        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl flex-shrink-0 animate-float">{emoji}</div>
          <p className="text-blue-100 text-base font-medium leading-relaxed pt-1">{story}</p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5 inline-flex">
          <span className="text-2xl">📚</span>
          <div>
            <p className="text-white font-bold text-sm">{lessonTitle}</p>
            <p className="text-blue-300 text-xs">{theme}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
