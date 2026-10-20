import type { ReactElement } from "react";

import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { finePrint } from "@/lib/sections-fineprint";

/**
 * The honest limits. Every item here is a real constraint of the product, not
 * a hedge — a section that only lists strengths is an advertisement.
 */
export function FinePrintSection(): ReactElement {
  return (
    <section id="fine-print" className="border-t border-line py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={finePrint.label}
          kicker={finePrint.kicker}
          headline={[finePrint.headline[0], finePrint.headline[1]]}
          emphasis
          sub={finePrint.sub}
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-2">
          {finePrint.items.map((item, index) => (
            <li key={item.id} className="h-full bg-bg p-6 sm:p-7">
              <Reveal delay={index * 0.04}>
                <h3 className="flex gap-4 text-base font-medium text-balance text-fg">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-warning tnum"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.title}</span>
                </h3>
                <p className="mt-3 pl-8 text-sm leading-relaxed text-pretty text-muted">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default FinePrintSection;
