/**
 * Footer Component Types and Interfaces
 * 
 * This file contains TypeScript type definitions for the footer component,
 * including data structures, props, and configuration types.
 */

// Base footer content structure
export interface FooterContent {
  contactInfo: ContactInformation
  navigation: NavigationLink[]
  businessHours: BusinessHours
  socialMedia: SocialMediaLink[]
  trustBadges: TrustBadge[]
  copyright: string
}

// Contact information structure
export interface ContactInformation {
  phone: string
  address: string
  email: string
  hours: string
  support: string
}

// Navigation link structure
export interface NavigationLink {
  name: string
  href: string
  label: string
  order: number
}

// Business hours structure
export interface BusinessHours {
  serviceHours: string
  supportHours: string
  timezone: string
}

// Social media link structure
export interface SocialMediaLink {
  name: string
  handle: string
  href: string
  qrCode: string
  icon: React.ComponentType<{ className?: string }>
  order: number
}

// Trust badge structure
export interface TrustBadge {
  text: string
  icon: React.ComponentType<{ className?: string }>
  variant: 'default' | 'secondary' | 'outline'
  order: number
}

// Footer component props
export interface FooterProps {
  className?: string
  variant?: 'default' | 'compact' | 'extended'
  showTrustBadges?: boolean
  showSocialMedia?: boolean
  showBusinessHours?: boolean
  language?: 'en' | 'zh'
}

// Responsive breakpoints
export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'desktop'

// Footer section types
export type FooterSection = 'contact' | 'navigation' | 'hours' | 'social' | 'trust'

// Footer interaction types
export interface FooterInteraction {
  type: 'click' | 'hover' | 'focus' | 'scroll'
  element: string
  timestamp: Date
  duration?: number
}

// Footer performance metrics
export interface FooterMetrics {
  loadTime: number
  renderTime: number
  imageLoadTime: number
  interactionCount: number
  accessibilityScore: number
  responsiveBreakpoint: ResponsiveBreakpoint
  timestamp: Date
}

// Footer configuration
export interface FooterConfig {
  enableMetrics: boolean
  enableInteractions: boolean
  enableAccessibility: boolean
  sampleRate: number
  responsiveBreakpoints: {
    mobile: number
    tablet: number
    desktop: number
  }
}

// Footer state
export interface FooterState {
  isLoading: boolean
  hasError: boolean
  currentBreakpoint: ResponsiveBreakpoint
  interactions: FooterInteraction[]
  metrics: FooterMetrics[]
}

// Footer section props
export interface FooterSectionProps {
  className?: string
  title: string
  children: React.ReactNode
  variant?: 'default' | 'highlighted' | 'minimal'
}

// Contact info props
export interface ContactInfoProps {
  contact: ContactInformation
  className?: string
  showIcons?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

// Navigation props
export interface NavigationProps {
  links: NavigationLink[]
  className?: string
  variant?: 'default' | 'vertical' | 'horizontal'
  showLabels?: boolean
}

// Social media props
export interface SocialMediaProps {
  platforms: SocialMediaLink[]
  className?: string
  showQRCodes?: boolean
  showHandles?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

// Trust badges props
export interface TrustBadgesProps {
  badges: TrustBadge[]
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
  layout?: 'horizontal' | 'vertical' | 'grid'
}

// Business hours props
export interface BusinessHoursProps {
  hours: BusinessHours
  className?: string
  showIcons?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

// Footer layout props
export interface FooterLayoutProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'compact' | 'extended'
  responsive?: boolean
}

// Footer container props
export interface FooterContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

// Footer grid props
export interface FooterGridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

// Footer section title props
export interface FooterSectionTitleProps {
  children: React.ReactNode
  className?: string
  level?: 2 | 3 | 4
  variant?: 'default' | 'highlighted' | 'minimal'
}

// Footer link props
export interface FooterLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  variant?: 'default' | 'highlighted' | 'minimal'
  onClick?: () => void
}

// Footer icon props
export interface FooterIconProps {
  icon: React.ComponentType<{ className?: string }>
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'highlighted' | 'minimal'
}

// Footer badge props
export interface FooterBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ComponentType<{ className?: string }>
}

