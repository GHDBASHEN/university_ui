"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { DESTINATIONS, Destination } from "@/data/destinations";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { springDefault, sectionViewport } from "@/lib/motion";

export default function DestinationsPage() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All"
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.shortName === filter);

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-x-hidden">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springDefault}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-4"
        >
          <Plane className="w-3.5 h-3.5 text-amber-400" />
          <span>STUDY ABROAD DESTINATIONS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springDefault, delay: 0.08 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
        >
          Explore Countries & Universities
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springDefault, delay: 0.16 }}
          className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Select a premier destination below to immerse yourself in its university network, post-study work rights, cost of living, and visa processes.
        </motion.p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {["All", "UK", "AUS", "CAN"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all ${
                filter === tab
                  ? "bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                  : "glass-pill text-slate-300 hover:text-white border-white/10"
              }`}
            >
              {tab === "All" ? "All Countries" : tab}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="relative z-10 pb-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((dest: Destination, idx: number) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport}
              transition={{ ...springDefault, delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/15 flex flex-col justify-between group hover:border-amber-400/50 transition-all shadow-2xl"
            >
              {/* Image with zoom */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                  style={{ backgroundImage: `url(${dest.heroImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="text-3xl drop-shadow">{dest.flagEmoji}</span>
                  <span className="font-mono-tech text-xs uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {dest.shortName}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {dest.stats.visaSuccessRate} VISA RATE
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h2>
                  <p className="text-xs text-amber-400 font-mono-tech mt-0.5 uppercase tracking-wider">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed font-light line-clamp-3">
                    {dest.description}
                  </p>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-3 mt-5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono-tech">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Universities</div>
                      <div className="text-white font-semibold">{dest.stats.universities}+ Campuses</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Intakes / Year</div>
                      <div className="text-white font-semibold">{dest.stats.intakesPerYear} Intakes</div>
                    </div>
                  </div>

                  {/* Sample Universities */}
                  <div className="mt-4">
                    <div className="text-[10px] font-mono-tech uppercase text-slate-400 mb-2">
                      FEATURED INSTITUTIONS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.universities.slice(0, 3).map((u) => (
                        <span
                          key={u.name}
                          className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                        >
                          {u.name}
                        </span>
                      ))}
                      {dest.universities.length > 3 && (
                        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-amber-400/10 text-amber-300">
                          +{dest.universities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold font-mono-tech text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all"
                  >
                    <span>ENTER {dest.shortName} DESTINATION VIBE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
}

