"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { easeStandard } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  className?: string;
  /** Distance in pixels the block travels up. */
  distance?: number;
};

/**
 * Scroll-triggered entrance. Only transform and opacity are animated, so the
 * block never triggers layout. When the user prefers reduced motion the block
 * is rendered in its final state — no transform, no transition, no fade.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  distance = 20,
}: RevealProps) {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.55, delay, ease: easeStandard }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
