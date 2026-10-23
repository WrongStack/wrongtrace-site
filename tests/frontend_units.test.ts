/**
 * Unit regressions for the pure logic behind the landing page.
 *
 * Run with the Node test runner, which needs no extra dependency:
 *   node --test tests/frontend_units.test.ts
 *
 * These cover the rules a browser test cannot pin down cheaply: the copyable
 * environment snippet has to stay runnable, the copy button has to say
 * something in both outcomes, and the scrolling agent strip must not be
 * announced twice.
 */

import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

// The modules under test are TypeScript, so they are pulled in through the
// CommonJS loader: Node strips the types and the specifier stays explicit.
const nodeRequire = createRequire(import.meta.url);

const { buildEnvSnippet, isShellLiteral } = nodeRequire(
  "../src/lib/env-snippet.ts",
) as {
  buildEnvSnippet: (vars: readonly { name: string; value: string }[]) => string;
  isShellLiteral: (value: string) => boolean;
};

const { copyStatusMessage } = nodeRequire("../src/lib/copy-status.ts") as {
  copyStatusMessage: (
    status: "idle" | "copied" | "failed",
    label: string,
  ) => string;
};

const { marqueeItems, SUPPORTED_AGENTS } = nodeRequire(
  "../src/lib/agents.ts",
) as {
  marqueeItems: (agents: readonly string[], reduced: boolean) => MarqueeItem[];
  SUPPORTED_AGENTS: readonly string[];
};

const { config } = nodeRequire("../src/lib/content.ts") as {
  config: { vars: readonly { name: string; value: string; effect: string }[] };
};

type MarqueeItem = { name: string; duplicate: boolean };

/** An assignment a POSIX shell can execute without further quoting. */
const ASSIGNMENT = /^export [A-Za-z_][A-Za-z0-9_]*=[A-Za-z0-9_@%+=:./~-]+$/;

test("isShellLiteral rejects values a shell cannot assign verbatim", () => {
  assert.equal(isShellLiteral("3444"), true);
  assert.equal(isShellLiteral("~/.wrongtrace"), true);
  assert.equal(isShellLiteral("on"), true);
  assert.equal(isShellLiteral("min(NumCPU, 4)"), false);
  assert.equal(isShellLiteral(""), false);
  assert.equal(isShellLiteral("512MB"), true);
});

test("buildEnvSnippet exports literal defaults and comments the rest", () => {
  const snippet = buildEnvSnippet([
    { name: "WRONGTRACE_PORT", value: "3444" },
    { name: "WRONGTRACE_MAX_PROCS", value: "min(NumCPU, 4)" },
    { name: "WRONGTRACE_TOKEN", value: "unset" },
  ]);

  const lines = snippet.split("\n");
  assert.equal(lines[0], "export WRONGTRACE_PORT=3444");
  assert.match(lines[1], /^# WRONGTRACE_MAX_PROCS=min\(NumCPU, 4\)/);
  assert.equal(lines.length, 2, "unset variables are omitted");
  assert.ok(
    !snippet.includes("WRONGTRACE_TOKEN"),
    "a variable that is unset by default is not exported",
  );
});

test("the shipped environment snippet stays runnable in a shell", () => {
  const snippet = buildEnvSnippet(config.vars);

  assert.ok(snippet.length > 0);
  for (const line of snippet.split("\n")) {
    assert.ok(
      line.startsWith("export ") || line.startsWith("# "),
      `unexpected line in the snippet: ${line}`,
    );
    if (line.startsWith("export ")) {
      assert.match(
        line,
        ASSIGNMENT,
        `the snippet contains an assignment a shell cannot run: ${line}`,
      );
    }
  }
  assert.ok(
    !snippet.includes("export WRONGTRACE_MAX_PROCS=min(NumCPU, 4)"),
    "a described default must not be emitted as an assignment",
  );
});

test("copyStatusMessage announces success and failure, and stays silent otherwise", () => {
  assert.equal(copyStatusMessage("idle", "Copy install command"), "");
  assert.match(
    copyStatusMessage("copied", "Copy install command"),
    /^Copy install command: copied to the clipboard\.$/,
  );
  assert.match(
    copyStatusMessage("failed", "Copy install command"),
    /clipboard is unavailable/,
  );
  assert.match(
    copyStatusMessage("failed", "Copy install command"),
    /copy it manually/,
  );
});

test("the agent strip renders the list once when motion is reduced", () => {
  const items = marqueeItems(SUPPORTED_AGENTS, true);

  assert.equal(items.length, SUPPORTED_AGENTS.length);
  assert.equal(items.filter((item) => item.duplicate).length, 0);
  assert.deepEqual(
    items.map((item) => item.name),
    [...SUPPORTED_AGENTS],
  );
});

test("the agent strip duplicates the list but hides the second copy", () => {
  const items = marqueeItems(SUPPORTED_AGENTS, false);

  assert.equal(items.length, SUPPORTED_AGENTS.length * 2);
  const duplicates = items.filter((item) => item.duplicate);
  assert.equal(duplicates.length, SUPPORTED_AGENTS.length);
  assert.deepEqual(
    duplicates.map((item) => item.name),
    [...SUPPORTED_AGENTS],
  );
  assert.equal(
    items.slice(0, SUPPORTED_AGENTS.length).filter((item) => item.duplicate).length,
    0,
    "the first copy stays in the accessibility tree",
  );
});