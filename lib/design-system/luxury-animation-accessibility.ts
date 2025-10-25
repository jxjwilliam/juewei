/**
 * Luxury Animation Accessibility Utilities
 */

export class LuxuryAnimationAccessibility {
  static prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  static withReducedMotion<T extends Record<string, unknown>>(animation: T, fallback: T): T {
    return this.prefersReducedMotion() ? fallback : animation;
  }

  static sanitizeDuration(duration: number): number {
    return this.prefersReducedMotion() ? Math.min(0.05, duration) : duration;
  }

  static maybeDisable(shouldAnimate: boolean): boolean {
    return this.prefersReducedMotion() ? false : shouldAnimate;
  }
}

export default LuxuryAnimationAccessibility;


