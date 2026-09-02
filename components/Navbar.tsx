import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';
// @ts-ignore
import StaggeredMenu from './StaggeredMenu';

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
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const { playClick } = useAudio();

  React.useEffect(() => {
    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const menuItems = [
    { label: 'Home', link: '#hero' },
    { label: 'About', link: '#about' },
    { label: 'Projects', link: '#projects' },
    { label: 'Skills', link: '#skills' },
    { label: 'Contact', link: '#contact' },
    {
      label: 'Resume',
      link: '#',
      onClick: () => {
        playClick();
        setIsResumeModalOpen(true);
      }
    }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/adn-exe' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <>
      <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={isLight ? '#1F1A14' : '#FFFFFF'}
        openMenuButtonColor={isLight ? '#D97706' : '#00D1FF'}
        accentColor={isLight ? '#D97706' : '#00D1FF'}
        colors={isLight ? ['#B45309', '#D97706'] : ['#0284C7', '#00D1FF']}
        isFixed={true}
        onMenuOpen={() => playClick()}
        onMenuClose={() => playClick()}
      />

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
};

export default Navbar;
