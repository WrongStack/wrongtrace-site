# WrongTrace site — design review

## Release verification (2026-10-23)

Preserved the existing visual direction; no new design system or redesign.
Frontend specialist fixed shell-copy defaults, clipboard announcements, duplicated
marquee semantics, theme-radio focus, file state labels, list structure and
stable dashboard tab relationships. The release browser run then caught a real
mobile regression: absolutely positioned file-state labels escaped their
scrolling grid (593px document at 390px). Making `.file-row` the containing block
restored 390px; the unchanged overflow assertions passed after rebuilding.
Documentation canonicals also incorrectly inherited `/`; each docs route now
exports its own URL, covered by a red-before-green artifact regression.

Verified from a clean npm install in an isolated directory: typecheck, lint,
production static build (two workers), 6 Node unit tests, 4 finalizer fixtures,
7 artifact checks and 9 production-browser tests. Browser cases include both
themes at 320/390/768/1024/1440, short viewports, keyboard installers, clipboard
success/denial, client docs navigation/reloads, dashboard panels and reduced
motion. Screenshots: `.design/qa/hero-{1440,390}-{light,dark}.png`.

The rendered Design Studio inspector could not launch: its tool runtime lacks
`@playwright/test`. Existing Python Playwright successfully executed the actual
browser checks instead. PNG pixel review and a comprehensive contrast/assistive
technology audit remain unverified; no visual-fidelity or accessibility
certification is claimed. Historical observations below are not new evidence.

## Visual-review handoff — BLOCKED (2026-10-20)

Blocker: this session cannot inspect PNG pixels. Existing measurements and passing
functional checks do not establish visual composition or reference fidelity.

Saved inputs (project-relative):
- WrongTrace: `.design/qa/hero-1440-light.png`, `hero-1440-dark.png`,
  `hero-390-light.png`, `hero-390-dark.png` (all under `.design/qa/`).
- CobaltDB: `.design/references/cobaltdb/1440.png` and `390.png`.
- CacheStorm: `.design/references/cachestorm/1440.png` and `390.png`.
- WireRift: `.design/references/wirerift/1440.png` and `390.png`.

Acceptance checklist for an image-capable session:
- [ ] Confirm actual pixel access; otherwise keep this review BLOCKED.
- [ ] View corresponding desktop/mobile frames side by side; record viewport,
  theme, artifact path and visible evidence for each hierarchy, spacing, type,
  density or alignment finding. Label mismatched themes and stale captures.
- [ ] Fix only evidenced differences, respecting `.design/brief.md`; preserve
  distinct Windows/Unix installers, sample labels, themes and footer order.
- [ ] After actual changes, recapture affected desktop/mobile/short states and
  inspect both themes, keyboard focus, reduced motion and page overflow.
- [ ] Run affected browser regressions with `python tests/landing_smoke.py`
  against the current served revision; installer copy values, file selection,
  theme/menu behavior and all responsive subcases must pass without skips.
- [ ] For code changes, run `npm run typecheck`, `npm run lint`, and
  `npm run build` sequentially (build workers capped at 2); require passing
  results and changed hand-maintained files no longer than 800 lines.
- [ ] Update this review with findings, fixes, final image paths, exact check
  results and remaining limitations; mark visual review complete only after
  inspecting the final images. Do not rerun completed checks merely to recheck
  this blocker or add the handoff, and do not claim unexecuted checks passed.

## Latest review — family coherence (2026-10-20)

This section supersedes historical results below, which describe older revisions.
Reference-style-researcher's earlier measurements were reused; the director added
CacheStorm/WireRift measurements. Further delegation was unavailable because the
session director had already closed spawning.

### Implemented

- Shared 1344px content width at 1440; shared 64–96px section rhythm and two-column
  heading/context geometry rather than oversized stacked double kickers.
- A product-specific split hero: explicit agent → AST → trace path, readable
  inspector, compact selectable file list, and actual per-file diff updates.
- One reusable platform installer in hero, installation section and closing CTA;
  isolated Windows and Unix commands, roving keyboard tabs, exact copy values.
- More compact FAQ columns, bounded prose lengths, mobile-safe configuration
  rows and dashboard tabs; existing CobaltDB-style appearance previews retained.
