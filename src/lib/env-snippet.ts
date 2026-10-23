/**
 * The POSIX shell snippet behind the "copy all environment variables" button
 * on the configuration section.
 *
 * A documented default is not always a value a shell can be given. The
 * default for WRONGTRACE_MAX_PROCS is `min(NumCPU, 4)`: that describes how
 * the daemon derives the ceiling, it is not something a user can assign.
 * Emitting it as `export WRONGTRACE_MAX_PROCS=min(NumCPU, 4)` produces a
 * snippet that fails the moment it is pasted into a shell, so a default that
 * is not a literal is written as a comment instead.
 */

export type EnvVar = {
  readonly name: string;
  readonly value: string;
};

/**
 * Characters a POSIX shell accepts verbatim in an unquoted assignment:
 * no whitespace, no quoting, no command substitution. Tilde is allowed
 * because the shell expands it in an assignment.
 */
const SHELL_LITERAL = /^[A-Za-z0-9_@%+=:./~-]+$/;

/** True when `value` can be assigned as-is by a POSIX shell. */
export function isShellLiteral(value: string): boolean {
  return value.length > 0 && SHELL_LITERAL.test(value);
}

/**
 * Builds the copyable environment snippet.
 *
 * Variables the daemon leaves unset by default are omitted; variables whose
 * default is a literal are exported; variables whose default is only a
 * description are emitted as a comment so the snippet stays runnable.
 */
export function buildEnvSnippet(vars: readonly EnvVar[]): string {
  return vars
    .filter((entry) => entry.value !== "unset")
    .map((entry) =>
      isShellLiteral(entry.value)
        ? `export ${entry.name}=${entry.value}`
        : `# ${entry.name}=${entry.value} (default; set an explicit value to override)`,
    )
    .join("\n");
}