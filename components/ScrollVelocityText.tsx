import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue
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
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 250
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: true
  });

  // Wrap the position so the text loops infinitely
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Dynamic direction mapping based on velocity direction
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Smooth subtle scroll speed increase
    moveBy += directionFactor.current * (baseVelocity * 0.5) * Math.abs(velocityFactor.get());

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden relative w-full select-none pointer-events-none">
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
      <MarqueeText baseVelocity={1.2}>Innovation Intelligence Architecture</MarqueeText>
      <MarqueeText baseVelocity={-1.2}>Design Engineering Systems</MarqueeText>
    </section>
  );
};

export default ScrollVelocityText;
