import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ElysiumLogo } from './Icons';
import Magnetic from './Magnetic';
import { useAudio } from '../hooks/useAudio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { playHover, playClick } = useAudio();
  const viewLink = "https://drive.google.com/file/d/1UTLmV5K6b1z0jgcAhCU-qIW2rwdiD1RN/view?usp=drive_link";
  const downloadLink = "https://drive.google.com/uc?export=download&id=1UTLmV5K6b1z0jgcAhCU-qIW2rwdiD1RN";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playClick();
              onClose();
            }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-md mx-4 p-8 rounded-3xl bg-surface/90 border border-accent/20 shadow-[0_0_50px_rgba(0,209,255,0.15)] backdrop-blur-2xl text-center"
          >
            {/* Close button top right */}
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-theme-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(0,209,255,0.1)]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            {/* Title & Desc */}
            <h3 className="text-2xl font-display font-bold text-theme-text mb-2 tracking-tight">
              Professional Resume
            </h3>
            <p className="text-sm text-theme-secondary mb-8 leading-relaxed max-w-xs mx-auto">
              Select an option to view the resume in your browser or download a PDF copy.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={viewLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                onMouseEnter={playHover}
                className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide border border-accent/30 text-accent bg-accent/5 hover:bg-accent hover:text-primary hover:border-accent hover:shadow-[0_0_20px_rgba(0,209,255,0.2)] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </a>

              <a
                href={downloadLink}
                onClick={() => {
                  playClick();
                  onClose();
                }}
                onMouseEnter={playHover}
                className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide bg-accent text-primary hover:shadow-[0_0_20px_rgba(0,209,255,0.35)] hover:scale-[1.02] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Hero');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { playHover, playClick } = useAudio();

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
          backgroundColor: scrolled ? "var(--navbar-bg)" : "rgba(0, 0, 0, 0)",
          borderColor: scrolled
            ? "var(--border-color)"
            : "rgba(255, 255, 255, 0)",
          boxShadow: scrolled
            ? "0 0 40px rgba(0, 209, 255, 0.15), inset 0 0 12px rgba(0, 209, 255, 0.05)"
            : "0 0 0px rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-[100] rounded-full backdrop-blur-2xl border flex justify-center items-center min-w-[1100px] hidden md:flex overflow-hidden`}
      >
        {/* Interior Gradient Glow */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.08),transparent_70%)]"
            />
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center w-full gap-12 relative z-10">
          <Magnetic>
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
              className="group flex items-center gap-3 text-xl font-display font-bold tracking-tighter text-theme-text"
              data-cursor="HOME"
            >
              <ElysiumLogo className="w-8 h-8 text-accent group-hover:rotate-[45deg] transition-transform duration-700 drop-shadow-[0_0_8px_rgba(0,209,255,0.6)]" />
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
                  className={`relative text-xs font-medium tracking-widest uppercase transition-all duration-300 group ${activeItem === item
                    ? 'text-accent'
                    : 'text-theme-secondary hover:text-accent'
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * 4 }}
                onClick={() => {
                  playClick();
                  setIsResumeModalOpen(true);
                }}
                onMouseEnter={playHover}
                className="group/resume relative overflow-hidden inline-flex items-center px-6 py-2 rounded-full text-xs font-medium tracking-widest uppercase border border-accent/30 text-accent transition-all duration-500 hover:text-primary hover:border-accent hover:shadow-[0_0_18px_rgba(0,209,255,0.25)]"
                data-cursor="RESUME"
              >
                {/* Fill sweep from left on hover */}
                <span className="absolute inset-0 bg-accent rounded-full scale-x-0 origin-left group-hover/resume:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                <span className="relative z-10">Resume</span>
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
          onClick={() => {
            playClick();
            setIsResumeModalOpen(true);
          }}
          className="text-accent p-3 glass rounded-full"
          data-cursor="RESUME"
        >
          <span className="sr-only">Resume Options</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </motion.button>
      </nav>

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
};

export default Navbar;
