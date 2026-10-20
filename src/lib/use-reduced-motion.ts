"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * Reports whether the user asked for reduced motion.
 *
 * `useSyncExternalStore` is used deliberately: the server snapshot is `false`
 * and the client snapshot may be `true`, so React re-renders after hydration
 * instead of reporting a mismatch. A component that branches on this value
 * therefore keeps a stable server render and converges on the real preference.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default usePrefersReducedMotion;
