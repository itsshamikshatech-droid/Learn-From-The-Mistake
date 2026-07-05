import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  isFinalChapter: boolean;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

// Custom Premium Web Audio Ambient Piano Synthesizer for 100% reliable local synthesis fallback
class AmbientPianoSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private currentStep = 0;
  private filterNode: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private feedbackNode: GainNode | null = null;
  private masterGain: GainNode | null = null;

  start() {
    if (this.isPlaying) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    try {
      this.ctx = new AudioContextClass();
      this.isPlaying = true;
      this.currentStep = 0;

      // Warm lowpass filter to mimic a beautiful wooden acoustic piano body
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(680, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.1, this.ctx.currentTime);

      // Stereo delays to create a spacious physical room sound
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.setValueAtTime(0.5, this.ctx.currentTime);

      this.feedbackNode = this.ctx.createGain();
      this.feedbackNode.gain.setValueAtTime(0.38, this.ctx.currentTime);

      // Delay feedback loop routing
      this.delayNode.connect(this.feedbackNode);
      this.feedbackNode.connect(this.delayNode);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime); // Soft, premium background leveling

      // Routing
      this.filterNode.connect(this.masterGain);
      this.filterNode.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Beautiful celestial chord progression (I - V - vi - IV): C major, G major, A minor, F major
      const chords = [
        [130.81, 196.00, 261.63, 329.63], // C3, G3, C4, E4
        [98.00, 146.83, 196.00, 293.66],  // G2, D3, G3, B3
        [110.00, 164.81, 220.00, 261.63], // A2, E3, A3, C4
        [87.31, 130.81, 174.61, 220.00]   // F2, C3, F3, A3
      ];

      // Delightful, soothing, and positive melodies in the scale of C major
      const melodyNotes = [
        [261.63, 329.63, 392.00, 523.25, 587.33, 659.25], // C4, E4, G4, C5, D5, E5
        [293.66, 392.00, 493.88, 587.33, 739.99, 783.99], // D4, G4, B4, D5, F#5, G5
        [261.63, 329.63, 440.00, 523.25, 659.25, 880.00], // C4, E4, A4, C5, E5, A5
        [349.23, 440.00, 523.25, 698.46, 880.00, 1046.50] // F4, A4, C5, F5, A5, C6
      ];

      const playTone = (freq: number, startTime: number, duration: number, volume: number) => {
        if (!this.ctx || !this.isPlaying) return;

        // Combine warm pure Sine and rich Triangle oscillators for a natural Rhodes/Piano pluck
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, startTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 1.0015, startTime); // Subtle chorus depth

        toneGain.gain.setValueAtTime(0, startTime);
        toneGain.gain.linearRampToValueAtTime(volume, startTime + 0.012); // Instant piano touch
        toneGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Smooth physical decay

        osc1.connect(toneGain);
        osc2.connect(toneGain);
        
        if (this.filterNode) {
          toneGain.connect(this.filterNode);
        }

        osc1.start(startTime);
        osc2.start(startTime);

        osc1.stop(startTime + duration);
        osc2.stop(startTime + duration);
      };

      const scheduler = () => {
        if (!this.ctx || !this.isPlaying) return;

        const chordIndex = Math.floor(this.currentStep / 8) % chords.length;
        const noteIndex = this.currentStep % 8;
        const chord = chords[chordIndex];
        const melody = melodyNotes[chordIndex];
        const now = this.ctx.currentTime;

        // Slow cinematic background chords
        if (noteIndex === 0) {
          playTone(chord[0], now, 4.2, 0.35); // Root fundamental
          playTone(chord[1], now + 0.1, 3.8, 0.18); // Harmonic fifth
        } else if (noteIndex === 4) {
          playTone(chord[2], now, 2.8, 0.20); // Mid-tier inversion
          playTone(chord[3], now + 0.05, 2.5, 0.20);
        }

        // Sparkling, uplifting ambient melody cascade
        if ([1, 3, 5].includes(noteIndex)) {
          const baseNote = melody[Math.floor(Math.random() * melody.length)];
          playTone(baseNote, now, 2.0, 0.12);
        } else if (noteIndex === 6) {
          const highNote = melody[Math.floor(Math.random() * (melody.length - 2) + 2)] * 2;
          playTone(highNote, now, 1.4, 0.08); // Distant sparkle
        }

        this.currentStep++;
      };

      scheduler();
      this.intervalId = setInterval(scheduler, 800);
    } catch (e) {
      console.error("Synthesizer initialization failed:", e);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (err) {
        // Safe disposal
      }
      this.ctx = null;
    }
    this.filterNode = null;
    this.delayNode = null;
    this.feedbackNode = null;
    this.masterGain = null;
  }
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<AmbientPianoSynth | null>(null);
  const [useSynth, setUseSynth] = useState(false);

  // Initialize both Audio engines on mount
  useEffect(() => {
    // Instantiate our custom ambient synthesizer
    synthRef.current = new AmbientPianoSynth();

    // Setup HTML5 Audio with Mozart's Piano Sonata K. 545
    const audioUrl = "https://upload.wikimedia.org/wikipedia/commons/2/24/Mozart_-_Piano_Sonata_No._16_in_C_major%2C_K._545_-_I._Allegro.mp3";
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    // Listen for direct loading errors (e.g. CORS block, unsupported sources)
    const handlePlaybackError = (e: Event) => {
      console.warn("Direct MP3 playback unsupported/blocked in preview. Activating ambient synth engine fallback...", e);
      setUseSynth(true);
    };

    audio.addEventListener('error', handlePlaybackError);
    audio.addEventListener('stalled', handlePlaybackError);

    // Initial attempt to trigger background track if active
    if (isPlaying && !useSynth) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked. Will play upon first user interaction.", err);
        // Switch to synth if the block or format is unsupported
        if (err.name === 'NotSupportedError' || err.message?.includes('supported sources')) {
          setUseSynth(true);
        }
      });
    }

    return () => {
      audio.removeEventListener('error', handlePlaybackError);
      audio.removeEventListener('stalled', handlePlaybackError);
      audio.pause();
      audioRef.current = null;
      if (synthRef.current) {
        synthRef.current.stop();
        synthRef.current = null;
      }
    };
  }, []);

  // Synchronize audio engines dynamically when playing state or fallback engine toggles
  useEffect(() => {
    const audio = audioRef.current;
    const synth = synthRef.current;

    if (isPlaying) {
      if (useSynth) {
        if (audio) {
          try {
            audio.pause();
          } catch (e) {
            // Safe pause
          }
        }
        synth?.start();
      } else {
        synth?.stop();
        if (audio && audio.paused) {
          audio.play().catch((err) => {
            console.log("Play pending click interaction:", err);
            if (err.name === 'NotSupportedError' || err.message?.includes('supported sources')) {
              setUseSynth(true);
            }
          });
        }
      }
    } else {
      if (audio) {
        try {
          audio.pause();
        } catch (e) {
          // Safe pause
        }
      }
      synth?.stop();
    }
  }, [isPlaying, useSynth]);

  // Robust document-wide interaction listener to satisfy browser autoplay requirements
  useEffect(() => {
    const unlockAndPlay = () => {
      const audio = audioRef.current;
      const synth = synthRef.current;

      if (isPlaying) {
        if (useSynth) {
          synth?.start();
        } else if (audio && audio.paused) {
          audio.play().catch((err) => {
            console.log("Interaction playback unlock failed, enabling synth engine:", err);
            setUseSynth(true);
          });
        }
      }
    };

    document.addEventListener('click', unlockAndPlay, { passive: true });
    document.addEventListener('touchstart', unlockAndPlay, { passive: true });
    document.addEventListener('keydown', unlockAndPlay, { passive: true });

    return () => {
      document.removeEventListener('click', unlockAndPlay);
      document.removeEventListener('touchstart', unlockAndPlay);
      document.removeEventListener('keydown', unlockAndPlay);
    };
  }, [isPlaying, useSynth]);

  // Handle manual play/mute toggle button click
  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    const audio = audioRef.current;
    const synth = synthRef.current;

    if (nextState) {
      if (useSynth) {
        synth?.start();
      } else if (audio) {
        audio.play().catch((err) => {
          console.warn("Direct play failed, switching to synth engine:", err);
          setUseSynth(true);
        });
      }
    } else {
      if (audio) {
        try {
          audio.pause();
        } catch (e) {
          // Safe pause
        }
      }
      synth?.stop();
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <motion.button
        id="assembly-audio-toggle"
        onClick={togglePlayback}
        className="glass-card flex items-center gap-2.5 px-4 py-2 rounded-full text-white/90 font-sans text-xs font-semibold uppercase tracking-wider hover:border-gold/50 cursor-pointer shadow-lg hover:shadow-gold/10 transition-all duration-300 pointer-events-auto border border-white/10 bg-black/40 backdrop-blur-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-gold animate-pulse" />
            <span>Mute</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-white/40" />
            <span>Unmute</span>
          </>
        )}
      </motion.button>

      {isPlaying && (
        <div className="flex items-end gap-0.5 h-4 px-1.5">
          {[1, 2, 3, 4, 5].map((bar) => (
            <motion.div
              key={bar}
              className="w-0.75 bg-gold rounded-full"
              animate={{
                height: [
                  bar === 1 ? '4px' : bar === 2 ? '10px' : bar === 3 ? '16px' : bar === 4 ? '6px' : '12px',
                  bar === 1 ? '16px' : bar === 2 ? '4px' : bar === 3 ? '8px' : bar === 4 ? '14px' : '5px',
                  bar === 1 ? '8px' : bar === 2 ? '15px' : bar === 3 ? '4px' : bar === 4 ? '10px' : '16px',
                  bar === 1 ? '4px' : bar === 2 ? '10px' : bar === 3 ? '16px' : bar === 4 ? '6px' : '12px',
                ],
              }}
              transition={{
                duration: 1.2 + bar * 0.15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

