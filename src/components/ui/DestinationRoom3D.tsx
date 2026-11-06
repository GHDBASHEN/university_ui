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

// Curated high-resolution 3D layer maps for CSS 3D Room depth planes
interface DestinationLayers {
  skyLayer: string;
  midLayer: string;
  focalLayer: string;
  fgLayer: string;
  accentGlow: string;
  coordinates: string;
  timezone: string;
}

const DESTINATION_3D_LAYERS: Record<string, DestinationLayers> = {
  "united-kingdom": {
    skyLayer: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=80",
    midLayer: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=2000&q=80",
    focalLayer: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2400&q=85",
    fgLayer: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1600&q=80",
    accentGlow: "rgba(59, 130, 246, 0.35)",
    coordinates: "51.7520° N, 1.2577° W (Oxford)",
    timezone: "GMT / UTC+0",
  },
  australia: {
    skyLayer: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    midLayer: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80",
    focalLayer: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2400&q=85",
    fgLayer: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
    accentGlow: "rgba(245, 158, 11, 0.4)",
    coordinates: "33.8688° S, 151.2093° E (Sydney)",
    timezone: "AEST / UTC+10",
  },
  canada: {
    skyLayer: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2400&q=80",
    midLayer: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2000&q=80",
    focalLayer: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2400&q=85",
    fgLayer: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80",
    accentGlow: "rgba(239, 68, 68, 0.35)",
    coordinates: "43.6629° N, 79.3957° W (Toronto)",
    timezone: "EST / UTC-5",
  },
  "united-states": {
    skyLayer: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2400&q=80",
    midLayer: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=80",
    focalLayer: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=85",
    fgLayer: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1600&q=80",
    accentGlow: "rgba(168, 85, 247, 0.35)",
    coordinates: "42.3770° N, 71.1167° W (Cambridge)",
    timezone: "EST / UTC-5",
  },
};

// Preload helper so clicking feels instantaneous without texture loading lag
export function preloadDestinationRoom(dest: Destination) {
  if (typeof window === "undefined") return;
  const layers = DESTINATION_3D_LAYERS[dest.slug];
  if (!layers) return;

  const urls = [layers.skyLayer, layers.midLayer, layers.focalLayer, layers.fgLayer, dest.heroImage, dest.cardImage];
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
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
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);

  // Parallax translation offsets per layer
  const bgTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const bgTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const midTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [55, -55]);
  const midTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [35, -35]);

  const focalTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [75, -75]);
  const focalTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [45, -45]);

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

  const layers = DESTINATION_3D_LAYERS[destination.slug] || {
    skyLayer: destination.heroImage,
    midLayer: destination.cardImage,
    focalLayer: destination.heroImage,
    fgLayer: destination.cardImage,
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
          TIER 2: CSS 3D ROOM (3–5 LAYERED PLANES ON TRANSLATE-Z)
          ===================================================================== */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transformStyle: reducedMotion ? "flat" : "preserve-3d",
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
      >
        {/* Layer 1: Deep Sky & Horizon (translateZ: -280px, scale: 1.45) */}
        <motion.div
          className="absolute inset-[-15%] bg-cover bg-center filter brightness-50 contrast-125"
          style={{
            backgroundImage: `url(${layers.skyLayer})`,
            transform: reducedMotion ? "none" : "translateZ(-280px) scale(1.45)",
            x: reducedMotion ? 0 : bgTranslateX,
            y: reducedMotion ? 0 : bgTranslateY,
          }}
        />

        {/* Ambient Dark Room Fog & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-black/40 to-[#04060A]/80 pointer-events-none" />

        {/* Layer 2: Midground Architectural Panorama (translateZ: -140px, scale: 1.25) */}
        {!reducedMotion && (
          <motion.div
            className="absolute inset-[-10%] bg-cover bg-center opacity-65 mix-blend-screen filter saturate-125 brightness-90"
            style={{
              backgroundImage: `url(${layers.midLayer})`,
              transform: "translateZ(-140px) scale(1.25)",
              x: midTranslateX,
              y: midTranslateY,
            }}
          />
        )}

        {/* Layer 3: Focal Architectural Landmark Quad (translateZ: 0px, scale: 1.05) */}
        <motion.div
          className="absolute inset-[-5%] bg-cover bg-center opacity-45 mix-blend-screen filter contrast-125 brightness-85"
          style={{
            backgroundImage: `url(${layers.focalLayer})`,
            transform: reducedMotion ? "none" : "translateZ(0px) scale(1.05)",
            x: reducedMotion ? 0 : focalTranslateX,
            y: reducedMotion ? 0 : focalTranslateY,
          }}
        />

        {/* Layer 4: Dynamic Specular Beam & Atmosphere Glow (translateZ: +90px) */}
        {!reducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-all duration-300"
            style={{
              transform: "translateZ(90px)",
              background: `radial-gradient(circle at ${lightX} ${lightY}, ${layers.accentGlow} 0%, rgba(251,191,36,0.15) 30%, transparent 70%)`,
            }}
          />
        )}

        {/* Layer 5: Foreground Architectural Framing (translateZ: +180px) */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none shadow-[inset_0_0_180px_rgba(4,6,10,0.95)]"
            style={{
              transform: "translateZ(180px)",
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
              <span>{layers.coordinates}</span>
              <span>•</span>
              <span className="text-cyan-400">{layers.timezone}</span>
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
