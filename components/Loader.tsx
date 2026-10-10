
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoaderLogo from './LoaderLogo';

interface Particle {
  id: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  delay: number;
}

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [statusText, setStatusText] = useState("ACTING BUSY");

  useEffect(() => {
    const duration = 2000;
    const interval = 16;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsFinishing(true);
          setTimeout(onComplete, 600);
          return 100;
        }
        return next;
      });
    }, interval);

    // Cycle status text (niche sarcastic dev humor, max 2 words each)
    const statusInterval = setInterval(() => {
      setStatusText(prev => {
        if (prev === "ACTING BUSY") return "FIGHTING PIXELS";
        if (prev === "FIGHTING PIXELS") return "BLAMING CACHE";
        return "SHIP IT";
      });
    }, 450);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-primary transition-all duration-[800ms] cubic-bezier(0.23, 1, 0.32, 1) ${isFinishing ? 'opacity-0 scale-[1.1] blur-xl' : 'opacity-100'}`}>

      {/* Dynamic Flowing Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-[-50%] opacity-[0.15]"
          animate={{
            background: [
              `radial-gradient(circle at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, rgba(0, 209, 255, 0.15) 0%, transparent 50%)`,
              `radial-gradient(circle at ${40 - mousePos.x * 0.5}% ${60 - mousePos.y * 0.5}%, rgba(0, 209, 255, 0.1) 0%, transparent 45%)`,
              `radial-gradient(circle at ${60 + mousePos.x * 0.5}% ${40 + mousePos.y * 0.5}%, rgba(0, 209, 255, 0.15) 0%, transparent 50%)`,
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Moving Neon Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px]"
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 150, -150, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Enhanced Central Element */}
        <div
          className="relative transition-transform duration-700 ease-out flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80"
          style={{ transform: `perspective(1000px) rotateX(${mousePos.y * -0.3}deg) rotateY(${mousePos.x * 0.3}deg)` }}
        >
          {/* Circling Sentinel Arcs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-accent/25"
              style={{
                width: `${100 - i * 15}%`,
                height: `${100 - i * 15}%`,
                borderTopColor: 'var(--accent)',
                borderRightColor: 'transparent',
                borderBottomColor: 'var(--accent)',
                borderLeftColor: 'transparent',
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.02, 1],
              }}
              transition={{
                rotate: { duration: 3.5 + i * 1.2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          ))}

          {/* Quantum Matrix Logo with Progressive Stroke Tracing */}
          <LoaderLogo progress={progress} isFinishing={isFinishing} />
        </div>

        {/* Minimal Progress HUD */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center">
          {/* Animated Status Text */}
          <div className="h-6 mb-3 overflow-hidden flex items-center justify-center">
            <motion.span
              key={statusText}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-accent font-mono text-[11px] sm:text-xs tracking-[0.55em] uppercase block font-medium"
            >
              {statusText}
            </motion.span>
          </div>

          <div className="flex items-baseline gap-2.5 mb-6">
            <span className="text-6xl sm:text-7xl font-display font-black text-theme-text tabular-nums italic tracking-tighter leading-none select-none">
              {Math.round(progress)}
            </span>
            <span className="text-accent text-xs sm:text-sm font-mono font-bold opacity-75 leading-none select-none">%</span>
          </div>

          {/* Shimmering High-Precision Progress Bar */}
          <div className="w-60 sm:w-72 h-[3px] bg-theme-text/10 relative rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_8px_var(--accent)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
