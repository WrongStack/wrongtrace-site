"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * A restrained cursor-following light field, inspired by the reference sites'
 * responsive pointer treatments. The glow never intercepts input and is
 * disabled for touch pointers and reduced-motion users.
 */
export function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || reduce || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.setProperty("--pointer-x", `${event.clientX}px`);
        glow.style.setProperty("--pointer-y", `${event.clientY}px`);
        glow.dataset.visible = "true";
      });
    };
    const onLeave = () => {
      glow.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  if (reduce) return null;

  return <div ref={glowRef} className="pointer-glow" aria-hidden="true" />;
}

export default PointerGlow;
