import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { assemblyStory } from '../data';
import { BookOpen, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

export default function AssemblyStorySection() {
  const [activeParaIdx, setActiveParaIdx] = useState(0);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 z-10 w-full max-w-7xl mx-auto overflow-hidden">
      
      {/* Chapter header */}
      <div className="text-center mb-10 max-w-2xl space-y-2 mt-4">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs text-cyan-400 tracking-[0.25em] uppercase font-bold"
        >
          Chapter 01 // The Foundation Story
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-sora font-extrabold text-white"
        >
          {assemblyStory.title}
        </motion.h2>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-2">
        
        {/* Left Column: Interactive Story Stepper */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-between glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-cyan-400">
              <BookOpen className="w-5 h-5" />
              <span className="font-mono text-xs tracking-wider uppercase font-semibold">Interactive Storyteller</span>
            </div>

            {/* Main story presentation */}
            <div className="min-h-[180px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeParaIdx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="font-inter text-base sm:text-xl text-white/90 leading-relaxed italic text-left pl-4 border-l-2 border-cyan-400"
                >
                  {assemblyStory.paragraphs[activeParaIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Stepper Dots & Navigation Row */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex gap-2">
                {assemblyStory.paragraphs.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setActiveParaIdx(pIdx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeParaIdx === pIdx ? 'w-8 bg-cyan-400 cyan-glow' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to paragraph ${pIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveParaIdx((prev) => (prev + 1) % assemblyStory.paragraphs.length)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-400/30 text-xs font-mono font-semibold text-cyan-400 cursor-pointer transition-all duration-300"
              >
                <span>Next Scene</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Moral Highlight */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-purple-500/20 shadow-inner relative"
          >
            <div className="absolute top-3 right-3">
              <Sparkles className="w-4 h-4 text-gold animate-pulse-slow" />
            </div>
            <p className="text-[10px] font-mono text-purple-300 uppercase tracking-widest font-extrabold mb-1.5">
              The Assembly Message
            </p>
            <p className="font-sora text-xs sm:text-sm text-white/80 leading-relaxed font-semibold">
              {assemblyStory.moral}
            </p>
          </motion.div>
        </div>

        {/* Right Column: Beautiful Seedling Artwork */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            className="w-full h-full min-h-[360px] lg:min-h-[460px] rounded-3xl glass-panel p-4 relative flex flex-col justify-between overflow-hidden group shadow-2xl border border-white/10"
          >
            {/* Visual Frame wrapper */}
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden shadow-inner bg-black/40">
              <img
                src={assemblyStory.imageUrl}
                alt="Seedling growing from crack"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent opacity-80" />
              
              {/* Dynamic Overlay Label */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/5">
                <p className="text-[10px] font-mono text-gold uppercase tracking-wider font-bold">Concept Illustration</p>
                <p className="text-xs text-white/80 font-medium">Watering growth through our flaws</p>
              </div>
            </div>

            {/* Small Quick-Insight Bar under image */}
            <div className="pt-4 px-2 flex items-center justify-between text-left">
              <div>
                <p className="font-sora text-xs font-bold text-white uppercase tracking-wider">Morning Reflection</p>
                <p className="font-sans text-[10px] text-white/40">"Every crack lets the light in."</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <HelpCircle className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
