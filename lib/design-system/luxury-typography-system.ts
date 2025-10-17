/**
 * Luxury Typography System
 * 
 * Provides a comprehensive typography system for the luxury design system,
 * including font stacks, sizing, spacing, and text effects.
 */

// Luxury font stacks
export const luxuryFontStacks = {
  heading: {
    primary: 'Playfair Display, Lora, Merriweather, serif',
    secondary: 'Cormorant Garamond, Georgia, serif',
    accent: 'Cinzel, Playfair Display, serif',
  },
  body: {
    primary: 'Inter, Montserrat, Roboto, sans-serif',
    secondary: 'Source Sans Pro, Open Sans, sans-serif',
    accent: 'Poppins, Inter, sans-serif',
  },
  mono: {
    primary: 'JetBrains Mono, Fira Code, monospace',
    secondary: 'Source Code Pro, Consolas, monospace',
  },
  chinese: {
    primary: 'Source Han Sans, Noto Sans CJK SC, sans-serif',
    serif: 'Source Han Serif, Noto Serif CJK SC, serif',
  },
};

// Luxury typography scale
export const luxuryTypographyScale = {
  // Font sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },
  
  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Luxury typography presets
export const luxuryTypographyPresets = {
  // Display typography
  display: {
    fontFamily: luxuryFontStacks.heading.primary,
    fontSize: luxuryTypographyScale.fontSize['6xl'],
    fontWeight: luxuryTypographyScale.fontWeight.bold,
    lineHeight: luxuryTypographyScale.lineHeight.tight,
    letterSpacing: luxuryTypographyScale.letterSpacing.tight,
  },
  
  // Heading typography
  heading: {
    h1: {
      fontFamily: luxuryFontStacks.heading.primary,
      fontSize: luxuryTypographyScale.fontSize['5xl'],
      fontWeight: luxuryTypographyScale.fontWeight.bold,
      lineHeight: luxuryTypographyScale.lineHeight.tight,
      letterSpacing: luxuryTypographyScale.letterSpacing.tight,
    },
    h2: {
      fontFamily: luxuryFontStacks.heading.primary,
      fontSize: luxuryTypographyScale.fontSize['4xl'],
      fontWeight: luxuryTypographyScale.fontWeight.semibold,
      lineHeight: luxuryTypographyScale.lineHeight.tight,
      letterSpacing: luxuryTypographyScale.letterSpacing.tight,
    },
    h3: {
      fontFamily: luxuryFontStacks.heading.primary,
      fontSize: luxuryTypographyScale.fontSize['3xl'],
      fontWeight: luxuryTypographyScale.fontWeight.semibold,
      lineHeight: luxuryTypographyScale.lineHeight.snug,
      letterSpacing: luxuryTypographyScale.letterSpacing.normal,
    },
    h4: {
      fontFamily: luxuryFontStacks.heading.primary,
      fontSize: luxuryTypographyScale.fontSize['2xl'],
      fontWeight: luxuryTypographyScale.fontWeight.medium,
      lineHeight: luxuryTypographyScale.lineHeight.snug,
      letterSpacing: luxuryTypographyScale.letterSpacing.normal,
    },
    h5: {
      fontFamily: luxuryFontStacks.heading.primary,
      fontSize: luxuryTypographyScale.fontSize.xl,
      fontWeight: luxuryTypographyScale.fontWeight.medium,
      lineHeight: luxuryTypographyScale.lineHeight.normal,
      letterSpacing: luxuryTypographyScale.letterSpacing.normal,
    },
    h6: {
      fontFamily: luxuryFontStacks.heading.primary,
      fontSize: luxuryTypographyScale.fontSize.lg,
      fontWeight: luxuryTypographyScale.fontWeight.medium,
      lineHeight: luxuryTypographyScale.lineHeight.normal,
      letterSpacing: luxuryTypographyScale.letterSpacing.normal,
    },
  },
  
  // Body typography
  body: {
    large: {
      fontFamily: luxuryFontStacks.body.primary,
      fontSize: luxuryTypographyScale.fontSize.lg,
      fontWeight: luxuryTypographyScale.fontWeight.normal,
      lineHeight: luxuryTypographyScale.lineHeight.relaxed,
      letterSpacing: luxuryTypographyScale.letterSpacing.normal,
    },
    base: {
      fontFamily: luxuryFontStacks.body.primary,
      fontSize: luxuryTypographyScale.fontSize.base,
      fontWeight: luxuryTypographyScale.fontWeight.normal,
      lineHeight: luxuryTypographyScale.lineHeight.normal,
      letterSpacing: luxuryTypographyScale.letterSpacing.normal,
    },
    small: {
      fontFamily: luxuryFontStacks.body.primary,
      fontSize: luxuryTypographyScale.fontSize.sm,
      fontWeight: luxuryTypographyScale.fontWeight.normal,
      lineHeight: luxuryTypographyScale.lineHeight.normal,
      letterSpacing: luxuryTypographyScale.letterSpacing.normal,
    },
  },
  
  // Accent typography
  accent: {
    fontFamily: luxuryFontStacks.heading.accent,
    fontSize: luxuryTypographyScale.fontSize.xl,
    fontWeight: luxuryTypographyScale.fontWeight.semibold,
    lineHeight: luxuryTypographyScale.lineHeight.tight,
    letterSpacing: luxuryTypographyScale.letterSpacing.wide,
  },
  
  // Caption typography
  caption: {
    fontFamily: luxuryFontStacks.body.primary,
    fontSize: luxuryTypographyScale.fontSize.xs,
    fontWeight: luxuryTypographyScale.fontWeight.medium,
    lineHeight: luxuryTypographyScale.lineHeight.normal,
    letterSpacing: luxuryTypographyScale.letterSpacing.wide,
  },
};

// Luxury text effects
export const luxuryTextEffects = {
  // Gradient text
  gradient: {
    primary: 'bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold bg-clip-text text-transparent',
    secondary: 'bg-gradient-to-r from-luxury-spice to-luxury-accent-copper bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-luxury-accent-gold to-luxury-spice bg-clip-text text-transparent',
  },
  
  // Text shadows
  shadow: {
    sm: 'text-shadow-sm',
    md: 'text-shadow-md',
    lg: 'text-shadow-lg',
    xl: 'text-shadow-xl',
  },
  
  // Text animations
  animation: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
    slideLeft: 'animate-slide-left',
    slideRight: 'animate-slide-right',
    scale: 'animate-scale',
    bounce: 'animate-bounce',
  },
};

