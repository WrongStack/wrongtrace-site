"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { IconCheck, IconChurn, IconFile } from "@/components/icons";
import { sampleDiff, sampleDiffs, sampleEvents, sampleTimeline } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const TICK_MS = 640;

function splitPath(path: string) {
  const parts = path.split("/");
  return { folder: parts.slice(0, -1).join("/"), file: parts.at(-1) ?? path };
}

const stateTone = {
  accepted: "text-success",
  pending: "text-warning",
  rejected: "text-danger",
} as const;

/** Interactive sample of WrongTrace's AST change inspector. */
export function HeroPanel() {
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedFile, setSelectedFile] = useState(sampleEvents[0].file);

  const selected = sampleEvents.find((event) => event.file === selectedFile) ?? sampleEvents[0];
  const lines = sampleDiffs[selected.file] ?? sampleDiff;
  const activeTick = tick % lines.length;

  useEffect(() => {
    if (reduce || !playing) return;
    const id = setInterval(() => {
      setTick((current) => (current + 1) % lines.length);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [playing, reduce, lines.length]);
  const selectedPath = splitPath(selected.file);
  const folders = useMemo(() => {
    const grouped = new Map<string, typeof sampleEvents>();
    for (const event of sampleEvents) {
      const { folder } = splitPath(event.file);
      grouped.set(folder, [...(grouped.get(folder) ?? []), event]);
    }
    return [...grouped.entries()];
  }, []);

  return (
    <figure className="hero-trace">
      <figcaption className="hero-trace__bar">
        <span className="hero-trace__appmark" aria-hidden="true"><IconChurn size={15} /></span>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] text-fg">
          <strong>WrongTrace</strong><span className="text-faint">/ workspace</span>
        </span>
        <span className="hero-trace__live"><i aria-hidden="true" /> Live</span>
        <span className="hero-trace__agents">Sample · 3 agents</span>
        <div className="ml-auto flex items-center gap-1.5">
          <button type="button" onClick={() => setTick((value) => (value - 1 + lines.length) % lines.length)} aria-label="Previous AST step" className="trace-control">−</button>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={playing}
            disabled={reduce}
            className="trace-control trace-control--wide"
          >
            {reduce ? "Manual" : playing ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={() => setTick((value) => (value + 1) % lines.length)} aria-label="Next AST step" className="trace-control">+</button>
        </div>
      </figcaption>

      <div className="hero-trace__metrics" aria-label="Sample workspace metrics">
        <div><span>INDEXED</span><strong>10,363</strong><small>100% ready</small></div>
        <div><span>AST SYMBOLS</span><strong>46,592</strong><small>11 languages</small></div>
        <div><span>NET LOC</span><strong>+210</strong><small>5 mutations</small></div>
        <div><span>THRASHING</span><strong>2</strong><small>needs review</small></div>
      </div>

      <div className="hero-trace__workspace">
        <aside className="file-browser" aria-label="Changed files">
          <div className="file-browser__head">
            <span>CHANGED FILES</span>
            <span>{sampleEvents.length}</span>
          </div>
          <div className="file-browser__tree">
            {folders.map(([folder, events]) => (
              <div key={folder} className="file-group">
                <p><span aria-hidden="true">⌄</span>{folder}</p>
                {events.map((event) => {
                  const path = splitPath(event.file);
                  const active = event.file === selected.file;
                  return (
                    <button
                      key={event.file}
                      type="button"
                      onClick={() => { setSelectedFile(event.file); setTick(0); }}
                      aria-pressed={active}
                      className="file-row"
                    >
                      <span className="file-row__branch" aria-hidden="true" />
                      <IconFile size={13} />
                      <span className="truncate">{path.file}</span>
                      <span className={`file-row__state ${stateTone[event.state]}`} aria-hidden="true">●</span>
                      <span className="sr-only">{event.state}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="file-browser__legend">
            <span><i className="bg-success" /> accepted</span>
            <span><i className="bg-warning" /> pending</span>
            <span><i className="bg-danger" /> rejected</span>
          </div>
        </aside>

        <div className="diff-view">
          <div className="trace-attribution">
            <span><strong>{selected.agent}</strong> / {selected.lang}</span>
            <span className="trace-attribution__delta"><span className="text-success">+{selected.added}</span><span className="text-danger">−{selected.deleted}</span></span>
          </div>
          <div className="diff-view__head">
            <div>
              <span>{selectedPath.folder}/</span><strong>{selectedPath.file}</strong>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.1em] text-success uppercase">
              <IconCheck size={12} /> AST parsed
            </span>
          </div>
          <ol className="diff-lines" aria-label={`AST diff for ${selected.file}`}>
            {lines.map((line, index) => {
              const active = index === activeTick;
              const past = index < activeTick;
              return (
                <li key={`${line.text}-${index}`} className={active ? "is-active" : ""}>
                  <span className="line-number">{index + 1}</span>
                  <span className={`line-marker line-marker--${line.kind}`} aria-hidden="true">
                    {line.kind === "add" ? "+" : line.kind === "del" ? "−" : " "}
                  </span>
                  <code className={active ? "text-fg" : past ? "text-muted" : "text-faint"}>{line.text}</code>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="trace-timeline">
        <div className="trace-timeline__meta">
          <span>SESSION CHURN</span>
          <strong>{String(activeTick + 1).padStart(2, "0")} / {String(lines.length).padStart(2, "0")}</strong>
        </div>
        <div className="trace-timeline__track">
          {sampleTimeline.map((entry, index) => {
            const filled = index <= Math.floor((activeTick / lines.length) * sampleTimeline.length);
            return (
              <div key={`${entry.label}-${entry.at}`} className={filled ? "is-filled" : ""}>
                <motion.i initial={false} animate={{ scaleX: filled ? 1 : 0 }} transition={{ duration: 0.35 }} />
                <span>{entry.at}</span>
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}

export default HeroPanel;
