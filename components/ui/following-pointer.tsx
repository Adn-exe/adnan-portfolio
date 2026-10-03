import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  style,
  title,
  showCursor = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string | React.ReactNode;
  showCursor?: boolean;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
    setIsInside(true);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      ref={ref}
      style={style}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} showCursor={showCursor} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
  showCursor = false,
}: {
  x: any;
  y: any;
  title?: string | React.ReactNode;
  showCursor?: boolean;
}) => {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        top: y,
        left: x,
      }}
      initial={{
        scale: 0.7,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0.7,
        opacity: 0,
      }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
    >
      {showCursor && (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
      )}
      <div className={cn(
        "pointer-events-none",
        showCursor ? "translate-x-3 translate-y-1" : "translate-x-4 translate-y-3"
      )}>
        {typeof title === "string" ? (
          <div className="min-w-max rounded-full bg-zinc-900 border border-neutral-700 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-xl [.light_&]:bg-white [.light_&]:border-neutral-300 [.light_&]:text-neutral-900">
            {title}
          </div>
        ) : (
          title
        )}
      </div>
    </motion.div>
  );
};

export const GenreFollowerBadge = ({ genre }: { genre: string }) => {
  const g = (genre || "").toLowerCase();

  let badgeStyle = "border-sky-500/60 text-sky-300 shadow-[0_0_18px_rgba(14,165,233,0.35)] [.light_&]:border-sky-600 [.light_&]:text-sky-800";
  let dotColor = "bg-sky-400 [.light_&]:bg-sky-600";

  if (g.includes("story")) {
    badgeStyle = "border-purple-500/60 text-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.35)] [.light_&]:border-purple-600 [.light_&]:text-purple-800";
    dotColor = "bg-purple-400 [.light_&]:bg-purple-600";
  } else if (g.includes("essay")) {
    badgeStyle = "border-amber-500/60 text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.35)] [.light_&]:border-amber-600 [.light_&]:text-amber-800";
    dotColor = "bg-amber-400 [.light_&]:bg-amber-600";
  } else if (g.includes("blog")) {
    badgeStyle = "border-cyan-500/60 text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.35)] [.light_&]:border-cyan-600 [.light_&]:text-cyan-800";
    dotColor = "bg-cyan-400 [.light_&]:bg-cyan-600";
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a] [.light_&]:bg-white border text-xs font-mono font-bold tracking-widest uppercase select-none pointer-events-none shadow-2xl backdrop-blur-none",
        badgeStyle
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColor)} />
      <span className="text-[11px] font-bold">{genre}</span>
    </div>
  );
};
