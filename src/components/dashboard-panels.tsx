"use client";

import { useState } from "react";

import {
  sampleDiffs,
  sampleEvents,
  sampleGateway,
  sampleKpis,
  sampleLineage,
  sampleLineageSymbol,
  sampleTimeline,
} from "@/lib/content";
import type { SampleDiffLine } from "@/lib/content";

const toneClasses: Record<string, string> = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

/* -------------------------------------------------------------------------- */
/* Overview                                                                    */
/* -------------------------------------------------------------------------- */

export function OverviewPanel() {
  const maxAdded = Math.max(...sampleTimeline.map((entry) => entry.added));

  return (
    <div className="grid gap-px bg-line lg:grid-cols-12">
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
        {sampleKpis.map((kpi) => (
          <div key={kpi.label} className="bg-bg p-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              {kpi.label}
            </p>
            <p
              className={`mt-2 font-mono text-2xl tnum ${toneClasses[kpi.tone]}`}
            >
              {kpi.value}
            </p>
            <p className="mt-1 font-mono text-[11px] text-faint">{kpi.note}</p>
          </div>
        ))}
      </div>

      <div className="bg-bg p-4 lg:col-span-7">
        <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
          Churn by session
        </p>
        <ul className="mt-4 space-y-3">
          {sampleTimeline.map((entry) => {
            const width = Math.max(
              4,
              Math.round((entry.added / maxAdded) * 100),
            );
            return (
              <li key={`${entry.label}-${entry.at}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate font-mono text-[11px] text-fg">
                    {entry.label}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-faint tnum">
                    {entry.at} · {entry.model}
                  </span>
                </div>
                <div className="mt-1.5 flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-line">
                  <span
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${width}%` }}
                  />
                  <span
                    className="h-full rounded-full bg-del"
                    style={{
                      width: `${Math.max(2, Math.round((entry.deleted / maxAdded) * 100))}%`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-bg lg:col-span-12">
        <div className="flex items-center justify-between gap-4 px-4 pt-4">
          <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            Live event stream
          </p>
          <p className="font-mono text-[10px] text-faint">5 events</p>
        </div>
        <ul className="mt-3">
          {sampleEvents.map((event) => (
            <li
              key={event.file}
              className="grid gap-1 border-t border-line px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-6"
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-xs text-fg">
                  {event.file}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-faint">
                  {event.agent} · {event.model}
                </p>
              </div>
              <p className="font-mono text-[11px] tnum">
                <span className="text-add">+{event.added}</span>{" "}
                <span className="text-del">−{event.deleted}</span>
              </p>
              <p
                className={`font-mono text-[10px] tracking-wide uppercase ${
                  event.state === "accepted"
                    ? "text-success"
                    : event.state === "pending"
                      ? "text-warning"
                      : "text-danger"
                }`}
              >
                {event.state}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Diffs                                                                       */
/* -------------------------------------------------------------------------- */

export function DiffsPanel() {
  const [selected, setSelected] = useState<string>(sampleEvents[0].file);
  const lines: SampleDiffLine[] = sampleDiffs[selected] ?? [];

  return (
    <div className="grid lg:grid-cols-12">
      <ul className="border-b border-line lg:col-span-4 lg:border-r lg:border-b-0">
        {sampleEvents.map((event) => {
          const isSelected = event.file === selected;
          return (
            <li key={event.file} className="border-b border-line last:border-b-0">
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(event.file)}
                className={`w-full px-4 py-3 text-left transition-colors duration-150 ${
                  isSelected ? "bg-raised" : "hover:bg-raised/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 shrink-0 rounded-full ${
                      isSelected ? "bg-primary" : "bg-line-strong"
                    }`}
                  />
                  <span
                    className={`truncate font-mono text-xs ${
                      isSelected ? "text-fg" : "text-muted"
                    }`}
                  >
                    {event.file}
                  </span>
                </span>
                <span className="mt-1 flex items-center gap-2 pl-3.5 font-mono text-[10px] tnum">
                  <span className="text-add">+{event.added}</span>
                  <span className="text-del">−{event.deleted}</span>
                  <span className="text-faint">{event.lang}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="min-w-0 lg:col-span-8">
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="truncate font-mono text-xs text-fg">{selected}</span>
          <span className="ml-auto shrink-0 font-mono text-[10px] text-faint">
            AST DELTA
          </span>
        </div>
        <ol className="overflow-x-auto py-2">
          {lines.map((line, index) => {
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
                className="flex gap-3 px-4 font-mono text-xs leading-relaxed"
              >
                <span aria-hidden="true" className={`w-3 shrink-0 ${tint}`}>
                  {marker}
                </span>
                <span className="w-5 shrink-0 text-right text-faint tnum">
                  {index + 1}
                </span>
                <span
                  className={`whitespace-pre ${
                    line.kind === "context" ? "text-muted" : "text-fg"
                  }`}
                >
                  {line.text}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Symbol lineage                                                              */
/* -------------------------------------------------------------------------- */

export function LineagePanel() {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-sm text-fg">
          {sampleLineageSymbol.symbol}
        </span>
        <span className="font-mono text-[11px] text-faint">
          {sampleLineageSymbol.kind} · {sampleLineageSymbol.file}
        </span>
      </div>

      <ol className="mt-5 space-y-0">
        {sampleLineage.map((revision, index) => (
          <li key={revision.version} className="flex gap-4">
            <div className="flex w-4 shrink-0 flex-col items-center">
              <span
                aria-hidden="true"
                className={`mt-1.5 size-2 rounded-full ${
                  revision.change === "reverted" ? "bg-danger" : "bg-primary"
                }`}
              />
              {index < sampleLineage.length - 1 ? (
                <span aria-hidden="true" className="w-px flex-1 bg-line" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 pb-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-fg">
                  {revision.version}
                </span>
                <span className="font-mono text-[10px] text-faint">
                  {revision.at}
                </span>
                <span
                  className={`font-mono text-[10px] tracking-wide uppercase ${
                    revision.change === "reverted"
                      ? "text-danger"
                      : revision.change === "added"
                        ? "text-success"
                        : "text-primary"
                  }`}
                >
                  {revision.change}
                </span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted">
                {revision.model}
              </p>
              <p className="mt-1 font-mono text-[11px] tnum">
                <span className="text-add">+{revision.added}</span>{" "}
                <span className="text-del">−{revision.deleted}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* AI gateway                                                                  */
/* -------------------------------------------------------------------------- */

export function GatewayPanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
        Token composition
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="pb-2 font-mono text-[10px] font-normal tracking-wide text-faint uppercase">
                Provider
              </th>
              <th scope="col" className="pb-2 text-right font-mono text-[10px] font-normal tracking-wide text-faint uppercase">
                Prompt
              </th>
              <th scope="col" className="pb-2 text-right font-mono text-[10px] font-normal tracking-wide text-faint uppercase">
                Completion
              </th>
              <th scope="col" className="pb-2 text-right font-mono text-[10px] font-normal tracking-wide text-faint uppercase">
                Reasoning
              </th>
              <th scope="col" className="pb-2 text-right font-mono text-[10px] font-normal tracking-wide text-faint uppercase">
                Cached
              </th>
            </tr>
          </thead>
          <tbody>
            {sampleGateway.map((row) => (
              <tr key={row.provider} className="border-b border-line last:border-b-0">
                <th scope="row" className="py-3 font-mono text-xs font-normal text-fg">
                  {row.provider}
                </th>
                <td className="py-3 text-right font-mono text-xs text-muted tnum">
                  {row.prompt}
                </td>
                <td className="py-3 text-right font-mono text-xs text-muted tnum">
                  {row.completion}
                </td>
                <td className="py-3 text-right font-mono text-xs text-muted tnum">
                  {row.reasoning}
                </td>
                <td className="py-3 text-right font-mono text-xs text-success tnum">
                  {row.cached}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
        Response cache stays off unless a request sends
        <span className="text-muted"> X-WrongTrace-Cache: allow</span>. Cache keys
        are isolated by credential, project, agent and session.
      </p>
    </div>
  );
}
