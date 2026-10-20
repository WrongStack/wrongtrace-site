"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { resolveHref } from "@/lib/links";

type FooterLink = { readonly label: string; readonly href: string };

const linkClass =
  "inline-block py-1 text-sm text-muted transition-colors duration-150 hover:text-fg";

/**
 * The footer link list. It is a client component so the section anchors can be
 * resolved against the current route: from /docs, "#capabilities" has to
 * become "/#capabilities" or the link goes nowhere.
 */
export function FooterLinks({ links }: { links: readonly FooterLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="mt-4 list-none space-y-3 p-0">
      {links.map((link) => {
        const href = resolveHref(link.href, pathname);
        const isInternal = href.startsWith("/") || href.startsWith("#");

        return (
          <li key={link.href}>
            {isInternal ? (
              <Link href={href} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClass}
              >
                {link.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default FooterLinks;
