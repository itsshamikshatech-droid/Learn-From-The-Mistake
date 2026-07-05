import { motion } from 'motion/react';
import { Chapter } from '../types';

interface ChapterNavigationProps {
  chapters: Chapter[];
  currentChapterId: number;
  onSelectChapter: (id: number) => void;
}

export default function ChapterNavigation({
  chapters,
  currentChapterId,
  onSelectChapter
}: ChapterNavigationProps) {
  // We hide navigation on chapter 0 (Landing screen) to keep it fully cinematic and immersive
  if (currentChapterId === 0) return null;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5 items-center">
      {/* Vertical line indicator */}
      <div className="absolute w-0.5 h-full bg-white/5 -z-10 rounded-full" />
      <div 
        className="absolute w-0.5 bg-gradient-to-b from-purple-glow via-gold to-cyan-glow -z-10 rounded-full transition-all duration-700"
        style={{
          height: `${((currentChapterId - 1) / (chapters.length - 2)) * 100}%`,
          top: '0px',
        }}
      />

      {chapters.map((chap, idx) => {
        // Skip rendering the landing screen indicator to keep the side nav compact starting from chapter 1
        if (chap.id === 0) return null;

        const isActive = chap.id === currentChapterId;
        const isCompleted = chap.id < currentChapterId;

        return (
          <div key={chap.id} className="relative group flex items-center justify-center">
            {/* Elegant Tooltip */}
            <div className="absolute left-10 scale-0 group-hover:scale-100 transition-all duration-300 origin-left pointer-events-none">
              <div className="glass-card px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap shadow-xl">
                <p className="font-sans text-xs font-semibold text-white tracking-wide">
                  {chap.title}
                </p>
                <p className="font-sans text-[10px] text-white/50">
                  {chap.description}
                </p>
              </div>
            </div>

            {/* Clickable Circle Dot */}
            <button
              onClick={() => onSelectChapter(chap.id)}
              className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
              aria-label={`Go to chapter ${chap.title}`}
            >
              {/* Pulse ripple for active chapter */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold/20 border border-gold/40"
                  layoutId="activeIndicatorGlow"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Active, Completed, or Unvisited Core Circle */}
              <motion.div
                className={`w-3 h-3 rounded-full transition-all duration-500 border ${
                  isActive
                    ? 'bg-gold border-gold shadow-[0_0_10px_#d4af37]'
                    : isCompleted
                    ? 'bg-purple-glow/80 border-purple-glow/80 shadow-[0_0_6px_rgba(139,92,246,0.3)]'
                    : 'bg-white/10 border-white/20 group-hover:bg-white/30 group-hover:border-white/40'
                }`}
                animate={isActive ? { scale: 1.25 } : { scale: 1 }}
              />

              {/* Section number badge floating above on hover */}
              <span className="absolute -top-3 font-mono text-[9px] text-white/30 group-hover:text-white/70 transition-colors duration-300">
                0{chap.id}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
