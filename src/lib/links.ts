/**
 * Resolves a link target against the route the visitor is currently on.
 *
 * Section links point at the home page. A bare "#anchor" resolves against the
 * *current* path, so from /docs/quickstart it would look for "#capabilities"
 * on that page and find nothing. Prefixing with "/" makes it absolute.
 */
export function resolveHref(href: string, pathname: string): string {
  if (href.startsWith("/")) return href;
  if (href.startsWith("#") && pathname !== "/") return `/${href}`;
  return href;
}
