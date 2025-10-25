/**
 * Luxury Color Utilities
 * 
 * Advanced color manipulation and utility functions for the luxury design system.
 * Provides color conversion, contrast checking, and theme generation utilities.
 */

import { luxuryColors, luxuryColorVariants, luxuryColorUtils } from './luxury-colors';

// Color conversion utilities
export const luxuryColorConversion = {
  /**
   * Convert hex color to RGB
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
   * Convert RGB to hex
   */
  rgbToHex: (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  },

  /**
   * Convert RGB to HSL
   */
  rgbToHsl: (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  },

  /**
   * Convert HSL to RGB
   */
  hslToRgb: (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  },
};

// Color manipulation utilities
export const luxuryColorManipulation = {
  /**
   * Lighten a color by a percentage
   */
  lighten: (hex: string, percent: number): string => {
    const rgb = luxuryColorConversion.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newL = Math.min(100, hsl.l + percent);
    const newRgb = luxuryColorConversion.hslToRgb(hsl.h, hsl.s, newL);

    return luxuryColorConversion.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  },

  /**
   * Darken a color by a percentage
   */
  darken: (hex: string, percent: number): string => {
    const rgb = luxuryColorConversion.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newL = Math.max(0, hsl.l - percent);
    const newRgb = luxuryColorConversion.hslToRgb(hsl.h, hsl.s, newL);

    return luxuryColorConversion.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  },

  /**
   * Adjust color saturation
   */
  saturate: (hex: string, percent: number): string => {
    const rgb = luxuryColorConversion.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newS = Math.min(100, Math.max(0, hsl.s + percent));
    const newRgb = luxuryColorConversion.hslToRgb(hsl.h, newS, hsl.l);

    return luxuryColorConversion.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  },

  /**
   * Adjust color hue
   */
  adjustHue: (hex: string, degrees: number): string => {
    const rgb = luxuryColorConversion.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newH = (hsl.h + degrees) % 360;
    const newRgb = luxuryColorConversion.hslToRgb(newH, hsl.s, hsl.l);

    return luxuryColorConversion.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  },

  /**
   * Mix two colors
   */
  mix: (color1: string, color2: string, weight: number = 0.5): string => {
    const rgb1 = luxuryColorConversion.hexToRgb(color1);
    const rgb2 = luxuryColorConversion.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return color1;

    const r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight);
    const g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight);
    const b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight);

    return luxuryColorConversion.rgbToHex(r, g, b);
  },
};

