import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import TechBackground from './components/TechBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Loader from './components/Loader';
import { TechIcon } from './components/Icons';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Magnetic from './components/Magnetic';
import ScrollVelocityText from './components/ScrollVelocityText';
import ScrollReveal from './components/ScrollReveal';
import Contact from './components/Contact';
import { useAudio } from './hooks/useAudio';
import ThemeToggle from './components/ThemeToggle';
import Terminal from './components/Terminal';
import TerminalFab from './components/TerminalFab';

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
  const [photoRotate, setPhotoRotate] = useState({ x: 0, y: 0 });
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

  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setPhotoRotate({
      x: (y - centerY) / 10,
      y: (centerX - x) / 10
    });
  };

  const handlePhotoLeave = () => {
    setPhotoRotate({ x: 0, y: 0 });
  };

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

        <TechBackground />
        <ThemeToggle />

        <TerminalFab isOpen={isTerminalOpen} onToggle={() => setIsTerminalOpen(!isTerminalOpen)} />
        <Terminal isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />
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
          <section className="py-32 border-y border-white/5 bg-surface/5 backdrop-blur-sm overflow-hidden relative z-20">
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
          <section id="about" className="py-48 px-6 relative z-10">
            <div className="container mx-auto max-w-7xl">
              <div className="space-y-24">
                <ScrollReveal isContainer className="space-y-24">
                  <div className="space-y-8">
                    <ScrollReveal animation="fade-right">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-white rounded-full"></div>
                        <span className="text-white font-medium text-sm tracking-widest uppercase">About Me</span>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={0.2}>
                      <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-12">
                        <span className="text-theme-text">Who I</span> <span className="text-gradient">Am</span>
                      </h2>
                    </ScrollReveal>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <div className="lg:col-span-8 space-y-16">
                    <ScrollReveal isContainer staggerChildren={0.2} className="relative space-y-12 text-theme-secondary">
                      <ScrollReveal animation="fade-right" distance={20}>
                        <p className="text-xl md:text-2xl font-light leading-relaxed border-l-2 border-accent/40 pl-8 group hover:border-accent transition-colors duration-700">
                          I’m an <span className="text-theme-text font-semibold">AI/ML student</span> passionate about understanding how intelligent systems work — not just implementing models, but building a <span className="text-accent font-semibold">strong foundation</span> in the concepts behind them. I enjoy breaking complex problems into structured, practical solutions and turning ideas into working projects.
                        </p>
                      </ScrollReveal>

                      <ScrollReveal animation="fade-right" distance={20}>
                        <p className="text-xl md:text-2xl font-light leading-relaxed border-l-2 border-theme-border pl-8 group hover:border-accent transition-colors duration-700">
                          I’m particularly interested in applying AI to real-world problems and exploring the intersection of intelligent systems, software, and problem-solving. I’m looking for opportunities to collaborate, learn from experienced people, and grow through <span className="text-theme-text font-semibold">hands-on work on meaningful problems</span>.
                        </p>
                      </ScrollReveal>
                    </ScrollReveal>

                    <ScrollReveal isContainer className="flex flex-wrap gap-16 pt-16 border-t border-theme-border">
                      {[
                        { label: 'Focus', val: 'AI & Machine Learning', icon: true, isAccent: false },
                        { label: 'Status', val: 'Learning & Building', icon: false, isAccent: true },
                        { label: 'Location', val: 'Open to Remote', icon: false, isAccent: false }
                      ].map((item, i) => (
                        <ScrollReveal key={i} animation="fade-up" distance={10}>
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-mono font-medium text-theme-secondary uppercase tracking-widest">{item.label}</span>
                            <span className={`text-sm font-display font-bold ${item.isAccent ? 'text-accent [.light_&]:text-amber-600' : 'text-theme-text [.light_&]:text-amber-700'} flex items-center gap-3`}>
                              {item.icon && <div className="w-2 h-2 rounded-full bg-accent [.light_&]:bg-amber-500 shadow-[0_0_8px_var(--accent)]"></div>}
                              {item.val}
                            </span>
                          </div>
                        </ScrollReveal>
                      ))}
                    </ScrollReveal>
                  </div>

                  <div className="lg:col-span-4 relative mt-12 lg:mt-0 lg:sticky lg:top-32 w-full max-w-sm mx-auto">
                    <ScrollReveal delay={0.6} animation="zoom-in">
                      <div className="aspect-square relative flex items-center justify-center perspective-[2000px]">
                        {/* Interactive 3D Photo Frame - Rounded Full */}
                        <div
                          className="w-full aspect-square relative group cursor-none transition-all duration-700 ease-out"
                          onMouseMove={handlePhotoMove}
                          onMouseLeave={handlePhotoLeave}
                          style={{
                            transform: `rotateX(${photoRotate.x}deg) rotateY(${photoRotate.y}deg)`,
                            transformStyle: 'preserve-3d'
                          }}
                          data-cursor="CORE_MEM"
                        >
                          <div className="absolute inset-0 rounded-full bg-accent/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>

                          <div className="w-full h-full relative overflow-hidden rounded-full border border-white/10 glass transition-all duration-1000 group-hover:border-accent/60 group-hover:shadow-[0_0_80px_rgba(56,189,248,0.25)]">
                            <div className="absolute inset-0 overflow-hidden">
                              <img
                                src="/profile.jpg"
                                className="w-full h-full object-cover grayscale brightness-50 transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-90"
                                alt="Profile"
                              />
                            </div>

                            {/* Glitch Overlays */}
                            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay opacity-0 group-hover:animate-glitch-1 pointer-events-none" />
                            <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay opacity-0 group-hover:animate-glitch-2 pointer-events-none" />
                            
                            {/* Scanline Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] transition-opacity duration-700" />

                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="absolute inset-x-0 bottom-8 translate-z-100 transform transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 flex justify-center">
                              <div className="glass px-6 py-3 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                                <h4 className="text-[10px] font-display font-bold text-white tracking-[0.2em] uppercase">Mohammed Adnan</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Projects />

          <Skills />

          <Contact />
        </motion.main>

        <footer className="py-24 border-t border-theme-border bg-primary relative z-30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-4 space-y-6">
                <a href="#" className="text-2xl font-display font-bold text-theme-text tracking-tighter block">
                  Mohammed Adnan
                </a>
                <p className="text-theme-secondary font-light text-sm leading-relaxed max-w-xs">
                  Constructing intelligent systems and digital architectures with precision and passion.
                </p>
              </div>

              <div className="md:col-span-2 md:col-start-7 space-y-6">
                <h4 className="text-[10px] font-mono text-theme-text/40 uppercase tracking-[0.2em]">Index</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-sm text-theme-secondary hover:text-accent transition-colors">Home</a></li>
                  <li><a href="#about" className="text-sm text-theme-secondary hover:text-accent transition-colors">About</a></li>
                  <li><a href="#projects" className="text-sm text-theme-secondary hover:text-accent transition-colors">Works</a></li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h4 className="text-[10px] font-medium text-theme-text/40 uppercase tracking-widest">What I Do</h4>
                <ul className="space-y-4">
                  <li><span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default">Machine Learning</span></li>
                  <li><span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default">AI Development</span></li>
                  <li><span className="text-sm text-theme-secondary hover:text-accent transition-colors cursor-default">Web Applications</span></li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h4 className="text-[10px] font-mono text-theme-text/40 uppercase tracking-[0.2em]">Legal</h4>
                <ul className="space-y-4">
                  <li><span className="text-sm text-theme-secondary/60 cursor-not-allowed">Privacy</span></li>
                  <li><span className="text-sm text-theme-secondary/60 cursor-not-allowed">Terms</span></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-theme-secondary">
                © 2026 Mohammed Adnan. All Rights Reserved.
              </div>
              <div className="text-sm text-theme-secondary">
                Made with <span className="text-accent-purple">❤️</span> by <span className="text-theme-text">Adnan</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default App;
