# AURA UNIVERSITY — Interactive Academic Portal UI

An ultra-modern, cinematic, and interactive Next.js application designed for a world-class university, inspired by the spatial exploration interface in `Template/template1.mp4`.

---

## 🌟 Key Features & Design Architecture

### 1. 3D Floating Perspective Card Carousel
- **Perspective Stage (`CardCarousel.tsx`)**: Recreates the 3D card layout from the video with dynamic tilt, depth layers, frosted glassmorphism, and spring physics.
- **Card Anatomy**: High-contrast condensed typography, faculty insignias/avatars, research codes, locations, and interactive hover effects.
- **Micro-Interactions**: Smooth drag, click-to-center transitions, keyboard arrow navigation (`←` / `→`), and zoom-to-expand.

### 2. Cinematic Story / Expanded View
- Direct homage to frames 003, 004, and 008 of the video (*"Traverse the Borealis"*, *"Hiking the Glaciers"*, *"Ascending the Magma Crest"*).
- When a card is selected, the floating cards transition gracefully outwards to reveal a bold editorial headline, academic metadata tags, curriculum breakdown, and direct calls-to-action.

### 3. Dual Background Engine (`BackgroundStage.tsx`)
- **Video Template Mode**: Plays the original cinematic template video (`/template1.mp4`) seamlessly in a loop directly in the backdrop.
- **4K Curated Photographic Mode**: Dynamic high-definition atmospheric landscapes featuring the student/traveler walking toward the horizon dawn, matched with smooth cross-fading per faculty.
- **Atmospheric Particles**: Real-time HTML5 Canvas particle dust mist and glowing horizon line.

### 4. Telemetry HUD Bar (`TelemetryHUD.tsx`)
- **Interactive Action Buttons**: Active glowing yellow button with icon + secondary glass buttons.
- **Metric 1 (Contour Campus Circuit)**: Animated SVG perimeter outline with total campus area (`45.5 KM²`), station code, and research station grid.
- **Metric 2 (Elevation / Growth Waveform)**: Animated SVG elevation graph with peak altitude (`950 M`) and world academic rankings.
- **Metric 3 (Live 360° Radar Lens)**: Rotating circular live preview thumbnail triggering the interactive campus radar.
- **Slide Navigation & Progress**: Minimalist slider with progress bar, slide counter (`01 / 05`), and auto-play toggle.

### 5. Interactive Modals & Drawers
- **Admissions Application Wizard (`AdmissionsModal.tsx`)**: Multi-step application with personal details, statement of purpose, scholarship selection, and celebratory confetti upon submission!
- **Interactive Campus Spatial Radar (`CampusRadarModal.tsx`)**: Circular sweeping radar scanner with clickable pins for cryo-labs, observatories, supercomputing nodes, and live meteorological telemetry.
- **Curriculum & Faculty Drawer (`CurriculumDrawer.tsx`)**: Deep dive into semester course modules, ECTS credits, Nobel laureate faculty directors, and tuition breakdown.
- **Command Palette (`CommandPaletteModal.tsx`)**: Instant fuzzy search accessible via `⌘K` or `Ctrl+K`.

### 6. Synthesized Ambient Audio Engine (`SoundEngine.ts`)
- Built with HTML5 Web Audio API (zero external audio dependencies).
- Synthesizes a calming, low-frequency binaural focus drone when sound is toggled on.
- Satisfying soft futuristic chime on card selection and transitions.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Motion & 3D**: Framer Motion
- **Icons**: Lucide React
- **Celebration FX**: Canvas-Confetti
- **Typography**: Google Fonts via `next/font` (`Outfit`, `Syne`, `Space Grotesk`)
- **Audio**: Web Audio API

---

## 🚀 Getting Started

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Keyboard Shortcuts
- `←` / `→`: Navigate through faculty cards
- `Space`: Expand / focus the active program
- `Escape`: Return to carousel gallery or close modals
- `⌘K` or `Ctrl+K`: Open Program Command Palette
