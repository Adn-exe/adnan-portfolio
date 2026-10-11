import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
// @ts-ignore
import FlowingMenu from './FlowingMenu';
import { LinkPreview } from './ui/link-preview';
import { DiaTextReveal } from './ui/dia-text-reveal';
import { Tooltip } from './ui/tooltip-card';

const WRITING_ITEMS = [
  {
    link: 'https://eniax-space.vercel.app/read/sense-of-call',
    text: 'Sense of Call',
    genre: 'Story',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
  },
  {
    link: 'https://eniax-space.vercel.app/read/orange-seat-1019',
    text: 'Orange Seat',
    genre: 'Story',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    link: 'https://eniax-space.vercel.app/read/writing-back',
    text: '3rd Passion',
    genre: 'Essay',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop'
  },
  {
    link: 'https://eniax-space.vercel.app/read/the-pace-of-the-heart',
    text: 'Pace of the Heart',
    genre: 'Blog',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop'
  }
];

const Writings: React.FC = () => {
  const [isLight, setIsLight] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('light') : false
  );

  useEffect(() => {
    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writings"
      className="relative z-20 bg-primary overflow-hidden flex flex-col items-center transition-colors duration-1000 pt-24 pb-28"
    >
      {/* Background Ambience Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 brightness-200 contrast-100 mix-blend-overlay pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 mb-16">
        <ScrollReveal animation="fade-right">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-full" />
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Hobby
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between items-center gap-4">
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-tight text-center md:text-left flex flex-wrap gap-x-2.5 sm:gap-x-4 md:gap-x-5 items-baseline justify-center md:justify-start">
              <DiaTextReveal
                text="My"
                className="font-display font-black tracking-tighter leading-tight inline-block text-theme-text"
                colors={
                  isLight
                    ? ['#D97706', '#F59E0B', '#B45309', '#78350F']
                    : ['#00D1FF', '#38BDF8', '#818CF8', '#C084FC']
                }
                textColor={isLight ? '#1F1A14' : '#F8FAFC'}
                duration={1.8}
                startOnView={true}
                once={false}
                scrollDownOnly={true}
              />
              <DiaTextReveal
                text="Writings"
                className="font-display font-black tracking-tighter leading-tight inline-block text-gradient"
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
                duration={1.8}
                delay={0.12}
                startOnView={true}
                once={false}
                scrollDownOnly={true}
              />
            </h2>

            {/* Cat resting at the right-most side with Easter Egg tooltip */}
            <div className="flex items-end justify-center sm:justify-end shrink-0 pb-1 sm:pb-2">
              <Tooltip
                as="div"
                containerClassName="cursor-pointer group/cat relative inline-flex"
                tooltipClassName="z-50 min-w-[15rem] sm:min-w-[17rem] max-w-[20rem]"
                content={
                  <span className="block leading-relaxed">
                    The human has many thoughts.
                    <br />
                    I have one: where’s my food?
                  </span>
                }
              >
                <img
                  src="/cat.png"
                  alt="Cat"
                  className={`h-9 sm:h-11 md:h-14 w-auto object-contain transition-all duration-300 select-none group-hover/cat:scale-105 active:scale-95 ${isLight
                      ? 'opacity-85 brightness-95 filter-none drop-shadow-sm'
                      : 'invert opacity-90 brightness-110 drop-shadow-[0_0_15px_rgba(0,209,255,0.25)]'
                    }`}
                  loading="lazy"
                />
              </Tooltip>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Flowing Menu Container */}
      <div className="w-full relative">
        {/* Top dividing line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-theme-border to-transparent" />

        <div className="w-full h-[520px] md:h-[580px] relative overflow-hidden">
          <FlowingMenu
            items={WRITING_ITEMS}
            speed={14}
            textColor={isLight ? '#1F1A14' : '#F8FAFC'}
            bgColor="transparent"
            marqueeBgColor={isLight ? '#D97706' : '#00D1FF'}
            marqueeTextColor={isLight ? '#FAF8F2' : '#050505'}
            borderColor={isLight ? 'rgba(180, 130, 20, 0.18)' : 'rgba(255, 255, 255, 0.08)'}
          />
        </div>

        {/* Bottom dividing line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-theme-border to-transparent" />
      </div>

      {/* Bottom CTA to Eniax Space */}
      <div className="mt-12 md:mt-16 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <ScrollReveal animation="fade-up">
          <LinkPreview
            url="https://eniax-space.vercel.app/"
            width={280}
            height={160}
            quality={60}
            waitForTimeout={4000}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-none text-xs sm:text-sm font-mono tracking-widest font-semibold uppercase transition-all duration-300 border border-accent/40 bg-accent/5 hover:bg-accent/15 text-accent [.light_&]:text-amber-700 [.light_&]:border-amber-600/40 [.light_&]:bg-amber-600/10 [.light_&]:hover:bg-amber-600/20 hover:border-accent hover:shadow-[0_0_25px_rgba(0,209,255,0.25)] [.light_&]:hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span className="text-accent [.light_&]:text-amber-700 font-bold">Eniax Space</span>
            <svg
              className="w-4 h-4 text-accent [.light_&]:text-amber-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </LinkPreview>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Writings;
