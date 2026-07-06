import React, { useRef, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useTransform, MotionValue } from 'framer-motion';
import { SKILLS } from '../constants';
import { TechIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import './marquee.css';

// --- VIEW MODES ---
const VIEW_MODES = [
  { id: 'loop', label: 'Loop' },
  { id: 'grid', label: 'Grid' },
];



const LoopView: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  // Duplicate skills for infinite loop
  const duplicatedSkills = [...SKILLS, ...SKILLS];

  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* Cinematic Vignette */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-primary via-primary/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-primary via-primary/80 to-transparent z-20 pointer-events-none" />

      <div
        className="flex w-full overflow-hidden relative"
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {[1, 2].map((set) => (
          <div
            key={`set-${set}`}
            className="flex flex-nowrap whitespace-nowrap shrink-0 animate-marquee will-change-transform gap-[60px] px-[30px]"
            style={{ animationPlayState: 'inherit' }}
          >
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill.name}-loop-${set}-${index}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="flex flex-col items-center justify-center gap-4 p-8 rounded-[2.5rem] bg-surface border border-theme-border hover:bg-primary transition-all duration-300 w-[200px] md:w-[220px] group cursor-pointer"
              >
                <div className="h-[60px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <TechIcon name={skill.icon} className="h-full w-auto object-contain" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-theme-text mb-1">{skill.name}</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-theme-secondary opacity-50">{skill.category}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const BentoCard: React.FC<{
  group: any;
  idx: number;
  className?: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ group, idx, className = "", mouseX, mouseY }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xVal = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;

    const x = xVal / width - 0.5;
    const y = yVal / height - 0.5;

    setRotateX(-y * 8);
    setRotateY(x * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const relX = useTransform(mouseX, (val: number) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    return val - rect.left;
  });

  const relY = useTransform(mouseY, (val: number) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    return val - rect.top;
  });

  const springX = useSpring(relX, { stiffness: 150, damping: 25 });
  const springY = useSpring(relY, { stiffness: 150, damping: 25 });

  const opacity = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const radius = Math.max(rect.width, rect.height) * 1.5;
    return Math.max(0, 1 - distance / radius);
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      className={`relative rounded-[1.5rem] p-6 border border-theme-border bg-surface/50 dark:bg-neutral-900/40 overflow-hidden group hover:shadow-2xl transition-[border-color,box-shadow] duration-500 ${className}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity,
          background: useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, var(--accent-glow, rgba(0, 209, 255, 0.12)), transparent 80%)`,
        }}
      />

      <motion.div
        className="absolute inset-[1px] rounded-[1.4rem] pointer-events-none z-10 box-content border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${springX}px ${springY}px, black, transparent)`,
          maskImage: useMotionTemplate`radial-gradient(200px circle at ${springX}px ${springY}px, black, transparent)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-theme-secondary opacity-50 mb-6 relative z-10 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,209,255,0.5)]" />
        {group.title}
      </h3>

      <div className={`grid gap-3 relative z-10 h-[calc(100%-40px)] ${group.innerGrid || 'grid-cols-2'}`}>
        {group.items.map((itemName: string, i: number) => {
          const skill = SKILLS.find(s => s.name === itemName);
          if (!skill) return null;
          const isFeatured = group.featured && i === 0;
          return (
            <div
              key={itemName}
              className={`
                flex flex-col items-center justify-center gap-2 p-3 rounded-[1.2rem] bg-surface border border-theme-border hover:bg-primary/50 hover:scale-[1.02] transition-all duration-300 group/item cursor-pointer
                ${isFeatured ? 'col-span-2 bg-primary/20 border-accent/20' : ''}
              `}
            >
              <div className={`${isFeatured ? 'w-12 h-12' : 'w-8 h-8'} transition-all duration-500 group-hover/item:scale-110`}>
                <TechIcon name={skill.icon} className="w-full h-full object-contain" />
              </div>
              <span className={`${isFeatured ? 'text-[10px]' : 'text-[8px]'} font-bold text-theme-secondary text-center leading-tight opacity-70 group-hover/item:opacity-100`}>
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// --- BENTO GRID VIEW COMPONENT ---
const BentoView: React.FC = () => {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(-500);
    mouseY.set(-500);
  };

  const BENTO_GROUPS = [
    {
      title: 'Languages',
      items: ['Python', 'C Language', 'TypeScript', 'R Programming'],
      span: 'md:col-span-2 md:row-span-2',
      innerGrid: 'grid-cols-2 grid-rows-2'
    },
    {
      title: 'Data Science',
      items: ['NumPy', 'Pandas', 'Scikit-learn', 'Jupyter'],
      span: 'md:col-span-1 md:row-span-2',
      innerGrid: 'grid-cols-2 md:grid-cols-1'
    },
    {
      title: 'Frameworks',
      items: ['Flask', 'React', 'REST API', 'Git Systems'],
      span: 'md:col-span-2 md:row-span-1',
      innerGrid: 'grid-cols-2 grid-rows-2',
      featured: false
    },
    {
      title: 'Core Web',
      items: ['HTML5', 'CSS3'],
      span: 'md:col-span-1 md:row-span-1',
      innerGrid: 'grid-cols-2 grid-rows-1'
    }
  ];

  return (
    <div
      className="w-full max-w-5xl mx-auto px-6 py-6 group/grid"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
        {BENTO_GROUPS.map((group, index) => (
          <BentoCard
            key={group.title}
            group={group}
            idx={index}
            className={group.span}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>
    </div>
  );
};

// --- MAIN WRAPPER COMPONENT ---
const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'loop'>('loop');

  return (
    <section
      id="skills"
      className="relative z-20 bg-primary overflow-hidden flex flex-col items-center transition-colors duration-1000 pt-20 pb-32"
    >
      {/* Bulb Glow for Light Mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-0 transition-opacity duration-1000 dark:hidden [.light_&]:opacity-40"
        style={{ background: 'radial-gradient(circle at 50% 0%, #FFF9E5, transparent 70%)' }} />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 brightness-200 contrast-100 mix-blend-overlay pointer-events-none" />

      {/* Header Container */}
      <div className="container mx-auto px-6 mb-10">
        <ScrollReveal animation="fade-right">
          <h2 className="text-5xl md:text-7xl font-display font-black text-theme-text tracking-tighter leading-tight text-center md:text-left">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </ScrollReveal>

        {/* Improved View Toggle */}
        <ScrollReveal animation="fade-up" delay={0.2} className="flex justify-center md:justify-start mt-10">
          <div className="flex items-center gap-1 p-1 rounded-full bg-surface/50 border border-theme-border backdrop-blur-3xl shadow-xl">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as 'grid' | 'loop')}
                className={`
                        relative px-6 py-2.5 rounded-full text-[10px] font-mono tracking-[0.2em] font-bold transition-all duration-500 z-10
                        ${viewMode === mode.id
                    ? 'text-theme-text'
                    : 'text-theme-secondary hover:text-theme-text'}
                    `}
              >
                {mode.label}
                {viewMode === mode.id && (
                  <motion.div
                    layoutId="activeView"
                    className="absolute inset-0 rounded-full bg-slate-200/60 dark:bg-white/10 shadow-inner border border-theme-border"
                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Main Content Area */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          {viewMode === 'loop' ? (
            <motion.div
              key="loop"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="w-full"
            >
              <LoopView />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="w-full"
            >
              <BentoView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default Skills;
