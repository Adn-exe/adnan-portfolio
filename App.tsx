import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Writings from './components/Writings';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollVelocityText from './components/ScrollVelocityText';
import ScrollReveal from './components/ScrollReveal';
import Contact from './components/Contact';
import { useAudio } from './hooks/useAudio';
import ThemeToggle from './components/ThemeToggle';
import TerminalFab from './components/TerminalFab';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

// Lazy-load Terminal so its ~30KB bundle and easter eggs are deferred until clicked
const Terminal = React.lazy(() => import('./components/Terminal'));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      // If already loaded in this session, skip loader on normal reloads (Ctrl+R / Cmd+R)
      const hasLoaded = sessionStorage.getItem('portfolio_has_loaded');
      return !hasLoaded;
    } catch {
      return true;
    }
  });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { playHover, playClick } = useAudio();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Listen for Hard Refresh hotkeys (Cmd+Shift+R or Ctrl+Shift+R)
    const handleHardRefreshKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'r' || e.key === 'R')) {
        try {
          sessionStorage.removeItem('portfolio_has_loaded');
        } catch {}
      }
    };

    window.addEventListener('keydown', handleHardRefreshKey);
    return () => window.removeEventListener('keydown', handleHardRefreshKey);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <Loader
        onComplete={() => {
          try {
            sessionStorage.setItem('portfolio_has_loaded', 'true');
          } catch {}
          setIsLoading(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen relative selection:bg-accent/30 selection:text-white bg-primary text-theme-text overflow-x-hidden cursor-none">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-white to-accent z-[100] origin-left shadow-[0_0_15px_rgba(0,209,255,0.5)]"
          style={{ scaleX }}
        />

        <CustomCursor />

        <ThemeToggle />

        <TerminalFab isOpen={isTerminalOpen} onToggle={() => setIsTerminalOpen(!isTerminalOpen)} />
        <Suspense fallback={null}>
          <Terminal isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />
        </Suspense>
        <Navbar />

        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.8 }
          }}
          className="relative z-10"
        >
          <Hero />

          {/* Atmospheric Gradient Blend */}
          <div className="relative h-24 -mt-12 bg-gradient-to-b from-transparent to-surface/5 z-20 pointer-events-none" />

          <ScrollVelocityText />

          {/* Statistics Section */}
          <section className="py-32 border-y border-white/5 bg-surface/5 overflow-hidden relative z-20">
            <div className="container mx-auto px-6">
              <ScrollReveal isContainer className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { val: '4+', label: 'Projects Built' },
                  { val: 'AI/ML', label: 'Core Focus' },
                  { val: 'Creator', label: 'Mindset' },
                  { val: 'Open', label: 'To Collaborate' }
                ].map((s, i) => (
                  <ScrollReveal
                    key={i}
                    className="text-center group"
                    animation="fade-up"
                    distance={20}
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-theme-text mb-2 tracking-tighter tabular-nums group-hover:text-accent transition-colors duration-500 drop-shadow-[0_0_10px_rgba(0,209,255,0.3)]">
                      {s.val}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-accent font-semibold group-hover:text-white transition-colors">
                      {s.label}
                    </div>
                  </ScrollReveal>
                ))}
              </ScrollReveal>
            </div>
          </section>

          {/* About Section */}
          <About />

          <Projects />

          <Skills />

          {/* Writings Section */}
          <Writings />

          {/* Single Distinction Divider between Writings and Contact */}
          <SectionDivider />

          <Contact />
        </motion.main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
