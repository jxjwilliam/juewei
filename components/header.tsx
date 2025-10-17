"use client"

import Link from "next/link"
import { R2Image } from "@/components/ui/r2-image"
import { Phone, MapPin } from "lucide-react"
import { LuxuryButton } from "@/components/luxury/luxury-button"
import { LuxuryText } from "@/components/luxury/luxury-typography"
import { LuxuryAnimation } from "@/components/luxury/luxury-animations"
import { LuxuryMobileNavigation } from "@/components/luxury/luxury-mobile-navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"

export function Header() {
  const { t } = useLanguage()
  
  // Fallback navigation in case translation fails
  const fallbackNavigation = [
    { name: "首页", href: "/" },
    { name: "产品", href: "/products" },
    { name: "关于我们", href: "/about" },
    { name: "联系我们", href: "/contact" },
    { name: "合作下单", href: "/partnership" },
  ]
  
  // Try to get translated navigation, fallback if t is not a function
  let navigation
  try {
    if (typeof t === 'function') {
      navigation = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.products"), href: "/products" },
        { name: t("nav.about"), href: "/about" },
        { name: t("nav.contact"), href: "/contact" },
        { name: t("nav.partnership"), href: "/partnership" },
      ]
    } else {
      console.warn('Translation function not available, using fallback')
      navigation = fallbackNavigation
    }
  } catch (error) {
    console.error('Translation error:', error)
    navigation = fallbackNavigation
  }

  return (
    <>
      {/* Improved Header with Better Layout */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Contact Bar */}
          <div className="hidden lg:flex items-center justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600" />
                <span className="font-medium">(604) 521-7618</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>Delta, BC</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <LuxuryAnimation animation="slideRight" delay={0.2}>
              <Link href="/" className="flex items-center group">
                <R2Image 
                  src="/images/logos/juewei-logo2.webp" 
                  alt="绝味 JUEWEI" 
                  width={1007}
                  height={320}
                  className="h-10 lg:h-12 w-auto group-hover:scale-105 transition-all duration-300"
                  priority
                  quality={95}
                />
              </Link>
            </LuxuryAnimation>

            {/* Desktop Navigation */}
            <LuxuryAnimation animation="slideLeft" delay={0.4}>
              <nav className="hidden lg:flex items-center space-x-8">
                {navigation.map((item, index) => (
                  <LuxuryAnimation key={item.name} animation="slideUp" delay={0.6 + index * 0.1}>
                    <Link
                      href={item.href}
                      className="text-gray-800 hover:text-orange-600 font-medium transition-colors duration-200 relative group py-2"
                    >
                      <span suppressHydrationWarning>{item.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </LuxuryAnimation>
                ))}
              </nav>
            </LuxuryAnimation>

            {/* CTA Buttons */}
            <LuxuryAnimation animation="slideLeft" delay={0.8}>
              <div className="hidden lg:flex items-center gap-3">
                <LuxuryButton
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300"
                >
                  <Link href="/contact">
                    <span suppressHydrationWarning>{typeof t === 'function' ? t("nav.contact") : "联系我们"}</span>
                  </Link>
                </LuxuryButton>
                <LuxuryButton
                  asChild
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold"
                >
                  <Link href="/partnership">
                    <span suppressHydrationWarning>{typeof t === 'function' ? t("nav.partnership") : "合作下单"}</span>
                  </Link>
                </LuxuryButton>
              </div>
            </LuxuryAnimation>

            {/* Mobile Navigation */}
            <LuxuryAnimation animation="slideLeft" delay={1.0}>
              <LuxuryMobileNavigation navigation={navigation} />
            </LuxuryAnimation>
          </div>
        </div>
      </header>
    </>
  )
}
