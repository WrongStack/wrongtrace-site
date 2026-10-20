# WrongTrace — website design brief

## Product

WrongTrace: an AI-native code churn and agent observability daemon. A single Go binary
with an embedded React dashboard, Tree-sitter AST diffing, and MCP + IPC telemetry.
It answers one question that agentic coding made urgent: **what did my agent actually
change, and why?**

## Audience

- **Primary:** engineering leads and platform teams running coding agents (Claude Code,
  Codex, WrongStack subagents) across a shared monorepo who need an audit trail of
  churn, not a wall of raw terminal logs.
- **Secondary:** individual developers who want to see one agent session's file-level
  effect without leaving the terminal, and reviewers who need to understand *why* a
  diff happened.
- **Tertiary:** technical decision-makers evaluating observability tooling for agent
  workflows.

## Primary task

Land on the page → understand in ~8 seconds that WrongTrace traces agent code churn →
see that it is one Go binary with no database → get the install command → open the
dashboard. Every section must push toward one of those four things.

## Real content (no invented metrics, no fake testimonials)

Facts are taken from the WrongStack/WrongTrace public repository and its README.

- Single Go binary, embedded React dashboard, Tree-sitter AST diffing, MCP + IPC telemetry.
- Busiest signal in the README is code churn: AST-level diffs of what agents changed.
- Telemetry surfaces over MCP and IPC; a loopback HTTP proxy captures agent traffic.
- Configuration is environment-driven, e.g. `WRONGTRACE_MAX_SCAN_DEPTH` (default 8),
  `WRONGTRACE_AST_MAX_SNAPSHOTS` (default 8000), `WRONGTRACE_AST_CACHE_MB`,
  `WRONGTRACE_INDEX_CPU`, `WRONGTRACE_MEMORY_LIMIT_MB`, `WRONGTRACE_PPROF_ADDR`,
  `WRONGTRACE_PROXY_LOG`, `WRONGTRACE_LOG_ALL_HTTP`, `WRONGTRACE_VERBOSE`.
- Licence is BUSL-1.1: free for personal work and internal use; a commercial licence is
  required to offer it as a hosted/managed service; converts to Apache-2.0 on
  **2030-01-01**. This is a commercial decision, so it is stated plainly, not buried.
- Repo: github.com/WrongStack/WrongTrace.

**Explicitly excluded:** benchmark numbers, user counts, testimonials, funding claims,
"trusted by" logos, and any telemetry figures presented as if measured. Where the site
needs to show a dashboard, the data is labelled *sample data* on the surface itself.

## Layout hierarchy

1. **Hero** — single claim, one-line proof, install command, three trust chips.
2. **The problem** — the raw-log problem, stated in the user's own words.
3. **Live product surface** — interactive dashboard mock (tabs, churn timeline, diff
   inspector). The single most persuasive block; sample data labelled.
4. **Capabilities** — six-part grid, each with a hand-drawn SVG glyph.
5. **How it works** — four-step animated pipeline: agent → capture → AST diff → timeline.
6. **Config reference** — terminal block of real env vars with defaults.
7. **Two ways to run** — daemon mode vs MCP server mode.
8. **FAQ** — six questions, direct answers.
9. **CTA + footer** — install, source, licence.

## Product-specific visual idea

The visual identity is a **churn diff**: the site's signature graphic is a line of
changed code whose segments light up in sequence, and the accent colour is used exactly
the way a diff viewer uses it — cyan for added structure, green for accepted state,
amber for a pending edit, red for a rejected one. The hero carries a live AST-diff
animation: a file tree on the left, a diff pane on the right, and a churn timeline
underneath that fills as "agents" commit edits. Everything else stays quiet.

Section headers follow the reference sites' convention: `01 / WHAT IT DOES` in
monospace, tracked-out caps, followed by a two-line statement headline where the
second line is the point.

## Design system

Kit: **dark-pro**. Dark is the primary theme; light is the secondary derivative.
Deep blue-neutral base (not pure black), one electric cyan accent, restrained
semantic neons, 1px hairline borders, monospace for IDs/metrics/code, Inter/Geist for
prose. Density is a feature. Glow only on accent and active states.

## Numeric claims and their provenance

Every number rendered on the site falls into exactly one of three buckets.
Nothing on the page is an invented measurement.

**1. Real configuration defaults** — copied verbatim from the WrongTrace README
and served by the daemon as documented:

| Number | Claim | Source |
|---|---|---|
| `3444` | default dashboard/API port | README, "Environment variables" table |
| `8` | `WRONGTRACE_MAX_SCAN_DEPTH` default | README |
| `8000` | `WRONGTRACE_AST_MAX_SNAPSHOTS` default | README |
| `48` | `WRONGTRACE_AST_CACHE_MB` default | README |
| `512` | `WRONGTRACE_MEMORY_LIMIT_MB` default | README |
| `50` | `WRONGTRACE_INDEX_CPU` default | README |

**2. Upstream capability claims** — the project's own documented figures, quoted
rather than measured by us. These describe what the software does, not how it
performed:

| Number | Claim | Source (WrongTrace README) |
|---|---|---|
| `20+` | coding agents auto-discovered | "Universal Auto-Discovery for 20+ Coding Agents" — the supported-agents table enumerates 18 named agents, some covering several (Cline & Roo), plus "and more" |
| `11+` | languages covered by AST diffing | "Semantic AST Churn & Accurate Multi-Line Diffing … across 11+ languages" |
| `9` | MCP tools exposed | "Available MCP Tools" — nine tools listed |
| `10` | dashboard views | "Dashboard Views" — ten rows |
| `14-day` | code survival-rate window | "Model Intelligence & True Token ROI Matrix … 14-day code survival rate %" |
| `2030-01-01` | BUSL-1.1 → Apache-2.0 conversion | "License & Commercial Terms" |
| `0.3.17` | current version | README version badge |

**3. Sample data** — everything inside the dashboard mock (churn counts, LOC
deltas, token totals, spend, KPI tiles, file lists, diffs, revision history).
These are illustrative and labelled **SAMPLE DATA** on the surface itself.

Deliberately excluded: benchmarks, user counts, testimonials, funding claims,
"trusted by" logos, and any figure that could read as an independently
measured result.

## Acceptance checks

- [ ] Contrast: body text ≥ 4.5:1, large text and UI borders ≥ 3:1, in both themes.
- [ ] Keyboard: every interactive element reachable and operable; visible focus ring
      on the accent; skip-to-content link; accordions are real buttons with
      `aria-expanded`; tabs follow the ARIA tabs pattern with arrow-key navigation.
- [ ] Reduced motion: `prefers-reduced-motion: reduce` disables the scroll reveals,
      the diff animation, the marquee, and the count-up, leaving static content.
- [ ] Responsive: verified at 1440, 1024, 768, and 390 CSS px. No horizontal scroll
      at any width. The dashboard mock reflows to a stacked layout below 768.
- [ ] The install command is a real, copyable command.
- [ ] Every number on the page is a real config default, an upstream capability
      claim from the README (see *Numeric claims and their provenance*), or is
      labelled as sample data.
- [ ] Typecheck, lint, and `next build` all pass.
