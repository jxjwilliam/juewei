/**
 * Luxury Typography Responsive System
 * 
 * Provides responsive typography utilities for the luxury design system,
 * including breakpoint management, responsive sizing, and adaptive typography.
 */

import { luxuryTypographyScale, luxuryFontStacks } from './luxury-typography-system';

// Responsive breakpoints
export const luxuryResponsiveBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Responsive typography configurations
export const luxuryResponsiveTypography = {
  // Display typography responsive sizes
  display: {
    xs: { fontSize: '2rem', lineHeight: '2.5rem' },      // 32px / 40px
    sm: { fontSize: '2.5rem', lineHeight: '3rem' },     // 40px / 48px
    md: { fontSize: '3rem', lineHeight: '3.5rem' },     // 48px / 56px
    lg: { fontSize: '3.5rem', lineHeight: '4rem' },     // 56px / 64px
    xl: { fontSize: '4rem', lineHeight: '4.5rem' },      // 64px / 72px
    '2xl': { fontSize: '4.5rem', lineHeight: '5rem' },  // 72px / 80px
  },
  
  // Heading typography responsive sizes
  heading: {
    h1: {
      xs: { fontSize: '1.5rem', lineHeight: '2rem' },    // 24px / 32px
      sm: { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px / 36px
      md: { fontSize: '2.25rem', lineHeight: '2.5rem' }, // 36px / 40px
      lg: { fontSize: '2.5rem', lineHeight: '3rem' },   // 40px / 48px
      xl: { fontSize: '3rem', lineHeight: '3.5rem' },    // 48px / 56px
      '2xl': { fontSize: '3.5rem', lineHeight: '4rem' }, // 56px / 64px
    },
    h2: {
      xs: { fontSize: '1.25rem', lineHeight: '1.75rem' }, // 20px / 28px
      sm: { fontSize: '1.5rem', lineHeight: '2rem' },   // 24px / 32px
      md: { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px / 36px
      lg: { fontSize: '2.25rem', lineHeight: '2.5rem' }, // 36px / 40px
      xl: { fontSize: '2.5rem', lineHeight: '3rem' },   // 40px / 48px
      '2xl': { fontSize: '3rem', lineHeight: '3.5rem' }, // 48px / 56px
    },
    h3: {
      xs: { fontSize: '1.125rem', lineHeight: '1.5rem' }, // 18px / 24px
      sm: { fontSize: '1.25rem', lineHeight: '1.75rem' }, // 20px / 28px
      md: { fontSize: '1.5rem', lineHeight: '2rem' },   // 24px / 32px
      lg: { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px / 36px
      xl: { fontSize: '2.25rem', lineHeight: '2.5rem' }, // 36px / 40px
      '2xl': { fontSize: '2.5rem', lineHeight: '3rem' }, // 40px / 48px
    },
    h4: {
      xs: { fontSize: '1rem', lineHeight: '1.5rem' },    // 16px / 24px
      sm: { fontSize: '1.125rem', lineHeight: '1.5rem' }, // 18px / 24px
      md: { fontSize: '1.25rem', lineHeight: '1.75rem' }, // 20px / 28px
      lg: { fontSize: '1.5rem', lineHeight: '2rem' },   // 24px / 32px
      xl: { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px / 36px
      '2xl': { fontSize: '2.25rem', lineHeight: '2.5rem' }, // 36px / 40px
    },
    h5: {
      xs: { fontSize: '0.875rem', lineHeight: '1.25rem' }, // 14px / 20px
      sm: { fontSize: '1rem', lineHeight: '1.5rem' },     // 16px / 24px
      md: { fontSize: '1.125rem', lineHeight: '1.5rem' }, // 18px / 24px
      lg: { fontSize: '1.25rem', lineHeight: '1.75rem' }, // 20px / 28px
      xl: { fontSize: '1.5rem', lineHeight: '2rem' },    // 24px / 32px
      '2xl': { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px / 36px
    },
    h6: {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },   // 12px / 16px
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' }, // 14px / 20px
      md: { fontSize: '1rem', lineHeight: '1.5rem' },    // 16px / 24px
      lg: { fontSize: '1.125rem', lineHeight: '1.5rem' }, // 18px / 24px
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' }, // 20px / 28px
      '2xl': { fontSize: '1.5rem', lineHeight: '2rem' }, // 24px / 32px
    },
  },
  
  // Body typography responsive sizes
  body: {
    large: {
      xs: { fontSize: '1rem', lineHeight: '1.5rem' },    // 16px / 24px
      sm: { fontSize: '1.125rem', lineHeight: '1.75rem' }, // 18px / 28px
      md: { fontSize: '1.25rem', lineHeight: '1.875rem' }, // 20px / 30px
      lg: { fontSize: '1.375rem', lineHeight: '2rem' },  // 22px / 32px
      xl: { fontSize: '1.5rem', lineHeight: '2.25rem' }, // 24px / 36px
      '2xl': { fontSize: '1.625rem', lineHeight: '2.5rem' }, // 26px / 40px
    },
    base: {
      xs: { fontSize: '0.875rem', lineHeight: '1.25rem' }, // 14px / 20px
      sm: { fontSize: '1rem', lineHeight: '1.5rem' },     // 16px / 24px
      md: { fontSize: '1.125rem', lineHeight: '1.75rem' }, // 18px / 28px
      lg: { fontSize: '1.25rem', lineHeight: '1.875rem' }, // 20px / 30px
      xl: { fontSize: '1.375rem', lineHeight: '2rem' }, // 22px / 32px
      '2xl': { fontSize: '1.5rem', lineHeight: '2.25rem' }, // 24px / 36px
    },
    small: {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },   // 12px / 16px
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' }, // 14px / 20px
      md: { fontSize: '1rem', lineHeight: '1.5rem' },    // 16px / 24px
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' }, // 18px / 28px
      xl: { fontSize: '1.25rem', lineHeight: '1.875rem' }, // 20px / 30px
      '2xl': { fontSize: '1.375rem', lineHeight: '2rem' }, // 22px / 32px
    },
  },
  
  // Accent typography responsive sizes
  accent: {
    xs: { fontSize: '1rem', lineHeight: '1.5rem' },      // 16px / 24px
    sm: { fontSize: '1.125rem', lineHeight: '1.75rem' }, // 18px / 28px
    md: { fontSize: '1.25rem', lineHeight: '1.875rem' }, // 20px / 30px
    lg: { fontSize: '1.375rem', lineHeight: '2rem' },    // 22px / 32px
    xl: { fontSize: '1.5rem', lineHeight: '2.25rem' },  // 24px / 36px
    '2xl': { fontSize: '1.625rem', lineHeight: '2.5rem' }, // 26px / 40px
  },
  
  // Caption typography responsive sizes
  caption: {
    xs: { fontSize: '0.625rem', lineHeight: '0.875rem' }, // 10px / 14px
    sm: { fontSize: '0.75rem', lineHeight: '1rem' },    // 12px / 16px
    md: { fontSize: '0.875rem', lineHeight: '1.25rem' },  // 14px / 20px
    lg: { fontSize: '1rem', lineHeight: '1.5rem' },      // 16px / 24px
    xl: { fontSize: '1.125rem', lineHeight: '1.75rem' }, // 18px / 28px
    '2xl': { fontSize: '1.25rem', lineHeight: '1.875rem' }, // 20px / 30px
  },
};

// Luxury responsive typography utilities
export class LuxuryResponsiveTypography {
  /**
   * Get responsive typography configuration
   */
  static getResponsiveConfig(
    type: 'display' | 'heading' | 'body' | 'accent' | 'caption',
    variant?: string
  ) {
    switch (type) {
      case 'display':
        return luxuryResponsiveTypography.display;
      case 'heading':
        return variant ? luxuryResponsiveTypography.heading[variant as keyof typeof luxuryResponsiveTypography.heading] : luxuryResponsiveTypography.heading.h1;
      case 'body':
        return variant ? luxuryResponsiveTypography.body[variant as keyof typeof luxuryResponsiveTypography.body] : luxuryResponsiveTypography.body.base;
      case 'accent':
        return luxuryResponsiveTypography.accent;
      case 'caption':
        return luxuryResponsiveTypography.caption;
      default:
        return luxuryResponsiveTypography.body.base;
    }
  }

  /**
   * Generate responsive typography classes
   */
  static generateResponsiveClasses(
    type: 'display' | 'heading' | 'body' | 'accent' | 'caption',
    variant?: string
  ): string {
    const config = this.getResponsiveConfig(type, variant);
    const classes = [];
    
    // Base classes
    classes.push('luxury-typography-responsive');
    
    // Responsive classes for each breakpoint
    Object.entries(config).forEach(([breakpoint, styles]) => {
      const prefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
      classes.push(`${prefix}text-${styles.fontSize.replace('rem', '').replace('.', '')}`);
      classes.push(`${prefix}leading-${styles.lineHeight.replace('rem', '').replace('.', '')}`);
    });
    
    return classes.join(' ');
  }

  /**
   * Get typography size for specific breakpoint
   */
  static getSizeForBreakpoint(
    type: 'display' | 'heading' | 'body' | 'accent' | 'caption',
    breakpoint: keyof typeof luxuryResponsiveBreakpoints,
    variant?: string
  ) {
    const config = this.getResponsiveConfig(type, variant);
    return config[breakpoint] || config.xs;
  }

  /**
   * Calculate responsive font size
   */
  static calculateResponsiveFontSize(
    baseSize: number,
    breakpoint: keyof typeof luxuryResponsiveBreakpoints,
    scale: number = 1.2
  ): number {
    const breakpointIndex = Object.keys(luxuryResponsiveBreakpoints).indexOf(breakpoint);
    return Math.round(baseSize * Math.pow(scale, breakpointIndex));
  }

  /**
   * Generate fluid typography
   */
  static generateFluidTypography(
    minSize: number,
    maxSize: number,
    minWidth: number = 320,
    maxWidth: number = 1200
  ): string {
    const minSizeRem = minSize / 16;
    const maxSizeRem = maxSize / 16;
    const minWidthRem = minWidth / 16;
    const maxWidthRem = maxWidth / 16;
    
    return `clamp(${minSizeRem}rem, ${minSizeRem}rem + (${maxSizeRem} - ${minSizeRem}) * ((100vw - ${minWidthRem}rem) / (${maxWidthRem} - ${minWidthRem})), ${maxSizeRem}rem)`;
  }

  /**
   * Get responsive line height
   */
  static getResponsiveLineHeight(
    fontSize: number,
    breakpoint: keyof typeof luxuryResponsiveBreakpoints
  ): number {
    const lineHeightMultipliers = {
      xs: 1.2,
      sm: 1.3,
      md: 1.4,
      lg: 1.5,
      xl: 1.6,
      '2xl': 1.7,
    };
    
    return Math.round(fontSize * lineHeightMultipliers[breakpoint]);
  }

  /**
   * Generate responsive typography CSS
   */
  static generateResponsiveCSS(
    type: 'display' | 'heading' | 'body' | 'accent' | 'caption',
    variant?: string
  ): string {
    const config = this.getResponsiveConfig(type, variant);
    let css = '';
    
    Object.entries(config).forEach(([breakpoint, styles]) => {
      const mediaQuery = breakpoint === 'xs' 
        ? '' 
        : `@media (min-width: ${luxuryResponsiveBreakpoints[breakpoint as keyof typeof luxuryResponsiveBreakpoints]}px)`;
      
      css += `${mediaQuery} {
        .luxury-typography-responsive {
          font-size: ${styles.fontSize};
          line-height: ${styles.lineHeight};
        }
      }`;
    });
    
    return css;
  }

  /**
   * Check if typography is responsive
   */
  static isResponsive(classes: string): boolean {
    return classes.includes('luxury-typography-responsive');
  }

  /**
   * Get typography breakpoints
   */
  static getBreakpoints(): typeof luxuryResponsiveBreakpoints {
    return luxuryResponsiveBreakpoints;
  }

  /**
   * Generate typography scale
   */
  static generateTypographyScale(
    baseSize: number = 16,
    scale: number = 1.2
  ): Record<string, number> {
    const scaleMap: Record<string, number> = {};
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    
    sizes.forEach((size, index) => {
      scaleMap[size] = Math.round(baseSize * Math.pow(scale, index));
    });
    
    return scaleMap;
  }
}

// Luxury responsive typography variants
export const luxuryResponsiveTypographyVariants = {
  // Display responsive typography
  Display: (props: { children: React.ReactNode; className?: string }) => {
    return null; // JSX not allowed in .ts files
  },
  
  // Heading responsive typography
  Heading: (props: { children: React.ReactNode; level: 1 | 2 | 3 | 4 | 5 | 6; className?: string }) => {
    return null; // JSX not allowed in .ts files
  },
  
  // Body responsive typography
  Body: (props: { children: React.ReactNode; size?: 'large' | 'base' | 'small'; className?: string }) => {
    return null; // JSX not allowed in .ts files
  },
  
  // Accent responsive typography
  Accent: (props: { children: React.ReactNode; className?: string }) => {
    return null; // JSX not allowed in .ts files
  },
  
  // Caption responsive typography
  Caption: (props: { children: React.ReactNode; className?: string }) => {
    return null; // JSX not allowed in .ts files
  },
};

// Export all utilities
export default {
  LuxuryResponsiveTypography,
  luxuryResponsiveBreakpoints,
  luxuryResponsiveTypography,
  luxuryResponsiveTypographyVariants,
};
