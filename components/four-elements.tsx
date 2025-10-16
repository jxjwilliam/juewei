import { Card, CardContent } from "@/components/ui/card"

const elements = [
  {
    number: "鲜",
    title: "每日配送",
    description: "新鲜食材，当日制作",
  },
  {
    number: "香",
    title: "优质香料",
    description: "精选香料，独特配方",
  },
  {
    number: "麻",
    title: "地道花椒",
    description: "四川花椒，麻味十足",
  },
  {
    number: "辣",
    title: "多层辣椒",
    description: "层次分明，辣而不燥",
  },
]

export function FourElements() {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 via-background to-muted/10">
      <div className="container-wide">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gradient animate-fade-in text-balance">
            绝味的味蕾 <span className="text-gradient-warm">4</span> 重奏
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground animate-slide-up text-pretty">
            四大核心元素，成就独特风味
          </p>
        </div>
        <div className="responsive-grid max-w-7xl mx-auto">
          {elements.map((element, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-2 hover:border-primary/50 animate-scale-in hover-lift"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 lg:p-8 text-center space-y-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-3xl lg:text-4xl font-black shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {element.number}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg lg:text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 text-balance">
                      {element.title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed text-pretty">
                      {element.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
