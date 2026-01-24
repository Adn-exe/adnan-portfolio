
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden select-none">
      {/* Parallax Background Aura */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          opacity,
          translateY: y1
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-accent/5 rounded-full blur-[250px] pointer-events-none"
      />

      {/* Lighting Spotlight */}
      <motion.div
        style={{
          x: useTransform(springX, (v) => v * 3),
          y: useTransform(springY, (v) => v * 3),
          opacity: useTransform(opacity, (v) => v * 0.4)
        }}
        className="absolute w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0"
      />

      <div className="relative z-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-accent font-mono text-[11px] tracking-[0.6em] uppercase font-bold">
            AI / ML Developer
          </span>
        </motion.div>

        <motion.div
          style={{ scale, opacity, translateY: y2 }}
          className="relative group"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[14rem] font-display font-black text-white tracking-tighter leading-[0.75]"
          >
            <span className="text-gradient drop-shadow-[0_0_50px_rgba(56,189,248,0.1)]">ADNAN</span>
          </motion.h1>

          <motion.div
            style={{
              x: useTransform(springX, (v) => v * -0.5),
              y: useTransform(springY, (v) => v * -0.5)
            }}
            className="absolute inset-0 text-white/5 -z-10 blur-sm select-none pointer-events-none"
          >
            ADNAN
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto"
        >
          <p className="text-slate-400 font-light tracking-[0.6em] text-[10px] md:text-xs uppercase leading-loose">
            Optimizing <span className="text-white font-bold">Machine Intelligence</span> through <br />
            Architectural Logic & Aesthetic Precision
          </p>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-all duration-700 cursor-pointer group"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] tracking-[0.8em] font-mono text-slate-400 uppercase font-medium group-hover:text-accent transition-colors duration-500">Explore</span>
        <div className="relative w-[2px] h-20 bg-white/10 overflow-hidden rounded-full group-hover:bg-white/20 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent via-accent to-transparent animate-scanline shadow-[0_0_20px_#38BDF8,0_0_40px_#38BDF8]" />
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent/60 group-hover:text-accent transition-colors duration-500"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
