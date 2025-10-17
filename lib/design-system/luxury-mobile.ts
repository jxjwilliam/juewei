/**
 * Luxury Mobile Utilities
 * 
 * Mobile-specific utilities and optimizations for the luxury design system.
 * Provides touch interactions, mobile layouts, and responsive design utilities.
 */

// Mobile breakpoints
export const MOBILE_BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Touch interaction types
export const TOUCH_INTERACTIONS = {
  TAP: 'tap',
  DOUBLE_TAP: 'double-tap',
  LONG_PRESS: 'long-press',
  SWIPE: 'swipe',
  PINCH: 'pinch',
  PAN: 'pan',
} as const;

// Mobile device types
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const;

// Mobile utilities class
export class LuxuryMobileManager {
  private deviceType: string = DEVICE_TYPES.DESKTOP;
  private touchCapabilities: Map<string, boolean> = new Map();
  private orientation: string = 'portrait';
  private viewportSize: { width: number; height: number } = { width: 0, height: 0 };

  constructor() {
    this.initializeMobileDetection();
    this.setupTouchDetection();
    this.setupOrientationDetection();
    this.setupViewportDetection();
  }

  /**
   * Initialize mobile detection
   */
  private initializeMobileDetection(): void {
    if (typeof window === 'undefined') return;

    // Detect device type
    this.detectDeviceType();
    
    // Setup responsive listeners
    this.setupResponsiveListeners();
  }

  /**
   * Detect device type
   */
  private detectDeviceType(): void {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
    
    if (isTablet) {
      this.deviceType = DEVICE_TYPES.TABLET;
    } else if (isMobile) {
      this.deviceType = DEVICE_TYPES.MOBILE;
    } else {
      this.deviceType = DEVICE_TYPES.DESKTOP;
    }
  }

  /**
   * Setup touch detection
   */
  private setupTouchDetection(): void {
    if (typeof window === 'undefined') return;

    // Check for touch support
    this.touchCapabilities.set('touch', 'ontouchstart' in window);
    this.touchCapabilities.set('pointer', 'onpointerdown' in window);
    this.touchCapabilities.set('gesture', 'ongesturestart' in window);

    // Setup touch event listeners
    this.setupTouchEventListeners();
  }

