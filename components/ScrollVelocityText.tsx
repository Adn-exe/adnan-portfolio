import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useInView
} from "framer-motion";

// Custom wrap function to avoid external dependency
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface MarqueeProps {
  children: string;
  baseVelocity: number;
}

const MarqueeText: React.FC<MarqueeProps> = ({ children, baseVelocity }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "150px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 80,
    stiffness: 120
  });
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-0.6, 0, 0.6], {
    clamp: true
  });

  // Wrap the position so the text loops infinitely
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((t, delta) => {
    if (!isInView) return;
    const deltaSeconds = Math.min(delta / 1000, 0.05);

    // Base ambient movement
    let moveBy = baseVelocity * deltaSeconds;

    // Gentle scroll velocity contribution
    const vFactor = velocityFactor.get();
    moveBy += (baseVelocity >= 0 ? 1 : -1) * Math.abs(vFactor) * baseVelocity * 0.8 * deltaSeconds;

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={containerRef} className="flex overflow-hidden relative w-full select-none pointer-events-none">
      <motion.div 
        className="flex flex-nowrap whitespace-nowrap shrink-0 will-change-transform" 
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className="block text-6xl md:text-9xl font-display font-black uppercase text-theme-text opacity-[0.08] mr-12"
          >
            {children}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const ScrollVelocityText: React.FC = () => {
  return (
    <section className="py-12 md:py-24 overflow-hidden relative z-0 pointer-events-none select-none flex flex-col gap-4">
      <MarqueeText baseVelocity={0.6}>Innovation Intelligence Architecture</MarqueeText>
      <MarqueeText baseVelocity={-0.6}>Design Engineering Systems</MarqueeText>
    </section>
  );
};

export default ScrollVelocityText;
