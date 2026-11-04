"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, GraduationCap, Globe2, CalendarCheck, ShieldCheck } from "lucide-react";

interface Achievement {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    value: 15000,
    suffix: "+",
    label: "Scholars Placed",
    description: "Successfully placed in global universities since 2014",
    icon: <Users className="w-6 h-6" />,
    accentColor: "#FBBF24",
  },
  {
    value: 98,
    suffix: "%",
    label: "Visa Approval Rate",
    description: "Industry-leading embassy filing & compliance success",
    icon: <Award className="w-6 h-6" />,
    accentColor: "#38BDF8",
  },
  {
    value: 200,
    suffix: "+",
    label: "Partner Institutions",
    description: "Direct ties with prestigious Russell Group, Go8 & U15 institutions",
    icon: <GraduationCap className="w-6 h-6" />,
    accentColor: "#34D399",
  },
  {
    value: 50,
    suffix: "+",
    label: "Destinations & Outposts",
    description: "Global student community spanning 50+ sovereign nations",
    icon: <Globe2 className="w-6 h-6" />,
    accentColor: "#C084FC",
  },
  {
    value: 12,
    suffix: "+",
    label: "Years of Trust",
    description: "Pioneering bespoke educational pathways worldwide",
    icon: <CalendarCheck className="w-6 h-6" />,
    accentColor: "#FB923C",
  },
  {
    value: 100,
    suffix: "%",
    label: "Certified Counselors",
    description: "ICEF & British Council accredited advisory board",
    icon: <ShieldCheck className="w-6 h-6" />,
    accentColor: "#F43F5E",
  },
];

const CounterCard: React.FC<{ achievement: Achievement; delay: number }> = ({
  achievement,
  delay,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayCount, setDisplayCount] = useState(0);

  // Digital decoder effect numbers count up
  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = achievement.value;
    const duration = 1800; // ms
    const incrementTime = 30; // ms
    const totalSteps = duration / incrementTime;
    const stepValue = end / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setDisplayCount(end);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, achievement.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: delay * 0.08, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-amber-400/40 transition-all shadow-xl flex flex-col justify-between"
    >
      {/* Background ambient pulse */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition-opacity pointer-events-none"
        style={{ backgroundColor: achievement.accentColor }}
      />

      <div>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-white/10 group-hover:scale-110 transition-transform"
          style={{
            backgroundColor: `${achievement.accentColor}18`,
            color: achievement.accentColor,
          }}
        >
          {achievement.icon}
        </div>

        {/* Big animated number */}
        <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
          <span>{displayCount.toLocaleString()}</span>
          <span className="text-amber-400 text-3xl sm:text-4xl ml-0.5">
            {achievement.suffix}
          </span>
        </div>

        <div className="text-sm sm:text-base font-bold text-slate-100 mt-2 font-mono-tech tracking-wide uppercase">
          {achievement.label}
        </div>

        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-light">
          {achievement.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-slate-500 uppercase">
        <span>VERIFIED METRIC</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          ACTIVE 2026
        </span>
      </div>
    </motion.div>
  );
};

export const AchievementsSection: React.FC = () => {
  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech uppercase tracking-widest mb-3"
        >
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROVEN TRACK RECORD & STATS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          Numbers That Define Academic Excellence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base mt-4 font-light text-balance"
        >
          Over a decade of relentless dedication toward connecting ambitious minds
          with the world&apos;s leading academic research faculties.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item, idx) => (
          <CounterCard key={item.label} achievement={item} delay={idx} />
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
