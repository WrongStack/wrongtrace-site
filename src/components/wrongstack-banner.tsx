import { IconArrowRight } from "@/components/icons";
import { Container } from "@/components/primitives";

/** Compact parent-brand strip; deliberately distinct from the OXOG studio card. */
export function WrongStackBanner() {
  return (
    <aside className="wrongstack-banner" aria-label="Part of WrongStack">
      <Container>
        <a
          className="wrongstack-parent"
          href="https://wrongstack.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className="wrongstack-parent__identity">
            <svg
              viewBox="0 0 340 90"
              aria-hidden="true"
              className="wrongstack-parent__mark"
              shapeRendering="crispEdges"
            >
              <path
                fill="#FD9F02"
                d="M0 0h60v60H0zM140 0h60v60h-60zM210 0h60v60h-60zM280 0h60v60h-60z"
              />
              <path fill="#FE2E5F" d="M70 30h60v60H70z" />
            </svg>
            <span>
              <small>PART OF</small>
              <strong>WRONGSTACK</strong>
            </span>
          </span>
          <span className="wrongstack-parent__copy">
            AI coding infrastructure, under your control.
          </span>
          <span className="wrongstack-parent__link">
            wrongstack.com <IconArrowRight size={14} />
          </span>
        </a>
      </Container>
    </aside>
  );
}

export default WrongStackBanner;
