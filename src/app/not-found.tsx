import { IconArrowRight, IconChurn, IconGithub } from "@/components/icons";
import { Action, Container } from "@/components/primitives";
import { product } from "@/lib/content";

/**
 * Global 404. Rendered by Next for any unmatched route, inside the root
 * layout, so the site header and footer are already present.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-bg mask-fade-b"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              404 / Route not traced
            </p>

            <h1 className="mt-7 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-fg sm:text-5xl lg:text-6xl">
              Nothing was changed here.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted">
              The path you asked for was never parsed, never attributed to a
              model, and never written to the churn timeline. It may have moved,
              or the link may be older than the repository.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Action href="/">
                Back to the top
                <IconArrowRight size={16} />
              </Action>
              <Action href={product.repo} variant="ghost">
                <IconGithub size={16} />
                Open the repository
              </Action>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-line bg-code">
              <div className="flex items-center gap-2 border-b border-line bg-bg/60 px-4 py-2.5">
                <IconChurn size={14} className="text-primary" />
                <span className="font-mono text-[11px] text-faint">
                  wrongtrace / trace
                </span>
                <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                  exit 404
                </span>
              </div>
              <div className="px-4 py-4">
                <p className="font-mono text-xs leading-relaxed text-faint">
                  <span className="text-primary">$</span> trace{" "}
                  &lt;requested path&gt;
                </p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-danger">
                  404 · no such path in the workspace
                </p>
                <p className="mt-4 border-t border-line pt-3 text-sm leading-relaxed text-muted">
                  Every file an agent touches is recorded. This one never was.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
