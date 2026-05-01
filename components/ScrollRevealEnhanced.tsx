import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'slide-up' | 'word-reveal' | 'char-reveal';
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
  isContainer?: boolean;
  staggerChildren?: number;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  distance = 30,
  duration = 0.8,
  className = '',
  isContainer = false,
  staggerChildren = 0.1,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated, once]);

  const variants = {
    hidden: {
      opacity: 0,
      x: animation === 'fade-left' ? -distance : animation === 'fade-right' ? distance : 0,
      y: animation === 'fade-up' ? distance : animation === 'fade-down' ? -distance : 0,
      scale: animation === 'zoom-in' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  // Word reveal animation
  const WordReveal: React.FC<{ text: string }> = ({ text }) => {
    const words = text.split(' ');
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-block"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={variants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  // Character reveal animation
  const CharReveal: React.FC<{ text: string }> = ({ text }) => {
    const chars = text.split('');
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-block"
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={variants}
            className="inline-block"
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  // Check if children is a string for word/char reveal
  const childrenString = typeof children === 'string' ? children : null;

  if (animation === 'word-reveal' && childrenString) {
    return (
      <div ref={ref} className={className}>
        <WordReveal text={childrenString} />
      </div>
    );
  }

  if (animation === 'char-reveal' && childrenString) {
    return (
      <div ref={ref} className={className}>
        <CharReveal text={childrenString} />
      </div>
    );
  }

  if (isContainer) {
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={className}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={variants}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
