import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocBlocks } from "@/components/docs-blocks";
import { IconArrowRight } from "@/components/icons";
import { docSections, findDocSection } from "@/lib/docs";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return docSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = findDocSection(slug);

  if (!section) return {};

  return {
    title: section.title,
    description: section.summary,
    alternates: { canonical: `/docs/${section.slug}/` },
  };
}

export default async function DocSectionPage({ params }: PageProps) {
  const { slug } = await params;
  const section = findDocSection(slug);

  if (!section) notFound();

  const index = docSections.findIndex((s) => s.slug === slug);
  const previous = index > 0 ? docSections[index - 1] : null;
  const next = index < docSections.length - 1 ? docSections[index + 1] : null;

  return (
    <article>
      <header>
        <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
          {section.group}
        </p>
        <h1 className="mt-4 text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-fg sm:text-4xl">
          {section.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted">
          {section.summary}
        </p>
      </header>

      <div className="mt-10">
        <DocBlocks blocks={section.body} />
      </div>

      <nav
        aria-label="Documentation pages"
        className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/docs/${previous.slug}`}
            className="group flex flex-col bg-bg p-5 transition-colors duration-150 hover:bg-raised/40"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              Previous
            </span>
            <span className="mt-2 inline-flex items-center gap-2 text-sm text-fg">
              <IconArrowRight
                size={15}
                className="rotate-180 transition-transform duration-150 group-hover:-translate-x-0.5"
              />
              {previous.title}
            </span>
          </Link>
        ) : (
          <span className="bg-bg" />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="group flex flex-col bg-bg p-5 text-right transition-colors duration-150 hover:bg-raised/40"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              Next
            </span>
            <span className="mt-2 inline-flex items-center justify-end gap-2 text-sm text-fg">
              {next.title}
              <IconArrowRight
                size={15}
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ) : (
          <span className="bg-bg" />
        )}
      </nav>
    </article>
  );
}
