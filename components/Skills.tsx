import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS, SKILL_CATEGORIES } from '../constants';
import { TechIcon } from './Icons';
import ScrollReveal from './ScrollReveal';

// --- Skill Chip (inside expanded bar) ---
const SkillChip: React.FC<{ name: string; index: number }> = ({ name, index }) => {
  const skill = SKILLS.find(s => s.name === name);
  if (!skill) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary/60 border border-theme-border backdrop-blur-sm hover:border-accent/40 hover:bg-primary/80 transition-all duration-300 group/chip cursor-default"
    >
      <div className="w-7 h-7 flex-shrink-0 transition-transform duration-300 group-hover/chip:scale-110">
        <TechIcon name={skill.icon} className="w-full h-full object-contain" />
      </div>
      <span className="text-sm font-medium text-theme-text whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
};

// --- Category Bar ---
const CategoryBar: React.FC<{
  category: typeof SKILL_CATEGORIES[0];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  index: number;
}> = ({ category, isActive, onHover, onLeave, onClick, index }) => {
  const isRight = category.alignment === 'right';

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="w-full cursor-pointer"
    >
      <div
        className={`
          relative w-full overflow-hidden transition-colors duration-500
          border-y border-theme-border
          ${isActive
            ? 'bg-surface/80 border-accent/20'
            : 'bg-transparent hover:bg-surface/30'
          }
        `}
      >
        {/* Active accent edge line */}
        <motion.div
          className={`absolute top-0 bottom-0 w-[3px] bg-accent shadow-[0_0_12px_rgba(0,209,255,0.4)] [.light_&]:shadow-[0_0_12px_rgba(217,119,6,0.4)] ${isRight ? 'right-0' : 'left-0'}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0.5 }}
        />

        {/* Category Label Row */}
        <div
          className={`flex items-center px-8 md:px-16 lg:px-24 py-6 md:py-8 ${
            isRight ? 'justify-end' : 'justify-start'
          }`}
        >
          <div className={`flex items-center gap-4 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Number indicator */}
            <span className="text-[11px] font-mono text-theme-secondary/40 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Category Title */}
            <h3
              className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight transition-colors duration-400 ${
                isActive ? 'text-accent' : 'text-theme-text'
              }`}
            >
              {category.title}
            </h3>

            {/* Arrow indicator */}
            <motion.div
              animate={{
                rotate: isActive ? 90 : 0,
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-theme-secondary/30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expanded Skills Area */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: 'spring', stiffness: 300, damping: 32 },
                opacity: { duration: 0.25 },
              }}
              className="overflow-hidden"
            >
              <div
                className={`flex flex-wrap gap-3 px-8 md:px-16 lg:px-24 pb-8 ${
                  isRight ? 'justify-end' : 'justify-start'
                }`}
              >
                {category.skills.map((skillName, i) => (
                  <SkillChip key={skillName} name={skillName} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Main Skills Component ---
const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveCategory(id);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
      timeoutRef.current = null;
    }, 400);
  }, []);

  const handleClick = useCallback((id: string) => {
    setActiveCategory(prev => prev === id ? null : id);
  }, []);

  return (
    <section
      id="skills"
      className="relative z-20 bg-primary overflow-hidden flex flex-col items-center transition-colors duration-1000 pt-20 pb-24"
    >
      {/* Bulb Glow for Light Mode */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-0 transition-opacity duration-1000 dark:hidden [.light_&]:opacity-40"
        style={{ background: 'radial-gradient(circle at 50% 0%, #FFF9E5, transparent 70%)' }}
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 brightness-200 contrast-100 mix-blend-overlay pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 mb-16">
        <ScrollReveal animation="fade-right">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-full"></div>
            <span className="text-accent font-medium text-sm tracking-widest uppercase">Skills</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-theme-text tracking-tighter leading-tight text-center md:text-left">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Flowing Menu */}
      <div className="w-full relative">
        {/* Top decorative line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-theme-border to-transparent" />

        <div className="flex flex-col -space-y-px">
          {SKILL_CATEGORIES.map((category, index) => (
            <CategoryBar
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onHover={() => handleHover(category.id)}
              onLeave={handleLeave}
              onClick={() => handleClick(category.id)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-theme-border to-transparent" />
      </div>
    </section>
  );
};

export default Skills;
