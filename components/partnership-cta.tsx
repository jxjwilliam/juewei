import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, ArrowRight } from "lucide-react"
import Image from "next/image"

export function PartnershipCTA() {
  return (
    <section className="py-12 px-4 lg:px-8">
      <div className="container-wide">
        <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 text-gray-800 dark:text-gray-100 shadow-none border-0 overflow-hidden animate-scale-in transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(156,163,175,0.3)] group">
          <CardContent className="p-6 lg:p-8 relative">
            <div className="absolute inset-0 bg-amber-50/30 dark:bg-amber-900/10" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative z-10">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="hidden lg:flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-amber-100/30 dark:bg-amber-800/20 backdrop-blur-sm group-hover:scale-125 hover:bg-amber-200/40 dark:hover:bg-amber-700/30 transition-all duration-500 ease-out">
                  <Image
                    src="https://pub-46d36f4dc6df495b8b8f980afacd5b7b.r2.dev/products/icon6-150x150.png"
                    alt="绝味品质保证"
                    width={150}
                    height={150}
                    className="w-16 h-16 lg:w-20 lg:h-20 object-contain hover:scale-125 transition-transform duration-300 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 text-balance drop-shadow-lg hover:text-amber-600 dark:hover:text-amber-400 hover:scale-110 transition-all duration-300 ease-out">
                    想合作经销？成为我们的合作伙伴
                  </h2>
                  <p className="text-base lg:text-lg font-semibold opacity-95 text-pretty hover:opacity-100 hover:scale-105 transition-all duration-300 ease-out">
                    加入绝味，共创美味事业
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="whitespace-nowrap text-base px-6 lg:px-8 py-4 lg:py-5 font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl transition-all duration-500 hover:scale-125 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] shine-effect group focus-ring"
                asChild
              >
                <a href="mailto:jueweifoodca@gmail.com" className="flex items-center gap-3">
                  <Mail className="h-6 w-6" />
                  联系我们
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
