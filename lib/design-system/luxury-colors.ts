/**
 * Luxury Color Palette
 * 
 * Defines the luxury color system with dark backgrounds and warm accents
 * for the Juewei luxury brand experience.
 */

export interface LuxuryColorPalette {
  primaryBackground: string;
  secondaryBackground: string;
  accentCopper: string;
  accentGold: string;
  spiceRed: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
}

export const luxuryColors: LuxuryColorPalette = {
  // Deep charcoal backgrounds for sophisticated contrast
  primaryBackground: '#1A1A1A',
  secondaryBackground: '#2A2A2A',
  
  // Warm metallic accents for premium feel
  accentCopper: '#B8860B',
  accentGold: '#D4AF37',
  
  // Chili-inspired red for spice indicators and CTAs
  spiceRed: '#D43D2A',
  
  // Off-white/cream text for luxury aesthetic
  textPrimary: '#F5F5F5',
  textSecondary: '#CCCCCC',
  textAccent: '#B8860B',
};

export const luxuryColorVariants = {
  // High contrast variants for accessibility
  highContrast: {
    primaryBackground: '#000000',
    secondaryBackground: '#1A1A1A',
    textPrimary: '#FFFFFF',
    textSecondary: '#E0E0E0',
    accentCopper: '#FFD700',
    accentGold: '#FFA500',
    spiceRed: '#FF0000',
  },
  
  // Mobile optimized variants
  mobile: {
    primaryBackground: '#1A1A1A',
    secondaryBackground: '#2A2A2A',
    textPrimary: '#F5F5F5',
    textSecondary: '#CCCCCC',
    accentCopper: '#B8860B',
    accentGold: '#D4AF37',
    spiceRed: '#D43D2A',
  },
} as const;

export const luxuryColorUtils = {
  /**
   * Get luxury color with fallback
   */
  getColor: (color: keyof LuxuryColorPalette, variant: 'default' | 'highContrast' | 'mobile' = 'default'): string => {
    if (variant === 'highContrast') {
      return luxuryColorVariants.highContrast[color] || luxuryColors[color];
    }
    if (variant === 'mobile') {
      return luxuryColorVariants.mobile[color] || luxuryColors[color];
    }
    return luxuryColors[color];
  },

  /**
   * Check if color combination meets WCAG 2.1 AA standards
   */
  checkContrast: (foreground: string, background: string): boolean => {
    // Simplified contrast check - in production, use a proper contrast library
    const fgLuminance = getLuminance(foreground);
    const bgLuminance = getLuminance(background);
    const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
    return contrast >= 4.5; // WCAG 2.1 AA standard
  },

  /**
   * Generate CSS custom properties for luxury colors
   */
  generateCSSVariables: (variant: 'default' | 'highContrast' | 'mobile' = 'default'): Record<string, string> => {
    const colors = variant === 'highContrast' ? luxuryColorVariants.highContrast :
                   variant === 'mobile' ? luxuryColorVariants.mobile : luxuryColors;
    
    return {
      '--luxury-bg-primary': colors.primaryBackground,
      '--luxury-bg-secondary': colors.secondaryBackground,
      '--luxury-accent-copper': colors.accentCopper,
      '--luxury-accent-gold': colors.accentGold,
      '--luxury-spice-red': colors.spiceRed,
      '--luxury-text-primary': colors.textPrimary,
      '--luxury-text-secondary': colors.textSecondary,
      '--luxury-text-accent': colors.textAccent,
    };
  },
};

/**
 * Calculate relative luminance of a color
 */
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export default luxuryColors;
