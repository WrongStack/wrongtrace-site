import { CopyButton } from "@/components/copy-button";
import { Container, Section, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { runModes } from "@/lib/content";

/**
 * Two ways to run WrongTrace, set as an editorial pair rather than a card
 * grid: the default mode carries a primary hairline, the second is separated
 * from it by a rule.
 */
export function RunModesSection() {
  const headline: [string, string] = [
    runModes.headline[0],
    runModes.headline[1],
  ];

  // Section markers use "NN · LABEL"; normalise the separator so the marker
  // follows the convention whichever way the copy in `content.ts` writes it.
  const label = runModes.label.replace(/\s*\/\s*/, " · ");

  return (
    <Section id="run-modes" className="section-space">
      <Container>
        <SectionHead label={label} headline={headline} emphasis sub={runModes.sub} />

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0">
          {runModes.modes.map((mode, index) => {
            const isDefault = index === 0;

            return (
              <Reveal key={mode.id} delay={index * 0.08}>
                <article
                  className={
                    isDefault
                      ? "border-t-2 border-primary pt-6 md:pr-10"
                      : "border-t border-line pt-6 md:border-l md:border-line md:pl-10"
                  }
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                      {mode.label}
                    </p>
                    {isDefault ? (
                      <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                        Default
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-fg">
                    {mode.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-muted">
                    {mode.body}
                  </p>

                  <div className="mt-6 flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
                    <span aria-hidden="true" className="font-mono text-sm text-primary">
                      $
                    </span>
                    <code className="font-mono text-sm break-all text-fg">
                      {mode.command}
                    </code>
                    <CopyButton
                      value={mode.command}
                      label={`Copy ${mode.command} command`}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-faint">
                    {mode.note}
                  </p>

                  <ul className="mt-6 divide-y divide-line border-t border-line">
                    {mode.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 py-2.5 text-sm text-muted"
                      >
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
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default RunModesSection;
