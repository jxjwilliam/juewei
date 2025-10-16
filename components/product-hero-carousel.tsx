"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, MapPin, Clock, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"
import { getCarouselSlides } from "@/lib/data/products"

const productCarouselSlides = getCarouselSlides()

export function ProductHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productCarouselSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + productCarouselSlides.length) % productCarouselSlides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % productCarouselSlides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative h-[85vh] min-h-[600px] lg:h-[90vh] xl:h-[95vh] w-full overflow-hidden bg-muted">
      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {productCarouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
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
        <Image 
          src={productCarouselSlides[currentSlide].floatingImage || "/carousel2/product6.webp"} 
          alt={productCarouselSlides[currentSlide].floatingImageAlt || "产品展示"} 
          fill 
          className="object-contain" 
        />
      </div>
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-15 animate-pulse">
        <Image src="/carousel2/spicy-lobster6.webp" alt="麻辣龙虾" fill className="object-contain" />
      </div>

      {/* Hero Content - Dynamic based on current slide */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Main Content */}
              <div className="space-y-6 text-white animate-fade-in">
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{productCarouselSlides[currentSlide].badge || "热门推荐"}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-balance drop-shadow-2xl">
                  <span className="text-gradient-warm">{productCarouselSlides[currentSlide].title || productCarouselSlides[currentSlide].name}</span>
                  <br />
                  <span className="text-white">{productCarouselSlides[currentSlide].subtitle || productCarouselSlides[currentSlide].nameEn}</span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-balance drop-shadow-lg text-orange-100/90">
                  {productCarouselSlides[currentSlide].description}
                </p>

                <p className="text-base text-white/80 leading-relaxed max-w-lg">
                  {productCarouselSlides[currentSlide].content || productCarouselSlides[currentSlide].description}
                </p>

                {/* Product Specifications */}
                {productCarouselSlides[currentSlide].specifications && (
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="text-xs text-white/70">净含量</div>
                      <div className="text-lg font-bold text-white">{productCarouselSlides[currentSlide].specifications.weight}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="text-xs text-white/70">包装方式</div>
                      <div className="text-lg font-bold text-white">{productCarouselSlides[currentSlide].specifications.packaging}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="text-xs text-white/70">保质期</div>
                      <div className="text-lg font-bold text-white">{productCarouselSlides[currentSlide].specifications.shelfLife}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="text-xs text-white/70">储存温度</div>
                      <div className="text-lg font-bold text-white">{productCarouselSlides[currentSlide].specifications.storage}</div>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="text-base px-6 py-4 font-semibold shine-effect shadow-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-glow focus-ring bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Link href={productCarouselSlides[currentSlide].ctaLink || "/contact"} className="flex items-center gap-2">
                      {productCarouselSlides[currentSlide].cta || "立即订购"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-base px-6 py-4 font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus-ring"
                  >
                    <Link href={productCarouselSlides[currentSlide].ctaSecondaryLink || "/products"}>
                      {productCarouselSlides[currentSlide].ctaSecondary || "了解更多"}
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 pt-6 text-sm text-white/70">
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
                      <Image
                        src={productCarouselSlides[currentSlide].floatingImage || "/carousel2/product6.webp"}
                        alt={`${productCarouselSlides[currentSlide].title || productCarouselSlides[currentSlide].name}产品展示`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Product Cards */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-xl shadow-lg p-2 animate-bounce-in">
                    <Image src="/carousel2/product6.webp" alt="产品" fill className="object-contain" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-lg shadow-lg p-2 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                    <Image src="/carousel2/branch2.webp" alt="产品展示" fill className="object-contain" />
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
          {productCarouselSlides.map((_, index) => (
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
