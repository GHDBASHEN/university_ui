"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DESTINATIONS, Destination } from "@/data/destinations";
import { soundEngine } from "@/components/shared/SoundEngine";
import { ArrowRight, MapPin, Sparkles, Building2, CheckCircle2 } from "lucide-react";

export const DestinationsPreview: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-3.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GLOBAL STUDY DESTINATIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Choose Your Horizon. Dive Inside.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light"
          >
            Click any destination to experience an immersive VR-style transition into that country&apos;s educational ecosystem, universities, and student lifestyle.
          </motion.p>
        </div>

        <Link
          href="/destinations"
          className="self-start md:self-end px-5 py-2.5 rounded-full glass-panel border border-white/20 text-slate-200 hover:text-white hover:border-amber-400 font-mono-tech text-xs uppercase tracking-wider transition-all flex items-center gap-2 group shadow-lg"
        >
          <span>ALL DESTINATIONS</span>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3 Main Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {DESTINATIONS.map((dest: Destination, idx: number) => {
          const isHovered = hoveredIdx === idx;
          return (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              onHoverStart={() => {
                soundEngine.playCardSwoosh();
                setHoveredIdx(idx);
              }}
              onHoverEnd={() => setHoveredIdx(null)}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/destinations/${dest.slug}`}
                onClick={() => soundEngine.playZoomChime()}
                className="group block relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden glass-card cursor-pointer border border-white/15 transition-all duration-500 hover:border-amber-400/50 shadow-2xl"
              >
                {/* Background Image with VR-style Zoom Scale */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.15 : 1.02,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${dest.heroImage})` }}
                />

                {/* Atmospheric Dark Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30 group-hover:via-black/35 transition-all duration-500" />

                {/* Country Accent Ambient Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 80%, ${dest.accentColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Top Badge: Country Flag & Short Name */}
                <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl drop-shadow-md">{dest.flagEmoji}</span>
                    <span className="font-mono-tech text-xs uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white tracking-widest">
                      {dest.shortName}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono-tech text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {dest.stats.visaSuccessRate} VISA RATE
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10 flex flex-col justify-end">
                  <span className="text-xs font-mono-tech uppercase text-amber-400 tracking-widest">
                    DESTINATION {idx + 1}
                  </span>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1 group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 mt-2 font-light line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-mono-tech">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{dest.stats.universities}+ Top Ranked Universities</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-mono-tech">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Avg Tuition: {dest.stats.averageTuition}</span>
                    </div>
                  </div>

                  {/* CTA Button Bar */}
                  <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <MapPin className="w-3.5 h-3.5" />
                      ENTER {dest.shortName} VIBE
                    </span>

                    <div className="w-8 h-8 rounded-full bg-amber-400/20 group-hover:bg-amber-400 text-amber-400 group-hover:text-black flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Subtle top edge specular highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DestinationsPreview;
