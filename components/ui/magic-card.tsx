"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface MagicCardBaseProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
  backGlow?: boolean;
  backGlowOpacity?: number;
}

interface MagicCardGradientProps extends MagicCardBaseProps {
  mode?: "gradient";

  gradientColor?: string;
  gradientOpacity?: number;

  glowFrom?: never;
  glowTo?: never;
  glowAngle?: never;
  glowSize?: never;
  glowBlur?: never;
  glowOpacity?: never;
}

interface MagicCardOrbProps extends MagicCardBaseProps {
  mode: "orb";

  glowFrom?: string;
  glowTo?: string;
  glowAngle?: number;
  glowSize?: number;
  glowBlur?: number;
  glowOpacity?: number;

  gradientColor?: never;
  gradientOpacity?: never;
}

export type MagicCardProps = MagicCardGradientProps | MagicCardOrbProps;
type ResetReason = "enter" | "leave" | "global" | "init";

function isOrbMode(props: MagicCardProps): props is MagicCardOrbProps {
  return props.mode === "orb";
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("light") ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return { theme, systemTheme: theme };
}

export function MagicCard(props: MagicCardProps) {
  const {
    children,
    className,
    gradientSize = 240,
    gradientColor = "rgba(0, 209, 255, 0.05)",
    gradientOpacity = 0.35,
    gradientFrom = "rgba(0, 209, 255, 0.75)",
    gradientTo = "rgba(29, 78, 216, 0.35)",
    backGlow = true,
    backGlowOpacity = 0.3,
    mode = "gradient",
  } = props;

  const glowFrom = isOrbMode(props) ? (props.glowFrom ?? "#00D1FF") : "#00D1FF";
  const glowTo = isOrbMode(props) ? (props.glowTo ?? "#1D4ED8") : "#1D4ED8";
  const glowAngle = isOrbMode(props) ? (props.glowAngle ?? 90) : 90;
  const glowSize = isOrbMode(props) ? (props.glowSize ?? 360) : 360;
  const glowBlur = isOrbMode(props) ? (props.glowBlur ?? 60) : 60;
  const glowOpacity = isOrbMode(props) ? (props.glowOpacity ?? 0.6) : 0.6;
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDarkTheme = useMemo(() => {
    if (!mounted) return true;
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark";
  }, [theme, systemTheme, mounted]);

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });

  const modeRef = useRef(mode);
  const glowOpacityRef = useRef(glowOpacity);
  const gradientSizeRef = useRef(gradientSize);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    glowOpacityRef.current = glowOpacity;
  }, [glowOpacity]);

  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(
    (reason: ResetReason = "leave") => {
      const currentMode = modeRef.current;

      if (currentMode === "orb") {
        if (reason === "enter") orbVisible.set(glowOpacityRef.current);
        else orbVisible.set(0);
        return;
      }

      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY, orbVisible]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset("init");
  }, [reset]);

  useEffect(() => {
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset("global");
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global");
    };

    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);

  return (
    <div
      className="group/card relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      onPointerEnter={() => reset("enter")}
    >
      {/* Ambient backlight radiating from behind the box */}
      {backGlow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(${gradientSize * 1.15}px circle at ${mouseX}px ${mouseY}px,
                ${gradientFrom},
                ${gradientTo},
                transparent 70%
              )
            `,
            opacity: useMotionTemplate`calc(${backGlowOpacity})`,
          }}
        />
      )}

      {/* Main card box with clean border highlight */}
      <motion.div
        className={cn(
          "relative isolate overflow-hidden rounded-3xl border border-transparent transition-all duration-300",
          className
        )}
        style={{
          background: useMotionTemplate`
            linear-gradient(var(--color-background, var(--bg-surface, #121212)) 0 0) padding-box,
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientFrom},
              ${gradientTo},
              var(--color-border, var(--border-color, rgba(255, 255, 255, 0.05))) 100%
            ) border-box
          `,
        }}
      >
        {/* Solid base surface */}
        <div
          className="bg-background bg-surface absolute inset-px z-10 rounded-[inherit]"
          style={{ borderRadius: "inherit" }}
        />

        {/* Soft, clean inner depth light in the back of the box */}
        {mode === "gradient" && (
          <motion.div
            suppressHydrationWarning
            className="pointer-events-none absolute inset-px z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            style={{
              borderRadius: "inherit",
              background: useMotionTemplate`
                radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                  ${gradientColor},
                  transparent 100%
                )
              `,
              opacity: gradientOpacity,
            }}
          />
        )}

        {mode === "orb" && (
          <motion.div
            suppressHydrationWarning
            aria-hidden="true"
            className="pointer-events-none absolute z-20"
            style={{
              width: glowSize,
              height: glowSize,
              x: orbX,
              y: orbY,
              translateX: "-50%",
              translateY: "-50%",
              borderRadius: 9999,
              filter: `blur(${glowBlur}px)`,
              opacity: orbVisible,
              background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
              mixBlendMode: isDarkTheme ? "screen" : "multiply",
              willChange: "transform, opacity",
            }}
          />
        )}

        {/* Content sits crisp and clean on top */}
        <div className="relative z-30">{children}</div>
      </motion.div>
    </div>
  );
}

export default MagicCard;
