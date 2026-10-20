# WrongTrace — website design brief (revision 2)

Supersedes revision 1. The site is being renewed end to end against a wider
reference set: **oxog.net**, **ninedeploy.com**, **labyrinthdns.com** and
**cobaltdb.dev**. This revision records what those four have in common, what
the current site gets wrong against them, and what the renewal must deliver.

## Product

WrongTrace: an AI-native code churn and agent observability daemon. A single
Go binary with an embedded React dashboard, Tree-sitter AST diffing, and MCP +
IPC telemetry. It answers one question that agentic coding made urgent: **what
did my agent actually change, and why?**

## Audience

- **Primary:** engineering leads and platform teams running coding agents
  (Claude Code, Codex, WrongStack subagents) across a shared monorepo who need
  an audit trail of churn, not a wall of raw terminal logs.
- **Secondary:** individual developers who want to see one agent session's
  file-level effect without leaving the terminal, and reviewers who need to
  understand *why* a diff happened.
- **Tertiary:** technical decision-makers evaluating observability tooling for
  agent workflows.

## Primary task

Land on the page → understand in ~8 seconds that WrongTrace traces agent code
churn → see that it is one Go binary with no database → get the install
command → open the dashboard. Every section must push toward one of those four
things.

## What the four references have in common

These are the measured patterns the renewal is built on. Each one is something
the current site does **not** do, or does weakly.

| Pattern | Reference | What it looks like |
|---|---|---|
| Editorial two-line headline, second line is the point | all four | "Every query. / _A clear path._" — the second line carries the argument, often with one italic word |
| Kicker above the headline | labyrinth, ninedeploy | "Independent by design. PURE GO / v0.8.44" |
| Numbered section markers | all four | "01 · Features", "02 · Dashboard" — two-digit, a middle dot, then the label |
| **An interactive live diagram in the hero** | labyrinth, ninedeploy | a draggable node graph with a play button and a step counter; a topology with a "push a broken one" toggle |
| **A fake product surface that is a window** | labyrinth, ninedeploy | browser chrome, tabs, a live table with real status words (`NOERROR`, `CACHE`, `BLOCKED`) |
| **A numbered stepper with monospace trace lines** | ninedeploy, labyrinth | "01 of 10" and under each step a `→ deployment #48 queued · slot-1 claimed` line in mono |
| **A metric strip with a provenance footnote** | labyrinth | `6.86.8 MB` / `2222M/s` / `4545 ns` with the benchmark and hardware named underneath |
| **A comparison table with an honest verdict** | labyrinth, ninedeploy | capability rows across three columns, then one line: "The honest pitch: …" |
| **A tabbed terminal block** | ninedeploy, labyrinth | `CLI / SDK / MCP / Manifest` tabs, one terminal, `install script / docker / from source` |
| **An honest "fine print" section** | ninedeploy, labyrinth | what the product does *not* do, stated plainly, before the FAQ |
| **FAQ as numbered prose, not an accordion** | labyrinth | "01 Where do my queries go?" with a full-paragraph answer and a link |
| A repeated closing CTA with a variant | ninedeploy | "Your server. Your rules." + a bare-metal/docker toggle + the install command |
| An editorial numbered feature list, not a card grid | labyrinth | `/01 Single binary`, each with a bold title and a paragraph |
| A cross-product mention | labyrinth | a sibling product with its logo, for the traffic it actually deserves |

## Real content (no invented metrics)

Every number on the site is one of three kinds, and the kind is always
visible on the page. This is unchanged from revision 1 and is non-negotiable.

1. **Real configuration defaults**, copied from the WrongTrace README:
   `3444` (default port), `8` (`WRONGTRACE_MAX_SCAN_DEPTH`), `8000`
   (`WRONGTRACE_AST_MAX_SNAPSHOTS`), `48` (`WRONGTRACE_AST_CACHE_MB`), `512`
   (`WRONGTRACE_MEMORY_LIMIT_MB`), `50` (`WRONGTRACE_INDEX_CPU`).
2. **Upstream capability claims**, quoted from the README rather than measured
   by us: `20+` coding agents auto-discovered, `11+` languages under AST
   diffing, `9` MCP tools, `10` dashboard views, `14-day` code survival-rate
   window, `0-100` file health score, `2030-01-01` BUSL-1.1 → Apache-2.0
   conversion, `0.3.17` current version.
3. **Sample data**, always labelled *sample data* on the surface that shows it:
   the dashboard mock's churn figures, costs, KPIs and query rows.

Explicitly excluded: benchmark numbers, user counts, testimonials, funding
claims, "trusted by" logos, and any figure presented as if we measured it.

