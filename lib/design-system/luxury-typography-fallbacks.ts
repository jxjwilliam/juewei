/**
 * Luxury Typography Fallback System
 * 
 * Provides comprehensive typography fallback utilities for the luxury design system,
 * including font loading, fallback fonts, and graceful degradation.
 */

// Font loading states
export const fontLoadingStates = {
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
  TIMEOUT: 'timeout',
};

// Font fallback configurations
export const luxuryFontFallbacks = {
  // Primary font fallbacks
  primary: {
    heading: {
      primary: 'Playfair Display, Lora, Merriweather, Georgia, serif',
      secondary: 'Cormorant Garamond, Georgia, Times New Roman, serif',
      accent: 'Cinzel, Playfair Display, Georgia, serif',
    },
    body: {
      primary: 'Inter, Montserrat, Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
      secondary: 'Source Sans Pro, Open Sans, Arial, sans-serif',
      accent: 'Poppins, Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    mono: {
      primary: 'JetBrains Mono, Fira Code, Consolas, monospace',
      secondary: 'Source Code Pro, Consolas, Monaco, monospace',
    },
    chinese: {
      primary: 'Source Han Sans, Noto Sans CJK SC, PingFang SC, Microsoft YaHei, sans-serif',
      serif: 'Source Han Serif, Noto Serif CJK SC, PingFang SC, Microsoft YaHei, serif',
    },
  },
  
  // System font fallbacks
  system: {
    heading: {
      primary: 'Georgia, Times New Roman, serif',
      secondary: 'Georgia, Times New Roman, serif',
      accent: 'Georgia, Times New Roman, serif',
    },
    body: {
      primary: '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
      secondary: 'Arial, Helvetica, sans-serif',
      accent: '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
    },
    mono: {
      primary: 'Consolas, Monaco, monospace',
      secondary: 'Consolas, Monaco, monospace',
    },
    chinese: {
      primary: 'PingFang SC, Microsoft YaHei, Arial, sans-serif',
      serif: 'PingFang SC, Microsoft YaHei, serif',
    },
  },
  
  // Minimal fallbacks
  minimal: {
    heading: {
      primary: 'serif',
      secondary: 'serif',
      accent: 'serif',
    },
    body: {
      primary: 'sans-serif',
      secondary: 'sans-serif',
      accent: 'sans-serif',
    },
    mono: {
      primary: 'monospace',
      secondary: 'monospace',
    },
    chinese: {
      primary: 'sans-serif',
      serif: 'serif',
    },
  },
};

// Font loading configuration
export const fontLoadingConfig = {
  // Font loading timeout (in milliseconds)
  timeout: 3000,
  
  // Font loading retry attempts
  retryAttempts: 3,
  
  // Font loading retry delay (in milliseconds)
  retryDelay: 1000,
  
  // Font loading strategies
  strategies: {
    eager: 'eager',
    lazy: 'lazy',
    swap: 'swap',
    fallback: 'fallback',
    optional: 'optional',
  },
};

// Luxury typography fallback utilities
export class LuxuryTypographyFallbacks {
  /**
   * Get font fallback stack
   */
  static getFontFallback(
    category: 'heading' | 'body' | 'mono' | 'chinese',
    variant: string,
    level: 'primary' | 'system' | 'minimal' = 'primary'
  ): string {
    return luxuryFontFallbacks[level][category][variant] || luxuryFontFallbacks.primary[category][variant];
  }

  /**
   * Generate font fallback CSS
   */
  static generateFontFallbackCSS(
    category: 'heading' | 'body' | 'mono' | 'chinese',
    variant: string,
    level: 'primary' | 'system' | 'minimal' = 'primary'
  ): string {
    const fallback = this.getFontFallback(category, variant, level);
    return `font-family: ${fallback};`;
  }

  /**
   * Check if font is loaded
   */
  static isFontLoaded(fontFamily: string): boolean {
    if (typeof document === 'undefined') return false;
    
    try {
      return document.fonts.check(`16px ${fontFamily}`);
    } catch (error) {
      return false;
    }
  }

