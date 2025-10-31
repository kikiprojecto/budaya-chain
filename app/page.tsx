import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedArtisans } from "@/components/home/featured-artisans"
import { CTASection } from "@/components/home/cta-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <FeaturedArtisans />
      <CTASection />
    </>
  )
}
