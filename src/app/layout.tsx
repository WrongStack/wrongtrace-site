import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { OxognetBanner } from "@/components/oxognet-banner";
import { PointerGlow } from "@/components/pointer-glow";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WrongStackBanner } from "@/components/wrongstack-banner";
import { product } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "WrongTrace is a single Go binary that traces what coding agents change: Tree-sitter AST diffs, agent telemetry over MCP and IPC, and an embedded dashboard. No database to run.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${product.name} — See what your agents really changed`,
    template: `%s — ${product.name}`,
  },
  description,
  applicationName: product.name,
  keywords: [
    "AI observability",
    "agent telemetry",
    "code churn",
    "Tree-sitter",
    "MCP",
    "developer tools",
    "Go",
  ],
  authors: [{ name: "WrongStack" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${product.name} — See what your agents really changed`,
    description,
    siteName: product.name,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: product.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${product.name} — See what your agents really changed`,
    description,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "oklch(16% 0.014 274)" },
    { media: "(prefers-color-scheme: light)", color: "oklch(98.4% 0.004 301)" },
  ],
};

/* Applies the stored theme before first paint so the page never flashes. */
const themeInit = `(function(){try{var t=localStorage.getItem("wrongtrace-theme");var c=t==="light"||t==="dark"?t:"system";var l=c==="light"||(c==="system"&&matchMedia("(prefers-color-scheme: light)").matches);document.documentElement.dataset.themeChoice=c;document.documentElement.classList.toggle("light",l);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="wrongtrace-theme" strategy="beforeInteractive">
          {themeInit}
        </Script>
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <PointerGlow />
        <a
          href="#main"
          className="sr-only rounded-md focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-raised focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <WrongStackBanner />
        <SiteFooter />
        <OxognetBanner />
      </body>
    </html>
  );
}
