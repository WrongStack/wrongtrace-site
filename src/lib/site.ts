/**
 * Canonical site origin.
 *
 * The site is served from https://wrongtrace.oxog.dev. Set
 * `NEXT_PUBLIC_SITE_URL` in a deployment environment to override it — a
 * preview or a fork needs its own origin, because this value drives
 * `metadataBase`, the generated `og:image` URL, sitemap.xml, robots.txt and
 * the canonical link.
 *
 * Product name and description live in `@/lib/content`, which is the single
 * source of truth for the site's words.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wrongtrace.oxog.dev"
).replace(/\/+$/, "");
