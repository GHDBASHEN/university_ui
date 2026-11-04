"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { DESTINATIONS } from "@/data/destinations";
import { soundEngine } from "@/components/shared/SoundEngine";
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Eye,
  Activity,
  Layers,
  CheckCircle2,
  Minimize2,
  Maximize2,
  Building2,
  Calendar,
  Award,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const lastWheelTime = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax camera depth on scroll
  const bgScale = useTransform(scrollYProgress, [0, 0.7], [1.02, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 0.7], [0, 50]);
  const roadPerspectiveY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const currentDest = DESTINATIONS[activeIdx];

  // Auto-advance sliding with responsive pacing (auto-slides every 3.8s when not in expanded view)
  useEffect(() => {
    if (isExpandedView) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DESTINATIONS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isExpandedView]);

  // Mouse wheel interaction over the hero section
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 400) return;

    // Horizontal wheel or shift+wheel navigates cards
    if (Math.abs(e.deltaX) > 30) {
      lastWheelTime.current = now;
      if (e.deltaX > 0) {
        soundEngine.playCardSwoosh();
        setActiveIdx((prev) => (prev + 1) % DESTINATIONS.length);
      } else {
        soundEngine.playCardSwoosh();
        setActiveIdx((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);
      }
    }
  };

  const handlePrev = () => {
    soundEngine.playCardSwoosh();
    setActiveIdx((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);
  };

  const handleNext = () => {
    soundEngine.playCardSwoosh();
    setActiveIdx((prev) => (prev + 1) % DESTINATIONS.length);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIdx) {
      // Clicking center card zooms inside (expanded story mode)
      soundEngine.playZoomChime();
      setIsExpandedView(true);
    } else {
      // Clicking side card flies to center
      soundEngine.playCardSwoosh();
      setActiveIdx(index);
    }
  };

  // Telemetry details matching the video template
  const telemetryData = [
    {
      circuit: "M 10 35 C 25 15, 50 10, 75 22 C 100 32, 120 18, 145 28 C 165 35, 175 50, 150 60 C 120 70, 85 60, 60 52 C 35 44, 15 50, 10 35 Z",
      elevation: "M 0 35 Q 30 10, 60 28 T 120 18 T 180 38 T 220 15",
      metric1: "130+ UNIVERSITIES",
      label1: "RUSSELL GROUP GRID",
      metric2: "98% VISA RATE",
      label2: "UK VI COMPLIANCE",
      headline: "Traverse the British Isles",
      sub: "Home to Oxford, Cambridge, and world-shaping intellectual heritage.",
    },
    {
      circuit: "M 15 45 C 35 20, 70 15, 95 25 C 125 35, 145 20, 170 35 C 180 45, 165 62, 140 66 C 110 70, 70 62, 45 68 C 20 72, 10 58, 15 45 Z",
      elevation: "M 0 40 Q 35 8, 70 25 T 130 12 T 190 32 T 230 18",
      metric1: "43 UNIVERSITIES",
      label1: "GROUP OF EIGHT (GO8)",
      metric2: "96% VISA RATE",
      label2: "POST-STUDY WORK 4-5 YRS",
      headline: "Wander the Australian Horizon",
      sub: "Sun-soaked campuses, globally ranked labs, and vibrant coastal culture.",
    },
    {
      circuit: "M 10 30 C 35 15, 65 10, 95 25 C 130 40, 150 15, 175 30 C 185 45, 160 65, 130 68 C 90 72, 60 55, 35 60 C 15 62, 5 45, 10 30 Z",
      elevation: "M 0 45 Q 35 2, 70 30 T 140 8 T 210 25",
      metric1: "96+ UNIVERSITIES",
      label1: "U15 CONSORTIUM",
      metric2: "98% VISA RATE",
      label2: "3-YEAR PGWP PATHWAY",
      headline: "Conquer the Canadian Frontier",
      sub: "Immigration-friendly pathways, tech innovation, and diverse metropolises.",
    },
  ];

  const currentTel = telemetryData[activeIdx] || telemetryData[0];

  return (
    <section
      ref={containerRef}
      onWheel={handleWheel}
      className="relative min-h-[105vh] flex flex-col justify-between overflow-hidden select-none bg-[#06080d]"
    >
      {/* 1. Cinematic Photographic Backdrop Stage */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDest.slug}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: 1,
              scale: isExpandedView ? 1.15 : 1.02,
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-[0.52] contrast-125 saturate-110"
            style={{ backgroundImage: `url(${currentDest.heroImage})` }}
          />
        </AnimatePresence>

        {/* Dynamic Country Accent Ambient Glow */}
        <motion.div
          animate={{
            background: `radial-gradient(circle at 50% 65%, ${currentDest.accentColor}35 0%, transparent 70%)`,
          }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Horizon Light Beam (from template1.mp4) */}
        <div className="absolute bottom-[34%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-[1px]" />
        <div className="absolute bottom-[34%] left-1/4 right-1/4 h-[8px] bg-gradient-to-r from-transparent via-amber-300/20 to-transparent blur-md" />

        {/* Perspective Road Overlay (Iconic motif from template1.mp4) */}
        <motion.div
          style={{ y: roadPerspectiveY }}
          className="absolute inset-0 flex items-center justify-center opacity-30"
        >
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path d="M 500 280 L 80 600" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="8 12" />
            <path d="M 500 280 L 920 600" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="8 12" />
            <path d="M 500 280 L 500 600" stroke="rgba(251,191,36,0.4)" strokeWidth="2" strokeDasharray="25 25" />
          </svg>
        </motion.div>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-black/40 to-black/60" />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
      </motion.div>

      {/* 2. Top Bar Signature Branding (Matching template1.mp4) */}
      <div className="relative z-20 pt-24 px-6 md:px-12 flex items-center justify-between">
        <motion.div
          key={currentDest.slug}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            soundEngine.playZoomChime();
            setIsExpandedView((prev) => !prev);
          }}
          className="flex items-start gap-3 cursor-pointer group"
        >
          {/* Yellow vertical accent bar */}
          <div className="w-[3px] h-8 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)] mt-0.5 group-hover:scale-y-110 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg md:text-xl tracking-wider uppercase text-white drop-shadow">
                {currentDest.name}
              </span>
              <span className="text-[10px] uppercase font-mono-tech px-1.5 py-0.5 rounded bg-white/10 text-amber-300 border border-amber-400/30">
                {currentDest.shortName}
              </span>
            </div>
            <span className="text-[10px] md:text-xs text-slate-300 tracking-widest font-mono-tech uppercase opacity-80">
              AURA GLOBAL EDUCATION • OFFICIAL PORTAL
            </span>
          </div>
        </motion.div>

        {/* Destination Switcher Pills with Sound on Click */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-white/10">
            {DESTINATIONS.map((d, i) => (
              <button
                key={d.slug}
                onClick={() => {
                  soundEngine.playCardSwoosh();
                  setActiveIdx(i);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all duration-300 ${
                  activeIdx === i
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {d.shortName}
              </button>
            ))}
          </div>

          {/* Toggle Expanded View Button */}
          <button
            onClick={() => {
              soundEngine.playZoomChime();
              setIsExpandedView((prev) => !prev);
            }}
            className="p-2 rounded-full glass-pill text-slate-300 hover:text-white border-white/10 hover:border-amber-400/40 transition-colors"
            title={isExpandedView ? "Collapse to Carousel" : "Expand Cinematic View"}
          >
            {isExpandedView ? (
              <Minimize2 className="w-4 h-4 text-amber-400" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Center Stage: Dual Mode with Seamless Transitions */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 my-auto flex flex-col items-center justify-center min-h-[460px]">
        <AnimatePresence mode="wait">
          {isExpandedView ? (
            /* Mode A: Zoomed In Expanded Story View (from frames 003, 004, 008 of video) */
            <motion.div
              key={`expanded-${currentDest.slug}`}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-4xl flex flex-col items-center"
            >
              <button
                onClick={() => {
                  soundEngine.playCardSwoosh();
                  setIsExpandedView(false);
                }}
                className="mb-6 px-4 py-1.5 rounded-full glass-pill border border-white/20 text-xs font-mono-tech text-slate-300 hover:text-white hover:border-amber-400/50 flex items-center gap-1.5 transition-all shadow-md group"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
                <span>BACK TO 3D CAROUSEL VIEW</span>
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl drop-shadow">{currentDest.flagEmoji}</span>
                <span className="font-mono-tech text-xs uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {currentDest.stats.visaSuccessRate} VISA APPROVAL RATIO
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
                {currentTel.headline}
              </h1>

              <p className="text-slate-200 text-sm sm:text-lg mt-3 font-light max-w-2xl text-balance">
                {currentDest.description}
              </p>

              {/* Quick Academic Highlights */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-left">
                  <Building2 className="w-4 h-4 text-cyan-400 mb-1" />
                  <div className="text-[10px] text-slate-400 font-mono-tech uppercase">Universities</div>
                  <div className="text-sm font-bold text-white">{currentDest.stats.universities}+ Campuses</div>
                </div>

                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-left">
                  <Calendar className="w-4 h-4 text-amber-400 mb-1" />
                  <div className="text-[10px] text-slate-400 font-mono-tech uppercase">Intakes / Year</div>
                  <div className="text-sm font-bold text-white">{currentDest.stats.intakesPerYear} Intakes</div>
                </div>

                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-left">
                  <Award className="w-4 h-4 text-emerald-400 mb-1" />
                  <div className="text-[10px] text-slate-400 font-mono-tech uppercase">Average Tuition</div>
                  <div className="text-sm font-bold text-white truncate">{currentDest.stats.averageTuition}</div>
                </div>

                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-left">
                  <Sparkles className="w-4 h-4 text-purple-400 mb-1" />
                  <div className="text-[10px] text-slate-400 font-mono-tech uppercase">Scholarships</div>
                  <div className="text-sm font-bold text-white">{currentDest.stats.scholarshipsAvailable}+ Listed</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/destinations/${currentDest.slug}`}
                  onClick={() => soundEngine.playClick()}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-bold font-mono-tech text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-black" />
                  <span>EXPLORE ALL {currentDest.shortName} UNIVERSITIES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/appointments"
                  onClick={() => soundEngine.playClick()}
                  className="px-6 py-3.5 rounded-xl glass-panel border border-white/20 text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider hover:border-amber-400/50 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>BOOK FREE 1-ON-1 ADVISORY</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Mode B: 3D Floating Perspective Cards Carousel */
            <motion.div
              key="carousel-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {/* Dynamic Big Headline from the video transition */}
              <motion.div
                key={currentDest.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6 max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-white/20 text-[11px] font-mono-tech text-amber-300 uppercase tracking-widest mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>STUDY ABROAD DESTINATION ODYSSEY</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                  {currentTel.headline}
                </h1>

                <p className="text-slate-200 text-xs sm:text-base mt-2 font-light max-w-xl mx-auto leading-relaxed">
                  {currentTel.sub}
                </p>
              </motion.div>

              {/* 3D Floating Perspective Cards Grid */}
              <div
                className="relative w-full h-[360px] sm:h-[430px] md:h-[460px] flex items-center justify-center my-2"
                style={{ perspective: "1300px" }}
              >
                {DESTINATIONS.map((dest, i) => {
                  let diff = i - activeIdx;
                  if (diff > DESTINATIONS.length / 2) diff -= DESTINATIONS.length;
                  if (diff < -DESTINATIONS.length / 2) diff += DESTINATIONS.length;

                  const isCenter = diff === 0;
                  const xOffset = diff * 350;
                  const rotateY = diff * -22;
                  const scale = isCenter ? 1.15 : 0.88;
                  const opacity = isCenter ? 1 : 0.6;
                  const zIndex = isCenter ? 30 : 10;

                  return (
                    <motion.div
                      key={dest.slug}
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
                      onClick={() => handleCardClick(i)}
                      className="absolute w-[260px] sm:w-[320px] md:w-[360px] h-[340px] sm:h-[410px] md:h-[440px] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl backdrop-blur-xl"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-500 border ${
                          isCenter
                            ? "border-amber-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-2 ring-amber-400/30"
                            : "border-white/15 hover:border-white/30 hover:scale-[1.02]"
                        }`}
                      >
                        {/* Card Background Artwork */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                          style={{ backgroundImage: `url(${dest.cardImage})` }}
                        />

                        {/* Gradient Dark Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                        {/* Top Badge */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                          <span className="text-2xl drop-shadow">{dest.flagEmoji}</span>
                          <span className="font-mono-tech text-[10px] uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                            {dest.shortName}
                          </span>
                        </div>

                        {/* Bottom Typography: Tall condensed font matching the video */}
                        <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                          <h3 className="condensed-title text-2xl sm:text-3xl text-white tracking-wider drop-shadow group-hover:text-amber-300 transition-colors">
                            {dest.name}
                          </h3>
                          <p className="text-[11px] font-mono-tech text-slate-300 mt-1 uppercase tracking-widest flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            <span>{dest.stats.universities}+ UNIVERSITIES</span>
                          </p>

                          {isCenter && (
                            <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-mono-tech text-amber-400">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" /> CLICK TO EXPAND
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons beneath carousel */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4 z-20">
                <button
                  onClick={() => {
                    soundEngine.playZoomChime();
                    setIsExpandedView(true);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-bold font-mono-tech text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-black" />
                  <span>DIVE INTO {currentDest.shortName} VIBE</span>
                </button>

                <Link
                  href="/appointments"
                  onClick={() => soundEngine.playClick()}
                  className="px-6 py-3 rounded-xl glass-panel border border-white/20 text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider hover:border-amber-400/50 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>BOOK FREE SESSION</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Bottom Telemetry HUD Bar (Exact replica from template1.mp4) */}
      <footer className="relative z-20 w-full px-6 md:px-12 py-5 border-t border-white/10 bg-black/60 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Yellow active button + ghost buttons from video */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsExpandedView(false);
              }}
              className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.6)] active:scale-95 transition-all"
              title="Carousel Overview"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsExpandedView(true);
              }}
              className="w-8 h-8 rounded-full glass-pill text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
              title="Telemetry Details"
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/destinations"
              onClick={() => soundEngine.playClick()}
              className="w-8 h-8 rounded-full glass-pill text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
              title="University Matrix"
            >
              <Layers className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Telemetry Metric 1: Vector Contour Map SVG */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="w-14 h-9 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 180 80">
                <path
                  d={currentTel.circuit}
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="2"
                />
                <circle cx="15" cy="35" r="3" fill="#FBBF24" />
              </svg>
            </div>
            <div>
              <div className="font-mono-tech text-sm font-bold text-white tracking-wider">
                {currentTel.metric1}
              </div>
              <div className="text-[9px] font-mono-tech uppercase text-slate-400">
                {currentTel.label1}
              </div>
            </div>
          </div>

          {/* Telemetry Metric 2: Vector Waveform SVG */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="w-14 h-9 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <path
                  d={currentTel.elevation}
                  fill="none"
                  stroke="rgba(56,189,248,0.85)"
                  strokeWidth="2"
                />
                <circle cx="70" cy="25" r="3" fill="#38BDF8" />
              </svg>
            </div>
            <div>
              <div className="font-mono-tech text-sm font-bold text-white tracking-wider">
                {currentTel.metric2}
              </div>
              <div className="text-[9px] font-mono-tech uppercase text-slate-400">
                {currentTel.label2}
              </div>
            </div>
          </div>

          {/* Telemetry Metric 3: Circular 360 preview thumbnail */}
          <div
            onClick={() => {
              soundEngine.playZoomChime();
              setIsExpandedView((prev) => !prev);
            }}
            className="hidden sm:flex items-center gap-2.5 pl-6 border-l border-white/10 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 group-hover:border-amber-400 transition-colors">
              <div
                className="w-full h-full bg-cover bg-center filter brightness-90 group-hover:scale-110 transition-transform"
                style={{ backgroundImage: `url(${currentDest.cardImage})` }}
              />
            </div>
            <div>
              <div className="text-[10px] font-mono-tech uppercase text-white font-bold group-hover:text-amber-300">
                CAMPUS VIBE 360°
              </div>
              <div className="text-[8px] font-mono-tech text-emerald-400">
                CLICK TO TOGGLE VIBE
              </div>
            </div>
          </div>
        </div>

        {/* Right: Slide Counter & Nav Controls with Sound */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-slate-300">
            <span className="text-amber-400 font-bold">
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <span className="opacity-40">/</span>
            <span className="opacity-70">{String(DESTINATIONS.length).padStart(2, "0")}</span>
          </div>

          {/* Progress line */}
          <div className="w-20 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-400"
              animate={{
                width: `${((activeIdx + 1) / DESTINATIONS.length) * 100}%`,
              }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};
