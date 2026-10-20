"use client";

import type { KeyboardEvent, ReactElement } from "react";
import { useRef, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { installSection, type InstallTabId } from "@/lib/sections-install";

const TABS = installSection.tabs;

export function InstallSection(): ReactElement {
  const [active, setActive] = useState<InstallTabId>(TABS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = TABS.findIndex((tab) => tab.id === active);
  const current = TABS[activeIndex] ?? TABS[0];

  function select(index: number) {
    const next = ((index % TABS.length) + TABS.length) % TABS.length;
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        select(activeIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        select(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        select(0);
        break;
      case "End":
        event.preventDefault();
        select(TABS.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <section id="install" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHead
          label={installSection.label}
          kicker={installSection.kicker}
          headline={[installSection.headline[0], installSection.headline[1]]}
          emphasis
          sub={installSection.sub}
        />

        <Reveal>
          <div
            role="tablist"
            aria-label="Install methods"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="mt-12 flex flex-wrap gap-2"
          >
            {TABS.map((tab, index) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`install-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`install-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={`inline-flex min-h-11 items-center rounded-md border px-4 py-2 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    isActive
                      ? "border-line-strong bg-raised text-fg"
                      : "border-line text-muted hover:border-line-strong hover:text-fg"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Every tab keeps its own panel in the DOM, so each tab's
              aria-controls points at a real element. The inactive ones are
              hidden, which is what keeps them out of the accessibility tree
              and out of the tab order. */}
          {TABS.map((tab) => (
            <div
              key={tab.id}
              id={`install-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`install-tab-${tab.id}`}
              tabIndex={0}
              hidden={tab.id !== current.id}
              className="mt-6 rounded-lg border border-line bg-bg p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
                <span aria-hidden="true" className="font-mono text-sm text-primary">
                  $
                </span>
                <code className="min-w-0 flex-1 font-mono text-sm text-fg break-all">
                  {tab.command}
                </code>
                <CopyButton
                  value={tab.command}
                  label={`Copy ${tab.label} command`}
                />
              </div>

              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-pretty text-muted">
                {tab.description}
              </p>

              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                  Verify
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
                  <code className="min-w-0 flex-1 font-mono text-sm text-fg break-all">
                    {tab.verify}
                  </code>
                  <CopyButton
                    value={tab.verify}
                    label={`Copy ${tab.label} verification command`}
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {tab.verifyNote}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export default InstallSection;
