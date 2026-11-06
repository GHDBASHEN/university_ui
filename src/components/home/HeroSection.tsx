"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { DESTINATIONS, Destination } from "@/data/destinations";
import { soundEngine } from "@/components/shared/SoundEngine";
import { springDefault } from "@/lib/motion";
import { DestinationRoom3D, preloadDestinationRoom } from "@/components/ui/DestinationRoom3D";
import { useLenis } from "@/components/shared/SmoothScrollProvider";
import {
  Compass,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Activity,
  Layers,
  Building2,
  Award,
  DollarSign,
  Maximize2,
} from "lucide-react";

// ============================================================================
// INDIVIDUAL LARGE UNIVERSITY DESTINATION CARD
// Hidden on first load (title screen).
// Glides smoothly in from right to left as user scrolls down the page.
// When reaching the left corner, each card smoothly fades and disappears.
// All relevant text is kept inside the card box.
// ============================================================================
interface DestinationCardProps {
  dest: Destination;
  index: number;
  smoothProgress: MotionValue<number>;
  isActive: boolean;
  onCardClick: (dest: Destination, index: number) => void;
  cardSpacing: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  dest,
  index,
  smoothProgress,
  isActive,
  onCardClick,
  cardSpacing,
}) => {
  // Slot assignment: UK is at slot 1, Australia at 2, Canada at 3, USA at 4.
  // Slot 0 is reserved for the initial Title + Background screen (where slides are not visible).
  const cardSlot = index + 1;

  // 1. Horizontal movement: glides right-to-left as user scrolls
  // When smoothProgress = cardSlot -> card is centered (x = 0)
  // When smoothProgress < cardSlot -> card is to the right (x > 0)
  // When smoothProgress > cardSlot -> card moves to the left (x < 0)
  const x = useTransform(smoothProgress, (p) => {
    return (cardSlot - p) * cardSpacing;
  });

  // 2. Opacity curve:
  // - On initial title load (p <= 0.15): card is COMPLETELY INVISIBLE (opacity = 0)
  // - As user scrolls from title into this card: fades in smoothly as it glides into center
  // - In center: 100% solid & visible (opacity = 1.0)
  // - Gliding into left corner (diff > 0.35): smoothly fades from 1.0 down to 0.0
  // - Past left corner (diff >= 0.95): completely disappeared (opacity = 0)
  const opacity = useTransform(smoothProgress, (p) => {
    if (p <= 0.15) return 0;

    const diff = p - cardSlot;
    if (diff > 0.35) {
      const fadeProgress = Math.min(1, (diff - 0.35) / 0.6);
      return Math.max(0, 1 - Math.pow(fadeProgress, 1.2));
    } else if (p < cardSlot) {
      const entrance = Math.max(0, Math.min(1, (p - (cardSlot - 1.0)) / 0.65));
      return entrance;
    } else {
      return 1;
    }
  });

  // 3. Subtle scale: stays 1.0 across center, eases to 0.92 as it exits in the left corner
  const scale = useTransform(smoothProgress, (p) => {
    const diff = p - cardSlot;
    if (diff > 0.35) {
      const shrinkProgress = Math.min(1, (diff - 0.35) / 0.6);
      return 1.0 - shrinkProgress * 0.08;
    } else if (diff >= 0) {
      return 1.0;
    } else {
      const rightDiff = Math.min(2, -diff);
      return 1.0 - rightDiff * 0.03;
    }
  });

  // 4. Disable pointer events when invisible on intro screen or when faded out in left corner
  const pointerEvents = useTransform(smoothProgress, (p) => {
    if (p <= 0.25 || p - cardSlot > 0.9) return "none";
    return "auto";
  });

  // 5. Z-index stacking
  const zIndex = isActive ? 30 : Math.max(1, 20 - index);

  return (
    <motion.div
      layoutId={`destination-card-${dest.slug}`}
      style={{
        x,
        scale,
        opacity,
        zIndex,
        pointerEvents,
      }}
      onClick={() => onCardClick(dest, index)}
      onMouseEnter={() => preloadDestinationRoom(dest)}
      onFocus={() => preloadDestinationRoom(dest)}
      className={`absolute w-[320px] sm:w-[420px] md:w-[480px] lg:w-[520px] h-[480px] sm:h-[530px] md:h-[570px] lg:h-[600px] rounded-3xl overflow-hidden cursor-pointer group shadow-[0_25px_60px_rgba(0,0,0,0.9)] border transition-[border-color,box-shadow] duration-300 will-change-transform ${
        isActive
          ? "border-amber-400/80 ring-2 ring-amber-400/40 shadow-[0_0_40px_rgba(251,191,36,0.35)]"
          : "border-white/15 hover:border-white/40"
      }`}
    >
      {/* 1. Large High-Resolution Campus Photography */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88] group-hover:brightness-95"
        style={{ backgroundImage: `url(${dest.cardImage})` }}
      />

      {/* 2. Frosted Gradient Overlay: crystal-clear readability for text inside the box */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />

      {/* 3. Card Top Header inside the box */}
      <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl drop-shadow">{dest.flagEmoji}</span>
          <span className="font-mono-tech text-xs uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
            {dest.name} • {dest.shortName}
          </span>
        </div>

        <span className="text-[10px] font-mono-tech uppercase text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 backdrop-blur-md">
          {dest.stats.visaSuccessRate} VISA APPROVAL
        </span>
      </div>

      {/* 4. Card Interior Content: All relevant text appears inside the box */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10 flex flex-col justify-end text-left">
        {/* Tagline Badge inside the box */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono-tech tracking-widest text-amber-300 uppercase mb-2.5 backdrop-blur-md w-fit">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{dest.tagline}</span>
        </div>

        {/* Grand Title inside the box */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight group-hover:text-amber-300 transition-colors">
          {dest.grandTitle}
        </h2>

        {/* Relevant Description inside the box */}
        <p className="text-slate-200 text-xs sm:text-sm mt-2 font-light leading-relaxed line-clamp-2 sm:line-clamp-3 text-balance">
          {dest.description}
        </p>

        {/* Key Academic Quick Stats inside the box */}
        <div className="mt-3.5 pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-[11px] font-mono-tech">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{dest.stats.universities}+ Campuses</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{dest.stats.averageTuition.split("–")[0]}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{dest.stats.scholarshipsAvailable}+ Schol.</span>
          </div>
        </div>

        {/* Interactive Click Button inside the box */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono-tech text-amber-400 group-hover:text-amber-300 transition-colors">
          <span className="flex items-center gap-2 font-bold tracking-wider uppercase">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>CLICK TO ENTER 3D ROOM</span>
          </span>
          <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN HERO SECTION: PINNED STICKY CHAMBER
// Title on top -> slides glide on scroll -> unpins smoothly to rest of page
// ============================================================================
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  // activeIdx: -1 = Intro title screen, 0 = UK, 1 = Australia, 2 = Canada, 3 = USA
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  const [cardSpacing, setCardSpacing] = useState<number>(540);
  const prevSlideRef = useRef<number>(-1);
  const { scrollTo } = useLenis();

  // Responsive card spacing computation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardSpacing(340);
      } else if (window.innerWidth < 768) {
        setCardSpacing(440);
      } else if (window.innerWidth < 1024) {
        setCardSpacing(500);
      } else {
        setCardSpacing(540);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Framer Motion useScroll tied to the pinned 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to slide slots:
  // 0.00 -> 0.05: Intro Title screen
  // 0.05 -> 0.25: Slide into UK (slot 1)
  // 0.25 -> 0.46: Slide into Australia (slot 2)
  // 0.46 -> 0.67: Slide into Canada (slot 3)
  // 0.67 -> 0.88: Slide into USA (slot 4)
  // 0.88 -> 1.00: USA rests in center before smooth scroll unpin into rest of page
  const rawProgress = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.46, 0.67, 0.88, 1],
    [0, 0, 1, 2, 3, 4, 4]
  );

  // Smooth spring inertia for the scroll progress
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.2,
  });

  // Title animations based on smooth scroll progress:
  // 100% visible on first load (progress = 0), smoothly fades out and floats up
  const titleOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.45], [0, -45]);
  const titleScale = useTransform(smoothProgress, [0, 0.45], [1, 0.95]);
  const titlePointerEvents = useTransform(smoothProgress, (p) =>
    p < 0.25 ? "auto" : "none"
  );

  // Bottom HUD progress line
  const bottomLineScaleX = useTransform(
    smoothProgress,
    [0, DESTINATIONS.length],
    [0, 1]
  );

  // Track the continuous active slide index based on progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const slot = Math.round(latest);
    const newActiveIdx = slot <= 0 ? -1 : Math.min(DESTINATIONS.length - 1, slot - 1);

    if (newActiveIdx !== prevSlideRef.current) {
      if (newActiveIdx >= 0) {
        soundEngine.playCardSwoosh();
      }
      prevSlideRef.current = newActiveIdx;
      setActiveIdx(newActiveIdx);
    }
  });

  const currentDest =
    activeIdx >= 0 ? DESTINATIONS[activeIdx] : DESTINATIONS[0];

  // Smooth slide jump to a specific slot via page scroll
  const goToSlide = useCallback(
    (slotIndex: number) => {
      soundEngine.playCardSwoosh();
      if (!containerRef.current || typeof window === "undefined") return;

      const clampedSlot = Math.max(0, Math.min(DESTINATIONS.length, slotIndex));
      // Anchor points in scrollYProgress corresponding to [0, 1, 2, 3, 4]
      const slotScrollTargets = [0, 0.25, 0.46, 0.67, 0.88];
      const targetRatio = slotScrollTargets[clampedSlot] ?? 0;

      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollableDistance = Math.max(0, containerHeight - window.innerHeight);
      const targetScrollY = containerTop + targetRatio * scrollableDistance;

      scrollTo(targetScrollY);
    },
    [scrollTo]
  );

  const handlePrev = useCallback(() => {
    const currentSlot = activeIdx + 1;
    goToSlide(Math.max(0, currentSlot - 1));
  }, [activeIdx, goToSlide]);

  const handleNext = useCallback(() => {
    const currentSlot = activeIdx + 1;
    goToSlide(Math.min(DESTINATIONS.length, currentSlot + 1));
  }, [activeIdx, goToSlide]);

  // Click card: opens full 3D room experience with layoutId morph
  const handleCardClick = (dest: Destination, index: number) => {
    soundEngine.playZoomChime();
    goToSlide(index + 1);
    setIsContentExpanded(true);
  };

  // Keyboard navigation
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
      className="relative w-full h-[400vh] bg-[#05070c]"
    >
      {/* Pinned Sticky Chamber Viewport */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden select-none flex flex-col justify-between">
        {/* 1. SINGLE CONSISTENT CINEMATIC BACKGROUND (ALWAYS CONSTANT) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="w-full h-full bg-cover bg-center filter brightness-[0.38] contrast-125 saturate-105"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2400&q=85")`,
            }}
          />
          {/* Subtle Dark Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-black/45 to-[#05070c]/85" />
          <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(5,7,12,0.95)]" />
        </div>

        {/* 2. TOP HUD BAR: BRANDING & NAVIGATION */}
        <header className="relative z-20 pt-20 sm:pt-22 px-6 md:px-12 flex items-center justify-between">
          {/* Left Title with Vertical Yellow Bar */}
          <motion.div
            key={activeIdx >= 0 ? currentDest.slug : "intro"}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springDefault}
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => goToSlide(0)}
          >
            <div className="w-[3px] h-8 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)] mt-0.5 group-hover:scale-y-110 transition-transform" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg md:text-2xl tracking-wider uppercase text-white drop-shadow">
                  {activeIdx >= 0 ? currentDest.name : "GLOBAL ADMISSIONS"}
                </span>
                <span className="text-[10px] uppercase font-mono-tech px-2 py-0.5 rounded bg-white/10 text-amber-300 border border-amber-400/30">
                  {activeIdx >= 0 ? currentDest.code : "WORLD ODYSSEY"}
                </span>
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 tracking-widest font-mono-tech uppercase">
                {isContentExpanded
                  ? "EXPLORING UNIVERSITY DOSSIER"
                  : "GLOBAL STUDY ODYSSEY • OFFICIAL ADMISSIONS PORTAL"}
              </span>
            </div>
          </motion.div>

          {/* Right Navigation & Content Toggle */}
          <div className="flex items-center gap-2">
            {/* Destination Switcher Pills */}
            <div className="hidden sm:flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full border border-white/10">
              {DESTINATIONS.map((d, i) => (
                <button
                  key={d.slug}
                  onClick={() => goToSlide(i + 1)}
                  className={`px-3 py-1 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all duration-300 ${
                    activeIdx === i
                      ? "bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-105"
                      : "text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {d.shortName}
                </button>
              ))}
            </div>

            {/* Toggle In-Place Content View */}
            <button
              onClick={() => {
                if (activeIdx < 0) {
                  goToSlide(1);
                }
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
                  <span>OPEN ACADEMICS</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* 3. CENTER STAGE: CAROUSEL STAGE + FULLSCREEN 3D ROOM ON CLICK */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center py-2 px-4 overflow-visible">
          <div className="relative w-full flex flex-col items-center justify-center">
            {/* CINEMATIC TITLE ON FIRST LOAD: BACKGROUND + TITLE ONLY, NO SLIDES */}
            <motion.div
              style={{
                opacity: titleOpacity,
                y: titleY,
                scale: titleScale,
                pointerEvents: titlePointerEvents,
              }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-4 select-none"
            >
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto p-6 sm:p-12">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-mono-tech tracking-[0.28em] uppercase mb-5 backdrop-blur-md shadow-[0_0_25px_rgba(251,191,36,0.25)]">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>GLOBAL HIGHER EDUCATION ODYSSEY</span>
                </div>

                <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] leading-[1.05]">
                  Traverse World Universities
                </h1>

                <p className="mt-4 text-slate-200 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed font-mono-tech tracking-wider uppercase drop-shadow">
                  Collegiate Heritage • Russell Group • Ivy League • Group of Eight
                </p>

                <div className="mt-8 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-mono-tech shadow-lg animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="tracking-widest uppercase">SCROLL DOWN TO EXPLORE DESTINATIONS</span>
                </div>
              </div>
            </motion.div>

            {/* Horizontal Large Cards Stage */}
            <div className="relative w-full max-w-7xl h-[500px] sm:h-[550px] md:h-[590px] lg:h-[620px] flex items-center justify-center overflow-visible">
              {DESTINATIONS.map((dest, i) => (
                <DestinationCard
                  key={dest.slug}
                  dest={dest}
                  index={i}
                  smoothProgress={smoothProgress}
                  isActive={activeIdx === i}
                  onCardClick={handleCardClick}
                  cardSpacing={cardSpacing}
                />
              ))}
            </div>

            {/* Scroll Hint beneath the large cards */}
            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest">
                SCROLL TO GLIDE DESTINATIONS RIGHT TO LEFT • CONTINUE SCROLLING FOR ALL SECTIONS • CLICK CARD FOR 3D ROOM
              </span>
            </div>
          </div>

          {/* FULLSCREEN 3D ROOM MORPH (TIER 2 CSS 3D ROOM) */}
          <AnimatePresence>
            {isContentExpanded && (
              <DestinationRoom3D
                destination={currentDest}
                onClose={() => {
                  soundEngine.playCardSwoosh();
                  setIsContentExpanded(false);
                }}
                layoutId={'destination-card-' + currentDest.slug}
              />
            )}
          </AnimatePresence>
        </main>

        {/* 4. BOTTOM HUD TELEMETRY BAR */}
        <footer className="relative z-20 w-full px-6 md:px-12 py-4 border-t border-white/10 bg-black/75 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left HUD Controls & Telemetry Data */}
          <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (activeIdx < 0) goToSlide(1);
                  soundEngine.playClick();
                  setIsContentExpanded((prev) => !prev);
                }}
                className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.6)] active:scale-95 transition-all"
                title="Toggle Academic Dossier"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  goToSlide(0);
                }}
                className="w-8 h-8 rounded-full glass-pill text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
                title="Return to Intro Title"
              >
                <Activity className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/destinations"
                onClick={() => soundEngine.playClick()}
                className="w-8 h-8 rounded-full glass-pill text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
                title="Full University Matrix"
              >
                <Layers className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Telemetry Metric 1: Vector Campus Circuit SVG */}
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
                  {currentDest.stats.universities}+ CAMPUSES
                </div>
                <div className="text-[8px] sm:text-[9px] font-mono-tech uppercase text-slate-400">
                  GLOBAL QS CONSORTIUM
                </div>
              </div>
            </div>

            {/* Telemetry Metric 2: Visa Success Waveform SVG */}
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
                  {currentDest.stats.visaSuccessRate} VISA APPROVAL
                </div>
                <div className="text-[9px] font-mono-tech uppercase text-slate-400">
                  {currentDest.stats.intakesPerYear} ANNUAL INTAKES
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
                  style={{ backgroundImage: `url(${currentDest.cardImage})` }}
                />
              </div>
              <div>
                <div className="text-[9px] font-mono-tech uppercase text-white font-bold group-hover:text-amber-300">
                  CAMPUS VIBE 360°
                </div>
                <div className="text-[8px] font-mono-tech text-emerald-400">
                  CLICK TO TOGGLE DOSSIER
                </div>
              </div>
            </div>
          </div>

          {/* Right HUD Controls: Slide Counter & Chevrons */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-slate-300">
              <span className="text-amber-400 font-bold">
                {activeIdx >= 0
                  ? String(activeIdx + 1).padStart(2, "0")
                  : "INTRO"}
              </span>
              <span className="opacity-40">/</span>
              <span className="opacity-70">
                {String(DESTINATIONS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Dynamic Progress Line */}
            <div className="w-20 sm:w-28 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-400 w-full origin-left"
                style={{ scaleX: bottomLineScaleX }}
              />
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={activeIdx <= -1}
                className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Previous Destination"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIdx >= DESTINATIONS.length - 1}
                className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Next Destination"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};
