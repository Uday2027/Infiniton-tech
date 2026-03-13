import Hero from "@/components/Hero";
import ParallaxStats from "@/components/ParallaxStats";
import MarqueeText from "@/components/MarqueeText";
import HorizontalScrollServices from "@/components/HorizontalScrollServices";
import StackingCards from "@/components/StackingCards";
import ProjectShowcase from "@/components/ProjectShowcase";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ParallaxStats />
      <MarqueeText />
      <HorizontalScrollServices />
      <StackingCards />
      <ProjectShowcase />
      <CTASection />
    </>
  );
}
