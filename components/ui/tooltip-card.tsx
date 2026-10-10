"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
  tooltipClassName?: string;
  contentClassName?: string;
  as?: "div" | "span";
  key?: React.Key;
  align?: "left" | "center";
  side?: "mouse" | "top";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  containerClassName,
  tooltipClassName,
  contentClassName,
  as: Component = "div",
  align = "left",
  side = "mouse",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

  const calculatePosition = (mouseX: number, mouseY: number) => {
    if (!contentRef.current || !containerRef.current)
      return { x: mouseX + 12, y: mouseY + 12 };

    const tooltip = contentRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get tooltip dimensions
    const tooltipWidth = tooltip.offsetWidth || 180;
    const tooltipHeight = tooltip.offsetHeight || tooltip.scrollHeight || 36;

    if (side === "top") {
      let finalX = containerRect.width / 2 - tooltipWidth / 2;
      let finalY = -tooltipHeight - 10;

      // Keep within viewport horizontally
      const absoluteX = containerRect.left + finalX;
      if (absoluteX + tooltipWidth > viewportWidth - 16) {
        finalX = viewportWidth - 16 - containerRect.left - tooltipWidth;
      }
      if (containerRect.left + finalX < 16) {
        finalX = -containerRect.left + 16;
      }

      return { x: finalX, y: finalY };
    }

    // Calculate absolute position relative to viewport
    const absoluteX = containerRect.left + mouseX;
    const absoluteY = containerRect.top + mouseY;

    let finalX = mouseX + 14;
    let finalY = mouseY + 14;

    // Check if tooltip goes beyond right edge
    if (absoluteX + 14 + tooltipWidth > viewportWidth - 12) {
      finalX = mouseX - tooltipWidth - 14;
    }

    // Check if tooltip goes beyond left edge
    if (containerRect.left + finalX < 12) {
      finalX = -containerRect.left + 12;
    }

    // Check if tooltip goes beyond bottom edge
    if (absoluteY + 14 + tooltipHeight > viewportHeight - 12) {
      finalY = mouseY - tooltipHeight - 14;
    }

    // Check if tooltip goes beyond top edge
    if (containerRect.top + finalY < 12) {
      finalY = -containerRect.top + 12;
    }

    return { x: finalX, y: finalY };
  };

  const updateMousePosition = (mouseX: number, mouseY: number) => {
    setMouse({ x: mouseX, y: mouseY });
    const newPosition = calculatePosition(mouseX, mouseY);
    setPosition(newPosition);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsVisible(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
      setMouse({ x: 0, y: 0 });
      setPosition({ x: 0, y: 0 });
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
        setMouse({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        updateMousePosition(mouseX, mouseY);
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    if (isVisible && contentRef.current) {
      const newPosition = calculatePosition(mouse.x, mouse.y);
      setPosition(newPosition);
    }
  }, [isVisible, height, mouse.x, mouse.y, content]);

  return (
    <Component
      ref={containerRef as any}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={String(isVisible)}
            initial={{ opacity: 0, scale: 0.95, y: side === "top" ? 6 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: side === "top" ? 6 : 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
            }}
            className={cn(
              "pointer-events-none absolute z-50 max-w-[28rem] sm:max-w-[34rem] overflow-hidden rounded-xl border border-white/20 bg-[#0a0d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-neutral-200 [.light_&]:bg-[#FAF8F5] [.light_&]:border-stone-300 [.light_&]:text-neutral-900 [.light_&]:shadow-[0_16px_36px_rgba(0,0,0,0.18)]",
              align === "center" ? "flex items-center justify-center text-center" : "text-left",
              tooltipClassName
            )}
            style={{
              top: position.y,
              left: position.x,
            }}
          >
            <div
              ref={contentRef}
              className={cn(
                "font-montserrat text-[13px] tracking-normal text-neutral-200 [.light_&]:text-neutral-800 w-full",
                align === "center"
                  ? "px-3.5 py-2 flex items-center justify-center text-center font-medium leading-normal"
                  : "px-4 py-3 text-left font-normal leading-relaxed",
                contentClassName
              )}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Component>
  );
};
