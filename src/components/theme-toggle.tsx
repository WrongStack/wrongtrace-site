"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { IconCheck, IconMoon, IconSun } from "@/components/icons";

const STORAGE_KEY = "wrongtrace-theme";
type ThemeChoice = "system" | "light" | "dark";

function MonitorIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function ChevronIcon() {
  return <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>;
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme-choice"] });
  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", onChange);
  return () => { observer.disconnect(); media.removeEventListener("change", onChange); };
}

function getSnapshot() {
  const choice = (document.documentElement.dataset.themeChoice ?? "system") as ThemeChoice;
  return `${choice}:${document.documentElement.classList.contains("light")}`;
}

function applyTheme(choice: ThemeChoice) {
  const light = choice === "light" || (choice === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
  document.documentElement.dataset.themeChoice = choice;
  document.documentElement.classList.toggle("light", light);
  try {
    if (choice === "system") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, choice);
  } catch { /* Theme still applies without storage. */ }
}

const OPTIONS = [
  { value: "light" as const, label: "Light", Icon: IconSun },
  { value: "dark" as const, label: "Dark", Icon: IconMoon },
  { value: "system" as const, label: "System", Icon: MonitorIcon },
];

/** Appearance picker matched to the measured CobaltDB theme dialog. */
export function ThemeToggle() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "system:false");
  const [choice, lightValue] = snapshot.split(":") as [ThemeChoice, string];
  const isLight = lightValue === "true";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const currentLabel = OPTIONS.find((option) => option.value === choice)?.label ?? "System";
  const CurrentIcon = choice === "system" ? MonitorIcon : isLight ? IconSun : IconMoon;

  useEffect(() => {
    if (choice !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => document.documentElement.classList.toggle("light", media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [choice]);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    rootRef.current?.querySelector<HTMLInputElement>("input:checked")?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open]);

  return (
    <div ref={rootRef} className="theme-picker">
      <button
        type="button"
        ref={triggerRef}
        className="theme-trigger"
        aria-label={`Color theme: ${currentLabel}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <CurrentIcon size={16} />
        <span>{currentLabel}</span>
        <ChevronIcon />
      </button>

      {open ? (
        <div id={panelId} role="dialog" aria-label="Appearance" className="theme-panel">
          <div className="theme-panel-heading">
            <span>Appearance</span>
            <span>Your space, your style.</span>
          </div>
          <fieldset className="theme-options">
            <legend className="sr-only">Color theme</legend>
            {OPTIONS.map(({ value, label, Icon }) => (
              <label key={value} className="theme-option">
                <input
                  type="radio"
                  name={`${panelId}-theme`}
                  value={value}
                  checked={choice === value}
                  onChange={() => applyTheme(value)}
                />
                <span className={`theme-preview theme-preview--${value}`} aria-hidden="true">
                  <span className="theme-preview__window">
                    <span className="theme-preview__sidebar" />
                    <span className="theme-preview__content"><i /><i /><i /></span>
                  </span>
                  <span className="theme-choice-icon"><Icon size={13} /></span>
                  <span className="theme-choice-check"><IconCheck size={12} /></span>
                </span>
                <span className="theme-option-label">{label}</span>
              </label>
            ))}
          </fieldset>
          <p className="theme-panel-status" aria-live="polite">
            {choice === "system" ? <MonitorIcon size={13} /> : isLight ? <IconSun size={13} /> : <IconMoon size={13} />}
            {choice === "system" ? "Matches your device’s appearance." : `${currentLabel} appearance is active.`}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default ThemeToggle;
