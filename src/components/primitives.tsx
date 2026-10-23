import Link from "next/link";
import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* Layout primitives                                                           */
/* -------------------------------------------------------------------------- */

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** A full-width band separated from the previous one by a hairline. */
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 border-t border-line ${className}`}
    >
      {children}
    </section>
  );
}

/** Standard content gutter and max width. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`site-container ${className}`}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header                                                              */
/* -------------------------------------------------------------------------- */

type SectionHeadProps = {
  /** Monospace section marker, e.g. "03 · CONFIGURATION". */
  label: string;
  /** Two-line statement headline. The second line carries the point. */
  headline: readonly [string, string];
  /** Optional kicker above the marker, e.g. "PURE GO / v0.3.17". */
  kicker?: string;
  /** Italicise the second line. The reference sites do this on the
      line that carries the argument. */
  emphasis?: boolean;
  sub?: string;
  aside?: ReactNode;
  className?: string;
};

export function SectionHead({
  label,
  headline,
  kicker,
  emphasis = false,
  sub,
  aside,
  className = "",
}: SectionHeadProps) {
  return (
    <div className={`section-head ${className}`}>
      <div>
        <p className="section-head__label">{label}</p>
        <h2 className="section-head__title">
          <span>{headline[0]}</span>{" "}
          <span className={emphasis ? "is-emphasis" : ""}>{headline[1]}</span>
        </h2>
      </div>
      <div className="section-head__context">
        {sub ? <p>{sub}</p> : null}
        {aside ? <div className="section-head__aside">{aside}</div> : null}
        {kicker ? <p className="section-head__detail">{kicker}</p> : null}
      </div>
    </div>
  );
}

/**
 * The line above a section marker. Monospace, faint, and quiet — it names
 * the build or the licence, not a claim.
 */
export function Kicker({ children, className = "" }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mb-3 font-mono text-[11px] tracking-[0.2em] text-faint uppercase ${className}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                     */
/* -------------------------------------------------------------------------- */

type ActionProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
};

const actionBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition-[color,background-color,border-color,transform,translate,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const actionVariants = {
  primary:
    "border-primary bg-primary text-bg hover:brightness-110 hover:shadow-[0_0_0_1px_var(--primary)]",
  ghost:
    "border-line bg-transparent text-fg hover:border-line-strong hover:bg-raised",
} as const;

/** Internal or external link styled as a button. */
export function Action({
  children,
  href,
  variant = "primary",
  className = "",
}: ActionProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={`${actionBase} ${actionVariants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${actionBase} ${actionVariants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
