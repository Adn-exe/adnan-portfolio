import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { TechIcon } from './Icons';
import Magnetic from './Magnetic';
// @ts-ignore
import DepthCarousel from './DepthCarousel';

const depthItems = PROJECTS.map((p) => ({
  image: p.image,
  alt: p.title,
  title: p.title,
  project: p
}));

const projectAccents: Record<number, { border: string; glow: string; text: string; bg: string; stroke: string }> = {
  1: { border: 'border-[#00D1FF]/40', glow: 'rgba(0, 209, 255, 0.15)', text: 'text-[#00D1FF]', bg: 'bg-[#00D1FF]/10', stroke: '#00D1FF' },
  2: { border: 'border-[#A855F7]/40', glow: 'rgba(168, 85, 247, 0.15)', text: 'text-[#A855F7]', bg: 'bg-[#A855F7]/10', stroke: '#A855F7' },
  3: { border: 'border-[#F59E0B]/40', glow: 'rgba(245, 158, 11, 0.15)', text: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', stroke: '#F59E0B' },
  4: { border: 'border-[#10B981]/40', glow: 'rgba(16, 185, 129, 0.15)', text: 'text-[#10B981]', bg: 'bg-[#10B981]/10', stroke: '#10B981' },
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const carouselRef = useRef<any>(null);

  const activeProject = PROJECTS[activeProjectIndex] || PROJECTS[0];
  const accent = projectAccents[activeProject.id] || projectAccents[1];

  const handleCardClick = (index: number, item: any) => {
    const proj = item.project || PROJECTS[index];
    setSelectedProject(proj);
  };

  const handleCarouselChange = (index: number) => {
    setActiveProjectIndex(index);
  };

  return (
    <section id="projects" className="pt-16 pb-32 px-6 relative z-10 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-accent/5 rounded-full blur-[160px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal isContainer className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="flex-1">
            <ScrollReveal animation="fade-right">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-full"></div>
                <span className="text-accent font-medium text-sm tracking-widest uppercase">Projects</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black text-theme-text tracking-tighter leading-none">
                Featured <span className="text-gradient">Creations</span>
              </h2>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* Free-Floating 2-Column Showcase */}
        <ScrollReveal animation="fade-up" className="w-full">
          <div className="relative w-full max-w-7xl mx-auto py-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Free-Floating 3D Depth Stack Carousel */}
              <div className="lg:col-span-7 relative h-[520px] w-full flex items-center justify-center overflow-visible">
                <DepthCarousel
                  ref={carouselRef}
                  items={depthItems}
                  cardWidth={380}
                  cardHeight={480}
                  depth={200}
                  spread={85}
                  tilt={22}
                  tiltDirection="right"
                  perspective={1400}
                  visibleCards={4}
                  falloff={0.2}
                  blur={6}
                  autoplay={true}
                  autoplayDelay={3800}
                  loop={true}
                  showControls={false}
                  showIndicators={true}
                  onChange={handleCarouselChange}
                  onCardClick={handleCardClick}
                />
              </div>

              {/* Right Column: Free-Floating Dynamic Spotlight Details */}
              <div className="lg:col-span-5 relative h-[520px] w-full flex flex-col justify-between pt-6 px-2 md:px-4">
                {/* Dynamic Top Neon Accent Glow Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-full transition-all duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accent.stroke}, transparent)`,
                    boxShadow: `0 0 15px ${accent.stroke}`
                  }}
                />

                  {/* Smooth AnimatePresence Crossfade for Details */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col justify-between h-full space-y-6"
                    >
                      {/* Top Badges & GitHub Link */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono tracking-widest font-bold px-3.5 py-1 rounded-full border transition-colors duration-500 ${accent.border} ${accent.bg} ${accent.text}`}>
                            0{activeProject.id} / 04
                          </span>
                          <span className="text-xs font-mono tracking-widest text-theme-text bg-theme-text/5 border border-theme-text/10 px-3.5 py-1 rounded-full uppercase font-medium">
                            {activeProject.role}
                          </span>
                        </div>

                        {activeProject.github && (
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Source Code on GitHub"
                            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-surface/80 text-[10px] font-mono font-bold tracking-widest uppercase text-theme-secondary hover:text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all duration-300"
                          >
                            <TechIcon name="github" className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span>GitHub</span>
                            <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-3 my-auto text-left">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-theme-text tracking-tight leading-tight">
                          {activeProject.title}
                        </h3>
                        <p className="text-theme-secondary text-xs sm:text-sm md:text-base font-light leading-relaxed">
                          {activeProject.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-theme-secondary font-semibold">Technologies Used</span>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag: string) => (
                            <span key={tag} className={`text-xs font-mono px-3 py-1 rounded-lg border backdrop-blur-md transition-colors duration-500 ${accent.border} ${accent.bg} ${accent.text}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Direct Action CTA Button */}
                      <div className="pt-4">
                        {activeProject.link && activeProject.link !== '#' && (
                          <a
                            href={activeProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-accent text-accent bg-transparent hover:bg-accent hover:text-primary text-[11px] font-mono font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_30px_rgba(0,209,255,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                          >
                            {/* Shimmer Glow Line */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                            <span>Live Demo</span>
                            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
              </div>

            </div>

            {/* Free-Floating Balanced Navigation Arrows */}
            <button
              type="button"
              onClick={() => carouselRef.current?.prev()}
              aria-label="Previous Project"
              className="absolute -left-2 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface border border-theme-border text-theme-text flex items-center justify-center backdrop-blur-2xl shadow-xl hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 group"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => carouselRef.current?.next()}
              aria-label="Next Project"
              className="absolute -right-4 md:-right-10 lg:-right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface border border-theme-border text-theme-text flex items-center justify-center backdrop-blur-2xl shadow-xl hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 group"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </ScrollReveal>
      </div>

      {/* Project Details Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-surface/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] max-h-[85vh] flex flex-col group"
            >
              {/* Top Accent Highlight Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent z-30" />

              {/* Compact Header Image */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover grayscale-[0.15] contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-accent hover:border-accent flex items-center justify-center transition-all duration-200 z-30"
                  aria-label="Close modal"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Overlaid Badges & Title */}
                <div className="absolute bottom-4 left-5 right-5 flex flex-col gap-1.5 z-20">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono tracking-widest text-accent bg-accent/10 border border-accent/30 px-2.5 py-0.5 rounded-full uppercase font-bold backdrop-blur-md">
                      0{selectedProject.id}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-white/80 bg-black/60 border border-white/10 px-2.5 py-0.5 rounded-full uppercase font-medium backdrop-blur-md">
                      {selectedProject.role}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
                {/* Description */}
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-accent/90 mb-2 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>Project Overview</span>
                  </div>
                  <p className="text-theme-text/85 text-xs sm:text-sm leading-relaxed font-normal">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-accent/90 mb-2.5 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>Tech Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-3 py-1 bg-accent/10 text-accent rounded-lg border border-accent/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-theme-border/60 flex flex-wrap gap-3 items-center justify-end">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-theme-border bg-primary/60 hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all duration-200 text-xs font-semibold text-theme-text"
                    >
                      <TechIcon name="github" className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                  {selectedProject.link && selectedProject.link !== '#' && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4.5 py-2 rounded-xl bg-accent text-primary font-bold hover:bg-accent/90 transition-all duration-200 text-xs shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
