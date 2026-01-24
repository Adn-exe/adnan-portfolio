import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SKILLS } from '../constants';
import { TechIcon } from './Icons';
import Magnetic from './Magnetic';

// 3D Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'frontend', name: 'Languages', color: 'from-blue-500 to-cyan-400' },
    { id: 'backend', name: 'Data Science', color: 'from-purple-500 to-pink-400' },
    { id: 'ai', name: 'Frameworks', color: 'from-orange-500 to-red-400' },
    { id: 'devops', name: 'Core Web', color: 'from-emerald-500 to-teal-400' }
  ];

  return (
    <section id="skills" className="py-32 px-6 relative overflow-visible min-h-screen flex items-center perspective-[2000px]" ref={containerRef}>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow max-w-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-700 max-w-full"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] h-[200%] bg-gradient-to-r from-transparent via-accent/5 to-transparent blur-3xl -z-10"></div>

          <span className="text-accent-purple font-mono text-sm uppercase tracking-[0.3em] font-bold opacity-70 mb-4 block">
            System Architecture
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-6 relative inline-block">
            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-purple relative z-10">Lattice</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-purple opacity-20 blur-lg -z-10"></div>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg font-light leading-relaxed">
            A dynamic visualization of technical competencies. Hover over nodes to analyze signal pathways.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 relative">

          {/* Connection Lines (Visible on Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full opacity-30 overflow-visible">
              <defs>
                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Animated Data Lines */}
              <motion.line
                x1="10%" y1="50%" x2="90%" y2="50%"
                stroke="url(#gridGradient)" strokeWidth="1"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Vertical Connectors */}
              {[25, 50, 75].map((pos, i) => (
                <motion.line
                  key={i}
                  x1={`${pos}%`} y1="20%" x2={`${pos}%`} y2="80%"
                  stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                />
              ))}
            </svg>
          </div>

          {categories.map((cat, idx) => (
            <TiltCard key={cat.id} className="group">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`
                  relative h-full glass p-8 rounded-[2rem] border border-white/5 
                  transition-all duration-500 overflow-hidden backdrop-blur-xl
                  ${activeCategory === cat.id
                    ? 'bg-white/10 border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] ring-1 ring-white/20'
                    : 'bg-white/5 hover:bg-white/10'}
                `}
              >
                {/* Internal Glow Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-[#010206]/90 z-0"></div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <h3 className="text-xl font-display font-bold text-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                      {cat.name}
                    </h3>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cat.color} shadow-[0_0_10px_currentColor] animate-pulse`}></div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-4 flex-grow content-start">
                    {SKILLS.filter(s => s.category === cat.id).map((skill, sIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (sIdx * 0.05) }}
                      >
                        <Magnetic strength={0.3}>
                          <div className="group/skill relative flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 cursor-none overflow-hidden">

                            {/* Hover Gradient Sweep */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300`}></div>

                            <div className="w-10 h-10 mb-2 relative z-10 p-1.5 transition-transform duration-300 group-hover/skill:scale-110">
                              <TechIcon name={skill.icon} className="w-full h-full object-contain filter grayscale group-hover/skill:grayscale-0 transition-all duration-300 drop-shadow-lg" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover/skill:text-white transition-colors relative z-10">
                              {skill.name}
                            </span>
                          </div>
                        </Magnetic>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative Footer */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-white/50"></span>
                      <span className="w-1 h-1 rounded-full bg-white/50"></span>
                      <span className="w-1 h-1 rounded-full bg-white/50"></span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/50">Node_0{idx + 1}</span>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Bottom Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest"
        >
          <div className="flex gap-8 items-center">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System_Status: <span className="text-emerald-400 font-bold">OPTIMAL</span>
            </span>
            <span className="hidden md:inline">Nodes_Active: <span className="text-white">16</span></span>
          </div>

          {/* Animated Bar */}
          <div className="flex-grow mx-8 h-px bg-white/10 hidden md:block overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent w-1/2 animate-scanline opacity-30"></div>
          </div>

          <div className="mt-4 md:mt-0 flex gap-4">
            <span>Latency: &lt;12ms</span>
            <span className="text-accent-purple">// Encryption: AES-256</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
