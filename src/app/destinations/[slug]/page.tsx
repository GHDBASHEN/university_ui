"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { DESTINATIONS, Destination } from "@/data/destinations";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  DollarSign,
  Award,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sun,
  Briefcase,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  const [selectedUni, setSelectedUni] = useState(destination ? destination.universities[0] : null);

  if (!destination) {
    return notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-x-hidden">
      <Navbar />

      {/* 1. Immersive Country-Vibe Hero Banner */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Dynamic Country Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50 contrast-125"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        />

        {/* Dynamic Ambient Gradient according to country accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${destination.accentColor}35 0%, transparent 75%)`,
          }}
        />

        {/* Dark Vignette & Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-black/40 to-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-white/20 text-xs font-mono-tech uppercase tracking-widest mb-6"
          >
            <span className="text-xl">{destination.flagEmoji}</span>
            <span className="text-white font-bold">{destination.name}</span>
            <span className="w-1 h-3 bg-white/30" />
            <span className="text-amber-400">OFFICIAL DESTINATION PORTAL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight"
          >
            {destination.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-amber-300 font-mono-tech text-base sm:text-xl uppercase tracking-wider mt-3"
          >
            {destination.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-200 text-sm sm:text-base mt-4 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {destination.description}
          </motion.p>

          {/* Quick Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/appointments"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold font-mono-tech text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>APPLY FOR {destination.shortName} INTAKE</span>
            </Link>

            <a
              href="#universities"
              className="px-6 py-3.5 rounded-xl glass-panel border border-white/20 text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider hover:border-amber-400/50 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>VIEW {destination.universities.length} PARTNER UNIVERSITIES</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Key Country Metrics Bar */}
      <section className="relative z-10 py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <div className="text-[10px] font-mono-tech uppercase text-slate-400">Total Universities</div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {destination.stats.universities}+
            </div>
            <div className="text-[10px] text-cyan-400 font-mono-tech mt-1">Russell / Go8 / U15</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <div className="text-[10px] font-mono-tech uppercase text-slate-400">Intakes Available</div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
              {destination.stats.intakesPerYear} / Year
            </div>
            <div className="text-[10px] text-slate-400 font-mono-tech mt-1">Autumn & Spring</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <div className="text-[10px] font-mono-tech uppercase text-slate-400">Visa Success Rate</div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {destination.stats.visaSuccessRate}
            </div>
            <div className="text-[10px] text-emerald-300 font-mono-tech mt-1">High Approval Ratio</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <div className="text-[10px] font-mono-tech uppercase text-slate-400">Average Annual Tuition</div>
            <div className="font-display text-lg sm:text-xl font-bold text-white mt-2 truncate">
              {destination.stats.averageTuition}
            </div>
            <div className="text-[10px] text-slate-400 font-mono-tech mt-1">Undergrad & Postgrad</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 col-span-2 lg:col-span-1">
            <div className="text-[10px] font-mono-tech uppercase text-slate-400">Scholarships Listed</div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-purple-400 mt-1">
              {destination.stats.scholarshipsAvailable}+
            </div>
            <div className="text-[10px] text-purple-300 font-mono-tech mt-1">Partial & Full Grants</div>
          </div>
        </div>
      </section>

      {/* 3. Lifestyle, Work Rights & Culture Matrix */}
      <section className="relative z-10 py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono-tech uppercase text-amber-400 tracking-widest">
            {destination.shortName} LIVING REALITY
          </span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">
            Student Life & Career Mobility
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Sun className="w-5 h-5 text-amber-400 mb-3" />
            <div className="text-xs font-mono-tech uppercase text-slate-400">Climate & Weather</div>
            <div className="text-sm font-semibold text-white mt-1">{destination.lifestyle.climate}</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Briefcase className="w-5 h-5 text-cyan-400 mb-3" />
            <div className="text-xs font-mono-tech uppercase text-slate-400">Post-Study Work Rights</div>
            <div className="text-sm font-semibold text-white mt-1">{destination.lifestyle.workRights}</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <DollarSign className="w-5 h-5 text-emerald-400 mb-3" />
            <div className="text-xs font-mono-tech uppercase text-slate-400">Monthly Cost of Living</div>
            <div className="text-sm font-semibold text-white mt-1">{destination.lifestyle.costOfLiving}</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Award className="w-5 h-5 text-purple-400 mb-3" />
            <div className="text-xs font-mono-tech uppercase text-slate-400">Culture & Environment</div>
            <div className="text-sm font-semibold text-white mt-1">{destination.lifestyle.culture}</div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Universities List / Details */}
      <section id="universities" className="relative z-10 py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono-tech uppercase text-cyan-400 tracking-widest bg-cyan-400/10 border border-cyan-400/30 px-3.5 py-1 rounded-full">
            AFFILIATED INSTITUTIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">
            Premier Universities in {destination.name}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Select any university below to inspect courses, national rankings, and admission requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Universities List Column */}
          <div className="lg:col-span-5 space-y-3">
            {destination.universities.map((uni) => {
              const isSelected = selectedUni?.name === uni.name;
              return (
                <div
                  key={uni.name}
                  onClick={() => setSelectedUni(uni)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? "glass-card-active border-amber-400/60 bg-amber-400/10 shadow-[0_10px_25px_rgba(251,191,36,0.15)]"
                      : "glass-panel border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-white text-base">
                        {uni.name}
                      </div>
                      <div className="text-xs font-mono-tech text-slate-400 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{uni.location}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono-tech uppercase px-2.5 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/10">
                      {uni.ranking}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* University Detail View Card */}
          <div className="lg:col-span-7">
            {selectedUni && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="flex items-start justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest">
                      SELECTED INSTITUTION
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                      {selectedUni.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono-tech mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedUni.location}, {destination.name}</span>
                      <span>•</span>
                      <span className="text-cyan-300 font-semibold">{selectedUni.ranking}</span>
                    </p>
                  </div>

                  <Link
                    href="/appointments"
                    className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-amber-400 text-black font-bold font-mono-tech text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors"
                  >
                    APPLY HERE
                  </Link>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-mono-tech uppercase text-slate-300 tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>FLAGSHIP DEGREE PROGRAMS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedUni.programs.map((prog) => (
                      <div
                        key={prog}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{prog}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 font-mono-tech text-center sm:text-left">
                    Intakes for 2026 are actively reviewing dossiers.
                  </div>

                  <Link
                    href="/appointments"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold font-mono-tech text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                  >
                    <span>SCHEDULE ADVISING CALL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
}

