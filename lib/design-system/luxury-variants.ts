/**
 * Luxury Component Variants
 * 
 * Comprehensive variant system for luxury components.
 * Provides consistent styling, behavior, and accessibility across all luxury components.
 */

// Component variant types
export const COMPONENT_VARIANTS = {
  BUTTON: 'button',
  CARD: 'card',
  NAVIGATION: 'navigation',
  TYPOGRAPHY: 'typography',
  ANIMATION: 'animation',
} as const;

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  GHOST: 'ghost',
  OUTLINE: 'outline',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

// Button sizes
export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

// Card variants
export const CARD_VARIANTS = {
  DEFAULT: 'default',
  ELEVATED: 'elevated',
  GLASS: 'glass',
  MINIMAL: 'minimal',
  BORDERED: 'bordered',
  FILLED: 'filled',
} as const;

// Navigation variants
export const NAVIGATION_VARIANTS = {
  DEFAULT: 'default',
  STICKY: 'sticky',
  FLOATING: 'floating',
  MINIMAL: 'minimal',
  SIDEBAR: 'sidebar',
  BREADCRUMB: 'breadcrumb',
} as const;

// Typography variants
export const TYPOGRAPHY_VARIANTS = {
  DISPLAY: 'display',
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  BODY: 'body',
  CAPTION: 'caption',
  SMALL: 'small',
  LARGE: 'large',
  LEAD: 'lead',
} as const;

// Animation variants
export const ANIMATION_VARIANTS = {
  FADE_IN: 'fade-in',
  SLIDE_UP: 'slide-up',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  SCALE: 'scale',
  ROTATE: 'rotate',
  STAGGER: 'stagger',
  PARALLAX: 'parallax',
} as const;

// Color variants
export const COLOR_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  MUTED: 'muted',
} as const;

// Size variants
export const SIZE_VARIANTS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
} as const;

// Luxury variant system class
export class LuxuryVariantSystem {
  private variants: Map<string, any> = new Map();
  private defaultVariants: Map<string, any> = new Map();

  constructor() {
    this.initializeDefaultVariants();
  }

  /**
   * Initialize default variants
   */
  private initializeDefaultVariants(): void {
    // Button default variants
    this.defaultVariants.set('button', {
      variant: BUTTON_VARIANTS.PRIMARY,
      size: BUTTON_SIZES.MD,
      disabled: false,
      loading: false,
    });

    // Card default variants
    this.defaultVariants.set('card', {
      variant: CARD_VARIANTS.DEFAULT,
      size: SIZE_VARIANTS.MD,
      hover: true,
      clickable: false,
    });

    // Navigation default variants
    this.defaultVariants.set('navigation', {
      variant: NAVIGATION_VARIANTS.DEFAULT,
      size: SIZE_VARIANTS.MD,
      sticky: false,
      mobile: false,
    });

    // Typography default variants
    this.defaultVariants.set('typography', {
      variant: TYPOGRAPHY_VARIANTS.BODY,
      size: SIZE_VARIANTS.MD,
      color: COLOR_VARIANTS.PRIMARY,
    });

    // Animation default variants
    this.defaultVariants.set('animation', {
      variant: ANIMATION_VARIANTS.FADE_IN,
      duration: 0.3,
      delay: 0,
      easing: 'easeOut',
    });
  }

  /**
   * Register component variant
   */
  registerVariant(component: string, variant: string, config: any): void {
    const key = `${component}-${variant}`;
    this.variants.set(key, config);
  }

  /**
   * Get component variant
   */
  getVariant(component: string, variant: string): any {
    const key = `${component}-${variant}`;
    return this.variants.get(key) || this.defaultVariants.get(component);
  }

  /**
   * Get all variants for component
   */
  getComponentVariants(component: string): Map<string, any> {
    const componentVariants = new Map();
    
    for (const [key, value] of this.variants) {
      if (key.startsWith(`${component}-`)) {
        const variantName = key.replace(`${component}-`, '');
        componentVariants.set(variantName, value);
      }
    }
    
    return componentVariants;
  }

  /**
   * Create variant configuration
   */
  createVariantConfig(component: string, variant: string, overrides: any = {}): any {
    const defaultConfig = this.defaultVariants.get(component);
    const variantConfig = this.getVariant(component, variant);
    
    return {
      ...defaultConfig,
      ...variantConfig,
      ...overrides,
    };
  }
}

