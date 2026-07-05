import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Sun, Quote } from 'lucide-react';
import { morningQuotes } from '../data';

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const [typedText, setTypedText] = useState('');
  const [showSecondText, setShowSecondText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const firstQuestion = "Whhat if every mistake was actually the beginning of success?";
  
  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < firstQuestion.length) {
        setTypedText((prev) => prev + firstQuestion.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowSecondText(true);
        }, 800);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, []);

  // Quotes cycler
  useEffect(() => {
    if (showSecondText) {
      const quoteInterval = setInterval(() => {
        setQuoteIdx((prev) => (prev + 1) % morningQuotes.length);
      }, 5000);
      
      const buttonTimeout = setTimeout(() => {
        setShowButton(true);
      }, 1000);

      return () => {
        clearInterval(quoteInterval);
        clearTimeout(buttonTimeout);
      };
    }
  }, [showSecondText]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 z-10 overflow-hidden">
      {/* Visual Ambient Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050B18_100%)] pointer-events-none" />

      {/* Sun glow ray behind title */}
      <div className="absolute top-[20%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh] relative">
        
        {/* Class 11-B Presentation Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-transparent backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
        >
          <Sun className="w-4 h-4 text-gold animate-spin-slow" />
          <span className="font-sora text-xs md:text-sm uppercase tracking-[0.2em] text-gold font-black">
            Class 11-B
          </span>
        </motion.div>

        {/* Core theme question */}
        <h1 className="font-sora text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight min-h-[3em] flex items-center justify-center">
          <span>{typedText}</span>
          {typedText.length < firstQuestion.length && (
            <motion.span 
              className="inline-block w-1.5 h-10 md:h-14 lg:h-16 bg-gold ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          )}
        </h1>

        {/* Morning Positive Quotes Fader */}
        <div className="min-h-[120px] w-full max-w-2xl mx-auto mt-6">
          <AnimatePresence mode="wait">
            {showSecondText && (
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center space-y-3"
              >
                <div className="flex items-center gap-2 text-gold/60">
                  <Quote className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-extrabold text-gold">
                    Morning Positive Quote
                  </span>
                </div>
                <h3 className="font-serif-italic text-lg sm:text-2xl text-indigo-100 px-4 leading-relaxed font-semibold">
                  "{morningQuotes[quoteIdx]}"
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Start Button */}
      <div className="min-h-[100px] mt-8 flex items-center justify-center z-20">
        <AnimatePresence>
          {showButton && (
            <motion.button
              id="assembly-start-button"
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.8, 
                type: 'spring', 
                stiffness: 100, 
                damping: 15 
              }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 35px rgba(212, 175, 55, 0.65)',
              }}
              whileTap={{ scale: 0.96 }}
              onClick={onStart}
              className="group relative px-8 py-4 rounded-full bg-[#D4AF37] text-[#050B18] font-sora font-extrabold text-sm md:text-base tracking-wider cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-3 transition-all duration-300"
            >
              <span>Let's Dive In</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-5 h-5 text-[#050B18]" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3, duration: 2 }}
        className="absolute bottom-8 text-white text-[11px] uppercase tracking-[0.25em] font-mono font-bold"
      >
        Class 11-B Presentation • Projector Mode
      </motion.p>
    </div>
  );
}
