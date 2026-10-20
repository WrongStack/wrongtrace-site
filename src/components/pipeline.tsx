import type { ComponentType } from "react";

import {
  IconAst,
  IconDiff,
  IconLineage,
  IconSessions,
  type IconProps,
} from "@/components/icons";
import { Container, Section, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { pipeline, pipelineHead } from "@/lib/content";

type IconComponent = ComponentType<IconProps>;

/** Icon string (from `content.ts`) to drawn glyph. */
const pipelineIcons: Record<string, IconComponent> = {
  sessions: IconSessions,
  ast: IconAst,
  diff: IconDiff,
  lineage: IconLineage,
};

export function PipelineSection() {
  const headline: [string, string] = [
    pipelineHead.headline[0],
    pipelineHead.headline[1],
  ];
  const lastIndex = pipeline.length - 1;

  return (
    <Section id="pipeline" className="py-20 sm:py-24 lg:py-32 bg-surface/40">
      <Container>
        <SectionHead
          label={pipelineHead.label}
          headline={headline}
          sub={pipelineHead.sub}
        />

        {/* Static connector — one hairline per step. The final segment carries
            the accent because the pipeline's end state is the timeline. */}
        <div className="mt-12 flex items-center gap-2" aria-hidden="true">
          {pipeline.map((step, i) => (
            <span
              key={step.index}
              className={
                i === lastIndex
                  ? "h-px flex-1 bg-primary"
                  : "h-px flex-1 bg-line"
              }
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((step, i) => {
              const Icon = pipelineIcons[step.icon];

              return (
                <Reveal key={step.index} delay={i * 0.06}>
                  <article className="flex h-full flex-col rounded-lg border border-line bg-bg p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex size-9 items-center justify-center rounded-md border border-line bg-raised/50 text-primary">
                        <Icon size={18} />
                      </span>
                      <span className="font-mono text-xs text-primary">
                        {step.index}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-medium text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{step.body}</p>

                    <p className="mt-4 border-t border-line pt-3 font-mono text-[11px] text-faint">
                      {step.detail}
                    </p>
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

export default PipelineSection;
