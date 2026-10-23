import type { ComponentType } from "react";

import {
  IconChurn,
  IconProfiler,
  IconTerminal,
  type IconProps,
} from "@/components/icons";
import { Container, Section, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import {
  comparison,
  comparisonColumns,
  comparisonRows,
  comparisonVerdict,
  type ComparisonColumn,
} from "@/lib/sections-comparison";

type IconComponent = ComponentType<IconProps>;

/**
 * The column data owns an icon key; this map is the only place where that
 * key is resolved to a drawn glyph.
 */
const comparisonIcons: Record<ComparisonColumn["icon"], IconComponent> = {
  churn: IconChurn,
  terminal: IconTerminal,
  profiler: IconProfiler,
};

/**
 * Comparison table — WrongTrace against raw terminal logs and against a full
 * APM vendor, with an honest verdict underneath.
 *
 * A real table: column headers carry `scope="col"`, row labels carry
 * `scope="row"`, and the table has an accessible name. On narrow screens the
 * table scrolls inside its own region instead of pushing the page sideways.
 */
export function ComparisonSection() {
  const headline: [string, string] = [
    comparison.headline[0],
    comparison.headline[1],
  ];

  return (
    <Section id="comparison" className="section-space">
      <Container>
        <SectionHead
          label={comparison.label}
          kicker={comparison.kicker}
          headline={headline}
          emphasis
          sub={comparison.sub}
        />

        <Reveal>
          <div
            role="region"
            aria-label="Capability comparison table"
            tabIndex={0}
            className="mt-12 overflow-x-auto rounded-lg border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <caption className="sr-only">{comparison.caption}</caption>

              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-[24%] px-5 py-4 font-mono text-[11px] tracking-[0.18em] text-faint uppercase"
                  >
                    Capability
                  </th>
                  {comparisonColumns.map((column) => {
                    const Icon = comparisonIcons[column.icon];
                    const isSubject = column.id === "wrongtrace";

                    return (
                      <th
                        key={column.id}
                        scope="col"
                        className={
                          isSubject
                            ? "w-[26%] bg-raised/60 px-5 py-4 font-mono text-[11px] tracking-[0.18em] text-primary uppercase"
                            : "w-[25%] px-5 py-4 font-mono text-[11px] tracking-[0.18em] text-faint uppercase"
                        }
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={14} />
                          {column.label}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.id}>
                    <th
                      scope="row"
                      className="border-t border-line px-5 py-4 text-left align-top text-sm font-medium text-balance text-fg"
                    >
                      {row.capability}
                    </th>
                    {comparisonColumns.map((column) => {
                      const isSubject = column.id === "wrongtrace";

                      return (
                        <td
                          key={column.id}
                          className={
                            isSubject
                              ? "border-t border-line bg-raised/60 px-5 py-4 align-top text-sm leading-relaxed text-pretty text-fg"
                              : "border-t border-line px-5 py-4 align-top text-sm leading-relaxed text-pretty text-muted"
                          }
                        >
                          {row.verdicts[column.id]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 max-w-[72ch] border-l-2 border-primary pl-5 sm:pl-6">
            <p className="text-base leading-relaxed text-pretty text-muted">
              <span className="font-mono text-sm text-primary">
                {comparisonVerdict.lead}
              </span>{" "}
              {comparisonVerdict.body}
            </p>
            <p className="mt-3 text-base leading-relaxed text-pretty text-fg">
              {comparisonVerdict.closing}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default ComparisonSection;