  /**
   * Setup orientation detection
   */
  private setupOrientationDetection(): void {
    if (typeof window === 'undefined') return;

    // Initial orientation
    this.orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
        this.handleOrientationChange();
      }, 100);
    });

    // Listen for resize events
    window.addEventListener('resize', () => {
      this.handleViewportChange();
    });
  }

  /**
   * Setup viewport detection
   */
  private setupViewportDetection(): void {
    if (typeof window === 'undefined') return;

    this.viewportSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * Setup responsive listeners
   */
  private setupResponsiveListeners(): void {
    if (typeof window === 'undefined') return;

    const mediaQueries = Object.entries(MOBILE_BREAKPOINTS).map(([name, value]) => ({
      name,
      query: window.matchMedia(`(min-width: ${value})`),
    }));

    mediaQueries.forEach(({ name, query }) => {
      const handleChange = (e: MediaQueryListEvent) => {
        this.handleBreakpointChange(name, e.matches);
      };

      query.addEventListener('change', handleChange);
    });
  }

  /**
   * Setup touch event listeners
   */
  private setupTouchEventListeners(): void {
    if (typeof document === 'undefined') return;

    let touchStartTime = 0;
    let touchStartPosition = { x: 0, y: 0 };
    let touchEndPosition = { x: 0, y: 0 };

    // Touch start
    document.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      const touch = e.touches[0];
      touchStartPosition = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });

    // Touch end
    document.addEventListener('touchend', (e) => {
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime;
      const touch = e.changedTouches[0];
      touchEndPosition = { x: touch.clientX, y: touch.clientY };

      const deltaX = touchEndPosition.x - touchStartPosition.x;
      const deltaY = touchEndPosition.y - touchStartPosition.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Determine touch interaction type
      if (touchDuration < 200 && distance < 10) {
        this.handleTouchInteraction(TOUCH_INTERACTIONS.TAP, e);
      } else if (touchDuration > 500 && distance < 10) {
        this.handleTouchInteraction(TOUCH_INTERACTIONS.LONG_PRESS, e);
      } else if (distance > 50) {
        this.handleTouchInteraction(TOUCH_INTERACTIONS.SWIPE, e);
      }
    }, { passive: true });

    // Touch move
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const currentPosition = { x: touch.clientX, y: touch.clientY };
      const deltaX = currentPosition.x - touchStartPosition.x;
      const deltaY = currentPosition.y - touchStartPosition.y;

      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        this.handleTouchInteraction(TOUCH_INTERACTIONS.PAN, e);
      }
    }, { passive: true });
  }

  /**
   * Handle touch interaction
   */
  private handleTouchInteraction(type: string, event: TouchEvent): void {
    const target = event.target as HTMLElement;
    
    // Dispatch custom events
    const customEvent = new CustomEvent(`luxury-${type}`, {
      detail: {
        type,
        target,
        originalEvent: event,
      },
    });
    
    target.dispatchEvent(customEvent);
  }

  /**
   * Handle orientation change
   */
  private handleOrientationChange(): void {
    if (typeof document === 'undefined') return;

    // Update viewport size
    this.viewportSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Apply orientation-specific styles
    const root = document.documentElement;
    root.setAttribute('data-orientation', this.orientation);
    
    // Announce orientation change to screen readers
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(
        `Orientation changed to ${this.orientation}`
      );
      utterance.volume = 0.1;
      window.speechSynthesis.speak(utterance);
    }
  }

  /**
   * Handle viewport change
   */
  private handleViewportChange(): void {
    this.viewportSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Update device type based on viewport
    this.detectDeviceType();
  }

  /**
   * Handle breakpoint change
   */
  private handleBreakpointChange(breakpoint: string, matches: boolean): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    if (matches) {
      root.classList.add(`luxury-${breakpoint}`);
    } else {
      root.classList.remove(`luxury-${breakpoint}`);
    }
  }

  /**
   * Get current device type
   */
  getDeviceType(): string {
    return this.deviceType;
  }

  /**
   * Get current orientation
   */
  getOrientation(): string {
    return this.orientation;
  }

  /**
   * Get viewport size
   */
  getViewportSize(): { width: number; height: number } {
    return this.viewportSize;
  }

  /**
   * Check if touch is supported
   */
  isTouchSupported(): boolean {
    return this.touchCapabilities.get('touch') || false;
  }

  /**
   * Check if device is mobile
   */
  isMobile(): boolean {
    return this.deviceType === DEVICE_TYPES.MOBILE;
  }

  /**
   * Check if device is tablet
   */
  isTablet(): boolean {
    return this.deviceType === DEVICE_TYPES.TABLET;
  }

  /**
   * Check if device is desktop
   */
  isDesktop(): boolean {
    return this.deviceType === DEVICE_TYPES.DESKTOP;
  }

  /**
   * Get optimal touch target size
   */
  getOptimalTouchTargetSize(): number {
    if (this.isMobile()) {
      return 44; // 44px minimum for mobile
    } else if (this.isTablet()) {
      return 40; // 40px for tablet
    } else {
      return 32; // 32px for desktop
    }
  }

  /**
   * Get optimal font size
   */
  getOptimalFontSize(baseSize: number): number {
    if (this.isMobile()) {
      return Math.max(baseSize, 16); // Minimum 16px for mobile
    } else if (this.isTablet()) {
      return Math.max(baseSize, 14); // Minimum 14px for tablet
    } else {
      return baseSize; // Use base size for desktop
    }
  }
}

