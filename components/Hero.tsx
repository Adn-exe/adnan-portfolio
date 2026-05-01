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

      {/* Corner Socials - Left removed as per request */}


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
