import {
  cliCommands,
  config,
  dashboardViews,
  mcpConfigSnippet,
  mcpTools,
  product,
} from "@/lib/content";

/**
 * The documentation manifest. Sections are ordered the way the reference
 * documentation sites order them: start with a quickstart, then the guides,
 * then the reference material.
 *
 * Every fact here is taken from the WrongTrace README.
 */

export type DocBlock =
  | { type: "prose"; text: string }
  | {
      type: "steps";
      items: { title: string; body: string; command?: string; note?: string }[];
    }
  | { type: "code"; code: string; caption?: string }
  | { type: "table"; columns: [string, string]; rows: [string, string][] }
  | {
      type: "rows";
      items: { label: string; value: string; hint?: string }[];
    }
  | { type: "callout"; title: string; body: string };

export type DocSection = {
  slug: string;
  title: string;
  /** Short line used on the index card and in the sidebar. */
  summary: string;
  /** Grouping label in the sidebar. */
  group: string;
  icon: string;
  body: DocBlock[];
};

export const docSections: DocSection[] = [
  {
    slug: "quickstart",
    title: "Getting started",
    summary: "Install the binary, point it at a workspace, and read the churn timeline.",
    group: "Start here",
    icon: "spark",
    body: [
      {
        type: "prose",
        text: "WrongTrace is a single Go binary. It watches your workspace, parses every change into a Tree-sitter syntax tree, and serves the result on one port. There is no database to provision and nothing to compile before you start.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Install on Linux or macOS",
            body: "Downloads the latest published binary, verifies its checksum when available, and installs it to ~/.local/bin.",
            command: product.install,
            note: "Supports Linux x64 and macOS on Apple Silicon or Intel. The installer adds its directory to your shell PATH when needed.",
          },
          {
            title: "Install on Windows",
            body: "Downloads the Windows release into your local application directory and adds it to your user PATH without administrator access.",
            command: product.installPowerShell,
            note: "Run in Windows PowerShell. The default destination is %LOCALAPPDATA%\\Programs\\WrongTrace.",
          },
          {
            title: "Initialize the workspace",
            body: "Run this inside the repository you want to observe. It writes the agent rules, the MCP client configuration and the git post-commit hook.",
            command: "wrongtrace init",
            note: "Generates AGENTS.md, CLAUDE.md, .cursorrules, .mcp.json and the telemetry hook.",
          },
          {
            title: "Start the observer",
            body: "Starts the file watcher, the OTLP receiver, the gateway proxy and the embedded dashboard on a single port.",
            command: "wrongtrace start",
            note: `Then open http://localhost:${product.dashboardPort} in a browser.`,
          },
        ],
      },
      {
        type: "prose",
        text: "To watch a different directory or port, pass them to the same command. Flags win over environment variables, which win over platform defaults.",
      },
      {
        type: "code",
        code: "wrongtrace start --watch /path/to/project --port 3444",
        caption: "Watch a specific workspace",
      },
      {
        type: "prose",
        text: "If something does not look right, ask the daemon to check itself. doctor inspects the database, the IPC endpoint, the agent log directories and the Tree-sitter parsers.",
      },
      {
        type: "code",
        code: "wrongtrace doctor",
        caption: "Diagnostics",
      },
      {
        type: "callout",
        title: "Nothing to configure first",
        body: "The daemon binds 127.0.0.1 and serves a single-user, unauthenticated surface by default. Set WRONGTRACE_TOKEN before exposing it beyond your machine.",
      },
    ],
  },
  {
    slug: "cli",
    title: "CLI reference",
    summary: "Every command the binary ships with, and what it does.",
    group: "Reference",
    icon: "terminal",
    body: [
      {
        type: "prose",
        text: "One binary, nine commands. Each is safe to run on its own; none of them require the daemon to be running first.",
      },
      {
        type: "table",
        columns: ["Command", "Description"],
        rows: cliCommands.map((c) => [c.command, c.description]),
      },
    ],
  },
  {
    slug: "mcp",
    title: "MCP server",
    summary: "Nine tools an agent can call before it touches your code.",
    group: "Reference",
    icon: "mcp",
    body: [
      {
        type: "prose",
        text: "WrongTrace serves the Model Context Protocol over stdio, so an agent can ask whether a file is safe to edit before it edits it, and can lock a fragile file against concurrent rewrites.",
      },
      {
        type: "code",
        code: mcpConfigSnippet,
        caption: "Point any MCP client at the binary",
      },
      {
        type: "prose",
        text: "That configuration goes in ~/.claude.json, .cursor/mcp.json, windsurf_mcp.json or the equivalent for your client.",
      },
      {
        type: "table",
        columns: ["Tool", "Description"],
        rows: mcpTools.map((t) => [t.tool, t.description]),
      },
    ],
  },
  {
    slug: "config",
    title: "Configuration",
    summary: "Every knob is an environment variable, read once at startup.",
    group: "Reference",
    icon: "sliders",
    body: [
      {
        type: "prose",
        text: "The daemon reads its configuration once, at startup. The defaults suit an interactive workstation; every one of them is an environment variable.",
      },
      {
        type: "rows",
        items: config.vars.map((v) => ({
          label: v.name,
          value: v.value,
          hint: v.effect,
        })),
      },
      {
        type: "callout",
        title: "Trade memory for footprint",
        body: "Lower WRONGTRACE_MEMORY_LIMIT_MB and set WRONGTRACE_AST_CACHE_MB=0 for the leanest possible long-running daemon. Raise WRONGTRACE_INDEX_CPU and WRONGTRACE_AST_CACHE_MB on a dedicated machine to index large monorepos faster.",
      },
    ],
  },
  {
    slug: "dashboard",
    title: "Dashboard views",
    summary: "Ten views, all served by the daemon itself.",
    group: "Reference",
    icon: "gauge",
    body: [
      {
        type: "prose",
        text: "The dashboard is embedded in the binary and served by the daemon, so there is no second service to deploy and no browser extension to install.",
      },
      {
        type: "table",
        columns: ["View", "Description"],
        rows: dashboardViews.map((v) => [v.view, v.description]),
      },
    ],
  },
];

export const docGroups = docSections.reduce<string[]>((groups, section) => {
  if (!groups.includes(section.group)) groups.push(section.group);
  return groups;
}, []);

export function findDocSection(slug: string) {
  return docSections.find((section) => section.slug === slug);
}