// Button variant configurations
export const BUTTON_VARIANT_CONFIGS = {
  [BUTTON_VARIANTS.PRIMARY]: {
    className: 'bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold text-white hover:from-luxury-accent-gold hover:to-luxury-accent-copper',
    styles: {
      background: 'linear-gradient(135deg, var(--luxury-accent-copper), var(--luxury-accent-gold))',
      color: 'var(--luxury-text-primary)',
      border: 'none',
    },
    accessibility: {
      role: 'button',
      'aria-label': 'Primary action button',
    },
  },
  [BUTTON_VARIANTS.SECONDARY]: {
    className: 'bg-luxury-background-secondary text-luxury-text-primary border border-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white',
    styles: {
      background: 'var(--luxury-background-secondary)',
      color: 'var(--luxury-text-primary)',
      border: '1px solid var(--luxury-accent-copper)',
    },
    accessibility: {
      role: 'button',
      'aria-label': 'Secondary action button',
    },
  },
  [BUTTON_VARIANTS.ACCENT]: {
    className: 'bg-luxury-spice text-white hover:bg-red-600',
    styles: {
      background: 'var(--luxury-spice)',
      color: 'var(--luxury-text-primary)',
      border: 'none',
    },
    accessibility: {
      role: 'button',
      'aria-label': 'Accent action button',
    },
  },
  [BUTTON_VARIANTS.GHOST]: {
    className: 'text-luxury-text-primary hover:bg-luxury-background-secondary',
    styles: {
      background: 'transparent',
      color: 'var(--luxury-text-primary)',
      border: 'none',
    },
    accessibility: {
      role: 'button',
      'aria-label': 'Ghost action button',
    },
  },
  [BUTTON_VARIANTS.OUTLINE]: {
    className: 'border-2 border-luxury-accent-copper text-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white',
    styles: {
      background: 'transparent',
      color: 'var(--luxury-accent-copper)',
      border: '2px solid var(--luxury-accent-copper)',
    },
    accessibility: {
      role: 'button',
      'aria-label': 'Outline action button',
    },
  },
};

// Card variant configurations
export const CARD_VARIANT_CONFIGS = {
  [CARD_VARIANTS.DEFAULT]: {
    className: 'bg-luxury-background-secondary border border-luxury-accent-copper/20',
    styles: {
      background: 'var(--luxury-background-secondary)',
      border: '1px solid rgba(184, 134, 11, 0.2)',
      borderRadius: 'var(--luxury-radius-lg)',
    },
    accessibility: {
      role: 'article',
    },
  },
  [CARD_VARIANTS.ELEVATED]: {
    className: 'bg-luxury-background-secondary border border-luxury-accent-copper/30 shadow-luxury-lg',
    styles: {
      background: 'var(--luxury-background-secondary)',
      border: '1px solid rgba(184, 134, 11, 0.3)',
      boxShadow: 'var(--luxury-shadow-lg)',
      borderRadius: 'var(--luxury-radius-lg)',
    },
    accessibility: {
      role: 'article',
    },
  },
  [CARD_VARIANTS.GLASS]: {
    className: 'luxury-glass backdrop-blur-xl',
    styles: {
      background: 'rgba(42, 42, 42, 0.8)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(184, 134, 11, 0.2)',
      borderRadius: 'var(--luxury-radius-lg)',
    },
    accessibility: {
      role: 'article',
    },
  },
  [CARD_VARIANTS.MINIMAL]: {
    className: 'bg-transparent border border-luxury-accent-copper/10',
    styles: {
      background: 'transparent',
      border: '1px solid rgba(184, 134, 11, 0.1)',
      borderRadius: 'var(--luxury-radius-lg)',
    },
    accessibility: {
      role: 'article',
    },
  },
};

