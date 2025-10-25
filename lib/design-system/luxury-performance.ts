/**
 * Luxury Performance Monitoring
 * 
 * Advanced performance monitoring and optimization utilities for the luxury design system.
 * Tracks animation performance, resource usage, and provides optimization recommendations.
 */

// Performance metrics interface
interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  animationDuration: number;
  renderTime: number;
  timestamp: number;
}

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  fps: {
    excellent: 60,
    good: 45,
    acceptable: 30,
    poor: 15,
  },
  memoryUsage: {
    excellent: 50, // MB
    good: 100,
    acceptable: 200,
    poor: 500,
  },
  animationDuration: {
    excellent: 0.2, // seconds
    good: 0.3,
    acceptable: 0.5,
    poor: 1.0,
  },
  renderTime: {
    excellent: 16, // ms (60fps)
    good: 33, // ms (30fps)
    acceptable: 50, // ms (20fps)
    poor: 100, // ms (10fps)
  },
};

// Performance monitoring class
export class LuxuryPerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private isMonitoring = false;
  private animationFrameId: number | null = null;
  private lastFrameTime = 0;
  private frameCount = 0;
  private fps = 0;
  private memoryUsage = 0;

  constructor() {
    this.startMonitoring();
  }

  /**
   * Start performance monitoring
   */
  startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitorFPS();
    this.monitorMemory();
  }

  /**
   * Stop performance monitoring
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Monitor FPS
   */
  private monitorFPS(): void {
    const measureFPS = (currentTime: number) => {
      if (!this.isMonitoring) return;

      if (this.lastFrameTime === 0) {
        this.lastFrameTime = currentTime;
      }

      this.frameCount++;
      const deltaTime = currentTime - this.lastFrameTime;

      if (deltaTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / deltaTime);
        this.lastFrameTime = currentTime;
        this.frameCount = 0;
      }

      this.animationFrameId = requestAnimationFrame(measureFPS);
    };

    this.animationFrameId = requestAnimationFrame(measureFPS);
  }

  /**
   * Monitor memory usage
   */
  private monitorMemory(): void {
    if (typeof performance === 'undefined' || !(performance as any).memory) return;

    const measureMemory = () => {
      if (!this.isMonitoring) return;

      this.memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
      
      setTimeout(measureMemory, 1000); // Check every second
    };

    measureMemory();
  }

  /**
   * Record performance metrics
   */
  recordMetrics(animationDuration: number, renderTime: number): void {
    const metrics: PerformanceMetrics = {
      fps: this.fps,
      memoryUsage: this.memoryUsage,
      animationDuration,
      renderTime,
      timestamp: Date.now(),
    };

    this.metrics.push(metrics);

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  /**
   * Get current performance status
   */
  getPerformanceStatus(): {
    level: 'excellent' | 'good' | 'acceptable' | 'poor';
    fps: number;
    memoryUsage: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let level: 'excellent' | 'good' | 'acceptable' | 'poor' = 'excellent';

    // Check FPS
    if (this.fps < PERFORMANCE_THRESHOLDS.fps.poor) {
      level = 'poor';
      recommendations.push('FPS is very low. Consider reducing animation complexity or disabling animations.');
    } else if (this.fps < PERFORMANCE_THRESHOLDS.fps.acceptable) {
      level = 'acceptable';
      recommendations.push('FPS is below optimal. Consider optimizing animations.');
    } else if (this.fps < PERFORMANCE_THRESHOLDS.fps.good) {
      level = 'good';
      recommendations.push('FPS is good but could be improved.');
    }

    // Check memory usage
    if (this.memoryUsage > PERFORMANCE_THRESHOLDS.memoryUsage.poor) {
      level = 'poor';
      recommendations.push('Memory usage is very high. Consider reducing resource usage.');
    } else if (this.memoryUsage > PERFORMANCE_THRESHOLDS.memoryUsage.acceptable) {
      level = 'acceptable';
      recommendations.push('Memory usage is elevated. Monitor for memory leaks.');
    }

    return {
      level,
      fps: this.fps,
      memoryUsage: this.memoryUsage,
      recommendations,
    };
  }

  /**
   * Get performance analytics
   */
  getAnalytics(): {
    averageFPS: number;
    averageMemoryUsage: number;
    performanceTrend: 'improving' | 'stable' | 'declining';
    bottlenecks: string[];
  } {
    if (this.metrics.length === 0) {
      return {
        averageFPS: 0,
        averageMemoryUsage: 0,
        performanceTrend: 'stable',
        bottlenecks: [],
      };
    }

    const averageFPS = this.metrics.reduce((sum, m) => sum + m.fps, 0) / this.metrics.length;
    const averageMemoryUsage = this.metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / this.metrics.length;

    // Calculate performance trend
    const recentMetrics = this.metrics.slice(-10);
    const olderMetrics = this.metrics.slice(-20, -10);
    
    const recentAvgFPS = recentMetrics.reduce((sum, m) => sum + m.fps, 0) / recentMetrics.length;
    const olderAvgFPS = olderMetrics.reduce((sum, m) => sum + m.fps, 0) / olderMetrics.length;
    
    let performanceTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentAvgFPS > olderAvgFPS + 5) {
      performanceTrend = 'improving';
    } else if (recentAvgFPS < olderAvgFPS - 5) {
      performanceTrend = 'declining';
    }

    // Identify bottlenecks
    const bottlenecks: string[] = [];
    if (averageFPS < 30) {
      bottlenecks.push('Low FPS - Animation performance issues');
    }
    if (averageMemoryUsage > 200) {
      bottlenecks.push('High memory usage - Potential memory leaks');
    }

    return {
      averageFPS,
      averageMemoryUsage,
      performanceTrend,
      bottlenecks,
    };
  }

  /**
   * Get optimization recommendations
   */
  getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const status = this.getPerformanceStatus();

    if (status.fps < 30) {
      recommendations.push('Reduce animation complexity');
      recommendations.push('Use CSS transforms instead of changing layout properties');
      recommendations.push('Implement animation throttling');
      recommendations.push('Consider using requestAnimationFrame for smooth animations');
    }

    if (status.memoryUsage > 100) {
      recommendations.push('Implement proper cleanup for event listeners');
      recommendations.push('Use object pooling for frequently created objects');
      recommendations.push('Optimize image loading and caching');
      recommendations.push('Monitor for memory leaks in animations');
    }

    if (status.level === 'poor') {
      recommendations.push('Consider implementing progressive enhancement');
      recommendations.push('Add performance monitoring to production');
      recommendations.push('Implement graceful degradation for low-end devices');
    }

    return recommendations;
  }
}

