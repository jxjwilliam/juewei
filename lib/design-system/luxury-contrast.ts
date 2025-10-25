/**
 * Luxury Color Contrast Validation
 * 
 * Provides comprehensive color contrast validation utilities for the luxury design system,
 * including WCAG compliance checking, contrast ratio calculation, and accessibility recommendations.
 */

// WCAG contrast ratio standards
export const wcagStandards = {
  AA: {
    normal: 4.5,
    large: 3.0,
  },
  AAA: {
    normal: 7.0,
    large: 4.5,
  },
};

// Contrast validation results
export interface ContrastValidationResult {
  ratio: number;
  level: 'AA' | 'AAA' | 'FAIL';
  score: number;
  recommendations: string[];
  isAccessible: boolean;
  needsImprovement: boolean;
}

// Luxury contrast validation utilities
export class LuxuryContrastValidator {
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
   * Validate contrast against WCAG standards
   */
  static validateContrast(
    foreground: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): ContrastValidationResult {
    const ratio = this.calculateContrastRatio(foreground, background);
    const standard = wcagStandards[level];
    const threshold = size === 'large' ? standard.large : standard.normal;
    
    const isAccessible = ratio >= threshold;
    const needsImprovement = ratio < threshold;
    
    let resultLevel: 'AA' | 'AAA' | 'FAIL' = 'FAIL';
    let score = 0;
    const recommendations: string[] = [];
    
    if (ratio >= wcagStandards.AAA.normal) {
      resultLevel = 'AAA';
      score = 100;
    } else if (ratio >= wcagStandards.AA.normal) {
      resultLevel = 'AA';
      score = 75;
    } else if (ratio >= wcagStandards.AA.large) {
      resultLevel = 'AA';
      score = 50;
      recommendations.push('Consider using larger text for better readability');
    } else {
      score = 25;
      recommendations.push('Color combination does not meet accessibility standards');
      recommendations.push('Consider using higher contrast colors');
    }
    
    if (needsImprovement) {
      recommendations.push('Increase contrast ratio to meet WCAG standards');
      recommendations.push('Consider using darker or lighter colors');
    }
    
    return {
      ratio,
      level: resultLevel,
      score,
      recommendations,
      isAccessible,
      needsImprovement,
    };
  }

  /**
   * Get contrast accessibility score
   */
  static getAccessibilityScore(
    foreground: string,
    background: string
  ): {
    score: number;
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
    description: string;
  } {
    const ratio = this.calculateContrastRatio(foreground, background);
    
    let score: number;
    let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
    let description: string;
    
    if (ratio >= 21) {
      score = 100;
      grade = 'A+';
      description = 'Excellent contrast ratio';
    } else if (ratio >= 14) {
      score = 90;
      grade = 'A';
      description = 'Very good contrast ratio';
    } else if (ratio >= 7) {
      score = 80;
      grade = 'B';
      description = 'Good contrast ratio';
    } else if (ratio >= 4.5) {
      score = 70;
      grade = 'C';
      description = 'Acceptable contrast ratio';
    } else if (ratio >= 3) {
      score = 60;
      grade = 'D';
      description = 'Poor contrast ratio';
    } else {
      score = 40;
      grade = 'F';
      description = 'Very poor contrast ratio';
    }
    
    return { score, grade, description };
  }

  /**
   * Generate accessible color alternatives
   */
  static generateAccessibleAlternatives(
    baseColor: string,
    background: string,
    targetRatio: number = 4.5
  ): string[] {
    const alternatives: string[] = [];
    const baseRgb = this.hexToRgb(baseColor);
    
    // Generate lighter and darker variants
    for (let i = 0; i <= 100; i += 5) {
      const lighter = this.adjustBrightness(baseColor, i);
      const darker = this.adjustBrightness(baseColor, -i);
      
      if (this.calculateContrastRatio(lighter, background) >= targetRatio) {
        alternatives.push(lighter);
      }
      
      if (this.calculateContrastRatio(darker, background) >= targetRatio) {
        alternatives.push(darker);
      }
    }
    
    return [...new Set(alternatives)]; // Remove duplicates
  }

