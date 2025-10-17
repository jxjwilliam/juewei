import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "../public/fonts/chinese-fonts.css"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { sourceHanSans, sourceHanSerif, systemFont } from "@/lib/fonts"
import { luxuryFonts } from "@/lib/fonts/luxury-fonts"

export const metadata: Metadata = {
  metadataBase: new URL('https://juewei.vercel.app'),
  title: "绝味 JUEWEI - Braised Snacks | 北美本地工厂",
  description: "绝味鸭脖 - 全球16,000+门店，北美本地供应链，CFIA/FDA/SQF认证，新鲜安全可靠",
  generator: "v0.app",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "绝味 JUEWEI - Braised Snacks | 北美本地工厂",
    description: "绝味鸭脖 - 全球16,000+门店，北美本地供应链，CFIA/FDA/SQF认证，新鲜安全可靠",
    images: ['/images/logos/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "绝味 JUEWEI - Braised Snacks | 北美本地工厂",
    description: "绝味鸭脖 - 全球16,000+门店，北美本地供应链，CFIA/FDA/SQF认证，新鲜安全可靠",
    images: ['/images/logos/logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="zh-CN" 
      data-scroll-behavior="smooth"
      className="luxury-theme"
      data-luxury-accessibility="enabled"
    >
      <head>
        <meta name="theme-color" content="#1A1A1A" />
        <meta name="color-scheme" content="dark" />
        <style>{`
          :root {
            --luxury-bg-primary: #1A1A1A;
            --luxury-bg-secondary: #2A2A2A;
            --luxury-accent-copper: #B8860B;
            --luxury-accent-gold: #D4AF37;
            --luxury-spice: #D43D2A;
            --luxury-text-primary: #F5F5F5;
            --luxury-text-secondary: #CCCCCC;
            --luxury-text-accent: #B8860B;
          }
        `}</style>
      </head>
      <body 
        className={`${sourceHanSans.variable} ${sourceHanSerif.variable} ${systemFont.variable} ${luxuryFonts.heading.variable} ${luxuryFonts.body.variable} font-sans antialiased luxury-body bg-luxury-background-primary text-luxury-text-primary`}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </LanguageProvider>
        <ScrollToTop />
        <PerformanceMonitor />
        <Analytics />
      </body>
    </html>
  )
}
