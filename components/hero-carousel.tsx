"use client"

import { R2Image } from "@/components/ui/r2-image"
import { LuxuryButton } from "@/components/luxury/luxury-button"
import { LuxuryHeading, LuxuryText } from "@/components/luxury/luxury-typography"
import { LuxuryAnimation } from "@/components/luxury/luxury-animations"
import { LuxuryCard } from "@/components/luxury/luxury-card"
import { getR2Url } from "@/lib/r2/get-r2-url"
import Link from "next/link"
import { ArrowRight, Star, MapPin, Clock, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"

const carouselSlides = [
  {
    id: 1,
    image: getR2Url("carousel/duck-kidney-7.webp"),
    title: "麻辣鸭脖",
    subtitle: "Spicy Duck Neck",
    description: "传统工艺制作",
    content: "麻辣鲜香，回味无穷。采用传统工艺，每一口都是对美味的极致追求。",
    cta: "立即订购",
    ctaLink: "/contact",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/products",
    floatingImage: getR2Url("carousel/product6.webp"),
    floatingImageAlt: "产品展示",
    badge: "CFIA认证"
  },
  {
    id: 2,
    image: getR2Url("carousel/spicy-lobster6.webp"),
    title: "麻辣龙虾",
    subtitle: "Spicy Lobster",
    description: "精选优质龙虾",
    content: "麻辣鲜香，回味无穷。采用传统工艺，每一口都是对美味的极致追求。",
    cta: "查看菜单",
    ctaLink: "/products",
    ctaSecondary: "联系我们",
    ctaSecondaryLink: "/contact",
    floatingImage: getR2Url("carousel/branch2.webp"),
    floatingImageAlt: "产品展示",
    badge: "CFIA认证"
  },
  {
    id: 3,
    image: getR2Url("carousel/hero-01.webp"),
    title: "绝味",
    subtitle: "JUEWEI",
    description: "麻辣鲜香 · 唇齿留香",
    content: "北美本地工厂生产，CFIA/FDA/SQF认证，新鲜安全可靠，让您在家也能享受正宗麻辣美味。",
    cta: "探索产品",
    ctaLink: "/products",
    ctaSecondary: "成为合作伙伴",
    ctaSecondaryLink: "/partnership",
    floatingImage: getR2Url("carousel/spicy-shrimp-balls.webp"),
    floatingImageAlt: "麻辣虾球",
    badge: "全球 16,000+ 门店"
  },
  {
    id: 4,
    image: getR2Url("carousel/spicy-shrimp-balls.webp"),
    title: "麻辣虾球",
    subtitle: "Spicy Shrimp Balls",
    description: "精选湖北潜江小龙虾尾",
    content: "浓郁鲜香，Q弹劲爽！液氮速冻技术，解冻即食，无防腐剂添加，让您享受最新鲜的美味。",
    cta: "立即订购",
    ctaLink: "/contact",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/products",
    floatingImage: getR2Url("carousel/duck-kidney-7.webp"),
    floatingImageAlt: "麻辣鸭脖",
    badge: "热门推荐"
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative h-[85vh] min-h-[600px] lg:h-[90vh] xl:h-[95vh] w-full overflow-hidden bg-luxury-background-primary">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-luxury-accent-copper rounded-full luxury-animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-luxury-accent-gold rounded-full luxury-animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-luxury-spice rounded-full luxury-animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-luxury-accent-copper/30 rounded-full luxury-animate-pulse"></div>
      </div>

      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <R2Image
              src={slide.image}
              alt={`${slide.title} 产品展示`}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            {/* Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-background-primary/60 via-luxury-background-secondary/40 to-luxury-background-primary/60"></div>
          </div>
        ))}
      </div>

      {/* Luxury Floating Food Elements - Dynamic based on current slide */}
      <LuxuryAnimation animation="slideUp" delay={0.2}>
        <div className="absolute top-20 right-10 w-32 h-32 opacity-30 luxury-animate-bounce">
          <LuxuryCard variant="glass" className="p-4">
            <R2Image src={carouselSlides[currentSlide].floatingImage} alt={carouselSlides[currentSlide].floatingImageAlt} fill className="object-contain" />
          </LuxuryCard>
        </div>
      </LuxuryAnimation>
      
      <LuxuryAnimation animation="slideUp" delay={0.4}>
        <div className="absolute bottom-20 left-10 w-24 h-24 opacity-25 luxury-animate-pulse">
          <LuxuryCard variant="glass" className="p-3">
            <R2Image src={getR2Url("carousel/spicy-lobster6.webp")} alt="麻辣龙虾" fill className="object-contain" />
          </LuxuryCard>
        </div>
      </LuxuryAnimation>
      

      {/* Luxury Hero Content - Dynamic based on current slide */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Main Content */}
              <LuxuryAnimation animation="slideRight" delay={0.6}>
                <div className="space-y-8 text-luxury-text-primary">
                  {/* Luxury Brand Badge */}
                  <LuxuryAnimation animation="slideUp" delay={0.8}>
                    <LuxuryCard variant="glass" className="inline-flex items-center gap-2 px-4 py-2 rounded-full">
                      <Star className="w-4 h-4 text-luxury-accent-gold fill-current" />
                      <LuxuryText variant="caption" className="font-semibold text-luxury-text-primary">
                        {carouselSlides[currentSlide].badge}
                      </LuxuryText>
                    </LuxuryCard>
                  </LuxuryAnimation>

                  <LuxuryAnimation animation="slideUp" delay={1.0}>
                    <LuxuryHeading
                      level={1}
                      variant="display"
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-balance drop-shadow-2xl"
                    >
                      <span className="text-luxury-text-primary">{carouselSlides[currentSlide].title}</span>
                      <br />
                      <span className="text-luxury-text-primary">{carouselSlides[currentSlide].subtitle}</span>
                    </LuxuryHeading>
                  </LuxuryAnimation>
                  
                  <LuxuryAnimation animation="slideUp" delay={1.2}>
                    <LuxuryText
                      variant="lead"
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-balance drop-shadow-lg text-luxury-text-secondary"
                    >
                      {carouselSlides[currentSlide].description}
                    </LuxuryText>
                  </LuxuryAnimation>

                  <LuxuryAnimation animation="slideUp" delay={1.4}>
                    <LuxuryText
                      variant="body"
                      className="text-base text-luxury-text-secondary leading-relaxed max-w-lg"
                    >
                      {carouselSlides[currentSlide].content}
                    </LuxuryText>
                  </LuxuryAnimation>

                  {/* Luxury CTA Buttons */}
                  <LuxuryAnimation animation="slideUp" delay={1.6}>
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Link href={carouselSlides[currentSlide].ctaLink} className="flex items-center gap-2">
                        <LuxuryButton
                          variant="primary"
                          size="lg"
                          className="text-base px-6 py-4 font-semibold luxury-hover"
                        >
                          {carouselSlides[currentSlide].cta}
                          <ArrowRight className="w-4 h-4" />
                        </LuxuryButton>
                      </Link>
                      
                      <Link href={carouselSlides[currentSlide].ctaSecondaryLink}>
                        <LuxuryButton
                          variant="outline"
                          size="lg"
                          className="text-base px-6 py-4 font-semibold border-2 border-luxury-accent-copper text-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white"
                        >
                          {carouselSlides[currentSlide].ctaSecondary}
                        </LuxuryButton>
                      </Link>
                    </div>
                  </LuxuryAnimation>

                  {/* Luxury Trust Indicators */}
                  <LuxuryAnimation animation="slideUp" delay={1.8}>
                    <div className="flex flex-wrap gap-6 pt-8 text-sm text-luxury-text-secondary">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-luxury-spice" />
                        <LuxuryText variant="caption">北美本地工厂</LuxuryText>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-luxury-spice" />
                        <LuxuryText variant="caption">新鲜配送</LuxuryText>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-luxury-accent-gold" />
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
                          src={carouselSlides[currentSlide].floatingImage}
                          alt={`${carouselSlides[currentSlide].title}产品展示`}
                          fill
                          className="object-contain"
                        />
                      </LuxuryCard>
                    </LuxuryCard>
                    
                    {/* Luxury Floating Product Cards */}
                    <LuxuryAnimation animation="scale" delay={1.0}>
                      <LuxuryCard variant="glass" className="absolute -top-4 -right-4 w-20 h-20 p-2 luxury-animate-bounce">
                         <R2Image src={getR2Url("carousel/product6.webp")} alt="产品" fill className="object-contain" />
                      </LuxuryCard>
                    </LuxuryAnimation>
                    
                    <LuxuryAnimation animation="scale" delay={1.2}>
                      <LuxuryCard variant="glass" className="absolute -bottom-4 -left-4 w-16 h-16 p-2 luxury-animate-bounce">
                         <R2Image src={getR2Url("carousel/branch2.webp")} alt="产品展示" fill className="object-contain" />
                      </LuxuryCard>
                    </LuxuryAnimation>
                  </div>
                </div>
              </LuxuryAnimation>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Navigation Controls */}
      <LuxuryAnimation animation="slideUp" delay={2.0}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          {/* Luxury Play/Pause Button */}
          <LuxuryCard variant="glass" className="p-0">
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 bg-luxury-background-secondary/20 backdrop-blur-sm border border-luxury-accent-copper/30 rounded-full flex items-center justify-center text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper/50"
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </LuxuryCard>

          {/* Luxury Slide Indicators */}
          <LuxuryCard variant="glass" className="p-2">
            <div className="flex gap-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper/50 ${
                    index === currentSlide
                      ? 'bg-luxury-accent-copper scale-125'
                      : 'bg-luxury-text-secondary/50 hover:bg-luxury-text-secondary'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </LuxuryCard>

          {/* Luxury Navigation Arrows */}
          <div className="flex gap-2">
            <LuxuryCard variant="glass" className="p-0">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 bg-luxury-background-secondary/20 backdrop-blur-sm border border-luxury-accent-copper/30 rounded-full flex items-center justify-center text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper/50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </LuxuryCard>
            
            <LuxuryCard variant="glass" className="p-0">
              <button
                onClick={goToNext}
                className="w-12 h-12 bg-luxury-background-secondary/20 backdrop-blur-sm border border-luxury-accent-copper/30 rounded-full flex items-center justify-center text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper/50"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </LuxuryCard>
          </div>
        </div>
      </LuxuryAnimation>

      {/* Luxury Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-luxury-background-secondary/20">
        <div 
          className="h-full bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold transition-all duration-100 ease-linear"
          style={{ 
            width: isPlaying ? '100%' : '0%',
            animation: isPlaying ? 'progress 5s linear infinite' : 'none'
          }}
        />
      </div>

      {/* Keyboard Navigation Support */}
      <div 
        className="absolute inset-0 focus:outline-none" 
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') goToPrevious()
          if (e.key === 'ArrowRight') goToNext()
          if (e.key === ' ') {
            e.preventDefault()
            togglePlayPause()
          }
        }}
        aria-label="Carousel navigation"
      />

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
