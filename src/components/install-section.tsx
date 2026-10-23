import { CopyButton } from "@/components/copy-button";
import { InstallCommand } from "@/components/install-command";
import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { installSection } from "@/lib/sections-install";

const STEPS = [
  { title: "Verify the binary", command: "wrongtrace --version", note: "Open a new terminal if PATH was updated." },
  { title: "Initialize your repository", command: "wrongtrace init", note: "Adds agent rules, MCP configuration, and git hooks." },
  { title: "Start observing", command: "wrongtrace start", note: "Open localhost:3444 to explore the dashboard." },
] as const;

export function InstallSection() {
  return (
    <section id="install" className="section-space border-t border-line">
      <Container>
        <SectionHead label={installSection.label} headline={installSection.headline} emphasis sub={installSection.sub} />
        <Reveal className="install-layout">
          <div>
            <p className="section-head__detail mb-4">01 / CHOOSE YOUR PLATFORM</p>
            <InstallCommand label="Installation section" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              No Go toolchain required. The scripts install the published binary
              to <code>~/.local/bin</code> on macOS/Linux, or your local
              application directory on Windows, then configure your PATH.
            </p>
            <p className="mt-3 text-sm text-muted">Next time: <code className="text-fg">wrongtrace update</code>.</p>
          </div>
          <ol className="install-steps">
            {STEPS.map((step, index) => (
              <li key={step.command}>
                <span className="install-steps__number">0{index + 2}</span>
                <div>
                  <h3>{step.title}</h3>
                  <div className="install-steps__command"><code>{step.command}</code><CopyButton value={step.command} label={`Copy ${step.command}`} /></div>
                  <p>{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}

export default InstallSection;
