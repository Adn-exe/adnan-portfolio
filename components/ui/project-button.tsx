"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TechIcon } from "../Icons";

interface ViewProjectButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  accentStroke: string;
  accentGlow: string;
  isLight?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ViewProjectButton: React.FC<ViewProjectButtonProps> = ({
  href,
  accentStroke,
  accentGlow,
  isLight = false,
  className,
  onClick,
  ...props
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-wide overflow-hidden select-none cursor-pointer",
        "transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        // Dark Mode Styling
        "bg-[#0E0E14]/90 text-white border border-white/15",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.5)]",
        "hover:border-white/30",
        // Light Mode Styling
        "[.light_&]:bg-[#FAF8F2]/95 [.light_&]:text-[#1F1A14] [.light_&]:border-amber-900/20",
        "[.light_&]:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(180,130,20,0.12)]",
        "[.light_&]:hover:border-amber-600/50",
        className
      )}
      style={{
        // Dynamic hover ambient halo
        boxShadow: undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isLight
          ? `inset 0 1px 0 rgba(255,255,255,0.9), 0 0 30px ${accentGlow}`
          : `inset 0 1px 0 rgba(255,255,255,0.3), 0 0 35px ${accentGlow}`;
        e.currentTarget.style.borderColor = accentStroke;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
      {...props}
    >
      {/* 45° Shimmer reflection sweep on hover - subtle sheen */}
      <div className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.09] to-transparent [.light_&]:via-amber-500/[0.08]" />

      {/* Live status pulse beacon */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: accentStroke }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: accentStroke }}
        />
      </span>

      {/* Label */}
      <span className="relative z-10 font-bold tracking-tight">View Project</span>

      {/* Kinetic diagonal arrow */}
      <svg
        className="relative z-10 w-4 h-4 opacity-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </a>
  );
};

interface SourceCodeButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  accentStroke?: string;
  isLight?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SourceCodeButton: React.FC<SourceCodeButtonProps> = ({
  href,
  accentStroke = "#00D1FF",
  isLight = false,
  className,
  onClick,
  ...props
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 px-5 sm:px-6 py-3.5 rounded-xl font-display font-medium text-xs sm:text-sm tracking-wide overflow-hidden select-none cursor-pointer",
        "transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        // Dark Mode Styling
        "bg-surface/85 backdrop-blur-md text-theme-text border border-theme-border",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.4)]",
        "hover:border-neutral-500/40 hover:bg-surface",
        // Light Mode Styling
        "[.light_&]:bg-[#FAF8F2]/80 [.light_&]:text-[#1F1A14] [.light_&]:border-amber-900/15",
        "[.light_&]:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_4px_12px_rgba(180,130,20,0.08)]",
        "[.light_&]:hover:border-amber-600/40 [.light_&]:hover:bg-white",
        className
      )}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentStroke;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
      }}
      {...props}
    >
      {/* Subtle shimmer sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent [.light_&]:via-amber-500/[0.05]" />

      {/* GitHub Icon with subtle kinetic rotate on hover */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-theme-secondary group-hover:text-theme-text">
        <TechIcon name="github" className="w-4 h-4" />
      </div>

      {/* Label */}
      <span className="relative z-10 font-semibold tracking-tight text-theme-text">Source Code</span>
    </a>
  );
};
