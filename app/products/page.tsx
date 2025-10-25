import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { R2Image } from "@/components/ui/r2-image"
import Link from "next/link"
import { Star, Phone, MapPin, Clock, Shield, Truck, Heart } from "lucide-react"
import { products, getProductsByCategory } from "@/lib/data/products"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        {/* Simple Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
          <div className="absolute inset-0">
            <R2Image
              src="/carousel/hero-01.webp"
              alt="绝味产品展示"
              fill
              className="object-cover object-center"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-orange-600/10 to-red-600/20"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-wide">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                  绝味精选产品
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 mb-8 drop-shadow-md">
                  传承经典工艺，精选优质食材
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Link href="#products">浏览产品</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-red-600"
                  >
                    <Link href="/contact">立即订购</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <Tabs defaultValue="all" className="w-full">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">产品分类</h2>
                <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4">
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="seafood">海鲜类</TabsTrigger>
                  <TabsTrigger value="vegetable">蔬菜类</TabsTrigger>
                  <TabsTrigger value="tofu">豆制品</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product, index) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative h-48 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
                          <R2Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-500 animate-grow-rotate"
                          />
                          {product.popular && (
                            <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                              热门推荐
                            </Badge>
                          )}
                          <div className="absolute top-4 right-4 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < product.spicy ? 'text-red-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-primary">{product.price}</div>
                            <div className="text-sm text-muted-foreground">{product.weight}</div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {product.features.map((feature, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              asChild
                              className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                            >
                              <Link href="/contact">立即订购</Link>
                            </Button>
                            <Button variant="outline" size="icon">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seafood" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getProductsByCategory("海鲜类").map((product) => (
                    <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-48 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
                          <R2Image src={product.image} alt={product.name} fill className="object-contain group-hover:scale-110 transition-transform duration-500 animate-grow-rotate"  />
                          {product.popular && <Badge className="absolute top-4 left-4 bg-red-600 text-white">热门推荐</Badge>}
                        </div>
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-bold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">{product.price}</span>
                            <span className="text-sm text-muted-foreground">{product.weight}</span>
                          </div>
                          <Button asChild className="w-full bg-gradient-to-r from-red-600 to-orange-600">
                            <Link href="/contact">立即订购</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tofu" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getProductsByCategory("豆制品").map((product) => (
                    <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-48 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
                          <R2Image src={product.image} alt={product.name} fill className="object-contain group-hover:scale-110 transition-transform duration-500 animate-grow-rotate"  />
                          {product.popular && <Badge className="absolute top-4 left-4 bg-red-600 text-white">热门推荐</Badge>}
                        </div>
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-bold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">{product.price}</span>
                            <span className="text-sm text-muted-foreground">{product.weight}</span>
                          </div>
                          <Button asChild className="w-full bg-gradient-to-r from-red-600 to-orange-600">
                            <Link href="/contact">立即订购</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vegetable" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getProductsByCategory("蔬菜类").map((product) => (
                    <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-48 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
                          <R2Image src={product.image} alt={product.name} fill className="object-contain group-hover:scale-110 transition-transform duration-500 animate-grow-rotate"  />
                          {product.popular && <Badge className="absolute top-4 left-4 bg-red-600 text-white">热门推荐</Badge>}
                        </div>
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-bold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">{product.price}</span>
                            <span className="text-sm text-muted-foreground">{product.weight}</span>
                          </div>
                          <Button asChild className="w-full bg-gradient-to-r from-red-600 to-orange-600">
                            <Link href="/contact">立即订购</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Product Quality Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">为什么选择绝味？</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                我们坚持使用最优质的食材和最严格的制作工艺
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold">食品安全认证</h3>
                <p className="text-muted-foreground">CFIA/FDA/SQF三重认证，确保每一份产品都安全可靠</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">无防腐剂添加</h3>
                <p className="text-muted-foreground">坚持天然制作，不添加任何防腐剂和人工香精</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">新鲜配送</h3>
                <p className="text-muted-foreground">液氮速冻技术，保持产品新鲜度，快速配送到家</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">传统工艺</h3>
                <p className="text-muted-foreground">传承经典制作工艺，每一口都是对美味的极致追求</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">想要订购产品？</h2>
              <p className="text-xl text-muted-foreground mb-8">
                联系我们的专业团队，获取详细的产品信息和订购服务
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    联系我们
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Link href="/partnership" className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    成为合作伙伴
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
