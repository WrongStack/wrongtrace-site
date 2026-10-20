/**
 * The fine print — what WrongTrace does not do.
 *
 * These are real limits of the product, not hedges. A section that only
 * lists strengths is an advertisement, and the reference sites earn trust by
 * stating the trade honestly.
 */

export type FinePrintItem = {
  id: string;
  title: string;
  body: string;
};

export const finePrint = {
  label: "08 · FINE PRINT",
  kicker: "THE USEFUL FINE PRINT",
  headline: ["What it does not do.", "Said plainly."],
  sub: "Finding these out during an incident is worse than reading them here.",
  items: [
    {
      id: "not-production",
      title: "It does not trace production traffic",
      body: "WrongTrace is a developer tool that watches a repository on your machine. It has no view of your deployed services, so it cannot tell you how a request behaved in production. That question belongs to an APM.",
    },
    {
      id: "not-review",
      title: "It does not replace code review",
      body: "A churn timeline tells you that a file changed and which model changed it. It does not tell you whether the change was correct. The attribution is evidence for a reviewer, not a substitute for one.",
    },
    {
      id: "not-a-team-tool",
      title: "It is a single operator's tool",
      body: "There are no team accounts, no shared dashboard and no SSO. The daemon is a process on your machine and its store is a local SQLite file. If you need a fleet view of what every engineer did, this is not it.",
    },
    {
      id: "local-only",
      title: "It only sees agents on the same machine",
      body: "WrongTrace observes the agents it can see on the host it runs on. An agent running somewhere else, over a remote shell or in a container you have not wired in, is invisible to it.",
    },
    {
      id: "churn-not-reasoning",
      title: "It records churn, not reasoning",
      body: "What lands in the store is file-level change and the telemetry around it. Your prompts, your context window and the model's internal reasoning are not captured. If you were hoping for a transcript, this is not that either.",
    },
    {
      id: "licence",
      title: "The licence is BUSL-1.1 until 2030-01-01",
      body: "WrongTrace is free for personal work and internal use. Offering it as a hosted or managed service needs a commercial licence. It converts to Apache-2.0 on 2030-01-01, after which that restriction goes away.",
    },
  ] satisfies readonly FinePrintItem[],
} as const;
