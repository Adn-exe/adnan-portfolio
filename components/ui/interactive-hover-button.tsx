import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  hoverText?: string;
  loading?: boolean;
  success?: boolean;
  successText?: string;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(
  (
    {
      children,
      text,
      hoverText,
      loading = false,
      success = false,
      successText = "Message Sent",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const beforeText = text || children;
    const afterText = hoverText || beforeText;

    if (loading) {
      return (
        <button
          ref={ref}
          disabled
          className={cn(
            "relative w-auto cursor-wait overflow-hidden rounded-full border border-accent/40 bg-accent/10 px-6 py-3 font-semibold text-accent flex items-center justify-center gap-2",
            className
          )}
          {...props}
        >
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span>Sending...</span>
        </button>
      );
    }

    if (success) {
      return (
        <button
          ref={ref}
          disabled
          className={cn(
            "relative w-auto overflow-hidden rounded-full border border-emerald-500/40 bg-emerald-500/20 px-6 py-3 font-semibold text-emerald-400 flex items-center justify-center gap-2",
            className
          )}
          {...props}
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successText}</span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "group/btn relative w-auto cursor-pointer overflow-hidden rounded-full border border-accent/30 bg-surface/80 [.light_&]:bg-[#FAF8F2]/90 backdrop-blur-md px-6 py-3 text-center font-semibold text-theme-text transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(0,209,255,0.25)] [.light_&]:hover:shadow-[0_0_20px_rgba(217,119,6,0.25)] select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent transition-all duration-500 ease-out group-hover/btn:scale-[100.8]" />
          <span className="inline-block transition-all duration-300 group-hover/btn:translate-x-12 group-hover/btn:opacity-0">
            {beforeText}
          </span>
        </div>
        <div className="absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-black dark:text-black font-bold opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100">
          <span>{afterText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";
export default InteractiveHoverButton;
