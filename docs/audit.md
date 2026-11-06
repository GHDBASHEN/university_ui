# Phase 0 — Comprehensive System Audit & Architectural Blueprint

## 1. Executive Summary
This document establishes the baseline architecture, interactive state inventory, latency/feel deficiencies, and modernization blueprint for `university_ui` (AURA Global Education). Following the reference behavioral grammar extracted from `manifesto.blandina.org`, this refactor transforms the site from a conventional web brochure into a tactile, sensory, "interactive manifesto" while strictly preserving all existing routes, copy, content, and branding.

---

## 2. File Map & Architecture Inventory

### 2.1 Core Application Shell & Routing
| Path | Type | Responsibility |
| :--- | :--- | :--- |
| `src/app/layout.tsx` | Layout | Root layout, Google Fonts (`Outfit`, `Syne`, `Space_Grotesk`), meta tags, global dark theme container. |
| `src/app/globals.css` | Stylesheet | Tailwind directives, CSS variables (`--background`, `--foreground`), glassmorphic presets (`.glass-panel`, `.glass-card`), keyframe animations (`logo-scroll`, `vr-zoom-pulse`). |
| `src/app/page.tsx` | Page (Client) | Homepage composition orchestrating HeroSection, Partner Marquee, DestinationsPreview, Achievements, Testimonials, CTA, ChatBot, and Footer. |
| `src/app/about/page.tsx` | Page (Client) | Brand narrative, Leadership team dossiers, Core institutional values, Partner logos marquee, Achievements counter. |
| `src/app/appointments/page.tsx` | Page (Client) | Consultation booking engine, 4-step consultation pathway, multi-field form with `canvas-confetti` completion feedback. |
| `src/app/blog/page.tsx` | Page (Client) | Scholarship & visa knowledge base, category filter tabs (`All`, `Visa Guide`, `Scholarships`, etc.), article card grid. |
| `src/app/destinations/page.tsx` | Page (Client) | International destination hub with filter pills (`All`, `UK`, `AU`, `CA`, `USA`) and detailed country preview cards. |
| `src/app/destinations/[slug]/page.tsx` | Dynamic Route | Country dossier detailing university lists, campus overview, admissions entry criteria, tuition & living budgets, visa roadmaps. |
| `src/app/events/page.tsx` | Page (Client) | Admissions fairs & virtual webinars directory with tabbed filters (`all`, `fair`, `webinar`, `workshop`). |
| `src/app/expedition/page.tsx` | Page (Client) | Standalone immersive 3D expedition stage displaying interactive orbital destination modules. |

### 2.2 Global & Layout Components
| Path | Responsibility |
| :--- | :--- |
| `src/components/layout/Navbar.tsx` | Fixed header with brand wordmark, scroll-triggered backdrop blur, nav links with Framer Motion spring active underline (`layoutId`), mobile responsive drawer. |
| `src/components/layout/Footer.tsx` | Global footer with company ethos, quick navigation links, newsletter submission with confirmation state, social channels. |

### 2.3 Home & Feature Components
| Path | Responsibility |
| :--- | :--- |
| `src/components/home/HeroSection.tsx` | Custom virtual-scroll hero engine intercepting wheel & touch events; drives a 4-destination card carousel via spring physics (`useSpring`, `useTransform`) with a full university dossier overlay. |
| `src/components/home/DestinationsPreview.tsx` | Tri-card preview for UK, Australia, and Canada featuring hover image zoom and radial country accent glows. |
| `src/components/home/AchievementsSection.tsx` | Digital statistical counters with interval-based counting triggered upon entering the viewport. |
| `src/components/home/ExpeditionCarousel.tsx` | 3D orbital carousel component for high-tech destination exploration with drag, tilt, and HUD telemetry. |
| `src/components/home/Destination3DCarousel.tsx` | Re-export alias for `ExpeditionCarousel`. |