// Footer copyright props
export interface FooterCopyrightProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'minimal' | 'detailed'
  showYear?: boolean
  showBrand?: boolean
}

// Footer divider props
export interface FooterDividerProps {
  className?: string
  variant?: 'default' | 'thick' | 'thin' | 'dashed'
  orientation?: 'horizontal' | 'vertical'
}

// Footer spacing props
export interface FooterSpacingProps {
  children: React.ReactNode
  className?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  direction?: 'vertical' | 'horizontal'
}

// Footer animation props
export interface FooterAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  delay?: number
  duration?: number
}

// Footer accessibility props
export interface FooterAccessibilityProps {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  ariaDescribedBy?: string
  role?: string
  tabIndex?: number
}

// Footer theme props
export interface FooterThemeProps {
  children: React.ReactNode
  className?: string
  theme?: 'light' | 'dark' | 'auto'
  variant?: 'default' | 'branded' | 'minimal'
}

// Footer responsive props
export interface FooterResponsiveProps {
  children: React.ReactNode
  className?: string
  breakpoint?: ResponsiveBreakpoint
  hideOn?: ResponsiveBreakpoint[]
  showOn?: ResponsiveBreakpoint[]
}

// Footer performance props
export interface FooterPerformanceProps {
  children: React.ReactNode
  className?: string
  lazy?: boolean
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

// Footer error handling props
export interface FooterErrorProps {
  children: React.ReactNode
  className?: string
  fallback?: React.ReactNode
  onError?: (error: Error) => void
}

// Footer loading props
export interface FooterLoadingProps {
  className?: string
  variant?: 'skeleton' | 'spinner' | 'dots' | 'pulse'
  size?: 'sm' | 'md' | 'lg'
}

// Footer empty state props
export interface FooterEmptyProps {
  className?: string
  message?: string
  icon?: React.ComponentType<{ className?: string }>
  action?: React.ReactNode
}

// Footer validation props
export interface FooterValidationProps {
  children: React.ReactNode
  className?: string
  required?: boolean
  error?: string
  warning?: string
  success?: string
}

// Footer analytics props
export interface FooterAnalyticsProps {
  children: React.ReactNode
  className?: string
  track?: boolean
  event?: string
  data?: Record<string, any>
}

// Footer internationalization props
export interface FooterI18nProps {
  children: React.ReactNode
  className?: string
  locale?: string
  direction?: 'ltr' | 'rtl'
  currency?: string
  timezone?: string
}

// Footer SEO props
export interface FooterSEOProps {
  children: React.ReactNode
  className?: string
  structuredData?: Record<string, any>
  metaTags?: Record<string, string>
  canonical?: string
}

// Footer security props
export interface FooterSecurityProps {
  children: React.ReactNode
  className?: string
  sandbox?: string
  referrerPolicy?: string
  contentSecurityPolicy?: string
}

// Footer monitoring props
export interface FooterMonitoringProps {
  children: React.ReactNode
  className?: string
  track?: boolean
  metrics?: string[]
  alerts?: string[]
  thresholds?: Record<string, number>
}

// Footer debugging props
export interface FooterDebugProps {
  children: React.ReactNode
  className?: string
  debug?: boolean
  verbose?: boolean
  logLevel?: 'error' | 'warn' | 'info' | 'debug'
}

// Footer testing props
export interface FooterTestProps {
  children: React.ReactNode
  className?: string
  testId?: string
  dataTestId?: string
  ariaTestId?: string
}

// Footer development props
export interface FooterDevProps {
  children: React.ReactNode
  className?: string
  dev?: boolean
  hot?: boolean
  reload?: boolean
}

// Footer production props
export interface FooterProdProps {
  children: React.ReactNode
  className?: string
  prod?: boolean
  minify?: boolean
  optimize?: boolean
}

// Footer staging props
export interface FooterStagingProps {
  children: React.ReactNode
  className?: string
  staging?: boolean
  preview?: boolean
  beta?: boolean
}

// Footer feature flags
export interface FooterFeatureFlags {
  enableNewDesign: boolean
  enableMobileOptimization: boolean
  enableAccessibility: boolean
  enablePerformance: boolean
  enableAnalytics: boolean
  enableTesting: boolean
}

// Footer configuration options
export interface FooterOptions {
  content: FooterContent
  config: FooterConfig
  props: FooterProps
  flags: FooterFeatureFlags
}

// Footer context
export interface FooterContext {
  content: FooterContent
  config: FooterConfig
  state: FooterState
  actions: {
    setLoading: (loading: boolean) => void
    setError: (error: boolean) => void
    setBreakpoint: (breakpoint: ResponsiveBreakpoint) => void
    addInteraction: (interaction: FooterInteraction) => void
    addMetrics: (metrics: FooterMetrics) => void
  }
}

// Footer hook return type
export interface FooterHookReturn {
  content: FooterContent
  config: FooterConfig
  state: FooterState
  actions: FooterContext['actions']
  utils: {
    getBreakpoint: () => ResponsiveBreakpoint
    isMobile: () => boolean
    isTablet: () => boolean
    isDesktop: () => boolean
    getSection: (section: FooterSection) => React.ReactNode
    getMetrics: () => FooterMetrics[]
    getInteractions: () => FooterInteraction[]
  }
}

// Footer utility functions
export interface FooterUtils {
  getBreakpoint: (width: number) => ResponsiveBreakpoint
  isMobile: (width: number) => boolean
  isTablet: (width: number) => boolean
  isDesktop: (width: number) => boolean
  validateContent: (content: FooterContent) => boolean
  sanitizeContent: (content: FooterContent) => FooterContent
  formatContent: (content: FooterContent, locale: string) => FooterContent
  optimizeContent: (content: FooterContent) => FooterContent
}

// Footer constants
export const FOOTER_CONSTANTS = {
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280
  },
  SPACING: {
    SM: '1rem',
    MD: '1.5rem',
    LG: '2rem',
    XL: '3rem'
  },
  COLORS: {
    PRIMARY: '#fcefea',
    SECONDARY: '#gray-800',
    ACCENT: '#orange-500'
  },
  TYPOGRAPHY: {
    HEADING: 'text-2xl lg:text-3xl font-black',
    SUBHEADING: 'text-xl font-bold',
    BODY: 'text-lg text-gray-600'
  }
} as const

