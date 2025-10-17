/**
 * Luxury Color Accessibility System
 * 
 * Provides comprehensive accessibility utilities for the luxury design system,
 * including contrast validation, color blindness support, and accessibility enhancements.
 */

// Accessibility standards
export const accessibilityStandards = {
  WCAG_AA: {
    normal: 4.5,
    large: 3.0,
  },
  WCAG_AAA: {
    normal: 7.0,
    large: 4.5,
  },
  WCAG_AAA_LARGE: {
    normal: 7.0,
    large: 4.5,
  },
};

// Color blindness types
export const colorBlindnessTypes = {
  protanopia: 'red-blind',
  deuteranopia: 'green-blind',
  tritanopia: 'blue-blind',
  achromatopsia: 'monochromatic',
};

// Luxury color accessibility utilities
export class LuxuryColorAccessibility {
  /**
   * Calculate contrast ratio between two colors
   */
  static calculateContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    const luminance1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const luminance2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if color combination meets WCAG standards
   */
  static meetsWCAG(
    foreground: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): boolean {
    const ratio = this.calculateContrastRatio(foreground, background);
    const standard = accessibilityStandards[`WCAG_${level}`];
    const threshold = size === 'large' ? standard.large : standard.normal;
    
    return ratio >= threshold;
  }

  /**
   * Get accessibility score for color combination
   */
  static getAccessibilityScore(
    foreground: string,
    background: string
  ): {
    score: number;
    level: 'AA' | 'AAA' | 'FAIL';
    ratio: number;
    recommendations: string[];
  } {
    const ratio = this.calculateContrastRatio(foreground, background);
    const recommendations: string[] = [];
    
    let level: 'AA' | 'AAA' | 'FAIL' = 'FAIL';
    let score = 0;
    
    if (ratio >= accessibilityStandards.WCAG_AAA.normal) {
      level = 'AAA';
      score = 100;
    } else if (ratio >= accessibilityStandards.WCAG_AA.normal) {
      level = 'AA';
      score = 75;
    } else if (ratio >= accessibilityStandards.WCAG_AA.large) {
      level = 'AA';
      score = 50;
      recommendations.push('Consider using larger text for better readability');
    } else {
      score = 25;
      recommendations.push('Color combination does not meet accessibility standards');
      recommendations.push('Consider using higher contrast colors');
    }
    
    return {
      score,
      level,
      ratio,
      recommendations,
    };
  }

  /**
   * Generate accessible color alternatives
   */
  static generateAccessibleAlternatives(
    baseColor: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA'
  ): string[] {
    const alternatives: string[] = [];
    const baseRgb = this.hexToRgb(baseColor);
    
    // Generate lighter and darker variants
    for (let i = 0; i <= 100; i += 10) {
      const lighter = this.adjustBrightness(baseColor, i);
      const darker = this.adjustBrightness(baseColor, -i);
      
      if (this.meetsWCAG(lighter, background, level)) {
        alternatives.push(lighter);
      }
      
      if (this.meetsWCAG(darker, background, level)) {
        alternatives.push(darker);
      }
    }
    
    return [...new Set(alternatives)]; // Remove duplicates
  }

  /**
   * Simulate color blindness
   */
  static simulateColorBlindness(
    color: string,
    type: keyof typeof colorBlindnessTypes
  ): string {
    const rgb = this.hexToRgb(color);
    
    switch (type) {
      case 'protanopia':
        return this.simulateProtanopia(rgb);
      case 'deuteranopia':
        return this.simulateDeuteranopia(rgb);
      case 'tritanopia':
        return this.simulateTritanopia(rgb);
      case 'achromatopsia':
        return this.simulateAchromatopsia(rgb);
      default:
        return color;
    }
  }

  /**
   * Get color accessibility report
   */
  static getAccessibilityReport(
    foreground: string,
    background: string,
    textSize: 'small' | 'medium' | 'large' = 'medium'
  ): {
    contrastRatio: number;
    wcagAA: boolean;
    wcagAAA: boolean;
    colorBlindness: Record<string, string>;
    recommendations: string[];
  } {
    const contrastRatio = this.calculateContrastRatio(foreground, background);
    const wcagAA = this.meetsWCAG(foreground, background, 'AA');
    const wcagAAA = this.meetsWCAG(foreground, background, 'AAA');
    
    const colorBlindness: Record<string, string> = {};
    Object.keys(colorBlindnessTypes).forEach(type => {
      colorBlindness[type] = this.simulateColorBlindness(
        foreground,
        type as keyof typeof colorBlindnessTypes
      );
    });
    
    const recommendations: string[] = [];
    
    if (!wcagAA) {
      recommendations.push('Color combination does not meet WCAG AA standards');
      recommendations.push('Consider using higher contrast colors');
    }
    
    if (!wcagAAA) {
      recommendations.push('Color combination does not meet WCAG AAA standards');
      recommendations.push('Consider using even higher contrast colors');
    }
    
    if (textSize === 'small' && contrastRatio < 4.5) {
      recommendations.push('Consider using larger text for better readability');
    }
    
    return {
      contrastRatio,
      wcagAA,
      wcagAAA,
      colorBlindness,
      recommendations,
    };
  }