### 2.4 UI Primitives & Shared Modules
| Path | Responsibility |
| :--- | :--- |
| `src/components/ui/AnimatedCounter.tsx` | Standalone RAF-eased number counter with Framer Motion scroll entrance. |
| `src/components/ui/LogoSlider.tsx` | Infinite horizontal marquee of partner university badges with pause-on-hover. |
| `src/components/ui/SectionHeading.tsx` | Standardized section header with badge, title, and subtitle animated on scroll. |
| `src/components/ui/TestimonialSlider.tsx` | Paginated testimonial carousel with Framer Motion slide variants and auto-advance timer. |
| `src/components/shared/ChatBot.tsx` | Floating interactive AI advisor with auto-replies, typing indicators, and message history. |
| `src/components/shared/SoundEngine.ts` | Synthesizer singleton built on Web Audio API (`playClick`, `playCardSwoosh`, `playZoomChime`) with internal mute toggle logic. |
| `src/data/*.ts` | Static data sources: `destinations.ts`, `expeditions.ts`, `partners.ts`, `testimonials.ts`, `blogPosts.ts`, `events.ts`. |

---

## 3. Current Interaction Inventory

### 3.1 Hover Interactions
- **Global Links & Buttons**: Universal transition in `globals.css` (`0.25s cubic-bezier(0.16, 1, 0.3, 1)`).
- **Navbar Links**: Text transition from `slate-300` to `slate-100` / `amber-400`.
- **HeroSection Cards**: Image zoom (`scale-105`), amber border highlights, subtitle color shifts.
- **DestinationsPreview Cards**: Triggers `soundEngine.playCardSwoosh()` via `onHoverStart`, scales hero image (`1.15`), brightens radial country accent glow.
- **Marquee Logos**: Hovering pauses the infinite CSS marquee (`animation-play-state: paused`).
- **Cards & Sliders**: Standard hover border brightness increases (`border-white/10` to `border-amber-400/40`).

### 3.2 Scroll Interactions
- **Native Browser Scroll**: Uses standard CSS `scroll-behavior: smooth` on `<html>`.
- **Navbar Header**: Listens to `window.scrollY > 20` to switch between transparent and blurred dark background.
- **Section Entrances**: Individual Framer Motion elements configure `whileInView` with `{ once: true, amount: 0.3 }` and hardcoded duration/ease transitions.
- **Hero Wheel/Touch Interception**: Inside `HeroSection.tsx`, default scroll is prevented via non-passive `wheel` and `touchmove` listeners to increment virtual `smoothProgress` across destination cards.

### 3.3 Click & Tap Interactions
- **Navbar Links & CTA**: Invoke `soundEngine.playClick()`.
- **Hero Destination Cards**: Invoke `soundEngine.playZoomChime()` and open the in-place dossier overlay modal.
- **Hero Controls (Next/Prev/Pills)**: Invoke `soundEngine.playCardSwoosh()`.
- **DestinationsPreview Cards**: Invoke `soundEngine.playZoomChime()` on navigation.
- **Testimonial Slider**: Next/prev buttons and pagination dots switch slides using Framer Motion slide variants.
- **Appointment Form Submission**: Fires confetti particle shower via `canvas-confetti`.
- **ChatBot Toggle**: Slides in floating chat panel with message auto-scroll.

### 3.4 Audio Interactions
- Synthesized Web Audio API oscillators:
  - `playClick`: 800Hz $\to$ 400Hz sine wave downward pitch drop (40ms - 80ms).
  - `playCardSwoosh`: 320Hz $\to$ 140Hz triangle frequency sweep (180ms).
  - `playZoomChime`: Harmonized sine dual-oscillator chord (D5 $\to$ A5, A5 $\to$ D6) with exponential decay.
