# WrongTrace — website

Marketing site for [WrongTrace](https://github.com/wrongstack/wrongtrace), the
AI-native code churn and agent observability daemon. A landing page and a
`/docs` section, prerendered as static HTML, with the copy, data and design
tokens separated from the markup.

## Stack

| Package | Declared | Resolved |
|---|---|---|
| Next.js (App Router) | `16.4.2` | 16.4.2 |
| React / React DOM | `19.3.1` | 19.3.1 |
| Motion | `14.4.0` | 14.4.0 |
| Tailwind CSS | `4.3.3` | 4.3.3 |
| `@tailwindcss/postcss` | `4.3.3` | 4.3.3 |
| TypeScript | `^5.9.0` | 5.9.3 |
| ESLint | `^9.39.0` | 9.39.5 |
| eslint-config-next | `16.4.2` | 16.4.2 |
| `@types/node` | `^24.10.0` | 24.19.2 |
| `@types/react` / `@types/react-dom` | `^19.2.0` | 19.3.0 |

"Declared" is the range in `package.json`; "Resolved" is what the lockfile
installs today.

TypeScript stays on 5.x on purpose. `eslint-config-next@16.4.2` pulls in
`typescript-eslint@8.72.0`, whose peer range is
`typescript >=4.8.4 <6.1.0` — a 7.x bump would break the install.

Next.js, React, React DOM and Motion are the only runtime dependencies; the
rest are build-time tools. Fonts are self-hosted through `next/font` (Space
Grotesk for prose, JetBrains Mono for code and metrics).

## Getting started

The project targets Node 24, pinned in `.nvmrc`. CI reads that same file, so a
local run and the hosted build cannot drift apart unnoticed. npm and
`package-lock.json` are authoritative for release builds; use `npm ci` for a
reproducible installation. The optional pnpm files support existing local setups.

```powershell
nvm use               # reads .nvmrc
npm install
npm run dev          # http://localhost:3000
```

## Site URL

The site is served from **https://wrongtrace.oxog.dev**.

`metadataBase`, the generated `og:image` URL, `sitemap.xml`, `robots.txt` and
the canonical link all resolve against one origin: `NEXT_PUBLIC_SITE_URL`
(see `.env.example`), which defaults to that address. Override it for a
preview or a fork deployment, which needs its own origin.

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-domain.example"
```

## Custom domain

`public/CNAME` holds the custom domain, so it travels with the build output.

The site is a GitHub Pages **static export**. `npm run build` writes the complete
site to `out/`; no Next.js server, image optimizer or runtime filesystem access
is required. `trailingSlash: true` exports documentation routes as directory
indexes so direct visits and reloads work on a plain static host. The OG PNG,
robots and sitemap routes are generated at build time. `public/.nojekyll`
preserves `_next` assets, and `public/CNAME` preserves `wrongtrace.oxog.dev`.
The npm `postbuild` step repairs Windows-shaped Next 16.4 segment filenames
without modifying `node_modules`, disabling prefetch or requiring server rewrites;
it is a no-op when the exporter already emitted the browser-requested flat names.

When publication is authorized, the repository's Pages source must be **GitHub
Actions**, the custom domain must be `wrongtrace.oxog.dev`, and the DNS CNAME for
`wrongtrace` must target `wrongstack.github.io`. GitHub must finish domain/TLS
validation before HTTPS can be considered ready. These remote settings are not
changed by a local build. A custom domain serves at `/`; do not add a
`/wrongtrace-site` base path or asset prefix.

The existing `.github/workflows/ci.yml` checks every push and pull request.
After typecheck, lint, static build and artifact tests pass, only a `master`
push or a manual run on `master` uploads `out/` and deploys that exact artifact.
PRs and other branches cannot deploy. Publishing uses the `github-pages`
environment, isolated `pages: write` / `id-token: write` permissions and
serialized deployments. Preparing this workflow does not execute it.

## Checks

```powershell
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run build        # next build
python tests/export_finalize_test.py  # finalizer fixtures, Python standard library
python tests/static_export_test.py    # validate actual out/ artifact
python -m http.server 3000 --bind 127.0.0.1 --directory out  # local preview
```

CI runs these checks plus `node --test tests/frontend_units.test.ts` and the
browser suite against the exported artifact on every push and pull request.
Browser checks use Python Playwright pinned to `1.64.1` in the workflow, one
Chromium instance and sequential contexts. No failed gate is ignored. Only the
verified artifact can advance to the master-only Pages deployment.

For browser regression checks against the static preview (in another terminal):

```powershell
$env:WRONGTRACE_SITE_URL = "http://127.0.0.1:3000"
python tests/landing_smoke.py
```

The browser suite uses the existing Python Playwright installation and Chromium.
`npm start` still maps to `next start`, which does not serve `output: "export"`;
use the static preview command above instead.

## Where things live

### Routes and assets

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | The landing page: the order of its ten sections |
| `src/app/layout.tsx` | Document shell, fonts, metadata, theme script, skip link |
| `src/app/not-found.tsx` | The 404 page, in the site's own dark-pro system |
| `src/app/docs/` | The documentation route, its layout and its section pages |
| `src/app/opengraph-image.png/route.ts` | Build-time 1200×630 OG PNG with a static-host-friendly extension |
| `src/lib/opengraph-image.tsx` | Existing OG card renderer (`next/og` and bundled fonts) |
| `src/app/sitemap.ts` | `/sitemap.xml` |
| `src/app/robots.ts` | `/robots.txt` |
| `src/app/icon.svg` | Favicon |
| `src/app/fonts/` | Static TTFs used by the OG renderer (satori cannot read woff2) |
| `src/app/globals.css` | The design-token source — read this before adding colour |
| `public/og-preview.png` | A saved render of the OG card, for reviewing the composition |
| `public/CNAME` | The custom domain, carried in the build output |

### Libraries

| Path | Purpose |
|---|---|
| `src/lib/content.ts` | Every word, number and code sample on the site |
| `src/lib/docs.ts` | The documentation content model |
| `src/lib/site.ts` | The canonical site origin |
| `src/lib/links.ts` | Resolves section links against the current route |
| `src/lib/motion.ts` | Shared motion tokens and variants |
| `src/lib/use-reduced-motion.ts` | Hydration-safe reduced-motion detection |

### Components

| Path | Purpose |
|---|---|
| `src/components/primitives.tsx` | `Section`, `Container`, `SectionHead`, `Action` |
| `src/components/icons/index.tsx` | The hand-drawn SVG icon family — 30 icons on a 24px grid |
| `src/components/reveal.tsx` | Scroll-triggered entrance, reduced-motion aware |
| `src/components/copy-button.tsx` | Copies a command to the clipboard |
| `src/components/theme-toggle.tsx` | Dark / light switch |
| `src/components/site-header.tsx` | Sticky header and primary navigation |
| `src/components/site-footer.tsx` | Footer shell |
| `src/components/footer-links.tsx` | Footer link list, resolved against the current route |
| `src/components/hero.tsx` | The hero section |
| `src/components/hero-panel.tsx` | The live AST-diff panel in the hero |
| `src/components/agent-strip.tsx` | Marquee of the supported coding agents |
| `src/components/problem.tsx` | The problem section |
| `src/components/capabilities.tsx` | The capabilities grid |
| `src/components/dashboard-section.tsx` | The interactive dashboard mock |
| `src/components/dashboard-panels.tsx` | Its four panels: overview, diffs, lineage, gateway |
| `src/components/pipeline.tsx` | How it works, in four steps |
| `src/components/run-modes.tsx` | Daemon mode and MCP server mode |
| `src/components/config-section.tsx` | The environment variable reference |
| `src/components/install-section.tsx` | The install steps |
| `src/components/faq-section.tsx` | The FAQ accordion |
| `src/components/cta-section.tsx` | The closing call to action |
| `src/components/docs-sidebar.tsx` | Documentation section navigation |
| `src/components/docs-blocks.tsx` | Renders the documentation content blocks |

### Configuration

| Path | Purpose |
|---|---|
| `next.config.ts` | Next.js options |
| `postcss.config.mjs` | Tailwind v4 through PostCSS |
| `eslint.config.mjs` | Lint rules |
| `tsconfig.json` | TypeScript options and the `@/*` path alias |
| `.nvmrc` | The Node version CI and contributors use |
| `.env.example` | The one environment variable the site reads |
| `.github/workflows/ci.yml` | Checks all pushes/PRs; deploys verified `out/` only from `master` |
| `tests/static_export_test.py` | Checks Pages markers, routes, links/assets, segment payloads, metadata and OG PNG |
| `scripts/finalize-static-export.mjs` | Adds browser-compatible flat segment paths when exporting on Windows |
| `tests/export_finalize_test.py` | Finalizer idempotence, flat/nested exports and collision safety |

### Changing the copy

Edit `src/lib/content.ts` for the landing page and `src/lib/docs.ts` for the
documentation; components hold layout only. Product facts there come from the
WrongTrace README. Anything illustrative — the dashboard's churn figures,
costs and KPIs — is sample data and is labelled as such on screen.

### Changing the design

`src/app/globals.css` is the single token source. It defines the **dark-pro**
kit: a dark-first palette in `:root` with a light derivative under `.light`,
re-exported as Tailwind utilities through `@theme inline`. Components consume
the semantic aliases (`bg-bg`, `text-muted`, `border-line`, `text-primary`, …)
and never a raw colour literal.

Theme choice is stored in `localStorage` under `wrongtrace-theme` and applied
before first paint by a small script in the root layout.

## Conventions

- Monospace for identifiers, file paths, commands, metrics and indices; the
  sans face for prose.
- 1px hairline borders define structure. Glow is reserved for accent and
  active states.
- Only `transform` and `opacity` are animated. `Reveal` handles scroll
  entrances and renders static content when the user prefers reduced motion.
- Interactive elements are native controls, carry an accessible name, and are
  reachable and operable from the keyboard.
