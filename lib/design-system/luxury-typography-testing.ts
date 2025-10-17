/**
 * Luxury Typography Testing Utilities
 * 
 * Provides comprehensive testing utilities for the luxury design system,
 * including typography validation, accessibility testing, and performance monitoring.
 */

import { luxuryTypographyPresets, luxuryFontStacks } from './luxury-typography-system';
import { LuxuryContrastValidator } from './luxury-contrast';

// Typography test results
export interface TypographyTestResult {
  passed: boolean;
  score: number;
  issues: string[];
  recommendations: string[];
  metrics: {
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
    fontWeight: number;
  };
}

// Accessibility test results
export interface AccessibilityTestResult {
  passed: boolean;
  score: number;
  contrastRatio: number;
  wcagLevel: 'AA' | 'AAA' | 'FAIL';
  issues: string[];
  recommendations: string[];
}

// Performance test results
export interface PerformanceTestResult {
  passed: boolean;
  score: number;
  metrics: {
    fontLoadTime: number;
    renderTime: number;
    memoryUsage: number;
  };
  issues: string[];
  recommendations: string[];
}

// Luxury typography testing utilities
export class LuxuryTypographyTesting {
  /**
   * Test typography configuration
   */
  static testTypography(
    element: HTMLElement,
    expectedConfig: any
  ): TypographyTestResult {
    const computedStyle = window.getComputedStyle(element);
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Test font family
    const fontFamily = computedStyle.fontFamily;
    if (!fontFamily.includes(expectedConfig.fontFamily)) {
      issues.push(`Font family mismatch: expected ${expectedConfig.fontFamily}, got ${fontFamily}`);
    }
    
    // Test font size
    const fontSize = parseFloat(computedStyle.fontSize);
    const expectedFontSize = parseFloat(expectedConfig.fontSize);
    if (Math.abs(fontSize - expectedFontSize) > 1) {
      issues.push(`Font size mismatch: expected ${expectedConfig.fontSize}, got ${fontSize}px`);
    }
    
    // Test line height
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const expectedLineHeight = parseFloat(expectedConfig.lineHeight);
    if (Math.abs(lineHeight - expectedLineHeight) > 1) {
      issues.push(`Line height mismatch: expected ${expectedConfig.lineHeight}, got ${lineHeight}px`);
    }
    
    // Test font weight
    const fontWeight = computedStyle.fontWeight;
    if (fontWeight !== expectedConfig.fontWeight) {
      issues.push(`Font weight mismatch: expected ${expectedConfig.fontWeight}, got ${fontWeight}`);
    }
    
    // Test letter spacing
    const letterSpacing = computedStyle.letterSpacing;
    if (letterSpacing !== expectedConfig.letterSpacing) {
      issues.push(`Letter spacing mismatch: expected ${expectedConfig.letterSpacing}, got ${letterSpacing}`);
    }
    
    // Generate recommendations
    if (issues.length === 0) {
      recommendations.push('Typography configuration is correct');
    } else {
      recommendations.push('Review typography configuration for consistency');
      recommendations.push('Ensure all typography properties match expected values');
    }
    
    const passed = issues.length === 0;
    const score = Math.max(0, 100 - (issues.length * 20));
    
    return {
      passed,
      score,
      issues,
      recommendations,
      metrics: {
        fontSize,
        lineHeight,
        letterSpacing: parseFloat(letterSpacing) || 0,
        fontWeight: parseInt(fontWeight) || 400,
      },
    };
  }

  /**
   * Test typography accessibility
   */
  static testTypographyAccessibility(
    element: HTMLElement,
    background: string = '#1A1A1A'
  ): AccessibilityTestResult {
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Test contrast ratio
    const contrastResult = LuxuryContrastValidator.validateContrast(color, background);
    const contrastRatio = contrastResult.ratio;
    const wcagLevel = contrastResult.level;
    
    if (!contrastResult.isAccessible) {
      issues.push(`Insufficient contrast ratio: ${contrastRatio.toFixed(2)}`);
      issues.push(`WCAG level: ${wcagLevel}`);
    }
    
    // Test font size
    const fontSize = parseFloat(computedStyle.fontSize);
    if (fontSize < 14) {
      issues.push(`Font size too small: ${fontSize}px (minimum 14px recommended)`);
    }
    
    // Test line height
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const lineHeightRatio = lineHeight / fontSize;
    if (lineHeightRatio < 1.2) {
      issues.push(`Line height too tight: ${lineHeightRatio.toFixed(2)} (minimum 1.2 recommended)`);
    }
    
    // Generate recommendations
    if (issues.length === 0) {
      recommendations.push('Typography accessibility is good');
    } else {
      recommendations.push('Improve contrast ratio for better accessibility');
      recommendations.push('Consider increasing font size for better readability');
      recommendations.push('Adjust line height for better text flow');
    }
    
    const passed = issues.length === 0;
    const score = Math.max(0, 100 - (issues.length * 25));
    
    return {
      passed,
      score,
      contrastRatio,
      wcagLevel,
      issues,
      recommendations,
    };
  }

