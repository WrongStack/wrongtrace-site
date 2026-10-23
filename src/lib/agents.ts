/**
 * The coding agents WrongTrace discovers on its own, and the rule that keeps
 * the scrolling strip from being announced twice.
 */

export const SUPPORTED_AGENTS = [
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
] as const;

export type MarqueeItem = {
  readonly name: string;
  /**
   * True for the second copy of the list. The duplicate only exists so the
   * marquee can loop without a seam; it is hidden from assistive technology
   * so the list is not read out twice.
   */
  readonly duplicate: boolean;
};

/**
 * The entries the strip renders.
 *
 * With reduced motion the list is rendered once and wraps. Otherwise it is
 * rendered twice, and only the first copy belongs in the accessibility tree.
 */
export function marqueeItems(
  agents: readonly string[],
  reduced: boolean,
): MarqueeItem[] {
  const first = agents.map((name) => ({ name, duplicate: false }));
  if (reduced) return first;
  return [...first, ...agents.map((name) => ({ name, duplicate: true }))];
}