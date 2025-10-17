/**
 * Luxury Typography System
 * 
 * Defines the luxury typography system with serif headings and sans-serif body text
 * for the Juewei luxury brand experience.
 */

export interface LuxuryTypography {
  headingFont: string;
  bodyFont: string;
  headingSizes: Record<string, string>;
  bodySizes: Record<string, string>;
  lineHeights: Record<string, string>;
  fontWeights: Record<string, number>;
}

export const luxuryTypography: LuxuryTypography = {
  // Elegant serif font for headings
  headingFont: 'Playfair Display, Lora, Merriweather, serif',
  
  // Clean sans-serif font for body text
  bodyFont: 'Inter, Montserrat, Roboto, sans-serif',
  
  // Responsive heading sizes
  headingSizes: {
    h1: '4xl', // 2.25rem
    h2: '3xl', // 1.875rem
    h3: '2xl', // 1.5rem
    h4: 'xl',  // 1.25rem
    h5: 'lg',  // 1.125rem
    h6: 'base', // 1rem
  },
  
  // Responsive body text sizes
  bodySizes: {
    base: 'base',    // 1rem
    lg: 'lg',        // 1.125rem
    xl: 'xl',        // 1.25rem
    '2xl': '2xl',    // 1.5rem
    '3xl': '3xl',    // 1.875rem
  },
  
  // Line height values for readability
  lineHeights: {
    tight: '1.2',
    normal: '1.6',
    relaxed: '1.8',
  },
  
  // Font weight values for hierarchy
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

export const luxuryTypographyVariants = {
  // Mobile optimized typography
  mobile: {
    headingSizes: {
      h1: '3xl', // 1.875rem
      h2: '2xl', // 1.5rem
      h3: 'xl',  // 1.25rem
      h4: 'lg',  // 1.125rem
      h5: 'base', // 1rem
      h6: 'sm',  // 0.875rem
    },
    bodySizes: {
      base: 'sm',    // 0.875rem
      lg: 'base',    // 1rem
      xl: 'lg',      // 1.125rem
      '2xl': 'xl',   // 1.25rem
      '3xl': '2xl',  // 1.5rem
    },
    lineHeights: {
      tight: '1.1',
      normal: '1.5',
      relaxed: '1.7',
    },
  },
  
  // High contrast typography for accessibility
  highContrast: {
    headingSizes: {
      h1: '5xl', // 3rem
      h2: '4xl', // 2.25rem
      h3: '3xl', // 1.875rem
      h4: '2xl', // 1.5rem
      h5: 'xl',  // 1.25rem
      h6: 'lg',  // 1.125rem
    },
    bodySizes: {
      base: 'lg',    // 1.125rem
      lg: 'xl',      // 1.25rem
      xl: '2xl',     // 1.5rem
      '2xl': '3xl',  // 1.875rem
      '3xl': '4xl',  // 2.25rem
    },
    lineHeights: {
      tight: '1.3',
      normal: '1.7',
      relaxed: '1.9',
    },
  },
} as const;

export const luxuryTypographyUtils = {
  /**
   * Get typography configuration for a specific variant
   */
  getTypography: (variant: 'default' | 'mobile' | 'highContrast' = 'default') => {
    if (variant === 'mobile') {
      return {
        ...luxuryTypography,
        ...luxuryTypographyVariants.mobile,
      };
    }
    if (variant === 'highContrast') {
      return {
        ...luxuryTypography,
        ...luxuryTypographyVariants.highContrast,
      };
    }
    return luxuryTypography;
  },

  /**
   * Generate CSS classes for luxury typography
   */
  generateTypographyClasses: (variant: 'default' | 'mobile' | 'highContrast' = 'default') => {
    const typography = luxuryTypographyUtils.getTypography(variant);
    
    return {
      heading: {
        fontFamily: typography.headingFont,
        fontWeight: typography.fontWeights.semibold,
        lineHeight: typography.lineHeights.tight,
      },
      body: {
        fontFamily: typography.bodyFont,
        fontWeight: typography.fontWeights.normal,
        lineHeight: typography.lineHeights.normal,
      },
      caption: {
        fontFamily: typography.bodyFont,
        fontWeight: typography.fontWeights.medium,
        lineHeight: typography.lineHeights.normal,
      },
    };
  },

  /**
   * Generate responsive typography classes
   */
  generateResponsiveTypography: () => {
    return {
      'luxury-heading-1': 'text-4xl md:text-5xl lg:text-6xl font-luxury-heading font-semibold leading-tight',
      'luxury-heading-2': 'text-3xl md:text-4xl lg:text-5xl font-luxury-heading font-semibold leading-tight',
      'luxury-heading-3': 'text-2xl md:text-3xl lg:text-4xl font-luxury-heading font-semibold leading-tight',
      'luxury-body-lg': 'text-lg md:text-xl lg:text-2xl font-luxury-body leading-relaxed',
      'luxury-body': 'text-base md:text-lg lg:text-xl font-luxury-body leading-normal',
      'luxury-caption': 'text-sm md:text-base lg:text-lg font-luxury-body font-medium leading-normal',
    };
  },

  /**
   * Check if font is loaded
   */
  isFontLoaded: (fontFamily: string): boolean => {
    if (typeof document === 'undefined') return false;
    
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return false;
      
      // Test font loading by comparing metrics
      context.font = `12px ${fontFamily}`;
      const testText = 'Test';
      const metrics1 = context.measureText(testText);
      
      context.font = '12px monospace';
      const metrics2 = context.measureText(testText);
      
      return metrics1.width !== metrics2.width;
    } catch {
      return false;
    }
  },

  /**
   * Generate font loading CSS
   */
  generateFontLoadingCSS: () => {
    return `
      @font-face {
        font-family: 'Playfair Display';
        font-style: normal;
        font-weight: 400 700;
        font-display: swap;
        src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
      }
      
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300 800;
        font-display: swap;
        src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      }
      
      .font-luxury-heading {
        font-family: ${luxuryTypography.headingFont};
      }
      
      .font-luxury-body {
        font-family: ${luxuryTypography.bodyFont};
      }
    `;
  },
};

export default luxuryTypography;
