"use client";

import React from "react";
import Link from "next/link";
import ExpeditionCarousel from "@/components/home/ExpeditionCarousel";
import { ArrowLeft, GraduationCap } from "lucide-react";

export default function ExpeditionPage() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Top Floating Back Link */}
      <div className="absolute top-6 right-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-xs font-mono text-white transition-all shadow-lg hover:scale-105"
        >
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>AURA UNIVERSITY PORTAL</span>
          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
        </Link>
      </div>

      {/* The 3D Destination Exploration Carousel */}
      <ExpeditionCarousel autoPlay={false} />
    </div>
  );
}

