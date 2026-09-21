import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollTextReveal';

export const About: React.FC = () => {
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
                baseOpacity={0}
                enableBlur={false}
                baseRotation={0}
                blurStrength={0}
                containerClassName="my-0"
                textClassName="font-about text-[22px] font-[450] leading-[1.4] tracking-normal"
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

            {/* Freestanding Profile Photo - Shared for both dark & light modes */}
            <div className="lg:col-span-5 flex items-center justify-center -mt-6 sm:-mt-10 lg:-mt-16 xl:-mt-20">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[390px] lg:max-w-[430px] aspect-[3/2] flex items-center justify-center">
                <img
                  src="/aboutmeDark.webp"
                  alt="Mohammed Adnan"
                  width={430}
                  height={287}
                  className="w-full h-full object-contain select-none mix-blend-screen [.light_&]:mix-blend-normal"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
