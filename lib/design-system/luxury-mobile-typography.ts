/**
 * Luxury Mobile Typography Utilities
 * Responsive, mobile-first typography scales and helpers tailored
 * for the luxury brand aesthetic with Chinese/English support.
 */

export type Language = 'en' | 'zh'

/**
 * Core mobile font sizes using Tailwind sizing tokens.
 * Values are className fragments to be consumed by `cn()`.
 */
export const mobileTypeScale = {
  display: 'text-3xl sm:text-4xl',
  h1: 'text-2xl sm:text-3xl',
  h2: 'text-xl sm:text-2xl',
  h3: 'text-lg sm:text-xl',
  body: 'text-base',
  caption: 'text-sm',
  micro: 'text-xs',
} as const

/**
 * Recommended line heights for mobile readability.
 */
export const mobileLeading = {
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
} as const

/**
 * Tracking adjustments for high-density mobile screens.
 */
export const mobileTracking = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
} as const

/**
 * Weight presets aligning with luxury aesthetic.
 */
export const mobileWeights = {
  display: 'font-semibold',
  heading: 'font-semibold',
  body: 'font-medium',
  caption: 'font-normal',
} as const

/**
 * Language-aware font stacks for mobile.
 * Chinese uses Source Han Sans; English uses Inter/Playfair pairing.
 */
export function mobileFontStack(language: Language): string {
  return language === 'zh'
    ? 'font-luxury-body-cn'
    : 'font-luxury-body'
}

/**
 * Utility to assemble mobile heading classes with sensible defaults.
 */
export function mobileHeading({
  level = 1,
  language = 'en',
  leading = 'snug',
  tracking = 'tight',
}: {
  level?: 1 | 2 | 3
  language?: Language
  leading?: keyof typeof mobileLeading
  tracking?: keyof typeof mobileTracking
}): string {
  const size = level === 1 ? mobileTypeScale.h1 : level === 2 ? mobileTypeScale.h2 : mobileTypeScale.h3
  const weight = mobileWeights.heading
  const font = mobileFontStack(language)
  return [size, weight, font, leading, tracking, 'text-luxury-text-primary'].join(' ')
}

/**
 * Utility to assemble mobile body text classes.
 */
export function mobileBody({
  language = 'en',
  relaxed = false,
}: {
  language?: Language
  relaxed?: boolean
}): string {
  const font = mobileFontStack(language)
  const leading = relaxed ? mobileLeading.relaxed : mobileLeading.normal
  return [mobileTypeScale.body, mobileWeights.body, font, leading, 'text-luxury-text-secondary'].join(' ')
}

/**
 * Utility for captions/microcopy on mobile.
 */
export function mobileCaption({
  language = 'en',
}: {
  language?: Language
}): string {
  const font = mobileFontStack(language)
  return [mobileTypeScale.caption, mobileWeights.caption, font, mobileLeading.normal, 'text-luxury-text-tertiary'].join(' ')
}

/**
 * Emphasis helper for luxury brand highlights in mobile text.
 */
export const mobileEmphasis = 'text-luxury-accent-copper'

/**
 * Legacy shim: default mobile title style.
 */
export function mobileTitleDefault(language: Language = 'en'): string {
  return mobileHeading({ level: 1, language })
}


