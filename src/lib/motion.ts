"use client";

import type { Transition, Variants } from "motion/react";

/** Kit easing curves, lifted from the Dark Pro motion spec. */
export const easeStandard = [0.2, 0, 0, 1] as const;
export const easeEmphasized = [0.3, 0, 0, 1] as const;

/** Shared spring for state changes (tab pill, hover lift). */
export const snap: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

/** Fade-and-rise, the default entrance for content blocks. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeStandard },
  },
};

/** Staggered rise for lists. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeStandard },
  },
};

/** Horizontal rule that draws itself in when scrolled into view. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: easeStandard },
  },
};
