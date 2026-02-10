import React, { useRef, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../constants';
import { TechIcon } from './Icons';
import ScrollReveal from './ScrollReveal';

// --- VIEW MODES ---
const VIEW_MODES = [
  { id: 'pulse', label: 'Pulse' },
  { id: 'grid', label: 'Grid' },
];

/**
 * --- PULSE VIEW COMPONENT (Carousel) ---
 * A cinematic, infinitely scrolling carousel of skills with seamless glows.
 */
const PulseView: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Multiple sets for "infinite" feel
  const loopSkills = useMemo(() => {
    return [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];
  }, []);

  const MIDDLE_SET_INDEX = 2;
  const pythonIndexInOneSet = useMemo(() => {
    const idx = SKILLS.findIndex(s => s.name === 'Python');
    return idx === -1 ? 0 : idx;
  }, []);
  const initialFocusIndex = (MIDDLE_SET_INDEX * SKILLS.length) + pythonIndexInOneSet;

  const [activeIndex, setActiveIndex] = useState(initialFocusIndex);

  // Initialize scroll position instantly
  useLayoutEffect(() => {
    const scrollToTarget = () => {
      const targetItem = itemsRef.current[initialFocusIndex];
      const container = scrollContainerRef.current;
      if (targetItem && container) {
        // Temporarily disable snap to allow precise positioning
        container.style.scrollSnapType = 'none';

        const containerCenter = container.offsetWidth / 2;
        const itemCenter = targetItem.offsetLeft + targetItem.offsetWidth / 2;
        container.scrollLeft = itemCenter - containerCenter;

        // Re-enable snap after a frame
        requestAnimationFrame(() => {
          if (container) container.style.scrollSnapType = 'x mandatory';
          setIsInitialized(true);
        });
      }
    };

    scrollToTarget();
    const timer = setTimeout(scrollToTarget, 100);
    return () => clearTimeout(timer);
  }, [initialFocusIndex]);

  const handleScroll = () => {
    if (!scrollContainerRef.current || !isInitialized) return;
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = activeIndex;
    let minDistance = Infinity;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const activeRealSkill = loopSkills[activeIndex] || SKILLS[0];

  return (
    <div className={`relative w-full h-[600px] flex flex-col justify-center overflow-visible transition-opacity duration-1000 ${isInitialized ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Glow Layer (Unclipped) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] rounded-full opacity-10 dark:opacity-25 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle, ${activeRealSkill?.color || '#888'} 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-primary via-primary/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-primary via-primary/80 to-transparent z-20 pointer-events-none" />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-center scrollbar-hide py-10 relative z-10"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="spacer shrink-0 w-[calc(50%_-_140px)] md:w-[calc(50%_-_180px)]" />

        {loopSkills.map((skill, index) => {
          const isActive = index === activeIndex;
          const isNeighbor = Math.abs(index - activeIndex) === 1;

          return (
            <motion.div
              key={`${skill.name}-${index}`}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`
                w-[240px] md:w-[320px] shrink-0 snap-center mx-6 md:mx-12 flex flex-col items-center justify-center transition-all duration-700 ease-out
                ${isActive ? 'scale-110 opacity-100 blur-0' : isNeighbor ? 'scale-95 opacity-60 blur-[4px]' : 'scale-85 opacity-10 blur-[8px]'}
              `}
            >
              {/* Card Wrapper with Gradient Border */}
              <div className={`
                    relative p-[1.5px] rounded-[3rem] w-full aspect-[4/5] overflow-visible transition-all duration-700
                    ${isActive
                  ? 'bg-gradient-to-br from-neutral-300 via-neutral-200 to-transparent dark:from-white/50 dark:via-white/5 dark:to-transparent shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)]'
                  : 'bg-neutral-200/50 dark:bg-white/5'}
                `}>
                <div className={`
                      relative w-full h-full rounded-[2.9rem] flex flex-col items-center justify-center gap-6 p-8
                      transition-all duration-700 overflow-hidden
                      ${isActive
                    ? 'bg-white dark:bg-neutral-900 shadow-inner'
                    : 'bg-white/20 dark:bg-black/20'}
                    `}>
                  {/* Shimmer Effect Removed */}

                  {/* Dynamic Icon Inner Glow */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 transition-opacity duration-700 ${isActive ? 'opacity-10 dark:opacity-20' : ''}`}
                    style={{ background: `radial-gradient(circle, ${skill.color}, transparent 60%)` }} />

                  <div className="relative w-28 h-28 md:w-36 md:h-36 mb-2 transition-transform duration-700">
                    <TechIcon
                      name={skill.icon}
                      className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] dark:brightness-110"
                    />
                  </div>

                  <div className="text-center z-10 relative">
                    <h3 className="text-2xl md:text-4xl font-bold font-display tracking-tight text-theme-text">
                      {skill.name}
                    </h3>
                    <div className={`mt-4 px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-bold border border-theme-border bg-surface text-theme-secondary`}>
                      {skill.category}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        <div className="spacer shrink-0 w-[calc(50%_-_140px)] md:w-[calc(50%_-_180px)]" />
      </div>
    </div>
  );
};

