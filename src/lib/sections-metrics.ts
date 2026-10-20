/**
 * Capability strip — the figures that state what WrongTrace is, with the
 * provenance of every figure visible on the surface.
 *
 * Rule (non-negotiable): each figure is either a configuration default or a
 * capability claim quoted from the WrongTrace README. There is no benchmark
 * here, no user count, and nothing we measured ourselves.
 */

/** Which kind of claim a figure is. Rendered under the label. */
export type MetricKind = "config" | "claim";

export type MetricFigure = {
  id: string;
  /** The figure itself, rendered large in monospace. */
  value: string;
  /** Plain-language label under the figure. */
  label: string;
  /** The kind of claim, so the reader can see where the number came from. */
  kind: MetricKind;
};

export const metricStrip = {
  label: "03 · CAPABILITY STRIP",
  kicker: "PROVENANCE ON THE PAGE",
  headline: ["The numbers,", "and where they come from."],
  sub: "What WrongTrace is, stated in figures. Every one of them is a default or a documented claim — not a measurement of your code.",
} as const;

export const metricFigures: readonly MetricFigure[] = [
  {
    id: "binary",
    value: "1",
    label: "Go binary to run",
    kind: "claim",
  },
  {
    id: "port",
    value: "3444",
    label: "default dashboard port",
    kind: "config",
  },
  {
    id: "languages",
    value: "11+",
    label: "languages under AST diffing",
    kind: "claim",
  },
  {
    id: "agents",
    value: "20+",
    label: "coding agents auto-discovered",
    kind: "claim",
  },
  {
    id: "mcp",
    value: "9",
    label: "MCP tools exposed",
    kind: "claim",
  },
  {
    id: "databases",
    value: "0",
    label: "external databases to run",
    kind: "claim",
  },
];

/**
 * The single provenance line under the strip. It names the source, and it
 * says plainly that nothing on the strip is a benchmark we ran.
 */
export const metricFootnote =
  "Every figure above is either a configuration default or a capability claim taken from the WrongTrace README — the environment-variable table for the port, and the auto-discovery, AST-diffing and MCP-tools sections for the rest. None of them is a benchmark we ran, and none of them is a measurement of your code.";

/** Where the reader can check the claims. */
export const metricFootnoteLink = {
  label: "WrongTrace README",
  href: "https://github.com/wrongstack/wrongtrace",
} as const;
