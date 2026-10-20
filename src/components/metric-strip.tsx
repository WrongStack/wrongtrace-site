import { Container, Section, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import {
  metricFigures,
  metricFootnote,
  metricFootnoteLink,
  metricStrip,
  type MetricKind,
} from "@/lib/sections-metrics";

/** The kind of each claim, spelled out under the figure. */
const kindLabel: Record<MetricKind, string> = {
  config: "config default",
  claim: "README claim",
};

/**
 * Capability strip — a row of large monospace figures, each with a
 * plain-language label and the kind of claim it is, followed by a single
 * provenance footnote. The strip wraps to a second row on narrow screens
 * rather than overflowing.
 */
export function MetricStrip() {
  const headline: [string, string] = [
    metricStrip.headline[0],
    metricStrip.headline[1],
  ];

  return (
    <Section id="metrics" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHead
          label={metricStrip.label}
          kicker={metricStrip.kicker}
          headline={headline}
          emphasis
          sub={metricStrip.sub}
        />

        <Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
            {metricFigures.map((figure) => (
              <div key={figure.id} className="bg-bg px-5 py-6">
                <dt className="font-mono text-3xl leading-none font-semibold tracking-tight text-fg tnum sm:text-4xl">
                  {figure.value}
                </dt>
                <dd className="mt-3 text-sm leading-snug text-pretty text-muted">
                  {figure.label}
                </dd>
                <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                  {kindLabel[figure.kind]}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
          {metricFootnote}{" "}
          <a
            href={metricFootnoteLink.href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {metricFootnoteLink.label}
          </a>
        </p>
      </Container>
    </Section>
  );
}

export default MetricStrip;