  /**
   * Test typography performance
   */
  static async testTypographyPerformance(
    element: HTMLElement
  ): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Test font loading time
    const fontLoadTime = await this.measureFontLoadTime(element);
    
    // Test render time
    const renderTime = performance.now() - startTime;
    
    // Test memory usage
    const memoryUsage = this.measureMemoryUsage();
    
    // Analyze results
    if (fontLoadTime > 1000) {
      issues.push(`Font loading time too slow: ${fontLoadTime}ms`);
    }
    
    if (renderTime > 100) {
      issues.push(`Render time too slow: ${renderTime}ms`);
    }
    
    if (memoryUsage > 50) {
      issues.push(`Memory usage too high: ${memoryUsage}MB`);
    }
    
    // Generate recommendations
    if (issues.length === 0) {
      recommendations.push('Typography performance is good');
    } else {
      recommendations.push('Optimize font loading for better performance');
      recommendations.push('Consider using font-display: swap');
      recommendations.push('Reduce font file sizes');
    }
    
    const passed = issues.length === 0;
    const score = Math.max(0, 100 - (issues.length * 20));
    
    return {
      passed,
      score,
      metrics: {
        fontLoadTime,
        renderTime,
        memoryUsage,
      },
      issues,
      recommendations,
    };
  }

  /**
   * Test typography consistency
   */
  static testTypographyConsistency(
    elements: HTMLElement[],
    expectedConfig: any
  ): {
    passed: boolean;
    score: number;
    inconsistencies: string[];
    recommendations: string[];
  } {
    const inconsistencies: string[] = [];
    const recommendations: string[] = [];
    
    // Test font family consistency
    const fontFamilies = elements.map(el => window.getComputedStyle(el).fontFamily);
    const uniqueFontFamilies = [...new Set(fontFamilies)];
    if (uniqueFontFamilies.length > 1) {
      inconsistencies.push(`Inconsistent font families: ${uniqueFontFamilies.join(', ')}`);
    }
    
    // Test font size consistency
    const fontSizes = elements.map(el => parseFloat(window.getComputedStyle(el).fontSize));
    const uniqueFontSizes = [...new Set(fontSizes)];
    if (uniqueFontSizes.length > 1) {
      inconsistencies.push(`Inconsistent font sizes: ${uniqueFontSizes.join(', ')}`);
    }
    
    // Test line height consistency
    const lineHeights = elements.map(el => parseFloat(window.getComputedStyle(el).lineHeight));
    const uniqueLineHeights = [...new Set(lineHeights)];
    if (uniqueLineHeights.length > 1) {
      inconsistencies.push(`Inconsistent line heights: ${uniqueLineHeights.join(', ')}`);
    }
    
    // Generate recommendations
    if (inconsistencies.length === 0) {
      recommendations.push('Typography consistency is good');
    } else {
      recommendations.push('Standardize typography across elements');
      recommendations.push('Use consistent font families and sizes');
      recommendations.push('Implement typography system guidelines');
    }
    
    const passed = inconsistencies.length === 0;
    const score = Math.max(0, 100 - (inconsistencies.length * 25));
    
    return {
      passed,
      score,
      inconsistencies,
      recommendations,
    };
  }

  /**
   * Test typography responsiveness
   */
  static testTypographyResponsiveness(
    element: HTMLElement,
    breakpoints: Record<string, number> = {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    }
  ): {
    passed: boolean;
    score: number;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Test font size responsiveness
    const baseFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    
    Object.entries(breakpoints).forEach(([breakpoint, width]) => {
      // Simulate viewport width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      
      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
      
      // Check if font size changes appropriately
      const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
      if (currentFontSize === baseFontSize && width > 640) {
        issues.push(`Font size not responsive at ${breakpoint} (${width}px)`);
      }
    });
    
    // Generate recommendations
    if (issues.length === 0) {
      recommendations.push('Typography responsiveness is good');
    } else {
      recommendations.push('Implement responsive typography');
      recommendations.push('Use fluid typography for better scaling');
      recommendations.push('Test typography at different breakpoints');
    }
    
    const passed = issues.length === 0;
    const score = Math.max(0, 100 - (issues.length * 20));
    
    return {
      passed,
      score,
      issues,
      recommendations,
    };
  }

  /**
   * Measure font load time
   */
  private static async measureFontLoadTime(element: HTMLElement): Promise<number> {
    const startTime = performance.now();
    const fontFamily = window.getComputedStyle(element).fontFamily;
    
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.check) {
        const checkFont = () => {
          if (document.fonts.check(`16px ${fontFamily}`)) {
            resolve(performance.now() - startTime);
          } else {
            setTimeout(checkFont, 10);
          }
        };
        checkFont();
      } else {
        resolve(0);
      }
    });
  }

  /**
   * Measure memory usage
   */
  private static measureMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  /**
   * Run comprehensive typography tests
   */
  static async runComprehensiveTests(
    element: HTMLElement,
    expectedConfig: any,
    background: string = '#1A1A1A'
  ): Promise<{
    typography: TypographyTestResult;
    accessibility: AccessibilityTestResult;
    performance: PerformanceTestResult;
    overall: {
      passed: boolean;
      score: number;
      recommendations: string[];
    };
  }> {
    const typography = this.testTypography(element, expectedConfig);
    const accessibility = this.testTypographyAccessibility(element, background);
    const performance = await this.testTypographyPerformance(element);
    
    const overallScore = Math.round((typography.score + accessibility.score + performance.score) / 3);
    const overallPassed = typography.passed && accessibility.passed && performance.passed;
    
    const overallRecommendations = [
      ...typography.recommendations,
      ...accessibility.recommendations,
      ...performance.recommendations,
    ];
    
    return {
      typography,
      accessibility,
      performance,
      overall: {
        passed: overallPassed,
        score: overallScore,
        recommendations: [...new Set(overallRecommendations)],
      },
    };
  }
}

