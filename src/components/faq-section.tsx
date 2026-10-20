"use client";

import { useState } from "react";

import { IconChevronDown } from "@/components/icons";
import { Container, SectionHead } from "@/components/primitives";
import { faq } from "@/lib/content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={faq.label}
          headline={[faq.headline[0], faq.headline[1]]}
          sub={faq.sub}
        />

        <div className="mt-12 border-t border-line">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;

            return (
              <div key={item.q}>
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-start justify-between gap-6 border-b border-line py-5 text-left transition-colors duration-150 hover:text-primary"
                  >
                    <span className="text-base font-medium text-fg">
                      {item.q}
                    </span>
                    <IconChevronDown
                      size={18}
                      className={`mt-0.5 shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-b border-line pb-5"
                  >
                    <p className="max-w-2xl pt-1 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FaqSection;
