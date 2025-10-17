import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { sourceHanSans, sourceHanSerif, systemFont } from "@/lib/fonts"

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
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body 
        className={`${sourceHanSans.variable} ${sourceHanSerif.variable} ${systemFont.variable} font-sans antialiased`}
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
