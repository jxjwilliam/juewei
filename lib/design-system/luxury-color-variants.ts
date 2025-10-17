/**
 * Luxury Color System Variants
 * 
 * Provides comprehensive color system variants for the luxury design system,
 * including color palettes, themes, and accessibility considerations.
 */

// Luxury color palettes
export const luxuryColorPalettes = {
  // Primary luxury palette
  primary: {
    background: {
      primary: '#1A1A1A',      // Deep charcoal
      secondary: '#2A2A2A',    // Slightly lighter charcoal
      tertiary: '#3A3A3A',     // Medium charcoal
      quaternary: '#4A4A4A',   // Light charcoal
    },
    accent: {
      copper: '#B8860B',        // Warm copper
      gold: '#D4AF37',         // Aged gold
      bronze: '#CD7F32',       // Bronze
      brass: '#B5A642',        // Brass
    },
    spice: {
      red: '#D43D2A',          // Chili red
      orange: '#E67E22',       // Spice orange
      yellow: '#F39C12',       // Golden yellow
      brown: '#8B4513',        // Spice brown
    },
    text: {
      primary: '#F5F5F5',      // Off-white
      secondary: '#CCCCCC',    // Muted text
      tertiary: '#999999',     // Dimmed text
      accent: '#B8860B',       // Accent text
    },
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
    },
  },
  
  // Alternative luxury palettes
  alternative: {
    // Dark luxury variant
    dark: {
      background: {
        primary: '#0F0F0F',
        secondary: '#1F1F1F',
        tertiary: '#2F2F2F',
        quaternary: '#3F3F3F',
      },
      accent: {
        copper: '#C9A96E',
        gold: '#E6C547',
        bronze: '#D4A574',
        brass: '#C4B454',
      },
      spice: {
        red: '#E74C3C',
        orange: '#F39C12',
        yellow: '#F1C40F',
        brown: '#A0522D',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0',
        tertiary: '#B0B0B0',
        accent: '#C9A96E',
      },
    },
    
    // Warm luxury variant
    warm: {
      background: {
        primary: '#2D1B1B',
        secondary: '#3D2B2B',
        tertiary: '#4D3B3B',
        quaternary: '#5D4B4B',
      },
      accent: {
        copper: '#D2691E',
        gold: '#FFD700',
        bronze: '#CD853F',
        brass: '#DAA520',
      },
      spice: {
        red: '#DC143C',
        orange: '#FF6347',
        yellow: '#FFD700',
        brown: '#8B4513',
      },
      text: {
        primary: '#FFF8DC',
        secondary: '#F5F5DC',
        tertiary: '#E6E6FA',
        accent: '#D2691E',
      },
    },
    
    // Cool luxury variant
    cool: {
      background: {
        primary: '#1B1B2D',
        secondary: '#2B2B3D',
        tertiary: '#3B3B4D',
        quaternary: '#4B4B5D',
      },
      accent: {
        copper: '#8B7D6B',
        gold: '#B8860B',
        bronze: '#A0522D',
        brass: '#9A9A00',
      },
      spice: {
        red: '#B22222',
        orange: '#FF8C00',
        yellow: '#DAA520',
        brown: '#654321',
      },
      text: {
        primary: '#F0F8FF',
        secondary: '#E6E6FA',
        tertiary: '#D3D3D3',
        accent: '#8B7D6B',
      },
    },
  },
};

// Luxury color themes
export const luxuryColorThemes = {
  // Default luxury theme
  default: {
    name: 'Default Luxury',
    colors: luxuryColorPalettes.primary,
    description: 'Classic luxury theme with deep charcoal backgrounds and warm copper accents',
  },
  
  // Dark luxury theme
  dark: {
    name: 'Dark Luxury',
    colors: luxuryColorPalettes.alternative.dark,
    description: 'Ultra-dark luxury theme for maximum contrast and sophistication',
  },
  
  // Warm luxury theme
  warm: {
    name: 'Warm Luxury',
    colors: luxuryColorPalettes.alternative.warm,
    description: 'Warm luxury theme with rich browns and golden accents',
  },
  
  // Cool luxury theme
  cool: {
    name: 'Cool Luxury',
    colors: luxuryColorPalettes.alternative.cool,
    description: 'Cool luxury theme with blue undertones and sophisticated grays',
  },
};

// Luxury color utilities
export class LuxuryColorSystem {
  /**
   * Get color palette
   */
  static getPalette(palette: keyof typeof luxuryColorPalettes) {
    return luxuryColorPalettes[palette];
  }

  /**
   * Get theme colors
   */
  static getTheme(theme: keyof typeof luxuryColorThemes) {
    return luxuryColorThemes[theme];
  }

  /**
   * Generate color variants
   */
  static generateVariants(baseColor: string, variants: number = 5) {
    const variants = [];
    const base = this.hexToRgb(baseColor);
    
    for (let i = 0; i < variants; i++) {
      const factor = (i + 1) / variants;
      const variant = {
        r: Math.round(base.r * factor),
        g: Math.round(base.g * factor),
        b: Math.round(base.b * factor),
      };
      variants.push(this.rgbToHex(variant.r, variant.g, variant.b));
    }
    
    return variants;
  }

  /**
   * Convert hex to RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  /**
   * Convert RGB to hex
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * Get color contrast ratio
   */
  static getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    const luminance1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const luminance2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Get luminance value
   */
  static getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Check if color combination meets accessibility standards
   */
  static isAccessible(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }

  /**
   * Generate accessible color combinations
   */
  static generateAccessibleCombinations(
    baseColor: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA'
  ): string[] {
    const combinations = [];
    const variants = this.generateVariants(baseColor, 10);
    
    for (const variant of variants) {
      if (this.isAccessible(variant, background, level)) {
        combinations.push(variant);
      }
    }
    
    return combinations;
  }

  /**
   * Get color temperature
   */
  static getColorTemperature(hex: string): 'warm' | 'cool' | 'neutral' {
    const rgb = this.hexToRgb(hex);
    const { r, g, b } = rgb;
    
    if (r > g && r > b) return 'warm';
    if (b > r && b > g) return 'cool';
    return 'neutral';
  }

  /**
   * Generate complementary colors
   */
  static getComplementary(hex: string): string {
    const rgb = this.hexToRgb(hex);
    return this.rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
  }

  /**
   * Generate analogous colors
   */
  static getAnalogous(hex: string, count: number = 3): string[] {
    const rgb = this.hexToRgb(hex);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [];
    
    for (let i = 0; i < count; i++) {
      const hue = (hsl.h + (i * 30)) % 360;
      const newRgb = this.hslToRgb(hue, hsl.s, hsl.l);
      colors.push(this.rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    
    return colors;
  }

  /**
   * Convert RGB to HSL
   */
  static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
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
    
    return { h: h * 360, s, l };
  }

  /**
   * Convert HSL to RGB
   */
  static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    
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
  }
}

// Luxury color variants
export const luxuryColorVariants = {
  // Primary luxury colors
  Primary: luxuryColorPalettes.primary,
  
  // Alternative luxury colors
  Dark: luxuryColorPalettes.alternative.dark,
  Warm: luxuryColorPalettes.alternative.warm,
  Cool: luxuryColorPalettes.alternative.cool,
  
  // Theme-based colors
  Default: luxuryColorThemes.default,
  DarkTheme: luxuryColorThemes.dark,
  WarmTheme: luxuryColorThemes.warm,
  CoolTheme: luxuryColorThemes.cool,
};

// Export all utilities
export default {
  LuxuryColorSystem,
  luxuryColorPalettes,
  luxuryColorThemes,
  luxuryColorVariants,
};
