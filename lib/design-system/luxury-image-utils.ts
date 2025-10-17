/**
 * Luxury Image Optimization Utilities
 * 
 * Provides utilities for optimizing images in the luxury design system,
 * including responsive image handling, lazy loading, and performance optimization.
 */

import { cn } from '@/lib/utils';

// Image optimization configuration
export const luxuryImageConfig = {
  // Quality settings for different use cases
  quality: {
    hero: 95,
    showcase: 90,
    gallery: 85,
    thumbnail: 80,
    placeholder: 20,
  },
  
  // Size presets for responsive images
  sizes: {
    hero: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw',
    showcase: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw',
    gallery: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw',
    thumbnail: '(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw',
  },
  
  // Breakpoints for responsive images
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
    large: 1600,
  },
  
  // Format preferences
  formats: ['webp', 'avif', 'jpeg', 'png'],
  
  // Lazy loading configuration
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1,
  },
};

// Image optimization utilities
export class LuxuryImageOptimizer {
  /**
   * Generate responsive image sizes based on container and use case
   */
  static generateSizes(containerWidth: number, useCase: keyof typeof luxuryImageConfig.sizes): string {
    const sizeConfig = luxuryImageConfig.sizes[useCase];
    return sizeConfig;
  }

  /**
   * Calculate optimal image dimensions based on aspect ratio and container
   */
  static calculateDimensions(
    containerWidth: number,
    aspectRatio: number,
    maxWidth: number = 1920
  ): { width: number; height: number } {
    const width = Math.min(containerWidth, maxWidth);
    const height = Math.round(width / aspectRatio);
    
    return { width, height };
  }

  /**
   * Generate srcSet for responsive images
   */
  static generateSrcSet(
    baseSrc: string,
    widths: number[],
    quality: number = 85
  ): string {
    return widths
      .map(width => `${baseSrc}?w=${width}&q=${quality} ${width}w`)
      .join(', ');
  }

  /**
   * Get optimal quality for image use case
   */
  static getQuality(useCase: keyof typeof luxuryImageConfig.quality): number {
    return luxuryImageConfig.quality[useCase];
  }

  /**
   * Generate placeholder image data URL
   */
  static generatePlaceholder(width: number, height: number, color: string = '#1A1A1A'): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }

  /**
   * Check if image is in viewport for lazy loading
   */
  static isInViewport(element: HTMLElement, rootMargin: string = '50px'): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const margin = parseInt(rootMargin.replace('px', ''));
    
    return (
      rect.top <= windowHeight + margin &&
      rect.bottom >= -margin &&
      rect.left <= windowWidth + margin &&
      rect.right >= -margin
    );
  }

  /**
   * Preload critical images
   */
  static preloadImage(src: string, priority: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
      
      if (priority) {
        img.loading = 'eager';
      }
    });
  }

  /**
   * Generate blur data URL for placeholder
   */
  static generateBlurDataURL(width: number, height: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1A1A1A');
      gradient.addColorStop(0.5, '#2A2A2A');
      gradient.addColorStop(1, '#1A1A1A');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }
}

// Luxury image loading states
export const luxuryImageLoadingStates = {
  loading: 'luxury-image-loading',
  loaded: 'luxury-image-loaded',
  error: 'luxury-image-error',
  placeholder: 'luxury-image-placeholder',
};

// Luxury image loading utilities
export class LuxuryImageLoader {
  private static observers: Map<HTMLElement, IntersectionObserver> = new Map();

  /**
   * Setup lazy loading for image elements
   */
  static setupLazyLoading(
    element: HTMLElement,
    onLoad: () => void,
    onError: () => void
  ): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onLoad();
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: luxuryImageConfig.lazyLoading.rootMargin,
        threshold: luxuryImageConfig.lazyLoading.threshold,
      }
    );

    observer.observe(element);
    this.observers.set(element, observer);
  }

  /**
   * Cleanup lazy loading observer
   */
  static cleanupLazyLoading(element: HTMLElement): void {
    const observer = this.observers.get(element);
    if (observer) {
      observer.unobserve(element);
      observer.disconnect();
      this.observers.delete(element);
    }
  }

  /**
   * Setup progressive image loading
   */
  static setupProgressiveLoading(
    element: HTMLElement,
    lowQualitySrc: string,
    highQualitySrc: string,
    onComplete: () => void
  ): void {
    // Load low quality image first
    const lowQualityImg = new Image();
    lowQualityImg.onload = () => {
      element.style.backgroundImage = `url(${lowQualitySrc})`;
      element.classList.add(luxuryImageLoadingStates.loading);
      
      // Then load high quality image
      const highQualityImg = new Image();
      highQualityImg.onload = () => {
        element.style.backgroundImage = `url(${highQualitySrc})`;
        element.classList.remove(luxuryImageLoadingStates.loading);
        element.classList.add(luxuryImageLoadingStates.loaded);
        onComplete();
      };
      highQualityImg.onerror = () => {
        element.classList.remove(luxuryImageLoadingStates.loading);
        element.classList.add(luxuryImageLoadingStates.error);
      };
      highQualityImg.src = highQualitySrc;
    };
    lowQualityImg.src = lowQualitySrc;
  }
}

