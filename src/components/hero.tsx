import { AgentStrip } from "@/components/agent-strip";
import { CopyButton } from "@/components/copy-button";
import { HeroPanel } from "@/components/hero-panel";
import { IconArrowRight, IconGithub } from "@/components/icons";
import { Action, Container } from "@/components/primitives";
import { hero, product } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-18 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-bg mask-fade-b"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line-strong"
      />

      <Container className="relative">
        <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
          {hero.kicker}
        </p>

        <p className="mt-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          {hero.eyebrow}
        </p>

        <h1 className="mt-7 max-w-5xl text-display leading-[1.02] font-semibold tracking-tight text-balance text-fg">
          <span className="block">{hero.headline[0]}</span>{" "}
          <span className="block italic">
            {hero.headline[1]}
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.78em] w-[0.42em] translate-y-[0.06em] bg-primary align-baseline animate-pulse"
            />
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lede leading-relaxed text-pretty text-muted">
          {hero.lede}
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-md border border-line bg-code px-4 py-3">
            <span aria-hidden="true" className="font-mono text-sm text-primary">
              $
            </span>
            <code className="font-mono text-sm text-fg break-all">
              {product.install}
            </code>
            <CopyButton
              value={product.install}
              label="Copy install command"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Action href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <IconArrowRight size={16} />
            </Action>
            <Action href={hero.secondaryCta.href} variant="ghost">
              <IconGithub size={16} />
              {hero.secondaryCta.label}
            </Action>
          </div>
        </div>

        <ul className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          {hero.chips.map((chip) => (
            <li key={chip.label} className="flex items-center gap-2">
              <span className="text-primary">{chip.index}</span>
              <span>{chip.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 lg:mt-20">
          <HeroPanel />
        </div>
      </Container>

      <div className="mt-16 lg:mt-24">
        <AgentStrip />
      </div>
    </section>
  );
}

export default Hero;
