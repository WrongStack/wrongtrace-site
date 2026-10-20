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
rest are build-time tools. Fonts are self-hosted through `next/font` (Inter for
prose, JetBrains Mono for code and metrics).

## Getting started

The project targets Node 24, pinned in `.nvmrc`. CI reads that same file, so a
local run and the hosted build cannot drift apart unnoticed.

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

The DNS record for `wrongtrace.oxog.dev` has to point at whatever actually
serves this site. One thing to know before pointing it anywhere: the site is a
Next.js **server**, not a static export. `next.config.ts` sets no
`output: "export"`, and the Open Graph route runs on Node at request time
while reading its fonts from disk. GitHub Pages cannot run it, so the CNAME
has to target a host that can — Cloudflare Workers via OpenNext, or Vercel.

## Checks

```powershell
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run build        # next build
npm start            # serve the production build
```

The first three also run on every push and pull request, in
`.github/workflows/ci.yml`, against a clean `npm ci` on the Node version
pinned in `.nvmrc`.

## Where things live

### Routes and assets

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | The landing page: the order of its ten sections |
| `src/app/layout.tsx` | Document shell, fonts, metadata, theme script, skip link |
| `src/app/not-found.tsx` | The 404 page, in the site's own dark-pro system |
| `src/app/docs/` | The documentation route, its layout and its section pages |
| `src/app/opengraph-image.tsx` | Generated 1200×630 Open Graph card (`next/og`) |
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
| `.github/workflows/ci.yml` | Typecheck, lint and build on every push and pull request |

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
