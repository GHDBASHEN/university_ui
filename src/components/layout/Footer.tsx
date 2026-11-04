"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Globe, Share2, MessageCircle, Video } from "lucide-react";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/appointments", label: "Appointments" },
];

const destinations = [
  { href: "/destinations/united-kingdom", label: "United Kingdom" },
  { href: "/destinations/australia", label: "Australia" },
  { href: "/destinations/canada", label: "Canada" },
];

const socials = [
  { icon: Globe, href: "#", label: "Global" },
  { icon: Share2, href: "#", label: "Network" },
  { icon: MessageCircle, href: "#", label: "Community" },
  { icon: Video, href: "#", label: "Broadcast" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#07090E] border-t border-white/10">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-display font-bold tracking-wider text-slate-100">
                AURA
              </span>
              <div className="w-[2px] h-6 bg-amber-400 rounded-full" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-mono-tech tracking-[0.3em] text-amber-400/80 uppercase">
                  Global
                </span>
                <span className="text-[9px] font-mono-tech tracking-[0.3em] text-slate-400 uppercase">
                  Education
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering students worldwide to achieve their dream of studying
              abroad. Your journey to global education starts here.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-400/10 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-slate-100 uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Destinations */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-slate-100 uppercase tracking-wider mb-5">
              Destinations
            </h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.href}>
                  <Link
                    href={dest.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact + Newsletter */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-slate-100 uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span>info@auraglobal.edu</span>
              </li>
            </ul>

            <h4 className="text-sm font-heading font-semibold text-slate-100 uppercase tracking-wider mb-3">
              Newsletter
            </h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-lg transition-all duration-300 shrink-0"
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-400 mt-2"
              >
                Subscribed successfully!
              </motion.p>
            )}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Aura Global Education. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
