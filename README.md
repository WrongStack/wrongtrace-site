# WrongTrace — website

Marketing site for [WrongTrace](https://github.com/wrongstack/wrongtrace), the
AI-native code churn and agent observability daemon. One route, prerendered as
static HTML, with the copy, data and design tokens separated from the markup.

## Stack

| Package | Version |
|---|---|
| Next.js | 16.4.2 (App Router) |
| React / React DOM | 19.3.1 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.3 |
| Motion | 14.4.0 |

No other runtime dependencies. Fonts are self-hosted through `next/font`
(Inter for prose, JetBrains Mono for code and metrics).

## Getting started

```powershell
npm install
npm run dev          # http://localhost:3000
```

## Site URL

`metadataBase`, the generated `og:image` URL, `sitemap.xml` and `robots.txt`
all resolve against one origin: `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
Unset, it falls back to `http://localhost:3000` so local builds still emit
valid absolute URLs instead of a fabricated domain. Set it in the deployment
environment.

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-domain.example"
```

## Checks

```powershell
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run build        # next build
npm start            # serve the production build
```

## Where things live

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Section order for the single route |
| `src/app/not-found.tsx` | The 404 page, in the site's own dark-pro system |
| `src/app/layout.tsx` | Document shell, fonts, metadata, theme script, skip link |
| `src/app/globals.css` | The design-token source — read this before adding colour |
| `src/app/opengraph-image.tsx` | Generated 1200×630 Open Graph card (`next/og`) |
| `public/og-preview.png` | A saved render of the OG card, for reviewing the composition |
| `src/app/sitemap.ts` | `/sitemap.xml` |
| `src/app/robots.ts` | `/robots.txt` |
| `src/app/fonts/` | Static TTFs used by the OG renderer (satori cannot read woff2) |
| `src/lib/site.ts` | The canonical site origin |
| `src/lib/content.ts` | Every word, number and code sample on the site |
| `src/lib/motion.ts` | Shared motion tokens and variants |
| `src/lib/use-reduced-motion.ts` | Hydration-safe reduced-motion detection |
| `src/components/primitives.tsx` | `Section`, `Container`, `SectionHead`, `Action` |
| `src/components/icons/index.tsx` | The hand-drawn SVG icon family |
| `src/components/dashboard-*` | The interactive dashboard mock |

### Changing the copy

Edit `src/lib/content.ts`. Sections read from it; components hold layout only.
Product facts there come from the WrongTrace README. Anything illustrative —
the dashboard's churn figures, costs and KPIs — is sample data and is
labelled as such on screen.

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
