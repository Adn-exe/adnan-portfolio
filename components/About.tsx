import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollTextReveal';
import { TextChromaReveal } from './wensity/text-chroma-reveal';
import { DiaTextReveal } from './ui/dia-text-reveal';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col justify-center py-20 lg:py-0 px-6 relative z-10 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-10 md:space-y-14">
          {/* Section Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 mb-1">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '4rem', opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] bg-gradient-to-r from-accent to-white rounded-full origin-left"
              />
              <TextChromaReveal
                as="span"
                text="About Me"
                className="font-medium text-xs md:text-sm tracking-widest uppercase font-mono"
                colors={
                  isLight
                    ? ['#D97706', '#F59E0B', '#B45309', '#78350F']
                    : ['#00D1FF', '#38BDF8', '#818CF8', '#C084FC']
                }
                textColor={isLight ? '#78350F' : '#FFFFFF'}
                duration={1.2}
                startOnView={true}
                once={false}
                inViewMargin="-50px"
              />
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter flex flex-wrap gap-x-3 sm:gap-x-5 md:gap-x-6 items-baseline">
              <DiaTextReveal
                text="Who I"
                className="font-display font-black leading-[0.9] tracking-tighter text-theme-text inline-block"
                colors={
                  isLight
                    ? ['#D97706', '#F59E0B', '#B45309', '#78350F']
                    : ['#00D1FF', '#38BDF8', '#818CF8', '#C084FC']
                }
                textColor={isLight ? '#1F1A14' : '#F8FAFC'}
                duration={1.6}
                startOnView={true}
                once={false}
                scrollDownOnly={true}
              />
              <DiaTextReveal
                text="Am"
                className="font-display font-black leading-[0.9] tracking-tighter text-gradient inline-block"
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
                duration={1.6}
                delay={0.12}
                startOnView={true}
                once={false}
                scrollDownOnly={true}
              />
            </h2>
          </div>

          {/* Editorial Canvas: Wide Lead Typography + Lower Split Grid */}
          <div className="relative w-full">
            <ScrollReveal
              triggerRef={sectionRef}
              pin={true}
              pinDistance={1350}
              baseOpacity={0.2}
              containerClassName="my-0"
              textClassName="font-marcellus text-[19px] sm:text-[21px] md:text-[22px] font-normal leading-[1.42] tracking-tight"
              leadText="I'm an AI/ML student who can't leave a model alone until I understand why it works, and why it sometimes doesn't. I like opening the black box, tracing stubborn loss curves, rewriting pipelines, and figuring out what the data was trying to tell me."
              bodyText="Most of what I know came from building things, breaking them, and building them better. I'm happiest where machine learning meets real software, turning ideas from notebooks into tools people can actually use. Outside of tech, I write, listen to music, and get curious about the strange ways people and machines behave."
              rightContent={
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] aspect-[3/2] flex items-center justify-center">
                  {/* Dark Mode Photo */}
                  <img
                    src="/aboutmeDark.webp"
                    alt="Mohammed Adnan"
                    width={1536}
                    height={1024}
                    className="absolute inset-0 w-full h-full object-contain select-none mix-blend-screen transition-opacity duration-300 opacity-100 [.light_&]:opacity-0 pointer-events-none drop-shadow-[0_10px_35px_rgba(0,209,255,0.08)]"
                    loading="eager"
                    decoding="sync"
                  />
                  {/* Light Mode Photo */}
                  <img
                    src="/aboutmeLight.webp"
                    alt="Mohammed Adnan"
                    width={1536}
                    height={1024}
                    className="absolute inset-0 w-full h-full object-contain select-none mix-blend-multiply transition-opacity duration-300 opacity-0 [.light_&]:opacity-100 pointer-events-none"
                    loading="eager"
                    decoding="sync"
                  />
                </div>
              }
              footerContent={
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-wrap gap-8 md:gap-12 pt-8 md:pt-10 border-t border-theme-border"
                >
                  {[
                    { label: 'Domain', val: 'Applied AI & Software', icon: true, isAccent: false },
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
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