  /**
   * Test color combination accessibility
   */
  static testColorAccessibility(
    colors: string[],
    background: string
  ): Record<string, ContrastValidationResult> {
    const results: Record<string, ContrastValidationResult> = {};
    
    colors.forEach(color => {
      results[color] = this.validateContrast(color, background);
    });
    
    return results;
  }

  /**
   * Get contrast recommendations
   */
  static getContrastRecommendations(
    foreground: string,
    background: string
  ): {
    current: ContrastValidationResult;
    alternatives: string[];
    suggestions: string[];
  } {
    const current = this.validateContrast(foreground, background);
    const alternatives = this.generateAccessibleAlternatives(foreground, background);
    
    const suggestions: string[] = [];
    
    if (current.needsImprovement) {
      suggestions.push('Use a darker color for better contrast');
      suggestions.push('Use a lighter background color');
      suggestions.push('Consider using a different color palette');
    }
    
    if (current.ratio < 3) {
      suggestions.push('This color combination is not accessible');
      suggestions.push('Consider using high contrast colors');
    }
    
    return {
      current,
      alternatives,
      suggestions,
    };
  }

  /**
   * Validate luxury color palette accessibility
   */
  static validateLuxuryPalette(
    palette: Record<string, string>,
    background: string
  ): {
    accessible: string[];
    inaccessible: string[];
    recommendations: string[];
  } {
    const accessible: string[] = [];
    const inaccessible: string[] = [];
    const recommendations: string[] = [];
    
    Object.entries(palette).forEach(([name, color]) => {
      const validation = this.validateContrast(color, background);
      
      if (validation.isAccessible) {
        accessible.push(name);
      } else {
        inaccessible.push(name);
        recommendations.push(`${name} color needs improvement for accessibility`);
      }
    });
    
    if (inaccessible.length > 0) {
      recommendations.push('Consider using higher contrast colors for better accessibility');
    }
    
    return {
      accessible,
      inaccessible,
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
}

// Luxury contrast validation presets
export const luxuryContrastPresets = {
  // High contrast preset
  highContrast: {
    foreground: '#FFFFFF',
    background: '#000000',
    ratio: 21,
    level: 'AAA',
    description: 'Maximum contrast for accessibility',
  },
  
  // WCAG AA compliant preset
  wcagAA: {
    foreground: '#F5F5F5',
    background: '#1A1A1A',
    ratio: 4.5,
    level: 'AA',
    description: 'WCAG AA compliant luxury preset',
  },
  
  // WCAG AAA compliant preset
  wcagAAA: {
    foreground: '#FFFFFF',
    background: '#0F0F0F',
    ratio: 7.0,
    level: 'AAA',
    description: 'WCAG AAA compliant luxury preset',
  },
  
  // Luxury preset with good contrast
  luxury: {
    foreground: '#E6E6E6',
    background: '#2A2A2A',
    ratio: 6.2,
    level: 'AA',
    description: 'Luxury preset with good contrast',
  },
};

// Luxury contrast validation utilities
export const luxuryContrastUtils = {
  /**
   * Check if color combination is accessible
   */
  isAccessible: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    return LuxuryContrastValidator.validateContrast(foreground, background, level).isAccessible;
  },

  /**
   * Get contrast ratio
   */
  getContrastRatio: (foreground: string, background: string): number => {
    return LuxuryContrastValidator.calculateContrastRatio(foreground, background);
  },

  /**
   * Get accessibility score
   */
  getAccessibilityScore: (foreground: string, background: string) => {
    return LuxuryContrastValidator.getAccessibilityScore(foreground, background);
  },

  /**
   * Get contrast recommendations
   */
  getRecommendations: (foreground: string, background: string) => {
    return LuxuryContrastValidator.getContrastRecommendations(foreground, background);
  },

  /**
   * Validate color palette
   */
  validatePalette: (palette: Record<string, string>, background: string) => {
    return LuxuryContrastValidator.validateLuxuryPalette(palette, background);
  },
};

// Export all utilities
export default {
  LuxuryContrastValidator,
  wcagStandards,
  luxuryContrastPresets,
  luxuryContrastUtils,
};
