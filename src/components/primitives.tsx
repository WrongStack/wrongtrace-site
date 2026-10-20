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
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header                                                              */
/* -------------------------------------------------------------------------- */

type SectionHeadProps = {
  /** Monospace section marker, e.g. "03 / CONFIGURATION". */
  label: string;
  /** Two-line statement headline. The second line carries the point. */
  headline: readonly [string, string];
  sub?: string;
  aside?: ReactNode;
  className?: string;
};

export function SectionHead({
  label,
  headline,
  sub,
  aside,
  className = "",
}: SectionHeadProps) {
  return (
    <div className={`grid gap-8 md:grid-cols-12 md:items-end ${className}`}>
      <div className="md:col-span-7">
        <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
          {label}
        </p>
        <h2 className="mt-5 text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-fg sm:text-4xl lg:text-[2.75rem]">
          <span className="block">{headline[0]}</span>{" "}
          <span className="block">{headline[1]}</span>
        </h2>
        {sub ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted">
            {sub}
          </p>
        ) : null}
      </div>
      {aside ? (
        <div className="md:col-span-5 md:justify-self-end">{aside}</div>
      ) : null}
    </div>
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
  "inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

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
