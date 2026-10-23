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
import { capabilities } from "@/lib/content";
import { capabilitiesSection } from "@/lib/sections-capabilities";

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
    capabilitiesSection.headline[0],
    capabilitiesSection.headline[1],
  ];

  return (
    <Section id="capabilities" className="section-space">
      <Container>
        <SectionHead
          label={capabilitiesSection.label}
          kicker={capabilitiesSection.kicker}
          headline={headline}
          emphasis={capabilitiesSection.emphasis}
          sub={capabilitiesSection.sub}
        />

        {/* Editorial numbered list: a marker and a title on the left, the
            argument on the right. Hairline rules separate the rows. */}
        <ol className="mt-14 border-t border-line">
          {capabilities.map((capability, index) => {
            const Icon = capabilityIcons[capability.icon];

            return (
              <li key={capability.id}>
                <Reveal delay={index * 0.05}>
                  <article className="grid gap-x-10 gap-y-4 border-b border-line py-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-primary tnum">
                          /{capability.index}
                        </span>
                        <Icon size={18} className="text-faint" />
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-balance text-fg">
                        {capability.title}
                      </h3>
                    </div>

                    <div className="md:col-span-7">
                      <p className="text-[15px] leading-relaxed text-pretty text-muted">
                        {capability.body}
                      </p>
                      <p className="mt-4 font-mono text-[11px] text-faint">
                        {capability.tags.join(" · ")}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export default CapabilitiesSection;
