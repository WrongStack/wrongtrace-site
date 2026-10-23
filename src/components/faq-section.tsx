import type { ReactElement } from "react";
import Link from "next/link";

import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { faqSection } from "@/lib/sections-faq";

/**
 * The FAQ as numbered prose questions with full-paragraph answers — the way
 * the reference documentation sites answer them. Nothing collapses, so
 * everything is readable without interaction and reachable by a crawler.
 */
export function FaqSection(): ReactElement {
  return (
    <section id="faq" className="section-space">
      <Container>
        <SectionHead
          label={faqSection.label}
          kicker={faqSection.kicker}
          headline={[faqSection.headline[0], faqSection.headline[1]]}
          emphasis
          sub={faqSection.sub}
        />

        <ol className="mt-12 grid gap-x-16 md:grid-cols-2">
          {faqSection.items.map((item, index) => (
            <li key={item.id} className="border-t border-line py-7">
              <Reveal delay={index * 0.04}>
                <h3 className="flex gap-4 text-lg font-medium text-balance text-fg">
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-primary tnum"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                </h3>
                <p className="mt-4 pl-9 text-[15px] leading-relaxed text-pretty text-muted">
                  {item.answer}
                  {item.link ? (
                    <>
                      {" "}
                      {item.link.external ? (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          {item.link.label}
                        </a>
                      ) : (
                        <Link
                          href={item.link.href}
                          className="text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          {item.link.label}
                        </Link>
                      )}
                    </>
                  ) : null}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default FaqSection;
