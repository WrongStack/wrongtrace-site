"use client";

import { motion } from "motion/react";
import type { ComponentType, KeyboardEvent } from "react";
import { useRef, useState } from "react";

import {
  IconAst,
  IconChurn,
  IconDiff,
  IconLineage,
  IconSessions,
  type IconProps,
} from "@/components/icons";
import { Container, Section, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import {
  pipelineSection,
  pipelineStages,
  type PipelineStage,
} from "@/lib/sections-pipeline";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type IconComponent = ComponentType<IconProps>;

/** Icon string (from `sections-pipeline.ts`) to drawn glyph. */
const stageIcons: Record<string, IconComponent> = {
  sessions: IconSessions,
  churn: IconChurn,
  ast: IconAst,
  diff: IconDiff,
  lineage: IconLineage,
};

const TOTAL = pipelineStages.length;

export function PipelineSection() {
  const reduce = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active: PipelineStage = pipelineStages[activeIndex] ?? pipelineStages[0];

  function select(index: number) {
    const next = ((index % TOTAL) + TOTAL) % TOTAL;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        select(activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        select(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        select(0);
        break;
      case "End":
        event.preventDefault();
        select(TOTAL - 1);
        break;
      default:
        break;
    }
  }

  const headline: [string, string] = [
    pipelineSection.headline[0],
    pipelineSection.headline[1],
  ];

  return (
    <Section id="pipeline" className="bg-surface/40 py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={pipelineSection.label}
          kicker={pipelineSection.kicker}
          headline={headline}
          emphasis={pipelineSection.emphasis}
          sub={pipelineSection.sub}
          aside={
            <p
              aria-live="polite"
              className="font-mono text-sm tracking-[0.18em] text-primary uppercase tnum"
            >
              {active.index} of {String(TOTAL).padStart(2, "0")}
            </p>
          }
        />

        <Reveal className="mt-12">
          {/* Stepper rail. Every stage is a tab; the panel below shows the
              selected one. Arrow keys move the selection, Home/End jump. */}
          <div
            role="tablist"
            aria-label="WrongTrace pipeline stages"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="flex flex-wrap gap-2 border-b border-line pb-4"
          >
            {pipelineStages.map((stage, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={stage.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`pipeline-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`pipeline-panel-${stage.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex min-h-11 items-center gap-3 rounded-md border px-3 py-2 font-mono text-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    isActive
                      ? "border-line-strong bg-raised text-fg"
                      : "border-line bg-transparent text-muted hover:border-line-strong hover:text-fg"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={isActive ? "text-primary tnum" : "text-faint tnum"}
                  >
                    {stage.index}
                  </span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Every panel stays in the DOM so each tab's `aria-controls`
              resolves; inactive panels are hidden. The active panel's body
              is keyed by stage so it fades in on each change. */}
          <div className="mt-8 min-h-[16rem]">
            {pipelineStages.map((stage) => {
              const isActive = stage.id === active.id;
              const StageIcon = stageIcons[stage.icon];

              return (
                <div
                  key={stage.id}
                  id={`pipeline-panel-${stage.id}`}
                  role="tabpanel"
                  aria-labelledby={`pipeline-tab-${stage.id}`}
                  hidden={!isActive}
                  tabIndex={0}
                >
                  {isActive ? (
                    <motion.div
                      key={stage.id}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                      className="grid gap-8 rounded-lg border border-line bg-bg p-6 sm:p-8 lg:grid-cols-12"
                    >
                      <div className="lg:col-span-5">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm text-primary tnum">
                            /{stage.index}
                          </span>
                          {StageIcon ? (
                            <StageIcon size={18} className="text-faint" />
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-2xl font-semibold text-balance text-fg">
                          {stage.title}
                        </h3>
                      </div>

                      <div className="lg:col-span-7">
                        <p className="text-[15px] leading-relaxed text-pretty text-muted">
                          {stage.body}
                        </p>
                        <p className="mt-6 border-t border-line pt-4 font-mono text-xs text-faint">
                          {stage.trace}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <p className="mt-4 font-mono text-[11px] text-faint">
            Trace lines are illustrative of the daemon&apos;s log output.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

export default PipelineSection;
