import type { ComponentType } from "react";

import {
  IconAtlas,
  IconChurn,
  IconGateway,
  IconLineage,
  IconModel,
  IconShield,
  type IconProps,
} from "@/components/icons";
import { Container, Section, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { capabilities, capabilitiesHead } from "@/lib/content";

type IconComponent = ComponentType<IconProps>;

/**
 * Data strings in `content.ts` are the contract; this map is the only place
 * where a string is resolved to a drawn glyph. Every icon string used by the
 * capabilities data must have an entry here.
 */
const capabilityIcons: Record<string, IconComponent> = {
  churn: IconChurn,
  atlas: IconAtlas,
  lineage: IconLineage,
  model: IconModel,
  shield: IconShield,
  gateway: IconGateway,
};

export function CapabilitiesSection() {
  const headline: [string, string] = [
    capabilitiesHead.headline[0],
    capabilitiesHead.headline[1],
  ];

  return (
    <Section id="capabilities" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={capabilitiesHead.label}
          headline={headline}
          sub={capabilitiesHead.sub}
        />

        <Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, i) => {
              const Icon = capabilityIcons[capability.icon];

              return (
                <Reveal key={capability.id} delay={i * 0.05} className="bg-bg">
                  <article className="flex h-full flex-col p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-9 items-center justify-center rounded-md border border-line bg-raised/50 text-primary">
                        <Icon size={18} />
                      </span>
                      <span className="font-mono text-xs text-primary">
                        {capability.index}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-medium text-fg">
                      {capability.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {capability.body}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-faint">
                      {capability.tags.map((tag, tagIndex) => (
                        <span key={tag} className="flex items-center gap-3">
                          {tagIndex > 0 ? (
                            <span aria-hidden="true" className="text-faint">
                              ·
                            </span>
                          ) : null}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default CapabilitiesSection;
