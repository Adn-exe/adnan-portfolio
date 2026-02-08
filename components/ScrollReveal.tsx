
import React from 'react';
import { motion, Variants } from 'framer-motion';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
  duration?: number;
  once?: boolean;
  distance?: number;
  staggerChildren?: number;
  isContainer?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  duration = 0.8,
  once = false,
  distance = 30,
  staggerChildren = 0.1,
  isContainer = false
}) => {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: animation === 'fade-up' ? distance : animation === 'fade-down' ? -distance : 0,
      x: animation === 'fade-left' ? distance : animation === 'fade-right' ? -distance : 0,
      scale: animation === 'zoom-in' ? 0.95 : animation === 'zoom-out' ? 1.05 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: isContainer ? staggerChildren : 0,
        when: "beforeChildren",
      },
    },
  };

  if (isContainer) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
