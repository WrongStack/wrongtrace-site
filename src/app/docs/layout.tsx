import type { ReactNode } from "react";

import { DocsSidebar } from "@/components/docs-sidebar";
import { Container } from "@/components/primitives";

/**
 * Documentation shell. Every page under /docs gets the same section list on
 * the left, the way the reference documentation sites structure theirs.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-line">
      <Container className="grid gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <aside className="min-w-0 lg:col-span-3">
          <div className="min-w-0 lg:sticky lg:top-24">
            <DocsSidebar />
          </div>
        </aside>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </Container>
    </div>
  );
}
