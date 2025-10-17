/**
 * Luxury Design System
 * 
 * Centralized exports for the luxury design system components and utilities.
 * This is the main entry point for the luxury design system.
 */

// Core design system components
export { luxuryColors, luxuryColorVariants, luxuryColorUtils } from './luxury-colors';
export { luxuryTypography, luxuryTypographyVariants, luxuryTypographyUtils } from './luxury-typography';
export { luxuryAnimations, luxuryAnimationVariants, luxuryAnimationUtils } from './luxury-animations';

// Font system
export { luxuryFonts, luxuryHeadingFont, luxuryBodyFont, luxuryFontUtils } from '../fonts/luxury-fonts';

// Re-export types for convenience
export type { LuxuryColorPalette } from './luxury-colors';
export type { LuxuryTypography } from './luxury-typography';
export type { LuxuryAnimation } from './luxury-animations';

// Design system configuration
export const luxuryDesignSystem = {
  colors: luxuryColors,
  typography: luxuryTypography,
  animations: luxuryAnimations,
  fonts: luxuryFonts,
} as const;

// Utility functions for the design system
export const luxuryDesignSystemUtils = {
  /**
   * Get the complete design system configuration
   */
  getDesignSystem: () => luxuryDesignSystem,

  /**
   * Get design system for a specific variant
   */
  getDesignSystemVariant: (variant: 'default' | 'mobile' | 'highContrast' | 'reducedMotion' | 'highPerformance') => {
    return {
      colors: luxuryColorUtils.getColor,
      typography: luxuryTypographyUtils.getTypography(variant),
      animations: luxuryAnimationUtils.getAnimation,
      fonts: luxuryFonts,
    };
  },

  /**
   * Generate CSS variables for the design system
   */
  generateCSSVariables: (variant: 'default' | 'mobile' | 'highContrast' = 'default') => {
    const colorVars = luxuryColorUtils.generateCSSVariables(variant);
    const typographyVars = luxuryTypographyUtils.generateTypographyClasses(variant);
    
    return {
      ...colorVars,
      '--luxury-heading-font': typographyVars.heading.fontFamily,
      '--luxury-body-font': typographyVars.body.fontFamily,
    };
  },

  /**
   * Check if the design system is properly loaded
   */
  isDesignSystemLoaded: () => {
    if (typeof window === 'undefined') return false;
    
    try {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      // Check if luxury CSS variables are available
      const hasLuxuryVars = computedStyle.getPropertyValue('--luxury-bg-primary') !== '';
      const hasLuxuryFonts = luxuryFontUtils.isFontLoaded('Playfair Display') && 
                            luxuryFontUtils.isFontLoaded('Inter');
      
      return hasLuxuryVars && hasLuxuryFonts;
    } catch {
      return false;
    }
  },

  /**
   * Initialize the luxury design system
   */
  initialize: () => {
    if (typeof window === 'undefined') return;
    
    // Add CSS variables to root
    const root = document.documentElement;
    const cssVars = luxuryDesignSystemUtils.generateCSSVariables();
    
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Preload fonts
    luxuryFontUtils.preloadFonts();
    
    // Monitor performance
    luxuryAnimationUtils.monitorPerformance((fps) => {
      if (fps < 30) {
        console.warn('Luxury design system: Low FPS detected, consider reducing animations');
      }
    });
  },

  /**
   * Get responsive design system configuration
   */
  getResponsiveConfig: () => {
    return {
      breakpoints: {
        mobile: '640px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1280px',
      },
      typography: luxuryTypographyUtils.generateResponsiveTypography(),
      animations: luxuryAnimationUtils.generateCSSAnimations(),
    };
  },

  /**
   * Validate design system configuration
   */
  validate: () => {
    const errors: string[] = [];
    
    // Validate colors
    Object.entries(luxuryColors).forEach(([key, value]) => {
      if (!value || typeof value !== 'string') {
        errors.push(`Invalid color value for ${key}: ${value}`);
      }
    });
    
    // Validate typography
    if (!luxuryTypography.headingFont || !luxuryTypography.bodyFont) {
      errors.push('Typography fonts are not properly configured');
    }
    
    // Validate animations
    Object.entries(luxuryAnimations).forEach(([key, animation]) => {
      if (animation.duration < 0 || animation.duration > 5) {
        errors.push(`Invalid animation duration for ${key}: ${animation.duration}`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// Default export
export default luxuryDesignSystem;

// Export for easy importing
export * from './luxury-colors';
export * from './luxury-typography';
export * from './luxury-animations';
export * from './luxury-mobile-typography';
export * from './luxury-mobile-images';
export * from './luxury-mobile-performance';
export * from './luxury-mobile-accessibility';
export * from './luxury-mobile-testing';
export * from '../fonts/luxury-fonts';