import { pipelineHead } from "@/lib/content";

/**
 * Copy for the "How it works" section, rebuilt as an interactive numbered
 * stepper.
 *
 * Every figure here is either a real WrongTrace configuration default or an
 * upstream capability claim quoted from the README. The monospace trace lines
 * are illustrative of the daemon's log output — they are labelled as sample
 * data on the surface, because no captured output is shipped with the site.
 */

export type PipelineStage = {
  id: string;
  /** Two-digit position marker, e.g. "03". */
  index: string;
  title: string;
  body: string;
  /** Monospace trace line shown under the stage. */
  trace: string;
  /** Icon key resolved by the component's explicit icon map. */
  icon: string;
};

export const pipelineStages: readonly PipelineStage[] = [
  {
    id: "run",
    index: "01",
    title: "The agent runs",
    body: "A coding agent opens the repository and starts editing. WrongTrace is already watching the tree, has already discovered the agent, and has already attached to its session — 20+ coding agents are recognised without configuration.",
    trace: "→ session attached · 20+ agents auto-discovered",
    icon: "sessions",
  },
  {
    id: "capture",
    index: "02",
    title: "WrongTrace captures the change",
    body: "The file watcher sees the write and snapshots the file before the agent's own transcript catches up. Scanning runs 8 levels deep by default, so a refactor in a nested package is still seen.",
    trace: "→ write captured · scan depth 8",
    icon: "churn",
  },
  {
    id: "parse",
    index: "03",
    title: "Tree-sitter parses the AST",
    body: "The new file is parsed into a node tree instead of a wall of text, across 11+ languages. Snapshots live in a 48 MB cache, up to 8000 of them, so a second look at the same file is cheap.",
    trace: "→ ast parsed · 11+ languages · 48 MB cache",
    icon: "ast",
  },
  {
    id: "attribute",
    index: "04",
    title: "The diff is attributed",
    body: "The new tree is diffed against the previous snapshot, node by node. Each mutation is attributed to the session and the model that produced it, with the exact added and deleted lines counted.",
    trace: "→ diff attributed · agent and model named",
    icon: "diff",
  },
  {
    id: "record",
    index: "05",
    title: "The timeline records it",
    body: "The mutation joins the churn timeline, the symbol's lineage and the session that caused it. It is readable across 10 dashboard views and over 9 MCP tools, from the daemon on port 3444.",
    trace: "→ timeline appended · dashboard :3444",
    icon: "lineage",
  },
] as const;

export const pipelineSection = {
  label: pipelineHead.label,
  kicker: "TREE-SITTER / MCP + IPC",
  headline: ["Five stages,", "one binary."] as const,
  emphasis: true,
  sub: pipelineHead.sub,
} as const;
