"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Destination } from "@/data/destinations";
import { soundEngine } from "@/components/shared/SoundEngine";
import { useReducedMotionPreference } from "@/context/MotionContext";
import { springDefault } from "@/lib/motion";
import Link from "next/link";
import {
  X,
  Sparkles,
  ArrowRight,
  MapPin,
  Maximize2,
  Minimize2,
} from "lucide-react";

// Curated crystal-clear high-definition destination scene data
interface DestinationSceneData {
  backgroundImage: string;
  accentGlow: string;
  coordinates: string;
  timezone: string;
}

const DESTINATION_SCENE_DATA: Record<string, DestinationSceneData> = {
  "united-kingdom": {
    // Ultra high-res Westminster & Big Ben on the Thames at dusk - crisp, unmistakable British landmark
    backgroundImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2560&q=90",
    accentGlow: "rgba(59, 130, 246, 0.45)",
    coordinates: "51.5007° N, 0.1246° W (London / Oxford)",
    timezone: "GMT / UTC+0",
  },
  australia: {
    // Ultra high-res Sydney Harbour & iconic Opera House under clear Australian sky
    backgroundImage:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2560&q=90",
    accentGlow: "rgba(245, 158, 11, 0.45)",
    coordinates: "33.8568° S, 151.2153° E (Sydney / Melbourne)",
    timezone: "AEST / UTC+10",
  },
  canada: {
    // Pristine high-res turquoise glacial waters and peaks of Banff / Moraine Lake
    backgroundImage:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2560&q=90",
    accentGlow: "rgba(239, 68, 68, 0.45)",
    coordinates: "43.6629° N, 79.3957° W (Toronto / Vancouver)",
    timezone: "EST / UTC-5",
  },
  "united-states": {
    // Historic Harvard Yard collegiate quad architecture with lush green lawns
    backgroundImage:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2560&q=90",
    accentGlow: "rgba(168, 85, 247, 0.45)",
    coordinates: "42.3770° N, 71.1167° W (Cambridge / Boston)",
    timezone: "EST / UTC-5",
  },
};

// Preload helper so clicking feels instantaneous without texture loading lag
export function preloadDestinationRoom(dest: Destination) {
  if (typeof window === "undefined") return;
  const scene = DESTINATION_SCENE_DATA[dest.slug];
  const url = scene?.backgroundImage || dest.heroImage || dest.cardImage;
  if (url) {
    const img = new Image();
    img.src = url;
  }
}

interface DestinationRoom3DProps {
  destination: Destination;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  layoutId?: string;
}