// Navigation variant configurations
export const NAVIGATION_VARIANT_CONFIGS = {
  [NAVIGATION_VARIANTS.DEFAULT]: {
    className: 'bg-luxury-background-secondary/80 backdrop-blur-xl border-b border-luxury-accent-copper/20',
    styles: {
      background: 'rgba(42, 42, 42, 0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(184, 134, 11, 0.2)',
    },
    accessibility: {
      role: 'navigation',
      'aria-label': 'Main navigation',
    },
  },
  [NAVIGATION_VARIANTS.STICKY]: {
    className: 'bg-luxury-background-secondary/95 backdrop-blur-xl border-b border-luxury-accent-copper/20 sticky top-0 z-50',
    styles: {
      background: 'rgba(42, 42, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(184, 134, 11, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    },
    accessibility: {
      role: 'navigation',
      'aria-label': 'Sticky navigation',
    },
  },
  [NAVIGATION_VARIANTS.FLOATING]: {
    className: 'bg-luxury-background-secondary/90 backdrop-blur-xl border border-luxury-accent-copper/20 rounded-luxury-lg shadow-luxury-lg',
    styles: {
      background: 'rgba(42, 42, 42, 0.9)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(184, 134, 11, 0.2)',
      borderRadius: 'var(--luxury-radius-lg)',
      boxShadow: 'var(--luxury-shadow-lg)',
    },
    accessibility: {
      role: 'navigation',
      'aria-label': 'Floating navigation',
    },
  },
};

// Typography variant configurations
export const TYPOGRAPHY_VARIANT_CONFIGS = {
  [TYPOGRAPHY_VARIANTS.DISPLAY]: {
    className: 'luxury-heading text-6xl md:text-7xl lg:text-8xl font-bold text-luxury-text-primary',
    styles: {
      fontFamily: 'var(--font-luxury-heading)',
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 700,
      color: 'var(--luxury-text-primary)',
      lineHeight: 1.1,
    },
    accessibility: {
      role: 'heading',
      'aria-level': 1,
    },
  },
  [TYPOGRAPHY_VARIANTS.HEADING]: {
    className: 'luxury-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-luxury-text-primary',
    styles: {
      fontFamily: 'var(--font-luxury-heading)',
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      fontWeight: 600,
      color: 'var(--luxury-text-primary)',
      lineHeight: 1.2,
    },
    accessibility: {
      role: 'heading',
      'aria-level': 2,
    },
  },
  [TYPOGRAPHY_VARIANTS.BODY]: {
    className: 'luxury-text text-base md:text-lg leading-relaxed text-luxury-text-primary',
    styles: {
      fontFamily: 'var(--font-luxury-body)',
      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
      fontWeight: 400,
      color: 'var(--luxury-text-primary)',
      lineHeight: 1.6,
    },
    accessibility: {
      role: 'text',
    },
  },
  [TYPOGRAPHY_VARIANTS.CAPTION]: {
    className: 'luxury-text text-sm md:text-base text-luxury-text-secondary',
    styles: {
      fontFamily: 'var(--font-luxury-body)',
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      fontWeight: 400,
      color: 'var(--luxury-text-secondary)',
      lineHeight: 1.5,
    },
    accessibility: {
      role: 'text',
    },
  },
};

// Animation variant configurations
export const ANIMATION_VARIANT_CONFIGS = {
  [ANIMATION_VARIANTS.FADE_IN]: {
    className: 'luxury-fade-in',
    styles: {
      animation: 'luxury-fade-in 0.6s ease-out forwards',
    },
    keyframes: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
  [ANIMATION_VARIANTS.SLIDE_UP]: {
    className: 'luxury-slide-up',
    styles: {
      animation: 'luxury-slide-up 0.6s ease-out forwards',
    },
    keyframes: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
  [ANIMATION_VARIANTS.SCALE]: {
    className: 'luxury-scale',
    styles: {
      animation: 'luxury-scale 0.6s ease-out forwards',
    },
    keyframes: {
      '0%': { opacity: 0, transform: 'scale(0.8)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    },
  },
  [ANIMATION_VARIANTS.STAGGER]: {
    className: 'luxury-stagger',
    styles: {
      animation: 'luxury-stagger 0.6s ease-out forwards',
    },
    keyframes: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
};

// Size variant configurations
export const SIZE_VARIANT_CONFIGS = {
  [SIZE_VARIANTS.XS]: {
    padding: '0.5rem',
    fontSize: '0.75rem',
    minHeight: '2rem',
  },
  [SIZE_VARIANTS.SM]: {
    padding: '0.75rem',
    fontSize: '0.875rem',
    minHeight: '2.5rem',
  },
  [SIZE_VARIANTS.MD]: {
    padding: '1rem',
    fontSize: '1rem',
    minHeight: '3rem',
  },
  [SIZE_VARIANTS.LG]: {
    padding: '1.25rem',
    fontSize: '1.125rem',
    minHeight: '3.5rem',
  },
  [SIZE_VARIANTS.XL]: {
    padding: '1.5rem',
    fontSize: '1.25rem',
    minHeight: '4rem',
  },
  [SIZE_VARIANTS['2XL']]: {
    padding: '2rem',
    fontSize: '1.5rem',
    minHeight: '5rem',
  },
};

// Color variant configurations
export const COLOR_VARIANT_CONFIGS = {
  [COLOR_VARIANTS.PRIMARY]: {
    color: 'var(--luxury-text-primary)',
    backgroundColor: 'var(--luxury-background-primary)',
  },
  [COLOR_VARIANTS.SECONDARY]: {
    color: 'var(--luxury-text-secondary)',
    backgroundColor: 'var(--luxury-background-secondary)',
  },
  [COLOR_VARIANTS.ACCENT]: {
    color: 'var(--luxury-accent-copper)',
    backgroundColor: 'transparent',
  },
  [COLOR_VARIANTS.SUCCESS]: {
    color: 'var(--luxury-success)',
    backgroundColor: 'transparent',
  },
  [COLOR_VARIANTS.WARNING]: {
    color: 'var(--luxury-warning)',
    backgroundColor: 'transparent',
  },
  [COLOR_VARIANTS.DANGER]: {
    color: 'var(--luxury-danger)',
    backgroundColor: 'transparent',
  },
  [COLOR_VARIANTS.INFO]: {
    color: 'var(--luxury-info)',
    backgroundColor: 'transparent',
  },
  [COLOR_VARIANTS.MUTED]: {
    color: 'var(--luxury-text-secondary)',
    backgroundColor: 'transparent',
  },
};

// Variant utility functions
export const luxuryVariantUtils = {
  /**
   * Get variant configuration
   */
  getVariantConfig: (component: string, variant: string): any => {
    const configs = {
      button: BUTTON_VARIANT_CONFIGS,
      card: CARD_VARIANT_CONFIGS,
      navigation: NAVIGATION_VARIANT_CONFIGS,
      typography: TYPOGRAPHY_VARIANT_CONFIGS,
      animation: ANIMATION_VARIANT_CONFIGS,
    };
    
    return (configs as any)[component]?.[variant] || {};
  },

  /**
   * Get size configuration
   */
  getSizeConfig: (size: string): any => {
    return (SIZE_VARIANT_CONFIGS as any)[size] || SIZE_VARIANT_CONFIGS[SIZE_VARIANTS.MD];
  },

  /**
   * Get color configuration
   */
  getColorConfig: (color: string): any => {
    return (COLOR_VARIANT_CONFIGS as any)[color] || COLOR_VARIANT_CONFIGS[COLOR_VARIANTS.PRIMARY];
  },

  /**
   * Combine variant configurations
   */
  combineVariants: (variants: any[]): any => {
    return variants.reduce((acc, variant) => ({ ...acc, ...variant }), {});
  },

  /**
   * Validate variant
   */
  validateVariant: (component: string, variant: string): boolean => {
    const validVariants = {
      button: Object.values(BUTTON_VARIANTS),
      card: Object.values(CARD_VARIANTS),
      navigation: Object.values(NAVIGATION_VARIANTS),
      typography: Object.values(TYPOGRAPHY_VARIANTS),
      animation: Object.values(ANIMATION_VARIANTS),
    };
    
    return (validVariants as any)[component]?.includes(variant) || false;
  },

  /**
   * Get all available variants for component
   */
  getAvailableVariants: (component: string): string[] => {
    const variants = {
      button: Object.values(BUTTON_VARIANTS),
      card: Object.values(CARD_VARIANTS),
      navigation: Object.values(NAVIGATION_VARIANTS),
      typography: Object.values(TYPOGRAPHY_VARIANTS),
      animation: Object.values(ANIMATION_VARIANTS),
    };
    
    return (variants as any)[component] || [];
  },
};

// Export variant system instance
export const luxuryVariantSystem = new LuxuryVariantSystem();

// Export all utilities
export const luxuryVariantUtilities = {
  system: luxuryVariantSystem,
  utils: luxuryVariantUtils,
  configs: {
    button: BUTTON_VARIANT_CONFIGS,
    card: CARD_VARIANT_CONFIGS,
    navigation: NAVIGATION_VARIANT_CONFIGS,
    typography: TYPOGRAPHY_VARIANT_CONFIGS,
    animation: ANIMATION_VARIANT_CONFIGS,
    size: SIZE_VARIANT_CONFIGS,
    color: COLOR_VARIANT_CONFIGS,
  },
};

export default luxuryVariantUtilities;
