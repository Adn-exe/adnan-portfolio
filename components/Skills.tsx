import React, { useState, useMemo } from 'react';
import { SKILLS } from '../constants';
import { TechIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import RadarChart from './RadarChart';
import { Skill } from '../types';
import { useAudio } from '../hooks/useAudio';

type CategoryFilter = 'Languages' | 'AI & ML' | 'Backend' | 'Web & Systems';

export const Skills: React.FC = () => {
  const { playClick, playHover } = useAudio();

  // Initial 6 skills positioned at each of the 6 web ends (axes 0 to 5)
  const defaultEndSkills = useMemo(() => {
    return [
      SKILLS.find((s) => s.name === 'Python') || SKILLS[0], // End 0: Top
      SKILLS.find((s) => s.name === 'NumPy') || SKILLS[4],  // End 1: Top-Right
      SKILLS.find((s) => s.name === 'FastAPI') || SKILLS[7], // End 2: Bottom-Right
      SKILLS.find((s) => s.name === 'React') || SKILLS[10], // End 3: Bottom
      SKILLS.find((s) => s.name === 'Prompt Engineering') || SKILLS[13], // End 4: Bottom-Left
      SKILLS.find((s) => s.name === 'C Language') || SKILLS[1], // End 5: Top-Left
    ];
  }, []);

  const [endSkills, setEndSkills] = useState<Skill[]>(defaultEndSkills);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(() => defaultEndSkills[0]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Languages');
  const [draggedSkill, setDraggedSkill] = useState<Skill | null>(null);

  // Filter categories
  const categories: CategoryFilter[] = ['Languages', 'AI & ML', 'Backend', 'Web & Systems'];

  // Filter skills based on active category
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'Languages') return SKILLS.filter((s) => s.category === 'Languages');
    if (activeCategory === 'Backend') return SKILLS.filter((s) => s.category === 'Frameworks' && s.domainIndex === 2);
    if (activeCategory === 'AI & ML') return SKILLS.filter((s) => s.category === 'AI' || s.category === 'Data Science');
    if (activeCategory === 'Web & Systems') return SKILLS.filter((s) => s.category === 'Core Web' || s.category === 'Others' || s.name === 'React');
    return SKILLS;
  }, [activeCategory]);

  // Guardrail: Ensure no two same cards can ever be on the web.
  // If the skill is already present at another index, swap it with the target index
  // so all 6 cards on the radar web remain 100% unique at all times.
  const equipSkillAtEnd = (skill: Skill, targetIndex: number) => {
    setEndSkills((prev) => {
      const existingIndex = prev.findIndex((s) => s.name === skill.name);
      if (existingIndex === targetIndex) return prev;

      const next = [...prev];
      if (existingIndex !== -1) {
        // Swap positions so no duplicates can ever exist on the web
        const displacedSkill = prev[targetIndex];
        next[targetIndex] = skill;
        next[existingIndex] = displacedSkill;
      } else {
        next[targetIndex] = skill;
      }
      return next;
    });
  };

  // When a user clicks ANY tech stack chip:
  // 1. That skill replaces (or swaps into) the corresponding web end
  // 2. That skill becomes the selected skill
  const handleSelectSkill = (skill: Skill) => {
    playClick();
    setSelectedSkill(skill);

    const targetIndex =
      typeof skill.domainIndex === 'number' && skill.domainIndex >= 0 && skill.domainIndex < 6
        ? skill.domainIndex
        : 0;

    equipSkillAtEnd(skill, targetIndex);
  };

  // When a chip is dropped directly onto a specific web end (0 to 5)
  const handleDropOnEnd = (skill: Skill, targetIndex: number) => {
    playClick();
    setSelectedSkill(skill);
    equipSkillAtEnd(skill, targetIndex);
    setDraggedSkill(null);
  };

  // When a chip is dropped anywhere onto the web surface
  const handleDropOnWeb = (skill: Skill) => {
    playClick();
    handleSelectSkill(skill);
    setDraggedSkill(null);
  };

  return (
    <section id="skills" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative z-20 overflow-hidden bg-primary transition-colors duration-500">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header (Clean original layout) */}
        <div className="w-full mb-12 sm:mb-16 px-2 sm:px-4">
          <ScrollReveal animation="fade-right">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-none" />
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                Skills
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-theme-text tracking-tighter leading-none">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* 2-Column Balanced Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT / CENTER: The Radar Web with Chips at the 6 Ends    */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center justify-center relative">
            <div className="w-full flex items-center justify-center p-2 sm:p-4">
              <RadarChart
                endSkills={endSkills}
                selectedSkill={selectedSkill}
                onSelectSkill={handleSelectSkill}
                onDropSkillOnEnd={handleDropOnEnd}
                onDropSkillOnWeb={handleDropOnWeb}
                draggedSkill={draggedSkill}
                className="w-full"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Category Tabs + Interactive Chips Grid      */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col h-[480px] p-5 sm:p-6 border border-theme-border bg-surface/40 dark:bg-surface/40 [.light_&]:bg-[#F3EEE3]/70 backdrop-blur-md relative self-center">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/80 to-accent" />

            {/* 1. CATEGORY FILTER TABS (Stationary at top) */}
            <div className="flex flex-wrap items-center gap-2 border-b border-theme-border pb-4 mb-4 shrink-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-3.5 py-1.5 text-xs font-mono font-semibold tracking-wider transition-all duration-200 border rounded-none cursor-pointer
                      ${
                        isActive
                          ? 'bg-accent text-black dark:text-black [.light_&]:text-white border-accent shadow-[0_0_15px_rgba(0,209,255,0.3)] [.light_&]:shadow-[0_0_15px_rgba(217,119,6,0.3)] font-bold'
                          : 'bg-surface/60 text-theme-secondary border-theme-border hover:text-theme-text hover:bg-surface'
                      }
                    `}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* 2. INTERACTIVE CHIPS GRID (Stationary height, content-start) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 content-start overflow-y-auto pr-1 scrollbar-hide">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                const isMountedOnEnd = endSkills.some((es) => es.name === skill.name);
                const isBeingDragged = draggedSkill?.name === skill.name;

                return (
                  <button
                    key={skill.name}
                    onClick={() => handleSelectSkill(skill)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', skill.name);
                      e.dataTransfer.effectAllowed = 'copyMove';
                      setDraggedSkill(skill);
                      playHover();
                    }}
                    onDragEnd={() => {
                      setDraggedSkill(null);
                    }}
                    className={`
                      group/chip flex items-center justify-between p-3 sm:px-3.5 sm:py-3 rounded-none text-left transition-all duration-200 border cursor-grab active:cursor-grabbing select-none
                      ${
                        isBeingDragged
                          ? 'opacity-40 scale-95 border-dashed border-accent ring-2 ring-accent/50 bg-accent/10'
                          : isSelected
                          ? 'bg-accent/15 dark:bg-accent/20 border-accent shadow-[0_0_15px_rgba(0,209,255,0.25)] [.light_&]:shadow-[0_0_15px_rgba(217,119,6,0.25)] ring-1 ring-accent'
                          : isMountedOnEnd
                          ? 'bg-surface/90 border-accent/40 hover:border-accent'
                          : 'bg-surface/60 border-theme-border hover:border-theme-border/80 hover:bg-surface/90'
                      }
                    `}
                    title={`${skill.name} - ${skill.level}% Proficiency (Click to mount or drag onto any web end)`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Grip dots indicator */}
                      <div className="flex flex-col gap-0.5 opacity-25 group-hover/chip:opacity-80 transition-opacity shrink-0">
                        <div className="flex gap-0.5">
                          <span className="w-0.5 h-0.5 rounded-full bg-current" />
                          <span className="w-0.5 h-0.5 rounded-full bg-current" />
                        </div>
                        <div className="flex gap-0.5">
                          <span className="w-0.5 h-0.5 rounded-full bg-current" />
                          <span className="w-0.5 h-0.5 rounded-full bg-current" />
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover/chip:scale-110">
                        <TechIcon name={skill.icon} className="w-full h-full object-contain" />
                      </div>

                      {/* Name */}
                      <span
                        className={`text-xs sm:text-sm font-sans font-medium truncate ${
                          isSelected ? 'text-accent font-bold' : 'text-theme-text'
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>

                    {/* Level Pill */}
                    <span
                      className={`text-[11px] font-mono shrink-0 px-2 py-0.5 rounded-none tabular-nums font-semibold ${
                        isSelected
                          ? 'bg-accent text-black dark:text-black [.light_&]:text-white font-bold'
                          : 'bg-surface text-theme-secondary/80 border border-theme-border group-hover/chip:text-theme-text'
                      }`}
                    >
                      {skill.level}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
