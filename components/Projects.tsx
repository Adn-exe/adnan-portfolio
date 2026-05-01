import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { PROJECTS } from '../constants';
import { TechIcon } from './Icons';
import Magnetic from './Magnetic';

const ProjectCard: React.FC<{ project: any; idx: number }> = ({ project, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollReveal
      animation="fade-up"
      delay={idx * 0.15}
      distance={30}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex flex-col h-[500px] bg-surface rounded-[2rem] border border-theme-border overflow-hidden transition-all duration-700 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        {/* Subtle Static Glow on Hover */}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="h-full w-full"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-[0.5] transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-90"
            />
          </motion.div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

          {/* Indexing Header */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
            <span className="text-[10px] font-mono tracking-widest text-theme-text/40 bg-primary/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-theme-border uppercase">
              Project / {project.id.padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex-1 flex flex-col justify-between relative">
          {project.status === 'In Progress' && (
            <div className="absolute top-0 right-8 -translate-y-1/2 z-20">
              <div className="flex items-center gap-2 bg-accent/20 border border-accent/40 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(0,209,255,0.2)]">
                <span className="text-[10px] font-mono font-black text-accent tracking-tighter uppercase italic">Alpha Build</span>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-display font-black text-theme-text tracking-tighter group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              <div className="flex gap-2">
                {project.github && (
                  <Magnetic strength={0.2}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-theme-secondary hover:text-accent transition-colors p-2 rounded-full border border-theme-border bg-primary/50">
                      <TechIcon name="github" className="w-4 h-4" />
                    </a>
                  </Magnetic>
                )}
                {project.link && project.link !== '#' && (
                  <Magnetic strength={0.2}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-theme-secondary hover:text-accent transition-colors p-2 rounded-full border border-theme-border bg-primary/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Magnetic>
                )}
              </div>
            </div>

            <p className="text-theme-secondary text-xs leading-relaxed font-light mb-6">
              {project.description}
            </p>

            {project.status === 'In Progress' && (
              <div className="mb-6 space-y-3 p-4 rounded-2xl bg-accent/5 border border-accent/10">
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-accent uppercase tracking-[0.2em]">
                  <span>Loading...</span>
                  <span>78%</span>
                </div>
                <div className="h-1 w-full bg-theme-text/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '78%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent to-white rounded-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-6 border-t border-theme-border">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 bg-theme-text/5 text-theme-secondary rounded-md border border-theme-border group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-40 px-6 relative z-10 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[150px] -z-10"></div>

      <div className="container mx-auto">
        <ScrollReveal isContainer className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
          <div className="flex-1">
            <ScrollReveal animation="fade-right">
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-4 block">Portfolio Gallery</span>
              <h2 className="text-5xl md:text-8xl font-display font-black text-theme-text tracking-tighter leading-none">
                Featured <span className="text-gradient">Creations</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="flex-none max-w-sm">
            <ScrollReveal animation="fade-left" delay={0.2}>
              <p className="text-theme-secondary font-light text-lg md:text-xl leading-relaxed">
                A curated selection of high-precision <span className="text-theme-text font-medium">engineering projects</span> balancing complexity and utility.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
