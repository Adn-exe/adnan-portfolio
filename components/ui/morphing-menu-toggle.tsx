"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Timing: Logo holds for ~7.5s, Menu holds for ~13.0s, morph transition takes 1.2s
const LOGO_HOLD_TIME = 7.5;
const MENU_HOLD_TIME = 13.0;
const MORPH_DURATION = 1.2;

interface MorphingMenuToggleProps {
  logoUrl?: string;
  isOpen?: boolean;
  className?: string;
}

// Cubic ease-in-out for cinematic organic dissolve
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const MorphingMenuToggle: React.FC<MorphingMenuToggleProps> = ({
  logoUrl = "/adlogo.svg",
  isOpen = false,
  className,
}) => {
  // 0 = Logo, 1 = MENU
  const currentItemRef = useRef<0 | 1>(0);
  const morphProgressRef = useRef(0);
  const cooldownTimerRef = useRef(LOGO_HOLD_TIME);
  const lastTimeRef = useRef(new Date());

  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);

  const applyLayerContent = useCallback((layer: HTMLDivElement | null, type: "logo" | "menu" | "close") => {
    if (!layer) return;
    const logoEl = layer.querySelector<HTMLElement>(".morph-layer-logo");
    const menuEl = layer.querySelector<HTMLElement>(".morph-layer-menu");
    const closeEl = layer.querySelector<HTMLElement>(".morph-layer-close");

    if (logoEl) logoEl.style.display = type === "logo" ? "flex" : "none";
    if (menuEl) menuEl.style.display = type === "menu" ? "flex" : "none";
    if (closeEl) closeEl.style.display = type === "close" ? "flex" : "none";
  }, []);

  const setInterpolatedStyles = useCallback(
    (linearFraction: number) => {
      const current1 = layer1Ref.current;
      const current2 = layer2Ref.current;
      if (!current1 || !current2) return;

      const eased = easeInOutCubic(Math.min(Math.max(linearFraction, 0), 1));
      const invertedEased = 1 - eased;

      // Clean, gentle micro-blur during transition (never distorts or blobs the text)
      const maxBlur = 3.5;
      const blur1 = eased * maxBlur;
      const blur2 = invertedEased * maxBlur;

      const opacity1 = invertedEased;
      const opacity2 = eased;

      // Elegant cinematic scale & slight vertical settle
      const scale1 = 1 - eased * 0.1;
      const scale2 = 0.9 + eased * 0.1;

      const translateY1 = -eased * 3;
      const translateY2 = (1 - eased) * 3;

      current1.style.filter = blur1 > 0.05 ? `blur(${blur1.toFixed(2)}px)` : "none";
      current1.style.opacity = `${(opacity1 * 100).toFixed(1)}%`;
      current1.style.transform = `translate3d(0, ${translateY1.toFixed(1)}px, 0) scale(${scale1.toFixed(3)})`;

      current2.style.filter = blur2 > 0.05 ? `blur(${blur2.toFixed(2)}px)` : "none";
      current2.style.opacity = `${(opacity2 * 100).toFixed(1)}%`;
      current2.style.transform = `translate3d(0, ${translateY2.toFixed(1)}px, 0) scale(${scale2.toFixed(3)})`;

      const item1 = currentItemRef.current === 0 ? "logo" : "menu";
      const item2 = currentItemRef.current === 0 ? "menu" : "logo";

      applyLayerContent(current1, item1);
      applyLayerContent(current2, item2);
    },
    [applyLayerContent]
  );

  const resetToCooldown = useCallback(() => {
    morphProgressRef.current = 0;
    const current1 = layer1Ref.current;
    const current2 = layer2Ref.current;
    if (current1 && current2) {
      current1.style.filter = "none";
      current1.style.opacity = "100%";
      current1.style.transform = "none";

      current2.style.filter = "none";
      current2.style.opacity = "0%";
      current2.style.transform = "none";

      const item1 = currentItemRef.current === 0 ? "logo" : "menu";
      applyLayerContent(current1, item1);
    }
  }, [applyLayerContent]);

  useEffect(() => {
    if (isOpen) {
      const current1 = layer1Ref.current;
      const current2 = layer2Ref.current;
      if (current1 && current2) {
        current1.style.filter = "none";
        current1.style.opacity = "100%";
        current1.style.transform = "none";

        current2.style.filter = "none";
        current2.style.opacity = "0%";
        current2.style.transform = "none";

        applyLayerContent(current1, "close");
      }
      return;
    }

    let animationFrameId: number;

    resetToCooldown();
    lastTimeRef.current = new Date();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      const now = new Date();
      const dt = (now.getTime() - lastTimeRef.current.getTime()) / 1000;
      lastTimeRef.current = now;

      // 1. Hold phase
      if (cooldownTimerRef.current > 0) {
        cooldownTimerRef.current -= dt;
        resetToCooldown();
        return;
      }

      // 2. Morph transition phase
      morphProgressRef.current += dt;
      const fraction = morphProgressRef.current / MORPH_DURATION;

      if (fraction >= 1) {
        setInterpolatedStyles(1);
        currentItemRef.current = currentItemRef.current === 0 ? 1 : 0;
        morphProgressRef.current = 0;
        cooldownTimerRef.current = currentItemRef.current === 1 ? MENU_HOLD_TIME : LOGO_HOLD_TIME;
        resetToCooldown();
      } else {
        setInterpolatedStyles(fraction);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, resetToCooldown, setInterpolatedStyles, applyLayerContent]);

  return (
    <div
      className={cn(
        "relative w-12 h-12 flex items-center justify-center select-none overflow-visible",
        className
      )}
    >
      {/* Clean layer container without any destructive threshold filter */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ willChange: "opacity, transform" }}
      >
        {/* Layer 1 */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 flex items-center justify-center text-center font-display"
          style={{ willChange: "filter, opacity, transform" }}
        >
          {/* Logo item */}
          <div className="morph-layer-logo w-full h-full flex items-center justify-center">
            <img
              src={logoUrl}
              alt="Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain filter drop-shadow-[0_0_12px_rgba(0,209,255,0.45)] [.light_&]:drop-shadow-[0_0_12px_rgba(217,119,6,0.45)] [.light_&]:brightness-0 [.light_&]:invert-0 select-none pointer-events-none"
            />
          </div>

          {/* MENU Text item */}
          <div className="morph-layer-menu w-full h-full items-center justify-center hidden">
            <span className="font-display font-black text-[13px] sm:text-[14px] tracking-[0.22em] uppercase text-white [.light_&]:text-[#1F1A14] drop-shadow-[0_0_12px_rgba(0,209,255,0.55)] [.light_&]:drop-shadow-[0_0_12px_rgba(217,119,6,0.35)] select-none">
              MENU
            </span>
          </div>

          {/* CLOSE Text item */}
          <div className="morph-layer-close w-full h-full items-center justify-center hidden">
            <span className="font-display font-black text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-accent [.light_&]:text-amber-600 drop-shadow-[0_0_12px_rgba(0,209,255,0.6)] [.light_&]:drop-shadow-[0_0_12px_rgba(217,119,6,0.4)] select-none">
              CLOSE
            </span>
          </div>
        </div>

        {/* Layer 2 */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 flex items-center justify-center text-center font-display"
          style={{ opacity: 0, willChange: "filter, opacity, transform" }}
        >
          {/* Logo item */}
          <div className="morph-layer-logo w-full h-full items-center justify-center hidden">
            <img
              src={logoUrl}
              alt="Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain filter drop-shadow-[0_0_12px_rgba(0,209,255,0.45)] [.light_&]:drop-shadow-[0_0_12px_rgba(217,119,6,0.45)] [.light_&]:brightness-0 [.light_&]:invert-0 select-none pointer-events-none"
            />
          </div>

          {/* MENU Text item */}
          <div className="morph-layer-menu w-full h-full flex items-center justify-center">
            <span className="font-display font-black text-[13px] sm:text-[14px] tracking-[0.22em] uppercase text-white [.light_&]:text-[#1F1A14] drop-shadow-[0_0_12px_rgba(0,209,255,0.55)] [.light_&]:drop-shadow-[0_0_12px_rgba(217,119,6,0.35)] select-none">
              MENU
            </span>
          </div>

          {/* CLOSE Text item */}
          <div className="morph-layer-close w-full h-full items-center justify-center hidden">
            <span className="font-display font-black text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-accent [.light_&]:text-amber-600 drop-shadow-[0_0_12px_rgba(0,209,255,0.6)] [.light_&]:drop-shadow-[0_0_12px_rgba(217,119,6,0.4)] select-none">
              CLOSE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorphingMenuToggle;
