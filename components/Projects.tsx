import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { PROJECTS } from '../constants';
import { TechIcon } from './Icons';
import { useAudio } from '../hooks/useAudio';
// @ts-ignore
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { DiaTextReveal } from './ui/dia-text-reveal';
import { ViewProjectButton, SourceCodeButton } from './ui/project-button';

const projectAccents: Record<string, { border: string; glow: string; text: string; bg: string; stroke: string; date: string }> = {
  '1': {
    border: 'border-[#00D1FF]/40',
    glow: 'rgba(0, 209, 255, 0.18)',
    text: 'text-[#00D1FF]',
    bg: 'bg-[#00D1FF]/10',
    stroke: '#00D1FF',
    date: '2025'
  },
  '2': {
    border: 'border-[#6366F1]/40',
    glow: 'rgba(99, 102, 241, 0.18)',
    text: 'text-[#6366F1]',
    bg: 'bg-[#6366F1]/10',
    stroke: '#6366F1',
    date: '2026'
  },
  '3': {
    border: 'border-[#A855F7]/40',
    glow: 'rgba(168, 85, 247, 0.18)',
    text: 'text-[#A855F7]',
    bg: 'bg-[#A855F7]/10',
    stroke: '#A855F7',
    date: '2025'
  },
  '4': {
    border: 'border-[#F59E0B]/40',
    glow: 'rgba(245, 158, 11, 0.18)',
    text: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/10',
    stroke: '#F59E0B',
    date: '2026'
  },
  '5': {
    border: 'border-[#10B981]/40',
    glow: 'rgba(16, 185, 129, 0.18)',
    text: 'text-[#10B981]',
    bg: 'bg-[#10B981]/10',
    stroke: '#10B981',
    date: '2026'
  },
};

