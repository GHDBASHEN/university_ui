"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { EXPEDITION_DESTINATIONS, ExpeditionDestination } from "@/data/expeditions";
import { soundEngine } from "@/components/shared/SoundEngine";
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Eye,
  Activity,
  Layers,
  Radio,
  Mountain,
  Gauge,
  Thermometer,
  Shield,
  Maximize2,
} from "lucide-react";

// ============================================================================
// INDIVIDUAL EXPEDITION CARD
// Moves from right to left as user scrolls, disappearing into the left corner
// ============================================================================
interface ExpeditionCardProps {
  dest: ExpeditionDestination;
  index: number;
  smoothProgress: MotionValue<number>;
  isActive: boolean;
  onCardClick: (dest: ExpeditionDestination, index: number) => void;
}

const ExpeditionCard: React.FC<ExpeditionCardProps> = ({
  dest,
  index,
  smoothProgress,
  isActive,
  onCardClick,
}) => {
  // Horizontal motion:
  // Before index: queued on right (+360px per step)
  // At index: centered (0px)
  // Past index: slides far left into the corner (-780px) and disappears
  const x = useTransform(smoothProgress, (p) => {
    const diff = p - index;
    if (diff > 0) {
      // Past center: glides rapidly towards the left corner
      const leftProgress = Math.min(1.2, diff);
      return -leftProgress * 780; // 0px -> -780px off to left corner
    } else {
      // Before center: queued on right
      const rightDiff = -diff;
      return rightDiff * 360; // 0px, +360px, +720px...
    }
  });

  // Vertical drift into the corner
  const y = useTransform(smoothProgress, (p) => {
    const diff = p - index;
    if (diff > 0) {
      const leftProgress = Math.min(1, diff);
      return -leftProgress * 45; // slight upward drift into the corner
    }
    return 0;
  });

  // Opacity: full at center -> fades out to 0 as it disappears in the left corner
  const opacity = useTransform(smoothProgress, (p) => {
    const diff = p - index;
    if (diff > 0) {
      // Disappears completely in the left corner
      const leftProgress = Math.min(1, diff);
      return Math.max(0, 1 - leftProgress * 1.4);
    } else {
      // Incoming from right: soft visible queue
      const rightDiff = -diff;
      return Math.max(0.2, 1 - rightDiff * 0.3);
    }
  });

  // Scale: enlarges at center -> shrinks as it disappears into the corner
  const scale = useTransform(smoothProgress, (p) => {
    const diff = p - index;
    if (diff > 0) {
      const leftProgress = Math.min(1, diff);
      return 1.15 - leftProgress * 0.42; // 1.15 down to 0.73
    } else {
      const rightDiff = Math.min(2, -diff);
      return 1.15 - rightDiff * 0.25; // 0.90 up to 1.15
    }
  });

  // 3D rotation: tilts in amphitheater view, turns outward into the corner
  const rotateY = useTransform(smoothProgress, (p) => {
    const diff = p - index;
    if (diff > 0) {
      const leftProgress = Math.min(1, diff);
      return leftProgress * 26; // tilts outward into left corner
    } else {
      const rightDiff = Math.min(1, -diff);
      return -rightDiff * 18; // incoming amphitheater tilt
    }
  });

  // Z-Index: active card remains on top
  const zIndex = isActive ? 30 : 15 - Math.abs(index);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        rotateY,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      onClick={() => onCardClick(dest, index)}
      className={`absolute w-[240px] sm:w-[300px] md:w-[330px] h-[310px] sm:h-[380px] md:h-[420px] rounded-3xl overflow-hidden cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.85)] border transition-all duration-300 will-change-transform ${
        isActive
          ? "border-amber-400/80 ring-2 ring-amber-400/40 shadow-[0_0_35px_rgba(251,191,36,0.35)]"
          : "border-white/15 hover:border-white/40 hover:opacity-90"
      }`}
    >
      {/* Card Background Artwork */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
        style={{ backgroundImage: `url(${dest.image})` }}
      />

      {/* Card Gradient Dark Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Card Top Orb & Code Badge */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Glowing Planet Orb matching frame 1 */}
          <div
            className="w-4 h-4 rounded-full shadow-[0_0_10px_currentColor] border border-white/50"
            style={{
              backgroundColor: dest.orbColor,
              color: dest.orbColor,
            }}
          />
          <span className="font-mono-tech text-[10px] uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
            {dest.code}
          </span>
        </div>

        <span className="text-[9px] font-mono-tech uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
          {dest.difficulty}
        </span>
      </div>

      {/* Card Bottom Typography */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-10">
        <h3 className="condensed-title text-2xl sm:text-3xl text-white tracking-wider drop-shadow group-hover:text-amber-300 transition-colors">
          {dest.name}
        </h3>
        <p className="text-[11px] font-mono-tech text-slate-300 mt-1 uppercase tracking-widest flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span className="truncate">{dest.location}</span>
        </p>

        {/* Interactive Click Indicator */}
        <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-mono-tech text-amber-400">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>CLICK TO OPEN CONTENT</span>
          </span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN HERO SECTION: SCROLL DRIVES SLIDES RIGHT-TO-LEFT, CLICK NAVIGATES TO CONTENT
// ============================================================================
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  const prevSlideRef = useRef<number>(0);

  // Virtual scroll accumulator: 0 to (EXPEDITIONS.length - 1)
  const targetProgress = useRef<number>(0);
  const progressMotion = useMotionValue(0);

  // Smooth momentum spring physics for the virtual scroll
  const smoothProgress = useSpring(progressMotion, {
    stiffness: 110,
    damping: 24,
    mass: 0.6,
  });

  // Track the continuous active slide index based on progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const roundedIdx = Math.min(
      EXPEDITION_DESTINATIONS.length - 1,
      Math.max(0, Math.round(latest))
    );

    if (roundedIdx !== prevSlideRef.current) {
      soundEngine.playCardSwoosh();
      prevSlideRef.current = roundedIdx;
      setActiveIdx(roundedIdx);
    }
  });

  const currentDest = EXPEDITION_DESTINATIONS[activeIdx] || EXPEDITION_DESTINATIONS[0];

  // Parallax background scale on scroll
  const bgScale = useTransform(smoothProgress, [0, EXPEDITION_DESTINATIONS.length - 1], [1.02, 1.15]);

  // Smooth slide jump
  const goToSlide = useCallback(
    (index: number) => {
      soundEngine.playCardSwoosh();
      const clamped = Math.max(0, Math.min(EXPEDITION_DESTINATIONS.length - 1, index));
      targetProgress.current = clamped;
      progressMotion.set(clamped);
      setActiveIdx(clamped);
    },
    [progressMotion]
  );

  const handlePrev = useCallback(() => {
    goToSlide(activeIdx - 1);
  }, [activeIdx, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(activeIdx + 1);
  }, [activeIdx, goToSlide]);

  // WHEEL SCROLL EVENT HANDLER:
  // Intercepts wheel scroll to drive slides horizontally right-to-left
  // instead of scrolling the page down!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If user is inside the expanded content view, allow them to scroll through content
      if (isContentExpanded) return;

      // Prevent the page from scrolling down!
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      const sensitivity = 0.0022; // smooth pacing
      const newTarget = Math.max(
        0,
        Math.min(EXPEDITION_DESTINATIONS.length - 1, targetProgress.current + delta * sensitivity)
      );

      targetProgress.current = newTarget;
      progressMotion.set(newTarget);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isContentExpanded, progressMotion]);

  // TOUCH SWIPE HANDLER FOR MOBILE:
  // Drives slides smoothly on touch gestures without scrolling page away
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (isContentExpanded) return;
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isContentExpanded) return;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = startY - currentY;
      const deltaX = startX - currentX;

      if (Math.abs(deltaY) > 8 || Math.abs(deltaX) > 8) {
        e.preventDefault();
        const dominantDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        const newTarget = Math.max(
          0,
          Math.min(EXPEDITION_DESTINATIONS.length - 1, targetProgress.current + dominantDelta * 0.004)
        );
        targetProgress.current = newTarget;
        progressMotion.set(newTarget);
        startY = currentY;
        startX = currentX;
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [isContentExpanded, progressMotion]);

  // Click card: navigates to full content with smooth in-place transition
  const handleCardClick = (dest: ExpeditionDestination, index: number) => {
    soundEngine.playZoomChime();
    if (index !== activeIdx) {
      goToSlide(index);
    }
    // Open in-place content view (NOT a popup window)
    setIsContentExpanded(true);
  };

  // Keyboard navigation (Arrow keys + Escape to return to slides)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isContentExpanded) {
          soundEngine.playCardSwoosh();
          setIsContentExpanded(false);
        }
      } else if (!isContentExpanded) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isContentExpanded, handleNext, handlePrev]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#05070c] select-none flex flex-col justify-between"
    >
      {/* 1. CINEMATIC FULL-SCREEN BACKGROUND & HORIZON ROAD */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {/* Cross-fading background landscapes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDest.id}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: isContentExpanded ? 1.08 : 1.02 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-[0.52] contrast-125 saturate-110"
            style={{ backgroundImage: `url(${currentDest.image})` }}
          />
        </AnimatePresence>

        {/* Dynamic Destination Ambient Glow radiating from the horizon */}
        <motion.div
          animate={{
            background: `radial-gradient(circle at 50% 55%, ${currentDest.accentColor}35 0%, transparent 70%)`,
          }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        />

        {/* Top & Bottom Vignette Shadow Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-black/30 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] pointer-events-none" />
      </motion.div>

      {/* 2. TOP HUD BAR */}
      <header className="relative z-20 pt-20 sm:pt-22 px-6 md:px-12 flex items-center justify-between">
        {/* Left Title with Vertical Yellow Bar */}
        <motion.div
          key={currentDest.id}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-3 cursor-pointer group"
          onClick={() => setIsContentExpanded((prev) => !prev)}
        >
          <div className="w-[3px] h-8 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)] mt-0.5 group-hover:scale-y-110 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg md:text-2xl tracking-wider uppercase text-white drop-shadow">
                {currentDest.name}
              </span>
              <span className="text-[10px] uppercase font-mono-tech px-2 py-0.5 rounded bg-white/10 text-amber-300 border border-amber-400/30">
                {currentDest.code}
              </span>
            </div>
            <span className="text-[10px] md:text-xs text-slate-400 tracking-widest font-mono-tech uppercase">
              {isContentExpanded ? "EXPLORING DESTINATION DOSSIER" : "SCROLL TO DISCOVER • ONE BY ONE"}
            </span>
          </div>
        </motion.div>

        {/* Right Navigation & Content Toggle */}
        <div className="flex items-center gap-2">
          {/* Waypoint Pills */}
          <div className="hidden sm:flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full border border-white/10">
            {EXPEDITION_DESTINATIONS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => goToSlide(i)}
                className={`px-3 py-1 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all duration-300 ${
                  activeIdx === i
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-105"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {d.name.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Toggle In-Place Content View */}
          <button
            onClick={() => {
              soundEngine.playZoomChime();
              setIsContentExpanded((prev) => !prev);
            }}
            className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-tech text-slate-300 hover:text-white border-white/15 hover:border-amber-400/50 transition-all shadow-lg flex items-center gap-2"
          >
            {isContentExpanded ? (
              <>
                <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>BACK TO SLIDES</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>OPEN CONTENT</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 3. CENTER STAGE: DUAL MODE (SLIDER MODE vs FULL IN-PLACE CONTENT MODE) */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center py-2 px-4 overflow-visible">
        <AnimatePresence mode="wait">
          {isContentExpanded ? (
            /* ================================================================
               MODE A: IN-PLACE FULL-SCREEN CONTENT VIEW (NO POPUP WINDOW)
               ================================================================ */
            <motion.div
              key={`content-${currentDest.id}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.95 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl mx-auto flex flex-col items-center text-white my-auto max-h-[72vh] overflow-y-auto px-2"
            >
              {/* Top Navigation Pill inside content view */}
              <button
                onClick={() => {
                  soundEngine.playCardSwoosh();
                  setIsContentExpanded(false);
                }}
                className="mb-4 px-4 py-1.5 rounded-full glass-pill border border-white/20 text-xs font-mono-tech text-slate-300 hover:text-white hover:border-amber-400/50 flex items-center gap-2 transition-all shadow-md group"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
                <span>RETURN TO SCROLL CAROUSEL</span>
              </button>

              {/* Grand Destination Title */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono-tech tracking-wider uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentDest.code} • {currentDest.badge}</span>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
                  {currentDest.grandTitle}
                </h1>

                <p className="text-slate-200 text-sm sm:text-base mt-2 max-w-2xl mx-auto font-light leading-relaxed">
                  {currentDest.subtitle}
                </p>
              </div>

              {/* Telemetry Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full mb-5">
                <div className="glass-panel p-3 rounded-2xl border border-white/10">
                  <MapPin className="w-4 h-4 text-amber-400 mb-1" />
                  <div className="text-[9px] font-mono-tech uppercase text-slate-400">Coordinates</div>
                  <div className="text-xs font-bold font-mono-tech text-white truncate">{currentDest.coordinates}</div>
                </div>

                <div className="glass-panel p-3 rounded-2xl border border-white/10">
                  <Mountain className="w-4 h-4 text-cyan-400 mb-1" />
                  <div className="text-[9px] font-mono-tech uppercase text-slate-400">Elevation</div>
                  <div className="text-xs font-bold font-mono-tech text-white">{currentDest.elevation}</div>
                </div>

                <div className="glass-panel p-3 rounded-2xl border border-white/10">
                  <Gauge className="w-4 h-4 text-purple-400 mb-1" />
                  <div className="text-[9px] font-mono-tech uppercase text-slate-400">Traverse Dist</div>
                  <div className="text-xs font-bold font-mono-tech text-white">{currentDest.distance}</div>
                </div>

                <div className="glass-panel p-3 rounded-2xl border border-white/10">
                  <Compass className="w-4 h-4 text-emerald-400 mb-1" />
                  <div className="text-[9px] font-mono-tech uppercase text-slate-400">Bearing</div>
                  <div className="text-xs font-bold font-mono-tech text-white">{currentDest.bearing}</div>
                </div>

                <div className="glass-panel p-3 rounded-2xl border border-white/10">
                  <Thermometer className="w-4 h-4 text-rose-400 mb-1" />
                  <div className="text-[9px] font-mono-tech uppercase text-slate-400">Temperature</div>
                  <div className="text-xs font-bold font-mono-tech text-white truncate">{currentDest.temperature}</div>
                </div>

                <div className="glass-panel p-3 rounded-2xl border border-white/10">
                  <Shield className="w-4 h-4 text-yellow-400 mb-1" />
                  <div className="text-[9px] font-mono-tech uppercase text-slate-400">Difficulty</div>
                  <div className="text-xs font-bold font-mono-tech text-white">{currentDest.difficulty}</div>
                </div>
              </div>

              {/* Narrative Story & Waypoints Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-5">
                {/* Story Narrative */}
                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2 text-left">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-amber-400">
                    EXPEDITION FIELD DOSSIER
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentDest.detailedStory}
                  </p>
                </div>

                {/* Waypoints Route & Equipment */}
                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 text-left">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-cyan-400 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5" />
                    <span>WAYPOINT CHECKLIST</span>
                  </h3>
                  <div className="space-y-2">
                    {currentDest.waypoints.map((wp, idx) => (
                      <div
                        key={wp.name}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-white/10 text-[10px] flex items-center justify-center text-slate-300">
                            {idx + 1}
                          </span>
                          <span className="text-white font-medium">{wp.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{wp.elevation}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              wp.status === "CLEARED"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : wp.status === "ACTIVE"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                                : "bg-slate-700/40 text-slate-400 border border-slate-600/30"
                            }`}
                          >
                            {wp.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/appointments"
                  onClick={() => soundEngine.playClick()}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-bold font-mono-tech text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>BOOK ADVISORY FOR {currentDest.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => {
                    soundEngine.playCardSwoosh();
                    setIsContentExpanded(false);
                  }}
                  className="px-6 py-3 rounded-xl glass-panel border border-white/20 text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider hover:border-amber-400/50 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                  <span>CLOSE & RETURN TO CAROUSEL</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* ================================================================
               MODE B: 3D SLIDER (RIGHT TO LEFT DISAPPEARING IN LEFT CORNER)
               ================================================================ */
            <motion.div
              key="carousel-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Dynamic Center Title Reveal */}
              <motion.div
                key={currentDest.id + "-title"}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-4xl mb-4 sm:mb-6 pointer-events-none"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono-tech tracking-widest text-slate-300 uppercase mb-2 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentDest.tagline}</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
                  {currentDest.grandTitle}
                </h1>

                <p className="text-slate-300 text-xs sm:text-base mt-2 max-w-xl mx-auto font-light leading-relaxed line-clamp-1 sm:line-clamp-none">
                  {currentDest.subtitle}
                </p>
              </motion.div>

              {/* Horizontal Cards Stage: Slides move right-to-left one by one, disappearing in left corner */}
              <div
                className="relative w-full max-w-7xl h-[330px] sm:h-[400px] md:h-[440px] flex items-center justify-center overflow-visible"
                style={{ perspective: "1400px" }}
              >
                {EXPEDITION_DESTINATIONS.map((dest, i) => (
                  <ExpeditionCard
                    key={dest.id}
                    dest={dest}
                    index={i}
                    smoothProgress={smoothProgress}
                    isActive={activeIdx === i}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>

              {/* Scroll Hint */}
              <div className="mt-3 text-center">
                <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest animate-pulse">
                  SCROLL MOUSE WHEEL TO GLIDE SLIDES RIGHT TO LEFT • CLICK TO EXPAND CONTENT
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. BOTTOM HUD TELEMETRY BAR: EXACT MATCH TO FRAMES 1, 2, 4, 7, 9 */}
      <footer className="relative z-20 w-full px-6 md:px-12 py-4 border-t border-white/10 bg-black/75 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left HUD Controls & Telemetry Data */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsContentExpanded((prev) => !prev);
              }}
              className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.6)] active:scale-95 transition-all"
              title="Toggle Content View"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                goToSlide(0);
              }}
              className="w-8 h-8 rounded-full glass-pill text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
              title="Waypoint 01"
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/expedition"
              onClick={() => soundEngine.playClick()}
              className="w-8 h-8 rounded-full glass-pill text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
              title="Odyssey Portal"
            >
              <Layers className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Telemetry Metric 1: Vector Circuit Map SVG */}
          <div className="hidden sm:flex items-center gap-3 pl-4 sm:pl-6 border-l border-white/10">
            <div className="w-12 h-8 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 180 80">
                <path
                  d={currentDest.circuitPath}
                  fill="none"
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth="2"
                />
                <circle cx="15" cy="35" r="3.5" fill="#FBBF24" className="animate-ping" />
                <circle cx="15" cy="35" r="3" fill="#FBBF24" />
              </svg>
            </div>
            <div>
              <div className="font-mono-tech text-xs sm:text-sm font-bold text-white tracking-wider">
                {currentDest.degrees}
              </div>
              <div className="text-[8px] sm:text-[9px] font-mono-tech uppercase text-slate-400">
                {currentDest.bearing}
              </div>
            </div>
          </div>

          {/* Telemetry Metric 2: Elevation Waveform SVG */}
          <div className="hidden md:flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="w-12 h-8 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <path
                  d={currentDest.elevationPath}
                  fill="none"
                  stroke="rgba(56,189,248,0.85)"
                  strokeWidth="2"
                />
                <circle cx="70" cy="25" r="3" fill="#38BDF8" />
              </svg>
            </div>
            <div>
              <div className="font-mono-tech text-xs sm:text-sm font-bold text-white tracking-wider">
                {currentDest.elevationValue}
              </div>
              <div className="text-[9px] font-mono-tech uppercase text-slate-400">
                {currentDest.temperature}
              </div>
            </div>
          </div>

          {/* Telemetry Metric 3: Circular 360 preview lens */}
          <div
            onClick={() => {
              soundEngine.playZoomChime();
              setIsContentExpanded((prev) => !prev);
            }}
            className="hidden lg:flex items-center gap-2.5 pl-6 border-l border-white/10 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 group-hover:border-amber-400 transition-colors">
              <div
                className="w-full h-full bg-cover bg-center filter brightness-90 group-hover:scale-110 transition-transform"
                style={{ backgroundImage: `url(${currentDest.image})` }}
              />
            </div>
            <div>
              <div className="text-[9px] font-mono-tech uppercase text-white font-bold group-hover:text-amber-300">
                CAMPUS VIBE 360°
              </div>
              <div className="text-[8px] font-mono-tech text-emerald-400">
                CLICK TO TOGGLE CONTENT
              </div>
            </div>
          </div>
        </div>

        {/* Right HUD Controls: Slide Counter & Chevrons */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-slate-300">
            <span className="text-amber-400 font-bold">
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <span className="opacity-40">/</span>
            <span className="opacity-70">
              {String(EXPEDITION_DESTINATIONS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Dynamic Progress Line */}
          <div className="w-20 sm:w-28 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-400"
              animate={{
                width: `${((activeIdx + 1) / EXPEDITION_DESTINATIONS.length) * 100}%`,
              }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>

          {/* Previous & Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={activeIdx === 0}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIdx === EXPEDITION_DESTINATIONS.length - 1}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};
