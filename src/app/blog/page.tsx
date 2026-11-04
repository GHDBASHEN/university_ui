"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import { BLOG_POSTS, BlogPost } from "@/data/blogPosts";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Visa Guide", "Scholarships", "Student Life", "Career", "Tips"];

  const filtered = selectedCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-x-hidden">
      <Navbar />

      <section className="relative pt-36 pb-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-4"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>EXPERT KNOWLEDGE BASE & GUIDES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            Articles, Guides & Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Up-to-date visa regulations, scholarship application tactics, part-time work compliance, and insider student survival guides.
          </motion.p>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                    : "glass-pill text-slate-300 hover:text-white border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post: BlogPost, idx: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/15 flex flex-col justify-between group hover:border-amber-400/40 transition-all shadow-xl"
            >
              <div className="relative h-52 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono-tech uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {post.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded-full bg-black/60 text-slate-300">
                    {post.readTime}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono-tech text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-amber-400" /> {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" /> {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/appointments`}
                    className="text-xs font-mono-tech uppercase text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>CONSULT EXPERT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
}

