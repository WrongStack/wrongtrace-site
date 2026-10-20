"use client";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const AGENTS = [
  "WrongStack",
  "Claude Code",
  "Cursor",
  "Windsurf",
  "Cline",
  "Roo Code",
  "Antigravity",
  "Aider",
  "Continue",
  "GitHub Copilot",
  "Goose",
  "OpenHands",
  "Devin",
  "Trae",
  "Zed AI",
  "Replit Agent",
  "Kimi Code",
  "MiniMax Code",
];

/**
 * A single scrolling row of the coding agents WrongTrace discovers on its own.
 * The list is rendered twice so the marquee can translate by exactly half the
 * track width and wrap without a visible seam.
 */
export function AgentStrip() {
  const reduced = usePrefersReducedMotion();

  const items = reduced ? AGENTS : [...AGENTS, ...AGENTS];

  return (
    <div className="border-t border-line py-5">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 sm:px-8 md:flex-row md:items-center md:gap-6">
        <p className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
          Auto-discovered
        </p>
        <div
          className="mask-fade-x relative min-w-0 flex-1 overflow-hidden"
          aria-label="Supported coding agents"
        >
          <ul
            className={
              reduced
                ? "flex flex-wrap gap-x-5 gap-y-1.5"
                : "flex w-max animate-marquee gap-8"
            }
          >
            {items.map((agent, index) => (
              <li
                key={`${agent}-${index}`}
                className="shrink-0 font-mono text-xs whitespace-nowrap text-muted"
              >
                {agent}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AgentStrip;
