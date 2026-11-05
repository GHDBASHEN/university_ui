# Graph Report

Generated: 2026-11-05T09:09:30.795Z

## Summary

- **Nodes:** 112
- **Edges:** 214
- **Communities:** 19
- **God nodes:** 4

## Communities

### lucide-react (17 member(s))

- @/components/layout/Footer
- @/components/layout/Navbar
- @/components/shared/ChatBot
- @/data/blogPosts
- @/data/events
- canvas-confetti
- lucide-react
- src/app/about/page.tsx
- function AboutPage
- src/app/appointments/page.tsx
- function AppointmentsPage
- src/app/blog/page.tsx
- function BlogPage
- src/app/destinations/[slug]/page.tsx
- src/app/destinations/page.tsx
- src/app/events/page.tsx
- function EventsPage

### react (17 member(s))

- @/components/shared/SoundEngine
- @/data/destinations
- @/data/expeditions
- next/navigation
- react
- function DestinationDetailPage
- function DestinationsPage
- src/components/home/Destination3DCarousel.tsx
- src/components/home/DestinationsPreview.tsx
- function DestinationsPreview
- src/components/home/ExpeditionCarousel.tsx
- function ExpeditionCarousel
- interface ExpeditionCarouselProps
- src/components/home/HeroSection.tsx
- function HeroSection
- src/components/layout/Navbar.tsx
- function Navbar

### framer-motion (14 member(s))

- framer-motion
- src/components/home/AchievementsSection.tsx
- interface Achievement
- function AchievementsSection
- function CounterCard
- src/components/shared/ChatBot.tsx
- function ChatBot
- interface ChatMessage
- src/components/ui/AnimatedCounter.tsx
- function AnimatedCounter
- interface AnimatedCounterProps
- src/components/ui/SectionHeading.tsx
- function SectionHeading
- interface SectionHeadingProps

### src/app/page.tsx (12 member(s))

- @/components/home/AchievementsSection
- @/components/home/DestinationsPreview
- @/components/home/HeroSection
- @/components/ui/LogoSlider
- @/components/ui/TestimonialSlider
- @/data/partners
- @/data/testimonials
- src/app/page.tsx
- function HomePage
- src/components/ui/LogoSlider.tsx
- function LogoSlider
- interface LogoSliderProps

### class SoundEngine (9 member(s))

- src/components/shared/SoundEngine.ts
- const soundEngine
- class SoundEngine
- method SoundEngine.getIsMuted
- method SoundEngine.init
- method SoundEngine.playCardSwoosh
- method SoundEngine.playClick
- method SoundEngine.playZoomChime
- method SoundEngine.toggleMute

### next/link (6 member(s))

- @/components/home/ExpeditionCarousel
- next/link
- src/app/expedition/page.tsx
- function ExpeditionPage
- src/components/layout/Footer.tsx
- function Footer

### src/data/destinations.ts (6 member(s))

- src/data/destinations.ts
- interface Destination
- interface DestinationLifestyle
- const DESTINATIONS
- interface DestinationStats
- interface UniversityEntry

### src/app/layout.tsx (5 member(s))

- next
- next/font/google
- src/app/layout.tsx
- const metadata
- function RootLayout

### src/components/ui/TestimonialSlider.tsx (5 member(s))

- next/image
- src/components/ui/TestimonialSlider.tsx
- interface Testimonial
- function TestimonialSlider
- interface TestimonialSliderProps

### src/data/blogPosts.ts (3 member(s))

- src/data/blogPosts.ts
- const BLOG_POSTS
- interface BlogPost

### src/data/events.ts (3 member(s))

- src/data/events.ts
- interface Event
- const EVENTS

### src/data/expeditions.ts (3 member(s))

- src/data/expeditions.ts
- const EXPEDITION_DESTINATIONS
- interface ExpeditionDestination

### src/data/partners.ts (3 member(s))

- src/data/partners.ts
- const PARTNER_LOGOS
- interface PartnerLogo

### src/data/testimonials.ts (3 member(s))

- src/data/testimonials.ts
- interface Testimonial
- const TESTIMONIALS

### tailwindcss (2 member(s))

- tailwindcss
- tailwind.config.ts

### ./globals.css (1 member(s))

- ./globals.css

### next-env.d.ts (1 member(s))

- next-env.d.ts

### next.config.mjs (1 member(s))

- next.config.mjs

### postcss.config.mjs (1 member(s))

- postcss.config.mjs

## God Nodes

Nodes with unusually high fan-in + fan-out relative to the rest of this graph — often a sign of a shared utility, a bottleneck, or a module that has taken on too many responsibilities.

- framer-motion
- lucide-react
- react
- src/app/page.tsx

## Structural Surprises

- framer-motion has 20 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.
- lucide-react has 17 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.
- react has 42 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.
- src/app/page.tsx has 15 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.

## Open Questions

- 4 node(s) have no incoming or outgoing edges (next-env.d.ts, next.config.mjs, postcss.config.mjs, src/app/globals.css) — dead code, an entry point, or a gap in extraction?
- The graph has 14 disconnected components — the largest has 71 node(s). Confirm this reflects real module boundaries rather than missed cross-file edges.
