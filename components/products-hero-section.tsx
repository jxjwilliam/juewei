"use client"

import { R2Image } from "@/components/ui/r2-image"
import { mobileSizes } from "@/lib/design-system/luxury-mobile-images"
import { LuxuryButton } from "@/components/luxury/luxury-button"
import { LuxuryHeading, LuxuryText } from "@/components/luxury/luxury-typography"
import { LuxuryAnimation } from "@/components/luxury/luxury-animations"
import { LuxuryCard } from "@/components/luxury/luxury-card"
import Link from "next/link"
import { ArrowRight, Star, MapPin, Clock, Shield } from "lucide-react"

export function ProductsHeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] lg:h-[90vh] xl:h-[95vh] w-full overflow-hidden bg-luxury-background-primary">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-luxury-accent-copper rounded-full luxury-animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-luxury-accent-gold rounded-full luxury-animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-luxury-spice rounded-full luxury-animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-luxury-accent-copper/30 rounded-full luxury-animate-pulse"></div>
      </div>

      {/* Hero Image */}
      <div className="absolute inset-0">
        <R2Image
          src="/images/carousel/hero-01.webp"
          alt="绝味产品展示 - 精选美食系列"
          fill
          className="object-cover object-center"
          sizes={mobileSizes('hero')}
          priority={true}
        />
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-background-primary/60 via-luxury-background-secondary/40 to-luxury-background-primary/60"></div>
      </div>

      {/* Removed floating food elements for cleaner design */}

      {/* Luxury Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Main Content */}
              <LuxuryAnimation animation="slideRight" delay={0.6}>
                <div className="space-y-6 text-luxury-text-primary">
                  {/* Luxury Brand Badge */}
                  <LuxuryAnimation animation="slideUp" delay={0.8}>
                    <LuxuryCard variant="glass" className="inline-flex items-center gap-2 px-4 py-2 rounded-full">
                      <Star className="w-4 h-4 text-luxury-accent-gold fill-current" />
                      <LuxuryText variant="caption" className="font-semibold text-luxury-text-primary">
                        精选产品系列
                      </LuxuryText>
                    </LuxuryCard>
                  </LuxuryAnimation>

                  <LuxuryAnimation animation="slideUp" delay={1.0}>
                    <LuxuryHeading
                      level={1}
                      variant="display"
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-balance drop-shadow-2xl"
                    >
                      <span className="luxury-text-gradient">绝味精选</span>
                      <br />
                      <span className="text-luxury-text-primary">Juewei Premium</span>
                    </LuxuryHeading>
                  </LuxuryAnimation>
                  
                  <LuxuryAnimation animation="slideUp" delay={1.2}>
                    <LuxuryText
                      variant="lead"
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-balance drop-shadow-lg text-luxury-text-secondary"
                    >
                      传承经典工艺，精选优质食材
                    </LuxuryText>
                  </LuxuryAnimation>

                  <LuxuryAnimation animation="slideUp" delay={1.4}>
                    <LuxuryText
                      variant="body"
                      className="text-base text-luxury-text-secondary leading-relaxed max-w-lg"
                    >
                      从海鲜到蔬菜，从豆制品到特色小食，每一款产品都经过精心挑选和严格制作，为您带来最纯正的中式美食体验。
                    </LuxuryText>
                  </LuxuryAnimation>

                  {/* Simplified Product Categories - Removed floating boxes */}

                  {/* Luxury CTA Buttons */}
                  <LuxuryAnimation animation="slideUp" delay={1.8}>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <LuxuryButton
                        asChild
                        variant="primary"
                        size="lg"
                        className="text-base px-6 py-4 font-semibold luxury-hover"
                      >
                        <Link href="/contact" className="flex items-center gap-2">
                          立即订购
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </LuxuryButton>
                      
                      <LuxuryButton
                        asChild
                        variant="outline"
                        size="lg"
                        className="text-base px-6 py-4 font-semibold border-2 border-luxury-accent-copper text-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white"
                      >
                        <Link href="#products">
                          浏览产品
                        </Link>
                      </LuxuryButton>
                    </div>
                  </LuxuryAnimation>

                  {/* Luxury Trust Indicators */}
                  <LuxuryAnimation animation="slideUp" delay={2.0}>
                    <div className="flex flex-wrap gap-6 pt-6 text-sm text-luxury-text-secondary">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-luxury-spice" />
                        <LuxuryText variant="caption">北美本地工厂</LuxuryText>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-luxury-spice" />
                        <LuxuryText variant="caption">新鲜配送</LuxuryText>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-luxury-accent-gold" />
                        <LuxuryText variant="caption">CFIA认证</LuxuryText>
                      </div>
                    </div>
                  </LuxuryAnimation>
                </div>
              </LuxuryAnimation>

              {/* Right Side - Luxury Product Showcase */}
              <LuxuryAnimation animation="slideLeft" delay={0.8}>
                <div className="relative hidden lg:block">
                  <div className="relative w-full h-96">
                    {/* Luxury Main Product Image */}
                    <LuxuryCard variant="glass" className="absolute inset-0 p-8">
                      <LuxuryCard variant="elevated" className="w-full h-full p-6">
                        <R2Image
                          src="/images/carousel/product6.webp"
                          alt="绝味产品展示"
                          fill
                          className="object-contain"
                        />
                      </LuxuryCard>
                    </LuxuryCard>
                    
                    {/* Removed floating product cards for cleaner design */}
                  </div>
                </div>
              </LuxuryAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
