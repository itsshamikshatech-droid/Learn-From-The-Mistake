import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Star, Cake, Gift, RotateCcw, Volume2, Award } from 'lucide-react';

export default function FinalScene() {
  const [showBirthday, setShowBirthday] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [wishesCount, setWishesCount] = useState(0);

  // Auto focus and reset when birthday mode toggled
  useEffect(() => {
    if (showBirthday) {
      setCandleLit(true);
    }
  }, [showBirthday]);

  // Lock body scroll when birthday page is active
  useEffect(() => {
    if (showBirthday) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showBirthday]);

  // Thank You Page Content
  const renderThankYouPage = () => (
    <motion.div
      key="thankyou"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-between text-center min-h-[480px]"
    >
      <div className="space-y-6 max-w-2xl mt-4">
        {/* Shimmering Badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mx-auto"
        >
          <Award className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>Assembly Concluded</span>
        </motion.div>

        {/* Big display title */}
        <h2 className="text-4xl sm:text-6xl font-sora font-extrabold tracking-tight leading-tight">
          Thank You!
        </h2>

        {/* Narrative text */}
        <p className="text-indigo-200 font-serif-italic text-xl sm:text-2xl leading-relaxed">
          "Every mistake is a secret key to wisdom."
        </p>

        <p className="font-sans text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
          Class 11-B wishes the entire school a bright, cheerful morning and a wonderful, courageous day ahead. Let us make mistakes, let us grow, and let us win!
        </p>
      </div>

      {/* Decorative Interactive row */}
      <div className="flex gap-4 my-8">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <Heart className="w-5 h-5 fill-current animate-pulse" />
        </div>
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]">
          <Star className="w-5 h-5 fill-current animate-pulse-slow" />
        </div>
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      {/* Birthday Celebration Launch Button */}
      <motion.button
        id="birthday-button"
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 0 35px rgba(139, 92, 246, 0.6)',
          borderColor: 'rgba(167, 139, 250, 0.6)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowBirthday(true)}
        className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white font-sora font-extrabold text-sm sm:text-base tracking-wider cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center gap-3 transition-all duration-300 border border-purple-400/40"
      >
        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Gift className="w-5 h-5 text-white animate-bounce" />
        <span>Today's Special Celebration!</span>
        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
      </motion.button>
    </motion.div>
  );

  // Birthday Page Content
  const renderBirthdayPage = () => (
    <motion.div
      key="birthday"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-[#040813]/98 backdrop-blur-md overflow-y-auto"
    >
      <div className="min-h-full w-full flex flex-col items-center justify-start md:justify-center p-6 text-center relative py-12">
        {/* Falling star confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => {
            const startX = Math.random() * 100;
            const delay = Math.random() * 6;
            const size = Math.random() * 14 + 6;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${startX}%`,
                  top: `-10%`,
                  fontSize: `${size}px`,
                  textShadow: '0 0 8px rgba(255,255,255,0.5)',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [`${startX}%`, `${startX + (Math.random() * 20 - 10)}%`],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: delay,
                  ease: 'linear',
                }}
              >
                {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🎈' : i % 4 === 2 ? '🎉' : '🎂'}
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-8 relative z-10 py-10">
          
          {/* Golden Crown Sparkle header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-[0.2em]"
          >
            <Star className="w-4 h-4 fill-current animate-spin-slow" />
            <span>Exclusive Celebration</span>
            <Star className="w-4 h-4 fill-current animate-spin-slow" />
          </motion.div>

          {/* The Giant Wish Title with customized neon letter transitions */}
          <div className="space-y-2">
            <motion.h3 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-2xl font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold"
            >
              HAPPY BIRTHDAY
            </motion.h3>

            {/* Glowing Dharshan T display */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: [0.95, 1.05, 1],
                opacity: 1,
                textShadow: [
                  '0 0 10px rgba(212,175,55,0.4)',
                  '0 0 25px rgba(212,175,55,0.8)',
                  '0 0 15px rgba(212,175,55,0.5)'
                ]
              }}
              transition={{ 
                scale: { duration: 0.8, ease: 'easeOut' },
                opacity: { duration: 0.5 },
                textShadow: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
              }}
              className="text-5xl sm:text-7xl lg:text-8xl font-sora font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-yellow-300 to-gold uppercase leading-none py-2"
            >
              DHARSHAN T
            </motion.h1>
          </div>

          {/* Heartfelt wish */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="font-serif-italic text-xl sm:text-3xl text-indigo-100 max-w-2xl px-4 leading-relaxed"
          >
            "Wishing you a magnificent year of boundless curiosity, grand adventures, and turning every little hurdle into a beautiful masterpiece of success!"
          </motion.p>

          {/* Custom Interactive Cake Illustration */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="relative py-4"
          >
            {/* Candle explanation tooltip */}
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3 animate-pulse">
              {candleLit ? "🕯️ Tap the candle to blow it out and make a wish!" : "✨ Wish granted! Keep shining!"}
            </p>

            <div 
              onClick={() => {
                if (candleLit) {
                  setCandleLit(false);
                  setWishesCount(prev => prev + 1);
                } else {
                  setCandleLit(true);
                }
              }}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              {/* Flame */}
              <AnimatePresence>
                {candleLit && (
                  <motion.div
                    key="flame"
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [1, 1.2, 0.9, 1.1, 1],
                      y: [0, -2, 1, -1, 0]
                    }}
                    exit={{ opacity: 0, scale: 0, y: -20 }}
                    transition={{ 
                      y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                      scale: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' }
                    }}
                    className="w-4 h-8 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full blur-[1px] absolute top-[-30px]"
                    style={{ boxShadow: '0 0 20px rgba(239,68,68,0.8), 0 0 10px rgba(245,158,11,0.6)' }}
                  />
                )}
              </AnimatePresence>

              {/* Candle Stick */}
              <div className="w-2.5 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-t relative z-10 shadow border-b border-cyan-600">
                {/* Spirals */}
                <div className="w-full h-1 bg-white/20 absolute top-2 rotate-12" />
                <div className="w-full h-1 bg-white/20 absolute top-5 rotate-12" />
                <div className="w-full h-1 bg-white/20 absolute top-8 rotate-12" />
              </div>

              {/* 3-Tier Birthday Cake illustration */}
              <div className="flex flex-col items-center mt-[-1px]">
                {/* Top Tier */}
                <div className="w-32 h-10 bg-gradient-to-r from-pink-400 to-pink-500 rounded-t-xl relative flex items-center justify-around px-2 shadow">
                  {/* Sprinkles */}
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                </div>
                
                {/* Middle Tier */}
                <div className="w-44 h-12 bg-gradient-to-r from-purple-500 to-purple-600 relative flex items-center justify-around px-4 shadow-md">
                  {/* White frost drop */}
                  <div className="absolute top-0 left-4 w-4 h-3 bg-white/20 rounded-b-lg" />
                  <div className="absolute top-0 left-16 w-6 h-4 bg-white/20 rounded-b-lg" />
                  <div className="absolute top-0 left-28 w-4 h-3 bg-white/20 rounded-b-lg" />
                  <div className="absolute top-0 left-36 w-5 h-5 bg-white/20 rounded-b-lg" />
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-300" />
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Bottom Tier */}
                <div className="w-56 h-14 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-b-xl relative flex items-center justify-around px-6 shadow-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-300" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Control row for the birthday screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            {/* Back to Assembly Thank You */}
            <button
              onClick={() => setShowBirthday(false)}
              className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 hover:border-gold/30 text-xs font-mono font-semibold tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Return to Thank You Message</span>
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full relative min-h-screen flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!showBirthday ? renderThankYouPage() : renderBirthdayPage()}
      </AnimatePresence>
    </div>
  );
}
