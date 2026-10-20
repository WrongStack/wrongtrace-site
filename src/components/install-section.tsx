import { CopyButton } from "@/components/copy-button";
import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { install } from "@/lib/content";

export function InstallSection() {
  return (
    <section id="install" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={install.label}
          headline={[install.headline[0], install.headline[1]]}
          sub={install.sub}
        />

        <Reveal>
          <ol className="mt-12 list-none space-y-4">
            {install.steps.map((step, index) => (
              <li
                key={step.command}
                className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6"
              >
                <div className="flex size-7 items-center justify-center rounded-md border border-line bg-raised font-mono text-xs text-primary">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
                    <span aria-hidden="true" className="font-mono text-sm text-primary">
                      $
                    </span>
                    <code className="min-w-0 flex-1 font-mono text-sm text-fg break-all">
                      {step.command}
                    </code>
                    <CopyButton
                      value={step.command}
                      label="Copy install step command"
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {install.alternatives.map((alternative) => (
              <div
                key={alternative.command}
                className="flex items-center gap-3 rounded-md border border-line px-4 py-3"
              >
                <span className="text-sm text-muted">{alternative.label}</span>
                <code className="font-mono text-sm text-fg break-all">
                  {alternative.command}
                </code>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default InstallSection;
