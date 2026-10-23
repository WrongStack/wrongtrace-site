"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import { CopyButton } from "@/components/copy-button";
import { product } from "@/lib/content";

const PLATFORMS = [
  { id: "unix", label: "macOS / Linux", shell: "sh", command: product.install },
  { id: "windows", label: "Windows", shell: "PowerShell", command: product.installPowerShell },
] as const;

/** One platform at a time: shared by hero, install section and closing CTA. */
export function InstallCommand({ label = "Install WrongTrace" }: { label?: string }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = active;
    if (event.key === "ArrowRight" || event.key === "End") next = 1;
    else if (event.key === "ArrowLeft" || event.key === "Home") next = 0;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="install-command">
      <div className="install-command__tabs" role="tablist" aria-label={`${label} platform`} onKeyDown={onKeyDown}>
        {PLATFORMS.map((platform, index) => (
          <button
            key={platform.id}
            ref={(node) => { refs.current[index] = node; }}
            id={`${id}-${platform.id}-tab`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-${platform.id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
          >
            {platform.label}
          </button>
        ))}
        <span className="install-command__shell" aria-hidden="true">{PLATFORMS[active].shell}</span>
      </div>
      {PLATFORMS.map((platform, index) => (
        <div key={platform.id} id={`${id}-${platform.id}-panel`} role="tabpanel" aria-labelledby={`${id}-${platform.id}-tab`} hidden={active !== index} tabIndex={0}>
          <div className="install-command__code">
            <span aria-hidden="true">{platform.id === "windows" ? ">" : "$"}</span>
            <code>{platform.command}</code>
            <CopyButton value={platform.command} label={`Copy ${platform.label} installer`} />
          </div>
        </div>
      ))}
    </div>
  );
}
