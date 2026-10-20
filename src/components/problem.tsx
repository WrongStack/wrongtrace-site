import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHead } from "@/components/primitives";
import { problem } from "@/lib/content";

export function ProblemSection() {
  return (
    <Section id="problem" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={problem.label}
          headline={problem.headline}
          emphasis
          sub={problem.sub}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="rounded-lg border border-line bg-code p-5">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-faint"
                />
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-faint"
                />
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-faint"
                />
                <span className="ml-2 font-mono text-[11px] text-faint">
                  agent-transcript.log
                </span>
              </div>
              <ol className="mt-4 space-y-2 font-mono text-xs leading-relaxed">
                <li className="text-faint">
                  <span className="text-muted">14:02:11</span>{" "}
                  assistant: I&apos;ll refactor the parser now.
                </li>
                <li className="text-faint">
                  <span className="text-muted">14:02:13</span> tool: edit(
                  <span className="text-muted">path</span>=…)
                </li>
                <li className="text-faint">
                  <span className="text-muted">14:02:14</span> tool: edit(
                  <span className="text-muted">path</span>=…)
                </li>
                <li className="text-faint">
                  <span className="text-muted">14:02:14</span> tool: edit(
                  <span className="text-muted">path</span>=…)
                </li>
                <li className="text-faint">…</li>
                <li className="text-faint">
                  <span className="text-muted">14:09:52</span> assistant: Done!
                </li>
              </ol>
              <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                Forty files changed, no attribution, and no record of which
                model wrote which line.
              </p>
            </div>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:col-span-7">
            {problem.points.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.06}>
                <li className="h-full bg-bg p-6 sm:p-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-primary tnum">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-medium text-balance text-fg">
                      {point.title}
                    </h3>
                  </div>
                  <p className="mt-3 pl-9 text-sm leading-relaxed text-muted">
                    {point.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export default ProblemSection;
