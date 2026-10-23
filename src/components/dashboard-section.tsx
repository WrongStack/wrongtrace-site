"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import {
  DiffsPanel,
  GatewayPanel,
  LineagePanel,
  OverviewPanel,
} from "@/components/dashboard-panels";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHead } from "@/components/primitives";
import { dashboard, dashboardTabs, product } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type TabId = (typeof dashboardTabs)[number]["id"];

export function DashboardSection() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState<TabId>(dashboardTabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = dashboardTabs.findIndex((tab) => tab.id === active);

  function focusTab(index: number) {
    const count = dashboardTabs.length;
    const next = (index + count) % count;
    setActive(dashboardTabs[next].id);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(dashboardTabs.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <Section id="dashboard" className="section-space">
      <Container>
        <SectionHead
          label={dashboard.label}
          headline={dashboard.headline}
          emphasis
          sub={dashboard.sub}
          aside={
            <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
              {dashboard.disclaimer}
            </p>
          }
        />

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-lg border border-line bg-bg shadow-1">
            {/* Window chrome */}
            <div className="flex items-center gap-3 border-b border-chrome-line bg-chrome px-4 py-2.5">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
              </span>
              <span className="truncate rounded-md border border-line bg-code px-3 py-1 font-mono text-[11px] text-muted">
                http://localhost:{product.dashboardPort}/{active}
              </span>
              <span className="ml-auto hidden shrink-0 font-mono text-[10px] tracking-[0.18em] text-faint uppercase sm:block">
                4 of 10 views shown
              </span>
            </div>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Dashboard views"
              onKeyDown={onKeyDown}
              className="flex flex-wrap border-b border-line"
            >
              {dashboardTabs.map((tab, index) => {
                const isActive = tab.id === active;
                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls="dashboard-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    className={`relative shrink-0 px-4 py-3 font-mono text-xs whitespace-nowrap transition-colors duration-150 ${
                      isActive
                        ? "text-fg"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {tab.label}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-px bg-primary"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Panels. Only the selected panel is mounted, so the tabpanel
                itself stays on the tab strip and every tab's aria-controls
                resolves to an element that exists. */}
            <div
              id="dashboard-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              tabIndex={0}
              className="min-h-[26rem]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
                >
                  {active === "overview" ? <OverviewPanel /> : null}
                  {active === "diffs" ? <DiffsPanel /> : null}
                  {active === "lineage" ? <LineagePanel /> : null}
                  {active === "gateway" ? <GatewayPanel /> : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <p className="mt-5 max-w-[72ch] text-sm leading-relaxed text-pretty text-muted">
          A redrawn impression of the built-in dashboard — illustrative numbers,
          real layout. Switch tabs to see the four views behind this one.
        </p>
      </Container>
    </Section>
  );
}

export default DashboardSection;