// Animation performance utilities
export const luxuryAnimationPerformance = {
  /**
   * Throttle animation to maintain performance
   */
  throttleAnimation: (callback: () => void, fps: number = 60): (() => void) => {
    let lastTime = 0;
    const interval = 1000 / fps;

    return () => {
      const now = Date.now();
      if (now - lastTime >= interval) {
        callback();
        lastTime = now;
      }
    };
  },

  /**
   * Debounce animation to prevent excessive calls
   */
  debounceAnimation: (callback: () => void, delay: number = 16): (() => void) => {
    let timeoutId: NodeJS.Timeout;

    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  },

  /**
   * Check if device can handle complex animations
   */
  canHandleComplexAnimations: (): boolean => {
    if (typeof navigator === 'undefined') return true;

    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;
    if (cores < 4) return false;

    // Check memory
    const memory = (navigator as any).deviceMemory || 4;
    if (memory < 4) return false;

    // Check connection speed
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === 'slow-2g') return false;

    return true;
  },

  /**
   * Get optimal animation settings for device
   */
  getOptimalAnimationSettings: () => {
    const canHandleComplex = luxuryAnimationPerformance.canHandleComplexAnimations();
    
    return {
      duration: canHandleComplex ? 0.3 : 0.2,
      easing: canHandleComplex ? 'easeInOut' : 'easeOut',
      fps: canHandleComplex ? 60 : 30,
      complexity: canHandleComplex ? 'high' : 'low',
    };
  },
};

