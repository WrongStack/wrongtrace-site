/**
 * Single source of truth for every word, number and code sample on the site.
 *
 * Rule: facts come from the WrongTrace README and repository. Anything that is
 * illustrative (dashboard figures, churn counts, costs) is marked as sample
 * data in the data itself, so no screen can present it as measured.
 */

/* -------------------------------------------------------------------------- */
/* Product                                                                     */
/* -------------------------------------------------------------------------- */

export const product = {
  name: "WrongTrace",
  tagline: "See what your agents really changed.",
  version: "0.3.17",
  goVersion: "Go 1.25+",
  license: "BUSL-1.1",
  licenseNote:
    "Converts automatically to Apache-2.0 on 2030-01-01. A commercial licence is required to offer it as a hosted or managed service.",
  repo: "https://github.com/wrongstack/wrongtrace",
  dashboardPort: "3444",
  install:
    "curl -fsSL https://raw.githubusercontent.com/WrongStack/WrongTrace/master/install.sh | sh",
  installPowerShell:
    "irm https://raw.githubusercontent.com/WrongStack/WrongTrace/master/install.ps1 | iex",
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const nav = [
  { label: "What it does", href: "#capabilities" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "How it works", href: "#pipeline" },
  { label: "Configure", href: "#config" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "/docs" },
] as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  kicker: "Pure Go · v0.3.17 · BUSL-1.1",
  eyebrow: "AI-NATIVE CODE CHURN & AGENT OBSERVABILITY",
  headline: ["Every agent edit.", "A clear trace."],
  lede: "See what your coding agents actually changed. WrongTrace connects every AST-level edit to the agent, model, and session behind it.",
  chips: [
    { index: "01", label: "Single Go binary" },
    { index: "02", label: "No database to run" },
    { index: "03", label: "AST diffing, not text diffing" },
  ],
  primaryCta: { label: "Start the daemon", href: "#install" },
  secondaryCta: { label: "Read the source", href: product.repo },
} as const;

/* -------------------------------------------------------------------------- */
/* The problem                                                                 */
/* -------------------------------------------------------------------------- */

