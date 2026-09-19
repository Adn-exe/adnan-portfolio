import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  wordAnimationStart?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = false,
  baseOpacity = 0,
  baseRotation = 0,
  blurStrength = 0,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'center center',
  wordAnimationStart = 'top bottom-=10%'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    if (!text) return null;

    const targetPhrases = [
      'AI/ML student',
      'intelligent systems',
      'practical solutions',
      'real-world AI projects',
      'intersection of AI and software',
    ];

    // Find [start, end] character ranges for each target phrase
    const ranges: [number, number][] = [];
    for (const phrase of targetPhrases) {
      let startIndex = 0;
      while ((startIndex = text.indexOf(phrase, startIndex)) !== -1) {
        ranges.push([startIndex, startIndex + phrase.length]);
        startIndex += phrase.length;
      }
    }

    let charCursor = 0;
    return text.split(/(\s+)/).map((segment, index) => {
      const segStart = charCursor;
      const segEnd = charCursor + segment.length;
      charCursor = segEnd;

      if (segment.match(/^\s+$/)) return segment;

      const isHighlighted = ranges.some(([start, end]) => segStart < end && segEnd > start);

      const highlightClass = isHighlighted
        ? 'text-accent [.light_&]:text-amber-600 font-semibold drop-shadow-[0_0_12px_rgba(56,189,248,0.25)] [.light_&]:drop-shadow-none'
        : 'text-white/85 [.light_&]:text-stone-800 font-[450]';

      return (
        <span
          className={`word mr-[0.3em] ${highlightClass}`}
          key={index}
          style={{ opacity: baseOpacity }}
        >
          {segment}
        </span>
      );
    });
  }, [children, baseOpacity]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom',
              end: rotationEnd,
              scrub: true
            }
          }
        );
      }

      const wordElements = el.querySelectorAll('.word');

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          filter: enableBlur && blurStrength > 0 ? `blur(${blurStrength}px)` : 'none'
        },
        {
          ease: 'none',
          opacity: 1,
          filter: 'none',
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: wordAnimationStart,
            end: wordAnimationEnd,
            scrub: 0.5
          }
        }
      );
    }, containerRef);

    // Refresh ScrollTrigger to ensure accurate positions after DOM paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, wordAnimationStart, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
export { ScrollReveal as ScrollTextReveal };
