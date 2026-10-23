"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { IconCheck, IconCopy } from "@/components/icons";
import { copyStatusMessage, type CopyStatus } from "@/lib/copy-status";

type CopyButtonProps = {
  value: string;
  /** Accessible label, e.g. "Copy install command". */
  label: string;
  className?: string;
};

/** How long each outcome stays on screen. */
const RESET_MS = 2000;
const FAILURE_RESET_MS = 4000;

/** Copies `value` to the clipboard and confirms it for two seconds. */
export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    const report = (next: CopyStatus, delay: number) => {
      setStatus(next);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus("idle"), delay);
    };

    try {
      await navigator.clipboard.writeText(value);
      report("copied", RESET_MS);
    } catch {
      // Clipboard access can be denied; the command stays selectable on screen.
      report("failed", FAILURE_RESET_MS);
    }
  }, [value]);

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-raised/60 text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className}`}
      >
        {status === "copied" ? (
          <IconCheck size={16} className="text-success" />
        ) : (
          <IconCopy size={16} />
        )}
      </button>
      {/* The icon swap is visual only. This is what a screen reader hears,
          including when the clipboard was refused. */}
      <span role="status" className="sr-only">
        {copyStatusMessage(status, label)}
      </span>
    </>
  );
}

export default CopyButton;