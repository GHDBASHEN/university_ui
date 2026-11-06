"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface MotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  setReducedMotion: (value: boolean) => void;
}

const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
  toggleReducedMotion: () => {},
  setReducedMotion: () => {},
});

const STORAGE_KEY = "aura-reduced-motion";

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotionState] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check local storage preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setReducedMotionState(stored === "true");
      return;
    }

    // 2. Fall back to OS preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionState(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY) === null) {
        setReducedMotionState(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reducedMotion]);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotionState((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const setReducedMotion = useCallback((value: boolean) => {
    setReducedMotionState(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  return (
    <MotionContext.Provider value={{ reducedMotion, toggleReducedMotion, setReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useReducedMotionPreference = () => useContext(MotionContext);
