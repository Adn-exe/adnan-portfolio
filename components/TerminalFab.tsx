import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';
import StarBorder from './StarBorder';

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
      className={`fixed bottom-8 left-8 z-[110] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] group ${isOpen ? 'hidden md:block' : ''}`}
      aria-label="Toggle Terminal"
    >
      <StarBorder
        as="div"
        className="rounded-2xl"
        innerClassName="w-14 h-14 bg-primary/80 backdrop-blur-xl rounded-2xl flex items-center justify-center"
        color="#00D1FF"
        thickness={1.5}
      >
        <div className="relative">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {isOpen ? (
            <svg
              className="w-6 h-6 text-theme-text group-hover:text-accent transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-theme-text group-hover:text-accent transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19h8" />
            </svg>
          )}
        </div>
        
        {/* Keyboard Shortcut Indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center border-2 border-primary overflow-hidden">
          <span className="text-[7px] font-bold text-primary">K</span>
        </div>
      </StarBorder>
    </motion.button>
  );
};

export default TerminalFab;
