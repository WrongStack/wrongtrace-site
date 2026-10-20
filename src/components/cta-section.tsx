import { CopyButton } from "@/components/copy-button";
import { Action, Container } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { cta } from "@/lib/content";

export function CtaSection() {
  return (
    <div className="relative overflow-hidden border-t border-line bg-surface/50 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-bg opacity-60 mask-fade-b"
      />

      <Container>
        <Reveal>
          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="text-headline leading-[1.08] font-semibold tracking-tight text-balance text-fg">
                <span className="block">{cta.headline[0]}</span>{" "}
                <span className="block italic">{cta.headline[1]}</span>
              </h2>
              <p className="mt-6 max-w-xl text-lede leading-relaxed text-pretty text-muted">
                {cta.sub}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-line bg-bg p-6">
                <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                  Install
                </span>

                <div className="mt-3 flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
                  <code className="min-w-0 flex-1 font-mono text-sm text-fg break-all">
                    {cta.primary.command}
                  </code>
                  <CopyButton
                    value={cta.primary.command}
                    label={`Copy ${cta.primary.label} command`}
                  />
                </div>

                <div className="mt-4">
                  <Action
                    href={cta.secondary.href}
                    variant="ghost"
                    className="w-full"
                  >
                    {cta.secondary.label}
                  </Action>
                </div>

                <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
                  {cta.licence}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

export default CtaSection;
