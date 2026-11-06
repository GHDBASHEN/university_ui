"use client";

import React from "react";
import { useReducedMotionPreference } from "@/context/MotionContext";
import { Sparkles, ZapOff } from "lucide-react";

interface ReduceMotionToggleProps {
  className?: string;
  variant?: "badge" | "compact" | "button";
}

export const ReduceMotionToggle: React.FC<ReduceMotionToggleProps> = ({
  className = "",
  variant = "badge",
}) => {
  const { reducedMotion, toggleReducedMotion } = useReducedMotionPreference();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleReducedMotion}
        aria-pressed={reducedMotion}
        aria-label={reducedMotion ? "Enable animations" : "Reduce animations"}
        title={reducedMotion ? "Enable animations" : "Reduce animations"}
        className={`p-2 rounded-lg border text-xs font-mono-tech transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090E] ${
          reducedMotion
            ? "bg-amber-400/20 border-amber-400/50 text-amber-300"
            : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
        } ${className}`}
      >
        {reducedMotion ? <ZapOff size={15} /> : <Sparkles size={15} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleReducedMotion}
      aria-pressed={reducedMotion}
      aria-label={reducedMotion ? "Enable animations" : "Reduce animations"}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090E] ${
        reducedMotion
          ? "bg-amber-400/15 border-amber-400/50 text-amber-300"
          : "bg-white/5 border-white/15 text-slate-300 hover:text-white hover:border-white/30"
      } ${className}`}
    >
      {reducedMotion ? (
        <>
          <ZapOff size={13} className="text-amber-400" />
          <span>Motion: Off</span>
        </>
      ) : (
        <>
          <Sparkles size={13} className="text-amber-400" />
          <span>Motion: On</span>
        </>
      )}
    </button>
  );
};

export default ReduceMotionToggle;