const Projects: React.FC = () => {
  const scrollStackRef = useRef<any>(null);
  const { playClick } = useAudio();
  const [isLight, setIsLight] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('light') : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleJumpToCard = (index: number) => {
    scrollStackRef.current?.scrollToCard(index);
  };

  return (
    <section id="projects" className="pt-20 pb-28 px-2 sm:px-4 md:px-6 relative z-10 overflow-visible w-full max-w-[1700px] mx-auto">
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-accent/5 rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="w-full">
        {/* Section Header */}
        <div className="w-full mb-12 px-2 sm:px-4">
          <ScrollReveal animation="fade-right">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-none" />
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                Featured Work
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none flex flex-wrap gap-x-3 sm:gap-x-5 md:gap-x-6 items-baseline">
              <DiaTextReveal
                text="Featured"
                className="font-display font-black tracking-tighter leading-none inline-block text-theme-text"
                colors={
                  isLight
                    ? ['#D97706', '#F59E0B', '#B45309', '#78350F']
                    : ['#00D1FF', '#38BDF8', '#818CF8', '#C084FC']
                }
                textColor={isLight ? '#1F1A14' : '#F8FAFC'}
                duration={1.8}
                startOnView={true}
                once={false}
                scrollDownOnly={true}
              />
              <DiaTextReveal
                text="Creations"
                className="font-display font-black tracking-tighter leading-none inline-block text-gradient"
                colors={
                  isLight
                    ? ['#D97706', '#F59E0B', '#B45309', '#78350F']
                    : ['#00D1FF', '#38BDF8', '#818CF8', '#C084FC']
                }
                textColor={
                  isLight
                    ? 'linear-gradient(90deg, #B45309, #D97706, #B45309)'
                    : 'linear-gradient(90deg, #00D1FF, #ffffff, #00D1FF)'
                }
                duration={1.8}
                delay={0.12}
                startOnView={true}
                once={false}
                scrollDownOnly={true}
              />
            </h2>
          </ScrollReveal>
        </div>

        {/* Stacking Project Cards */}
        <ScrollStack
          ref={scrollStackRef}
          className="w-full"
          itemStackDistance={0}
          stackPosition="10%"
        >
          {PROJECTS.map((project, idx) => {
            const accent = projectAccents[project.id] || projectAccents['1'];
            const projectNumber = String(idx + 1).padStart(2, '0');

            return (
              <ScrollStackItem
                key={project.id}
                itemClassName="w-full"
                style={{ zIndex: idx + 10 }}
              >
                <div
                  className={`
                    w-full rounded-none overflow-hidden relative
                    bg-[#0B0B14] dark:bg-[#0B0B14] [.light_&]:bg-[#F3EEE3]
                    border border-white/10 dark:border-white/10 [.light_&]:border-amber-600/25
                    shadow-[0_-20px_60px_rgba(0,0,0,0.85)] [.light_&]:shadow-[0_-15px_45px_rgba(180,130,20,0.2)]
                    backdrop-blur-3xl transition-colors duration-500
                    px-6 sm:px-10 md:px-12 lg:px-14 pt-6 pb-8 md:pb-12 min-h-[580px] md:h-[78vh] md:max-h-[760px] flex flex-col justify-between
                  `}
                >
                  {/* Top Ambient Glow Gradient */}
                  <div
                    className="absolute -top-24 right-1/4 w-96 h-48 rounded-full blur-[100px] pointer-events-none opacity-40"
                    style={{ backgroundColor: accent.stroke }}
                  />

                  {/* Card Header Info Row: stays visible as top tab when stacked */}
                  <div className="flex items-center justify-between border-b border-theme-border pb-3.5 mb-5 relative z-10 min-h-[44px]">
                    {/* Left: Project Number & Title */}
                    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                      <button
                        onClick={() => handleJumpToCard(idx)}
                        className="text-2xl sm:text-3xl font-display font-black tracking-tight cursor-pointer hover:scale-105 active:scale-95 transition-transform flex items-center gap-2.5 focus:outline-none"
                        title={`Jump to Project ${projectNumber}`}
                        aria-label={`Jump to Project ${projectNumber}`}
                      >
                        <span style={{ color: accent.stroke }}>{projectNumber}</span>
                        <span className="text-sm md:text-base font-display font-bold text-theme-text opacity-90 hidden sm:inline">
                          {project.title}
                        </span>
                      </button>
                      <div className="h-4 w-px bg-theme-border" />
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-theme-secondary">
                        {project.role}
                      </span>
                      {project.badges && project.badges.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          {project.badges.map((badge) => (
                            <span
                              key={badge}
                              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-none inline-flex items-center gap-1.5 ${
                                badge.toLowerCase().includes('paid')
                                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                  : 'bg-accent/15 border border-accent/40 text-accent shadow-[0_0_10px_rgba(0,209,255,0.2)]'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  badge.toLowerCase().includes('paid')
                                    ? 'bg-emerald-400 animate-pulse'
                                    : 'bg-accent animate-pulse'
                                }`}
                              />
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Date & Tech Badges */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs font-mono text-theme-secondary/70 bg-surface/80 border border-theme-border px-3 py-1 rounded-none">
                        {accent.date}
                      </span>
                      <div className="hidden sm:flex items-center gap-1.5">
                        {project.tags
                          .filter((tag) => !['Paid Project', 'Freelancer'].includes(tag))
                          .slice(0, 3)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono px-2.5 py-0.5 rounded-none bg-primary/40 border border-theme-border text-theme-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Main Content: 2-Column Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 relative z-10">
                    {/* Left Column: Narrative & Actions */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full py-1">
                      <div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-theme-text tracking-tight mb-8 sm:mb-10 md:mb-12 leading-[1.08]">
                          {project.title}
                        </h3>

                        {/* First Line: The Solution */}
                        <p className="text-base sm:text-lg md:text-xl font-lora text-theme-text font-medium leading-relaxed mb-6 sm:mb-7 md:mb-8">
                          {project.solution}
                        </p>

                        {/* Rest: Articulated Bullet Points */}
                        {project.bulletPoints && project.bulletPoints.length > 0 && (
                          <ul className="space-y-2.5 sm:space-y-3 mb-8 text-xs sm:text-sm md:text-base font-lora text-zinc-300 dark:text-zinc-300 [.light_&]:text-zinc-700 leading-relaxed">
                            {project.bulletPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span
                                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                  style={{ backgroundColor: accent.stroke }}
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Action Buttons: View Project and/or Source Code */}
                      <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-4">
                        {project.link && (
                          <ViewProjectButton
                            href={project.link}
                            accentStroke={accent.stroke}
                            accentGlow={accent.glow}
                            isLight={isLight}
                            onClick={playClick}
                          />
                        )}

                        {project.github && (
                          <SourceCodeButton
                            href={project.github}
                            accentStroke={accent.stroke}
                            isLight={isLight}
                            onClick={playClick}
                          />
                        )}
                      </div>
                    </div>

                    {/* Right Column: Freestanding Full Project Artwork */}
                    <div className="lg:col-span-6 h-full flex items-center justify-center p-2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] max-h-[480px] md:max-h-[520px] h-auto object-contain select-none block"
                        loading="lazy"
                        onLoad={() => scrollStackRef.current?.measureCards()}
                      />
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
};

export default Projects;