// Touch interaction utilities
export const luxuryTouchInteractions = {
  /**
   * Setup touch interaction for element
   */
  setupTouchInteraction: (element: HTMLElement, options: {
    onTap?: (event: CustomEvent) => void;
    onDoubleTap?: (event: CustomEvent) => void;
    onLongPress?: (event: CustomEvent) => void;
    onSwipe?: (event: CustomEvent) => void;
    onPan?: (event: CustomEvent) => void;
  } = {}): (() => void) => {
    const { onTap, onDoubleTap, onLongPress, onSwipe, onPan } = options;
    
    const handleTap = (e: CustomEvent) => onTap?.(e);
    const handleDoubleTap = (e: CustomEvent) => onDoubleTap?.(e);
    const handleLongPress = (e: CustomEvent) => onLongPress?.(e);
    const handleSwipe = (e: CustomEvent) => onSwipe?.(e);
    const handlePan = (e: CustomEvent) => onPan?.(e);
    
    element.addEventListener('luxury-tap', handleTap);
    element.addEventListener('luxury-double-tap', handleDoubleTap);
    element.addEventListener('luxury-long-press', handleLongPress);
    element.addEventListener('luxury-swipe', handleSwipe);
    element.addEventListener('luxury-pan', handlePan);
    
    return () => {
      element.removeEventListener('luxury-tap', handleTap);
      element.removeEventListener('luxury-double-tap', handleDoubleTap);
      element.removeEventListener('luxury-long-press', handleLongPress);
      element.removeEventListener('luxury-swipe', handleSwipe);
      element.removeEventListener('luxury-pan', handlePan);
    };
  },

  /**
   * Setup swipe gesture
   */
  setupSwipeGesture: (element: HTMLElement, options: {
    direction?: 'horizontal' | 'vertical' | 'both';
    threshold?: number;
    onSwipeLeft?: (event: CustomEvent) => void;
    onSwipeRight?: (event: CustomEvent) => void;
    onSwipeUp?: (event: CustomEvent) => void;
    onSwipeDown?: (event: CustomEvent) => void;
  } = {}): (() => void) => {
    const { direction = 'both', threshold = 50, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = options;
    
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      
      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        if (direction === 'horizontal' || direction === 'both') {
          if (deltaX > 0) {
            onSwipeRight?.(new CustomEvent('luxury-swipe-right', { detail: { deltaX, deltaY } }));
          } else {
            onSwipeLeft?.(new CustomEvent('luxury-swipe-left', { detail: { deltaX, deltaY } }));
          }
        }
        
        if (direction === 'vertical' || direction === 'both') {
          if (deltaY > 0) {
            onSwipeDown?.(new CustomEvent('luxury-swipe-down', { detail: { deltaX, deltaY } }));
          } else {
            onSwipeUp?.(new CustomEvent('luxury-swipe-up', { detail: { deltaX, deltaY } }));
          }
        }
      }
    };
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  },
};

// Mobile layout utilities
export const luxuryMobileLayout = {
  /**
   * Get responsive grid columns
   */
  getResponsiveGridColumns: (deviceType: string): number => {
    switch (deviceType) {
      case DEVICE_TYPES.MOBILE:
        return 1;
      case DEVICE_TYPES.TABLET:
        return 2;
      case DEVICE_TYPES.DESKTOP:
        return 3;
      default:
        return 1;
    }
  },

  /**
   * Get responsive spacing
   */
  getResponsiveSpacing: (baseSpacing: number, deviceType: string): number => {
    switch (deviceType) {
      case DEVICE_TYPES.MOBILE:
        return baseSpacing * 0.75;
      case DEVICE_TYPES.TABLET:
        return baseSpacing * 0.875;
      case DEVICE_TYPES.DESKTOP:
        return baseSpacing;
      default:
        return baseSpacing;
    }
  },

  /**
   * Get responsive font size
   */
  getResponsiveFontSize: (baseSize: number, deviceType: string): number => {
    switch (deviceType) {
      case DEVICE_TYPES.MOBILE:
        return Math.max(baseSize * 0.875, 16);
      case DEVICE_TYPES.TABLET:
        return Math.max(baseSize * 0.9375, 14);
      case DEVICE_TYPES.DESKTOP:
        return baseSize;
      default:
        return baseSize;
    }
  },

  /**
   * Get responsive padding
   */
  getResponsivePadding: (basePadding: number, deviceType: string): number => {
    switch (deviceType) {
      case DEVICE_TYPES.MOBILE:
        return Math.max(basePadding * 0.75, 16);
      case DEVICE_TYPES.TABLET:
        return Math.max(basePadding * 0.875, 20);
      case DEVICE_TYPES.DESKTOP:
        return basePadding;
      default:
        return basePadding;
    }
  },
};

