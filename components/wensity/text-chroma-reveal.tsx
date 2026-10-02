"use client";

import * as React from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type HTMLMotionProps,
} from "framer-motion";

import { cn } from "@/lib/utils";

const motionElements = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
} as const;

export type TextChromaRevealTag = keyof typeof motionElements;
export type TextChromaRevealDirection = "ltr" | "rtl";
export type TextChromaRevealEase =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | readonly [number, number, number, number];

export interface TextChromaRevealHandle {
  /** (Re)starts the sweep immediately, ignoring startOnView gating. */
  play: () => void;
  /** Resets to the first phrase and starts the sweep immediately. */
  replay: () => void;
}

export interface TextChromaRevealProps {
  /** Phrase or rotating phrases to reveal. */
  text: string | string[];
  /** Tag rendered as the outer element. Default: `"span"`. */
  as?: TextChromaRevealTag;
  /** Outer layout class (size, weight, tracking). */
  className?: string;
  /** Chromatic ribbon colors across the reveal band. */
  colors?: string[];
  /** Final revealed text color. Default: `"currentColor"`. */
  textColor?: string;
  /** Sweep direction across the text. Default: `"ltr"`. */
  direction?: TextChromaRevealDirection;
  /** Reveal sweep duration in seconds. Default: `1.5`. */
  duration?: number;
  /** Delay before the sweep starts, in seconds. Default: `0`. */
  delay?: number;
  /** Easing for the reveal sweep. */
  ease?: TextChromaRevealEase;
  /** Easing for the fade-out between repeats. */
  fadeEase?: TextChromaRevealEase;
  /** When true, cycle phrases / replay after hold + fade. Default: `false`. */
  repeat?: boolean;
  /** Pause after fade before the next sweep, in seconds. Default: `0.5`. */
  repeatDelay?: number;
  /** Hold fully revealed before fading, in seconds. Default: `1`. */
  holdDuration?: number;
  /** Fade-out duration between cycles, in seconds. Default: `0.6`. */
  fadeDuration?: number;
  /** Lock width to the longest phrase so rotating text does not shift layout. */
  fixedWidth?: boolean;
  /** Wait for viewport entry before playing. Default: `true`. */
  startOnView?: boolean;
  /** Play only once when using viewport trigger. Default: `true`. */
  once?: boolean;
  /** IntersectionObserver rootMargin. */
  inViewMargin?:
    | `${number}px`
    | `${number}px ${number}px`
    | `${number}px ${number}px ${number}px`
    | `${number}px ${number}px ${number}px ${number}px`;
  /** Called every time a phrase finishes revealing (fully visible). */
  onComplete?: () => void;
  /** Imperative play / replay handle. */
  ref?: React.Ref<TextChromaRevealHandle>;
}

const DEFAULT_COLORS = [
  "#c679c4",
  "#fa3d1d",
  "#ffb005",
  "#e1e1fe",
  "#0358f7",
] as const;

const DEFAULT_EASE: TextChromaRevealEase = [0.23, 1, 0.32, 1];
const SWEEP_HIDDEN = 100;
const SWEEP_REVEALED = 0;
const BACKGROUND_SIZE = "300% 100%";

type CycleConfig = {
  duration: number;
  delay: number;
  ease: TextChromaRevealEase;
  fadeEase: TextChromaRevealEase;
  repeat: boolean;
  repeatDelay: number;
  holdDuration: number;
  fadeDuration: number;
  phraseCount: number;
  onComplete?: () => void;
};

function buildGradient(colors: readonly string[], textColor: string, angle: number) {
  const bandStart = 40;
  const bandEnd = 60;
  const stops =
    colors.length === 0
      ? [`${textColor} 50%`]
      : colors.map((color, index) => {
          const t = colors.length === 1 ? 0.5 : index / (colors.length - 1);
          const pct = bandStart + t * (bandEnd - bandStart);
          return `${color} ${pct}%`;
        });

  // First third = final text color, middle = chromatic ribbon, last third =
  // transparent (hidden). Start at background-position 100% (transparent),
  // animate to 0%. `angle` flips which edge the reveal starts from.
  return `linear-gradient(${angle}deg, ${textColor} 0%, ${textColor} 33.33%, ${stops.join(", ")}, transparent 66.67%, transparent 100%)`;
}

