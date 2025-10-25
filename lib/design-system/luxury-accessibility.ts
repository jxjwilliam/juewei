/**
 * Luxury Accessibility Utilities
 * 
 * Comprehensive accessibility utilities for the luxury design system.
 * Provides WCAG compliance checking, screen reader support, and accessibility enhancements.
 */

// Accessibility levels
export const ACCESSIBILITY_LEVELS = {
  AA: 'AA',
  AAA: 'AAA',
} as const;

// Accessibility features
export const ACCESSIBILITY_FEATURES = {
  SCREEN_READER: 'screen-reader',
  KEYBOARD_NAVIGATION: 'keyboard-navigation',
  HIGH_CONTRAST: 'high-contrast',
  REDUCED_MOTION: 'reduced-motion',
  FOCUS_INDICATORS: 'focus-indicators',
  COLOR_INDEPENDENCE: 'color-independence',
} as const;

// Accessibility utilities class
export class LuxuryAccessibilityManager {
  private preferences: Map<string, boolean> = new Map();
  private observers: Map<string, MutationObserver> = new Map();

  constructor() {
    this.initializeAccessibility();
    this.setupPreferenceDetection();
  }

  /**
   * Initialize accessibility features
   */
  private initializeAccessibility(): void {
    if (typeof document === 'undefined') return;

    // Add accessibility attributes to document
    document.documentElement.setAttribute('lang', 'en');
    document.documentElement.setAttribute('data-luxury-accessibility', 'enabled');

    // Setup focus management
    this.setupFocusManagement();
    
    // Setup keyboard navigation
    this.setupKeyboardNavigation();
    
    // Setup screen reader support
    this.setupScreenReaderSupport();
  }

  /**
   * Setup preference detection
   */
  private setupPreferenceDetection(): void {
    if (typeof window === 'undefined') return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.preferences.set(ACCESSIBILITY_FEATURES.REDUCED_MOTION, prefersReducedMotion.matches);
    
    prefersReducedMotion.addEventListener('change', (e) => {
      this.preferences.set(ACCESSIBILITY_FEATURES.REDUCED_MOTION, e.matches);
      this.applyAccessibilityPreferences();
    });

    // Detect high contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    this.preferences.set(ACCESSIBILITY_FEATURES.HIGH_CONTRAST, prefersHighContrast.matches);
    
    prefersHighContrast.addEventListener('change', (e) => {
      this.preferences.set(ACCESSIBILITY_FEATURES.HIGH_CONTRAST, e.matches);
      this.applyAccessibilityPreferences();
    });

    // Detect color scheme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    this.preferences.set('dark-scheme', prefersDarkScheme.matches);
  }

