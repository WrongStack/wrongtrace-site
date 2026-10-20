import Link from "next/link";
import type { Metadata } from "next";

import { IconArrowRight } from "@/components/icons";
import { Container } from "@/components/primitives";
import { docSections } from "@/lib/docs";
import { product } from "@/lib/content";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guides and reference for WrongTrace: the quickstart, the CLI, the MCP server, configuration and the dashboard views.",
};

export default function DocsIndex() {
  const [first, ...rest] = docSections;

  return (
    <Container className="py-12 sm:py-14 lg:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        Documentation
      </p>
      <h1 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-fg sm:text-4xl lg:text-5xl">
        Everything about the daemon, in one place.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted">
        {product.name} ships as a single Go binary. These pages cover installing
        it, the commands it exposes, the tools it offers over MCP, and every
        environment variable it reads.
      </p>

      <Link
        href={`/docs/${first.slug}`}
        className="mt-10 flex items-center justify-between gap-6 rounded-lg border border-primary/40 bg-surface/60 p-6 transition-colors duration-150 hover:border-primary hover:bg-surface"
      >
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
            Start here
          </p>
          <p className="mt-2 text-lg font-medium text-fg">{first.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {first.summary}
          </p>
        </div>
        <IconArrowRight size={20} className="shrink-0 text-primary" />
      </Link>

      <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {rest.map((section) => (
          <li key={section.slug} className="bg-bg">
            <Link
              href={`/docs/${section.slug}`}
              className="group flex h-full flex-col p-6 transition-colors duration-150 hover:bg-raised/40"
            >
              <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
                {section.group}
              </p>
              <p className="mt-2 text-base font-medium text-fg">{section.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {section.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] text-primary">
                Read
                <IconArrowRight
                  size={14}
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
