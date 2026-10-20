"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IconChevronDown, IconGithub } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/primitives";
import { nav, product } from "@/lib/content";
import { resolveHref } from "@/lib/links";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /**
   * Section links point at the home page. On any other route they need the
   * leading slash, or the browser would look for "#capabilities" on /docs.
   */
  function resolve(href: string) {
    return resolveHref(href, pathname);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line transition-colors duration-200 ${
        scrolled ? "bg-bg/85 backdrop-blur-md" : "bg-bg"
      }`}
    >
      <Container className="flex h-16 items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 py-1 font-mono text-sm font-medium text-fg"
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-primary"
          />
          {product.name}
        </Link>

        <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={resolve(item.href)}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={product.repo}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WrongTrace on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg"
          >
            <IconGithub size={18} />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg lg:hidden"
          >
            <IconChevronDown
              size={18}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-line bg-bg lg:hidden"
        >
          <Container className="flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={resolve(item.href)}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted transition-colors duration-150 hover:bg-raised hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

export default SiteHeader;
