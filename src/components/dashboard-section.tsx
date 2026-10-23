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
import { IconChurn } from "@/components/icons";
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
          <div className="dashboard-window">
            {/* Window chrome */}
            <div className="dashboard-window__topbar">
              <span className="dashboard-window__mark" aria-hidden="true"><IconChurn size={15} /></span>
              <strong>WrongTrace</strong>
              <span className="dashboard-window__workspace">WrongStack / Active</span>
              <span className="dashboard-window__status"><i aria-hidden="true" /> Live</span>
              <span className="dashboard-window__agents">3 agents</span>
              <span className="dashboard-window__address">localhost:{product.dashboardPort}</span>
            </div>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Dashboard views"
              onKeyDown={onKeyDown}
              className="dashboard-window__tabs"
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
                    className={`dashboard-window__tab ${
                      isActive
                        ? "is-active"
                        : ""
                    }`}
                  >
                    <span aria-hidden="true" className="dashboard-window__tabdot" />
                    {tab.label}
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
              className="dashboard-window__panel min-h-[26rem]"
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