// Color palette generation utilities
export const luxuryColorPaletteGeneration = {
  /**
   * Generate a monochromatic color palette
   */
  generateMonochromatic: (baseColor: string, steps: number = 5): string[] => {
    const palette = [];
    const stepSize = 100 / (steps - 1);

    for (let i = 0; i < steps; i++) {
      const lightness = i * stepSize;
      const rgb = luxuryColorConversion.hexToRgb(baseColor);
      if (!rgb) continue;

      const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
      const newRgb = luxuryColorConversion.hslToRgb(hsl.h, hsl.s, lightness);
      palette.push(luxuryColorConversion.rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }

    return palette;
  },

  /**
   * Generate an analogous color palette
   */
  generateAnalogous: (baseColor: string, steps: number = 5): string[] => {
    const palette = [];
    const rgb = luxuryColorConversion.hexToRgb(baseColor);
    if (!rgb) return [baseColor];

    const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const stepSize = 30; // 30 degrees between analogous colors

    for (let i = 0; i < steps; i++) {
      const hue = (hsl.h + (i - Math.floor(steps / 2)) * stepSize + 360) % 360;
      const newRgb = luxuryColorConversion.hslToRgb(hue, hsl.s, hsl.l);
      palette.push(luxuryColorConversion.rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }

    return palette;
  },

  /**
   * Generate a complementary color palette
   */
  generateComplementary: (baseColor: string): string[] => {
    const rgb = luxuryColorConversion.hexToRgb(baseColor);
    if (!rgb) return [baseColor];

    const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const complementaryHue = (hsl.h + 180) % 360;
    const complementaryRgb = luxuryColorConversion.hslToRgb(complementaryHue, hsl.s, hsl.l);

    return [
      baseColor,
      luxuryColorConversion.rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b)
    ];
  },

  /**
   * Generate a triadic color palette
   */
  generateTriadic: (baseColor: string): string[] => {
    const rgb = luxuryColorConversion.hexToRgb(baseColor);
    if (!rgb) return [baseColor];

    const hsl = luxuryColorConversion.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const triadic1 = (hsl.h + 120) % 360;
    const triadic2 = (hsl.h + 240) % 360;

    const rgb1 = luxuryColorConversion.hslToRgb(triadic1, hsl.s, hsl.l);
    const rgb2 = luxuryColorConversion.hslToRgb(triadic2, hsl.s, hsl.l);

    return [
      baseColor,
      luxuryColorConversion.rgbToHex(rgb1.r, rgb1.g, rgb1.b),
      luxuryColorConversion.rgbToHex(rgb2.r, rgb2.g, rgb2.b)
    ];
  },
};

// Color accessibility utilities
export const luxuryColorAccessibility = {
  /**
   * Calculate relative luminance
   */
  getLuminance: (hex: string): number => {
    const rgb = luxuryColorConversion.hexToRgb(hex);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio: (color1: string, color2: string): number => {
    const lum1 = luxuryColorAccessibility.getLuminance(color1);
    const lum2 = luxuryColorAccessibility.getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Check if color combination meets WCAG standards
   */
  meetsWCAG: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    const ratio = luxuryColorAccessibility.getContrastRatio(foreground, background);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  },

  /**
   * Get accessible color variants
   */
  getAccessibleVariants: (baseColor: string, backgroundColor: string): string[] => {
    const variants = [];
    const baseLum = luxuryColorAccessibility.getLuminance(baseColor);
    const bgLum = luxuryColorAccessibility.getLuminance(backgroundColor);

    // Generate lighter and darker variants
    for (let i = 0; i <= 100; i += 10) {
      const lightVariant = luxuryColorManipulation.lighten(baseColor, i);
      const darkVariant = luxuryColorManipulation.darken(baseColor, i);

      if (luxuryColorAccessibility.meetsWCAG(lightVariant, backgroundColor)) {
        variants.push(lightVariant);
      }
      if (luxuryColorAccessibility.meetsWCAG(darkVariant, backgroundColor)) {
        variants.push(darkVariant);
      }
    }

    return [...new Set(variants)]; // Remove duplicates
  },
};

// Color theme utilities
export const luxuryColorTheme = {
  /**
   * Generate a complete color theme
   */
  generateTheme: (primaryColor: string, variant: 'light' | 'dark' = 'dark') => {
    const baseColors = {
      primary: primaryColor,
      secondary: luxuryColorManipulation.adjustHue(primaryColor, 30),
      accent: luxuryColorManipulation.adjustHue(primaryColor, 60),
    };

    const theme = {
      background: variant === 'dark' ? '#1A1A1A' : '#FFFFFF',
      surface: variant === 'dark' ? '#2A2A2A' : '#F5F5F5',
      text: variant === 'dark' ? '#F5F5F5' : '#1A1A1A',
      textSecondary: variant === 'dark' ? '#CCCCCC' : '#666666',
    };

    return {
      ...baseColors,
      ...theme,
      // Generate color scales
      primaryScale: luxuryColorPaletteGeneration.generateMonochromatic(primaryColor),
      secondaryScale: luxuryColorPaletteGeneration.generateMonochromatic(baseColors.secondary),
      accentScale: luxuryColorPaletteGeneration.generateMonochromatic(baseColors.accent),
    };
  },

  /**
   * Generate CSS custom properties for a theme
   */
  generateCSSVariables: (theme: Record<string, unknown>): Record<string, string> => {
    const cssVars: Record<string, string> = {};
    
    Object.entries(theme).forEach(([key, value]) => {
      cssVars[`--luxury-${key}`] = String(value);
    });

    return cssVars;
  },

  /**
   * Apply theme to document
   */
  applyTheme: (theme: Record<string, unknown>): void => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const cssVars = luxuryColorTheme.generateCSSVariables(theme);

    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  },
};

// Color validation utilities
export const luxuryColorValidation = {
  /**
   * Validate color format
   */
  isValidHex: (hex: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  },

  /**
   * Validate color accessibility
   */
  validateAccessibility: (foreground: string, background: string): {
    isValid: boolean;
    contrastRatio: number;
    wcagAA: boolean;
    wcagAAA: boolean;
  } => {
    const contrastRatio = luxuryColorAccessibility.getContrastRatio(foreground, background);
    
    return {
      isValid: contrastRatio >= 4.5,
      contrastRatio,
      wcagAA: contrastRatio >= 4.5,
      wcagAAA: contrastRatio >= 7,
    };
  },

  /**
   * Get color recommendations
   */
  getRecommendations: (baseColor: string, backgroundColor: string): {
    accessible: string[];
    suggestions: string[];
  } => {
    const accessible = luxuryColorAccessibility.getAccessibleVariants(baseColor, backgroundColor);
    const suggestions = luxuryColorPaletteGeneration.generateAnalogous(baseColor);

    return {
      accessible,
      suggestions,
    };
  },
};

// Export all utilities
export const luxuryColorUtilities = {
  conversion: luxuryColorConversion,
  manipulation: luxuryColorManipulation,
  paletteGeneration: luxuryColorPaletteGeneration,
  accessibility: luxuryColorAccessibility,
  theme: luxuryColorTheme,
  validation: luxuryColorValidation,
};

export default luxuryColorUtilities;
