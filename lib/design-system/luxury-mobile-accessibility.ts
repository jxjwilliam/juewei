/**
 * Mobile Accessibility Helpers for Luxury UI
 */

export const touchTargetMin = 'min-h-[44px] min-w-[44px]'
export const focusRing = 'focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none'

export function ariaPressProps(disabled: boolean = false) {
  return {
    role: 'button' as const,
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled || undefined,
  }
}

export function ariaLabel(label: string) {
  return { 'aria-label': label }
}

export default {
  touchTargetMin,
  focusRing,
  ariaPressProps,
  ariaLabel,
}


