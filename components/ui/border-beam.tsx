"use client";

import React from "react";
import { motion, type MotionStyle, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface BorderBeamProps {
  /**
   * The size of the border beam.
   */
  size?: number;
  /**
   * The duration of the border beam in seconds.
   */
  duration?: number;
  /**
   * The delay before the animation starts.
   */
  delay?: number;
  /**
   * The starting color of the border beam gradient.
   */
  colorFrom?: string;
  /**
   * The ending color of the border beam gradient.
   */
  colorTo?: string;
  /**
   * The motion transition of the border beam.
   */
  transition?: Transition;
  /**
   * Custom class name to apply.
   */
  className?: string;
  /**
   * Custom styles to apply.
   */
  style?: React.CSSProperties;
  /**
   * Whether to reverse the animation direction.
   */
  reverse?: boolean;
  /**
   * Initial offset percentage (0-100).
   */
  initialOffset?: number;
  /**
   * Border width in pixels.
   */
  borderWidth?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  delay = 0,
  duration = 10,
  colorFrom = "#00D1FF",
  colorTo = "#A855F7",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={{
        borderWidth: `${borderWidth}px`,
        borderStyle: "solid",
        borderColor: "transparent",
        WebkitMask:
          "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
        WebkitMaskClip: "padding-box, border-box",
        WebkitMaskComposite: "source-in, xor",
        mask: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
        maskClip: "padding-box, border-box",
        maskComposite: "intersect",
      }}
    >
      <motion.div
        className="absolute aspect-square"
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};

export default BorderBeam;