function measureMaxWidth(element: HTMLElement, texts: readonly string[]) {
  const ghost = document.createElement(element.tagName.toLowerCase());
  const computed = getComputedStyle(element);

  ghost.className = element.className;
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    inset: "auto",
    width: "auto",
    maxWidth: "none",
    height: "auto",
    whiteSpace: "nowrap",
    font: computed.font,
    letterSpacing: computed.letterSpacing,
    textTransform: computed.textTransform,
    fontFeatureSettings: computed.fontFeatureSettings,
  });

  const parent = element.parentElement ?? document.body;
  parent.appendChild(ghost);

  let max = 0;
  for (const entry of texts) {
    ghost.textContent = entry;
    max = Math.max(max, ghost.getBoundingClientRect().width);
  }

  ghost.remove();
  return Math.ceil(max);
}

function wait(ms: number, signal: { cancelled: boolean }) {
  return new Promise<void>((resolve) => {
    if (signal.cancelled || ms <= 0) {
      resolve();
      return;
    }
    const id = window.setTimeout(() => resolve(), ms);
    // Store timeout id on the signal so clearCycle can cancel waits.
    (signal as { timeoutId?: number }).timeoutId = id;
  });
}

/**
 * TextChromaReveal
 *
 * Chromatic ribbon sweep for headlines. A single `background-clip: text`
 * element paints a spectrum band across the glyphs as opacity rises —
 * no per-character DOM. Supports rotating phrases with hold/fade cycles,
 * imperative play/replay, and reduced-motion fallbacks.
 */
