"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Navigation,
  MapPin,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Mountain,
  Gauge,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { EXPEDITION_DESTINATIONS, ExpeditionDestination } from "@/data/expeditions";
import { soundEngine } from "@/components/shared/SoundEngine";

interface ExpeditionCarouselProps {
  initialIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSelectDestination?: (dest: ExpeditionDestination) => void;
  className?: string;
}

export const ExpeditionCarousel: React.FC<ExpeditionCarouselProps> = ({
  initialIndex = 0,
  autoPlay = false,
  autoPlayInterval = 5000,
  onSelectDestination,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const lastInteraction = useRef<number>(0);
  const activeDest = EXPEDITION_DESTINATIONS[activeIndex];

  // Callback to parent if provided
  useEffect(() => {
    if (onSelectDestination) {
      onSelectDestination(activeDest);
    }
  }, [activeIndex, activeDest, onSelectDestination]);

  // Handle slide cycling
  const nextSlide = useCallback(() => {
    soundEngine.playCardSwoosh();
    setActiveIndex((prev) => (prev + 1) % EXPEDITION_DESTINATIONS.length);
  }, []);

  const prevSlide = useCallback(() => {
    soundEngine.playCardSwoosh();
    setActiveIndex((prev) => (prev - 1 + EXPEDITION_DESTINATIONS.length) % EXPEDITION_DESTINATIONS.length);
  }, []);

  const goToSlide = (index: number) => {
    if (index === activeIndex) {
      // Clicking the active card toggles expanded full-screen mode
      soundEngine.playZoomChime();
      setIsExpanded(true);
    } else {
      // Clicking an inactive card moves it to center
      soundEngine.playCardSwoosh();
      setActiveIndex(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      } else if (!isExpanded) {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, nextSlide, prevSlide]);

  // Optional autoplay
  useEffect(() => {
    if (!autoPlay || isExpanded) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EXPEDITION_DESTINATIONS.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isExpanded]);

  // Mouse wheel horizontal navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (isExpanded) return;
    const now = Date.now();
    if (now - lastInteraction.current < 450) return;

    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 50) {
      lastInteraction.current = now;
      if (e.deltaX > 0 || e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className={`relative w-full min-h-screen h-screen overflow-hidden bg-black text-slate-100 flex flex-col justify-between select-none ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* 1. DYNAMIC HIGH-RES CROSS-FADING BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeDest.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeDest.image})` }}
          />
        </AnimatePresence>

        {/* Cinematic dark overlays to make text and HUD elements pop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />

        {/* Subtle expedition wireframe grid lines overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* TOP HUD: EXPEDITION LOGO & ACTIVE DESTINATION BADGE */}
      <header className="relative z-20 px-6 md:px-12 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase">
              TERRA INCOGNITA • 3D EXPEDITION SYSTEM
            </div>
            <div className="text-sm font-semibold tracking-wide text-white uppercase flex items-center gap-2">
              <span>WAYPOINT {activeIndex + 1} OF {EXPEDITION_DESTINATIONS.length}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* Right Header Status Widget */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>SAT-UPLINK ACTIVE</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-wider uppercase">
            {activeDest.badge}
          </div>
        </div>
      </header>

      {/* 2. MAIN 3D CAROUSEL COMPONENT */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center py-4 px-4 overflow-visible">
        {/* Active Destination Headline Preview */}
        <motion.div
          key={activeDest.id + "-title"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono tracking-widest text-slate-300 uppercase mb-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeDest.tagline}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]">
            {activeDest.grandTitle}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
            {activeDest.subtitle}
          </p>
        </motion.div>

        {/* Horizontal Stack of 3D Perspective Cards */}
        <div
          className="relative w-full max-w-5xl h-[330px] sm:h-[400px] md:h-[450px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {EXPEDITION_DESTINATIONS.map((dest, i) => {
            // Calculate circular offset distance from active card
            let diff = i - activeIndex;
            const len = EXPEDITION_DESTINATIONS.length;
            if (diff > len / 2) diff -= len;
            if (diff < -len / 2) diff += len;

            const isActive = diff === 0;

            // Spatial transforms
            const xOffset = diff * (typeof window !== "undefined" && window.innerWidth < 640 ? 190 : 310);
            const rotateY = diff * -20; // 3D amphitheater inclination
            const scale = isActive ? 1.12 : 0.82;
            const opacity = isActive ? 1 : Math.max(0.35, 0.7 - Math.abs(diff) * 0.25);
            const zIndex = isActive ? 30 : 15 - Math.abs(diff);

            return (
              <motion.div
                key={dest.id}
                animate={{
                  x: xOffset,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                }}
                onClick={() => goToSlide(i)}
                className={`absolute w-[240px] sm:w-[300px] md:w-[340px] h-[310px] sm:h-[380px] md:h-[420px] rounded-3xl overflow-hidden cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.85)] border transition-all duration-300 ${
                  isActive
                    ? "border-amber-400/60 ring-2 ring-amber-400/30 shadow-[0_0_40px_rgba(251,191,36,0.2)]"
                    : "border-white/15 hover:border-white/40 hover:opacity-85"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />

                {/* Card Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {/* Card Top Pill Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-wider text-amber-300 uppercase">
                    {dest.code}
                  </span>

                  {isActive ? (
                    <span className="px-2.5 py-1 rounded-full bg-amber-400/90 text-black text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                      <Maximize2 className="w-3 h-3" />
                      <span>CLICK TO EXPAND</span>
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40 group-hover:bg-amber-400 transition-colors" />
                  )}
                </div>

                {/* Card Bottom Meta */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{dest.location}</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-slate-300 text-xs mt-1 font-light line-clamp-2">
                    {dest.tagline}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-slate-300" />
                      {dest.elevation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-slate-300" />
                      {dest.distance}
                    </span>
                  </div>
                </div>

                {/* Subtle active glow frame */}
                {isActive && (
                  <div className="absolute inset-0 border-2 border-amber-400/40 rounded-3xl pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Carousel quick indicators */}
        <div className="flex items-center gap-2 mt-4 z-20">
          {EXPEDITION_DESTINATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Jump to destination ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </main>

      {/* 3. TELEMETRY & HUD CONTROL FOOTER */}
      <footer className="relative z-20 px-4 md:px-10 pb-6 pt-3">
        <div className="max-w-6xl mx-auto rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/15 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Real-time Telemetry Stats (Distance, Elevation, Coordinates, Bearing) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full lg:w-auto">
              {/* Stat 1: DISTANCE */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    DISTANCE
                  </div>
                  <motion.div
                    key={activeDest.distance}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base font-bold font-mono text-white tracking-tight"
                  >
                    {activeDest.distance}
                  </motion.div>
                </div>
              </div>

              {/* Stat 2: ELEVATION / ALTITUDE */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mountain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    ELEVATION
                  </div>
                  <motion.div
                    key={activeDest.elevation}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base font-bold font-mono text-white tracking-tight"
                  >
                    {activeDest.elevation}
                  </motion.div>
                </div>
              </div>

              {/* Stat 3: PRECISE GEOGRAPHIC COORDINATES */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    COORDINATES
                  </div>
                  <motion.div
                    key={activeDest.coordinates}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-sm font-bold font-mono text-white tracking-tight truncate max-w-[120px]"
                  >
                    {activeDest.coordinates}
                  </motion.div>
                </div>
              </div>

              {/* Stat 4: BEARING / HEADING */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    BEARING
                  </div>
                  <motion.div
                    key={activeDest.bearing}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base font-bold font-mono text-white tracking-tight"
                  >
                    {activeDest.bearing}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Expedition Navigation Controls & Primary Circular Action Button */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                aria-label="Previous destination"
                className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 flex items-center justify-center text-slate-200 hover:text-white transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Waypoint Label */}
              <div className="text-center px-2">
                <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  TARGET LOCK
                </div>
                <div className="text-xs font-mono font-bold text-amber-300 truncate max-w-[130px]">
                  {activeDest.name}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                aria-label="Next destination"
                className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 flex items-center justify-center text-slate-200 hover:text-white transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* PRIMARY CIRCULAR ACTION BUTTON (with forward arrow that cycles through destinations) */}
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.94 }}
                onClick={nextSlide}
                aria-label="Cycle next waypoint"
                className="relative ml-2 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-black font-black flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)] group border-2 border-white/40 focus:outline-none"
              >
                {/* Orbiting ring pulse */}
                <div className="absolute -inset-1 rounded-full border border-amber-400/50 animate-ping pointer-events-none" />
                <ArrowRight className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. EXPANDED FULL-SCREEN STORY VIEW (TRIGGERED ON CLICKING ACTIVE CARD) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Expanded Modal Box */}
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/20 bg-[#0A0D14]/95 shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-auto"
            >
              {/* Grand Banner Artwork */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center filter brightness-90"
                  style={{ backgroundImage: `url(${activeDest.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/40 to-black/60" />

                {/* Close Button (X) */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsExpanded(false);
                  }}
                  aria-label="Close expanded view"
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/70 hover:bg-red-500/80 border border-white/20 hover:border-red-400 text-white flex items-center justify-center transition-all duration-300 shadow-xl group cursor-pointer z-30"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Banner Content */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono tracking-wider uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeDest.code} • {activeDest.badge}</span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                    {activeDest.grandTitle}
                  </h1>

                  <p className="text-slate-200 text-sm sm:text-base mt-2 max-w-2xl font-light">
                    {activeDest.subtitle}
                  </p>
                </div>
              </div>

              {/* Detailed Content & Itinerary */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Expedition Story Narrative */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-2">
                    MISSION LOG & TERRAIN PROFILE
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    {activeDest.detailedStory}
                  </p>
                </div>

                {/* Telemetry Matrix Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">COORDINATES</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-white mt-1">
                      {activeDest.coordinates}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">TOTAL TRAVERSE</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 mt-1">
                      {activeDest.distance}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">SUMMIT ELEVATION</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-300 mt-1">
                      {activeDest.elevation}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">TERRAIN TYPE</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-sky-300 mt-1 truncate">
                      {activeDest.terrain}
                    </div>
                  </div>
                </div>

                {/* Waypoints Clearance */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-3">
                    EXPEDITION STAGING WAYPOINTS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeDest.waypoints.map((wp, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{wp.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{wp.elevation}</div>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                            wp.status === "CLEARED"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : wp.status === "ACTIVE"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                          }`}
                        >
                          {wp.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gear Required */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-3">
                    MANDATORY TECHNICAL GEAR
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeDest.gearRequired.map((gear, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>{gear}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-mono text-slate-400">
                    PRESS <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">ESC</kbd> OR CLICK CLOSE
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        soundEngine.playCardSwoosh();
                        nextSlide();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <span>NEXT WAYPOINT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setIsExpanded(false);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all flex items-center gap-2"
                    >
                      <Minimize2 className="w-4 h-4" />
                      <span>RETURN TO RADAR</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpeditionCarousel;
