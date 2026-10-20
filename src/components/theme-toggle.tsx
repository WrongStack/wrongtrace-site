"use client";

import { useSyncExternalStore } from "react";

import { IconMoon, IconSun } from "@/components/icons";

const STORAGE_KEY = "wrongtrace-theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("light");
}

/**
 * Switches the light derivative of the Dark Pro theme. The class lives on
 * <html> so the change applies to the whole document without a re-render, and
 * the choice is stored for the next visit.
 *
 * The current theme is read through `useSyncExternalStore` so the server
 * renders a stable snapshot and the client converges after hydration instead
 * of reporting a mismatch.
 */
export function ThemeToggle() {
  const isLight = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function toggle() {
    const next = !isLight;
    document.documentElement.classList.toggle("light", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
    } catch {
      // Storage can be unavailable in private mode; the toggle still works.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {isLight ? <IconMoon size={18} /> : <IconSun size={18} />}
    </button>
  );
}

export default ThemeToggle;