- **Current Audio Flaw**: `SoundEngine` starts with `isMuted = false` (violating Constraint #6: "Sound is OFF by default"), and there is currently **no user-facing mute toggle UI** exposed anywhere in the navigation or interface.

---

## 4. Interaction Gap Analysis: What is NOT Interactive (But Must Be)

1. **Inertial & Synced Scroll Movement**:
   - The site uses native browser stepped scrolling outside the hero. Scrolling feels disjointed and lacks physical momentum.
   - Hero virtual scrolling does not integrate into the global scroll context, causing abrupt scroll traps.
2. **Spring Physics Consistency**:
   - Transitions across the site use arbitrary `duration` numbers and `ease: "easeInOut"` / `easeOut` curves instead of unified Newtonian mass/stiffness/damping springs.
3. **Adaptive Cursor as an Instrument**:
   - The standard desktop pointer arrow is used everywhere. There is no trailing physical ring, magnetic snap, or state transition on buttons, drag carousels, or links.
4. **Magnetic Attraction**:
   - CTAs, icon buttons, and navigation items are static rectangles. They lack spring-loaded attraction toward the user's cursor within a localized proximity radius.
5. **Physical 3D Card Tilt & Specular Spotlight**:
   - Cards in `DestinationsPreview`, `LogoSlider`, `AchievementsSection`, and `/destinations` are flat planes. They lack dynamic rotational tilt and real-time cursor-following light reflections.
6. **Multi-Sensory Click Feedback (Ripple + Haptics)**:
   - Clicks have only standard CSS `:active { transform: scale(0.97) }`. They lack localized coordinate ripples, sound throttle protection, and mobile vibration pulses (`navigator.vibrate`).
7. **Pinned Narrative Chambers**:
   - Content sections below the fold scroll past as static stacked boxes rather than pinned narrative viewports where copy and imagery scrub into view sequentially.
8. **Marginalia & Contextual Micro-Reveals**:
   - High-impact claims and manifesto headings lack hover-triggered footnote reveals and exploratory marginalia.
9. **Fluid Page & Route Transitions**:
   - Next.js route changes produce instant page replacements. There is no shared-element card-to-hero morphing (`layoutId`) or cross-page spring fade/slide.
10. **Accessibility & Control Toggles**:
    - No persistent "Reduce motion" switch to disable non-essential physics and respect vestibular needs.
    - Sound engine is not muted by default and lacks an accessible toolbar/navbar mute toggle.

---

## 5. Architectural Blueprint: Proposed Shared Primitives

To execute Phases 1 through 6 with zero layout thrash, strict performance budgets (60fps desktop / smooth mid-range Android), and clean maintainability, the following primitives and utilities are proposed:

### 5.1 Motion & Physics Foundation (`src/lib/motion.ts`)
- **Centralized Spring Presets**:
  - `springSoft`: `{ type: "spring", stiffness: 180, damping: 28, mass: 1 }`
  - `springSnappy`: `{ type: "spring", stiffness: 300, damping: 26, mass: 0.8 }`
  - `springBouncy`: `{ type: "spring", stiffness: 400, damping: 18, mass: 0.6 }`
  - `springSlow`: `{ type: "spring", stiffness: 100, damping: 24, mass: 1.2 }`
- **Standardized Reveal Variants**: Staggered rise and opacity transitions for below-the-fold content (`riseUp`, `fadeStagger`).
- **Reduced Motion Utilities**: Fallback objects that neutralize transforms and delays when motion is disabled.

### 5.2 Motion & Accessibility State (`src/context/MotionContext.tsx`)
- Detects system `prefers-reduced-motion: reduce`.
- Manages user-persisted override in `localStorage` (`"aura-reduced-motion": "true" | "false"`).
- Exposes `useReducedMotionState()` hook.
- Provides accessible UI toggle in Navbar and Footer.

### 5.3 Audio Engine Management (`src/context/AudioContext.tsx` & `src/components/ui/AudioToggle.tsx`)
- Refactors `SoundEngine.ts` to ensure `isMuted = true` by default.
- Implements audio context unlocking on the first genuine user gesture.
- Adds accessible HUD sound toggle with audio level animation and tooltip.
- Implements hover sound throttling (max 1 tick every 60ms) to avoid audio clutter.

### 5.4 Unified Smooth Scroll (`src/components/shared/SmoothScrollProvider.tsx`)
- Integrates `lenis` with `autoRaf: false`.
- Drives Lenis directly inside Framer Motion's master RAF loop via `useAnimationFrame` or a shared ticker.
- Guarantees `useScroll` synchronization across all pinned chambers without dual-RAF stutter or jitter.

### 5.5 Visual Progress Indicator (`src/components/ui/ScrollProgress.tsx`)
- High-precision scroll rail with amber active fill driven by `useScroll` and `useTransform` (`scaleX` or `scaleY`).

### 5.6 Hardware-Accelerated Custom Cursor (`src/components/ui/CustomCursor.tsx`)
- Cursor state machine: `default | interactive | reveal | drag | hidden`.
- Detects target state via data attributes: `[data-cursor="interactive"]`, `[data-cursor="reveal"]`, `[data-cursor="drag"]`.
- Trailing spring dot + ring using lerp / Framer Motion spring values (`translate3d` only).
- Automatically deactivates when pointer media is coarse (mobile touch) or reduced-motion is enabled.

### 5.7 Magnetic Pull Primitive (`src/hooks/useMagnetic.ts` & `src/components/ui/Magnetic.tsx`)
- Computes cursor delta relative to element center bounding box.
- Pulls target toward cursor within a customizable proximity threshold ($r = 60\text{px}$), springing back to origin on mouse exit.

### 5.8 3D Perspective Tilt & Specular Spotlight (`src/hooks/useTilt.ts` & `src/components/ui/SpotlightCard.tsx`)
- Pure GPU transform (`perspective`, `rotateX`, `rotateY`, `scale3d`).
- Cursor-following dynamic radial spotlight gradient overlay (`radial-gradient(circle at X% Y%, rgba(255,184,0,0.18), transparent 70%)`).
- Zero layout thrash: uses bounding box caching and pointer position normalized from $-0.5$ to $+0.5$.

### 5.9 Sensory Click & Tap Feedback (`src/hooks/useRipple.tsx` & `src/hooks/useHaptics.ts`)
- `useRipple`: Generates coordinate-centered expanding circular ripple wave upon pointer down.
- `useHaptics`: Safe vibration trigger (`navigator.vibrate(14)`) guarded against unsupporting devices and reduced-motion mode.
- Pressable wrapper (`whileTap={{ scale: 0.96 }}`) for all interactive components.

### 5.10 Pinned Chamber Architecture (`src/components/ui/ChamberSection.tsx` & `src/components/ui/RevealText.tsx`)
- Viewport-pinned scroll stages where progress translates into letter/word reveals, opacity transitions, and line unmasking.
- Graceful degradation: On mobile viewports ($< 768\text{px}$), sections automatically drop sticky pinning and revert to staggered vertical scroll reveals.

### 5.11 Page & Route Shared Transitions (`src/components/shared/PageTransition.tsx`)
- Next.js App Router route transition manager using `AnimatePresence mode="wait"`.
- Card to detail page shared layout transitions utilizing Framer Motion's `layoutId`.

---

## 6. Implementation Phase Roadmap

| Phase | Title | Primary Deliverables | Dependencies to Add |
| :---: | :--- | :--- | :--- |
| **0** | **Audit & Spec** | `docs/reference-notes.md`, `docs/audit.md`, verification of build/lint baseline. | None |
| **1** | **Scroll & Motion Foundation** | `lenis` installation, `SmoothScrollProvider`, `src/lib/motion.ts` spring presets, `MotionContext` + Reduce Motion toggle, `ScrollProgress`, replace `ease` with springs. | `lenis` |
| **2** | **Cursor & Hover Physics** | `CustomCursor`, `useMagnetic`, `useTilt` + `SpotlightCard`, cursor state attributes on interactive elements. | None |
| **3** | **Click/Tap Feedback Triad** | `useRipple`, `useHaptics`, audio default-off refactor + Navbar/HUD mute toggle, audio throttled hover/clicks, press physics. | None |
| **4** | **Narrative Scroll (Chambers)** | Pinned chambers on hero/stats/manifesto, scroll-driven word reveals, marginalia hover annotations, responsive fallback for $<768\text{px}$. | None |
| **5** | **Route & Card Transitions** | `PageTransition` wrapper, `AnimatePresence`, `layoutId` card-to-hero detail morphs, smooth scroll resets. | None |
| **6** | **Ambient WebGL (Optional)** | Lazy-loaded R3F particle/shard field responding to scroll velocity and cursor; disabled on low power / reduced motion. | `@react-three/fiber`, `three` (only if budget holds) |

---

## 7. Verification & Quality Gates
- **Production Build**: `npm run build` must succeed without type or compilation errors after every phase.
- **Code Quality**: `npm run lint` must pass clean.
- **Performance**: 60fps on desktop; no forced synchronous layout recalculations; only `transform` and `opacity` animated.
- **Accessibility**: Keyboard focus rings visible, screen readers unobstructed, reduced-motion toggle fully respected, sound defaults to OFF.
