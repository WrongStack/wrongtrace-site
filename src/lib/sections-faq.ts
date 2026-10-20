/**
 * The FAQ — six questions with full-paragraph answers, the way the reference
 * documentation sites answer them. Every claim here is true of WrongTrace as
 * described in its README.
 */

export type FaqItem = {
  id: string;
  question: string;
  /** A full paragraph, not a sentence. */
  answer: string;
  /** An optional link at the end of the answer. */
  link?: { label: string; href: string; external?: boolean };
};

export const faqSection = {
  label: "12 · QUESTIONS",
  kicker: "A FEW GOOD QUESTIONS",
  headline: ["The practical details.", "Before you decide."],
  sub: "The things people ask once they have read the rest of the page.",
  items: [
    {
      id: "where-does-data-go",
      question: "Where does the telemetry go?",
      answer:
        "Nowhere. WrongTrace runs as a daemon on your machine, binds to localhost by default, and keeps its store in a local SQLite file. Nothing is sent to a server, because there is no server. If you need to know exactly what crossed the wire, the answer is that nothing did.",
    },
    {
      id: "what-does-it-record",
      question: "What does it actually record?",
      answer:
        "File-level change and the telemetry around it: which files moved, by how much, the AST-level diff of each edit, which model and session made it, and what that cost in tokens. What it does not record is your prompts or the model's internal reasoning — it watches the code change, not the conversation that caused it.",
    },
    {
      id: "any-agent",
      question: "Does it work with any coding agent?",
      answer:
        "It auto-discovers the agents running on the machine rather than requiring a plugin per tool. The supported-agents table in the README names eighteen of them, covering the common terminal agents and the IDE-based ones, and the list grows as new agents adopt the same session files. If your agent is not on the list, the telemetry it writes to disk is still picked up.",
      link: {
        label: "See the source",
        href: "https://github.com/wrongstack/wrongtrace",
        external: true,
      },
    },
    {
      id: "ast-languages",
      question: "Which languages get AST diffing rather than text diffing?",
      answer:
        "Eleven or more, through Tree-sitter parsers, which is what makes the diff semantic: a renamed function is one change, not a deleted line and an added one. The same parser set drives the churn timeline, so a large refactor reads as a refactor instead of as a wall of line changes. The parser list is in the README.",
      link: { label: "Read the docs", href: "/docs" },
    },
    {
      id: "licence",
      question: "What does the licence actually mean?",
      answer:
        "WrongTrace is BUSL-1.1. That means free for personal work and for use inside your own company, with a commercial licence required if you want to offer it as a hosted or managed service to other people. It converts to Apache-2.0 on 2030-01-01, after which that restriction disappears and it becomes a standard open-source licence.",
    },
    {
      id: "dashboard",
      question: "How do I get to the dashboard?",
      answer:
        "Run wrongtrace start in a repository and open http://localhost:3444. The dashboard is served by the same binary that does the observing, so there is no second process and no second port to configure. If something is not right, wrongtrace doctor checks the database, the IPC socket, the agent logs and the Tree-sitter parsers and tells you which one is unhappy.",
      link: { label: "Install guide", href: "/docs" },
    },
  ] satisfies readonly FaqItem[],
} as const;