  /**
   * Convert hex to RGB
   */
  private static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  /**
   * Get luminance value
   */
  private static getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Adjust brightness of color
   */
  private static adjustBrightness(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    const factor = 1 + (percent / 100);
    
    const newR = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
    const newG = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
    const newB = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
    
    return this.rgbToHex(newR, newG, newB);
  }

  /**
   * Convert RGB to hex
   */
  private static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * Simulate protanopia (red-blind)
   */
  private static simulateProtanopia(rgb: { r: number; g: number; b: number }): string {
    const { r, g, b } = rgb;
    const newR = 0.567 * r + 0.433 * g;
    const newG = 0.558 * r + 0.442 * g;
    const newB = 0.242 * r + 0.758 * g;
    
    return this.rgbToHex(
      Math.round(newR),
      Math.round(newG),
      Math.round(newB)
    );
  }

  /**
   * Simulate deuteranopia (green-blind)
   */
  private static simulateDeuteranopia(rgb: { r: number; g: number; b: number }): string {
    const { r, g, b } = rgb;
    const newR = 0.625 * r + 0.375 * g;
    const newG = 0.7 * r + 0.3 * g;
    const newB = 0.3 * r + 0.7 * g;
    
    return this.rgbToHex(
      Math.round(newR),
      Math.round(newG),
      Math.round(newB)
    );
  }

  /**
   * Simulate tritanopia (blue-blind)
   */
  private static simulateTritanopia(rgb: { r: number; g: number; b: number }): string {
    const { r, g, b } = rgb;
    const newR = 0.95 * r + 0.05 * g;
    const newG = 0.433 * r + 0.567 * g;
    const newB = 0.475 * r + 0.525 * g;
    
    return this.rgbToHex(
      Math.round(newR),
      Math.round(newG),
      Math.round(newB)
    );
  }

  /**
   * Simulate achromatopsia (monochromatic)
   */
  private static simulateAchromatopsia(rgb: { r: number; g: number; b: number }): string {
    const { r, g, b } = rgb;
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    
    return this.rgbToHex(
      Math.round(gray),
      Math.round(gray),
      Math.round(gray)
    );
  }
}

// Luxury accessibility presets
export const luxuryAccessibilityPresets = {
  // High contrast preset
  highContrast: {
    foreground: '#FFFFFF',
    background: '#000000',
    accent: '#FFFF00',
    description: 'High contrast preset for maximum accessibility',
  },
  
  // WCAG AA compliant preset
  wcagAA: {
    foreground: '#F5F5F5',
    background: '#1A1A1A',
    accent: '#B8860B',
    description: 'WCAG AA compliant luxury preset',
  },
  
  // WCAG AAA compliant preset
  wcagAAA: {
    foreground: '#FFFFFF',
    background: '#0F0F0F',
    accent: '#D4AF37',
    description: 'WCAG AAA compliant luxury preset',
  },
  
  // Color blind friendly preset
  colorBlindFriendly: {
    foreground: '#FFFFFF',
    background: '#2A2A2A',
    accent: '#FFD700',
    description: 'Color blind friendly luxury preset',
  },
};

// Luxury accessibility utilities
export const luxuryAccessibilityUtils = {
  /**
   * Check if color combination is accessible
   */
  isAccessible: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    return LuxuryColorAccessibility.meetsWCAG(foreground, background, level);
  },

  /**
   * Get accessibility recommendations
   */
  getRecommendations: (foreground: string, background: string): string[] => {
    const report = LuxuryColorAccessibility.getAccessibilityReport(foreground, background);
    return report.recommendations;
  },

  /**
   * Generate accessible color palette
   */
  generateAccessiblePalette: (baseColors: string[], background: string): string[] => {
    const accessibleColors: string[] = [];
    
    baseColors.forEach(color => {
      const alternatives = LuxuryColorAccessibility.generateAccessibleAlternatives(
        color,
        background,
        'AA'
      );
      accessibleColors.push(...alternatives);
    });
    
    return [...new Set(accessibleColors)]; // Remove duplicates
  },

  /**
   * Test color blindness compatibility
   */
  testColorBlindness: (colors: string[]): Record<string, string[]> => {
    const results: Record<string, string[]> = {};
    
    Object.keys(colorBlindnessTypes).forEach(type => {
      results[type] = colors.map(color =>
        LuxuryColorAccessibility.simulateColorBlindness(
          color,
          type as keyof typeof colorBlindnessTypes
        )
      );
    });
    
    return results;
  },
};

// Export all utilities
export default {
  LuxuryColorAccessibility,
  accessibilityStandards,
  colorBlindnessTypes,
  luxuryAccessibilityPresets,
  luxuryAccessibilityUtils,
};
