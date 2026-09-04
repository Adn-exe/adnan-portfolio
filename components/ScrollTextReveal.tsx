import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

export interface BioWord {
  text: string;
  highlight?: 'accent' | 'primary' | 'normal';
}

interface WordProps {
  word: BioWord;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ word, progress, range }) => {
  // Words start completely invisible and smoothly appear
  const opacity = useTransform(progress, range, [0, 1]);
  // Subtle vertical settling effect (4px down -> 0)
  const y = useTransform(progress, range, [4, 0]);

  let colorClasses = 'text-theme-secondary font-normal';
  if (word.highlight === 'accent') {
    colorClasses = 'text-accent [.light_&]:text-amber-600 font-semibold drop-shadow-[0_0_12px_rgba(56,189,248,0.25)] [.light_&]:drop-shadow-none';
  } else if (word.highlight === 'primary') {
    colorClasses = 'text-theme-text font-semibold';
  }

  return (
    <span className="relative inline-block mr-[0.28em] my-[0.06em]">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block transition-colors duration-300 ${colorClasses}`}
      >
        {word.text}
      </motion.span>
    </span>
  );
};

export const BIO_WORDS: BioWord[] = [
  { text: "I’m", highlight: 'normal' },
  { text: "an", highlight: 'normal' },
  { text: "AI/ML", highlight: 'primary' },
  { text: "student", highlight: 'primary' },
  { text: "passionate", highlight: 'normal' },
  { text: "about", highlight: 'normal' },
  { text: "understanding", highlight: 'normal' },
  { text: "how", highlight: 'normal' },
  { text: "intelligent", highlight: 'normal' },
  { text: "systems", highlight: 'normal' },
  { text: "work,", highlight: 'normal' },
  { text: "with", highlight: 'normal' },
  { text: "a", highlight: 'normal' },
  { text: "focus", highlight: 'normal' },
  { text: "on", highlight: 'normal' },
  { text: "building", highlight: 'normal' },
  { text: "strong", highlight: 'accent' },
  { text: "foundations", highlight: 'accent' },
  { text: "and", highlight: 'normal' },
  { text: "turning", highlight: 'normal' },
  { text: "ideas", highlight: 'normal' },
  { text: "into", highlight: 'normal' },
  { text: "practical", highlight: 'normal' },
  { text: "solutions.", highlight: 'normal' },
  { text: "I", highlight: 'normal' },
  { text: "enjoy", highlight: 'normal' },
  { text: "breaking", highlight: 'normal' },
  { text: "down", highlight: 'normal' },
  { text: "complex", highlight: 'normal' },
  { text: "problems,", highlight: 'normal' },
  { text: "building", highlight: 'normal' },
  { text: "real-world", highlight: 'primary' },
  { text: "AI", highlight: 'primary' },
  { text: "projects,", highlight: 'primary' },
  { text: "and", highlight: 'normal' },
  { text: "exploring", highlight: 'normal' },
  { text: "the", highlight: 'normal' },
  { text: "intersection", highlight: 'normal' },
  { text: "of", highlight: 'normal' },
  { text: "AI", highlight: 'normal' },
  { text: "and", highlight: 'normal' },
  { text: "software.", highlight: 'normal' },
  { text: "I’m", highlight: 'normal' },
  { text: "always", highlight: 'normal' },
  { text: "looking", highlight: 'normal' },
  { text: "to", highlight: 'normal' },
  { text: "learn,", highlight: 'normal' },
  { text: "collaborate,", highlight: 'normal' },
  { text: "and", highlight: 'normal' },
  { text: "grow", highlight: 'normal' },
  { text: "through", highlight: 'normal' },
  { text: "meaningful", highlight: 'accent' },
  { text: "hands-on", highlight: 'accent' },
  { text: "work.", highlight: 'accent' },
];

interface ScrollTextRevealProps {
  progress: MotionValue<number>;
  className?: string;
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  progress,
  className = ''
}) => {
  const totalWords = BIO_WORDS.length;

  // Slightly faster ease-in reveal window across progress [0.05, 0.32]
  const START_PROGRESS = 0.05;
  const END_PROGRESS = 0.32;
  const TOTAL_WINDOW = END_PROGRESS - START_PROGRESS;

  return (
    <p className={`font-about select-text ${className}`}>
      {BIO_WORDS.map((word, i) => {
        // Ease-in curve (Math.pow 1.6): starts slow and gradually accelerates, ending at END_PROGRESS (0.36)
        const linearT = i / totalWords;
        const easedT = Math.pow(linearT, 1.6);
        const wordStart = START_PROGRESS + easedT * TOTAL_WINDOW;

        const nextLinearT = (i + 1) / totalWords;
        const nextEasedT = Math.pow(nextLinearT, 1.6);
        const nextWordStart = START_PROGRESS + nextEasedT * TOTAL_WINDOW;
        const stepSize = Math.max(0.008, (nextWordStart - wordStart) * 1.8);
        const wordEnd = Math.min(END_PROGRESS, wordStart + stepSize);

        return (
          <Word
            key={i}
            word={word}
            progress={progress}
            range={[wordStart, wordEnd]}
          />
        );
      })}
    </p>
  );
};

export default ScrollTextReveal;
