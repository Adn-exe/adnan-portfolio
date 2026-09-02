import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

interface TerminalFabProps {
  isOpen: boolean;
  onToggle: () => void;
}

const TerminalFab: React.FC<TerminalFabProps> = ({ isOpen, onToggle }) => {
  const { playHover, playClick } = useAudio();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => {
        playClick();
        onToggle();
      }}
      onMouseEnter={playHover}
      className={`fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[110] group select-none ${isOpen ? 'hidden md:block' : ''}`}
      aria-label="Toggle Terminal"
    >
      <div className="relative">
        {/* Ambient neon hover glow */}
        <div className="absolute inset-0 bg-accent/25 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Square Button Frame */}
        <div className="relative w-10 h-10 md:w-11 md:h-11 aspect-square rounded-lg bg-surface/90 [.light_&]:bg-[#FAF8F2]/90 backdrop-blur-xl border border-accent/30 group-hover:border-accent shadow-[0_6px_20px_rgba(0,0,0,0.35)] group-hover:shadow-[0_0_18px_var(--accent-glow,rgba(0,209,255,0.3))] flex items-center justify-center transition-all duration-300">
          {isOpen ? (
            /* Terminal Window with Close X */
            <svg
              className="w-5 h-5 text-theme-text group-hover:text-accent transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m9 9 6 6" />
              <path d="m15 9-6 6" />
            </svg>
          ) : (
            /* Classic Terminal Window Logo */
            <svg
              className="w-5 h-5 text-theme-text group-hover:text-accent transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m7 9 3 3-3 3" />
              <path d="m13 15 4 0" />
            </svg>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default TerminalFab;
