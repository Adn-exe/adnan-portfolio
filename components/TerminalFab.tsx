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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        playClick();
        onToggle();
      }}
      onMouseEnter={playHover}
      className="fixed bottom-8 left-8 z-[110] w-14 h-14 bg-primary/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] group hover:border-accent/50 transition-colors"
      aria-label="Toggle Terminal"
    >
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isOpen ? (
          <svg
            className="w-6 h-6 text-white group-hover:text-accent transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white group-hover:text-accent transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      
      {/* Keyboard Shortcut Indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center border-2 border-primary overflow-hidden">
        <span className="text-[7px] font-bold text-primary">K</span>
      </div>
    </motion.button>
  );
};

export default TerminalFab;