export const problem = {
  label: "02 · THE PROBLEM",
  headline: ["Your agent edited", "forty files."],
  sub: "And the log tells you what it said, not what it did.",
  points: [
    {
      title: "Terminal scroll is not an audit trail",
      body: "Agent transcripts record intent. They rarely record the exact AST mutation that followed — so the diff lands in review cold, unattributed.",
    },
    {
      title: "Two agents, one file",
      body: "When several agents work the same repository, someone rewrites what someone else just wrote. Without lineage, that collision is invisible until it breaks.",
    },
    {
      title: "Spend without survival",
      body: "Token cost is easy to read and hard to interpret. What matters is which of those tokens still exist in your code a fortnight later.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Capabilities — selected from the ten key capabilities in the README          */
/* -------------------------------------------------------------------------- */

export const capabilitiesHead = {
  label: "04 · CAPABILITIES",
  headline: ["Six things it does", "that a log never will."],
  sub: "Every capability below answers a question you currently answer by scrolling back through terminal output.",
} as const;

export const pipelineHead = {
  label: "06 · HOW IT WORKS",
  headline: ["Four steps,", "one binary."],
  sub: "From the moment an agent writes a file to the moment the mutation lands on your timeline — no pipeline to assemble, no agent to configure.",
} as const;

export type Capability = {
  id: string;
  index: string;
  title: string;
  body: string;
  icon: string;
  tags: string[];
};

export const capabilities: Capability[] = [
  {
    id: "churn",
    index: "01",
    title: "AST-level churn, not line noise",
    body: "Tree-sitter diffing across 11+ languages tracks code transformations with exact added and deleted line counts — and filters out cosmetic formatting churn that says nothing about intent.",
    icon: "churn",
    tags: ["Tree-sitter", "11+ languages"],
  },
  {
    id: "friction",
    index: "02",
    title: "Who broke whose code?",
    body: "The inter-agent friction matrix tracks which model originally authored an AST node and which later model rewrote or deleted it, with the time delta between the two writes.",
    icon: "atlas",
    tags: ["Collisions", "ΔT duration"],
  },
  {
    id: "lineage",
    index: "03",
    title: "Symbol lineage history",
    body: "Every function, method, class and struct gets a chronological lifecycle: exact revisions, the model that authored each one, and the localized diff between them.",
    icon: "lineage",
    tags: ["AST nodes", "Attribution"],
  },
  {
    id: "roi",
    index: "04",
    title: "True token ROI",
    body: "Models are graded into quality tiers from 14-day code survival rate, dollar spend per surviving node, context read-to-write ratio, and how long the work actually lasts.",
    icon: "model",
    tags: ["Quality tiers", "$/node"],
  },
  {
    id: "mcp",
    index: "05",
    title: "Guardrails over MCP",
    body: "A native stdio MCP server lets an agent ask whether a file is safe to modify before it edits, lock fragile files against concurrent rewrites, and report what it read.",
    icon: "shield",
    tags: ["9 tools", "File locks"],
  },
  {
    id: "gateway",
    index: "06",
    title: "An observer, not a middlebox",
    body: "The AI gateway relays LLM traffic and accounts prompt, completion and reasoning tokens. It is byte-preserving by default, and never stores authorization material.",
    icon: "gateway",
    tags: ["Token accounting", "Byte-preserving"],
  },
];

/* -------------------------------------------------------------------------- */
/* Pipeline — how it works                                                     */
/* -------------------------------------------------------------------------- */

export type PipelineStep = {
  index: string;
  title: string;
  body: string;
  icon: string;
  detail: string;
};

export const pipeline: PipelineStep[] = [
  {
    index: "01",
    title: "Agent acts",
    body: "A coding agent writes a file. WrongTrace is already watching the tree, and ingesting the agent's own transcript in parallel.",
    icon: "sessions",
    detail: "20+ agents auto-discovered",
  },
  {
    index: "02",
    title: "Change is captured",
    body: "The file watcher sees the write and hands the source to Tree-sitter, which parses it into a node tree rather than a wall of text.",
    icon: "ast",
    detail: "Tree-sitter AST parse",
  },
  {
    index: "03",
    title: "Nodes are diffed",
    body: "The new tree is diffed against the previous snapshot. Added and deleted lines are attributed to the agent and the model that produced them.",
    icon: "diff",
    detail: "Node-level attribution",
  },
  {
    index: "04",
    title: "Timeline is written",
    body: "The mutation joins the churn timeline, the symbol's lineage, and the session that caused it — visible in the dashboard and over MCP.",
    icon: "lineage",
    detail: "Dashboard + MCP surface",
  },
];

/* -------------------------------------------------------------------------- */
/* Dashboard mock — SAMPLE DATA                                                */
/* -------------------------------------------------------------------------- */

export type SampleEvent = {
  file: string;
  lang: string;
  model: string;
  agent: string;
  added: number;
  deleted: number;
  state: "accepted" | "pending" | "rejected";
};

export const sampleEvents: SampleEvent[] = [
  {
    file: "internal/ast/diff.go",
    lang: "Go",
    model: "claude-sonnet-5-5",
    agent: "refactor-audit",
    added: 48,
    deleted: 12,
    state: "accepted",
  },
  {
    file: "web/src/panels/DiffInspector.tsx",
    lang: "TypeScript",
    model: "gemini-3.7-flash",
    agent: "dashboard-polish",
    added: 86,
    deleted: 41,
    state: "pending",
  },
  {
    file: "internal/telemetry/store.go",
    lang: "Go",
    model: "kimi-k2",
    agent: "store-tuning",
    added: 9,
    deleted: 9,
    state: "rejected",
  },
  {
    file: "cmd/wrongtrace/main.go",
    lang: "Go",
    model: "glm-4-plus",
    agent: "cli-review",
    added: 4,
    deleted: 0,
    state: "accepted",
  },
  {
    file: "internal/gateway/proxy.go",
    lang: "Go",
    model: "claude-sonnet-5-5",
    agent: "refactor-audit",
    added: 63,
    deleted: 27,
    state: "accepted",
  },
];

export type SampleDiffLine = {
  kind: "context" | "add" | "del";
  text: string;
};

export const sampleDiff: SampleDiffLine[] = [
  { kind: "context", text: "func (d *Differ) NodeDelta(prev, next *Node) Delta {" },
  { kind: "del", text: "  if prev == nil || next == nil {" },
  { kind: "del", text: "    return Delta{Kind: Rewrite}" },
  { kind: "add", text: "  if prev == nil {" },
  { kind: "add", text: "    return Delta{Kind: Insert, Node: next}" },
  { kind: "add", text: "  }" },
  { kind: "add", text: "  if next == nil {" },
  { kind: "add", text: "    return Delta{Kind: Delete, Node: prev}" },
  { kind: "context", text: "  }" },
  { kind: "del", text: "  return diffText(prev.Text, next.Text)" },
  { kind: "add", text: "  return diffNodes(prev, next)" },
  { kind: "context", text: "}" },
];

export type SampleTimelineEntry = {
  label: string;
  at: string;
  model: string;
  added: number;
  deleted: number;
};

export const sampleTimeline: SampleTimelineEntry[] = [
  { label: "refactor-audit", at: "09:12", model: "claude-sonnet-5-5", added: 48, deleted: 12 },
  { label: "dashboard-polish", at: "09:26", model: "gemini-3.7-flash", added: 86, deleted: 41 },
  { label: "store-tuning", at: "09:41", model: "kimi-k2", added: 9, deleted: 9 },
  { label: "cli-review", at: "09:58", model: "glm-4-plus", added: 4, deleted: 0 },
  { label: "refactor-audit", at: "10:07", model: "claude-sonnet-5-5", added: 63, deleted: 27 },
];

export const dashboard = {
  label: "05 · THE DASHBOARD",
  headline: ["One view of what", "the agents did."],
  sub: "Ten views ship inside the binary. The dashboard is served by the daemon itself — there is no second service to deploy and no browser extension to install.",
  disclaimer: "SAMPLE DATA — illustrative figures for a representative session.",
} as const;

export const dashboardTabs = [
  { id: "overview", label: "Overview" },
  { id: "diffs", label: "Diffs & Changes" },
  { id: "lineage", label: "Symbol Lineage" },
  { id: "gateway", label: "AI Gateway" },
] as const;

/* -------------------------------------------------------------------------- */
/* Run modes                                                                    */
/* -------------------------------------------------------------------------- */

export const runModes = {
  label: "09 · TWO WAYS TO RUN",
  headline: ["Daemon, or MCP", "server."],
  sub: "The same binary does both. Run the observer as a background service, or let your agent talk to it directly over stdio.",
  modes: [
    {
      id: "daemon",
      label: "MODE A",
      title: "Observer daemon",
      body: "Starts the file watcher, the OTLP endpoint, the gateway proxy and the embedded dashboard on one port. Open it in a browser and the churn timeline is already running.",
      command: "wrongtrace start",
      note: `Dashboard on http://localhost:${product.dashboardPort}`,
      points: [
        "File watcher + AST diff engine",
        "Embedded React dashboard",
        "OTLP receiver for runtime traces",
        "Gateway proxy for LLM traffic",
      ],
    },
    {
      id: "mcp",
      label: "MODE B",
      title: "MCP server",
      body: "Serves the Model Context Protocol over stdio so Claude Code, Cursor, Windsurf and Cline can ask for a file's health score, take a lock, or report what they read.",
      command: "wrongtrace mcp",
      note: "Point any MCP client at it",
      points: [
        "check_guardrail before an edit",
        "lock_file / unlock_file",
        "get_file_health_score",
        "get_file_diff_history",
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Configuration                                                                */
/* -------------------------------------------------------------------------- */

export const config = {
  label: "10 · CONFIGURATION",
  headline: ["Tune it with", "environment variables."],
  sub: "The daemon reads its knobs once at startup. The defaults suit an interactive workstation; every one of them is an environment variable.",
  vars: [
    { name: "WRONGTRACE_HOME", value: "~/.wrongtrace", effect: "Root for the database, socket, project registry and gateway routes." },
    { name: "WRONGTRACE_PORT", value: "3444", effect: "Port for the dashboard, JSON API, gateway proxy and OTLP receiver. PORT is honoured as a fallback." },
    { name: "WRONGTRACE_TOKEN", value: "unset", effect: "Requires a bearer token on every data-bearing route, including WebSocket and proxy traffic." },
    { name: "WRONGTRACE_MAX_PROCS", value: "min(NumCPU, 4)", effect: "GOMAXPROCS ceiling. Also bounds the GC's dedicated workers." },
    { name: "WRONGTRACE_MEMORY_LIMIT_MB", value: "512", effect: "Soft heap ceiling the GC paces against." },
    { name: "WRONGTRACE_INDEX_CPU", value: "50", effect: "Percent of one core the workspace indexer may use. 100 disables pacing for batch runs." },
    { name: "WRONGTRACE_AST_CACHE_MB", value: "48", effect: "Compressed-source budget for the AST snapshot cache. 0 keeps node-level diffs only." },
    { name: "WRONGTRACE_AST_MAX_SNAPSHOTS", value: "8000", effect: "Parsed file snapshots retained before the coldest are dropped and re-parsed." },
    { name: "WRONGTRACE_MAX_SCAN_DEPTH", value: "8", effect: "Directory levels below each watched root that transcript discovery descends." },
    { name: "WRONGTRACE_PPROF", value: "unset", effect: "Set to 1 to expose loopback pprof endpoints on 127.0.0.1:6060." },
    { name: "WRONGTRACE_PROXY_LOG", value: "on", effect: "Set to 0 to silence proxy lifecycle console logging. Telemetry is unaffected." },
    { name: "WRONGTRACE_LOG_ALL_HTTP", value: "unset", effect: "Set to 1 to log every HTTP request instead of only errors and slow requests." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Install                                                                      */
/* -------------------------------------------------------------------------- */

export const install = {
  label: "11 · INSTALL",
  headline: ["Running in", "two commands."],
  sub: "Install the binary, initialize the workspace, and start the observer. The dashboard is one browser tab away.",
  steps: [
    {
      command: product.install,
      note: "Installs the wrongtrace binary from source.",
    },
    {
      command: "wrongtrace init",
      note: "Generates agent rules, .mcp.json and the git post-commit hook in the current workspace.",
    },
    {
      command: "wrongtrace start",
      note: `Starts the daemon. Open http://localhost:${product.dashboardPort} to see the churn timeline.`,
    },
  ],
  alternatives: [
    { label: "Diagnostics", command: "wrongtrace doctor" },
    { label: "Quick summary", command: "wrongtrace status" },
    { label: "Export telemetry", command: "wrongtrace export" },
    { label: "Executive report", command: "wrongtrace report" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                          */
/* -------------------------------------------------------------------------- */

export const faq = {
  label: "12 · QUESTIONS",
  headline: ["Direct answers.", "No hedging."],
  sub: "The details that decide whether a tool belongs in your repository.",
  items: [
    {
      q: "Do I need to run a database service?",
      a: "No. WrongTrace keeps its own local SQLite database under WRONGTRACE_HOME alongside its socket and project registry. There is no server to provision, no connection string to configure and nothing to back up separately.",
    },
    {
      q: "Does it modify my code?",
      a: "No. WrongTrace is an observer. It reads the tree, parses it and records what changed. The one exception is the guardrail lock, which an agent may take through MCP to mark a fragile file — the daemon still never rewrites your source.",
    },
    {
      q: "What happens to the traffic it relays?",
      a: "The gateway is byte-preserving by default, so your SDK behaves exactly as it would without the proxy. Authorization material is never stored. Secret redaction, quota blocking and usage-option injection are mutating guardrails, and only run when a request explicitly sends X-WrongTrace-Policy: enforce.",
    },
    {
      q: "How many coding agents does it understand?",
      a: "Twenty or more, discovered with no configuration: WrongStack, Claude Code, Cursor, Windsurf, Cline, Roo, Antigravity, Aider, Continue, GitHub Copilot, Goose, OpenHands, Devin, Trae, Zed AI and more. It reads each one's native transcript format.",
    },
    {
      q: "Which languages can it diff?",
      a: "Tree-sitter parsing covers 11+ languages, and the diff is computed on the syntax tree rather than on text — so a reformat that does not change a node is not counted as churn.",
    },
    {
      q: "Can I use it commercially?",
      a: "Yes, for your own software. BUSL-1.1 allows free use for personal projects and internal development within your own organization. Offering WrongTrace as a paid hosted or managed service to third parties requires a commercial licence from WrongStack. On 2030-01-01 the licence converts automatically to Apache-2.0.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* CTA + footer                                                                 */
/* -------------------------------------------------------------------------- */

export const cta = {
  headline: ["Stop guessing", "what changed."],
  sub: "Run the daemon against a repository where an agent has already been working. The churn timeline fills in on its own.",
  primary: { label: "Install WrongTrace", command: product.install },
  secondary: { label: "View on GitHub", href: product.repo },
  licence:
    "BUSL-1.1 — free for personal and internal use. Converts to Apache-2.0 on 2030-01-01.",
} as const;

export const footer = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "What it does", href: "#capabilities" },
        { label: "Dashboard", href: "#dashboard" },
        { label: "Configuration", href: "#config" },
        { label: "Get started", href: "#install" },
        { label: "Documentation", href: "/docs" },
      ],
    },
    {
      title: "Project",
      links: [
        { label: "Source", href: product.repo },
        { label: "License", href: `${product.repo}/blob/master/LICENSE` },
        { label: "Changelog", href: `${product.repo}/blob/master/CHANGELOG.md` },
        { label: "Issues", href: `${product.repo}/issues` },
      ],
    },
  ],
  legal: "BUSL-1.1. Converts to Apache-2.0 on 2030-01-01.",
  copyright: "WrongStack",
} as const;

/* -------------------------------------------------------------------------- */
/* Dashboard mock — additional SAMPLE DATA                                      */
/* -------------------------------------------------------------------------- */

export const sampleKpis = [
  { label: "Net LOC delta", value: "+210", tone: "primary", note: "across 5 files" },
  { label: "Spend vs. waste", value: "$18.40", tone: "warning", note: "$3.12 unrecovered" },
  { label: "Thrashing alerts", value: "2", tone: "danger", note: "same file, 2 models" },
  { label: "Active models", value: "4", tone: "success", note: "this session" },
] as const;

export const sampleDiffs: Record<string, SampleDiffLine[]> = {
  "internal/ast/diff.go": sampleDiff,
  "internal/gateway/proxy.go": [
    { kind: "context", text: "func (p *Proxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {" },
    { kind: "del", text: "  body, _ := io.ReadAll(r.Body)" },
    { kind: "del", text: "  resp, err := p.upstream.Do(r)" },
    { kind: "add", text: "  body, err := io.ReadAll(r.Body)" },
    { kind: "add", text: "  if err != nil {" },
    { kind: "add", text: "    http.Error(w, \"read body\", http.StatusBadRequest)" },
    { kind: "add", text: "    return" },
    { kind: "add", text: "  }" },
    { kind: "add", text: "  resp, err := p.upstream.Do(r)" },
    { kind: "context", text: "  defer resp.Body.Close()" },
    { kind: "add", text: "  p.finalize(r, resp, body)" },
  ],
  "web/src/panels/DiffInspector.tsx": [
    { kind: "context", text: "export function DiffInspector({ diff }: Props) {" },
    { kind: "del", text: "  return <pre>{diff.text}</pre>;" },
    { kind: "add", text: "  const rows = useMemo(() => diff.lines, [diff.lines]);" },
    { kind: "add", text: "  return (" },
    { kind: "add", text: "    <div className=\"diff\">" },
    { kind: "add", text: "      {rows.map((row) => (" },
    { kind: "add", text: "        <DiffRow key={row.n} row={row} />" },
    { kind: "add", text: "      ))}" },
    { kind: "add", text: "    </div>" },
    { kind: "add", text: "  );" },
    { kind: "context", text: "}" },
  ],
  "internal/telemetry/store.go": [
    { kind: "context", text: "func (s *Store) Append(rec Record) error {" },
    { kind: "del", text: "  s.mu.Lock()" },
    { kind: "del", text: "  defer s.mu.Unlock()" },
    { kind: "add", text: "  s.mu.Lock()" },
    { kind: "add", text: "  defer s.mu.Unlock()" },
    { kind: "add", text: "  s.pending = append(s.pending, rec)" },
    { kind: "add", text: "  if len(s.pending) >= flushBatch {" },
    { kind: "add", text: "    return s.flushLocked()" },
    { kind: "add", text: "  }" },
    { kind: "context", text: "  return nil" },
  ],
  "cmd/wrongtrace/main.go": [
    { kind: "context", text: "func main() {" },
    { kind: "add", text: "  ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)" },
    { kind: "add", text: "  defer cancel()" },
    { kind: "add", text: "" },
    { kind: "add", text: "  if err := run(ctx); err != nil {" },
    { kind: "context", text: "    os.Exit(1)" },
    { kind: "context", text: "  }" },
  ],
};

export type SampleRevision = {
  version: string;
  at: string;
  model: string;
  change: "added" | "modified" | "reverted";
  added: number;
  deleted: number;
};

export const sampleLineage: SampleRevision[] = [
  { version: "v1", at: "Oct 14", model: "claude-sonnet-5-5", change: "added", added: 34, deleted: 0 },
  { version: "v2", at: "Oct 16", model: "gemini-3.7-flash", change: "modified", added: 12, deleted: 8 },
  { version: "v3", at: "Oct 18", model: "kimi-k2", change: "reverted", added: 0, deleted: 26 },
  { version: "v4", at: "Oct 20", model: "claude-sonnet-5-5", change: "modified", added: 48, deleted: 12 },
];

export type SampleGatewayRow = {
  provider: string;
  prompt: string;
  completion: string;
  reasoning: string;
  cached: string;
};

export const sampleGateway: SampleGatewayRow[] = [
  { provider: "Anthropic", prompt: "184,220", completion: "21,480", reasoning: "9,140", cached: "62,000" },
  { provider: "OpenAI", prompt: "96,410", completion: "14,220", reasoning: "—", cached: "28,400" },
  { provider: "Google Gemini", prompt: "52,880", completion: "8,960", reasoning: "3,120", cached: "11,200" },
  { provider: "DeepSeek", prompt: "18,340", completion: "2,410", reasoning: "880", cached: "—" },
];

export const sampleLineageSymbol = {
  file: "internal/ast/diff.go",
  symbol: "NodeDelta",
  kind: "func",
} as const;

/* -------------------------------------------------------------------------- */
/* Documentation — facts taken from the WrongTrace README                      */
/* -------------------------------------------------------------------------- */

export const cliCommands = [
  { command: "wrongtrace start", description: "Run the observer daemon, file watcher, OTLP endpoint and embedded dashboard." },
  { command: "wrongtrace init", description: "Initialize agent rules (CLAUDE.md, AGENTS.md), .mcp.json and git hooks." },
  { command: "wrongtrace doctor", description: "Run diagnostics on SQLite, IPC, agent logs and Tree-sitter parsers." },
  { command: "wrongtrace mcp", description: "Serve the Model Context Protocol over stdio for MCP clients." },
  { command: "wrongtrace trace", description: "Execute a command or test, measure runtime latency, record profiler telemetry." },
  { command: "wrongtrace hook", description: "Install or remove git hooks for automated telemetry and churn tracking." },
  { command: "wrongtrace export", description: "Export telemetry and code churn records to JSON." },
  { command: "wrongtrace report", description: "Generate an executive Markdown, HTML or JSON observability report." },
  { command: "wrongtrace status", description: "Print a summary of the database path, monitored repo, totals and active models." },
  { command: "wrongtrace update", description: "Update the current binary to the latest GitHub release, with checksum verification." },
] as const;

export const mcpTools = [
  { tool: "check_guardrail", description: "Check whether a file is safe to modify before an automated refactor touches it." },
  { tool: "get_file_health_score", description: "Return a 0-100 health score, fragility status and recent thrash events." },
  { tool: "report_telemetry", description: "Record run intent, model name, token usage and cost." },
  { tool: "lock_file", description: "Lock a fragile file against concurrent rewrites." },
  { tool: "unlock_file", description: "Release a lock once the work is complete." },
  { tool: "list_locks", description: "List active, unexpired guardrail locks with their TTL and owner." },
  { tool: "report_file_read", description: "Record file reading activity with its line range and token consumption." },
  { tool: "get_file_read_stats", description: "Query aggregate read counts, unique models and cost per file." },
  { tool: "get_file_diff_history", description: "Retrieve recent AST mutation history for a file, or repo-wide when omitted." },
] as const;

export const dashboardViews = [
  { view: "Overview", description: "Churn timeline, Net LOC delta, spend versus waste, thrashing alerts and a live event stream." },
  { view: "Inter-Agent Friction", description: "Collision heatmap, who broke whose code, time delta and overwrite diffs." },
  { view: "Model Intelligence", description: "Quality tiers, 14-day code survival rate, true token ROI and the context read matrix." },
  { view: "Code Atlas", description: "Full-screen AST graph with auto-centering, orbit/tree/grid layouts and a file lifetime timeline." },
  { view: "Diffs & Changes", description: "Rich diff inspector with syntax highlighting and added/deleted line statistics." },
  { view: "Symbol Lineage", description: "Chronological revision timeline for any AST node, with author model attribution." },
  { view: "Agent Sessions & Catalog", description: "Multi-agent session monitor, model pricing registry and an interactive cost simulator." },
  { view: "Profiler & Runtime Traces", description: "OpenTelemetry ingest, P50/P90/P99 latency percentiles and hotspot analysis." },
  { view: "AI Gateway & Wire Traffic", description: "Transparent proxy for LLM APIs, token composition, budget quotas and cache savings." },
  { view: "Settings & Governance", description: "Workspace management, retention pruning, guardrail file locking and webhooks." },
] as const;

export const mcpConfigSnippet = `{
  "mcpServers": {
    "wrongtrace": {
      "command": "wrongtrace",
      "args": ["mcp"]
    }
  }
}`;

