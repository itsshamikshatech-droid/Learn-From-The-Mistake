import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { chapters } from './data';
import BackgroundParticles from './components/BackgroundParticles';
import AudioPlayer from './components/AudioPlayer';
import ChapterNavigation from './components/ChapterNavigation';
import LandingScreen from './components/LandingScreen';
import AssemblyStorySection from './components/AssemblyStorySection';
import PersonalitiesSection from './components/PersonalitiesSection';
import QuotesCarousel from './components/QuotesCarousel';
import FinalScene from './components/FinalScene';
import { ChevronLeft, ChevronRight, Presentation, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentChapterId, setCurrentChapterId] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Keyboard navigation support for smartboard remotes/slide clickers!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentChapterId === 0) return; // ignore on landing screen
      
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterId]);

  const handleStart = () => {
    setDirection(1);
    setCurrentIndexAndScroll(1);
    setIsAudioPlaying(true); // Autoplay background music once they enter!
  };

  const handleNext = () => {
    if (currentChapterId < chapters.length - 1) {
      setDirection(1);
      setCurrentIndexAndScroll(currentChapterId + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterId > 1) {
      setDirection(-1);
      setCurrentIndexAndScroll(currentChapterId - 1);
    }
  };

  const selectChapter = (id: number) => {
    setDirection(id > currentChapterId ? 1 : -1);
    setCurrentIndexAndScroll(id);
  };

  const setCurrentIndexAndScroll = (id: number) => {
    setCurrentChapterId(id);
    // Smoothly scroll back to top of page when changing chapters
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render active chapter component
  const renderActiveChapter = () => {
    switch (currentChapterId) {
      case 1:
        return <AssemblyStorySection />;
      case 2:
        return <PersonalitiesSection />;
      case 3:
        return <QuotesCarousel />;
      case 4:
        return <FinalScene />;
      default:
        return null;
    }
  };

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100vw' : '-100vw',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 90, damping: 16 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100vw' : '100vw',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 90, damping: 16 },
        opacity: { duration: 0.5 }
      }
    })
  };

  const currentChapter = chapters.find((c) => c.id === currentChapterId);
  const isFinalChapter = currentChapterId === chapters.length - 1;

  return (
    <div className="relative min-h-screen bg-[#050B18] text-white overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
      
      {/* Background stars and glowing particles (rendered everywhere) */}
      <BackgroundParticles />

      {/* Ambient custom audio score player (toggleable in upper right) */}
      <AudioPlayer 
        isFinalChapter={isFinalChapter} 
        isPlaying={isAudioPlaying} 
        setIsPlaying={setIsAudioPlaying} 
      />

      {/* Side dot indicator for presentation tracking */}
      <ChapterNavigation
        chapters={chapters}
        currentChapterId={currentChapterId}
        onSelectChapter={selectChapter}
      />

      {/* Top micro progress bar for the classroom assembly */}
      {currentChapterId > 0 && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-glow via-gold to-cyan-glow"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentChapterId / (chapters.length - 1)) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      )}

      {/* Main Orchestrator layout */}
      <div className="relative min-h-screen flex flex-col justify-between">
        
        {/* Floating Top presentation theme header (visible post-landing) */}
        {currentChapterId > 0 && (
          <header className="absolute top-8 left-6 right-6 sm:left-12 sm:right-12 z-30 flex justify-between items-end pointer-events-none">
            <div className="pointer-events-auto">
              <p className="text-cyan-400 font-inter tracking-[0.25em] text-[9px] sm:text-xs uppercase mb-1">
                School Assembly Presentation
              </p>
              <h1 className="text-sm sm:text-3xl font-sora font-bold leading-tight">
                Learn From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Mistake</span>
              </h1>
            </div>
            <div className="text-right hidden md:block pointer-events-auto">
              <div className="text-lg font-serif-italic text-indigo-200">Class 11-B Assembly</div>
              <div className="w-16 h-0.5 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)] ml-auto mt-2" />
            </div>
          </header>
        )}

        <div className="flex-1 w-full relative">
          <AnimatePresence mode="wait">
            {currentChapterId === 0 ? (
              <motion.div
                key="landing"
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <LandingScreen onStart={handleStart} />
              </motion.div>
            ) : (
              <motion.div
                key={currentChapterId}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full px-4 sm:px-8"
              >
                {renderActiveChapter()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Presentation Remote (Smartboard Controller Dock) */}
        {currentChapterId > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="glass-card px-4 py-3 rounded-2xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-between w-full relative overflow-hidden"
            >
              {/* Remote Glass Backlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-glow/5 via-gold/5 to-cyan-glow/5 pointer-events-none" />

              {/* Prev button */}
              <button
                id="assembly-remote-prev"
                onClick={handlePrev}
                disabled={currentChapterId <= 1}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-heading font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  currentChapterId <= 1
                    ? 'opacity-20 cursor-not-allowed text-white/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {/* Central Chapter Title / Page indicator */}
              <div className="flex flex-col items-center">
                <span className="font-mono text-[9px] text-gold font-bold uppercase tracking-widest">
                  Chapter 0{currentChapterId}
                </span>
                <span className="font-sans text-[10px] font-bold text-white/80 uppercase tracking-wider line-clamp-1 max-w-[120px] text-center">
                  {currentChapter?.title}
                </span>
              </div>

              {/* Next button */}
              <button
                id="assembly-remote-next"
                onClick={handleNext}
                disabled={currentChapterId >= chapters.length - 1}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-heading font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  currentChapterId >= chapters.length - 1
                    ? 'opacity-20 cursor-not-allowed text-white/30'
                    : 'text-gold hover:text-gold-light hover:bg-gold/10 border border-transparent hover:border-gold/20'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
