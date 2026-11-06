"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { EVENTS, Event } from "@/data/events";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Ticket,
} from "lucide-react";
import { springDefault, sectionViewport } from "@/lib/motion";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = activeTab === "all"
    ? EVENTS
    : EVENTS.filter((e) => e.type === activeTab);

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-x-hidden">
      <Navbar />

      <section className="relative pt-36 pb-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springDefault}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-4"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>GLOBAL ADMISSIONS FAIRS & WEBINARS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springDefault, delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            Connect With University Deans
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springDefault, delay: 0.16 }}
            className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Meet international university admissions directors face-to-face. Attend scholarship evaluation workshops, visa seminars, and live virtual interactive briefings.
          </motion.p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All Events" },
              { id: "fair", label: "Education Fairs" },
              { id: "webinar", label: "Virtual Webinars" },
              { id: "workshop", label: "Visa Workshops" },
              { id: "seminar", label: "Pre-Departure Seminars" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                    : "glass-pill text-slate-300 hover:text-white border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item: Event, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport}
              transition={{ ...springDefault, delay: idx * 0.08 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/15 flex flex-col justify-between group hover:border-amber-400/40 transition-all shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono-tech uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {item.type}
                  </span>
                </div>

                {item.isUpcoming && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      REGISTRATION OPEN
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-300 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-tech mt-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-slate-400 uppercase">
                    Free Entry
                  </span>

                  <a
                    href="/appointments"
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold font-mono-tech text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>REGISTER PASS</span>
                  </a>
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