// Mobile performance utilities
export const luxuryMobilePerformance = {
  /**
   * Check if device can handle complex animations
   */
  canHandleComplexAnimations: (): boolean => {
    if (typeof navigator === 'undefined') return true;

    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;
    if (cores < 4) return false;

    // Check memory
    const memory = (navigator as any).deviceMemory || 4;
    if (memory < 4) return false;

    // Check connection speed
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === 'slow-2g') return false;

    return true;
  },

  /**
   * Get optimal animation settings for mobile
   */
  getOptimalAnimationSettings: (deviceType: string) => {
    const canHandleComplex = this.canHandleComplexAnimations();
    
    switch (deviceType) {
      case DEVICE_TYPES.MOBILE:
        return {
          duration: canHandleComplex ? 0.2 : 0.1,
          easing: 'easeOut',
          fps: canHandleComplex ? 30 : 15,
          complexity: canHandleComplex ? 'medium' : 'low',
        };
      case DEVICE_TYPES.TABLET:
        return {
          duration: canHandleComplex ? 0.3 : 0.2,
          easing: 'easeInOut',
          fps: canHandleComplex ? 45 : 30,
          complexity: canHandleComplex ? 'high' : 'medium',
        };
      case DEVICE_TYPES.DESKTOP:
        return {
          duration: canHandleComplex ? 0.4 : 0.3,
          easing: 'easeInOut',
          fps: canHandleComplex ? 60 : 30,
          complexity: canHandleComplex ? 'high' : 'medium',
        };
      default:
        return {
          duration: 0.3,
          easing: 'easeOut',
          fps: 30,
          complexity: 'medium',
        };
    }
  },

  /**
   * Optimize images for mobile
   */
  optimizeImagesForMobile: (images: HTMLImageElement[]): void => {
    images.forEach(img => {
      // Add loading="lazy" if not present
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Add decoding="async" if not present
      if (!img.decoding) {
        img.decoding = 'async';
      }
      
      // Add mobile-specific attributes
      img.setAttribute('data-mobile-optimized', 'true');
    });
  },
};

// Mobile accessibility utilities
export const luxuryMobileAccessibility = {
  /**
   * Setup mobile accessibility features
   */
  setupMobileAccessibility: (): void => {
    if (typeof document === 'undefined') return;

    // Add mobile-specific accessibility attributes
    document.documentElement.setAttribute('data-mobile-accessibility', 'enabled');
    
    // Setup touch accessibility
    this.setupTouchAccessibility();
    
    // Setup mobile screen reader support
    this.setupMobileScreenReaderSupport();
  },

  /**
   * Setup touch accessibility
   */
  setupTouchAccessibility: (): void => {
    if (typeof document === 'undefined') return;

    // Add touch accessibility styles
    const style = document.createElement('style');
    style.textContent = `
      .luxury-touch-target {
        min-height: 44px;
        min-width: 44px;
        touch-action: manipulation;
      }
      
      .luxury-touch-feedback {
        -webkit-tap-highlight-color: rgba(184, 134, 11, 0.2);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
  },

  /**
   * Setup mobile screen reader support
   */
  setupMobileScreenReaderSupport: (): void => {
    if (typeof document === 'undefined') return;

    // Add mobile-specific ARIA attributes
    const interactiveElements = document.querySelectorAll('button, [role="button"], a, input, select, textarea');
    interactiveElements.forEach(element => {
      element.setAttribute('data-mobile-accessible', 'true');
    });
  },
};

// Export mobile manager instance
export const luxuryMobileManager = new LuxuryMobileManager();

// Export all utilities
export const luxuryMobileUtilities = {
  manager: luxuryMobileManager,
  touchInteractions: luxuryTouchInteractions,
  layout: luxuryMobileLayout,
  performance: luxuryMobilePerformance,
  accessibility: luxuryMobileAccessibility,
};

export default luxuryMobileUtilities;
