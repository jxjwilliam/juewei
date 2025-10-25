import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { R2Image } from "@/components/ui/r2-image"
import { getR2Url } from "@/lib/r2/get-r2-url"

// Custom SVG icons matching the reference site
const BusinessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-14 h-14">
    <path fill="#E7211B" d="M74.1,59.5c-3.2,2.1-7.1-2.7-2.3-5.1c1.9-1,4.6-1.3,7.3-3c9.2-5.9,3.4-13.9,10.9-21.5c-2.6-1.4-5.4-0.8-7.3,1.8c-2.6,3.4-4.8,4-4.8,4c1.2-14.1,9.9-21,9.9-21C84.7,13.5,76.4,13.1,72,17c-4.4,3.8-4.3,11.3-7,14.4c-3.1,3.6-6.5-0.2-3.5-3c5.7-5.4,3.3-13.7,3.3-13.7c-6.4,6-13.2,3-20.5,3l0,0l0,0l0,0l0,0C25.3,17.6,10,33,10,51.9c0,18.9,15.3,34.3,34.3,34.3c11.9,0,22.5-6.1,28.6-15.4l-0.2-0.3l0.2,0.3c7.3-12.6,11.4-12.8,11.4-12.8C81.2,56.7,78.6,56.6,74.1,59.5z"/>
    <g>
      <path fill="#FFFFFF" d="M38,61.7c-0.2,0-0.5,0.4-0.9,1c-4.7,5.7-7.5,8.6-8.5,8.9c-0.5,0.1-0.9-0.1-1.2-0.7c-0.2-0.5-0.5-0.7-1-0.6c-0.2,0.1-0.4,0.2-0.6,0.4l0,0c0,0,0,0.1,0,0.1c-0.1,0.1-0.1,0.2-0.2,0.4c0,0,0,0,0,0c0,0.1-0.1,0.2-0.1,0.2c-0.5,1.1-0.6,2.3-0.3,3.5c0,0,0.1,0.3,0.1,0.3c0.7,2.1,2.9,3.4,5.1,2.8c2.1-0.6,3.9-2.4,6-6.8c2.2-4.8,3.4-7.6,3.1-8.8C39.4,61.8,38.8,61.5,38,61.7"/>
      <path fill="#FFFFFF" d="M36,51.6c-0.3,0.1-0.5,0.2-0.6,0.4c-0.2,0.2-0.5,0.7-0.9,1.6c-2.3,4.1-4.2,6.8-5.3,7.3c-0.1,0-0.2,0.1-0.2,0.1c-0.6,0.2-1.2-0.2-1.4-0.8c-0.1-0.3,0-0.5,0.1-0.8c0.1-0.2,0.2-0.5,0.5-0.9c7.6-10.4,7.4-17.9,6.5-21.2c-0.7-2.7-3.5-4.3-6.2-3.6c0,0,0,0,0,0c0,0,0,0-0.1,0c-1.4,0.4-2.9,1.8-4.4,4.2c-0.3,0.7-0.6,1.1-0.8,1.2c-0.3,0.1-0.6-0.1-1-0.6c-1.3-1.1-2.6-1.6-4-1.4c0.5,0-0.3,0-0.7,0.2c-0.8,0.4-1.2,1.2-1,2.1c0,0.1,0.1,0.2,0.1,0.3c0,0.1,0.1,0.2,0.1,0.2c0.1,0.1,0.2,0.3,0.3,0.4c0.3,0.5,0.5,0.9,0.6,1.1c0.3,1.2,0.5,2.8,0.4,4.6c0,1.6,0.2,3,0.5,4.3c0.2,0.6,0.4,1.1,0.6,1.6c0.1,0.3,0.3,0.5,0.5,0.7c0,0,0,0,0.1,0c0,0,0,0,0,0c0.6,0.6,1.4,0.7,2.4,0.5c0.4-0.1,0.7-0.3,1-0.7c0.1-0.1,0.2-0.2,0.2-0.3c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0.3-0.5,0.6-1.2,0.8-2c1.7-6.3,3.3-9.8,4.3-11c0.1-0.2,0.3-0.3,0.5-0.4c0.5-0.1,1,0.2,1.2,0.7c0.1,0.2,0,0.4-0.1,0.7c-0.2,0.7-0.9,2.5-2.4,6c-3.1,7.2-5.2,11-5.7,13.9c-0.1,0.8-0.1,1.6,0.1,2.4c0.9,3.2,4.1,5,7.3,4.2c0.7-0.2,1.8-0.7,2.3-1.1c3.8-2.9,5.8-7.8,5.5-12.8l0,0c0,0,0-0.3,0-0.4C37.2,51.8,36.5,51.5,36,51.6"/>
      <path fill="#FFFFFF" d="M62.5,55.5c1.9-0.6,2.7-1.3,2.4-2.2c-0.2-0.7-0.9-1.2-2.1-1.6c0.1-0.1,0.1-0.3,0.1-0.4c0.4-1.7,0.1-4.3-0.8-7.7c-0.5-1.7-1.7-3.4-4.3-4.2c-2-0.7-3.8-0.8-6.2,0.1c1.4-1.5,2.6-3.9,2-6.8c-0.6-2.8-4-4.3-4-4.3s0,2.4-1,3.3c0,0-1.9-5-7.2-5.7c0,0,1.6,2.5,0,5.8c-2.3,4.8-7.8,7.8,0.7,13.2c-0.5,0.3-0.9,0.5-1.3,0.7c-0.9-0.2-2.1-0.2-3.3,0.2c-0.4,0.1-0.7,0.2-0.9,0.3c-0.2,0.1-0.4,0.3-0.6,0.5C36,46.9,35.9,47,35.9,47c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.1,0.3c0,0,0,0,0,0.1c0,0.1,0,0.1,0,0.2c0,0.2,0,0.5,0,0.8c0.1,0.4,0.4,0.8,0.8,1c0.3,0.2,0.8,0.8,1,1.5c0.5,1.8,1,3.9,1.6,6.3c0.7,2.8,1.2,5,1.7,6.7c0,0.1,0.1,0.2,0.1,0.3c1.7,5.1,6.5,8.4,11.6,8.2c0.4,0,0.9-0.1,1.3-0.1c1-0.1,2-0.3,3-0.6c4.6-1.2,7.9-2.9,9.9-4.9c1.8-1.8,2.5-3.5,2-5c-0.3-1.2-1.7-2.8-4.1-4.6C63.8,56.5,63.1,56,62.5,55.5 M55.6,46.2c0.4,1.3,1,5.7,1,5.7l-2.4,0.9l-1.6-6c-0.1-0.5-0.4-1-0.7-1.4l1.3-1.3C54.3,44,55.2,44.7,55.6,46.2 M44.7,39.9c2.3-2.8,1.1-5,1.1-5s4.2,0.3,3.4,5.8c-0.1,0.1-0.2,0.1-0.3,0.2c-1.2,0.7-3.7,2.4-5.9,3.8C42.9,43.5,43.1,41.9,44.7,39.9 M47.4,49.2l1.7,6.2c-1.6,0.8-2.7,1.4-3.5,1.8c-0.2-0.7-0.3-1.5-0.5-2.4c-0.4-2-0.7-3.5-0.9-4.8c0.4-0.2,1.9-1.4,2-1.4c0.1,0,0.1-0.1,0.2-0.1C46.8,48.4,47.3,48.7,47.4,49.2 M61.1,62.9c-1.4,1.2-3.3,2.1-5.9,2.8c-1.9,0.5-3.4,0.7-4.6,0.7c-1.5-0.3-2.9-1.3-3.6-2.8c0-0.1-0.1-0.2-0.1-0.3l-0.5-1.8c0.6-0.1,1.3-0.2,2.1-0.4c1.3-0.3,3.1-1.1,5.3-2.2c2.4-1.1,4.9-2.1,7.4-3c0.7,0.8,1.3,1.9,1.6,3.2C63.2,60.3,62.6,61.6,61.1,62.9"/>
    </g>
  </svg>
)

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-600 to-red-700 text-white py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold">关于绝味</h1>
            </div>
          </div>
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Company Introduction with Fire Background */}
        <section 
          className="py-16 relative"
          style={{
            backgroundImage: 'url("https://darkseagreen-lobster-522120.hostingersite.com/wp-content/uploads/2025/10/fire.webp")',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: '#E7211B'
          }}
        >
          <div className="absolute inset-0 bg-white/95"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">公司简介</h2>
                  <div className="space-y-4 text-foreground leading-relaxed">
                    <p>
                      十余年来，绝味食品始终专注于卤制食品的研发、生产与销售，以&ldquo;传递美味与快乐&rdquo;为品牌使命，构建起集 研发创新、现代化制造、冷链物流、终端零售 于一体的完整产业链体系。
                    </p>
                    <p>
                      凭借标准化的生产工艺、严格的品质管控以及敏锐的市场洞察，绝味在全球拥有超过 16,000 家门店，业务覆盖 中国31个省市自治区，并成功进入 新加坡、香港、加拿大 等国际市场，逐步形成了具有全球视野的餐饮品牌格局。
                    </p>
                    <p>
                      在商业布局上，绝味食品构建了多元化的市场体系，涵盖多个核心板块：
                    </p>
                  </div>
                  
                  {/* Icon List */}
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                        <BusinessIcon />
                      </div>
                      <div className="text-foreground">
                        <p className="font-medium">餐饮渠道合作 —— 与连锁餐饮、便利店及团餐企业建立稳定供货关系，推动卤制品走入更多消费场景；</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                        <BusinessIcon />
                      </div>
                      <div className="text-foreground">
                        <p className="font-medium">电商分销体系 —— 通过官网B2C平台、小红书及海外跨境电商平台，打造线上零售与品牌矩阵；</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                        <BusinessIcon />
                      </div>
                      <div className="text-foreground">
                        <p className="font-medium">线下代理网络 —— 依托区域经销商体系，深度覆盖全国及海外重点市场，形成强有力的地面销售网络；</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                        <BusinessIcon />
                      </div>
                      <div className="text-foreground">
                        <p className="font-medium">OEM / 品牌定制生产 —— 提供从配方研发、生产加工到包装设计的一站式代工合作服务，助力合作伙伴拓展产品线。</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-foreground">
                      凭借稳健的制造基础与品牌影响力，绝味食品正不断深化产业协同与全球布局，以创新驱动发展，让&ldquo;来自中国的卤味香气&rdquo;飘向世界每一个角落。
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <R2Image
                    src={getR2Url("scraped_media/branch2-1024x1024.webp")}
                    alt="Juewei Branch"
                    width={400}
                    height={400}
                    className="w-full max-w-md"
                    priority={false}
                    fallback={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Advantages */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-12 text-center text-foreground">本地优势</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-foreground mb-8">
                    依托中国总部强大的研发能力与产业链支持，加拿大分公司：
                  </p>
                  
                  {/* Icon List for Local Advantages */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                        <BusinessIcon />
                      </div>
                      <div className="text-foreground">
                        <p className="font-medium">专注于本地化生产与供应</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                        <BusinessIcon />
                      </div>
                      <div className="text-foreground">
                        <p className="font-medium">持续拓展市场服务能力</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                        <BusinessIcon />
                      </div>
                      <div className="text-foreground">
                        <p className="font-medium">致力于为北美客户和合作伙伴提供 安全、可靠的产品与优质体验</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <R2Image
                    src={getR2Url("scraped_media/product6-300x219.webp")}
                    alt="Juewei Product"
                    width={300}
                    height={219}
                    className="w-full max-w-md"
                    priority={false}
                    fallback={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy Section */}
        <section className="py-20 bg-red-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">我们的理念</h2>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p>绝味食品加拿大分公司将持续秉持 &ldquo;新鲜、安全、可靠&rdquo; 的理念，</p>
                <p>不断提升本地化优势，</p>
                <p>树立值得信赖的国际品牌形象。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <R2Image
                    src={getR2Url("scraped_media/icon6-150x150.png")}
                    alt="Partnership Icon"
                    width={150}
                    height={150}
                    className="w-32 h-32 rounded-lg"
                    priority={false}
                    fallback={true}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-foreground mb-6">想合作经销？成为我们的合作伙伴</h2>
                  <a 
                    href="mailto:jueweifoodca@gmail.com"
                    className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
                      <path d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"/>
                    </svg>
                    联系我们
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
