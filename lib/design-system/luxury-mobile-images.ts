/**
 * Luxury Mobile Image Optimization
 * Mobile-first image policies, sizes, qualities, and helpers.
 */

export const mobileImageUseCases = {
  hero: { width: 640, quality: 90, priority: true },
  card: { width: 480, quality: 88, priority: false },
  gallery: { width: 360, quality: 85, priority: false },
  thumb: { width: 200, quality: 80, priority: false },
} as const

export type MobileUseCase = keyof typeof mobileImageUseCases

export function getMobileImageParams(useCase: MobileUseCase) {
  return mobileImageUseCases[useCase]
}

export function buildMobileSrc(src: string, useCase: MobileUseCase) {
  const { width, quality } = getMobileImageParams(useCase)
  const url = new URL(src, 'http://local')
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality))
  return url.pathname + '?' + url.searchParams.toString()
}

export function mobileSizes(useCase: MobileUseCase): string {
  switch (useCase) {
    case 'hero':
      return '(max-width: 640px) 100vw, 100vw'
    case 'card':
      return '(max-width: 640px) 92vw, 50vw'
    case 'gallery':
      return '(max-width: 640px) 45vw, 25vw'
    case 'thumb':
      return '(max-width: 640px) 25vw, 10vw'
  }
}

export function mobileLoading(useCase: MobileUseCase): 'eager' | 'lazy' {
  return mobileImageUseCases[useCase].priority ? 'eager' : 'lazy'
}

export function mobilePriority(useCase: MobileUseCase): boolean {
  return mobileImageUseCases[useCase].priority
}

export function getMobileAspectClass(ratio: '1/1' | '4/3' | '16/9' | '3/4') {
  const map = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/4': 'aspect-[3/4]',
  } as const
  return map[ratio]
}

export default {
  mobileImageUseCases,
  getMobileImageParams,
  buildMobileSrc,
  mobileSizes,
  mobileLoading,
  mobilePriority,
  getMobileAspectClass,
}


