import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ElysiumLogo } from './Icons';
import Magnetic from './Magnetic';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveItem(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ width: "95%", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        animate={{
          width: scrolled ? "65%" : "95%",
          paddingTop: scrolled ? "1rem" : "1.5rem",
          paddingBottom: scrolled ? "1rem" : "1.5rem",
          backgroundColor: scrolled ? "rgba(0, 5, 10, 0.9)" : "rgba(0, 0, 0, 0)",
          borderColor: scrolled ? "rgba(0, 209, 255, 0.4)" : "rgba(255, 255, 255, 0)",
          boxShadow: scrolled
            ? "0 0 30px rgba(0, 209, 255, 0.2), 0 0 60px rgba(0, 0, 0, 0.8)"
            : "0 0 0px rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-[100] rounded-full backdrop-blur-2xl border flex justify-center items-center min-w-[1100px] hidden md:flex`}
      >
        <div className="flex items-center justify-center w-full gap-12">
          <Magnetic>
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
              className="group flex items-center gap-3 text-xl font-display font-bold tracking-tighter text-white"
              data-cursor="HOME"
            >
              <ElysiumLogo className="w-8 h-8 text-accent group-hover:rotate-[45deg] transition-transform duration-700 drop-shadow-[0_0_8px_rgba(0,209,255,0.6)]" />
              <span className="hidden sm:inline">ADNAN</span>
            </motion.a>
          </Magnetic>

          <div className="hidden md:flex items-center space-x-20">
            {['About', 'Projects', 'Skills', 'Contact'].map((item, i) => (
              <Magnetic key={item}>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative text-xs font-medium tracking-widest uppercase transition-all duration-300 group ${activeItem === item ? 'text-white' : 'text-slate-400 hover:text-accent'
                    }`}
                  data-cursor={item.toUpperCase()}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[1px] bg-accent shadow-[0_0_15px_#00D1FF]"
                    initial={false}
                    animate={{ width: activeItem === item ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.button>
              </Magnetic>
            ))}
            <Magnetic>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative overflow-hidden px-8 py-3 group rounded-full"
                data-cursor="RESUME"
              >
                <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(0,209,255,0.4)] transition-all duration-500" />
                <span className="relative z-10 text-xs font-bold text-white tracking-widest uppercase transition-colors duration-500">
                  Resume
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-white to-accent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out opacity-20"></div>
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav (Separate) */}
      <nav className="fixed top-6 right-6 z-[100] md:hidden">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-accent p-3 glass rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </motion.button>
      </nav>
    </>
  );
};

export default Navbar;