export function TextChromaReveal({
  text,
  colors,
  textColor = "currentColor",
  direction = "ltr",
  duration = 1.5,
  delay = 0,
  ease = DEFAULT_EASE,
  fadeEase = "easeInOut",
  repeat = false,
  repeatDelay = 0.5,
  holdDuration = 1,
  fadeDuration = 0.6,
  fixedWidth = false,
  startOnView = true,
  once = true,
  inViewMargin = "0px",
  onComplete,
  as: tag = "span",
  className,
  ref: controlRef,
}: TextChromaRevealProps) {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(elementRef, {
    once,
    margin: inViewMargin,
  });
  const prefersReducedMotion = useReducedMotion();
  const canAnimate = !prefersReducedMotion && (!startOnView || isInView);

  const texts = React.useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text],
  );
  const ribbonColors = colors?.length ? colors : DEFAULT_COLORS;
  const isMulti = texts.length > 1;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [lockedWidth, setLockedWidth] = React.useState<number | undefined>();

  const indexRef = React.useRef(0);
  const runIdRef = React.useRef(0);
  const controlsRef = React.useRef<AnimationPlaybackControls[]>([]);
  const signalRef = React.useRef<{ cancelled: boolean; timeoutId?: number }>({
    cancelled: false,
  });
  const configRef = React.useRef<CycleConfig>({
    duration,
    delay,
    ease,
    fadeEase,
    repeat,
    repeatDelay,
    holdDuration,
    fadeDuration,
    phraseCount: texts.length,
    onComplete,
  });

  // sweep: 100 = hidden, 0 = fully revealed. Position and opacity are driven
  // independently so the gradient only ever resets while fully invisible.
  const sweep = useMotionValue(SWEEP_HIDDEN);
  const textOpacity = useMotionValue(0);
  const backgroundPosition = useTransform(sweep, (value) => `${value}% 50%`);
  const angle = direction === "rtl" ? 270 : 90;

  const gradient = React.useMemo(
    () => buildGradient(ribbonColors, textColor, angle),
    [ribbonColors, textColor, angle],
  );
  const resolvedColor = textColor === "currentColor" ? "inherit" : textColor;

  configRef.current = {
    duration,
    delay,
    ease,
    fadeEase,
    repeat,
    repeatDelay,
    holdDuration,
    fadeDuration,
    phraseCount: texts.length,
    onComplete,
  };

  const clearCycle = React.useCallback(() => {
    runIdRef.current += 1;
    signalRef.current.cancelled = true;
    if (signalRef.current.timeoutId != null) {
      window.clearTimeout(signalRef.current.timeoutId);
      signalRef.current.timeoutId = undefined;
    }
    for (const control of controlsRef.current) {
      control.stop();
    }
    controlsRef.current = [];
    signalRef.current = { cancelled: false };
  }, []);

  const playCycle = React.useCallback(async () => {
    clearCycle();
    const runId = runIdRef.current;
    const signal = signalRef.current;
    const cfg = configRef.current;

    sweep.set(SWEEP_HIDDEN);
    textOpacity.set(0);

    try {
      const sweepControl = animate(sweep, SWEEP_REVEALED, {
        duration: cfg.duration,
        delay: cfg.delay,
        ease: cfg.ease,
      });
      const opacityControl = animate(textOpacity, 1, {
        duration: cfg.duration,
        delay: cfg.delay,
        ease: cfg.ease,
      });
      controlsRef.current = [sweepControl, opacityControl];

      await Promise.all([sweepControl, opacityControl]);
      if (signal.cancelled || runId !== runIdRef.current) return;

      cfg.onComplete?.();

      if (!cfg.repeat) return;

      await wait(cfg.holdDuration * 1000, signal);
      if (signal.cancelled || runId !== runIdRef.current) return;

      const fadeControl = animate(textOpacity, 0, {
        duration: cfg.fadeDuration,
        ease: cfg.fadeEase,
      });
      controlsRef.current = [fadeControl];
      await fadeControl;
      if (signal.cancelled || runId !== runIdRef.current) return;

      indexRef.current = (indexRef.current + 1) % Math.max(cfg.phraseCount, 1);
      setActiveIndex(indexRef.current);
      sweep.set(SWEEP_HIDDEN);

      await wait(cfg.repeatDelay * 1000, signal);
      if (signal.cancelled || runId !== runIdRef.current) return;

      void playCycle();
    } catch {
      // Stopped / interrupted animations reject — ignore.
    }
  }, [clearCycle, sweep, textOpacity]);

  const play = React.useCallback(() => {
    if (prefersReducedMotion) return;
    void playCycle();
  }, [playCycle, prefersReducedMotion]);

  const replay = React.useCallback(() => {
    if (prefersReducedMotion) return;
    indexRef.current = 0;
    setActiveIndex(0);
    void playCycle();
  }, [playCycle, prefersReducedMotion]);

  React.useImperativeHandle(controlRef, () => ({ play, replay }), [play, replay]);

  React.useLayoutEffect(() => {
    const element = elementRef.current;
    if (!(element && fixedWidth && isMulti)) {
      setLockedWidth(undefined);
      return;
    }

    let cancelled = false;

    const measure = () => {
      if (cancelled || !elementRef.current) return;
      setLockedWidth(measureMaxWidth(elementRef.current, texts));
    };

    measure();

    if (typeof document !== "undefined" && "fonts" in document) {
      void document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }

    return () => {
      cancelled = true;
    };
  }, [fixedWidth, isMulti, texts]);

  React.useEffect(() => {
    indexRef.current = 0;
    setActiveIndex(0);
    clearCycle();
    sweep.set(SWEEP_HIDDEN);
    textOpacity.set(0);

    if (canAnimate) {
      void playCycle();
    }

    return clearCycle;
  }, [canAnimate, texts, clearCycle, playCycle, sweep, textOpacity]);

  const MotionComponent = motionElements[tag];
  const displayText = prefersReducedMotion ? texts[0] : texts[activeIndex];
  const widthStyle =
    lockedWidth != null
      ? ({ width: lockedWidth, whiteSpace: "nowrap" } as const)
      : undefined;

  const paintStyle = prefersReducedMotion
    ? {
        color: resolvedColor,
        WebkitTextFillColor: "transparent",
        backgroundImage: gradient,
        backgroundSize: BACKGROUND_SIZE,
        backgroundPosition: "0% 50%",
        opacity: 1,
        ...widthStyle,
      }
    : {
        color: resolvedColor,
        WebkitTextFillColor: "transparent",
        backgroundImage: gradient,
        backgroundSize: BACKGROUND_SIZE,
        backgroundPosition,
        opacity: textOpacity,
        ...widthStyle,
      };

  return (
    <MotionComponent
      ref={elementRef as React.Ref<never>}
      className={cn("inline-block bg-clip-text", className)}
      style={paintStyle as HTMLMotionProps<"span">["style"]}
      aria-live={isMulti ? "polite" : undefined}
      aria-atomic={isMulti ? true : undefined}
    >
      {displayText}
    </MotionComponent>
  );
}
