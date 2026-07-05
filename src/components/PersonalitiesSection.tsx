import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalities } from '../data';
import { Personality } from '../types';
import { Rocket, Trophy, Lightbulb, BookOpen, Apple, ArrowRight, X, Sparkles, Star, Zap, Volume2 } from 'lucide-react';

export default function PersonalitiesSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  // Match icon helper
  const getIcon = (type: string, className = "w-6 h-6") => {
    switch (type) {
      case 'rocket': return <Rocket className={`${className} text-cyan-400`} />;
      case 'basketball': return <Trophy className={`${className} text-orange-400`} />;
      case 'bulb': return <Lightbulb className={`${className} text-yellow-400`} />;
      case 'book': return <BookOpen className={`${className} text-purple-400`} />;
      case 'apple': return <Apple className={`${className} text-gray-300`} />;
      default: return <Sparkles className={className} />;
    }
  };

  const activePerson = personalities.find(p => p.id === activeId);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 z-10 w-full max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 text-gold rounded-md mx-auto"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold">Chapter II: The Hall of Achievers</span>
        </motion.div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Inspiring Personalities
        </h2>
        <p className="font-sans text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
          Every legendary figure you look up to was once sitting in a classroom, feeling discouraged by a mistake. 
          Click on any leader to explore their timeline and unlock their lesson.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full mb-12">
        {personalities.map((p, idx) => {
          const isSelected = activeId === p.id;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.button
                onClick={() => setActiveId(p.id)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: '0 15px 30px -10px rgba(139, 92, 246, 0.3)',
                  borderColor: 'rgba(212, 175, 55, 0.4)'
                }}
                whileTap={{ scale: 0.97 }}
                className={`glass-card p-6 rounded-2xl w-full h-[220px] text-left flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-colors duration-300 ${
                  isSelected ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.25)] bg-[#050B18]' : 'hover:bg-white/5'
                }`}
              >
                {/* Floating Ambient Background glow in card */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/3 rounded-full blur-xl group-hover:bg-gold/5 transition-all duration-300" />
                
                {/* Upper row: portrait and tiny glowing icon */}
                <div className="flex justify-between items-center w-full">
                  {p.imageUrl ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 shadow-lg bg-black/40 relative">
                      <img 
                        src={p.imageUrl} 
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-colors duration-300">
                      {getIcon(p.iconType, "w-6 h-6")}
                    </div>
                  )}
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-xs text-cyan-400">
                    {getIcon(p.iconType, "w-4 h-4")}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">Leader 0{p.id}</span>
                  <h3 className="font-heading text-lg font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="font-sans text-[11px] text-white/50 line-clamp-1">
                    {p.profession}
                  </p>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Immersive Expanded Detail Panel */}
      <AnimatePresence mode="wait">
        {activeId !== null && activePerson && (
          <motion.div
            key={activePerson.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, type: 'spring', damping: 22 }}
            className="w-full glass-panel border border-gold/20 rounded-3xl p-6 sm:p-10 relative shadow-2xl overflow-hidden mt-6"
          >
            {/* Ambient gold spotlight behind */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-glow/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setActiveId(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full border border-white/10 cursor-pointer transition-colors duration-200"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              
              {/* Left Column: Core Identity and Quote */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner shrink-0">
                    {getIcon(activePerson.iconType, "w-8 h-8")}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {activePerson.name}
                    </h3>
                    <p className="font-sans text-xs text-gold font-semibold uppercase tracking-wider">
                      {activePerson.profession}
                    </p>
                  </div>
                </div>

                {/* Big detailed portrait under identification */}
                {activePerson.imageUrl && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-square max-w-[220px] mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group"
                  >
                    <img 
                      src={activePerson.imageUrl} 
                      alt={activePerson.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent opacity-60" />
                  </motion.div>
                )}

                {/* Cinematic Quote */}
                <div className="border-l-2 border-gold pl-4 py-2 italic text-indigo-100 font-serif-italic text-lg sm:text-xl leading-relaxed bg-white/5 rounded-r-xl pr-3">
                  "{activePerson.quote}"
                </div>

                {/* Glowing Lesson Card */}
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#12072e]/50 to-[#0c1c24]/50 border border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.08)] space-y-2 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-2 bg-gold/10 text-gold text-[9px] uppercase tracking-wider font-mono rounded-bl-xl font-bold">
                    Core Lesson
                  </div>
                  <h4 className="font-mono text-xs text-gold uppercase tracking-wider font-bold">The Takeaway</h4>
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activePerson.lesson}
                  </p>
                </motion.div>
              </div>

              {/* Middle Column: Chronological Interactive Timeline */}
              <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-r border-white/5 lg:px-6">
                <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-gold" />
                  <span>The Path of Failure to Victory</span>
                </h4>
                
                <div className="relative space-y-6 pl-4 border-l border-white/5">
                  {activePerson.timeline.map((event, sIdx) => (
                    <motion.div
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sIdx * 0.1 + 0.2 }}
                      className="relative space-y-1 group"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#050B18] border-2 group-hover:scale-125 transition-all duration-200 ${
                        sIdx === 0 ? 'border-cyan-400 shadow-[0_0_8px_#22d3ee]' : sIdx === 1 ? 'border-indigo-400 shadow-[0_0_8px_#818cf8]' : 'border-gold shadow-[0_0_8px_#d4af37]'
                      }`} />
                      
                      <h5 className="font-heading text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200">
                        {event.title}
                      </h5>
                      <p className="font-sans text-[11px] sm:text-xs text-white/50 leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Custom Interactive Animation Module */}
              <div className="lg:col-span-4 h-full flex flex-col justify-center items-center">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-3">
                  Interactive Experience • Tap to Play
                </h4>
                <div className="w-full aspect-square max-w-[280px] rounded-2xl bg-[#030712]/60 border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                  <InteractiveGraphic type={activePerson.iconType} />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Sub-component: Handles unique interactive SVG animations for each personality
function InteractiveGraphic({ type }: { type: 'rocket' | 'basketball' | 'bulb' | 'book' | 'apple' }) {
  const [trigger, setTrigger] = useState(false);

  // 1. Kalam Rocket Launch
  if (type === 'rocket') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-between py-2 cursor-pointer" onClick={() => setTrigger(true)}>
        <AnimatePresence>
          {!trigger ? (
            <motion.div 
              key="launchpad"
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
              exit={{ opacity: 0 }}
            >
              <div className="relative h-28 w-12 flex flex-col justify-end items-center">
                {/* Launch Tower stand */}
                <div className="absolute left-[-10px] bottom-0 w-3 h-24 border-r border-dashed border-white/20" />
                {/* Rocket */}
                <Rocket className="w-8 h-8 text-cyan-400 rotate-[-45deg] animate-float" />
              </div>
              <p className="font-mono text-[9px] text-cyan-400/80 uppercase tracking-widest mt-4 animate-pulse">
                Click to Launch SLV-3
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="flying"
              className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{
                  y: [120, -140],
                  scale: [0.8, 1.2, 0.5],
                  x: [0, -5, 5, -2, 0],
                }}
                transition={{ duration: 3.5, ease: 'easeIn' }}
                onAnimationComplete={() => setTrigger(false)}
                className="flex flex-col items-center"
              >
                <Rocket className="w-10 h-10 text-gold rotate-[-45deg]" />
                
                {/* Rocket fire exhaust particles */}
                <div className="flex gap-0.5 mt-1.5 justify-center">
                  <motion.div className="w-1 h-6 bg-red-500 rounded-full blur-[1px]" animate={{ scaleY: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.1 }} />
                  <motion.div className="w-1.5 h-8 bg-orange-500 rounded-full blur-[1px]" animate={{ scaleY: [1.5, 2.5, 1.5] }} transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }} />
                  <motion.div className="w-1 h-6 bg-yellow-400 rounded-full blur-[1px]" animate={{ scaleY: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.1, delay: 0.02 }} />
                </div>
              </motion.div>

              {/* Launch clouds */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: [0, 0.8, 0], y: [10, -20] }}
                transition={{ duration: 2 }}
                className="absolute bottom-4 bg-white/10 blur-md rounded-full w-24 h-12"
              />
              <p className="absolute top-4 font-mono text-[9px] text-gold uppercase tracking-widest">
                ROHINI INSERTED SUCCESSFULLY!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 2. Michael Jordan Basketball Hoop Shot
  if (type === 'basketball') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={() => setTrigger(true)}>
        {/* Basketball Rim and Net */}
        <div className="absolute right-6 top-[40%] flex flex-col items-center">
          {/* Rim orange line */}
          <div className="w-14 h-2 border-2 border-orange-500 rounded-full bg-transparent relative z-10" />
          {/* Net */}
          <svg className="w-12 h-14 opacity-40 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
            <path d="M 10 0 L 25 80 L 75 80 L 90 0 M 25 25 L 75 25 M 35 50 L 65 50" />
          </svg>
        </div>

        {/* Dynamic shooting ball */}
        <motion.div
          key={trigger ? "shot" : "idle"}
          animate={trigger ? {
            // Shoots basketball into hoop in arc path
            x: [-60, 0, 32, 32],
            y: [60, -35, -2, 60],
            rotate: [0, 180, 360, 540],
            scale: [1, 1.25, 1, 0.8]
          } : {
            y: [10, -10, 10],
            rotate: [0, 30, 0]
          }}
          transition={trigger ? {
            duration: 1.8,
            ease: 'easeInOut',
          } : {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          onAnimationComplete={() => setTrigger(false)}
          className="absolute left-10 bottom-6 w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 border border-orange-700 shadow-lg flex items-center justify-center"
        >
          {/* Basketball seams */}
          <div className="w-full h-px bg-orange-950 absolute rotate-45" />
          <div className="w-full h-px bg-orange-950 absolute rotate-[-45deg]" />
        </motion.div>

        {!trigger && (
          <p className="absolute bottom-2 font-mono text-[9px] text-orange-400/80 uppercase tracking-widest text-center animate-pulse">
            Click to take the Shot
          </p>
        )}
        {trigger && (
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
            transition={{ duration: 1.8 }}
            className="absolute top-2 font-display text-xs font-black text-gold uppercase tracking-wider"
          >
            SWOOSH!
          </motion.p>
        )}
      </div>
    );
  }

  // 3. Thomas Edison Light Bulb Glow
  if (type === 'bulb') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={() => setTrigger(!trigger)}>
        <div className="relative">
          {/* Ambient yellow backing glow when switched ON */}
          <AnimatePresence>
            {trigger && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl w-24 h-24 -left-6 -top-4 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Light Bulb SVG */}
          <svg className={`w-20 h-24 transition-colors duration-300 ${trigger ? 'text-yellow-400' : 'text-gray-600'}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
            {/* Bulb Glass */}
            <path d="M 30 50 C 30 25, 70 25, 70 50 C 70 65, 60 70, 60 80 L 40 80 C 40 70, 30 65, 30 50 Z" />
            {/* Base */}
            <path d="M 40 80 L 60 80 M 42 86 L 58 86 M 45 92 L 55 92" stroke="currentColor" />
            {/* Internal filament */}
            <motion.path 
              d="M 46 68 L 48 50 L 52 50 L 54 68" 
              stroke={trigger ? '#f3e5ab' : 'currentColor'} 
              strokeWidth="2.5"
              animate={trigger ? { stroke: ['#ffd700', '#ffffff', '#ffd700'] } : {}}
              transition={{ duration: 0.15, repeat: Infinity }}
            />
          </svg>

          {/* Golden beams shooting outwards */}
          {trigger && [0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 40 + Math.cos(rad) * 35;
            const y1 = 44 + Math.sin(rad) * 35;
            const x2 = 40 + Math.cos(rad) * 50;
            const y2 = 44 + Math.sin(rad) * 50;
            return (
              <motion.line
                key={idx}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#ffd700"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
              />
            );
          })}
        </div>

        <p className="font-mono text-[9px] text-yellow-500/80 uppercase tracking-widest mt-4">
          {trigger ? "FILAMENT LIT! (13+ Hrs)" : "Click to flip the Switch"}
        </p>
      </div>
    );
  }

  // 4. J.K. Rowling Book Opening
  if (type === 'book') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={() => setTrigger(!trigger)}>
        <motion.div
          animate={trigger ? { rotateY: [0, -15, 0], scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Magic book SVG */}
          <svg className={`w-24 h-24 transition-colors duration-500 ${trigger ? 'text-purple-400' : 'text-purple-900/60'}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5">
            {trigger ? (
              // Open Book shape
              <path d="M 50 80 C 35 70, 20 70, 10 75 L 10 25 C 20 20, 35 20, 50 30 C 65 20, 80 20, 90 25 L 90 75 C 80 70, 65 70, 50 80 Z M 50 30 L 50 80" />
            ) : (
              // Closed Book shape
              <path d="M 30 15 L 75 15 C 80 15, 80 85, 75 85 L 30 85 C 25 85, 25 15, 30 15 Z M 30 15 L 30 85 M 70 15 L 70 85" />
            )}
          </svg>

          {/* Sparkly magical particles flying out from open book */}
          {trigger && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-gold"
              style={{
                top: '40%',
                left: '50%',
              }}
              animate={{
                x: [0, (i % 2 === 0 ? 1 : -1) * (40 + Math.random() * 40)],
                y: [0, -40 - Math.random() * 40],
                scale: [0.5, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5 + Math.random() * 1,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              <Star className="w-3 h-3 fill-gold text-gold" />
            </motion.div>
          ))}
        </motion.div>

        <p className="font-mono text-[9px] text-purple-400/80 uppercase tracking-widest mt-4">
          {trigger ? "Harry Potter is Born!" : "Click to Open the Spellbook"}
        </p>
      </div>
    );
  }

  // 5. Steve Jobs Apple dots transition
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={() => setTrigger(true)}>
      <div className="relative w-28 h-28 flex items-center justify-center">
        
        {/* Animated Connecting Dots Grid */}
        <AnimatePresence>
          {!trigger ? (
            <g className="absolute inset-0 flex items-center justify-center">
              {/* Central dot (Apple) */}
              <div className="w-3 h-3 rounded-full bg-white/20 relative" />
              {/* Separate disconnected dot */}
              <motion.div
                animate={{
                  x: [-35, -45, -35],
                  y: [20, -10, 20]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2.5 h-2.5 rounded-full bg-red-400 absolute"
                style={{ left: '15%', top: '60%' }}
              />
              <motion.div
                animate={{
                  x: [40, 30, 40],
                  y: [-20, 10, -20]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full bg-cyan-400 absolute"
                style={{ right: '15%', top: '25%' }}
              />
            </g>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: 'spring' }}
              onAnimationComplete={() => setTimeout(() => setTrigger(false), 3000)}
              className="flex flex-col items-center justify-center"
            >
              {/* Apple inspired silhouette outline */}
              <Apple className="w-16 h-16 text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-pulse-slow" />
              <motion.div
                className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-gold to-purple-glow mt-2"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!trigger && (
        <p className="absolute bottom-2 font-mono text-[9px] text-white/50 uppercase tracking-widest text-center animate-pulse">
          Click to Connect the Dots
        </p>
      )}
    </div>
  );
}
