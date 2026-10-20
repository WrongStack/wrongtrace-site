/**
 * Comparison table — WrongTrace against the two things it is usually held
 * up against: the raw terminal log and a full APM vendor.
 *
 * The verdict below is deliberately one-sided against us. The two columns we
 * lose on are stated plainly, because a comparison that only wins is an
 * advertisement, not a comparison.
 */

export const comparisonColumnIds = ["wrongtrace", "logs", "apm"] as const;

export type ComparisonColumnId = (typeof comparisonColumnIds)[number];

/** One verdict per column, keyed by column id so nothing can drift. */
export type ComparisonVerdicts = Record<ComparisonColumnId, string>;

export type ComparisonColumn = {
  id: ComparisonColumnId;
  /** Column header text. */
  label: string;
  /** Icon key. The component owns the string-to-glyph map. */
  icon: "churn" | "terminal" | "profiler";
};

export type ComparisonRow = {
  id: string;
  /** The capability under comparison, rendered as the row header. */
  capability: string;
  verdicts: ComparisonVerdicts;
};

export const comparison = {
  label: "07 · COMPARISON",
  kicker: "THREE WAYS TO WATCH A RUN",
  headline: ["WrongTrace against", "raw logs and APM."],
  sub: "Three tools that all claim to watch a coding agent run. They do not answer the same question, and the difference is not a feature gap — it is scope.",
  /** Accessible name for the table itself. */
  caption:
    "Capability comparison: WrongTrace against raw terminal logs and a full APM vendor.",
} as const;

export const comparisonColumns: readonly ComparisonColumn[] = [
  { id: "wrongtrace", label: "WrongTrace", icon: "churn" },
  { id: "logs", label: "Raw terminal logs", icon: "terminal" },
  { id: "apm", label: "A full APM vendor", icon: "profiler" },
];

export const comparisonRows: readonly ComparisonRow[] = [
  {
    id: "churn",
    capability: "What the agent changed",
    verdicts: {
      wrongtrace: "AST-level churn, per file",
      logs: "Only what the log printed",
      apm: "Not covered",
    },
  },
  {
    id: "attribution",
    capability: "Why it changed",
    verdicts: {
      wrongtrace: "Attributed to a session and a model",
      logs: "No",
      apm: "No",
    },
  },
  {
    id: "cost",
    capability: "Token and cost attribution",
    verdicts: {
      wrongtrace: "Per model and per file",
      logs: "No",
      apm: "Only through an LLM gateway",
    },
  },
  {
    id: "tracing",
    capability: "Production request tracing",
    verdicts: {
      wrongtrace: "Not covered — it is a developer tool",
      logs: "No",
      apm: "Covered",
    },
  },
  {
    id: "setup",
    capability: "Setup",
    verdicts: {
      wrongtrace: "One binary, no database",
      logs: "Nothing to set up",
      apm: "An agent plus instrumentation",
    },
  },
  {
    id: "team",
    capability: "Team and multi-user",
    verdicts: {
      wrongtrace: "Single operator, no shared dashboard",
      logs: "No",
      apm: "Covered",
    },
  },
  {
    id: "licence",
    capability: "Licence",
    verdicts: {
      wrongtrace: "BUSL-1.1, converting to Apache-2.0 on 2030-01-01",
      logs: "n/a",
      apm: "Proprietary",
    },
  },
];

/**
 * The verdict line under the table. It concedes the two columns WrongTrace
 * loses, then makes the case for the question only WrongTrace answers.
 */
export const comparisonVerdict = {
  lead: "The honest pitch:",
  body: "WrongTrace cannot see your production traffic and it has no team features, so an APM answers a question WrongTrace cannot.",
  closing:
    "What only WrongTrace answers is what the agent wrote to your code — file by file, model by model.",
} as const;
