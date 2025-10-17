/**
 * Mobile Performance Utilities for Luxury UI
 */

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersDataSaver(): boolean {
  if (typeof navigator === 'undefined') return false
  // @ts-expect-error Data Saver is non-standard but widely implemented on Android Chrome
  return Boolean(navigator.connection?.saveData)
}

export function throttleAnimation(fps: number = 60) {
  const frameInterval = 1000 / fps
  let last = 0
  return (fn: () => void) => {
    const now = performance.now()
    if (now - last >= frameInterval) {
      last = now
      fn()
    }
  }
}

export function chooseAnimationDuration(base: number = 0.4): number {
  if (prefersReducedMotion()) return Math.min(base, 0.2)
  return base
}

export function chooseImageQuality(base: number = 90): number {
  if (prefersDataSaver()) return Math.min(base, 70)
  return base
}

export default {
  prefersReducedMotion,
  prefersDataSaver,
  throttleAnimation,
  chooseAnimationDuration,
  chooseImageQuality,
}


