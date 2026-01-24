
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { PROJECTS } from '../constants';
import { TechIcon } from './Icons';
import Magnetic from './Magnetic';

const ProjectCard: React.FC<{ project: any; idx: number }> = ({ project, idx }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const yRotate = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(yRotate, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    yRotate.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    yRotate.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      style={{
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: idx * 0.1 }}
      className="h-full perspective-1000"
    >
      <div
        className="group relative flex flex-col h-full bg-surface glass border border-white/5 transition-all duration-1000 hover:border-accent-purple/30 hover:shadow-[0_60px_100px_-30px_rgba(168,85,247,0.15)] overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
          minHeight: '550px',
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Glare Effect */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              mouseX,
              [-0.5, 0.5],
              [
                "linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 100%)",
                "linear-gradient(to left, rgba(255,255,255,0.1) 0%, transparent 100%)"
              ]
            )
          }}
        />
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
                <div className="w-full h-[1px] bg-accent/50 animate-scanline absolute top-0" />
                <div className="font-mono text-accent text-[10px] uppercase tracking-[0.3em] animate-pulse">
                  System Compiling...
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

          <h3 className="text-4xl font-display font-black text-white mb-6 tracking-tighter group-hover:text-gradient transition-all duration-700 italic uppercase">
            {project.status === 'In Progress' ? '***********' : project.title}
          </h3>

          {project.status === 'In Progress' ? (
            <div className="mb-10 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-accent uppercase tracking-widest">
                <span>Data Decryption</span>
                <span className="animate-pulse">64%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent animate-progress w-[64%]" style={{ boxShadow: '0 0 10px #38BDF8' }} />
              </div>
              <div className="font-mono text-[10px] text-slate-500 typewriter">
                _initiating neural handshake...
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
                    className="relative inline-flex items-center gap-4 px-10 py-4 rounded-3xl overflow-hidden text-[11px] font-display font-black text-white uppercase tracking-[0.4em] transition-all group/link bg-white/5 border border-white/10 hover:border-accent/60"
                    data-cursor="ACCESS"
                  >
                    <span className="relative z-10 transition-colors duration-500 group-hover/link:text-white group-hover/link:italic">ACCESS</span>
                    <svg className="w-5 h-5 text-accent group-hover/link:translate-x-1.5 transition-all duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>

                    <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-purple to-accent translate-x-[-100%] group-hover/link:translate-x-[0%] transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-[#081b33] opacity-0 group-hover/link:opacity-90 transition-opacity duration-300 -z-10"></div>
                  </a>
                </Magnetic>
              )}
              {project.status === 'In Progress' && (
                <div className="inline-flex items-center gap-4 px-10 py-4 rounded-3xl text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-white/5 cursor-not-allowed">
                  [LOCKED]
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

        <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-accent/10 tracking-widest uppercase font-black">
          SIGNAL_{project.id.padStart(3, '0')}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-40 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold opacity-60">ARCHIVE // 02</span>
            <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] italic">
              CURATED <span className="text-gradient">OUTPUT.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-500 max-w-xs font-light text-lg md:text-xl leading-relaxed"
          >
            Synthesizing fluid intelligence into <span className="text-white font-medium">digital architecture</span>.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
