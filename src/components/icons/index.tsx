import type { SVGProps } from "react";

/**
 * One icon family for the whole site: 24px grid, 1.5px stroke, round caps,
 * `currentColor` fill-free geometry. Icons are decorative by default — the
 * component that owns them supplies the accessible name.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function glyph(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
}

/** Churn — a live signal trace, the site's signature shape. */
export function IconChurn(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M3 12h4l2.5-7 4 14 2.5-7h5" />
    </svg>
  );
}

/** AST — a syntax tree, root with two branches. */
export function IconAst(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M12 3v4" />
      <path d="M12 7H6.5v3" />
      <path d="M12 7h5.5v3" />
      <rect x="9.5" y="1.5" width="5" height="3.5" rx="1" />
      <rect x="3.5" y="10" width="6" height="4" rx="1" />
      <rect x="14.5" y="10" width="6" height="4" rx="1" />
      <path d="M6.5 14v3.5a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V14" />
    </svg>
  );
}

/** Health score — a dial with a needle. */
export function IconGauge(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16l4-5" />
      <path d="M3 19.5h18" />
    </svg>
  );
}

/** Guardrail — a shield with a rule across it. */
export function IconShield(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** MCP — a plug bridging two surfaces. */
export function IconMcp(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M9 3v5" />
      <path d="M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6z" />
      <path d="M12 17v4" />
    </svg>
  );
}

/** Gateway — traffic routed through an observer. */
export function IconGateway(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <rect x="8.5" y="2.5" width="7" height="5" rx="1" />
      <path d="M12 7.5v3" />
      <rect x="2.5" y="16.5" width="6" height="5" rx="1" />
      <rect x="15.5" y="16.5" width="6" height="5" rx="1" />
      <path d="M12 10.5v3.5" />
      <path d="M12 14H5.5v2.5" />
      <path d="M12 14h6.5v2.5" />
    </svg>
  );
}

/** Profiler — latency percentiles. */
export function IconProfiler(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M3 20V4" />
      <path d="M3 20h18" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20v-12" />
    </svg>
  );
}

/** Code Atlas — a node graph. */
export function IconAtlas(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10.4 6.8 6.6 15.6" />
      <path d="M13.6 6.8l3.8 8.8" />
      <path d="M7.5 18h9" />
    </svg>
  );
}

/** Sessions — stacked agent runs. */
export function IconSessions(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <rect x="3" y="3.5" width="12" height="6" rx="1.5" />
      <rect x="6" y="12" width="12" height="6" rx="1.5" />
    </svg>
  );
}

/** Lineage — a branch with history. */
export function IconLineage(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <circle cx="6.5" cy="5.5" r="2.5" />
      <circle cx="6.5" cy="18.5" r="2.5" />
      <circle cx="17.5" cy="12" r="2.5" />
      <path d="M6.5 8v8" />
      <path d="M9 5.5h3.5a2.5 2.5 0 0 1 2.5 2.5V9.6" />
      <path d="M9 18.5h3.5a2.5 2.5 0 0 0 2.5-2.5v-1.3" />
    </svg>
  );
}

/** Model intelligence — a processor. */
export function IconModel(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
    </svg>
  );
}

/** Terminal — a shell prompt. */
export function IconTerminal(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M6.5 9.5l3 2.5-3 2.5" />
      <path d="M12.5 15h5" />
    </svg>
  );
}

/** Copy to clipboard. */
export function IconCopy(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
    </svg>
  );
}

/** Confirm. */
export function IconCheck(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

/** Rightward arrow. */
export function IconArrowRight(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M4 12h15" />
      <path d="M13.5 6.5L19 12l-5.5 5.5" />
    </svg>
  );
}

/** Disclosure chevron. */
export function IconChevronDown(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

/** Light theme. */
export function IconSun(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  );
}

/** Dark theme. */
export function IconMoon(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M20 13.5A8 8 0 0 1 10.5 4a8 8 0 1 0 9.5 9.5z" />
    </svg>
  );
}

/** GitHub mark. */
export function IconGithub(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M9 19c-4 1.3-4-2.2-5.5-2.7M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.4 2.6 5.4 2.9 5.4 2.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.3c0 4.7 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />
    </svg>
  );
}

/** External link. */
export function IconExternal(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M18 14.5v4A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6h4" />
    </svg>
  );
}

/** Guardrail file lock. */
export function IconLock(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </svg>
  );
}

/** Timeline — a clock with a hand. */
export function IconClock(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

/** Source file. */
export function IconFile(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}

/** Diff — two opposed lines. */
export function IconDiff(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M7 4v13" />
      <path d="M3.5 8.5L7 12l3.5-3.5" />
      <path d="M17 20V7" />
      <path d="M13.5 15.5L17 12l3.5 3.5" />
    </svg>
  );
}

/** Search / discovery. */
export function IconSearch(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8L20.5 20.5" />
    </svg>
  );
}

/** Database — the local store. */
export function IconDatabase(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </svg>
  );
}

/** Webhook delivery. */
export function IconWebhook(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="5.5" cy="17" r="2.5" />
      <circle cx="18.5" cy="17" r="2.5" />
      <path d="M10.4 7.9 6.9 14.8" />
      <path d="M13.6 7.9l3.5 6.9" />
      <path d="M8 17h8" />
    </svg>
  );
}

/** Language / parser coverage. */
export function IconLanguages(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M3 6h9" />
      <path d="M7.5 6v1.5c0 3-1.8 5.5-4.5 6.5" />
      <path d="M4.5 10.5c1.4 1.6 3.2 2.6 5.5 2.9" />
      <path d="M13 20l4-10 4 10" />
      <path d="M14.4 17h5.2" />
    </svg>
  );
}

/** Spark — a fast start. */
export function IconSpark(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
    </svg>
  );
}

/** Settings / governance sliders. */
export function IconSliders(props: IconProps) {
  return (
    <svg {...glyph(props.size ?? 20)} {...props}>
      <path d="M4 7h10M18 7h2" />
      <path d="M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  );
}
