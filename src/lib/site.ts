/**
 * Canonical site origin.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment to the real origin.
 * The localhost fallback keeps `metadataBase`, the sitemap and robots.txt
 * correct for local builds without inventing a domain this project does not own.
 *
 * Product name and description live in `@/lib/content`, which is the single
 * source of truth for the site's words.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
