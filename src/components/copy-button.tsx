"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { IconCheck, IconCopy } from "@/components/icons";

type CopyButtonProps = {
  value: string;
  /** Accessible label, e.g. "Copy install command". */
  label: string;
  className?: string;
};

/** Copies `value` to the clipboard and confirms it for two seconds. */
export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the command stays selectable on screen.
      setCopied(false);
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-raised/60 text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className}`}
    >
      {copied ? (
        <IconCheck size={16} className="text-success" />
      ) : (
        <IconCopy size={16} />
      )}
    </button>
  );
}

export default CopyButton;
