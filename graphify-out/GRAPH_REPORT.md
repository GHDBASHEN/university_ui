# Graph Report

Generated: 2026-11-04T09:40:44.316Z

## Summary

- **Nodes:** 92
- **Edges:** 174
- **Communities:** 17
- **God nodes:** 4

## Communities

### lucide-react (15 member(s))

- @/components/layout/Footer
- @/components/layout/Navbar
- @/components/shared/ChatBot
- @/data/blogPosts
- @/data/events
- canvas-confetti
- lucide-react
- src/app/appointments/page.tsx
- function AppointmentsPage
- src/app/blog/page.tsx
- function BlogPage
- src/app/destinations/[slug]/page.tsx
- src/app/destinations/page.tsx
- src/app/events/page.tsx
- function EventsPage

### react (14 member(s))

- @/data/destinations
- next/link
- next/navigation
- react
- function DestinationDetailPage
- function DestinationsPage
- src/components/home/DestinationsPreview.tsx
- function DestinationsPreview
- src/components/home/HeroSection.tsx
- function HeroSection
- src/components/layout/Footer.tsx
- function Footer
- src/components/layout/Navbar.tsx
- function Navbar

### framer-motion (11 member(s))

- framer-motion
- src/components/home/AchievementsSection.tsx
- interface Achievement
- function AchievementsSection
- function CounterCard
- src/components/ui/AnimatedCounter.tsx
- function AnimatedCounter
- interface AnimatedCounterProps
- src/components/ui/SectionHeading.tsx
- function SectionHeading
- interface SectionHeadingProps

### src/app/page.tsx (11 member(s))

- @/components/home/AchievementsSection
- @/components/home/DestinationsPreview
- @/components/home/HeroSection
- @/components/ui/LogoSlider
- @/components/ui/TestimonialSlider
- @/data/partners
- @/data/testimonials
- src/app/about/page.tsx
- function AboutPage
- src/app/page.tsx
- function HomePage

### src/components/ui/TestimonialSlider.tsx (9 member(s))

- next/image
- src/components/ui/LogoSlider.tsx
- interface Logo
- function LogoSlider
- interface LogoSliderProps
- src/components/ui/TestimonialSlider.tsx
- interface Testimonial
- function TestimonialSlider
- interface TestimonialSliderProps

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

### src/components/shared/ChatBot.tsx (3 member(s))

- src/components/shared/ChatBot.tsx
- function ChatBot
- interface ChatMessage

### src/data/blogPosts.ts (3 member(s))

- src/data/blogPosts.ts
- const BLOG_POSTS
- interface BlogPost

### src/data/events.ts (3 member(s))

- src/data/events.ts
- interface Event
- const EVENTS

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

- framer-motion has 19 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.
- lucide-react has 14 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.
- react has 37 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.
- src/app/page.tsx has 15 connections (fan-in + fan-out) — well above the graph average of 3.8. Likely a god node / hotspot worth reviewing for excessive coupling.

## Open Questions

- 4 node(s) have no incoming or outgoing edges (next-env.d.ts, next.config.mjs, postcss.config.mjs, src/app/globals.css) — dead code, an entry point, or a gap in extraction?
- The graph has 12 disconnected components — the largest has 63 node(s). Confirm this reflects real module boundaries rather than missed cross-file edges.
