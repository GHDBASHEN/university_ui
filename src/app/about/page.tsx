"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import LogoSlider from "@/components/ui/LogoSlider";
import { PARTNER_LOGOS } from "@/data/partners";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Compass,
  Target,
  Sparkles,
  ArrowRight,
  Globe2,
} from "lucide-react";
import { springDefault, sectionViewport } from "@/lib/motion";

export default function AboutPage() {
  const leadership = [
    {
      name: "Dr. Alistair Sterling",
      role: "Founder & Chief Academic Officer",
      credentials: "M.Ed. Oxford • 22+ Years in International Education",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Sarah Jenkins, MBA",
      role: "Head of Global Admissions & Compliance",
      credentials: "Ex-British Council Specialist • ICEF Senior Fellow",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Marcus Vance",
      role: "Director of Visa Legalities & Relocation",
      credentials: "LL.B. Melbourne • Certified Migration Advisory Board",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springDefault}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-4"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>OUR STORY, PHILOSOPHY & ETHOS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springDefault, delay: 0.08 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
        >
          Bridging Ambition to World-Class Institutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springDefault, delay: 0.16 }}
          className="text-slate-300 text-sm sm:text-base mt-4 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Founded in 2014, AURA Global Education has transformed the study abroad consultancy model. We operate not as simple ticket-brokers, but as strategic academic navigators for scholars reaching for Russell Group, Australian Group of Eight, and Canadian U15 faculties.
        </motion.p>
      </section>

      {/* Mission & Vision Split */}
      <section className="relative z-10 py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={springDefault}
            className="glass-panel p-8 rounded-3xl border border-white/15"
          >
            <Target className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-display text-xl font-bold text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
              Democratize access to tier-one global tertiary institutions by providing ethical, transparent, and research-grade counseling with zero compromise on student career fit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ ...springDefault, delay: 0.08 }}
            className="glass-panel p-8 rounded-3xl border border-white/15"
          >
            <Globe2 className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="font-display text-xl font-bold text-white">Our Global Reach</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
              Direct recruitment partnerships across 200+ universities in the United Kingdom, Australia, and Canada, backed by regional counseling offices across Asia, the Middle East, and Europe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ ...springDefault, delay: 0.16 }}
            className="glass-panel p-8 rounded-3xl border border-white/15"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="font-display text-xl font-bold text-white">Ethical Standards</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
              Certified by ICEF, the British Council, and PIER Australia. Every application adheres strictly to international embassy compliance protocols with a 98% visa success metric.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Numbers */}
      <AchievementsSection />

      {/* Leadership Showcase */}
      <section className="relative z-10 py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={springDefault}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono-tech uppercase text-amber-400 tracking-widest">
            DIRECTORS & SENIOR ADVISORS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            Guided by Proven Academic Mentors
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport}
              transition={{ ...springDefault, delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-3xl border border-white/15 flex flex-col items-center text-center group hover:border-amber-400/40 transition-all shadow-xl"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-amber-400 transition-colors mb-4">
                <img
                  src={leader.avatar}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                {leader.name}
              </h3>
              <p className="text-xs font-mono-tech text-amber-400 mt-1 uppercase">
                {leader.role}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                {leader.credentials}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* University Partners Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={springDefault}
        className="relative z-10 py-16 border-t border-white/10 bg-black/40"
      >
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400">
            OFFICIAL ADMISSIONS PARTNERS
          </span>
        </div>
        <LogoSlider logos={PARTNER_LOGOS} />
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={springDefault}
        className="relative z-10 py-20 px-6 md:px-12 max-w-5xl mx-auto text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Ready to Discuss Your Study Abroad Future?
        </h2>
        <p className="text-slate-300 text-sm mt-3 max-w-xl mx-auto font-light">
          Book an obligation-free counseling session with our senior university specialists today.
        </p>

        <div className="mt-8">
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold font-mono-tech text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>BOOK FREE CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      <ChatBot />
      <Footer />
    </div>
  );
}

