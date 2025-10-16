import { Card } from "@/components/ui/card"
import Image from "next/image"

const certifications = [
  {
    name: "CFIA",
    image: "/cfia.jpg",
    alt: "CFIA认证",
  },
  {
    name: "FDA",
    image: "/fda.jpg",
    alt: "FDA认证",
  },
  {
    name: "SQF",
    image: "/sqf.jpg",
    alt: "SQF认证",
  },
]

export function CertificationsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gradient animate-fade-in text-balance">
            食品安全认证
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground animate-slide-up text-pretty">
            加拿大 CFIA 食品检验局 · 美国 FDA 法规 · SQF 国际食品安全认证
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={cert.name}
              className="group p-8 flex items-center justify-center bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 animate-scale-in hover-lift"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Image 
                src={cert.image} 
                alt={cert.alt} 
                width={200}
                height={120}
                className="h-24 w-auto object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