  /**
   * Setup focus management
   */
  private setupFocusManagement(): void {
    if (typeof document === 'undefined') return;

    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
      .luxury-focus-visible {
        outline: 2px solid var(--luxury-accent-copper);
        outline-offset: 2px;
      }
      
      .luxury-focus-ring {
        box-shadow: 0 0 0 2px var(--luxury-accent-copper);
      }
      
      .luxury-focus-trap {
        position: relative;
      }
    `;
    document.head.appendChild(style);

    // Setup focus trap for modals
    this.setupFocusTrap();
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    if (typeof document === 'undefined') return;

    document.addEventListener('keydown', (e) => {
      // Handle escape key
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
      
      // Handle tab navigation
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
      
      // Handle arrow key navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.handleArrowNavigation(e);
      }
    });
  }

  /**
   * Setup screen reader support
   */
  private setupScreenReaderSupport(): void {
    if (typeof document === 'undefined') return;

    // Add screen reader announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.id = 'luxury-announcements';
    document.body.appendChild(announcement);

    // Setup ARIA landmarks
    this.setupARIALandmarks();
  }

  /**
   * Setup ARIA landmarks
   */
  private setupARIALandmarks(): void {
    if (typeof document === 'undefined') return;

    // Add navigation landmark
    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'Main navigation');
    }

    // Add main content landmark
    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
      main.setAttribute('role', 'main');
    }

    // Add banner landmark
    const header = document.querySelector('header');
    if (header && !header.getAttribute('role')) {
      header.setAttribute('role', 'banner');
    }

    // Add contentinfo landmark
    const footer = document.querySelector('footer');
    if (footer && !footer.getAttribute('role')) {
      footer.setAttribute('role', 'contentinfo');
    }
  }

  /**
   * Setup focus trap
   */
  private setupFocusTrap(): void {
    if (typeof document === 'undefined') return;

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    const trapFocus = (container: HTMLElement) => {
      const focusable = container.querySelectorAll(focusableElements);
      const firstFocusable = focusable[0] as HTMLElement;
      const lastFocusable = focusable[focusable.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      };

      container.addEventListener('keydown', handleTabKey);
      
      return () => {
        container.removeEventListener('keydown', handleTabKey);
      };
    };

    // Apply focus trap to modals
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
      trapFocus(modal as HTMLElement);
    });
  }

  /**
   * Handle escape key
   */
  private handleEscapeKey(): void {
    // Close any open modals or dropdowns
    const modals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
    modals.forEach(modal => {
      const closeButton = modal.querySelector('[aria-label="Close"]');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    });
  }

  /**
   * Handle tab navigation
   */
  private handleTabNavigation(e: KeyboardEvent): void {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);
    
    if (currentIndex === -1) {
      // Focus first element if none is focused
      (focusableElements[0] as HTMLElement)?.focus();
    }
  }

  /**
   * Handle arrow key navigation
   */
  private handleArrowNavigation(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    
    // Handle arrow navigation for custom components
    if (target.getAttribute('data-luxury-navigation') === 'true') {
      const direction = e.key.replace('Arrow', '').toLowerCase();
      this.navigateInDirection(target, direction);
    }
  }

  /**
   * Navigate in direction
   */
  private navigateInDirection(element: HTMLElement, direction: string): void {
    const navigableElements = element.querySelectorAll('[tabindex]:not([tabindex="-1"])');
    const currentIndex = Array.from(navigableElements).indexOf(document.activeElement as Element);
    
    let nextIndex = currentIndex;
    
    switch (direction) {
      case 'up':
      case 'left':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navigableElements.length - 1;
        break;
      case 'down':
      case 'right':
        nextIndex = currentIndex < navigableElements.length - 1 ? currentIndex + 1 : 0;
        break;
    }
    
    (navigableElements[nextIndex] as HTMLElement)?.focus();
  }

  /**
   * Apply accessibility preferences
   */
  private applyAccessibilityPreferences(): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Apply reduced motion
    if (this.preferences.get(ACCESSIBILITY_FEATURES.REDUCED_MOTION)) {
      root.classList.add('luxury-reduced-motion');
    } else {
      root.classList.remove('luxury-reduced-motion');
    }
    
    // Apply high contrast
    if (this.preferences.get(ACCESSIBILITY_FEATURES.HIGH_CONTRAST)) {
      root.classList.add('luxury-high-contrast');
    } else {
      root.classList.remove('luxury-high-contrast');
    }
  }

  /**
   * Announce to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (typeof document === 'undefined') return;

    const announcement = document.getElementById('luxury-announcements');
    if (announcement) {
      announcement.setAttribute('aria-live', priority);
      announcement.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  }

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(feature: string): boolean {
    return this.preferences.get(feature) || false;
  }

  /**
   * Enable accessibility feature
   */
  enableFeature(feature: string): void {
    this.preferences.set(feature, true);
    this.applyAccessibilityPreferences();
  }

  /**
   * Disable accessibility feature
   */
  disableFeature(feature: string): void {
    this.preferences.set(feature, false);
    this.applyAccessibilityPreferences();
  }
}

// Color contrast utilities
export const luxuryColorContrast = {
  /**
   * Calculate relative luminance
   */
  getLuminance: (hex: string): number => {
    const rgb = luxuryColorContrast.hexToRgb(hex);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Convert hex to RGB
   */
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  /**
   * Calculate contrast ratio
   */
  getContrastRatio: (color1: string, color2: string): number => {
    const lum1 = luxuryColorContrast.getLuminance(color1);
    const lum2 = luxuryColorContrast.getLuminance(color2);
    
    // Handle edge cases where luminance might be 0
    if (lum1 === 0 && lum2 === 0) return 1;
    if (lum1 === 0 || lum2 === 0) return 0;
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Check WCAG compliance
   */
  meetsWCAG: (foreground: string, background: string, level: keyof typeof ACCESSIBILITY_LEVELS = 'AA'): boolean => {
    const ratio = luxuryColorContrast.getContrastRatio(foreground, background);
    if (ratio === 0) return false; // Invalid colors
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  },

  /**
   * Get accessible color variants
   */
  getAccessibleColors: (baseColor: string, backgroundColor: string): string[] => {
    const variants: string[] = [];
    
    // Generate lighter and darker variants
    for (let i = 0; i <= 100; i += 10) {
      const lightVariant = luxuryColorContrast.lightenColor(baseColor, i);
      const darkVariant = luxuryColorContrast.darkenColor(baseColor, i);
      
      if (luxuryColorContrast.meetsWCAG(lightVariant, backgroundColor)) {
        variants.push(lightVariant);
      }
      if (luxuryColorContrast.meetsWCAG(darkVariant, backgroundColor)) {
        variants.push(darkVariant);
      }
    }
    
    return [...new Set(variants)];
  },

  /**
   * Lighten color
   */
  lightenColor: (hex: string, percent: number): string => {
    const rgb = luxuryColorContrast.hexToRgb(hex);
    if (!rgb) return hex;
    
    const { r, g, b } = rgb;
    const newR = Math.min(255, Math.round(r + (255 - r) * percent / 100));
    const newG = Math.min(255, Math.round(g + (255 - g) * percent / 100));
    const newB = Math.min(255, Math.round(b + (255 - b) * percent / 100));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  },

  /**
   * Darken color
   */
  darkenColor: (hex: string, percent: number): string => {
    const rgb = luxuryColorContrast.hexToRgb(hex);
    if (!rgb) return hex;
    
    const { r, g, b } = rgb;
    const newR = Math.max(0, Math.round(r - r * percent / 100));
    const newG = Math.max(0, Math.round(g - g * percent / 100));
    const newB = Math.max(0, Math.round(b - b * percent / 100));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  },
};

// Screen reader utilities
export const luxuryScreenReader = {
  /**
   * Add screen reader only text
   */
  addScreenReaderText: (element: HTMLElement, text: string): void => {
    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = text;
    element.appendChild(srText);
  },

  /**
   * Update ARIA label
   */
  updateAriaLabel: (element: HTMLElement, label: string): void => {
    element.setAttribute('aria-label', label);
  },

  /**
   * Update ARIA description
   */
  updateAriaDescription: (element: HTMLElement, description: string): void => {
    const id = `aria-description-${Date.now()}`;
    element.setAttribute('aria-describedby', id);
    
    const descElement = document.createElement('div');
    descElement.id = id;
    descElement.className = 'sr-only';
    descElement.textContent = description;
    document.body.appendChild(descElement);
  },

  /**
   * Set ARIA live region
   */
  setAriaLive: (element: HTMLElement, live: 'off' | 'polite' | 'assertive'): void => {
    element.setAttribute('aria-live', live);
  },

  /**
   * Set ARIA expanded
   */
  setAriaExpanded: (element: HTMLElement, expanded: boolean): void => {
    element.setAttribute('aria-expanded', expanded.toString());
  },

  /**
   * Set ARIA hidden
   */
  setAriaHidden: (element: HTMLElement, hidden: boolean): void => {
    element.setAttribute('aria-hidden', hidden.toString());
  },
};

// Keyboard navigation utilities
export const luxuryKeyboardNavigation = {
  /**
   * Setup keyboard navigation for component
   */
  setupKeyboardNavigation: (container: HTMLElement, options: {
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    wrap?: boolean;
  } = {}): void => {
    const { orientation = 'both', loop = false, wrap = false } = options;
    
    container.setAttribute('data-luxury-navigation', 'true');
    container.setAttribute('role', 'listbox');
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element, index) => {
      element.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  },

  /**
   * Handle arrow key navigation
   */
  handleArrowNavigation: (container: HTMLElement, direction: string): void => {
    const focusableElements = container.querySelectorAll(
      '[tabindex]:not([tabindex="-1"])'
    );
    
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);
    
    let nextIndex = currentIndex;
    
    switch (direction) {
      case 'up':
      case 'left':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        break;
      case 'down':
      case 'right':
        nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        break;
    }
    
    (focusableElements[nextIndex] as HTMLElement)?.focus();
  },
};

// Focus management utilities
export const luxuryFocusManagement = {
  /**
   * Trap focus within element
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  /**
   * Restore focus to element
   */
  restoreFocus: (element: HTMLElement): void => {
    element.focus();
  },

  /**
   * Get focusable elements
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    return Array.from(container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];
  },
};

// Export accessibility manager instance
export const luxuryAccessibilityManager = new LuxuryAccessibilityManager();

// Export all utilities
export const luxuryAccessibilityUtilities = {
  manager: luxuryAccessibilityManager,
  colorContrast: luxuryColorContrast,
  screenReader: luxuryScreenReader,
  keyboardNavigation: luxuryKeyboardNavigation,
  focusManagement: luxuryFocusManagement,
};

export default luxuryAccessibilityUtilities;