  /**
   * Wait for font to load
   */
  static async waitForFont(
    fontFamily: string,
    timeout: number = fontLoadingConfig.timeout
  ): Promise<boolean> {
    if (typeof document === 'undefined') return false;
    
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const checkFont = () => {
        if (this.isFontLoaded(fontFamily)) {
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          resolve(false);
          return;
        }
        
        setTimeout(checkFont, 100);
      };
      
      checkFont();
    });
  }

  /**
   * Load font with fallback
   */
  static async loadFontWithFallback(
    fontFamily: string,
    fallback: string,
    timeout: number = fontLoadingConfig.timeout
  ): Promise<string> {
    const isLoaded = await this.waitForFont(fontFamily, timeout);
    return isLoaded ? fontFamily : fallback;
  }

  /**
   * Generate font loading CSS
   */
  static generateFontLoadingCSS(
    fontFamily: string,
    fallback: string,
    strategy: keyof typeof fontLoadingConfig.strategies = 'swap'
  ): string {
    return `
      @font-face {
        font-family: '${fontFamily}';
        font-display: ${fontLoadingConfig.strategies[strategy]};
        src: local('${fontFamily}'), local('${fallback}');
      }
    `;
  }

  /**
   * Get font loading status
   */
  static getFontLoadingStatus(fontFamily: string): keyof typeof fontLoadingStates {
    if (typeof document === 'undefined') return fontLoadingStates.LOADING;
    
    try {
      if (document.fonts.check(`16px ${fontFamily}`)) {
        return fontLoadingStates.LOADED;
      }
      
      return fontLoadingStates.LOADING;
    } catch (error) {
      return fontLoadingStates.FAILED;
    }
  }

  /**
   * Generate responsive font fallbacks
   */
  static generateResponsiveFontFallbacks(
    category: 'heading' | 'body' | 'mono' | 'chinese',
    variant: string
  ): Record<string, string> {
    const fallbacks: Record<string, string> = {};
    
    Object.keys(luxuryFontFallbacks).forEach(level => {
      fallbacks[level] = this.getFontFallback(
        category,
        variant,
        level as 'primary' | 'system' | 'minimal'
      );
    });
    
    return fallbacks;
  }

  /**
   * Check font availability
   */
  static checkFontAvailability(fontFamily: string): boolean {
    if (typeof document === 'undefined') return false;
    
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) return false;
      
      // Test font rendering
      context.font = `16px ${fontFamily}`;
      const metrics = context.measureText('Test');
      
      return metrics.width > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate font fallback classes
   */
  static generateFontFallbackClasses(
    category: 'heading' | 'body' | 'mono' | 'chinese',
    variant: string,
    level: 'primary' | 'system' | 'minimal' = 'primary'
  ): string {
    const fallback = this.getFontFallback(category, variant, level);
    const classes = ['luxury-font-fallback'];
    
    // Add category class
    classes.push(`luxury-font-${category}`);
    
    // Add variant class
    classes.push(`luxury-font-${variant}`);
    
    // Add level class
    classes.push(`luxury-font-${level}`);
    
    return classes.join(' ');
  }

  /**
   * Get font loading recommendations
   */
  static getFontLoadingRecommendations(
    fontFamily: string,
    fallback: string
  ): string[] {
    const recommendations: string[] = [];
    
    if (!this.checkFontAvailability(fontFamily)) {
      recommendations.push(`Font '${fontFamily}' is not available`);
      recommendations.push(`Using fallback: ${fallback}`);
    }
    
    if (!this.isFontLoaded(fontFamily)) {
      recommendations.push(`Font '${fontFamily}' is not loaded`);
      recommendations.push('Consider using font-display: swap for better performance');
    }
    
    return recommendations;
  }
}

// Luxury typography fallback presets
export const luxuryTypographyFallbackPresets = {
  // Primary luxury fallbacks
  primary: {
    heading: luxuryFontFallbacks.primary.heading,
    body: luxuryFontFallbacks.primary.body,
    mono: luxuryFontFallbacks.primary.mono,
    chinese: luxuryFontFallbacks.primary.chinese,
  },
  
  // System fallbacks
  system: {
    heading: luxuryFontFallbacks.system.heading,
    body: luxuryFontFallbacks.system.body,
    mono: luxuryFontFallbacks.system.mono,
    chinese: luxuryFontFallbacks.system.chinese,
  },
  
  // Minimal fallbacks
  minimal: {
    heading: luxuryFontFallbacks.minimal.heading,
    body: luxuryFontFallbacks.minimal.body,
    mono: luxuryFontFallbacks.minimal.mono,
    chinese: luxuryFontFallbacks.minimal.chinese,
  },
};

// Luxury typography fallback utilities
export const luxuryTypographyFallbackUtils = {
  /**
   * Get font fallback
   */
  getFontFallback: (category: string, variant: string, level: string = 'primary') => {
    return LuxuryTypographyFallbacks.getFontFallback(
      category as 'heading' | 'body' | 'mono' | 'chinese',
      variant,
      level as 'primary' | 'system' | 'minimal'
    );
  },

  /**
   * Check font loading
   */
  isFontLoaded: (fontFamily: string) => {
    return LuxuryTypographyFallbacks.isFontLoaded(fontFamily);
  },

  /**
   * Wait for font
   */
  waitForFont: (fontFamily: string, timeout?: number) => {
    return LuxuryTypographyFallbacks.waitForFont(fontFamily, timeout);
  },

  /**
   * Load font with fallback
   */
  loadFontWithFallback: (fontFamily: string, fallback: string, timeout?: number) => {
    return LuxuryTypographyFallbacks.loadFontWithFallback(fontFamily, fallback, timeout);
  },

  /**
   * Get font loading status
   */
  getFontLoadingStatus: (fontFamily: string) => {
    return LuxuryTypographyFallbacks.getFontLoadingStatus(fontFamily);
  },

  /**
   * Check font availability
   */
  checkFontAvailability: (fontFamily: string) => {
    return LuxuryTypographyFallbacks.checkFontAvailability(fontFamily);
  },
};

// Export all utilities
export default {
  LuxuryTypographyFallbacks,
  fontLoadingStates,
  luxuryFontFallbacks,
  fontLoadingConfig,
  luxuryTypographyFallbackPresets,
  luxuryTypographyFallbackUtils,
};
