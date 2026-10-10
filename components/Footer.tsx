import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import PulseHeart from './PulseHeart';
import { Tooltip } from './ui/tooltip-card';
import { TechIcon } from './Icons';
import Shuffle from './Shuffle';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_liked') === 'true';
    }
    return false;
  });

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
      className="pt-16 pb-0 border-t border-theme-border bg-primary relative z-30 overflow-visible w-full"
    >
      {/* Upper content constrained inside container */}
      <div className="container mx-auto px-6 relative">
        {/* Top-Right Heart Icon */}
        <motion.div
          style={{ y: finalContentY, opacity: finalContentOpacity }}
          className="absolute -top-10 right-6 sm:right-8 z-20 flex items-center justify-center"
        >
          <Tooltip
            side="top"
            align="center"
            content={isLiked ? "wherever you are, take care." : "emotional support component"}
            containerClassName="flex items-center justify-center"
            tooltipClassName="min-w-fit whitespace-nowrap z-50 text-xs font-mono"
          >
            <PulseHeart
              liked={isLiked}
              showCount={false}
              free={true}
              size={22}
              likedColor="var(--accent)"
              idleColor="var(--text-secondary)"
              label="Like portfolio"
              className="hover:scale-110 transition-transform cursor-pointer"
              onChange={(liked) => {
                setIsLiked(liked);
                try {
                  localStorage.setItem('portfolio_liked', String(liked));
                } catch (e) { }
              }}
            />
          </Tooltip>
        </motion.div>

        <motion.div
          style={{ y: finalContentY, opacity: finalContentOpacity }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8"
        >
          <div className="md:col-span-4 space-y-4">
            <p className="font-google-sans text-theme-secondary text-[14.5px] sm:text-[15px] font-normal leading-relaxed max-w-xs tracking-[-0.01em]">
              Building digital products with curiosity, care, and a little obsession with the details.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://github.com/Adn-exe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-surface border border-theme-border flex items-center justify-center text-theme-secondary hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
              >
                <TechIcon name="github" className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-adnan-956763297/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-surface border border-theme-border flex items-center justify-center text-theme-secondary hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
              >
                <TechIcon name="linkedin" className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://discord.gg/WzMD87jXnz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="w-9 h-9 rounded-xl bg-surface border border-theme-border flex items-center justify-center text-theme-secondary hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
              >
                <TechIcon name="discord" className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7 space-y-4">
            <h4 className="text-[10px] font-mono text-theme-text/40 uppercase tracking-[0.2em]">Index</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-theme-secondary hover:text-accent transition-colors block">
                  <Shuffle text="Home" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-theme-secondary hover:text-accent transition-colors block">
                  <Shuffle text="About" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm text-theme-secondary hover:text-accent transition-colors block">
                  <Shuffle text="Projects" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-theme-secondary hover:text-accent transition-colors block">
                  <Shuffle text="Contact" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] font-mono text-theme-text/40 uppercase tracking-[0.2em]">What I Do</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default block">
                  <Shuffle text="Web Development" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </span>
              </li>
              <li>
                <span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default block">
                  <Shuffle text="Machine Learning" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </span>
              </li>
              <li>
                <span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default block">
                  <Shuffle text="Interface Design" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </span>
              </li>
              <li>
                <span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default block">
                  <Shuffle text="Technical Writing" tag="span" autoRun={false} triggerOnHover={true} shuffleDirection="right" duration={0.65} stagger={0.035} ease="power2.out" />
                </span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] font-mono text-theme-text/40 uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Tooltip
                  align="center"
                  content="Zero trackers. No analytics cookies or telemetry."
                  tooltipClassName="min-w-fit whitespace-nowrap text-xs font-mono"
                >
                  <span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-pointer">Privacy</span>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  align="center"
                  content="Open for non-commercial exploration & collaboration."
                  tooltipClassName="min-w-fit whitespace-nowrap text-xs font-mono"
                >
                  <span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-pointer">Terms</span>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  align="center"
                  content="Portfolio design and source licensed under MIT."
                  tooltipClassName="min-w-fit whitespace-nowrap text-xs font-mono"
                >
                  <span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-pointer">License</span>
                </Tooltip>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider Line maintaining original vertical breathing room */}
        <motion.div
          style={{ y: finalContentY, opacity: finalContentOpacity }}
          className="border-t border-theme-border pt-6 pb-4 sm:pb-6"
        />
      </div>

      {/* Full Bleed Oversized Display Text "ADNAN" with Spider Lily Accent */}
      <motion.div
        style={{
          y: finalBrandY,
          opacity: finalBrandOpacity,
          scale: finalBrandScale
        }}
        className="pt-1.5 sm:pt-2 overflow-hidden h-[14.5vw] sm:h-[15vw] md:h-[16vw] flex justify-center items-start pointer-events-none select-none mt-2 w-full px-2 sm:px-6 origin-bottom relative"
      >
        <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-5 max-w-full -translate-x-3 sm:-translate-x-5 md:-translate-x-7">
          <img
            src="/spider-lily.png"
            alt="Spider Lily"
            className="h-[15.5vw] sm:h-[17vw] md:h-[18.5vw] w-auto max-w-[14vw] sm:max-w-[15vw] object-contain drop-shadow-[0_0_25px_rgba(0,209,255,0.45)] [.light_&]:drop-shadow-[0_0_18px_rgba(0,180,220,0.3)] select-none pointer-events-none shrink-0"
            loading="lazy"
          />

          <h1 className="text-[17vw] sm:text-[19vw] md:text-[21vw] leading-[0.75] font-display font-black tracking-tighter uppercase whitespace-nowrap text-center text-transparent bg-clip-text bg-gradient-to-b from-theme-text via-theme-text/35 to-theme-text/5 drop-shadow-sm block">
            ADNAN
          </h1>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
