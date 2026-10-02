import React, { useEffect, useRef, useMemo, useState } from 'react';
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
  baseOpacity = 0,
  baseRotation = 0,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'center center',
  wordAnimationStart = 'top bottom-=10%'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLight, setIsLight] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('light') : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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

    // Chromatic rainbow gradients tuned for dark and light palettes
    // 0% - 30%: solid final text color
    // 38% - 62%: chromatic ribbon sweep
    // 70% - 100%: transparent unrevealed
    const baseGrad = isLight
      ? 'linear-gradient(90deg, #1F1A14 0%, #1F1A14 30%, #D97706 38%, #F59E0B 46%, #B45309 54%, #78350F 62%, transparent 70%, transparent 100%)'
      : 'linear-gradient(90deg, #F8FAFC 0%, #F8FAFC 30%, #00D1FF 38%, #38BDF8 46%, #818CF8 54%, #C084FC 62%, transparent 70%, transparent 100%)';

    const highlightGrad = isLight
      ? 'linear-gradient(90deg, #D97706 0%, #D97706 30%, #F59E0B 38%, #B45309 46%, #78350F 54%, #D97706 62%, transparent 70%, transparent 100%)'
      : 'linear-gradient(90deg, #00D1FF 0%, #00D1FF 30%, #38BDF8 38%, #818CF8 46%, #C084FC 54%, #00D1FF 62%, transparent 70%, transparent 100%)';

    let charCursor = 0;
    return text.split(/(\s+)/).map((segment, index) => {
      const segStart = charCursor;
      const segEnd = charCursor + segment.length;
      charCursor = segEnd;

      if (segment.match(/^\s+$/)) return segment;

      const isHighlighted = ranges.some(([start, end]) => segStart < end && segEnd > start);
      const grad = isHighlighted ? highlightGrad : baseGrad;

      const highlightClass = isHighlighted
        ? 'font-semibold drop-shadow-[0_0_12px_rgba(0,209,255,0.3)] [.light_&]:drop-shadow-none'
        : 'font-[450]';

      return (
        <span
          className={`chroma-word mr-[0.3em] ${highlightClass}`}
          key={index}
          style={{
            backgroundImage: grad,
            backgroundPosition: '100% 50%',
            opacity: baseOpacity,
          }}
        >
          {segment}
        </span>
      );
    });
  }, [children, isLight, baseOpacity]);

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

      const wordElements = el.querySelectorAll('.chroma-word');

      gsap.fromTo(
        wordElements,
        {
          backgroundPosition: '100% 50%',
          opacity: baseOpacity,
        },
        {
          ease: 'power2.out',
          backgroundPosition: '0% 50%',
          opacity: 1,
          stagger: 0.035,
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
  }, [scrollContainerRef, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, wordAnimationStart, isLight]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
export { ScrollReveal as ScrollTextReveal };
