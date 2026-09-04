import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';
import StrokeText from './StrokeText';
import DarkVeil from './DarkVeil';
// @ts-ignore
import SpecularButton from './SpecularButton';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    setIsLight(document.documentElement.classList.contains('light'));
    return () => observer.disconnect();
  }, []);

  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const target = document.getElementById('contact');
    const lenis = (window as any).__lenis;
    if (lenis && target) {
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    const lenis = (window as any).__lenis;
    if (lenis && aboutSection) {
      lenis.scrollTo(aboutSection, { offset: 0, duration: 1.2 });
    } else if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden select-none bg-primary">

      {/* React Bits DarkVeil Ambient Background with Feathered Bottom Edge */}
      <div className="absolute inset-0 pointer-events-none opacity-60 [.light_&]:opacity-35 transition-opacity duration-700 [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]">
        <DarkVeil
          hueShift={0}
          speed={0.8}
          warpAmount={0.3}
          noiseIntensity={0.01}
          scanlineIntensity={0}
          lightMode={isLight}
        />
      </div>

      {/* Dynamic Background Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-primary pointer-events-none"
      />

      {/* Seamless Bottom Fade Blend to Next Section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-primary/80 to-primary pointer-events-none z-10" />

      {/* Content Container */}
      <ScrollReveal isContainer className="relative z-10 flex flex-col items-center justify-center gap-1 md:gap-2 w-full max-w-5xl">
        {/* Greeting & Name */}
        <div className="space-y-0 w-full flex flex-col items-center">
          <ScrollReveal
            animation="fade-down"
            delay={0.2}
            distance={15}
          >
            <span className="inline-block text-accent font-sans text-sm tracking-widest uppercase font-medium mb-1">
              Hello, I'm
            </span>
          </ScrollReveal>

          <ScrollReveal
            animation="zoom-in"
            delay={0.4}
            distance={5}
            className="relative z-10 w-full max-w-6xl mx-auto"
          >
            <div className="w-full">
              <StrokeText
                text="MOHAMMED ADNAN"
                fontFamily='"Libertinus Math", serif'
                strokeColor={isLight ? '#D97706' : '#00D1FF'}
                fillGradient={isLight ? ['#1F1A14', '#B45309', '#D97706'] : ['#FFFFFF', '#00D1FF', '#38BDF8', '#FFFFFF']}
                strokeWidth={2.2}
                drawDuration={1.8}
                fillDelay={0.2}
                stagger={0.06}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={200}
                fontWeight={400}
                letterSpacing={-3}
                className={isLight ? "w-full drop-shadow-[0_0_35px_rgba(217,119,6,0.3)]" : "w-full drop-shadow-[0_0_35px_rgba(0,209,255,0.4)]"}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Tagline */}
        <ScrollReveal
          animation="fade-up"
          delay={0.6}
          distance={15}
          className="max-w-5xl mx-auto w-full px-4 -mt-2 md:-mt-4"
        >
          <p className="text-theme-secondary font-serif font-light text-lg md:text-xl leading-relaxed">
            I'm an <span className="text-theme-text font-medium">AIML engineering student</span> with strong interest in AI and Quantum world
            <br className="hidden md:block" />
            driven by a deep fascination for how systems behave at their core.
          </p>
        </ScrollReveal>

        {/* Mobile Get in Touch CTA */}
        <ScrollReveal
          animation="fade-up"
          delay={0.8}
          distance={20}
          className="md:hidden mt-6"
        >
          <a
            href="#contact"
            onClick={scrollToContact}
            className="group inline-flex items-center justify-center gap-4 px-6 py-3.5 rounded-full border border-accent/20 text-[10px] font-bold tracking-[0.3em] uppercase text-theme-text bg-surface/40 backdrop-blur-md transition-all duration-300 hover:border-accent hover:shadow-[0_0_10px_rgba(0,209,255,0.2)] [.light_&]:border-amber-600/30 [.light_&]:bg-[#F3EEE3]/90 [.light_&]:hover:shadow-[0_0_10px_rgba(217,119,6,0.2)]"
          >
            <span className="transition-colors duration-300 group-hover:text-accent">
              Get In Touch
            </span>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-theme-text/5 text-theme-text group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </a>
        </ScrollReveal>

        {/* Spacer */}
        <div className="h-8 md:h-16"></div>
      </ScrollReveal>

      {/* Corner Socials - Left removed as per request */}

      {/* Premium CTA - Right */}
      <ScrollReveal
        animation="fade-left"
        delay={1.0}
        distance={30}
        once={true}
        margin="0px"
        className="absolute bottom-14 right-6 hidden md:block z-20"
      >
        <SpecularButton
          size="lg"
          radius={999}
          tint={isLight ? '#F3EEE3' : '#050B14'}
          tintOpacity={1}
          textColor={isLight ? '#1F1A14' : '#ffffff'}
          lineColor={isLight ? '#D97706' : '#ffffff'}
          baseColor={isLight ? '#D97706' : '#00D1FF'}
          intensity={1.2}
          shineSize={15}
          shineFade={45}
          thickness={1.5}
          speed={0.4}
          followMouse={true}
          proximity={300}
          onClick={scrollToContact}
          className="!px-9 !py-4.5 font-martel font-bold text-[17px] leading-none flex items-center justify-center rounded-full"
        >
          <span className="leading-none pt-[1px]">Get In Touch</span>
        </SpecularButton>
      </ScrollReveal>

      {/* Scroll Indicator with Glowing Line Above */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hover:opacity-100 transition-opacity cursor-pointer group"
        onClick={scrollToAbout}
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
