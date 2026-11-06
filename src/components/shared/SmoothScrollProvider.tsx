"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { useAnimationFrame } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotionPreference } from "@/context/MotionContext";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: { immediate?: boolean; offset?: number }) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const { reducedMotion } = useReducedMotionPreference();

  useEffect(() => {
    // If reduced motion is requested, do not run Lenis inertial smoothing
    if (reducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      autoRaf: false, // Critical: driven by Framer Motion's master RAF loop below
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Unified single-RAF execution driven by Framer Motion's animation frame engine
  useAnimationFrame((time) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
    }
  });

  // Smooth scroll reset on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const scrollTo = (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; offset?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: options?.immediate ? "auto" : "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" });
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};
