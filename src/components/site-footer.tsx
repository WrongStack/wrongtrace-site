import Link from "next/link";

import { IconGithub } from "@/components/icons";
import { Container } from "@/components/primitives";
import { footer, product } from "@/lib/content";

const linkClass =
  "inline-block py-1 text-sm text-muted transition-colors duration-150 hover:text-fg";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-lg font-semibold text-fg">{product.name}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">{product.tagline}</p>
            <a
              href={product.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 py-1 text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              <IconGithub size={16} />
              <span>{product.repo}</span>
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                    {column.title}
                  </p>
                  <ul className="mt-4 list-none space-y-3 p-0">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        {link.href.startsWith("#") ||
                        link.href.startsWith("/") ? (
                          <Link href={link.href} className={linkClass}>
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={linkClass}
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">{footer.legal}</p>
          <p className="text-xs text-faint">
            © {year} {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
