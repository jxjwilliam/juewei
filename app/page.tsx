import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { CertificationsSection } from "@/components/certifications-section"
import { BrandAdvantages } from "@/components/brand-advantages"
import { BannerSection } from "@/components/banner-section"
import { FourElements } from "@/components/four-elements"
import { PartnershipCTA } from "@/components/partnership-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-luxury-background-primary">
      <Header />
      <main className="relative">
        <HeroCarousel />
        <CertificationsSection />
        <BrandAdvantages />
        <BannerSection />
        <FourElements />
        <PartnershipCTA />
      </main>
      <Footer />
    </div>
  )
}