// Luxury image performance monitoring
export class LuxuryImagePerformance {
  private static metrics: Map<string, number> = new Map();

  /**
   * Track image load time
   */
  static trackLoadTime(imageId: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    this.metrics.set(`${imageId}_load_time`, loadTime);
  }

  /**
   * Track image size
   */
  static trackImageSize(imageId: string, size: number): void {
    this.metrics.set(`${imageId}_size`, size);
  }

  /**
   * Get performance metrics
   */
  static getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Clear performance metrics
   */
  static clearMetrics(): void {
    this.metrics.clear();
  }

  /**
   * Get average load time
   */
  static getAverageLoadTime(): number {
    const loadTimes = Array.from(this.metrics.entries())
      .filter(([key]) => key.endsWith('_load_time'))
      .map(([, value]) => value);
    
    return loadTimes.length > 0 
      ? loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length 
      : 0;
  }
}

// Luxury image responsive utilities
export const luxuryImageResponsive = {
  /**
   * Get responsive image classes
   */
  getResponsiveClasses: (variant: 'hero' | 'showcase' | 'gallery' | 'thumbnail') => {
    const baseClasses = 'w-full h-auto object-cover';
    const variantClasses = {
      hero: 'rounded-luxury-lg shadow-luxury-xl',
      showcase: 'rounded-luxury-md shadow-luxury-lg',
      gallery: 'rounded-luxury shadow-luxury-md',
      thumbnail: 'rounded-luxury-sm shadow-luxury-sm',
    };
    
    return cn(baseClasses, variantClasses[variant]);
  },

  /**
   * Get responsive image sizes
   */
  getResponsiveSizes: (variant: keyof typeof luxuryImageConfig.sizes) => {
    return luxuryImageConfig.sizes[variant];
  },

  /**
   * Get responsive image quality
   */
  getResponsiveQuality: (variant: keyof typeof luxuryImageConfig.quality) => {
    return luxuryImageConfig.quality[variant];
  },
};

// Luxury image accessibility utilities
export const luxuryImageAccessibility = {
  /**
   * Generate accessible alt text
   */
  generateAltText: (title: string, description?: string, context?: string): string => {
    let altText = title;
    if (description) {
      altText += ` - ${description}`;
    }
    if (context) {
      altText += ` (${context})`;
    }
    return altText;
  },

  /**
   * Check if image has proper alt text
   */
  validateAltText: (altText: string): boolean => {
    return altText.length > 0 && altText.length < 125;
  },

  /**
   * Generate image caption
   */
  generateCaption: (title: string, description?: string): string => {
    return description ? `${title} - ${description}` : title;
  },
};

// Luxury image error handling
export const luxuryImageErrorHandling = {
  /**
   * Handle image load error
   */
  handleLoadError: (element: HTMLElement, fallbackSrc?: string): void => {
    element.classList.add(luxuryImageLoadingStates.error);
    
    if (fallbackSrc) {
      element.style.backgroundImage = `url(${fallbackSrc})`;
    }
  },

  /**
   * Retry image loading
   */
  retryImageLoad: (src: string, maxRetries: number = 3): Promise<void> => {
    return new Promise((resolve, reject) => {
      let retries = 0;
      
      const attemptLoad = () => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          retries++;
          if (retries < maxRetries) {
            setTimeout(attemptLoad, 1000 * retries);
          } else {
            reject(new Error(`Failed to load image after ${maxRetries} retries`));
          }
        };
        img.src = src;
      };
      
      attemptLoad();
    });
  },
};

// Export all utilities
export default {
  LuxuryImageOptimizer,
  LuxuryImageLoader,
  LuxuryImagePerformance,
  luxuryImageConfig,
  luxuryImageLoadingStates,
  luxuryImageResponsive,
  luxuryImageAccessibility,
  luxuryImageErrorHandling,
};
