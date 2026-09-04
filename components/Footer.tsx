import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll animations for smooth reveal effect as user scrolls into the footer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.85, 1]);
  const brandY = useTransform(scrollYProgress, [0.1, 0.95], [120, 0]);
  const brandOpacity = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const brandScale = useTransform(scrollYProgress, [0.1, 0.95], [0.94, 1]);

  const finalContentY = shouldReduceMotion ? 0 : contentY;
  const finalContentOpacity = shouldReduceMotion ? 1 : contentOpacity;
  const finalBrandY = shouldReduceMotion ? 0 : brandY;
  const finalBrandOpacity = shouldReduceMotion ? 1 : brandOpacity;
  const finalBrandScale = shouldReduceMotion ? 1 : brandScale;

  return (
    <footer
      ref={containerRef}
      className="pt-16 pb-0 border-t border-theme-border bg-primary relative z-30 overflow-hidden w-full"
    >
      {/* Upper content constrained inside container */}
      <div className="container mx-auto px-6">
        <motion.div
          style={{ y: finalContentY, opacity: finalContentOpacity }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8"
        >
          <div className="md:col-span-4 space-y-4">
            <p className="text-theme-secondary font-light text-sm leading-relaxed max-w-xs">
              Building digital products with curiosity, care, and a little obsession with the details.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-7 space-y-4">
            <h4 className="text-[10px] font-mono text-theme-text/40 uppercase tracking-[0.2em]">Index</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-theme-secondary hover:text-accent transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm text-theme-secondary hover:text-accent transition-colors">About</a></li>
              <li><a href="#projects" className="text-sm text-theme-secondary hover:text-accent transition-colors">Works</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] font-medium text-theme-text/40 uppercase tracking-widest">What I Do</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default">Machine Learning</span></li>
              <li><span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default">AI Development</span></li>
              <li><span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default">Web Applications</span></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] font-mono text-theme-text/40 uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-theme-secondary/60 cursor-not-allowed">Privacy</span></li>
              <li><span className="text-sm text-theme-secondary/60 cursor-not-allowed">Terms</span></li>
            </ul>
          </div>
        </motion.div>

        {/* Copyright Row */}
        <motion.div
          style={{ y: finalContentY, opacity: finalContentOpacity }}
          className="pt-6 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-theme-secondary/70 tracking-wider"
        >
          <div>
            © 2026. All Rights Reserved.
          </div>
        </motion.div>
      </div>

      {/* Full Bleed Oversized Display Text "ADNAN" with Smooth Scroll Reveal */}
      <motion.div
        style={{
          y: finalBrandY,
          opacity: finalBrandOpacity,
          scale: finalBrandScale
        }}
        className="pt-4 overflow-hidden h-[14vw] sm:h-[15.5vw] md:h-[16.5vw] flex justify-center items-start pointer-events-none select-none mt-2 w-full px-0 origin-bottom"
      >
        <h1 className="text-[22vw] sm:text-[24vw] md:text-[25vw] leading-[0.75] font-display font-black tracking-tighter uppercase whitespace-nowrap text-center text-transparent bg-clip-text bg-gradient-to-b from-theme-text via-theme-text/35 to-theme-text/5 drop-shadow-sm w-full block">
          ADNAN
        </h1>
      </motion.div>
    </footer>
  );
};

export default Footer;
