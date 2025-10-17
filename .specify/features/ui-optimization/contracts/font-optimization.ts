/**
 * Font Optimization API Contract
 * 
 * Defines the interface for Next.js font optimization system
 * for the Juewei UI restaurant website.
 */

export interface FontFamily {
  name: string;
  type: 'primary' | 'heading' | 'fallback';
  language: 'chinese' | 'english' | 'both';
  weights: number[];
  loadingStrategy: 'preload' | 'swap' | 'fallback';
  fallbackChain: string[];
}

export interface FontOptimizationConfig {
  // Next.js font optimization configuration
  preload: boolean;
  display: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  fallback: string[];
  adjustFontFallback: boolean;
  
  // Performance optimization
  variable: string;
  subsets: string[];
  
  // Chinese font specific
  unicodeRange: string;
  fontFeatureSettings: string;
}

export interface FontLoadingMetrics {
  fontFamily: string;
  loadingTime: number;
  fileSize: number;
  fallbackUsed: boolean;
  layoutShift: number;
  performanceScore: number;
}

export interface FontOptimizationAPI {
  // Font loading and optimization
  loadFont(fontFamily: FontFamily, config: FontOptimizationConfig): Promise<FontLoadingMetrics>;
  
  // Performance monitoring
  getFontMetrics(fontFamily: string): Promise<FontLoadingMetrics>;
  
  // Fallback management
  getFallbackFont(fontFamily: string): string;
  
  // Chinese text optimization
  optimizeChineseRendering(fontFamily: string): Promise<void>;
}

export interface FontOptimizationService {
  // Initialize font optimization system
  initialize(): Promise<void>;
  
  // Load critical fonts
  loadCriticalFonts(): Promise<FontLoadingMetrics[]>;
  
  // Monitor font performance
  monitorPerformance(): Promise<FontLoadingMetrics[]>;
  
  // Optimize font loading
  optimizeLoading(): Promise<void>;
}

// Implementation for Next.js font optimization
export class NextJSFontOptimization implements FontOptimizationAPI {
  async loadFont(
    fontFamily: FontFamily, 
    config: FontOptimizationConfig
  ): Promise<FontLoadingMetrics> {
    // Implementation for Next.js font loading
    // This would integrate with next/font/local
    throw new Error('Implementation required');
  }
  
  async getFontMetrics(fontFamily: string): Promise<FontLoadingMetrics> {
    // Implementation for font performance monitoring
    throw new Error('Implementation required');
  }
  
  getFallbackFont(fontFamily: string): string {
    // Implementation for fallback font resolution
    throw new Error('Implementation required');
  }
  
  async optimizeChineseRendering(fontFamily: string): Promise<void> {
    // Implementation for Chinese text optimization
    throw new Error('Implementation required');
  }
}