## Layout hierarchy (the renewal)

1. **Hero** — kicker, two-line editorial headline, install command, three
   numbered chips, and the live AST-diff panel.
2. **The problem** — the raw-log problem, in the user's own words.
3. **Capability strip** — *new.* A mono metric strip with a provenance
   footnote naming what each number is.
4. **Capabilities** — *rebuilt* as an editorial numbered list (`/01` …), not a
   card grid.
5. **Dashboard** — the interactive mock, framed as a real window with tabs and
   a live table, captioned as illustrative numbers in a real layout.
6. **How it works** — *rebuilt* as a numbered stepper, each step carrying a
   monospace trace line, with a step counter.
7. **Comparison** — *new.* WrongTrace against raw terminal logs and against a
   full APM vendor, with the honest verdict.
8. **Fine print** — *new.* What WrongTrace does not do, stated plainly.
9. **Two ways to run** — daemon mode vs MCP server mode.
10. **Configuration** — the real environment variables, with their defaults.
11. **Install** — *rebuilt* as a tabbed terminal block.
12. **FAQ** — *rebuilt* as numbered prose questions, not an accordion.
13. **CTA + footer** — the closing command, the repo, and the licence.

The `/docs` route stays as it is: five prerendered section pages, a sticky
section list, and real facts from the README.

## Product-specific visual idea

The visual identity is a **churn diff**. The signature graphic is a line of
changed code whose segments light up in sequence, and the accent colour is
used the way a diff viewer uses it: cyan for added structure, green for
accepted state, amber for a pending edit, red for a rejected one. The hero
carries a live AST diff — file tree on the left, diff pane on the right, churn
timeline underneath that fills as "agents" commit edits. Everything else stays
quiet.

## Design system

Kit: **dark-pro**. Dark is primary; light is the secondary derivative. Deep
blue-neutral base (not pure black), one electric cyan accent, restrained
semantic neons, 1px hairline borders, monospace for IDs/metrics/code, Inter or
Geist for prose. Density is a feature. Glow only on accent and active states.

Type scale moves up for the renewal: the hero headline is the largest thing on
the site, section headlines are two lines with the second line carrying the
point, and body copy is 15–16px with a 1.6 measure. Section markers use the
`01 · LABEL` convention.

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

**2. Upstream capability claims** — the project's own documented figures,
quoted rather than measured by us:

| Number | Claim | Source (WrongTrace README) |
|---|---|---|
| `20+` | coding agents auto-discovered | "Universal Auto-Discovery for 20+ Coding Agents" — the supported-agents table enumerates 18 named agents, some covering several (Cline & Roo), plus "and more" |
| `11+` | languages covered by AST diffing | "Semantic AST Churn & Accurate Multi-Line Diffing … across 11+ languages" |
| `9` | MCP tools exposed | "Available MCP Tools" — nine tools listed |
| `10` | dashboard views | "Dashboard Views" — ten rows |
| `14-day` | code survival-rate window | "Model Intelligence & True Token ROI Matrix … 14-day code survival rate %" |
| `0-100` | file health score range | README, "Available MCP Tools" — `get_file_health_score` returns a 0-100 health score, an upstream capability description rather than a measurement |
| `2030-01-01` | BUSL-1.1 → Apache-2.0 conversion | "License & Commercial Terms" |
| `0.3.17` | current version | README version badge |

**3. Sample data** — everything inside the dashboard mock (churn counts, LOC
deltas, token totals, spend, KPI tiles, file lists, diffs, revision history).
These are illustrative and labelled **SAMPLE DATA** on the surface itself.

Deliberately excluded: benchmarks, user counts, testimonials, funding claims,
"trusted by" logos, and any figure that could read as an independently
measured result.

## Acceptance checks

- Every one of the thirteen layout items above exists, in that order.
- The capability strip's numbers are each traceable to one of the three
  content kinds, and the kind is visible on the page.
- The comparison table has a verdict line, and the fine print section exists
  and is honest.
- The FAQ renders as numbered prose questions; the dashboard renders as a
  window with working tabs; the stepper has a working step counter.
- WCAG AA contrast on every text node, in both themes.
- No horizontal overflow at 1440, 1024, 768 or 390.
- Every interactive target is at least 24×24; the skip link is the first tab
  stop and moves focus into `main`.
- Reduced motion: no marquee, no autoplay, everything static and legible.
- Keyboard: tabs, stepper, install tabs and FAQ all operable.
- `npm run typecheck`, `npm run lint`, `npm run build` pass; no file over 800
  lines.
