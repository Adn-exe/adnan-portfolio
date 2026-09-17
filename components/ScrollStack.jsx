import React, { useLayoutEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

const ScrollStack = forwardRef(({
  children,
  className = '',
  itemDistance = 200,
  itemScale = 0.03,
  itemStackDistance = 0,
  stackPosition = '10%',
  baseScale = 0.9,
  onStackComplete,
  onActiveIndexChange
}, ref) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardMetricsRef = useRef([]);
  const animationFrameRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const activeIndexRef = useRef(0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Measure initial static un-transformed offsets
  const measureCards = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    // Cache current transforms so we can reset and accurately measure static layout
    const cachedTransforms = cards.map(c => c.style.transform);
    cards.forEach(c => {
      c.style.transform = 'none';
    });

    const scrollerRect = scroller.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const scrollerTop = scrollerRect.top + scrollTop;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    cardMetricsRef.current = cards.map((card, i) => {
      const staticTop = scrollerTop + card.offsetTop;
      const targetScreenY = stackPositionPx + itemStackDistance * i;
      const pinStart = staticTop - targetScreenY;

      return {
        card,
        staticTop,
        targetScreenY,
        pinStart
      };
    });

    // Restore cached transforms
    cards.forEach((c, idx) => {
      c.style.transform = cachedTransforms[idx] || '';
    });
  }, [itemStackDistance, stackPosition, parsePercentage]);

  const updateTransforms = useCallback(() => {
    const metrics = cardMetricsRef.current;
    if (!metrics.length) return;

    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const containerHeight = window.innerHeight;
    const totalCards = metrics.length;
    const lastCard = metrics[totalCards - 1];

    // The whole stack unpins after the last card has pinned and scrolled through
    const pinEnd = lastCard.pinStart + containerHeight * 0.6;

    // Find which card is currently the active/topmost visible card
    let activeIndex = 0;
    for (let j = 0; j < totalCards; j++) {
      if (scrollTop >= metrics[j].pinStart - 15) {
        activeIndex = j;
      }
    }

    if (activeIndex !== activeIndexRef.current) {
      activeIndexRef.current = activeIndex;
      onActiveIndexChange?.(activeIndex);
    }

    metrics.forEach((metric, i) => {
      const { card, pinStart } = metric;
      if (!card) return;

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        // Pinned: stays stationary at targetScreenY
        translateY = scrollTop - pinStart;
      } else if (scrollTop > pinEnd) {
        // Unpinned: scrolls upward with document
        translateY = pinEnd - pinStart;
      } else {
        // Normal scroll before reaching pin position
        translateY = 0;
      }

      // Pure positional pinning — no scale, no brightness reduction
      card.style.transform = `translate3d(0, ${Math.round(translateY * 10) / 10}px, 0)`;
      card.style.filter = '';
    });

    // Notify stack completion
    const isCompleted = scrollTop >= lastCard.pinStart;
    if (isCompleted && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (!isCompleted && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }
  }, [onStackComplete, onActiveIndexChange]);

  const scrollToCard = useCallback((index) => {
    measureCards();
    updateTransforms();
    const metric = cardMetricsRef.current[index];
    if (!metric) return;

    const targetY = metric.pinStart + 8;
    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetY, {
        duration: 1.0,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, [measureCards, updateTransforms]);

  useImperativeHandle(ref, () => ({
    scrollToCard,
    getActiveIndex: () => activeIndexRef.current,
    measureCards
  }), [scrollToCard, measureCards]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      // z-index ensures cards stacked later in DOM layer strictly on top of earlier cards
      card.style.zIndex = `${i + 10}`;
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translate3d(0, 0, 0)';
    });

    measureCards();
    updateTransforms();

    const onScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateTransforms);
    };

    const onResize = () => {
      measureCards();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Sync with root Lenis if available
    const lenis = window.__lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', onScroll);
    }

    // Re-measure after initial layout settles
    const timer1 = setTimeout(() => {
      measureCards();
      updateTransforms();
    }, 150);

    const timer2 = setTimeout(() => {
      measureCards();
      updateTransforms();
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', onScroll);
      }
      cardMetricsRef.current = [];
      cardsRef.current = [];
    };
  }, [measureCards, updateTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        {/* Generous bottom spacing track so the last card stays pinned comfortably */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
});

ScrollStack.displayName = 'ScrollStack';

export default ScrollStack;
