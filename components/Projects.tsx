
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { PROJECTS } from '../constants';
import { TechIcon } from './Icons';
import Magnetic from './Magnetic';

const ProjectCard: React.FC<{ project: any; idx: number }> = ({ project, idx }) => {
  const containerRef = useRef<HTMLDivElement>(null);


  return (
    <ScrollReveal
      animation="fade-up"
      distance={40}
      className="h-full"
    >
      <div
        className="group relative flex flex-col h-full bg-surface glass border border-white/5 transition-all duration-500 hover:border-accent/40 hover:shadow-[0_40px_80px_-20px_rgba(0,209,255,0.15)] hover:-translate-y-2 overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
          minHeight: '550px',
        }}
      >
        {/* Simple hover glare effect */}
        <div className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />
        {/* Image Section with Parallax Effect */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover grayscale brightness-[0.4] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

          {/* Status Badge & Loading Overlay */}
          {project.status === 'In Progress' ? (
            <>
              <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px] flex flex-col items-center justify-center">
                <div className="font-sans text-accent text-sm uppercase tracking-widest">
                  Coming Soon
                </div>
              </div>
              <div className="absolute top-6 right-6 z-20">
                <div className="glass px-4 py-2 rounded-full border border-accent/20 flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span className="text-[9px] font-mono text-white tracking-[0.2em] uppercase font-bold">In Progress</span>
                </div>
              </div>
            </>
          ) : project.status && (
            <div className="absolute top-6 right-6">
              <div className="glass px-4 py-2 rounded-full border border-accent/20 flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[9px] font-mono text-white tracking-[0.2em] uppercase font-bold">{project.status}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-10 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-8 mb-10">
            {project.status !== 'In Progress' && project.tags.map((tag: string) => (
              <div key={tag} className="relative group/tag">
                <Magnetic>
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-500 
                                  transition-all duration-500 transform
                                  group-hover/tag:scale-125 group-hover/tag:text-accent group-hover/tag:border-accent/30 
                                  group-hover/tag:shadow-[0_0_20px_rgba(56,189,248,0.2)] group-hover/tag:bg-white/10"
                    data-cursor={tag.toUpperCase()}>
                    <TechIcon name={tag} className="w-6 h-6" />
                  </div>
                </Magnetic>
              </div>
            ))}
            {project.status === 'In Progress' && (
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 opacity-50">
                <div className="w-6 h-1 bg-white/20 animate-pulse rounded-full"></div>
              </div>
            )}
          </div>

          <h3 className="text-4xl font-display font-black text-white mb-6 tracking-tighter group-hover:text-gradient transition-all duration-700">
            {project.status === 'In Progress' ? 'Secret Project' : project.title}
          </h3>

          {project.status === 'In Progress' ? (
            <div className="mb-10 space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-accent">
                <span>In Development</span>
                <span>64%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[64%] rounded-full" />
              </div>
              <div className="text-sm text-slate-500">
                Working on something exciting...
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-sm leading-relaxed font-light mb-10 group-hover:text-slate-300 transition-colors duration-700">
              {project.description}
            </p>
          )}

          {/* Action Bar */}
          <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
            <div className="flex-1 text-left">
              {project.link && project.link !== '#' && project.status !== 'In Progress' && (
                <Magnetic>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl overflow-hidden text-[10px] font-display font-black text-white uppercase tracking-[0.2em] transition-all group/link bg-white/5 border border-white/10 hover:border-accent/60"
                    data-cursor="ACCESS"
                  >
                    <span className="relative z-10 transition-colors duration-500 group-hover/link:text-white">View Project</span>
                    <svg className="w-4 h-4 text-accent group-hover/link:translate-x-1 transition-all duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>

                    <div className="absolute inset-0 bg-gradient-to-r from-accent via-white to-accent translate-x-[-100%] group-hover/link:translate-x-[0%] transition-transform duration-700 opacity-20"></div>
                    <div className="absolute inset-0 bg-[#081b33] opacity-0 group-hover/link:opacity-90 transition-opacity duration-300 -z-10"></div>
                  </a>
                </Magnetic>
              )}
              {project.status === 'In Progress' && (
                <div className="inline-flex items-center gap-4 px-10 py-4 rounded-3xl text-sm font-medium text-slate-500 border border-white/5 cursor-not-allowed">
                  Coming Soon
                </div>
              )}
            </div>

            <div className="flex-none">
              {project.github && (
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-500 hover:text-accent-purple hover:border-accent-purple/40 transition-all duration-500 hover:scale-110 shadow-xl"
                    data-cursor="GITHUB"
                  >
                    <TechIcon name="github" className="w-7 h-7" />
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 p-8 font-sans text-sm text-white/10 font-medium">
          Project {project.id.padStart(2, '0')}
        </div>
      </div>
    </ScrollReveal>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-40 px-6 relative z-10">
      <div className="container mx-auto">
        <ScrollReveal isContainer className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <ScrollReveal
            animation="fade-right"
            className="flex-1"
          >
            <span className="text-accent font-medium text-sm tracking-widest uppercase mb-4 block">Featured Work</span>
            <h2 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-[0.85]">
              Projects I've <span className="text-gradient">Built</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal
            animation="fade-left"
            delay={0.2}
            className="flex-none"
          >
            <p className="text-slate-500 max-w-xs font-light text-lg md:text-xl leading-relaxed">
              A selection of <span className="text-white font-medium">projects</span> I've worked on and am proud of.
            </p>
          </ScrollReveal>
        </ScrollReveal>

        <ScrollReveal isContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
