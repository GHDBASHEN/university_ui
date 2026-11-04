"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id?: string;
  name: string;
  country: string;
  university: string;
  program: string;
  year: string | number;
  quote: string;
  avatar: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + testimonials.length) % testimonials.length;
        return [next, dir];
      });
    },
    [testimonials.length]
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm p-8 sm:p-10 min-h-[340px] flex items-center">
        {/* Quote watermark */}
        <Quote
          size={120}
          className="absolute top-4 right-4 text-white/[0.03] rotate-180"
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < t.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-slate-600"
                  }
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg sm:text-xl text-slate-200 italic leading-relaxed mb-8 font-heading">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/30">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-sm font-heading font-semibold text-slate-100">
                  {t.name}
                </p>
                <p className="text-xs text-slate-400">{t.country}</p>
              </div>
              <div className="ml-auto flex flex-wrap gap-2 justify-end">
                <span className="px-2.5 py-1 text-[10px] font-mono-tech rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400 tracking-wider uppercase">
                  {t.university}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-mono-tech rounded-md bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 tracking-wider uppercase">
                  {t.program} • {t.year}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => paginate(-1)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/20 transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-amber-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/20 transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
