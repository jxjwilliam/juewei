import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { R2Image } from "@/components/ui/r2-image"
import { getR2Url } from "@/lib/r2/get-r2-url"
import Link from "next/link"
import { Shield, Globe, Truck, Star, ArrowRight, CheckCircle } from "lucide-react"

const advantages = [
  {
    icon: getR2Url("products/icon4.png"),
    title: "本地工厂",
    subtitle: "CFIA / FDA / SQF 认证",
    description: "北美本地生产，严格质量把控，确保每一份产品都符合最高食品安全标准",
    features: ["CFIA认证", "FDA认证", "SQF认证"],
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-50 to-orange-50",
    borderColor: "border-red-200"
  },
  {
    icon: getR2Url("products/icon14.png"),
    title: "全球 16,000+ 门店",
    subtitle: "遍布全球的品牌影响力",
    description: "从中国到北美，我们的品牌足迹遍布全球，为世界各地的消费者带来正宗麻辣美味",
    features: ["全球门店", "品牌影响力", "国际认可"],
    color: "from-blue-500 to-purple-500",
    bgColor: "from-blue-50 to-purple-50",
    borderColor: "border-blue-200"
  },
  {
    icon: getR2Url("products/icon13.png"),
    title: "北美本地供应链",
    subtitle: "快速配送，保证新鲜",
    description: "完善的本地供应链网络，确保产品从生产到餐桌的新鲜度，让您享受最佳口感",
    features: ["本地供应链", "快速配送", "新鲜保证"],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-200"
  },
  {
    icon: getR2Url("products/icon12.png"),
    title: "新鲜安全可靠",
    subtitle: "严格的食品安全标准",
    description: "从原料选择到生产工艺，每一个环节都经过严格把控，为您提供安全可靠的美味体验",
    features: ["严格标准", "安全可靠", "品质保证"],
    color: "from-orange-500 to-yellow-500",
    bgColor: "from-orange-50 to-yellow-50",
    borderColor: "border-orange-200"
  },
]

export function BrandAdvantages() {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary rounded-full animate-pulse"></div>
      </div>

      <div className="container-wide relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            品牌优势
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gradient animate-fade-in text-balance">
            品牌核心优势
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground animate-slide-up text-pretty">
            绝味鸭脖凭借多年的品牌积淀和严格的质量标准，为全球消费者提供安全、新鲜、美味的麻辣食品
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/50 animate-scale-in overflow-hidden hover-lift bg-gradient-to-br ${advantage.bgColor} ${advantage.borderColor}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 lg:p-8 text-center space-y-6 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative">
                  {/* Icon with enhanced styling */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br ${advantage.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <R2Image 
                      src={advantage.icon} 
                      alt={advantage.title}
                      width={48}
                      height={48}
                      className="h-10 w-10 lg:h-12 lg:w-12 object-contain filter brightness-0 invert"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 text-balance">
                        {advantage.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">{advantage.subtitle}</p>
                    </div>
                    
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed text-pretty">
                      {advantage.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {advantage.features.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 lg:p-12 border border-red-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-red-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold">品质保证</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                为什么选择绝味？
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                我们不仅提供美味的麻辣食品，更致力于为每一位消费者带来安全、健康、高品质的用餐体验
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">食品安全</div>
                    <div className="text-sm text-muted-foreground">CFIA/FDA/SQF认证</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">新鲜配送</div>
                    <div className="text-sm text-muted-foreground">本地供应链</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">全球品牌</div>
                    <div className="text-sm text-muted-foreground">16,000+门店</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-8 py-6"
                >
                  <Link href="/products" className="flex items-center gap-2">
                    查看产品
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-6"
                >
                  <Link href="/contact">
                    联系我们
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
