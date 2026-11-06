import { Transition, Variants } from "framer-motion";

/**
 * Standardized Spring Motion Presets
 * Grounded in physical Newtonian mechanics (mass, stiffness, damping)
 * to avoid artificial, linear easing curves.
 */
export const springDefault: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 26,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 28,
  mass: 1,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};

export const springStiff: Transition = {
  type: "spring",
  stiffness: 340,
  damping: 30,
  mass: 0.9,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 1.1,
};

/**
 * Instant transition fallback when prefers-reduced-motion is active
 */
export const reducedTransition: Transition = {
  duration: 0.001,
};

/**
 * Standardized viewport configuration for below-the-fold reveals
 */
export const sectionViewport = {
  once: true,
  margin: "-10%",
} as const;

/**
 * Staggered Entrance Variants
 * Designed for transform (y-axis rise) and opacity only (no layout thrashing).
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const riseItem: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springDefault,
  },
};

export const riseSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

export const riseProminent: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
};
