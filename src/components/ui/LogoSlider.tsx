"use client";

import React from "react";
import { PartnerLogo } from "@/data/partners";
import { Award, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

interface LogoSliderProps {
  logos: PartnerLogo[];
}

export default function LogoSlider({ logos }: LogoSliderProps) {
  const duplicated = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-4 group select-none relative">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07090E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07090E] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div
        className="flex items-center gap-5 animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          width: `${duplicated.length * 310}px`,
        }}
      >
        {duplicated.map((uni, idx) => (
          <Link
            href="/destinations"
            key={`${uni.name}-${idx}`}
            className="flex-shrink-0 w-[290px] h-[190px] rounded-2xl glass-panel border border-white/15 overflow-hidden relative group/card hover:border-amber-400/60 transition-all duration-500 shadow-xl flex flex-col justify-end p-4"
          >
            {/* Campus Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110 filter brightness-75 contrast-110"
              style={{ backgroundImage: `url(${uni.campusImage})` }}
            />

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25 group-hover/card:via-black/40 transition-all" />

            {/* Top Badge: Country Flag & Ranking */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs">
                <span>{uni.flag}</span>
                <span className="font-mono-tech text-[10px] uppercase text-white/90 tracking-wider">
                  {uni.country}
                </span>
              </div>

              <span className="text-[10px] font-mono-tech uppercase font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black shadow-md">
                {uni.ranking}
              </span>
            </div>

            {/* Bottom Info Content */}
            <div className="relative z-10">
              <h4 className="font-display font-bold text-base text-white group-hover/card:text-amber-300 transition-colors leading-tight drop-shadow">
                {uni.name}
              </h4>
              <p className="text-[10px] font-mono-tech text-slate-300 mt-1 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                <span>{uni.specialty}</span>
              </p>
            </div>

            {/* Top specular highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </div>
  );
}
