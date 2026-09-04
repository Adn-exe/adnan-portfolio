import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollTextReveal from './ScrollTextReveal';

export const About: React.FC = () => {
  const [photoRotate, setPhotoRotate] = useState({ x: 0, y: 0 });
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"]
  });

  const chipsOpacity = useTransform(aboutScrollProgress, [0.30, 0.38], [0, 1]);
  const chipsY = useTransform(aboutScrollProgress, [0.30, 0.38], [12, 0]);

  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setPhotoRotate({
      x: (y - centerY) / 10,
      y: (centerX - x) / 10
    });
  };

  const handlePhotoLeave = () => {
    setPhotoRotate({ x: 0, y: 0 });
  };

  return (
    <section id="about" ref={aboutSectionRef} className="relative z-10 min-h-[105vh] md:min-h-[115vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-10 md:space-y-16">
            {/* Section Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-full"></div>
                <span className="text-white font-medium text-xs md:text-sm tracking-widest uppercase font-mono">About Me</span>
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                <span className="text-theme-text">Who I</span> <span className="text-gradient">Am</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
              <div className="lg:col-span-8 space-y-8 md:space-y-10">
                {/* Bio with ScrollTextReveal using Sora font */}
                <ScrollTextReveal
                  progress={aboutScrollProgress}
                  className="text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-light leading-[1.8] tracking-normal"
                />

                {/* Metadata Chips - reveal smoothly as text finishes */}
                <motion.div
                  style={{ opacity: chipsOpacity, y: chipsY }}
                  className="flex flex-wrap gap-8 md:gap-12 pt-6 md:pt-8 border-t border-theme-border"
                >
                  {[
                    { label: 'Focus', val: 'AI & Machine Learning', icon: true, isAccent: false },
                    { label: 'Status', val: 'Learning & Building', icon: false, isAccent: true },
                    { label: 'Location', val: 'Open to Remote', icon: false, isAccent: false }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono font-medium text-theme-secondary uppercase tracking-widest">{item.label}</span>
                      <span className={`text-sm font-display font-bold ${item.isAccent ? 'text-accent [.light_&]:text-amber-600' : 'text-theme-text [.light_&]:text-amber-700'} flex items-center gap-3`}>
                        {item.icon && <div className="w-2 h-2 rounded-full bg-accent [.light_&]:bg-amber-500 shadow-[0_0_8px_var(--accent)]"></div>}
                        {item.val}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="lg:col-span-4 relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] mx-auto lg:ml-auto lg:mr-0 -mt-6 lg:-mt-16">
                <div className="aspect-square relative flex items-center justify-center perspective-[2000px]">
                  {/* Interactive 3D Photo Frame - Rounded Full */}
                  <div
                    className="w-full aspect-square relative group cursor-none transition-all duration-700 ease-out"
                    onMouseMove={handlePhotoMove}
                    onMouseLeave={handlePhotoLeave}
                    style={{
                      transform: `rotateX(${photoRotate.x}deg) rotateY(${photoRotate.y}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                    data-cursor="CORE_MEM"
                  >
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>

                    <div className="w-full h-full relative overflow-hidden rounded-full border border-white/10 glass transition-all duration-1000 group-hover:border-accent/60 group-hover:shadow-[0_0_80px_rgba(56,189,248,0.25)]">
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src="/profile.jpg"
                          className="w-full h-full object-cover object-center grayscale brightness-50 transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-90"
                          alt="Profile"
                        />
                      </div>

                      {/* Glitch Overlays */}
                      <div className="absolute inset-0 bg-accent/20 mix-blend-overlay opacity-0 group-hover:animate-glitch-1 pointer-events-none" />
                      <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay opacity-0 group-hover:animate-glitch-2 pointer-events-none" />
                      
                      {/* Scanline Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] transition-opacity duration-700" />

                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      <div className="absolute inset-x-0 bottom-8 translate-z-100 transform transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 flex justify-center">
                        <div className="glass px-6 py-3 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                          <h4 className="text-[10px] font-display font-bold text-white tracking-[0.2em] uppercase">Mohammed Adnan</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