- Corrected light-theme WrongStack-link contrast and 320px parent-band overflow.
- No pool/Ecosystem resurrection: WrongStack band → footer → OXOGNET studio.

### Observed checks

`python tests/landing_smoke.py`: six test methods passed, including ten
width/theme subcases (1440/1024/768/390/320, light and dark), short viewports,
clipboard values for both platforms at all three placements, actual diff
selection, first/last step wrapping, theme focus/persistence/system changes,
mobile menu, reduced motion, footer order and all six documentation routes.
Five core methods also passed against the production build on port 3124 before
that port was refused by the hosted browser tool; no further browser-tool call
was made against that origin. No installer was executed. Screenshots retained
at `.design/qa/hero-{1440,390}-{light,dark}.png`.

`design_reference inspect` on the allowed dev origin http://localhost:3000/:
final round **0 FAIL / 12 WARN**, across 1440/768/390. Resolved the initial
contrast and dashboard edge failures. Remaining warnings are recorded here:

- `type.body-size`: 14px supporting copy is intentional for this technical
  family; primary hero/context prose remains 15–16px, not tiny display text.
- `type.size-count`: small technical chrome/code/labels coexist with editorial
  headings; flattening them to six sizes would remove useful hierarchy.
- `type.heading-order`: the sampler reports no visible h1 after scrolling;
  DOM/browser tests assert exactly one actual h1 on every route (not hidden).
- `runtime.console-error`: the hosted inspector's proxy rejects Next's HMR
  socket; local production browser tests report no console/page errors.

### Fidelity and limits

CobaltDB comparison artifact: `.design/references/cobaltdb/fidelity.md`.
Automated axes: color 50%, type 0%, space 67%, shape 33%, layout 54%, motion
100%; overall 0%. **This is not a literal-match claim.** Differences include
WrongTrace violet vs CobaltDB blue, retained product sections, twelve-column
implementation grids, and denser code chrome. The type sampler also treats
`spaceGrotesk` and `Space Grotesk` as different strings and misses the real
69.12px h1 (measured directly in the browser). Do not advertise this score as
reference fidelity, or silently relabel a failed comparison as a pass.

Screenshot files were captured but cannot be viewed by the model through this
host's text-only read tool. No overall visual-craft rubric score, greyscale,
squint or aesthetic certification is claimed; contrast over gradients/images
and a complete assistive-technology audit remain unverified. The directly
measured geometry, behavior and technical gates are the evidence for this pass.


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

## Renewal audit

The site was rebuilt against four references measured on 2026-10-20 —
oxog.net, ninedeploy.com, labyrinthdns.com and cobaltdb.dev. The harness
drove the **production build** in Chromium across 5 routes × 4 viewports
(1440 / 1024 / 768 / 390) × 2 themes — 40 page loads — and the final run
reported **all audit checks passed**.

| Check | Result |
|---|---|
| Contrast failures | **0** in every route, viewport and theme |
| Text nodes checked | 449 per page (not a vacuous pass — the count is asserted) |
| Horizontal scroll | none at any width; `scrollWidth === clientWidth` |
| Sub-24px targets | 1 — the visually hidden skip link |
| Heading structure | 1 × `h1`, 0 level jumps, on every route |
| Landmarks | `header` / `main` / `footer` present on every route |
| Window-chrome edge | 4.06:1 (dark), 4.27:1 (light) — both clear 3:1 |
| Reduced motion | 0 running animations, 0 marquee, `h1` opacity 1 |
| Running animations (default) | 5 on the home page, 0 on the docs pages |
| Home-page frames | 9,872–11,062 distinct colours — rendered content, not blank |

### What the audit caught

Four real defects, all found by measuring rather than by eye:

1. **`--faint` failed 4.5:1.** The quietest text tier was mixed too far
   towards the background. Raised in both themes — 74% → 95% of `--muted` in
   dark, 78% → 94% in light — and the contract is now stated in the token
   file: it has to clear 4.5:1 on `--bg`, `--surface` *and* `--raised`, not
   just the page background.
2. **The light theme's semantic tier failed.** `--success` measured 3.69:1
   and `--warning` 2.45:1 on near-white. Darkened as a peer set
   (`--success` 53%, `--warning` 54%, `--danger` 52%) so the three sit at the
   same lightness. On a near-white surface an accessible amber is a dark
   bronze; that is the honest cost, not a bug.
