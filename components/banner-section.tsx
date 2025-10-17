import { R2Image } from "@/components/ui/r2-image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Star, Shield, Truck } from "lucide-react"

export function BannerSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary rounded-full animate-pulse"></div>
      </div>

      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gradient animate-fade-in text-balance">
            想合作经销？成为我们的合作伙伴
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground animate-slide-up text-pretty">
            绝味品牌，全球16,000+门店，专业团队支持，让您轻松开启麻辣美食事业
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Animated Banner */}
          <div className="relative w-full max-w-md lg:max-w-lg group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <R2Image
                src="/images/banners/banner-1.gif"
                alt="绝味品牌动画"
                width={400}
                height={200}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          

          {/* Icon */}
          <div className="flex items-center justify-center group">
            <div className="relative">
              <R2Image
                src="/images/products/icon6-150x150.png"
                alt="绝味品质保证"
                width={150}
                height={150}
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">CFIA认证</div>
              <div className="text-sm text-muted-foreground">食品安全保证</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">新鲜配送</div>
              <div className="text-sm text-muted-foreground">本地供应链</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">全球品牌</div>
              <div className="text-sm text-muted-foreground">16,000+门店</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-8 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-2">
              联系我们
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
