import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
// @ts-ignore
import FlowingMenu from './FlowingMenu';

const WRITING_ITEMS = [
  {
    link: 'https://eniax-space.vercel.app/read/the-pace-of-the-heart',
    text: 'Pace of the Heart',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop'
  },
  {
    link: 'https://eniax-space.vercel.app/read/sense-of-call',
    text: 'Sense of Call',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
  },
  {
    link: 'https://eniax-space.vercel.app/read/orange-seat-1019',
    text: 'Orange Seat',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    link: 'https://eniax-space.vercel.app/read/writing-back',
    text: '3rd Passion',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop'
  }
];

const Writings: React.FC = () => {
  const [isLight, setIsLight] = useState(false);

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
              Stories, Essays & Blogs
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-theme-text tracking-tighter leading-tight text-center md:text-left">
            My <span className="text-gradient">Writings</span>
          </h2>
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
    </section>
  );
};

export default Writings;
