"use client"

import Link from "next/link"
import { R2Image } from "@/components/ui/r2-image"
import { useState } from "react"
import { Menu, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "首页", href: "/" },
    { name: "产品", href: "/products" },
    { name: "关于我们", href: "/about" },
    { name: "联系我们", href: "/contact" },
    { name: "合作下单", href: "/partnership" },
  ]

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 text-sm">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(604) 521-7618</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Delta, BC</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Sun: 9AM-9PM</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-orange-100">CFIA认证 · 本地工厂</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95 shadow-lg">
        <div className="container-wide flex h-20 lg:h-24 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <R2Image 
              src="/images/logos/juewei-logo2.webp" 
              alt="绝味 JUEWEI" 
              width={1007}
              height={320}
              className="h-12 lg:h-16 w-auto group-hover:scale-105 transition-all duration-300"
              priority
              quality={95}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm xl:text-base font-semibold transition-all duration-300 hover:text-primary relative group focus-ring py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Link href="/contact">联系我们</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold"
            >
              <Link href="/partnership">合作下单</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-3 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="focus-ring">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <div className="space-y-6 mt-8">
                  {/* Mobile Contact Info */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span className="font-semibold">(604) 521-7618</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Delta, BC</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-semibold transition-all duration-300 hover:text-primary focus-ring py-3 border-b border-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA Buttons */}
                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>联系我们</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold"
                    >
                      <Link href="/partnership" onClick={() => setIsOpen(false)}>合作下单</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
