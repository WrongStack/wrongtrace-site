"use client";

import { marqueeItems, SUPPORTED_AGENTS } from "@/lib/agents";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * A single scrolling row of the coding agents WrongTrace discovers on its own.
 * The list is rendered twice so the marquee can translate by exactly half the
 * track width and wrap without a visible seam. The second copy is hidden from
 * assistive technology, so the list is announced once rather than twice.
 */
export function AgentStrip() {
  const reduced = usePrefersReducedMotion();
  const items = marqueeItems(SUPPORTED_AGENTS, reduced);

  return (
    <div className="border-t border-line py-5">
      <div className="site-container flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <p className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
          Auto-discovered
        </p>
        <div
          className="mask-fade-x relative min-w-0 flex-1 overflow-hidden"
          role="group"
          aria-label="Supported coding agents"
        >
          <ul
            className={
              reduced
                ? "flex flex-wrap gap-x-5 gap-y-1.5"
                : "flex w-max animate-marquee gap-8"
            }
          >
            {items.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                aria-hidden={item.duplicate ? true : undefined}
                className="shrink-0 font-mono text-xs whitespace-nowrap text-muted"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AgentStrip;