// --- BENTO GRID VIEW COMPONENT ---
const BentoView: React.FC = () => {
  const BENTO_GROUPS = [
    { title: 'Languages', items: ['Python', 'C Language', 'TypeScript', 'R Programming'] },
    { title: 'Data Science', items: ['NumPy', 'Pandas', 'Scikit-learn', 'Jupyter'] },
    { title: 'Frameworks', items: ['Flask', 'React', 'REST API', 'Git Systems'] },
    { title: 'Core Web', items: ['HTML5', 'CSS3'] }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {BENTO_GROUPS.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="relative rounded-[3rem] p-8 border border-theme-border bg-surface/50 dark:bg-neutral-900/40 overflow-hidden group hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-theme-secondary opacity-50 mb-8 relative z-10 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,209,255,0.5)]" />
              {group.title}
            </h3>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              {group.items.map(itemName => {
                const skill = SKILLS.find(s => s.name === itemName);
                if (!skill) return null;
                return (
                  <div key={itemName} className="flex flex-col items-center justify-center gap-3 p-5 rounded-[2rem] bg-surface border border-theme-border hover:bg-primary/50 hover:scale-105 transition-all duration-300 aspect-square group/item">
                    <div className="w-12 h-12 transition-all duration-500 group-hover/item:scale-110">
                      <TechIcon name={skill.icon} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-theme-secondary text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN WRAPPER COMPONENT ---
const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'pulse' | 'grid'>('pulse');

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
          <h2 className="text-5xl md:text-8xl font-display font-black text-theme-text tracking-tighter leading-tight text-center md:text-left">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </ScrollReveal>

        {/* Improved View Toggle */}
        <ScrollReveal animation="fade-up" delay={0.2} className="flex justify-center md:justify-start mt-10">
          <div className="flex items-center gap-1 p-1 rounded-full bg-surface/50 border border-theme-border backdrop-blur-3xl shadow-xl">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as 'pulse' | 'grid')}
                className={`
                        relative px-10 py-3 rounded-full text-xs font-mono tracking-[0.2em] font-bold transition-all duration-500 z-10
                        ${viewMode === mode.id
                    ? 'text-theme-text'
                    : 'text-theme-secondary hover:text-theme-text'}
                    `}
              >
                {mode.label}
                {viewMode === mode.id && (
                  <motion.div
                    layoutId="activeView"
                    className="absolute inset-0 rounded-full bg-primary/40 dark:bg-white/10 shadow-inner border border-theme-border"
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
          {viewMode === 'pulse' ? (
            <motion.div
              key="pulse"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="w-full"
            >
              <PulseView />
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
