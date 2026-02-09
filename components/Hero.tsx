import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();



  return (
    <section id="hero" ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden select-none bg-primary">

      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent/5 via-primary to-primary pointer-events-none"
      />

      {/* Content Container */}
      <ScrollReveal isContainer className="relative z-10 flex flex-col items-center justify-center gap-4 md:gap-6">
        {/* Greeting & Name */}
        <div className="space-y-2">
          <ScrollReveal
            animation="fade-down"
            delay={0.2}
            distance={20}
          >
            <span className="inline-block text-accent font-sans text-sm tracking-widest uppercase font-medium">
              Hello, I'm
            </span>
          </ScrollReveal>

          <ScrollReveal
            animation="zoom-in"
            delay={0.4}
            distance={5}
            className="relative z-10"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium leading-[1.1] tracking-tighter mb-4 uppercase" style={{ fontFamily: '"Libertinus Math", serif', fontWeight: '400' }}>
              <span className="text-gradient drop-shadow-2xl">Mohammed Adnan</span>
            </h1>
          </ScrollReveal>
        </div>

        {/* Tagline */}
        <ScrollReveal
          animation="fade-up"
          delay={0.6}
          distance={20}
          className="max-w-5xl mx-auto w-full px-4"
        >
          <p className="text-theme-secondary font-serif font-light text-lg md:text-xl leading-relaxed">
            I'm an <span className="text-theme-text font-medium">AIML engineering student</span> with strong interest in AI and Quantum world
            <br className="hidden md:block" />
            driven by a deep fascination for how systems behave at their core.
          </p>
        </ScrollReveal>

        {/* Spacer */}
        <div className="h-16"></div>
      </ScrollReveal>

      {/* Corner Socials - Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-8 hidden md:flex items-center gap-6 z-20"
      >
        <a href="https://www.linkedin.com/in/mohammed-adnan-956763297/" target="_blank" rel="noopener noreferrer" className="text-theme-secondary hover:text-accent transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        </a>
        <a href="https://github.com/Adn-exe" target="_blank" rel="noopener noreferrer" className="text-theme-secondary hover:text-accent transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
        </a>
      </motion.div>

      {/* Premium CTA - Right */}
      <ScrollReveal
        animation="fade-left"
        delay={1.0}
        distance={30}
        className="absolute bottom-12 right-12 hidden md:block z-20"
      >
        <Magnetic>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center gap-4 px-6 py-3 rounded-full bg-surface/40 backdrop-blur-md border border-theme-border overflow-hidden transition-all duration-500 hover:border-accent hover:shadow-[0_0_25px_rgba(0,209,255,0.2)]"
            data-cursor="CONTACT"
          >
            <span className="relative z-10 text-[10px] font-bold tracking-[0.3em] uppercase text-theme-text group-hover:text-accent transition-colors duration-500">
              Get In Touch
            </span>

            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-theme-text/5 text-theme-text group-hover:bg-accent group-hover:text-primary transition-all duration-500">
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:rotate-[-45deg]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.2s] ease-in-out" />
          </a>
        </Magnetic>
      </ScrollReveal>

      {/* Scroll Indicator with Glowing Line Above */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hover:opacity-100 transition-opacity cursor-pointer group"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {/* Glowing Vertical Line ABOVE Explore */}
        <div className="relative w-[2px] h-12 overflow-hidden mb-1">
          <motion.div
            animate={{
              height: ["0%", "100%", "0%"],
              top: ["0%", "0%", "100%"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-transparent via-accent to-transparent shadow-[0_0_15px_#00D1FF]"
          />
        </div>

        <span className="text-[10px] tracking-[0.6em] font-mono text-theme-secondary uppercase group-hover:text-accent transition-colors">Explore</span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent relative z-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
