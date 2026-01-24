
import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
  threshold?: number;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0, 
  animation = 'fade-up',
  threshold = 0.1,
  once = false // Changed to false to trigger animations every time by default
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else {
          // Reset visibility when leaving viewport to allow re-triggering
          setIsVisible(false);
        }
      });
    }, { threshold });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold, once]);

  const animationClass = animation === 'none' ? '' : `reveal-${animation}`;

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      className={`reveal-base ${animationClass} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
