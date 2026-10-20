import { CopyButton } from "@/components/copy-button";
import type { DocBlock } from "@/lib/docs";

/**
 * Renders the documentation content model. Every block is a server-rendered
 * primitive so the docs pages ship as static HTML.
 */

function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-code">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11px] text-faint">
          {caption ?? "shell"}
        </span>
        <CopyButton value={code} label={`Copy ${caption ?? "code"}`} />
      </div>
      <pre className="overflow-x-auto px-4 py-4">
        <code className="font-mono text-sm leading-relaxed text-fg">
          {code}
        </code>
      </pre>
    </figure>
  );
}

function Steps({
  items,
}: {
  items: { title: string; body: string; command?: string; note?: string }[];
}) {
  return (
    <ol className="space-y-6">
      {items.map((item, index) => (
        <li key={item.title} className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-5">
          <span className="flex size-7 items-center justify-center rounded-md border border-line bg-raised font-mono text-xs text-primary">
            {index + 1}
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-medium text-fg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
            {item.command ? (
              <div className="mt-4 flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
                <span aria-hidden="true" className="font-mono text-sm text-primary">
                  $
                </span>
                <code className="min-w-0 flex-1 font-mono text-sm break-all text-fg">
                  {item.command}
                </code>
                <CopyButton value={item.command} label={`Copy ${item.title} command`} />
              </div>
            ) : null}
            {item.note ? (
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-faint">
                {item.note}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function RowList({
  items,
}: {
  items: { label: string; value: string; hint?: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 bg-bg px-5 py-4 sm:grid-cols-[minmax(0,18rem)_auto] sm:items-baseline sm:gap-8"
        >
          <code className="font-mono text-sm break-words text-fg">{item.label}</code>
          <code className="font-mono text-sm text-primary tnum">{item.value}</code>
          {item.hint ? (
            <p className="text-sm leading-relaxed text-muted sm:col-span-2">
              {item.hint}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function PairList({
  rows,
}: {
  rows: [string, string][];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
      {rows.map(([label, description]) => (
        <div
          key={label}
          className="grid gap-1 bg-bg px-5 py-4 sm:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] sm:gap-8"
        >
          <code className="font-mono text-sm break-words text-fg">{label}</code>
          <span className="text-sm leading-relaxed text-muted">{description}</span>
        </div>
      ))}
    </div>
  );
}

export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "prose":
            return (
              <p key={index} className="max-w-2xl text-base leading-relaxed text-pretty text-muted">
                {block.text}
              </p>
            );
          case "steps":
            return <Steps key={index} items={block.items} />;
          case "code":
            return <CodeBlock key={index} code={block.code} caption={block.caption} />;
          case "table":
            return <PairList key={index} rows={block.rows} />;
          case "rows":
            return <RowList key={index} items={block.items} />;
          case "callout":
            return (
              <aside
                key={index}
                className="rounded-lg border-l-2 border border-line border-l-primary bg-raised/40 px-5 py-4"
              >
                <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
                  {block.title}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {block.body}
                </p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default DocBlocks;
