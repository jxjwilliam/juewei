/**
 * Luxury Image Responsive System
 * 
 * Provides utilities for responsive image handling in the luxury design system,
 * including breakpoint management, image sizing, and responsive behavior.
 */

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Responsive breakpoints
export const luxuryResponsiveBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Responsive image configurations
export const luxuryResponsiveConfig = {
  // Image sizes for different use cases
  sizes: {
    hero: {
      xs: { width: 320, height: 240 },
      sm: { width: 640, height: 480 },
      md: { width: 768, height: 576 },
      lg: { width: 1024, height: 768 },
      xl: { width: 1280, height: 960 },
      '2xl': { width: 1536, height: 1152 },
    },
    showcase: {
      xs: { width: 160, height: 120 },
      sm: { width: 320, height: 240 },
      md: { width: 480, height: 360 },
      lg: { width: 640, height: 480 },
      xl: { width: 800, height: 600 },
      '2xl': { width: 960, height: 720 },
    },
    gallery: {
      xs: { width: 80, height: 60 },
      sm: { width: 160, height: 120 },
      md: { width: 240, height: 180 },
      lg: { width: 320, height: 240 },
      xl: { width: 400, height: 300 },
      '2xl': { width: 480, height: 360 },
    },
    thumbnail: {
      xs: { width: 40, height: 30 },
      sm: { width: 80, height: 60 },
      md: { width: 120, height: 90 },
      lg: { width: 160, height: 120 },
      xl: { width: 200, height: 150 },
      '2xl': { width: 240, height: 180 },
    },
  },
  
  // Aspect ratios
  aspectRatios: {
    square: '1/1',
    landscape: '16/9',
    portrait: '3/4',
    wide: '21/9',
    ultrawide: '32/9',
  },
  
  // Quality settings
  quality: {
    hero: 95,
    showcase: 90,
    gallery: 85,
    thumbnail: 80,
  },
};

// Responsive image utilities
export class LuxuryResponsiveImage {
  /**
   * Get responsive image sizes for a specific use case
   */
  static getSizes(useCase: keyof typeof luxuryResponsiveConfig.sizes) {
    return luxuryResponsiveConfig.sizes[useCase];
  }

  /**
   * Get image size for a specific breakpoint
   */
  static getSizeForBreakpoint(
    useCase: keyof typeof luxuryResponsiveConfig.sizes,
    breakpoint: keyof typeof luxuryResponsiveBreakpoints
  ) {
    const sizes = luxuryResponsiveConfig.sizes[useCase];
    return sizes[breakpoint];
  }

  /**
   * Generate responsive image srcSet
   */
  static generateSrcSet(
    baseSrc: string,
    useCase: keyof typeof luxuryResponsiveConfig.sizes,
    quality: number = 85
  ): string {
    const sizes = luxuryResponsiveConfig.sizes[useCase];
    const breakpoints = Object.keys(luxuryResponsiveBreakpoints) as Array<keyof typeof luxuryResponsiveBreakpoints>;
    
    return breakpoints
      .map(breakpoint => {
        const size = sizes[breakpoint];
        const width = size.width;
        return `${baseSrc}?w=${width}&q=${quality} ${width}w`;
      })
      .join(', ');
  }

  /**
   * Generate responsive image sizes attribute
   */
  static generateSizes(useCase: keyof typeof luxuryResponsiveConfig.sizes): string {
    const sizeConfigs = {
      hero: '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw',
      showcase: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw',
      gallery: '(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw',
      thumbnail: '(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16vw, (max-width: 1280px) 12vw, 10vw',
    };
    
    return sizeConfigs[useCase];
  }

  /**
   * Get optimal image quality for use case
   */
  static getQuality(useCase: keyof typeof luxuryResponsiveConfig.quality): number {
    return luxuryResponsiveConfig.quality[useCase];
  }

  /**
   * Calculate responsive image dimensions
   */
  static calculateDimensions(
    containerWidth: number,
    aspectRatio: keyof typeof luxuryResponsiveConfig.aspectRatios,
    maxWidth: number = 1920
  ): { width: number; height: number } {
    const ratio = luxuryResponsiveConfig.aspectRatios[aspectRatio];
    const [widthRatio, heightRatio] = ratio.split('/').map(Number);
    
    const width = Math.min(containerWidth, maxWidth);
    const height = Math.round((width * heightRatio) / widthRatio);
    
    return { width, height };
  }

  /**
   * Get responsive image classes
   */
  static getResponsiveClasses(
    useCase: keyof typeof luxuryResponsiveConfig.sizes,
    aspectRatio?: keyof typeof luxuryResponsiveConfig.aspectRatios
  ): string {
    const baseClasses = 'w-full h-auto object-cover';
    const aspectRatioClasses = aspectRatio ? `aspect-${aspectRatio}` : '';
    const useCaseClasses = {
      hero: 'rounded-luxury-xl shadow-luxury-2xl',
      showcase: 'rounded-luxury-lg shadow-luxury-xl',
      gallery: 'rounded-luxury shadow-luxury-lg',
      thumbnail: 'rounded-luxury-sm shadow-luxury-md',
    };
    
    return cn(baseClasses, aspectRatioClasses, useCaseClasses[useCase]);
  }
}

