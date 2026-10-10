import React, { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

import { Tooltip } from './ui/tooltip-card';

const EASTER_EGGS: Record<string, string> = {
  'AI/ML student': 'Professional question-asker. Currently teaching computers to guess, and teaching myself to be okay when they guess wrong.',
  'black box': 'Peeking under the hood of neural nets to see what linear algebra and matrix magic are actually up to.',
  'loss curves': 'Staring at stubborn gradients, wondering if it\'s the learning rate or just a personal vendetta against convergence.',
  'happiest': 'Happiest is a relative term. Usually means caffeine levels are critical, 40 browser tabs are open, and the ai agents finally stopped throwing an existential crisis.',
  'write': 'Blogs, stories, and musings. Penning my thoughts before they drift into the ether.',
  'music': 'The unofficial co-pilot to every late-night coding session. Ambient, lo-fi, and soundtracks keeping the flow state locked.',
  'people and machines behave': 'Both run on feedback loops, unpredictable inputs, and the occasional mysterious crash.',
};

export interface ScrollRevealProps {
  children?: React.ReactNode;
  leadText?: string;
  bodyText?: string;
  rightContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  triggerRef?: React.RefObject<HTMLElement | null>;
  pin?: boolean;
  pinDistance?: number;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  wordAnimationStart?: string;
  enableEasterEggs?: boolean;
  floatContent?: React.ReactNode;
}

const buildChromaTokens = (
  text: string,
  isLight: boolean,
  baseOpacity: number,
  enableEasterEggs: boolean,
  keyPrefix = 'w'
) => {
  if (!text) return null;

  const baseGrad = isLight
    ? 'linear-gradient(90deg, #1F1A14 0%, #1F1A14 30%, #D97706 38%, #F59E0B 46%, #B45309 54%, #78350F 62%, #A8A29E 70%, #A8A29E 100%)'
    : 'linear-gradient(90deg, #F8FAFC 0%, #F8FAFC 30%, #00D1FF 38%, #38BDF8 46%, #818CF8 54%, #C084FC 62%, #64748B 70%, #64748B 100%)';

  const highlightGrad = isLight
    ? 'linear-gradient(90deg, #D97706 0%, #D97706 30%, #F59E0B 38%, #B45309 46%, #78350F 54%, #D97706 62%, #A8A29E 70%, #A8A29E 100%)'
    : 'linear-gradient(90deg, #00D1FF 0%, #00D1FF 30%, #38BDF8 38%, #818CF8 46%, #C084FC 54%, #00D1FF 62%, #64748B 70%, #64748B 100%)';

  const targetPhrases = Object.keys(EASTER_EGGS);

  interface PhraseMatch {
    phrase: string;
    startIndex: number;
    endIndex: number;
  }

  const matches: PhraseMatch[] = [];
  if (enableEasterEggs) {
    for (const phrase of targetPhrases) {
      let startIndex = 0;
      while ((startIndex = text.indexOf(phrase, startIndex)) !== -1) {
        let endIndex = startIndex + phrase.length;

        const charBefore = startIndex > 0 ? text[startIndex - 1] : ' ';
        const charAfter = endIndex < text.length ? text[endIndex] : ' ';
        const isBoundaryBefore = /[\s.,!?;:'"()[\]{}]/.test(charBefore);
        const isBoundaryAfter = /[\s.,!?;:'"()[\]{}]/.test(charAfter);

        if (!isBoundaryBefore || !isBoundaryAfter) {
          startIndex += 1;
          continue;
        }

        if (text[endIndex] === '.' || text[endIndex] === ',') {
          endIndex += 1;
        }
        matches.push({ phrase, startIndex, endIndex });
        startIndex = endIndex;
      }
    }
    matches.sort((a, b) => a.startIndex - b.startIndex);
  }

  const nonOverlappingMatches: PhraseMatch[] = [];
  let currentEnd = 0;
  for (const m of matches) {
    if (m.startIndex >= currentEnd) {
      nonOverlappingMatches.push(m);
      currentEnd = m.endIndex;
    }
  }

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let counter = 0;

  const renderWords = (content: string, isHighlighted: boolean) => {
    const grad = isHighlighted ? highlightGrad : baseGrad;
    const highlightClass = isHighlighted
      ? 'font-semibold drop-shadow-[0_0_12px_rgba(0,209,255,0.3)] [.light_&]:drop-shadow-none'
      : 'font-[450]';

    return content.split(/(\s+)/).map((segment) => {
      if (segment.match(/^\s+$/)) {
        return segment;
      }
      counter += 1;
      return (
        <span
          className={`chroma-word mr-[0.3em] ${highlightClass}`}
          key={`${keyPrefix}-${counter}`}
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
  };

  nonOverlappingMatches.forEach((match, matchIdx) => {
    if (match.startIndex > lastIndex) {
      const plainText = text.slice(lastIndex, match.startIndex);
      elements.push(
        <React.Fragment key={`${keyPrefix}-plain-${matchIdx}`}>
          {renderWords(plainText, false)}
        </React.Fragment>
      );
    }

    const phraseText = text.slice(match.startIndex, match.endIndex);
    const egg = EASTER_EGGS[match.phrase];

    elements.push(
      <Tooltip
        key={`${keyPrefix}-egg-${match.phrase}-${matchIdx}`}
        as="span"
        containerClassName="relative inline-block align-baseline cursor-pointer"
        tooltipClassName="z-50 min-w-[18rem] sm:min-w-[22rem] max-w-[28rem] sm:max-w-[36rem]"
        content={egg}
      >
        {renderWords(phraseText, true)}
      </Tooltip>
    );

    lastIndex = match.endIndex;
  });

  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    elements.push(
      <React.Fragment key={`${keyPrefix}-plain-tail`}>
        {renderWords(remainingText, false)}
      </React.Fragment>
    );
  }

  return elements;
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  leadText,
  bodyText,
  rightContent,
  footerContent,
  scrollContainerRef,
  triggerRef,
  pin = false,
  pinDistance = 1100,
  baseOpacity = 0.2,
  baseRotation = 0,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'center center',
  wordAnimationStart = 'top bottom-=10%',
  enableEasterEggs = true,
  floatContent,
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

  const leadTokens = useMemo(() => {
    if (!leadText) return null;
    return buildChromaTokens(leadText, isLight, baseOpacity, enableEasterEggs, 'lead');
  }, [leadText, isLight, baseOpacity, enableEasterEggs]);

  const bodyTokens = useMemo(() => {
    if (!bodyText) return null;
    return buildChromaTokens(bodyText, isLight, baseOpacity, enableEasterEggs, 'body');
  }, [bodyText, isLight, baseOpacity, enableEasterEggs]);

  const splitText = useMemo(() => {
    if (leadText || bodyText) return null;
    const text = typeof children === 'string' ? children : '';
    return buildChromaTokens(text, isLight, baseOpacity, enableEasterEggs, 'single');
  }, [children, leadText, bodyText, isLight, baseOpacity, enableEasterEggs]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const triggerEl = triggerRef && triggerRef.current ? triggerRef.current : el;

    const mm = gsap.matchMedia();

    // Desktop (pinned scrub reveal if pin is true)
    mm.add('(min-width: 1024px) and (min-height: 600px)', () => {
      const wordElements = el.querySelectorAll('.chroma-word');

      if (pin) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            scroller,
            start: 'top top',
            end: `+=${pinDistance}`,
            pin: triggerEl,
            pinSpacing: true,
            scrub: 0.3,
            anticipatePin: 0,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          wordElements,
          {
            backgroundPosition: '100% 50%',
            opacity: baseOpacity,
          },
          {
            ease: 'none',
            backgroundPosition: '0% 50%',
            opacity: 1,
            stagger: 0.035,
          }
        );

        // Gentle pause buffer at the end so user reads complete text before unpinning
        tl.to({}, { duration: 0.35 });
      } else {
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
                scrub: true,
              },
            }
          );
        }

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
              scrub: 0.5,
            },
          }
        );
      }
    });

    // Mobile / Tablet / Short Viewports: Smooth flowing scrub without pinning
    mm.add('(max-width: 1023px), (max-height: 599px)', () => {
      const wordElements = el.querySelectorAll('.chroma-word');

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
              scrub: true,
            },
          }
        );
      }

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
            scrub: 0.5,
          },
        }
      );
    });

    // Refresh ScrollTrigger to ensure accurate metrics after paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, [
    scrollContainerRef,
    triggerRef,
    pin,
    pinDistance,
    baseOpacity,
    baseRotation,
    rotationEnd,
    wordAnimationEnd,
    wordAnimationStart,
    isLight,
  ]);

  if (leadText && bodyTokens) {
    return (
      <div ref={containerRef} className={`scroll-reveal ${containerClassName} space-y-8 md:space-y-10`}>
        {/* Full-width Lead Text: first 2-3 lines spread across full screen */}
        <p
          className={`scroll-reveal-text ${textClassName} max-w-full`}
          style={{ fontFamily: "'Marcellus', serif", lineHeight: 1.42 }}
        >
          {leadTokens}
        </p>

        {/* Lower Grid: Body text on left, photo on right, chips below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
            <p
              className={`scroll-reveal-text ${textClassName}`}
              style={{ fontFamily: "'Marcellus', serif", lineHeight: 1.42 }}
            >
              {bodyTokens}
            </p>
            {footerContent}
          </div>

          {rightContent && (
            <div className="lg:col-span-5 flex items-center justify-center -mt-6 sm:-mt-10 lg:-mt-14">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      {floatContent}
      <p className={`scroll-reveal-text ${textClassName}`} style={{ fontFamily: "'Marcellus', serif", lineHeight: 1.38 }}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
export { ScrollReveal as ScrollTextReveal };
