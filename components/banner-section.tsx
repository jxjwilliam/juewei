import { R2Image } from "@/components/ui/r2-image"
import { getR2Url } from "@/lib/r2/get-r2-url"
import { mobileSizes } from "@/lib/design-system/luxury-mobile-images"
import { LuxuryButton } from "@/components/luxury/luxury-button"
import { LuxuryHeading, LuxuryText } from "@/components/luxury/luxury-typography"
import { LuxuryAnimation } from "@/components/luxury/luxury-animations"
import { LuxuryCard } from "@/components/luxury/luxury-card"
import Link from "next/link"
import { MobileContainer, MobileStack } from "@/components/luxury/luxury-mobile-layout"
import { ArrowRight, Star, Shield, Truck } from "lucide-react"

export function BannerSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-luxury-background-primary via-luxury-background-secondary to-luxury-background-primary relative overflow-hidden">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-luxury-accent-copper rounded-full luxury-animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-luxury-accent-gold rounded-full luxury-animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-luxury-spice rounded-full luxury-animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-luxury-accent-copper/30 rounded-full luxury-animate-pulse"></div>
      </div>

      {/* Luxury Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-background-primary/50 via-luxury-background-secondary/30 to-luxury-background-primary/50 backdrop-blur-sm"></div>

      <div className="container-wide relative z-10">
        <MobileContainer>
        <div className="text-center mb-16">
          <LuxuryAnimation animation="fadeIn" delay={0.2}>
            <LuxuryHeading
              level={2}
              variant="display"
              className="mb-6 luxury-text-gradient text-3xl sm:text-4xl"
            >
              想合作经销？成为我们的合作伙伴
            </LuxuryHeading>
          </LuxuryAnimation>
          
          <LuxuryAnimation animation="slideUp" delay={0.4}>
            <LuxuryText
              variant="lead"
              className="text-luxury-text-secondary max-w-3xl mx-auto text-base sm:text-lg"
            >
              绝味品牌，全球16,000+门店，专业团队支持，让您轻松开启麻辣美食事业
            </LuxuryText>
          </LuxuryAnimation>
        </div>

        <LuxuryAnimation animation="slideUp" delay={0.6}>
          <MobileStack gap={6} className="lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-16">
            {/* Luxury Animated Banner */}
            <div className="relative w-full max-w-md lg:max-w-lg group">
              <LuxuryCard
                variant="elevated"
                className="relative overflow-hidden rounded-luxury-lg shadow-luxury-xl group-hover:shadow-luxury-2xl transition-all duration-500 p-0"
              >
                <R2Image
                  src={getR2Url("banners/banner-1.gif")}
                  alt="绝味品牌动画"
                  width={400}
                  height={200}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  priority
                  sizes={mobileSizes('card')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-background-primary/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-accent-copper/10 to-luxury-accent-gold/10"></div>
              </LuxuryCard>
            </div>
            

            {/* Luxury Icon */}
            <div className="flex items-center justify-center group">
              <LuxuryCard
                variant="glass"
                className="relative p-8 rounded-full"
              >
                <R2Image
                  src={getR2Url("products/icon6-150x150.png")}
                  alt="绝味品质保证"
                  width={150}
                  height={150}
                  className="w-24 h-24 lg:w-32 lg:h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                  sizes={mobileSizes('thumb')}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-accent-copper/20 to-luxury-accent-gold/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              </LuxuryCard>
            </div>
          </MobileStack>
        </LuxuryAnimation>

        {/* Luxury Trust Indicators */}
        <LuxuryAnimation animation="stagger" delay={0.8}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <LuxuryCard
              variant="glass"
              className="flex items-center justify-center gap-3 p-6 hover:bg-luxury-background-secondary/70 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-luxury-spice/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-luxury-spice" />
              </div>
              <div className="text-left">
                <LuxuryText variant="body" className="font-semibold text-luxury-text-primary">CFIA认证</LuxuryText>
                <LuxuryText variant="caption" className="text-luxury-text-secondary">食品安全保证</LuxuryText>
              </div>
            </LuxuryCard>
            
            <LuxuryCard
              variant="glass"
              className="flex items-center justify-center gap-3 p-6 hover:bg-luxury-background-secondary/70 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-luxury-accent-copper/20 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-luxury-accent-copper" />
              </div>
              <div className="text-left">
                <LuxuryText variant="body" className="font-semibold text-luxury-text-primary">新鲜配送</LuxuryText>
                <LuxuryText variant="caption" className="text-luxury-text-secondary">本地供应链</LuxuryText>
              </div>
            </LuxuryCard>
            
            <LuxuryCard
              variant="glass"
              className="flex items-center justify-center gap-3 p-6 hover:bg-luxury-background-secondary/70 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-luxury-accent-gold/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-luxury-accent-gold" />
              </div>
              <div className="text-left">
                <LuxuryText variant="body" className="font-semibold text-luxury-text-primary">全球品牌</LuxuryText>
                <LuxuryText variant="caption" className="text-luxury-text-secondary">16,000+门店</LuxuryText>
              </div>
            </LuxuryCard>
          </div>
        </LuxuryAnimation>

        {/* Luxury CTA Button */}
        <LuxuryAnimation animation="slideUp" delay={1.0}>
          <div className="mt-12 text-center">
            <LuxuryButton
              variant="primary"
              size="lg"
              className="luxury-hover"
            >
              <Link href="/contact" className="flex items-center gap-2">
                联系我们
                <ArrowRight className="w-5 h-5" />
              </Link>
            </LuxuryButton>
          </div>
        </LuxuryAnimation>
        </MobileContainer>
      </div>
    </section>
  )
}
