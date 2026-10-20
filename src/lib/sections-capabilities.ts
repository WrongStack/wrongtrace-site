import { capabilitiesHead } from "@/lib/content";

/**
 * Section copy for the editorial capabilities list.
 *
 * The marker, headline and standfirst come from the shared content model, so
 * the section numbering stays in one place. The kicker is specific to this
 * section's editorial treatment: it names the build rather than a claim.
 */
export const capabilitiesSection = {
  label: capabilitiesHead.label,
  kicker: "PURE GO / v0.3.17",
  headline: capabilitiesHead.headline,
  emphasis: true,
  sub: capabilitiesHead.sub,
} as const;
