import { motion } from 'motion/react';
import { useMemo } from 'react';

export default function BackgroundParticles() {
  // Generate random stable properties for stars and particles
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      color: i % 3 === 0 ? 'rgba(139, 92, 246, 0.12)' : i % 3 === 1 ? 'rgba(6, 182, 212, 0.12)' : 'rgba(59, 130, 246, 0.12)',
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050B18]">
      {/* Deep Aurora Gradient Backing */}
      <div className="absolute inset-0 aurora-bg opacity-100" />
      
      {/* Animated Light Beam */}
      <motion.div 
        className="absolute w-[80vw] h-[80vh] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(0,0,0,0) 100%)',
          top: '-20%',
          left: '-10%',
        }}
        animate={{
          x: ['0vw', '40vw', '0vw'],
          y: ['0vh', '30vh', '0vh'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute w-[60vw] h-[60vh] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.03) 50%, rgba(0,0,0,0) 100%)',
          bottom: '-10%',
          right: '-10%',
        }}
        animate={{
          x: ['0vw', '-30vw', '0vw'],
          y: ['0vh', '-20vh', '0vh'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 8px #fff',
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Glowing Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-2xl"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
          }}
          animate={{
            x: [0, Math.random() * 60 - 30, Math.random() * -60 + 30, 0],
            y: [0, Math.random() * 60 - 30, Math.random() * -60 + 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
