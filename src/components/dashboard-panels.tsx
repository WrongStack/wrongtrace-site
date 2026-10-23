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
    <div className="dashboard-overview">
      <div className="dashboard-kpis">
        {sampleKpis.map((kpi) => (
          <div key={kpi.label} className={`dashboard-kpi dashboard-kpi--${kpi.tone}`}>
            <span className="dashboard-kpi__icon" aria-hidden="true" />
            <p>{kpi.label}</p>
            <strong className={`tnum ${toneClasses[kpi.tone]}`}>{kpi.value}</strong>
            <small>{kpi.note}</small>
          </div>
        ))}
      </div>

      <div className="dashboard-overview__grid">
        <div className="dashboard-card dashboard-chart">
          <div className="dashboard-card__head">
            <div><strong>AST code churn &amp; velocity</strong><span>Correlated mutations across active sessions</span></div>
            <span className="dashboard-card__mode">All time</span>
          </div>
          <div className="churn-chart" aria-label="Sample code churn by session">
            <div className="churn-chart__grid" aria-hidden="true"><i /><i /><i /><i /></div>
            {sampleTimeline.map((entry) => {
              const height = Math.max(12, Math.round((entry.added / maxAdded) * 100));
              const deleted = Math.max(6, Math.round((entry.deleted / maxAdded) * 100));
              return (
                <div className="churn-chart__column" key={`${entry.label}-${entry.at}`}>
                  <div className="churn-chart__bars">
                    <i style={{ height: `${height}%` }} />
                    <b style={{ height: `${deleted}%` }} />
                  </div>
                  <span>{entry.at}</span>
                </div>
              );
            })}
          </div>
          <div className="churn-chart__legend"><span><i /> Added</span><span><i /> Deleted</span></div>
        </div>

        <div className="dashboard-card dashboard-events">
          <div className="dashboard-card__head">
            <div><strong>Live mutation stream</strong><span>5 events · sample workspace</span></div>
            <span className="dashboard-live-dot"><i aria-hidden="true" /> Live</span>
          </div>
          <ul>
          {sampleEvents.map((event) => (
            <li
              key={event.file}
              className="dashboard-event"
            >
              <div className="min-w-0">
                <p>{event.file}</p>
                <small>{event.agent} · {event.model}</small>
              </div>
              <p className="dashboard-event__delta tnum">
                <span className="text-add">+{event.added}</span>{" "}
                <span className="text-del">−{event.deleted}</span>
              </p>
              <p className={`dashboard-event__state ${
                  event.state === "accepted"
                    ? "text-success"
                    : event.state === "pending"
                      ? "text-warning"
                      : "text-danger"
                }`}><i aria-hidden="true" />{event.state}</p>
            </li>
          ))}
          </ul>
        </div>
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
      <div className="gateway-summary">
        <div><span>Proxy requests</span><strong>100</strong><small>live intercepted</small></div>
        <div><span>Total tokens</span><strong>2.59M</strong><small>all providers</small></div>
        <div><span>Prompt cache</span><strong>87.5%</strong><small>$1.63 saved</small></div>
        <div><span>Tool calls</span><strong>124</strong><small>$0.54 spend</small></div>
      </div>
      <div className="gateway-composition" aria-label="Sample token composition">
        <div><span>Cached prompt</span><i style={{width:"62%"}} /></div>
        <div><span>Fresh prompt</span><i style={{width:"23%"}} /></div>
        <div><span>Completion</span><i style={{width:"10%"}} /></div>
        <div><span>Reasoning</span><i style={{width:"5%"}} /></div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
          Provider traffic
        </p>
        <span className="dashboard-live-dot"><i aria-hidden="true" /> Wire live</span>
      </div>
      <div className="mt-3 overflow-x-auto rounded-md border border-line bg-surface/40 px-4">
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
