import { CopyButton } from "@/components/copy-button";
import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { config } from "@/lib/content";

/** Builds the shell snippet that exports every variable that has a value. */
function buildEnvSnippet(): string {
  return config.vars
    .filter((entry) => entry.value !== "unset")
    .map((entry) => `export ${entry.name}=${entry.value}`)
    .join("\n");
}

export function ConfigSection() {
  const snippet = buildEnvSnippet();

  return (
    <section id="config" className="py-20 sm:py-24 lg:py-32 bg-surface/40">
      <Container>
        <SectionHead
          label={config.label}
          headline={[config.headline[0], config.headline[1]]}
          emphasis
          sub={config.sub}
        />

        <Reveal>
          <div className="mt-12 rounded-lg border border-line bg-bg">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                Environment
              </span>
              <CopyButton
                value={snippet}
                label="Copy all environment variables"
              />
            </div>

            {config.vars.map((entry) => (
              <div
                key={entry.name}
                className="grid gap-x-8 gap-y-2 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,22rem)_auto_minmax(0,1fr)] sm:items-baseline"
              >
                <code className="font-mono text-sm text-fg break-words">
                  {entry.name}
                </code>
                <code className="font-mono text-sm text-primary tnum">
                  {entry.value}
                </code>
                <p className="text-sm leading-relaxed text-muted">{entry.effect}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default ConfigSection;
