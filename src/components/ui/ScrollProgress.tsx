"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotionPreference } from "@/context/MotionContext";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { reducedMotion } = useReducedMotionPreference();

  // Smooth out progress updates with spring physics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] pointer-events-none bg-white/[0.04]"
    >
      <motion.div
        style={{ scaleX }}
        className="w-full h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 origin-left shadow-[0_0_12px_rgba(251,191,36,0.7)]"
      />
    </div>
  );
};

export default ScrollProgress;
