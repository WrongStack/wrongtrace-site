import { FooterLinks } from "@/components/footer-links";
import { IconGithub } from "@/components/icons";
import { Container } from "@/components/primitives";
import { footer, product } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div>
            <p className="brand-lockup text-base">
              <span aria-hidden="true" className="brand-mark"><span /><span /><span /></span>
              <span>{product.name}</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{product.tagline}</p>
            <a href={product.repo} target="_blank" rel="noreferrer noopener" className="footer-repo-link">
              <IconGithub size={16} />
              <span>GitHub repository</span>
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{column.title}</p>
                <FooterLinks links={column.links} />
              </div>
            ))}
          </div>
        </div>

        <div className="footer-legal">
          <p className="font-mono text-xs text-faint">{footer.legal}</p>
          <p className="text-xs text-faint">© {year} {footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
