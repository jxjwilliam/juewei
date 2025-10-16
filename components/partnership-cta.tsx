import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Megaphone, Mail, ArrowRight } from "lucide-react"

export function PartnershipCTA() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <Card className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground shadow-2xl border-0 overflow-hidden animate-scale-in hover:shadow-primary/25 transition-all duration-500 hover-lift">
          <CardContent className="p-8 lg:p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
              <div className="flex items-center gap-6 lg:gap-8">
                <div className="hidden lg:flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Megaphone className="h-10 w-10 lg:h-12 lg:w-12 animate-pulse" />
                </div>
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-balance drop-shadow-lg">
                    想合作经销？成为我们的合作伙伴
                  </h2>
                  <p className="text-lg lg:text-xl font-semibold opacity-95 text-pretty">
                    加入绝味，共创美味事业
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="whitespace-nowrap text-lg px-8 lg:px-10 py-6 lg:py-7 font-bold shadow-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shine-effect group focus-ring"
                asChild
              >
                <a href="mailto:jueweifoodca@gmail.com" className="flex items-center gap-3">
                  <Mail className="h-6 w-6" />
                  联系我们
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
