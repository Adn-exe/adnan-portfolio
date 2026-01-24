
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ElysiumLogo } from './Icons';

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
  const [statusIdx, setStatusIdx] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const [milestone, setMilestone] = useState(0);

  const loadingStatuses = useMemo(() => [
    "Loading",
    "Preparing content",
    "Almost there",
    "Setting things up",
    "Just a moment",
    "Ready",
    "Welcome"
  ], []);

  // Generate particles for neural network effect
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i / 16) * 360,
      radius: 80 + Math.random() * 60,
      speed: 0.3 + Math.random() * 0.4,
      size: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
  }, []);

  // Track milestones for pulse effects
  useEffect(() => {
    if (progress >= 25 && milestone < 25) setMilestone(25);
    else if (progress >= 50 && milestone < 50) setMilestone(50);
    else if (progress >= 75 && milestone < 75) setMilestone(75);
    else if (progress >= 100 && milestone < 100) setMilestone(100);
  }, [progress, milestone]);

  useEffect(() => {
    const duration = 2800;
    const interval = 16;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsFinishing(true);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return next;
      });
    }, interval);

    const statusTimer = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
      setStatusIdx((prev) => (prev < loadingStatuses.length - 1 ? prev + 1 : prev));
    }, duration / loadingStatuses.length);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 60,
        y: (e.clientY / window.innerHeight - 0.5) * 60,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onComplete, loadingStatuses]);

  const getParticlePosition = useCallback((particle: Particle, progressVal: number) => {
    const time = Date.now() / 1000;
    const angle = particle.angle + (time * particle.speed * 50) + (progressVal * 2);
    const x = Math.cos((angle * Math.PI) / 180) * particle.radius;
    const y = Math.sin((angle * Math.PI) / 180) * particle.radius;
    return { x, y };
  }, []);

  // Generate connections between nearby particles
  const getConnections = useCallback(() => {
    const connections: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const pos1 = getParticlePosition(particles[i], progress);
        const pos2 = getParticlePosition(particles[j], progress);
        const distance = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
        if (distance < 120) {
          connections.push({
            x1: pos1.x,
            y1: pos1.y,
            x2: pos2.x,
            y2: pos2.y,
            opacity: (1 - distance / 120) * 0.6 * (progress / 100),
          });
        }
      }
    }
    return connections;
  }, [particles, progress, getParticlePosition]);

  const progressColor = progress >= 100 ? '#FFD700' : progress >= 75 ? '#FFFFFF' : '#38BDF8';

  return (
    <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) ${isFinishing ? 'opacity-0 scale-[2] blur-3xl' : 'opacity-100'}`}>

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-primary">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at center, rgba(56, 189, 248, ${0.1 + progress / 500}) 0%, rgba(168, 85, 247, ${0.05 + progress / 800}) 40%, transparent 70%)`,
          }}
        />
      </div>

      {/* Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(1, 2, 8, 0.8) 100%)',
        }}
      />

      {/* Dynamic Background Data Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-[-50%] opacity-[0.05] bg-[radial-gradient(#38BDF8_1px,transparent_1px)] bg-[size:40px_40px] transition-transform duration-[1.5s] ease-out"
          style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px) rotate(${progress * 0.15}deg)` }}
        />

        {/* Secondary Grid Layer */}
        <div
          className="absolute inset-[-50%] opacity-[0.03] bg-[radial-gradient(#A855F7_1px,transparent_1px)] bg-[size:60px_60px] transition-transform duration-[2s] ease-out"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) rotate(${-progress * 0.1}deg)` }}
        />

        {/* Holographic Scanning Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-scanline" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent animate-scanline [animation-delay:2s]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Quantum Core Visualizer */}
        <div
          className="relative w-80 h-80 flex items-center justify-center transition-transform duration-700 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Neural Network Connections SVG */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g transform="translate(160, 160)">
              {getConnections().map((conn, i) => (
                <line
                  key={i}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke="url(#connectionGradient)"
                  strokeWidth="1"
                  opacity={conn.opacity}
                  className="animate-connection-pulse"
                />
              ))}
            </g>
          </svg>

          {/* Neural Particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {particles.map((particle) => {
              const pos = getParticlePosition(particle, progress);
              return (
                <div
                  key={particle.id}
                  className="absolute rounded-full animate-particle-float"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    background: particle.id % 2 === 0
                      ? 'radial-gradient(circle, #38BDF8, transparent)'
                      : 'radial-gradient(circle, #A855F7, transparent)',
                    boxShadow: particle.id % 2 === 0
                      ? '0 0 10px #38BDF8, 0 0 20px #38BDF8'
                      : '0 0 10px #A855F7, 0 0 20px #A855F7',
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    opacity: 0.3 + (progress / 150),
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Enhanced Animated Rings */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-breathe"
              style={{
                width: `${100 - i * 12}%`,
                height: `${100 - i * 12}%`,
                animation: `spin ${10 + i * 3}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}, breathe ${3 + i * 0.5}s ease-in-out infinite`,
                background: i === 0
                  ? `conic-gradient(from ${progress * 3.6}deg, transparent, rgba(56, 189, 248, ${0.3 + progress / 300}), transparent)`
                  : 'none',
                border: `${i % 2 === 0 ? '1px' : '2px'} ${i % 3 === 0 ? 'solid' : 'dashed'} rgba(56, 189, 248, ${0.05 + (progress / 400) + (i * 0.02)})`,
                boxShadow: i === 0
                  ? `0 0 ${20 + progress / 3}px rgba(56, 189, 248, ${progress / 250}), inset 0 0 ${10 + progress / 5}px rgba(168, 85, 247, ${progress / 400})`
                  : 'none',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}

          {/* Central Hologram Core */}
          <div className="relative group scale-100 flex items-center justify-center">
            {/* Outer Glow Layers */}
            <div
              className="absolute rounded-full blur-[60px] animate-core-pulse"
              style={{
                width: 120 + progress / 2,
                height: 120 + progress / 2,
                background: `radial-gradient(circle, rgba(56, 189, 248, ${0.4 + progress / 250}) 0%, rgba(168, 85, 247, ${0.2 + progress / 400}) 50%, transparent 70%)`,
              }}
            />
            <div
              className="absolute rounded-full blur-[30px] animate-pulse-slow"
              style={{
                width: 80 + progress / 3,
                height: 80 + progress / 3,
                background: `radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, transparent 60%)`,
              }}
            />

            {/* The Logo */}
            <ElysiumLogo
              className="w-24 h-24 text-accent z-10 transition-all duration-500"
              style={{
                filter: `drop-shadow(0 0 ${20 + progress / 5}px rgba(56, 189, 248, ${0.5 + progress / 200})) drop-shadow(0 0 ${40 + progress / 3}px rgba(168, 85, 247, 0.3))`,
                transform: `scale(${1 + progress / 500})`,
              }}
            />

            {/* Energy Discharge Orbs */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#38BDF8' : '#A855F7',
                  boxShadow: i % 2 === 0
                    ? '0 0 8px #38BDF8, 0 0 16px #38BDF8'
                    : '0 0 8px #A855F7, 0 0 16px #A855F7',
                  transform: `rotate(${i * 60 + progress * 3}deg) translate(${55 + Math.sin(progress / 10) * 5}px)`,
                  opacity: (progress / 100) * 0.9,
                }}
              />
            ))}
          </div>
        </div>

        {/* Status Messaging & HUD */}
        <div className="mt-16 w-[480px] flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-accent to-accent/40" />
            <div className="relative h-5 overflow-hidden min-w-[240px] text-center">
              <span
                key={statusIdx}
                className={`text-accent font-mono text-[10px] tracking-[0.5em] uppercase block font-black ${glitchActive ? 'animate-glitch' : 'animate-reveal'}`}
                style={{
                  textShadow: glitchActive
                    ? '2px 0 #A855F7, -2px 0 #38BDF8'
                    : '0 0 10px rgba(56, 189, 248, 0.5)',
                }}
              >
                {loadingStatuses[statusIdx]}
              </span>
            </div>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-accent-purple to-accent-purple/40" />
          </div>

          <div className="flex flex-col items-center gap-5 w-full">
            {/* Animated Progress Counter */}
            <div className="flex items-end gap-2 h-12">
              <span
                className="text-6xl font-display font-black italic tracking-tighter tabular-nums transition-all duration-300"
                style={{
                  color: progressColor,
                  textShadow: `0 0 30px ${progressColor}40, 0 0 60px ${progressColor}20`,
                  transform: milestone === Math.round(progress) && milestone > 0 ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {Math.round(progress)}
              </span>
              <div className="flex flex-col mb-2">
                <span className="text-accent text-[9px] font-mono font-bold opacity-70 tracking-widest">%</span>
                <span className="text-accent-purple text-[9px] font-mono font-bold opacity-70 tracking-widest">LOAD</span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="w-72 h-[4px] bg-white/5 relative rounded-full overflow-hidden">
              {/* Segment markers */}
              <div className="absolute inset-0 flex justify-between px-[1px]">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] h-full bg-primary/50 z-10"
                  />
                ))}
              </div>

              {/* Main progress fill */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-100 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #38BDF8, #A855F7, #38BDF8)',
                  backgroundSize: '200% 100%',
                  animation: 'gradient 2s linear infinite',
                  boxShadow: `0 0 20px #38BDF8, 0 0 40px rgba(168, 85, 247, 0.5)`,
                }}
              />

              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/30 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-accent/30 to-transparent" />
      </div>
      <div className="absolute top-8 right-8 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent-purple/30 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-accent-purple/30 to-transparent" />
      </div>
      <div className="absolute bottom-8 left-8 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-accent/30 to-transparent" />
      </div>
      <div className="absolute bottom-8 right-8 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent-purple/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent-purple/30 to-transparent" />
      </div>
    </div>
  );
};

export default Loader;
