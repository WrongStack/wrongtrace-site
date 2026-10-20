# WrongTrace site — design review

Inspected surface: the production build of the single route `/`, served by
`next start` and driven in Chromium via Playwright. All numbers below are
observed values from that run, not estimates.

## Stack

| Package | Version | Registry check (2026-10-20) |
|---|---|---|
| next | 16.4.2 | `latest` |
| react / react-dom | 19.3.1 | `latest` |
| motion | 14.4.0 | `latest` |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | `latest` |
| typescript | 5.9.3 | latest 5.x — 6.x/7.x blocked by `typescript-eslint` peer `>=4.8.4 <6.1.0` |
| eslint | 9.39.5 | latest 9.x — 10.x peer-allowed but unverified against the bundled plugins |

## Commands run

| Command | Result |
|---|---|
| `npm run typecheck` | pass, no output |
| `npm run lint` | pass, no diagnostics |
| `npm run build` | pass — `/` and `/_not-found` prerendered as static content |
| rendered audit (Chromium, 1440/1024/768/390) | see below |

## Rendered findings

### Layout and overflow
- No horizontal scroll at any breakpoint: `scrollWidth === clientWidth` at 390px
  (390/390) and at 768, 1024, 1440. Elements wider than the viewport exist
  only inside `overflow-x-auto` (diff code) or `overflow-hidden` (marquee)
  containers, so they cannot create a page-level scroll.
- Zero visually clipped text nodes at every breakpoint.
- Nine sections render in the intended order with sensible heights: hero
  (1484px @1440), problem, capabilities, dashboard, pipeline, run-modes,
  config, install, faq, plus the CTA band and footer.

### Type scale
| Viewport | h1 | h2 |
|---|---|---|
| 1440 | 84px / 86.52px | 44px |
| 1024 | 84px | 44px |
| 768 | 60px / 61.8px | 36px |
| 390 | 41.6px / 42.85px | 30px |

### Contrast
- **Zero contrast failures** at 1440, 1024, 768 and 390. Every text node was
  measured against its real composited background (alpha layers resolved
  up the ancestor chain) against the WCAG 2.2 threshold for its size and
  weight — 4.5:1 for body text, 3:1 for large text.
- Light theme body text on background: **15.95:1**.

### Target size (WCAG 2.2 AA, 24×24 CSS px)
- One element measures below 24px: the skip link at 1×1 in its unfocused
  `sr-only` state. This is the intended hidden state — when focused it
  measures **131.5 × 36px** and is on screen, so the target is compliant in
  the state a user can actually reach.
- The header logo and the footer GitHub link measured 20px tall and the
  footer nav links 17px; all were raised to ≥24px and re-verified.
- The unfocused skip link is exempt as a hidden control; the rest of the
  footer/nav links were corrected rather than waived.

### Keyboard
- First `Tab` reaches the skip link, which is on screen with a 2px solid
  focus ring. `Enter` moves the hash to `#main` **and** moves focus to the
  `<main>` element (the target is `tabindex="-1"`).
- Focus ring: `outline: 2px solid` on the accent, verified on a primary
  call-to-action.
- Dashboard tablist follows the ARIA tabs pattern: `ArrowRight` moves
  selection from Overview to "Diffs & Changes", the panel carries
  `role="tabpanel"` and `aria-labelledby="tab-diffs"`. `Home`/`End`/`ArrowLeft`
  are handled by the same handler.
- FAQ accordion: `aria-expanded` goes `false → true`, the answer region
  appears with `role="region"` and `aria-labelledby` pointing at its button,
  and a second activation closes it again.

### Structure
- One `h1`; `header`, `main`, `footer` landmarks present; no heading-level
  jumps anywhere in the document.

### Assets
- 29 inline SVGs, all with a `viewBox`, all `currentColor` + `aria-hidden`.
  No `<img>` elements, so no dimension or lazy-loading obligations.

### Reduced motion
- With `prefers-reduced-motion: reduce` the marquee element is not rendered
  (static wrapped list instead), no animation is applied, and every heading
  computes to `opacity: 1` / `transform: none`. The scroll reveals, the hero
  diff playhead and the count of the churn timeline all resolve to static
  content.

### Console
- No console errors and no warnings at any viewport.

