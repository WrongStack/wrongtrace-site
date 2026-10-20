"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { IconChurn } from "@/components/icons";
import { sampleDiff, sampleEvents, sampleTimeline } from "@/lib/content";
import type { SampleEvent } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const TICK_MS = 520;

/* -------------------------------------------------------------------------- */
/* File tree                                                                   */
/* -------------------------------------------------------------------------- */

type TreeNode = {
  name: string;
  children: TreeNode[];
  file?: SampleEvent;
};

function buildTree(events: SampleEvent[]): TreeNode {
  const root: TreeNode = { name: "", children: [] };

  for (const event of events) {
    const parts = event.file.split("/");
    let node = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      let child = node.children.find((c) => c.name === part);
      if (!child) {
        child = { name: part, children: [] };
        node.children.push(child);
      }
      if (isFile) child.file = event;
      node = child;
    });
  }

  return root;
}

function TreeRow({
  node,
  depth,
  isLast,
}: {
  node: TreeNode;
  depth: number;
  isLast: boolean;
}) {
  const isDir = node.children.length > 0;
  const event = node.file;

  return (
    <li>
      <div
        className="flex items-center gap-2 py-0.5 leading-relaxed"
        style={{ paddingLeft: `${depth * 10}px` }}
      >
        <span aria-hidden="true" className="font-mono text-faint select-none">
          {isDir ? (isLast ? "└" : "├") : "·"}
        </span>
        <span
          className={`truncate font-mono text-xs ${
            isDir ? "text-muted" : "text-fg"
          }`}
        >
          {node.name}
        </span>
        {event ? (
          <span className="ml-auto shrink-0 font-mono text-[10px] tnum">
            <span className="text-add">+{event.added}</span>{" "}
            <span className="text-del">−{event.deleted}</span>
          </span>
        ) : null}
      </div>
      {isDir ? (
        <ul>
          {node.children.map((child, index) => (
            <TreeRow
              key={child.name}
              node={child}
              depth={depth + 1}
              isLast={index === node.children.length - 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The site's signature graphic: a live AST diff with a file tree on the left
 * and a churn timeline on the right. A playhead walks down the diff while the
 * timeline fills behind it. With reduced motion the playhead parks on the last
 * line and the timeline renders complete.
 */
export function HeroPanel() {
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setTick((current) => (current + 1) % sampleDiff.length);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const tree = buildTree(sampleEvents);
  const active = reduce ? sampleDiff.length - 1 : tick;

  const maxAdded = Math.max(...sampleTimeline.map((entry) => entry.added));
  const filled = reduce
    ? sampleTimeline.length
    : Math.min(
        sampleTimeline.length,
        Math.floor((active / sampleDiff.length) * sampleTimeline.length) + 1,
      );

  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-surface/70 shadow-1">
      <figcaption className="flex items-center gap-3 border-b border-line bg-bg/60 px-4 py-2.5">
        <IconChurn size={15} className="text-primary" />
        <span className="font-mono text-xs text-muted">wrongtrace / churn</span>
        <span className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary animate-pulse-dot"
          />
          Live
        </span>
      </figcaption>

      <div
        aria-hidden="true"
        className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_13rem] lg:grid-cols-[15rem_minmax(0,1fr)_13rem]"
      >
        {/* File tree */}
        <div className="hidden border-r border-line bg-bg/40 p-4 lg:block">
          <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            Changed files
          </p>
          <ul>
            {tree.children.map((child, index) => (
              <TreeRow
                key={child.name}
                node={child}
                depth={0}
                isLast={index === tree.children.length - 1}
              />
            ))}
          </ul>
        </div>

        {/* Diff */}
        <div className="min-w-0 border-b border-line md:border-r md:border-b-0">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2">
            <span className="truncate font-mono text-xs text-fg">
              internal/ast/diff.go
            </span>
            <span className="ml-auto shrink-0 font-mono text-[10px] text-faint">
              AST DELTA
            </span>
          </div>
          <ol className="overflow-x-auto py-2">
            {sampleDiff.map((line, index) => {
              const isActive = index === active;
              const isPast = index < active;
              const marker =
                line.kind === "add" ? "+" : line.kind === "del" ? "−" : " ";
              const tint =
                line.kind === "add"
                  ? "text-add"
                  : line.kind === "del"
                    ? "text-del"
                    : "text-faint";

              return (
                <li
                  key={`${line.text}-${index}`}
                  className={`flex gap-3 px-4 font-mono text-xs leading-relaxed transition-colors duration-150 ${
                    isActive ? "bg-primary/8" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-3 shrink-0 select-none ${tint}`}
                  >
                    {marker}
                  </span>
                  <span
                    className={`w-5 shrink-0 select-none text-right tnum ${
                      isActive ? "text-primary" : "text-faint"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`whitespace-pre ${
                      isActive
                        ? "text-fg"
                        : isPast
                          ? "text-muted"
                          : "text-faint"
                    }`}
                  >
                    {line.text}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Churn timeline */}
        <div className="p-4">
          <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            Churn timeline
          </p>
          <ul className="space-y-3">
            {sampleTimeline.map((entry, index) => {
              const isFilled = index < filled;
              const width = Math.max(6, Math.round((entry.added / maxAdded) * 100));

              return (
                <li key={`${entry.label}-${entry.at}`}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={`truncate font-mono text-[11px] ${
                        isFilled ? "text-fg" : "text-faint"
                      }`}
                    >
                      {entry.label}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-faint tnum">
                      {entry.at}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-line">
                    <motion.div
                      className={`h-full rounded-full ${
                        isFilled ? "bg-primary" : "bg-transparent"
                      }`}
                      initial={false}
                      animate={{ width: isFilled ? `${width}%` : "0%" }}
                      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </figure>
  );
}

export default HeroPanel;
