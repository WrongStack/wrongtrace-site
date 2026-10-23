"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IconGithub } from "@/components/icons";
import { Container } from "@/components/primitives";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, product } from "@/lib/content";
import { resolveHref } from "@/lib/links";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <Container className="header-inner">
        <Link href="/" className="brand-lockup" aria-label="WrongTrace home">
          <span aria-hidden="true" className="brand-mark">
            <span />
            <span />
            <span />
          </span>
          <span>{product.name}</span>
        </Link>
        <span className="ecosystem-badge">WrongStack ecosystem</span>

        <nav aria-label="Primary" className="ml-auto hidden items-center lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={resolve(item.href)} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <span className="header-live"><i aria-hidden="true" /> Observer ready</span>
          <ThemeToggle />
          <a
            href={product.repo}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WrongTrace on GitHub"
            className="header-icon-link"
          >
            <IconGithub size={17} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="menu-trigger lg:hidden"
          >
            <span className={open ? "translate-y-[5px] rotate-45" : ""} />
            <span className={open ? "opacity-0" : ""} />
            <span className={open ? "-translate-y-[5px] -rotate-45" : ""} />
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        hidden={!open}
        className={`mobile-menu lg:hidden ${open ? "mobile-menu--open" : ""}`}
      >
        <Container className="grid py-3">
          {nav.map((item, index) => (
            <Link
              key={item.href}
              href={resolve(item.href)}
              onClick={() => setOpen(false)}
              className="mobile-nav-link"
            >
              <span className="font-mono text-[10px] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}

export default SiteHeader;
