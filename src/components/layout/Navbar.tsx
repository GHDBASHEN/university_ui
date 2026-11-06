"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { soundEngine } from "@/components/shared/SoundEngine";
import { springDefault } from "@/lib/motion";
import { ReduceMotionToggle } from "@/components/ui/ReduceMotionToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/appointments", label: "Appointments" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={springDefault}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#07090E]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/30"
            : "bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => soundEngine.playClick()}
              className="flex items-center gap-3 group"
            >
              <div className="flex items-center">
                <span className="text-3xl font-display font-bold tracking-wider text-slate-100 group-hover:text-amber-400 transition-colors duration-300">
                  AURA
                </span>
                <div className="w-[3px] h-8 bg-amber-400 mx-3 rounded-full" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-mono-tech tracking-[0.3em] text-amber-400/80 uppercase">
                    Global
                  </span>
                  <span className="text-[10px] font-mono-tech tracking-[0.3em] text-slate-400 uppercase">
                    Education
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => soundEngine.playClick()}
                    className="relative px-4 py-2 text-sm font-heading tracking-wide transition-colors duration-300 group"
                  >
                    <span
                      className={
                        isActive
                          ? "text-amber-400"
                          : "text-slate-300 group-hover:text-slate-100"
                      }
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-amber-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <ReduceMotionToggle variant="compact" />

              <Link
                href="/appointments"
                onClick={() => soundEngine.playClick()}
                className="hidden sm:inline-flex items-center px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-sm font-heading font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 active:scale-95"
              >
                Book Free Consultation
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-amber-400 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-[#0B0E15]/95 backdrop-blur-2xl border-l border-white/10 lg:hidden"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ...springDefault, delay: 0.04 * i }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-4 py-3 rounded-lg text-base font-heading tracking-wide transition-all duration-300 ${
                            isActive
                              ? "text-amber-400 bg-amber-400/10 border-l-2 border-amber-400"
                              : "text-slate-300 hover:text-slate-100 hover:bg-white/5"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-between py-2 border-t border-white/10">
                    <span className="text-xs font-mono-tech text-slate-400">ANIMATIONS</span>
                    <ReduceMotionToggle variant="badge" />
                  </div>
                  <Link
                    href="/appointments"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black text-sm font-heading font-semibold rounded-lg transition-all duration-300"
                  >
                    Book Free Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
