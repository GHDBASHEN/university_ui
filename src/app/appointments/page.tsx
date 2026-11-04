"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { DESTINATIONS } from "@/data/destinations";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Globe2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function AppointmentsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "United Kingdom",
    studyLevel: "Postgraduate (Master's / Ph.D.)",
    preferredDate: "",
    preferredTime: "10:00 AM - 11:00 AM",
    counselingMode: "Online Video Call (Zoom / Google Meet)",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FBBF24", "#38BDF8", "#34D399", "#C084FC"],
    });
  };

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-x-hidden">
      <Navbar />

      <section className="relative pt-36 pb-28 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-4"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>1-ON-1 ADVISORY SESSION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            Book Free Consultation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-light"
          >
            Schedule a dedicated 45-minute strategic session with our certified counselors. Receive tailored university shortlists, scholarship roadmaps, and visa guidance.
          </motion.p>
        </div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 sm:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Accent Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Maya S. Perera"
                      className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@example.com"
                      className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+94 77 123 4567"
                      className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Target Destination *
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="Australia">Australia (AUS)</option>
                      <option value="Canada">Canada (CAN)</option>
                      <option value="Multiple / Undecided">Multiple / Undecided</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Study Level & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Intended Study Level
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.studyLevel}
                      onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Undergraduate (Bachelor's)">Undergraduate (Bachelor&apos;s)</option>
                      <option value="Postgraduate (Master's / Ph.D.)">Postgraduate (Master&apos;s / Ph.D.)</option>
                      <option value="Diploma / Pathway Course">Diploma / Pathway Course</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Session Mode
                  </label>
                  <select
                    value={formData.counselingMode}
                    onChange={(e) => setFormData({ ...formData, counselingMode: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Online Video Call (Zoom / Google Meet)">Online Video Call (Zoom / Google Meet)</option>
                    <option value="In-Person at Main City Office">In-Person at Main Office</option>
                    <option value="Phone Consultation">Phone Consultation</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="04:30 PM - 05:30 PM">04:30 PM - 05:30 PM</option>
                      <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM (Evening)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 5: Notes */}
              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                  Academic Background & Inquiries (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share your current GPA, English test score (IELTS/PTE), or target universities..."
                  className="w-full bg-black/40 border border-white/15 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-bold font-mono-tech text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>CONFIRM MY APPOINTMENT</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono-tech pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Free Consultation. No obligation or hidden service charges.</span>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-10 sm:p-14 rounded-3xl border border-white/20 text-center max-w-2xl mx-auto shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 mx-auto mb-5 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-display text-3xl font-bold text-white">
              Appointment Confirmed!
            </h2>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Thank you, <span className="text-amber-400 font-semibold">{formData.fullName}</span>. Your consultation session for <span className="text-white font-semibold">{formData.destination}</span> has been locked in.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono-tech text-slate-300 space-y-1.5 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="text-white">{formData.preferredDate || "Selected Day"} ({formData.preferredTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mode:</span>
                <span className="text-cyan-300">{formData.counselingMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Ref:</span>
                <span className="text-amber-400">AURA-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono-tech text-xs uppercase tracking-wider transition-colors"
            >
              BOOK ANOTHER SESSION
            </button>
          </motion.div>
        )}
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
}

