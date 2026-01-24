
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'bg-primary/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-10'
      }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Magnetic>
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="group flex items-center gap-3 text-xl font-display font-bold tracking-tighter text-white"
            data-cursor="HOME"
          >
            <ElysiumLogo className="w-8 h-8 text-accent group-hover:rotate-[45deg] transition-transform duration-700" />
            <span className="hidden sm:inline">ADNAN</span>
          </motion.a>
        </Magnetic>

        <div className="hidden md:flex items-center space-x-12">
          {['About', 'Projects', 'Skills', 'Contact'].map((item, i) => (
            <Magnetic key={item}>
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 group ${activeItem === item ? 'text-white' : 'text-slate-500 hover:text-white'
                  }`}
                data-cursor={item.toUpperCase()}
              >
                {item}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[1px] bg-accent shadow-[0_0_10px_#38BDF8]"
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
              className="relative overflow-hidden px-8 py-2.5 group rounded-full"
              data-cursor="RESUME"
            >
              <div className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-full group-hover:border-accent-purple/50 transition-all duration-500" />
              <span className="relative z-10 text-[10px] font-bold text-accent group-hover:text-white tracking-widest uppercase transition-colors duration-500">
                Resume
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-purple to-accent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              <div className="absolute inset-0 bg-[#081b33] opacity-0 group-hover:opacity-95 transition-opacity duration-300 -z-10"></div>
            </motion.button>
          </Magnetic>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden text-accent p-2 glass rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
