"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { docGroups, docSections } from "@/lib/docs";

/**
 * Documentation navigation. A vertical section list on wide screens; on narrow
 * screens the same links become a horizontally scrollable row so they never
 * push the page content down.
 */
export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="min-w-0 lg:border-r lg:border-line lg:pr-8">
      {docGroups.map((group) => (
        <div key={group} className="mb-6 min-w-0 last:mb-0">
          <p className="mb-2 hidden font-mono text-[11px] tracking-[0.2em] text-faint uppercase lg:block">
            {group}
          </p>
          <ul className="flex min-w-0 gap-1 overflow-x-auto lg:flex-col">
            {docSections
              .filter((section) => section.group === group)
              .map((section) => {
                const href = `/docs/${section.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={section.slug} className="shrink-0">
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-block rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors duration-150 ${
                        isActive
                          ? "bg-raised text-fg"
                          : "text-muted hover:bg-raised/60 hover:text-fg"
                      }`}
                    >
                      {section.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default DocsSidebar;
