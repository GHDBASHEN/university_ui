"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { HeroSection } from "@/components/home/HeroSection";
import { DestinationsPreview } from "@/components/home/DestinationsPreview";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import LogoSlider from "@/components/ui/LogoSlider";
import TestimonialSlider from "@/components/ui/TestimonialSlider";
import { PARTNER_LOGOS } from "@/data/partners";
import { TESTIMONIALS } from "@/data/testimonials";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
import { springDefault, sectionViewport } from "@/lib/motion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-x-clip">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Main Hero Stage with Video VR-Zoom */}
      <HeroSection />

      {/* 2. Partner Universities Infinite Marquee */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={springDefault}
        className="relative z-10 py-12 border-y border-white/10 bg-black/40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400">
            OFFICIAL ADMISSIONS PARTNERS WITH 200+ GLOBAL UNIVERSITIES
          </span>
        </div>
        <LogoSlider logos={PARTNER_LOGOS} />
      </motion.section>

      {/* 3. Study Abroad Destinations (UK, Australia, Canada with VR Zoom) */}
      <DestinationsPreview />

      {/* 4. Numbers & Achievements Animated Decoder */}
      <AchievementsSection />

      {/* 5. Student Testimonials Slider */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={springDefault}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AUTHENTIC SCHOLAR VOICES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ ...springDefault, delay: 0.08 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Stories of Global Transformation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ ...springDefault, delay: 0.16 }}
            className="text-slate-300 text-sm sm:text-base mt-4 font-light text-balance"
          >
            Hear from scholars who journeyed from initial consultation to graduation day across our top partner faculties.
          </motion.p>
        </div>

        <TestimonialSlider testimonials={TESTIMONIALS} />
      </section>

      {/* 6. Quick Interactive Banner / Call-to-Action to Events & Appointments */}
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={springDefault}
        className="relative z-10 py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="glass-card-active rounded-3xl p-8 sm:p-14 border border-amber-400/40 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono-tech uppercase text-amber-300 tracking-widest bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              FREE ADMISSIONS COUNSELING 2026
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Ready to Craft Your International Academic Pathway?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-light">
              Book a 1-on-1 session with our senior visa & scholarship advisors. Get complete university profile assessments, financial aid reviews, and pre-departure briefings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href="/appointments"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold font-mono-tech text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all text-center"
            >
              BOOK FREE APPOINTMENT
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel border border-white/20 text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider hover:border-amber-400/50 hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>UPCOMING FAIRS</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Global Chatbot Floating Assistant */}
      <ChatBot />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

