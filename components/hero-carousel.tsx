"use client"

import { Button } from "@/components/ui/button"
import { R2Image } from "@/components/ui/r2-image"
import Link from "next/link"
import { ArrowRight, Star, MapPin, Clock, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"

const carouselSlides = [
  {
    id: 1,
    image: "/carousel1/duck-kidney-7.webp",
    title: "麻辣鸭脖",
    subtitle: "Spicy Duck Neck",
    description: "传统工艺制作",
    content: "麻辣鲜香，回味无穷。采用传统工艺，每一口都是对美味的极致追求。",
    cta: "立即订购",
    ctaLink: "/contact",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/products",
    floatingImage: "/carousel1/product6.webp",
    floatingImageAlt: "产品展示",
    badge: "CFIA认证"
  },
  {
    id: 2,
    image: "/carousel1/spicy-lobster6.webp",
    title: "麻辣龙虾",
    subtitle: "Spicy Lobster",
    description: "精选优质龙虾",
    content: "麻辣鲜香，回味无穷。采用传统工艺，每一口都是对美味的极致追求。",
    cta: "查看菜单",
    ctaLink: "/products",
    ctaSecondary: "联系我们",
    ctaSecondaryLink: "/contact",
    floatingImage: "/carousel1/branch2.webp",
    floatingImageAlt: "产品展示",
    badge: "CFIA认证"
  },
  {
    id: 3,
    image: "/carousel1/hero-01.webp",
    title: "绝味",
    subtitle: "JUEWEI",
    description: "麻辣鲜香 · 唇齿留香",
    content: "北美本地工厂生产，CFIA/FDA/SQF认证，新鲜安全可靠，让您在家也能享受正宗麻辣美味。",
    cta: "探索产品",
    ctaLink: "/products",
    ctaSecondary: "成为合作伙伴",
    ctaSecondaryLink: "/partnership",
    floatingImage: "/carousel1/spicy-shrimp-balls.webp",
    floatingImageAlt: "麻辣虾球",
    badge: "全球 16,000+ 门店"
  },
  {
    id: 4,
    image: "/carousel1/spicy-shrimp-balls.webp",
    title: "麻辣虾球",
    subtitle: "Spicy Shrimp Balls",
    description: "精选湖北潜江小龙虾尾",
    content: "浓郁鲜香，Q弹劲爽！液氮速冻技术，解冻即食，无防腐剂添加，让您享受最新鲜的美味。",
    cta: "立即订购",
    ctaLink: "/contact",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/products",
    floatingImage: "/carousel1/duck-kidney-7.webp",
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
    <section className="relative h-[85vh] min-h-[600px] lg:h-[90vh] xl:h-[95vh] w-full overflow-hidden bg-muted">
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
          </div>
        ))}
      </div>

      {/* Floating Food Elements - Dynamic based on current slide */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-20 animate-bounce">
        <R2Image src={carouselSlides[currentSlide].floatingImage} alt={carouselSlides[currentSlide].floatingImageAlt} fill className="object-contain" />
      </div>
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-15 animate-pulse">
        <R2Image src="/carousel1/spicy-lobster6.webp" alt="麻辣龙虾" fill className="object-contain" />
      </div>
      

      {/* Hero Content - Dynamic based on current slide */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Main Content */}
              <div className="space-y-8 text-white animate-fade-in">
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{carouselSlides[currentSlide].badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-balance drop-shadow-2xl">
                  <span className="text-gradient-warm">{carouselSlides[currentSlide].title}</span>
                  <br />
                  <span className="text-white">{carouselSlides[currentSlide].subtitle}</span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-balance drop-shadow-lg text-orange-100/90">
                  {carouselSlides[currentSlide].description}
                </p>

                <p className="text-base text-white/80 leading-relaxed max-w-lg">
                  {carouselSlides[currentSlide].content}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="text-base px-6 py-4 font-semibold shine-effect shadow-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-glow focus-ring bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Link href={carouselSlides[currentSlide].ctaLink} className="flex items-center gap-2">
                      {carouselSlides[currentSlide].cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-base px-6 py-4 font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus-ring"
                  >
                    <Link href={carouselSlides[currentSlide].ctaSecondaryLink}>
                      {carouselSlides[currentSlide].ctaSecondary}
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 pt-8 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>北美本地工厂</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>新鲜配送</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>CFIA认证</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Product Showcase */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-96">
                  {/* Main Product Image */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <div className="w-full h-full bg-white rounded-2xl p-6 shadow-2xl">
                      <R2Image
                        src={carouselSlides[currentSlide].floatingImage}
                        alt={`${carouselSlides[currentSlide].title}产品展示`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Product Cards */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-xl shadow-lg p-2 animate-bounce-in">
                    <R2Image src="/carousel1/product6.webp" alt="产品" fill className="object-contain" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-lg shadow-lg p-2 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                    <R2Image src="/carousel1/branch2.webp" alt="产品展示" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-100 ease-linear"
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
