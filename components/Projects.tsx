import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { TechIcon } from './Icons';
import { useAudio } from '../hooks/useAudio';
// @ts-ignore
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const projectAccents: Record<string, { border: string; glow: string; text: string; bg: string; stroke: string; date: string }> = {
  '1': {
    border: 'border-[#00D1FF]/40',
    glow: 'rgba(0, 209, 255, 0.18)',
    text: 'text-[#00D1FF]',
    bg: 'bg-[#00D1FF]/10',
    stroke: '#00D1FF',
    date: '2024'
  },
  '2': {
    border: 'border-[#A855F7]/40',
    glow: 'rgba(168, 85, 247, 0.18)',
    text: 'text-[#A855F7]',
    bg: 'bg-[#A855F7]/10',
    stroke: '#A855F7',
    date: '2024'
  },
  '3': {
    border: 'border-[#F59E0B]/40',
    glow: 'rgba(245, 158, 11, 0.18)',
    text: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/10',
    stroke: '#F59E0B',
    date: '2023'
  },
  '4': {
    border: 'border-[#10B981]/40',
    glow: 'rgba(16, 185, 129, 0.18)',
    text: 'text-[#10B981]',
    bg: 'bg-[#10B981]/10',
    stroke: '#10B981',
    date: '2023'
  },
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollStackRef = React.useRef<any>(null);
  const { playClick } = useAudio();

  const handleJumpToCard = (index: number) => {
    playClick();
    scrollStackRef.current?.scrollToCard(index);
  };

  return (
    <section id="projects" className="pt-20 pb-28 px-2 sm:px-3 md:px-4 lg:px-6 relative z-10 overflow-visible w-full">
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-accent/5 rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 px-2 sm:px-4">
          <ScrollReveal animation="fade-right">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-full" />
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                Featured Work
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-theme-text tracking-tighter leading-none">
              Featured <span className="text-gradient">Creations</span>
            </h2>
          </ScrollReveal>
        </div>



        {/* Stacking Project Cards */}
        <ScrollStack
          ref={scrollStackRef}
          className="w-full"
          itemStackDistance={0}
          stackPosition="8%"
          baseScale={0.9}
          itemScale={0.03}
          onActiveIndexChange={() => {}}
        >
          {PROJECTS.map((project, idx) => {
            const accent = projectAccents[project.id] || projectAccents['1'];
            const projectNumber = String(idx + 1).padStart(2, '0');

            return (
              <ScrollStackItem
                key={project.id}
                itemClassName="w-full pointer-events-none"
              >
                {/* Transparent Tab Row: allows underlying tabs to stay visible & clickable */}
                <div className="relative w-full h-[34px] sm:h-[36px] pointer-events-none z-20">
                  <button
                    type="button"
                    onClick={() => handleJumpToCard(idx)}
                    className="project-tab project-tab--active pointer-events-auto"
                    style={{
                      '--tab-idx': idx,
                      '--tab-bg': accent.stroke,
                      '--tab-text': '#0B0B14',
                    } as React.CSSProperties}
                    title={`Jump to ${project.title}`}
                    aria-label={`Jump to project ${projectNumber}: ${project.title}`}
                  >
                    <span className="project-tab__icon">+</span>
                    <span className="project-tab__label">
                      <span className="hidden sm:inline">PROJECT </span>
                      <span className="sm:hidden">P.</span>
                      {projectNumber}
                    </span>
                  </button>
                </div>

                <div
                  className={`
                    w-full rounded-none overflow-hidden relative pointer-events-auto
                    bg-[#0B0B14] dark:bg-[#0B0B14] [.light_&]:bg-[#F3EEE3]
                    border border-white/10 dark:border-white/10 [.light_&]:border-amber-600/25
                    shadow-[0_16px_48px_rgba(0,0,0,0.65)] [.light_&]:shadow-[0_16px_36px_rgba(180,130,20,0.12)]
                    backdrop-blur-3xl transition-colors duration-500
                    px-6 sm:px-10 md:px-14 lg:px-16 pt-8 pb-10 md:pb-12 min-h-[580px] md:h-[78vh] md:max-h-[750px] flex flex-col justify-between
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
                    <div className="flex items-center gap-3 md:gap-4">
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
                    </div>

                    {/* Right: Date & Tech Badges */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs font-mono text-theme-secondary/70 bg-surface/80 border border-theme-border px-3 py-1 rounded-full">
                        {accent.date}
                      </span>
                      <div className="hidden sm:flex items-center gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-primary/40 border border-theme-border text-theme-secondary"
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
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-theme-text tracking-tight mb-4">
                          {project.title}
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl font-sans text-zinc-300 dark:text-zinc-200 [.light_&]:text-zinc-800 leading-relaxed font-normal mb-8 line-clamp-3 md:line-clamp-4">
                          {project.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playClick}
                            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:scale-[1.03] shadow-lg"
                            style={{
                              backgroundColor: accent.stroke,
                              boxShadow: `0 0 25px ${accent.glow}`
                            }}
                          >
                            <span>View Project</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              playClick();
                              setSelectedProject(project);
                            }}
                            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:scale-[1.03] shadow-lg"
                            style={{
                              backgroundColor: accent.stroke,
                              boxShadow: `0 0 25px ${accent.glow}`
                            }}
                          >
                            <span>Explore Details</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playClick}
                            className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-medium text-theme-text bg-surface/80 border border-theme-border hover:border-accent/40 hover:bg-surface transition-all duration-300"
                          >
                            <TechIcon name="github" className="w-4 h-4" />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Clean Large Mockup Display */}
                    <div className="lg:col-span-6 h-full flex items-center justify-center">
                      <div className="w-full h-56 sm:h-64 md:h-72 lg:h-[350px] xl:h-[400px] rounded-none overflow-hidden relative border border-white/10 shadow-2xl">
                        {/* Project Mockup Image */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

      {/* Interactive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface/95 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-3xl p-6 sm:p-8 md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playClick();
                  setSelectedProject(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full text-theme-secondary hover:text-theme-text bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Image */}
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 border border-theme-border relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Role */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="text-3xl sm:text-4xl font-display font-black text-theme-text tracking-tight">
                  {selectedProject.title}
                </h3>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                  {selectedProject.role}
                </span>
              </div>

              {/* Description */}
              <p className="text-base text-theme-secondary leading-relaxed font-sans mb-8">
                {selectedProject.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-theme-secondary/60 block mb-3">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-primary/60 border border-theme-border text-theme-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-theme-border">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-accent text-primary hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] transition-all duration-300"
                  >
                    <span>Visit Live Application</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-medium bg-surface border border-theme-border text-theme-text hover:border-accent/40 transition-all duration-300"
                  >
                    <TechIcon name="git" className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
