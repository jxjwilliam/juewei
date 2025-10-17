'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Phone, MapPin, Clock } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { LuxuryButton } from '@/components/luxury/luxury-button'
import { LuxuryText } from '@/components/luxury/luxury-typography'

/**
 * LuxuryMobileNavigation
 * Mobile-only luxury navigation using a slide-in sheet with brand styling and CTAs.
 */
export function LuxuryMobileNavigation({
  navigation,
  contactPhone = '(604) 521-7618',
  contactLocation = 'Delta, BC',
  businessHours = 'Mon-Sun: 9AM-9PM',
}: {
  navigation: Array<{ name: string; href: string }>
  contactPhone?: string
  contactLocation?: string
  businessHours?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center gap-3 md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <LuxuryButton variant="ghost" size="sm" className="focus-ring">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </LuxuryButton>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 sm:w-96 bg-luxury-background-secondary/95 backdrop-blur-xl border-l border-luxury-accent-copper/20">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="space-y-6 mt-8">
            <div className="bg-gradient-to-br from-luxury-background-secondary to-luxury-background-primary rounded-luxury-lg p-4 space-y-3 border border-luxury-accent-copper/20">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-luxury-spice" />
                <LuxuryText variant="caption" className="font-semibold">{contactPhone}</LuxuryText>
              </div>
              <div className="flex items-center gap-2 text-sm text-luxury-text-secondary">
                <MapPin className="w-4 h-4 text-luxury-spice" />
                <LuxuryText variant="caption">{contactLocation}</LuxuryText>
              </div>
              <div className="flex items-center gap-2 text-sm text-luxury-text-secondary">
                <Clock className="w-4 h-4 text-luxury-spice" />
                <LuxuryText variant="caption">{businessHours}</LuxuryText>
              </div>
              <div className="text-xs text-luxury-text-secondary pt-2 border-t border-luxury-accent-copper/20">
                <LuxuryText variant="caption">CFIA认证 · 本地工厂</LuxuryText>
              </div>
            </div>

            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="luxury-text text-lg font-semibold transition-all duration-300 hover:text-luxury-accent-copper focus-ring py-3 border-b border-luxury-accent-copper/20"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-4">
              <LuxuryButton
                asChild
                variant="outline"
                className="w-full border-luxury-accent-copper text-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>联系我们</Link>
              </LuxuryButton>
              <LuxuryButton
                asChild
                variant="primary"
                className="w-full bg-gradient-to-r from-luxury-spice to-luxury-accent-copper hover:from-luxury-spice hover:to-luxury-accent-gold text-white font-semibold"
              >
                <Link href="/partnership" onClick={() => setIsOpen(false)}>合作下单</Link>
              </LuxuryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default LuxuryMobileNavigation