3. **The light window-chrome edge measured 2.48:1.** `--chrome-line` mixed
   70% of `--line` towards `--fg`; changed to 50% so it clears 3:1.
4. **The docs pages skipped a heading level** — `h1` → `h3`, because the
   step titles were `h3` under an `h1` page title. Changed to `h2`.

Two of those four were mine: the light-theme `--faint` mix was initially
inverted (on a near-white background "faint" has to be *darker*, not
lighter), and the first attempt missed the `--raised` surface entirely.

### Harness corrections

Three faults in the harness itself, each of which would have produced a
misleading result:

- The colour parser had no `oklch()` branch. Chromium serialises computed
  colours as `oklch(L C H)` for oklch-authored styles, and the hue can be the
  literal `none` — `parseFloat("none")` is `NaN`, and `NaN < 4.5` is false, so
  the check **passed silently**. The parser now handles `oklch`, `lab`,
  `color(srgb)` and `rgb()`, treats hue `none` as 0, asserts the ratio is
  finite, and asserts a minimum count of parsed text nodes.
- Target-size checking flagged inline prose links. WCAG 2.2 SC 2.5.8 exempts
  targets that are inline within a sentence, because their size is constrained
  by the surrounding line-height. The check now skips `display: inline`
  targets, and still enforces 24×24 on every block-level control.
- The overflow check reported the agent-strip marquee (3,251px wide) as a
  defect. It is inside an `overflow: hidden` container, so it never scrolls
  the page. The check now only reports an element wider than the viewport if
  no ancestor clips it.

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

## Reference-line renewal — 2026-10-20

The follow-up visual pass measured oxog.net, nothingdns.com, labyrinthdns.com
and cobaltdb.dev with the same browser harness at 1440, 768 and 390px. It then
adapted their shared 1320–1344px editorial container, sticky blurred navigation,
Space Grotesk typography, compact 2–7px radii, hairline separators and
150–300ms interaction timing to WrongTrace's own purple/magenta trace identity.
No reference logo, illustration or product copy was copied.

Implemented and rendered: track-style dark/light switch; animated mobile menu;
pointer-following ambient glow for fine pointers; user-controlled hero trace
with explicit SAMPLE DATA label and step counter; link/brand hover motion; and
a bottom OXOGNET project area naming the four related public products.

Verification: `npm run typecheck`, `npm run lint` and `npm run build` pass. A
local Playwright production smoke run passed at 1440, 768 and 390px for one h1,
no horizontal overflow, theme switching, mobile menu behavior, hero Play/Pause,
OXOGNET visibility and zero console/page errors. Reduced-motion CSS remains
active and the hero autoplay is disabled by default. The built-in
`design_reference inspect` could not access the loopback origin because this
project had not allow-listed it; the direct isolated Playwright run provides
the rendered evidence instead.

## Refinement — theme, hero and footer pool

The numbered OXOGNET content section was removed. The related-product links now
form a compact pool after the legal footer, visually anchored to the absolute
bottom edge. The theme control now follows CobaltDB's interaction model: one
44px trigger opens an appearance menu with System, Light and Dark choices;
System follows `prefers-color-scheme` and explicit choices persist.

The hero now uses the reference family's two-column editorial/product split.
Its AST surface was rebuilt as an actual file browser with grouped paths,
selectable file rows, state dots, a breadcrumb, parsed status and a compact
session timeline rather than box-drawing tree characters.

A production Playwright pass at 1440, 768 and 390px confirmed: no horizontal
overflow; the numbered `13 · OXOGNET` label is absent; the bottom pool is
visible; the appearance menu selects Light; the file browser selection changes
at desktop/tablet widths; hero Play/Pause works; and the console is clean.

After direct live-DOM inspection of CobaltDB, the appearance control was matched
to its actual 44px System trigger and 328px dialog: three 90px visual theme
previews, radio selection, check badges, status line and responsive fixed panel.
The footer now also carries CobaltDB's actual OXOG studio banner composition,
including the four-path 200×130 SVG mark, pink/purple stroke colors and the
staggered six-second draw animation. Reduced motion disables the drawing.