// Luxury typography testing presets
export const luxuryTypographyTestingPresets = {
  // Test configurations for different typography types
  display: {
    expectedConfig: luxuryTypographyPresets.display,
    description: 'Display typography testing configuration',
  },
  heading: {
    expectedConfig: luxuryTypographyPresets.heading.h1,
    description: 'Heading typography testing configuration',
  },
  body: {
    expectedConfig: luxuryTypographyPresets.body.base,
    description: 'Body typography testing configuration',
  },
  accent: {
    expectedConfig: luxuryTypographyPresets.accent,
    description: 'Accent typography testing configuration',
  },
  caption: {
    expectedConfig: luxuryTypographyPresets.caption,
    description: 'Caption typography testing configuration',
  },
};

// Luxury typography testing utilities
export const luxuryTypographyTestingUtils = {
  /**
   * Test typography
   */
  testTypography: (element: HTMLElement, expectedConfig: any) => {
    return LuxuryTypographyTesting.testTypography(element, expectedConfig);
  },

  /**
   * Test accessibility
   */
  testAccessibility: (element: HTMLElement, background?: string) => {
    return LuxuryTypographyTesting.testTypographyAccessibility(element, background);
  },

  /**
   * Test performance
   */
  testPerformance: (element: HTMLElement) => {
    return LuxuryTypographyTesting.testTypographyPerformance(element);
  },

  /**
   * Test consistency
   */
  testConsistency: (elements: HTMLElement[], expectedConfig: any) => {
    return LuxuryTypographyTesting.testTypographyConsistency(elements, expectedConfig);
  },

  /**
   * Test responsiveness
   */
  testResponsiveness: (element: HTMLElement, breakpoints?: Record<string, number>) => {
    return LuxuryTypographyTesting.testTypographyResponsiveness(element, breakpoints);
  },

  /**
   * Run comprehensive tests
   */
  runComprehensiveTests: (element: HTMLElement, expectedConfig: any, background?: string) => {
    return LuxuryTypographyTesting.runComprehensiveTests(element, expectedConfig, background);
  },
};

// Export all utilities
export default {
  LuxuryTypographyTesting,
  luxuryTypographyTestingPresets,
  luxuryTypographyTestingUtils,
};