export const DestinationRoom3D: React.FC<DestinationRoom3DProps> = ({
  destination,
  onClose,
  triggerRef,
  layoutId = `destination-card-${destination.slug}`,
}) => {
  const { reducedMotion } = useReducedMotionPreference();
  const roomRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "universities" | "telemetry">("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mouse normalized coordinates: -0.5 to 0.5
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth spring physics for mouse-directed 3D room rotation
  const springConfig = { stiffness: 120, damping: 22, mass: 0.6 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // CSS 3D Room rotational tilts
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);

  // Parallax translation offsets per layer
  const bgTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [25, -25]);
  const bgTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [16, -16]);

  const midTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [45, -45]);
  const midTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [28, -28]);

  // Specular light coordinates
  const lightX = useTransform(smoothMouseX, [-0.5, 0.5], ["30%", "70%"]);
  const lightY = useTransform(smoothMouseY, [-0.5, 0.5], ["30%", "70%"]);

  // Mouse movement handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = roomRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawMouseX.set(x);
      rawMouseY.set(y);
    },
    [rawMouseX, rawMouseY, reducedMotion]
  );

  // Lock body scroll while 3D room is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard accessibility: Escape to close and focus restoration
  useEffect(() => {
    // Focus the close button when opened
    closeBtnRef.current?.focus();
    const triggerElem = triggerRef?.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        soundEngine.playCardSwoosh();
        onClose();
        triggerElem?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      triggerElem?.focus();
    };
  }, [onClose, triggerRef]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      roomRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const scene = DESTINATION_SCENE_DATA[destination.slug] || {
    backgroundImage: destination.heroImage || destination.cardImage,
    accentGlow: destination.accentColor,
    coordinates: "45.0000° N, 0.0000° E",
    timezone: "UTC",
  };

  return (
    <motion.div
      ref={roomRef}
      layoutId={layoutId}
      transition={springDefault}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden bg-[#04060A] text-slate-100 select-none flex flex-col justify-between"
      style={{
        perspective: reducedMotion ? "none" : 1200,
      }}
    >
      {/* =====================================================================
          TIER 2: CSS 3D ROOM (SINGLE CRYSTAL-CLEAR SCENE WITH 3D DEPTH)
          ===================================================================== */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transformStyle: reducedMotion ? "flat" : "preserve-3d",
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
      >
        {/* 1. Crystal-Clear Single High-Resolution Destination Background Image */}
        <motion.div
          className="absolute inset-[-12%] bg-cover bg-center filter brightness-[0.72] contrast-[1.08] saturate-[1.12]"
          style={{
            backgroundImage: `url(${scene.backgroundImage})`,
            transform: reducedMotion ? "none" : "translateZ(-80px) scale(1.18)",
            x: reducedMotion ? 0 : bgTranslateX,
            y: reducedMotion ? 0 : bgTranslateY,
          }}
        />

        {/* 2. Soft Atmospheric Depth Vignette (Ensures HUD & Card Readability without Washing Out Photo) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/90 via-transparent to-[#04060A]/75 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(4,6,10,0.8)] pointer-events-none" />

        {/* 3. Subtle Cyber-Spatial Coordinate Grid Layer (Floats on translateZ: -20px) */}
        {!reducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:28px_28px]"
            style={{
              transform: "translateZ(-20px)",
              x: midTranslateX,
              y: midTranslateY,
            }}
          />
        )}

        {/* 4. Mouse-Directed Specular Light Beam (Floats on translateZ: +40px) */}
        {!reducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-all duration-300"
            style={{
              transform: "translateZ(40px)",
              background: `radial-gradient(circle at ${lightX} ${lightY}, ${scene.accentGlow} 0%, rgba(251,191,36,0.12) 30%, transparent 65%)`,
            }}
          />
        )}
      </motion.div>

      {/* =====================================================================
          HUD HEADER: BRANDING, ESCAPE INSTRUCTION & CONTROLS
          ===================================================================== */}
      <header className="relative z-30 pt-6 sm:pt-8 px-6 md:px-12 flex items-center justify-between">
        {/* Left Telemetry Stamp */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-9 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl drop-shadow">{destination.flagEmoji}</span>
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wider uppercase">
                {destination.name}
              </span>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                3D SPATIAL ROOM
              </span>
            </div>
            <div className="text-[10px] font-mono-tech text-slate-400 tracking-widest uppercase flex items-center gap-2 mt-0.5">
              <span>{scene.coordinates}</span>
              <span>•</span>
              <span className="text-cyan-400">{scene.timezone}</span>
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-white/20 text-xs font-mono-tech text-slate-300 hover:text-white hover:border-amber-400/50 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isFullscreen ? "EXIT FULL" : "FULLSCREEN"}</span>
          </button>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => {
              soundEngine.playCardSwoosh();
              onClose();
              triggerRef?.current?.focus();
            }}
            aria-label="Close 3D Space (Esc)"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white font-mono-tech text-xs tracking-wider uppercase border border-white/20 hover:border-amber-400 transition-all shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>CLOSE</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-black/40 rounded border border-white/20 group-hover:border-black/30">
              ESC
            </kbd>
            <X size={15} />
          </button>
        </div>
      </header>

      {/* =====================================================================
          MAIN INTERACTIVE DOSSIER STAGE
          ===================================================================== */}
      <main className="relative z-30 flex-1 flex flex-col justify-center max-w-5xl mx-auto px-6 py-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springDefault, delay: 0.1 }}
          className="glass-card-active rounded-3xl p-6 sm:p-10 border border-amber-400/40 relative overflow-hidden shadow-2xl backdrop-blur-2xl"
        >
          {/* Subtle Ambient Orb */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ backgroundColor: destination.accentColor }}
          />

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("overview");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all ${
                activeTab === "overview"
                  ? "bg-amber-400 text-black font-bold shadow-md"
                  : "glass-pill text-slate-300 hover:text-white"
              }`}
            >
              Overview & Scope
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("universities");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all ${
                activeTab === "universities"
                  ? "bg-amber-400 text-black font-bold shadow-md"
                  : "glass-pill text-slate-300 hover:text-white"
              }`}
            >
              Universities ({destination.universities.length})
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("telemetry");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all ${
                activeTab === "telemetry"
                  ? "bg-amber-400 text-black font-bold shadow-md"
                  : "glass-pill text-slate-300 hover:text-white"
              }`}
            >
              Visa & Living Stats
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springDefault}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-mono-tech uppercase tracking-wider mb-2">
                <Sparkles size={13} className="text-amber-400" />
                <span>{destination.tagline}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                {destination.grandTitle}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base mt-3 leading-relaxed font-light max-w-3xl">
                {destination.description}
              </p>

              {/* Fast Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-xs font-mono-tech">
                <div className="glass-panel p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase">Universities</span>
                  <p className="text-white font-bold text-sm sm:text-base mt-0.5">{destination.stats.universities}+ Campuses</p>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase">Visa Approval</span>
                  <p className="text-emerald-400 font-bold text-sm sm:text-base mt-0.5">{destination.stats.visaSuccessRate}</p>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase">Avg. Tuition</span>
                  <p className="text-amber-300 font-bold text-xs sm:text-sm mt-1 truncate">{destination.stats.averageTuition.split("–")[0]}</p>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase">Work Rights</span>
                  <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1 truncate">{destination.lifestyle.workRights.split(",")[0]}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: UNIVERSITIES LIST */}
          {activeTab === "universities" && (
            <motion.div
              key="universities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springDefault}
              className="space-y-3 max-h-[42vh] overflow-y-auto pr-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.universities.map((uni) => (
                  <div
                    key={uni.name}
                    className="p-3.5 rounded-2xl glass-panel border border-white/15 hover:border-amber-400/50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-display font-bold text-white text-sm sm:text-base">
                        {uni.name}
                      </h4>
                      <div className="text-[11px] font-mono-tech text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin size={12} className="text-amber-400" />
                        <span>{uni.location}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-tech text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20 shrink-0">
                      {uni.ranking}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: TELEMETRY & LIVING */}
          {activeTab === "telemetry" && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springDefault}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-tech"
            >
              <div className="glass-panel p-4 rounded-2xl border border-white/10">
                <span className="text-amber-400 uppercase tracking-widest text-[10px]">Living Reality</span>
                <p className="text-white text-sm mt-1">{destination.lifestyle.costOfLiving}</p>
                <p className="text-slate-400 mt-2 text-xs font-sans">{destination.lifestyle.culture}</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10">
                <span className="text-cyan-400 uppercase tracking-widest text-[10px]">Climate & Environment</span>
                <p className="text-white text-sm mt-1">{destination.lifestyle.climate}</p>
                <p className="text-slate-400 mt-2 text-xs font-sans">
                  Intakes per year: <span className="text-amber-400 font-bold">{destination.stats.intakesPerYear} sessions</span> (Autumn & Spring).
                </p>
              </div>
            </motion.div>
          )}

          {/* Bottom Action Footer inside Dossier */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-mono-tech text-center sm:text-left">
              Move cursor across the room to inspect 3D perspective layers.
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/destinations/${destination.slug}`}
                onClick={() => soundEngine.playClick()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl glass-panel border border-white/20 text-white font-mono-tech text-xs uppercase tracking-wider hover:border-amber-400/50 hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>OPEN FULL COUNTRY PAGE</span>
                <ArrowRight size={14} className="text-amber-400" />
              </Link>

              <Link
                href="/appointments"
                onClick={() => soundEngine.playClick()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold font-mono-tech text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:scale-105 active:scale-95 transition-all text-center"
              >
                APPLY FOR INTAKE
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* =====================================================================
          BOTTOM HUD TELEMETRY BAR
          ===================================================================== */}
      <footer className="relative z-30 pb-6 px-6 md:px-12 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            3D ROOM LIVE
          </span>
          <span className="hidden sm:inline">SCHOLARSHIPS: {destination.stats.scholarshipsAvailable}+ LISTED</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-500 hidden md:inline">AURA GLOBAL EDUCATION ARCHITECTURE</span>
          <button
            type="button"
            onClick={() => {
              soundEngine.playCardSwoosh();
              onClose();
              triggerRef?.current?.focus();
            }}
            className="text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center gap-1"
          >
            <span>RETURN TO CARDS</span>
            <X size={13} />
          </button>
        </div>
      </footer>
    </motion.div>
  );
};

export default DestinationRoom3D;