// Footer default values
export const FOOTER_DEFAULTS: FooterContent = {
  contactInfo: {
    phone: '(604) 521-7618',
    address: '1531 Derwent Way, Delta, BC V3M6K8',
    email: 'jueweifoodca@gmail.com',
    hours: 'Mon-Sun: 9AM-9PM',
    support: '24/7 在线支持'
  },
  navigation: [
    { name: '首页', href: '/', label: 'Navigate to home page', order: 1 },
    { name: '产品', href: '/products', label: 'Navigate to products page', order: 2 },
    { name: '关于我们', href: '/about', label: 'Navigate to about page', order: 3 },
    { name: '联系我们', href: '/contact', label: 'Navigate to contact page', order: 4 },
    { name: '合作下单', href: '/partnership', label: 'Navigate to partnership page', order: 5 }
  ],
  businessHours: {
    serviceHours: '周一至周日: 9:00 AM - 9:00 PM',
    supportHours: '24/7 客服支持',
    timezone: 'PST'
  },
  socialMedia: [],
  trustBadges: [
    { text: 'CFIA认证', icon: () => null, variant: 'default', order: 1 },
    { text: '本地工厂', icon: () => null, variant: 'default', order: 2 },
    { text: '新鲜配送', icon: () => null, variant: 'default', order: 3 }
  ],
  copyright: '© 2025 绝味 JUEWEI all right reserved.'
}

// All interfaces are already exported above as 'export interface'
// Only types that need explicit re-export are handled here
// (ResponsiveBreakpoint and FooterSection are already exported as 'export type' above)