// Responsive image hook
export function useLuxuryResponsiveImage(
  useCase: keyof typeof luxuryResponsiveConfig.sizes,
  aspectRatio?: keyof typeof luxuryResponsiveConfig.aspectRatios
) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentBreakpoint, setCurrentBreakpoint] = useState<keyof typeof luxuryResponsiveBreakpoints>('xs');

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const breakpoint = Object.entries(luxuryResponsiveBreakpoints)
        .reverse()
        .find(([, bp]) => width >= bp)?.[0] as keyof typeof luxuryResponsiveBreakpoints || 'xs';
      
      setCurrentBreakpoint(breakpoint);
      
      if (aspectRatio) {
        const newDimensions = LuxuryResponsiveImage.calculateDimensions(width, aspectRatio);
        setDimensions(newDimensions);
      } else {
        const size = LuxuryResponsiveImage.getSizeForBreakpoint(useCase, breakpoint);
        setDimensions(size);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [useCase, aspectRatio]);

  return {
    dimensions,
    currentBreakpoint,
    srcSet: (baseSrc: string) => LuxuryResponsiveImage.generateSrcSet(baseSrc, useCase),
    sizes: LuxuryResponsiveImage.generateSizes(useCase),
    classes: LuxuryResponsiveImage.getResponsiveClasses(useCase, aspectRatio),
    quality: LuxuryResponsiveImage.getQuality(useCase),
  };
}

// Responsive image component props
export interface LuxuryResponsiveImageProps {
  src: string;
  alt: string;
  useCase: keyof typeof luxuryResponsiveConfig.sizes;
  aspectRatio?: keyof typeof luxuryResponsiveConfig.aspectRatios;
  quality?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

// Responsive image utilities
export const luxuryResponsiveImageUtils = {
  /**
   * Get responsive image configuration
   */
  getConfig: (useCase: keyof typeof luxuryResponsiveConfig.sizes) => ({
    sizes: luxuryResponsiveConfig.sizes[useCase],
    quality: luxuryResponsiveConfig.quality[useCase],
  }),

  /**
   * Check if image should be loaded for current breakpoint
   */
  shouldLoadForBreakpoint: (
    breakpoint: keyof typeof luxuryResponsiveBreakpoints,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ): boolean => {
    const priorityBreakpoints = {
      high: ['xs', 'sm', 'md'],
      medium: ['xs', 'sm', 'md', 'lg'],
      low: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    };
    
    return priorityBreakpoints[priority].includes(breakpoint);
  },

  /**
   * Get responsive image loading strategy
   */
  getLoadingStrategy: (
    useCase: keyof typeof luxuryResponsiveConfig.sizes,
    breakpoint: keyof typeof luxuryResponsiveBreakpoints
  ): 'eager' | 'lazy' => {
    const eagerUseCases = ['hero'];
    const eagerBreakpoints = ['xs', 'sm'];
    
    return (eagerUseCases.includes(useCase) && eagerBreakpoints.includes(breakpoint)) ? 'eager' : 'lazy';
  },

  /**
   * Generate responsive image placeholder
   */
  generatePlaceholder: (
    useCase: keyof typeof luxuryResponsiveConfig.sizes,
    breakpoint: keyof typeof luxuryResponsiveBreakpoints
  ): string => {
    const size = luxuryResponsiveConfig.sizes[useCase][breakpoint];
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(0, 0, size.width, size.height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  },

  /**
   * Calculate image priority based on use case and position
   */
  getImagePriority: (
    useCase: keyof typeof luxuryResponsiveConfig.sizes,
    position: 'above-fold' | 'below-fold' = 'below-fold'
  ): boolean => {
    const highPriorityUseCases = ['hero'];
    const aboveFold = position === 'above-fold';
    
    return highPriorityUseCases.includes(useCase) || aboveFold;
  },
};

// Responsive image variants
export const luxuryResponsiveImageVariants = {
  // Hero responsive image
  Hero: (props: Omit<LuxuryResponsiveImageProps, 'useCase'>) => {
    return null; // JSX not allowed in .ts files
  },
  
  // Showcase responsive image
  Showcase: (props: Omit<LuxuryResponsiveImageProps, 'useCase'>) => {
    return null; // JSX not allowed in .ts files
  },
  
  // Gallery responsive image
  Gallery: (props: Omit<LuxuryResponsiveImageProps, 'useCase'>) => {
    return null; // JSX not allowed in .ts files
  },
  
  // Thumbnail responsive image
  Thumbnail: (props: Omit<LuxuryResponsiveImageProps, 'useCase'>) => {
    return null; // JSX not allowed in .ts files
  },
};

// Export all utilities
export default {
  LuxuryResponsiveImage,
  useLuxuryResponsiveImage,
  luxuryResponsiveBreakpoints,
  luxuryResponsiveConfig,
  luxuryResponsiveImageUtils,
  luxuryResponsiveImageVariants,
};