// Luxury typography utilities
export class LuxuryTypography {
  /**
   * Get typography preset
   */
  static getPreset(preset: keyof typeof luxuryTypographyPresets) {
    return luxuryTypographyPresets[preset];
  }

  /**
   * Get heading preset
   */
  static getHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    return luxuryTypographyPresets.heading[`h${level}` as keyof typeof luxuryTypographyPresets.heading];
  }

  /**
   * Get body preset
   */
  static getBody(size: 'large' | 'base' | 'small' = 'base') {
    return luxuryTypographyPresets.body[size];
  }

  /**
   * Generate typography classes
   */
  static generateClasses(preset: any): string {
    const classes = [];
    
    if (preset.fontFamily) {
      classes.push(`font-${preset.fontFamily.replace(/\s+/g, '-').toLowerCase()}`);
    }
    
    if (preset.fontSize) {
      classes.push(`text-${preset.fontSize.replace('rem', '').replace('.', '')}`);
    }
    
    if (preset.fontWeight) {
      classes.push(`font-${preset.fontWeight}`);
    }
    
    if (preset.lineHeight) {
      classes.push(`leading-${preset.lineHeight.replace('.', '')}`);
    }
    
    if (preset.letterSpacing) {
      classes.push(`tracking-${preset.letterSpacing.replace('-', '').replace('.', '')}`);
    }
    
    return classes.join(' ');
  }

  /**
   * Get responsive typography
   */
  static getResponsive(preset: any, breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') {
    const responsivePresets = {
      sm: { ...preset, fontSize: luxuryTypographyScale.fontSize.sm },
      md: { ...preset, fontSize: luxuryTypographyScale.fontSize.base },
      lg: { ...preset, fontSize: luxuryTypographyScale.fontSize.lg },
      xl: { ...preset, fontSize: luxuryTypographyScale.fontSize.xl },
      '2xl': { ...preset, fontSize: luxuryTypographyScale.fontSize['2xl'] },
    };
    
    return responsivePresets[breakpoint];
  }

  /**
   * Get typography for Chinese text
   */
  static getChinese(preset: any) {
    return {
      ...preset,
      fontFamily: luxuryFontStacks.chinese.primary,
    };
  }
}

// Luxury typography variants
export const luxuryTypographyVariants = {
  // Display typography
  Display: (props: { children: React.ReactNode; className?: string }) => (
    <div className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.display)} ${props.className || ''}`}>
      {props.children}
    </div>
  ),
  
  // Heading typography
  H1: (props: { children: React.ReactNode; className?: string }) => (
    <h1 className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.heading.h1)} ${props.className || ''}`}>
      {props.children}
    </h1>
  ),
  
  H2: (props: { children: React.ReactNode; className?: string }) => (
    <h2 className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.heading.h2)} ${props.className || ''}`}>
      {props.children}
    </h2>
  ),
  
  H3: (props: { children: React.ReactNode; className?: string }) => (
    <h3 className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.heading.h3)} ${props.className || ''}`}>
      {props.children}
    </h3>
  ),
  
  H4: (props: { children: React.ReactNode; className?: string }) => (
    <h4 className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.heading.h4)} ${props.className || ''}`}>
      {props.children}
    </h4>
  ),
  
  H5: (props: { children: React.ReactNode; className?: string }) => (
    <h5 className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.heading.h5)} ${props.className || ''}`}>
      {props.children}
    </h5>
  ),
  
  H6: (props: { children: React.ReactNode; className?: string }) => (
    <h6 className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.heading.h6)} ${props.className || ''}`}>
      {props.children}
    </h6>
  ),
  
  // Body typography
  Body: (props: { children: React.ReactNode; size?: 'large' | 'base' | 'small'; className?: string }) => (
    <p className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.body[props.size || 'base'])} ${props.className || ''}`}>
      {props.children}
    </p>
  ),
  
  // Accent typography
  Accent: (props: { children: React.ReactNode; className?: string }) => (
    <span className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.accent)} ${props.className || ''}`}>
      {props.children}
    </span>
  ),
  
  // Caption typography
  Caption: (props: { children: React.ReactNode; className?: string }) => (
    <span className={`${LuxuryTypography.generateClasses(luxuryTypographyPresets.caption)} ${props.className || ''}`}>
      {props.children}
    </span>
  ),
};

// Export all utilities
export default {
  LuxuryTypography,
  luxuryFontStacks,
  luxuryTypographyScale,
  luxuryTypographyPresets,
  luxuryTextEffects,
  luxuryTypographyVariants,
};
