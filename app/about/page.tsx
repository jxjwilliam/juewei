import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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

        {/* Company Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">公司简介</h2>
                  <div className="space-y-4 text-foreground leading-relaxed">
                    <p>
                      主营业务：绝味食品加盟者大力公司是绝味的海外生产方，主要产品为：绝味鸭脖、绝味鸭翅、绝味鸭掌、绝味鸭舌、绝味鸭锁骨、绝味鸭肾、绝味素菜等。
                    </p>
                    <p>
                      公司拥有先进的生产工艺、产品经过加拿大食品检验局认证的食品安全体系、绝味食品拥有16,000家门店，遍布全国各地，是中国卤制品行业的领军品牌之一。
                    </p>
                    <p>
                      公司的发展史：绝味食品成立于1997年，经过20多年的发展，绝味食品已经成为中国卤制品行业的领军品牌之一。
                    </p>
                    <p className="font-medium">
                      <span className="text-red-600">●</span>{" "}
                      美味是基础——&ldquo;以卤制技术为核心&rdquo;，将传统卤制技术与现代食品工艺相结合，推出独特的卤制产品。
                    </p>
                    <p className="font-medium">
                      <span className="text-red-600">●</span>{" "}
                      与时俱进是关键——通过不断的产品创新，为消费者提供更多选择和更好的体验。
                    </p>
                    <p className="font-medium">
                      <span className="text-red-600">●</span>{" "}
                      大力公司始终——秉持绝味的经营理念，坚持&ldquo;鲜味、安全、可靠&rdquo;的品质承诺，致力于为消费者提供健康、美味的卤制食品。
                    </p>
                    <p className="font-medium">
                      <span className="text-red-600">●</span> OEM /
                      品牌授权业务——我们提供品牌授权服务，为产品工厂提供品牌支持和技术指导。
                    </p>
                    <p>
                      公司秉承绝味的品牌理念和经营理念，致力于为北美市场提供优质的卤制食品，让更多的消费者品尝到绝味的美味。
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-md bg-gradient-to-br from-red-100 to-red-200 rounded-lg p-8 text-center">
                    <div className="text-6xl font-bold text-red-600 mb-4">16,000+</div>
                    <div className="text-xl font-semibold text-red-800">门店遍布全国</div>
                    <div className="text-sm text-red-600 mt-2">Stores Nationwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Advantages */}
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-12 text-center text-foreground">本地优势</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-foreground mb-6">
                    母公司绝味品牌是大型的连锁企业，加盟产品全球领先，我们全力支持加盟！
                  </p>
                  <div className="space-y-3">
                    <p className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>专注于本地化生产和销售</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>持续提升产品质量和服务</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>配合于加拿大食品检验局的食品安全体系，&ldquo;鲜味&rdquo;品质保证</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-md bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-8 text-center shadow-lg">
                    <div className="text-4xl font-bold text-red-600 mb-4">绝味鸭脖</div>
                    <div className="text-lg font-semibold text-red-800 mb-2">麻辣鲜香</div>
                    <div className="text-sm text-red-600">Juewei Spicy Duck Neck</div>
                  </div>
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
                <p>绝味食品加盟者大力公司将持续秉持&ldquo;鲜味、安全、可靠&rdquo;的理念。</p>
                <p>不断提升本地化优势。</p>
                <p>解决遍布各地的加盟店的品质需求。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
