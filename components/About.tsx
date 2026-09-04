import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollTextReveal';
// @ts-ignore
import PixelSwap from './PixelSwap';

export const About: React.FC = () => {
  const [photoRotate, setPhotoRotate] = useState({ x: 0, y: 0 });

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
    <section id="about" className="py-24 md:py-32 px-6 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-10 md:space-y-14">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              {/* Bio with React Bits ScrollReveal */}
              <ScrollReveal
                baseOpacity={0.15}
                enableBlur={true}
                baseRotation={0}
                blurStrength={6}
                containerClassName="my-0"
                textClassName="font-about text-lg sm:text-xl md:text-2xl lg:text-[1.5rem] font-light leading-[1.25] tracking-normal"
                wordAnimationStart="top bottom-=20%"
                wordAnimationEnd="top 48%"
              >
                I’m an AI/ML student passionate about understanding how intelligent systems work, with a focus on building strong foundations and turning ideas into practical solutions. I enjoy breaking down complex problems, building real-world AI projects, and exploring the intersection of AI and software. I’m always looking to learn, collaborate, and grow through meaningful hands-on work.
              </ScrollReveal>

              {/* Metadata Chips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
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

            <div className="lg:col-span-5 relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] mx-auto lg:ml-auto lg:mr-0 -mt-6 sm:-mt-8 lg:-mt-14">
                <div className="aspect-square relative flex items-center justify-center perspective-[2000px]">
                  {/* Interactive 3D Photo Frame */}
                  <div
                    className="w-full aspect-square relative group cursor-pointer transition-all duration-700 ease-out"
                    onMouseMove={handlePhotoMove}
                    onMouseLeave={handlePhotoLeave}
                    style={{
                      transform: `rotateX(${photoRotate.x}deg) rotateY(${photoRotate.y}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Ambient Glow & Rotating Gradient Border */}
                    <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-accent/40 via-purple-500/30 to-amber-500/40 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 -z-10 animate-pulse"></div>
                    <div className="absolute -inset-[1px] rounded-[2.2rem] bg-gradient-to-tr from-accent/60 via-white/20 to-purple-500/60 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Main Image Container with React Bits PixelSwap */}
                    <div className="w-full h-full relative overflow-hidden rounded-[2.1rem] border border-white/15 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-700 group-hover:border-accent/80 group-hover:shadow-[0_0_50px_rgba(56,189,248,0.35)]">
                      <PixelSwap
                        aspectRatio="1 / 1"
                        pixelSize={42}
                        gap={0}
                        pixelRadius={0}
                        pixelScale={0.3}
                        duration={1100}
                        pixelDuration={420}
                        easing="cubic-bezier(0.16, 1, 0.3, 1)"
                        pattern="random"
                        fade={true}
                        trigger="hover"
                        firstContent={
                          <div className="w-full h-full relative overflow-hidden">
                            <img
                              src="/profile.jpg"
                              className="w-full h-full object-cover object-center filter contrast-105 brightness-95 transition-transform duration-700 group-hover:scale-105"
                              alt="Mohammed Adnan Profile"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-70 pointer-events-none" />
                          </div>
                        }
                        secondContent={
                          <div className="w-full h-full relative flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl p-6 select-none overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-purple-500/15 to-amber-500/25 opacity-80" />
                            <img
                              src="/image.png"
                              className="w-3/4 h-3/4 object-contain filter drop-shadow-[0_0_30px_rgba(56,189,248,0.6)] [.light_&]:drop-shadow-[0_0_30px_rgba(217,119,6,0.6)] relative z-10"
                              alt="Portfolio Logo"
                            />
                          </div>
                        }
                      />
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
