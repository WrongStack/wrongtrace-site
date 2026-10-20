import { Container, Section, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { runModes } from "@/lib/content";

export function RunModesSection() {
  const headline: [string, string] = [
    runModes.headline[0],
    runModes.headline[1],
  ];

  return (
    <Section id="run-modes" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={runModes.label}
          headline={headline}
          sub={runModes.sub}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {runModes.modes.map((mode, i) => (
            <Reveal key={mode.id} delay={i * 0.08}>
              <article
                className={
                  i === 0
                    ? "h-full rounded-lg border border-primary/40 bg-surface/60 p-6 sm:p-8"
                    : "h-full rounded-lg border border-line bg-surface/60 p-6 sm:p-8"
                }
              >
                <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                  {mode.label}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-fg">
                  {mode.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {mode.body}
                </p>

                <div className="mt-6 flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
                  <span className="font-mono text-primary">$</span>
                  <code className="font-mono text-sm text-fg">
                    {mode.command}
                  </code>
                </div>
                <p className="mt-2 font-mono text-[11px] text-faint">
                  {mode.note}
                </p>

                <ul className="mt-5 space-y-2">
                  {mode.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1 shrink-0 bg-primary"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default RunModesSection;
