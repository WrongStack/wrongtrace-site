import { CapabilitiesSection } from "@/components/capabilities";
import { ComparisonSection } from "@/components/comparison-section";
import { ConfigSection } from "@/components/config-section";
import { CtaSection } from "@/components/cta-section";
import { DashboardSection } from "@/components/dashboard-section";
import { FaqSection } from "@/components/faq-section";
import { FinePrintSection } from "@/components/fine-print-section";
import { Hero } from "@/components/hero";
import { InstallSection } from "@/components/install-section";
import { MetricStrip } from "@/components/metric-strip";
import { PipelineSection } from "@/components/pipeline";
import { ProblemSection } from "@/components/problem";
import { RunModesSection } from "@/components/run-modes";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <MetricStrip />
      <CapabilitiesSection />
      <DashboardSection />
      <PipelineSection />
      <ComparisonSection />
      <FinePrintSection />
      <RunModesSection />
      <ConfigSection />
      <InstallSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
