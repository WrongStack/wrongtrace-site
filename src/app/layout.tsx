import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { product } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${product.name} — See what your agents really changed`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "oklch(17% 0.015 265)" },
    { media: "(prefers-color-scheme: light)", color: "oklch(98% 0.004 265)" },
  ],
};

/* Applies the stored theme before first paint so the page never flashes. */
const themeInit = `(function(){try{var t=localStorage.getItem("wrongtrace-theme");if(t==="light"){document.documentElement.classList.add("light");}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="wrongtrace-theme" strategy="beforeInteractive">
          {themeInit}
        </Script>
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
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
        <SiteFooter />
      </body>
    </html>
  );
}
