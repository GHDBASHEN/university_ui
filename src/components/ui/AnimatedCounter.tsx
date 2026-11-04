"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

export default function AnimatedCounter({ value, suffix = "", label, icon }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(step);
  }, [value]);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      animate();
    }
  }, [isInView, animate]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-amber-400/20 hover:bg-white/[0.06] transition-all duration-500 group hover:shadow-lg hover:shadow-amber-400/5"
    >
      {/* Icon */}
      <div className="absolute top-5 left-5 text-amber-400/70 group-hover:text-amber-400 transition-colors duration-300">
        {icon}
      </div>

      {/* Counter */}
      <div className="text-center pt-6">
        <div className="text-4xl sm:text-5xl font-display font-bold text-slate-100 tracking-tight">
          {count.toLocaleString()}
          {suffix && (
            <span className="text-amber-400 ml-0.5">{suffix}</span>
          )}
        </div>
        <p className="mt-2 text-sm text-slate-400 font-heading tracking-wide">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
