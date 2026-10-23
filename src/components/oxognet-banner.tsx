import { IconArrowRight } from "@/components/icons";
import { Container } from "@/components/primitives";

/** Large animated OXOGNET studio card placed at the absolute page bottom. */
export function OxognetBanner() {
  return (
    <aside className="oxognet-banner" aria-label="Part of OXOGNET">
      <Container>
        <a className="studio oxognet-studio" href="https://oxog.net" target="_blank" rel="noreferrer noopener">
          <svg viewBox="0 0 200 130" fill="none" aria-hidden="true" className="oxog-mark" data-motion="drawing">
            <path d="M93 56 72 35C49 13 14 24 9 53 3 84 23 104 46 103" stroke="var(--oxog-pink)" strokeWidth="12" />
            <path d="M146 25c24-7 45 10 47 34 3 26-16 46-39 44-14-1-24-11-41-27" stroke="var(--oxog-pink)" strokeWidth="12" />
            <path d="M76 18c30-20 75 1 77 40 1 12-1 24-6 33M53 36c-19 41 14 84 50 79 9-1 16-3 22-7" stroke="var(--oxog-purple)" strokeWidth="15" strokeLinecap="round" />
            <path d="m74 87 54-51" stroke="var(--oxog-pink)" strokeWidth="12" strokeLinecap="square" />
          </svg>
          <div>
            <span className="studio__eyebrow">PART OF A BIGGER PICTURE</span>
            <h2>Small studio. <span>Big ideas.</span></h2>
            <p>Explore the tools and infrastructure from Oxog.</p>
          </div>
          <span className="studio__link">Meet oxog.net <IconArrowRight size={16} /></span>
        </a>
      </Container>
    </aside>
  );
}

export default OxognetBanner;
