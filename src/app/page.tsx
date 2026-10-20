import { CapabilitiesSection } from "@/components/capabilities";
import { ConfigSection } from "@/components/config-section";
import { CtaSection } from "@/components/cta-section";
import { DashboardSection } from "@/components/dashboard-section";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { InstallSection } from "@/components/install-section";
import { PipelineSection } from "@/components/pipeline";
import { ProblemSection } from "@/components/problem";
import { RunModesSection } from "@/components/run-modes";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <CapabilitiesSection />
      <DashboardSection />
      <PipelineSection />
      <RunModesSection />
      <ConfigSection />
      <InstallSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
