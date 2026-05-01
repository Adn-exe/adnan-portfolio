import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: 'fade' | 'slide-up' | 'slide-down' | 'zoom' | 'blur' | 'scale-rotate';
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = '',
  variant = 'fade',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), {
    stiffness: 100,
    damping: 30,
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]), {
    stiffness: 100,
    damping: 30,
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]), {
    stiffness: 100,
    damping: 30,
  });

  const blur = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [10, 0, 0, 10]), {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'slide-up':
        return { y, opacity };
      case 'slide-down':
        return { y: useTransform(y, (value) => -value), opacity };
      case 'zoom':
        return { scale, opacity };
      case 'blur':
        return { filter: useTransform(blur, (value) => `blur(${value}px)`), opacity };
      case 'scale-rotate':
        return { scale, rotate, opacity };
      default:
        return { opacity };
    }
  };

  const styles = getVariantStyles();

  const Component = id ? 'section' : 'div';

  return (
    <Component
      ref={ref as any}
      id={id}
      className={`relative ${className}`}
    >
      <motion.div style={styles} className="h-full">
        {children}
      </motion.div>
    </Component>
  );
};

export default SectionTransition;