### Render proof
Screenshots were analysed with Pillow rather than by eye: 3,073–5,417
distinct colours per frame, 13–28% ink coverage against the background, and
accent pixels present (0.4–4.1% depending on viewport). The frames contain
rendered content, not a blank page.

## Open Graph, sitemap and robots

Added after the first review pass. Verified against the prerendered HTML the
build emits (`.next/server/app/index.html`), not a live DOM.

### Emitted meta tags

| Tag | Value |
|---|---|
| `og:title` | `WrongTrace — See what your agents really changed` |
| `og:description` | the product description |
| `og:url` | `http://localhost:3000` (resolved from `metadataBase`) |
| `og:site_name` | `WrongTrace` |
| `og:type` | `website` |
| `og:image` | `http://localhost:3000/opengraph-image?c9fc5b07fbec6a1c` |
| `og:image:width` / `og:image:height` | `1200` / `630` |
| `og:image:type` | `image/png` |
| `twitter:card` | `summary_large_image` |
| `twitter:title` / `twitter:description` / `twitter:image` | mirror the OG values |
| `description` | the product description |
| `canonical` | `http://localhost:3000` |

The em dash in the title is a real U+2014 — verified by codepoint on the
emitted HTML, not by console output.

### Generated image
- `/opengraph-image` → 200, `image/png`, 95,093 bytes, PNG signature
  `89 50 4E 47 0D 0A 1A 0A` confirmed byte-for-byte.
- Decoded with Pillow: 1200×630, RGBA, 1,527 distinct colours, ink ratio
  0.3418 — rendered content, not a blank plate.

### Crawl routes
- `/sitemap.xml` → 200, `application/xml`, one `<url>` entry carrying `<loc>`,
  `<lastmod>`, `<changefreq>monthly</changefreq>` and `<priority>1</priority>`.
- `/robots.txt` → 200, `text/plain`, `User-Agent: *`, `Allow: /`, and a
  `Sitemap:` directive pointing at the sitemap.

### Caveats
- The origin reads `http://localhost:3000` because `NEXT_PUBLIC_SITE_URL` is
  unset in this environment. Every absolute URL is well-formed but points at
  localhost until that variable is set for the deployment.
- The OG card has not been reviewed by a human eye. Its layout was checked
  programmatically — canvas size, PNG validity, colour variety, and headline
  width budgeted against the 1200px canvas — but the visual balance between
  the headline and the diff card is unverified.
- Satori cannot resolve OKLCH, so the OG renderer flattens the Dark Pro
  palette to hex. The mapping is written out in `src/app/opengraph-image.tsx`.

### OG card layout

The first render of the card was **wrong** and was caught by measuring rather
than by eye. The headline was set at 72px, which measures **713.6px** in a
column that is only 620px wide, so satori wrapped it onto three lines and the
two-line statement the composition depends on was lost.

Fixed by rebalancing: headline 72 → 60px, lede 24 → 22px, meta chips 15 →
14px, the gutter 48 → 36px, and the diff card 440 → 416px (its longest line
was also shortened). The card now measures:

| Element | Measured | Box | |
|---|---|---|---|
| headline line 1 | 594.7px | 620px | ok |
| headline line 2 | 516.5px | 620px | ok |
| lede (longest word) | 108.9px | 600px | ok |
| diff line (longest) | 312.0px | 350px | ok |
| meta chip row | 592.0px | 620px | ok |
| eyebrow | 487.2px | 822px | ok |
| brand | 162.0px | 238px | ok |
| install command | 858.0px | 994px | ok |

Rendered geometry, read back from the PNG:

- Card edges at x 720 and 1135 → **415px** wide, left column **620px**.
- Headline ink occupies **two** lines (120px band at 60px/1.06 leading).
- Headline right edge 621, card left edge 720 → **99px gutter**, no collision.
- Column ratio 554 / 415 = **1.33** — the headline leads without crowding.
- Content bbox (67, 70)–(1001, 543): inset from every canvas edge, nothing
  clipped.

The headline figure is conservative: the card applies −2px letter-tracking
and the measurement did not, so the rendered width is ~557px in a 620px box.

