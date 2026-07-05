import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quotes } from '../data';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

export default function QuotesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const autoPlayRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    resetTimer();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    resetTimer();
  };

  // Variants for slide-in animation based on direction
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 100, damping: 16 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 100, damping: 16 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center pt-36 pb-24 px-6 z-10 w-full max-w-5xl mx-auto overflow-hidden">
      
      {/* Decorative quotes graphic */}
      <div className="absolute top-8 left-12 opacity-5 pointer-events-none select-none text-white">
        <span className="font-display text-[15rem] leading-none font-bold">“</span>
      </div>
      <div className="absolute bottom-8 right-12 opacity-5 pointer-events-none select-none text-white">
        <span className="font-display text-[15rem] leading-none font-bold">”</span>
      </div>

      <div className="w-full max-w-3xl glass-panel rounded-3xl p-8 sm:p-14 border border-white/5 shadow-2xl relative min-h-[280px] flex flex-col justify-between items-center text-center">
        
        {/* Carousel slide wrapper */}
        <div className="relative w-full overflow-visible flex items-center justify-center py-6 min-h-[160px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full space-y-6 flex flex-col items-center justify-center"
            >
              <Quote className="w-10 h-10 text-gold/60 animate-pulse" />
              
              <blockquote className="font-serif-italic text-2xl sm:text-3xl font-normal text-indigo-200 tracking-wide leading-relaxed px-4">
                "{quotes[currentIndex].text}"
              </blockquote>
              
              <cite className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-gold-light not-italic">
                — {quotes[currentIndex].author}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation row */}
        <div className="flex items-center justify-between w-full mt-6 border-t border-white/5 pt-6 z-20">
          
          {/* Back button */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-gold/30 cursor-pointer transition-all duration-200"
            aria-label="Previous quote"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicators */}
          <div className="flex gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                  resetTimer();
                }}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-gold w-8 shadow-[0_0_8px_#d4af37]' 
                    : 'bg-white/15 hover:bg-white/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-gold/30 cursor-pointer transition-all duration-200"
            aria-label="Next quote"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </div>
  );
}