// Resource monitoring utilities
export const luxuryResourceMonitoring = {
  /**
   * Monitor image loading performance
   */
  monitorImageLoading: (imageElement: HTMLImageElement): Promise<{
    loadTime: number;
    size: number;
    format: string;
  }> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      imageElement.onload = () => {
        const loadTime = performance.now() - startTime;
        const size = imageElement.naturalWidth * imageElement.naturalHeight;
        const format = imageElement.src.split('.').pop() || 'unknown';
        
        resolve({ loadTime, size, format });
      };
    });
  },

  /**
   * Monitor font loading performance
   */
  monitorFontLoading: (fontFamily: string): Promise<{
    loadTime: number;
    isLoaded: boolean;
  }> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      if (typeof document === 'undefined') {
        resolve({ loadTime: 0, isLoaded: false });
        return;
      }

      const checkFont = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          resolve({ loadTime: 0, isLoaded: false });
          return;
        }

        context.font = `12px ${fontFamily}`;
        const testText = 'Test';
        const metrics1 = context.measureText(testText);
        
        context.font = '12px monospace';
        const metrics2 = context.measureText(testText);
        
        const isLoaded = metrics1.width !== metrics2.width;
        const loadTime = performance.now() - startTime;
        
        if (isLoaded) {
          resolve({ loadTime, isLoaded });
        } else {
          setTimeout(checkFont, 100);
        }
      };

      checkFont();
    });
  },

  /**
   * Monitor CSS animation performance
   */
  monitorCSSAnimation: (element: HTMLElement, animationName: string): Promise<{
    duration: number;
    fps: number;
    droppedFrames: number;
  }> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      let frameCount = 0;
      let lastFrameTime = startTime;
      let droppedFrames = 0;

      const measureFrame = (currentTime: number) => {
        frameCount++;
        const deltaTime = currentTime - lastFrameTime;
        
        if (deltaTime > 20) { // More than 20ms between frames
          droppedFrames++;
        }
        
        lastFrameTime = currentTime;
      };

      const handleAnimationEnd = () => {
        const duration = performance.now() - startTime;
        const fps = Math.round((frameCount * 1000) / duration);
        
        resolve({ duration, fps, droppedFrames });
      };

      element.addEventListener('animationend', handleAnimationEnd, { once: true });
      
      const animationFrame = () => {
        measureFrame(performance.now());
        requestAnimationFrame(animationFrame);
      };
      
      requestAnimationFrame(animationFrame);
    });
  },
};

// Performance optimization utilities
export const luxuryPerformanceOptimization = {
  /**
   * Optimize images for performance
   */
  optimizeImages: (images: HTMLImageElement[]): void => {
    images.forEach(img => {
      // Add loading="lazy" if not present
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Add decoding="async" if not present
      if (!img.decoding) {
        img.decoding = 'async';
      }
    });
  },

  /**
   * Preload critical resources
   */
  preloadCriticalResources: (resources: Array<{ href: string; as: string }>): void => {
    if (typeof document === 'undefined') return;

    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  },

  /**
   * Implement intersection observer for lazy loading
   */
  setupLazyLoading: (elements: HTMLElement[], callback: (element: HTMLElement) => void): void => {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for older browsers
      elements.forEach(callback);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(element => observer.observe(element));
  },

  /**
   * Implement performance budget
   */
  checkPerformanceBudget: (): {
    withinBudget: boolean;
    recommendations: string[];
  } => {
    const recommendations: string[] = [];
    let withinBudget = true;

    // Check if we're within performance budget
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      const memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024;
      if (memoryUsage > 100) {
        withinBudget = false;
        recommendations.push('Memory usage exceeds budget. Consider optimizing resources.');
      }
    }

    // Check animation performance
    const canHandleComplex = luxuryAnimationPerformance.canHandleComplexAnimations();
    if (!canHandleComplex) {
      withinBudget = false;
      recommendations.push('Device may struggle with complex animations. Consider simplifying.');
    }

    return { withinBudget, recommendations };
  },
};

// Export performance monitoring instance
export const luxuryPerformanceMonitor = new LuxuryPerformanceMonitor();

// Export all utilities
export const luxuryPerformanceUtilities = {
  monitor: luxuryPerformanceMonitor,
  animation: luxuryAnimationPerformance,
  resource: luxuryResourceMonitoring,
  optimization: luxuryPerformanceOptimization,
};

export default luxuryPerformanceUtilities;