`public/og-preview.png` holds this render for eyeballing. The harness that
produced these numbers was temporary and has been removed; the numbers are
recorded here.

### Not-found page

`src/app/not-found.tsx` replaces the framework default for unmatched routes.
It renders inside the root layout, so the site header and footer are already
present and are not duplicated. Verified in Chromium against the production
build at both required widths:

| Check | 1440px | 390px |
|---|---|---|
| `GET /this-route-was-never-traced` | 404 | 404 |
| Heading | "Nothing was changed here." @ 60px | @ 36px |
| Site chrome (header / main / footer) | all present | all present |
| Actions | Back to the top, Open the repository | same |
| Horizontal scroll | none (1440/1440) | none (390/390) |
| Contrast failures | 0 | 0 |
| Sub-24px targets | 1 (the hidden skip link) | 1 |
| Focused skip link | 131.5 × 36px, on screen | same |
| JavaScript console errors | none | none |

The only 4xx responses recorded are the route under test and the same path
re-requested by Next in its RSC flight format (`?_rsc=…`) — both are the page
working, not a broken asset. Screenshots were captured at each width and
analysed for colour variety and ink coverage (4555 and 3863 distinct colours)
to confirm the frames contain rendered content.

### Documentation route

`/docs` is a static index plus five prerendered section pages under
`/docs/[slug]`, sharing a layout with a sticky section list on the left. The
structure mirrors the reference documentation sites: a quickstart first, then
the reference material, with every page reachable from the index and from the
sidebar.

Sections: Getting started, CLI reference, MCP server, Configuration, Dashboard
views. Every fact is taken from the WrongTrace README.

| Check | Result |
|---|---|
| `/docs`, and all five section pages | 200 |
| `/docs/nope` | 404 (unknown slugs hit the not-found page) |
| Sidebar present on every page | yes, five links, grouped "Start here" / "Reference" |
| Current page marked | `aria-current="page"` on the active section link |
| Header links to `/docs` | yes, in both the desktop nav and the mobile menu |
| Header section anchors on a docs page | resolved to `/#capabilities` etc., not bare `#capabilities` |
| Per-page `<title>` | "Getting started — WrongTrace", "Configuration — WrongTrace", … |
| Horizontal scroll at 1440 / 390 | none / none |
| Contrast failures at 1440 / 390 | 0 / 0 |
| Sub-24px targets | 1 — the visually hidden skip link |
| JavaScript console errors | none |

One real defect was caught and fixed: at 390px the docs page scrolled
horizontally (500px content in a 390px viewport). The sidebar's horizontally
scrollable link row was stretching its grid column, because grid items default
to `min-width: auto`. Fixed with `min-w-0` on the aside and the sidebar, after
which the row scrolls inside its own container.

The primary header nav moved from `md` to `lg` so the six items (including
Docs) fit without crowding at 768px; below that the menu button carries the
same links.

### Anchor resolution

Section links in the header and the footer point at the home page. A bare
`#capabilities` resolves against the *current* path, so from `/docs` it looked
for an anchor on the docs page and found nothing — a dead link on every
non-home route. Both now resolve through a shared `resolveHref(href, pathname)`
helper in `src/lib/links.ts`, which prefixes section anchors with `/` off the
home page and leaves them alone on it. The footer link list became a small
client component (`FooterLinks`) to read the current path; the rest of the
footer stays server-rendered.

Checked on `/`, `/docs`, `/docs/quickstart`, `/docs/config` and the 404 page:
the header and the footer emit bare `#anchor` on `/` and `/#anchor`
everywhere else, with no bare anchor left on any non-home route.

## Known gaps

These were **not** verified and are stated rather than implied:

- No third-party automated scanner (axe, Lighthouse) was run; the contrast,
  target-size and structure results come from a purpose-built harness.
- No screen-reader pass was performed — no assistive technology is available
  in this environment. The ARIA findings are structural (attributes, roles
  and relationships read from the DOM), not an end-to-end AT test.
- Forced-colors (Windows high contrast) mode was not exercised.
- 400% zoom reflow was not tested; the 390px reflow is clean, which covers
  the same layout at a smaller width but is not the same test.
- Screenshot review was programmatic. The rendered frames were never
  signed off by a human eye, so "it looks right" is not claimed.
