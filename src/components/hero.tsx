import { AgentStrip } from "@/components/agent-strip";
import { HeroPanel } from "@/components/hero-panel";
import { IconArrowRight, IconGithub } from "@/components/icons";
import { InstallCommand } from "@/components/install-command";
import { Action, Container } from "@/components/primitives";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-shell">
      <Container>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow"><span aria-hidden="true" />{hero.kicker}</p>
            <h1 className="hero-title">
              <span>{hero.headline[0]}</span>
              <span className="text-primary">{hero.headline[1]}</span>
            </h1>
            <p className="hero-lede">{hero.lede}</p>
            <div className="hero-actions">
              <Action href={hero.primaryCta.href}>Install WrongTrace <IconArrowRight size={16} /></Action>
              <Action href={hero.secondaryCta.href} variant="ghost"><IconGithub size={16} /> Read the source</Action>
            </div>
            <InstallCommand label="Hero installer" />
            <p className="hero-install-note">One binary. Your machine. No database service.</p>
          </div>
          <div className="hero-product">
            <div className="trace-route" role="group" aria-label="Agent edits become AST nodes and attributed diffs">
              <div><span className="trace-route__glyph">&gt;_</span><strong>Agent</strong><small>tool call</small></div>
              <span className="trace-route__line" aria-hidden="true" />
              <div><span className="trace-route__glyph">{ "{ }" }</span><strong>AST</strong><small>semantic delta</small></div>
              <span className="trace-route__line" aria-hidden="true" />
              <div><span className="trace-route__glyph">+ / −</span><strong>Trace</strong><small>attributed diff</small></div>
            </div>
            <HeroPanel />
            <p className="hero-product__caption"><span>FIG. 01 / CHANGE INSPECTOR</span><span>SELECT A FILE TO EXPLORE ↗</span></p>
          </div>
        </div>
        <ul className="hero-facts">
          {hero.chips.map((chip) => <li key={chip.label}><span>{chip.index}</span><strong>{chip.label}</strong></li>)}
        </ul>
      </Container>
      <AgentStrip />
    </section>
  );
}

export default Hero;
