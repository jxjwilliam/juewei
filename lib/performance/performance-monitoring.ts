/**
 * Performance Monitoring Configuration for Juewei UI
 * Tracks Core Web Vitals and font loading performance
 */

// Core Web Vitals thresholds
export const PERFORMANCE_THRESHOLDS = {
  // First Contentful Paint
  FCP: {
    GOOD: 1800, // 1.8 seconds
    NEEDS_IMPROVEMENT: 3000, // 3 seconds
  },
  // Largest Contentful Paint
  LCP: {
    GOOD: 2500, // 2.5 seconds
    NEEDS_IMPROVEMENT: 4000, // 4 seconds
  },
  // Cumulative Layout Shift
  CLS: {
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
  },
  // First Input Delay
  FID: {
    GOOD: 100, // 100ms
    NEEDS_IMPROVEMENT: 300, // 300ms
  },
  // Interaction to Next Paint
  INP: {
    GOOD: 200, // 200ms
    NEEDS_IMPROVEMENT: 500, // 500ms
  },
} as const;

// Font loading performance thresholds
export const FONT_PERFORMANCE_THRESHOLDS = {
  // Font loading time
  LOAD_TIME: {
    GOOD: 200, // 200ms
    NEEDS_IMPROVEMENT: 500, // 500ms
  },
  // Font swap time
  SWAP_TIME: {
    GOOD: 100, // 100ms
    NEEDS_IMPROVEMENT: 300, // 300ms
  },
} as const;

// Image optimization thresholds
export const IMAGE_PERFORMANCE_THRESHOLDS = {
  // Image loading time
  LOAD_TIME: {
    GOOD: 1000, // 1 second
    NEEDS_IMPROVEMENT: 2000, // 2 seconds
  },
  // Image file size
  FILE_SIZE: {
    GOOD: 100, // 100KB
    NEEDS_IMPROVEMENT: 500, // 500KB
  },
} as const;

// Performance monitoring interface
export interface PerformanceMetrics {
  // Core Web Vitals
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
  inp?: number;
  
  // Font performance
  fontLoadTime?: number;
  fontSwapTime?: number;
  
  // Image performance
  imageLoadTime?: number;
  imageFileSize?: number;
  
  // Timestamp
  timestamp: number;
  
  // User agent
  userAgent?: string;
  
  // Connection type
  connectionType?: string;
}

// Performance monitoring class
export class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  
  constructor() {
    this.initializeMonitoring();
  }
  
  private initializeMonitoring() {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Monitor Core Web Vitals
    this.monitorCoreWebVitals();
    
    // Monitor font loading
    this.monitorFontLoading();
    
    // Monitor image loading
    this.monitorImageLoading();
  }
  
  private monitorCoreWebVitals() {
    // Monitor FCP
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('fcp', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    }
    
    // Monitor LCP
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.recordMetric('lcp', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Monitor CLS
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
          }
        }
        this.recordMetric('cls', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  private monitorFontLoading() {
    // Monitor font loading performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('font')) {
            const resourceEntry = entry as PerformanceResourceTiming;
            const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
            this.recordMetric('fontLoadTime', loadTime);
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    }
  }
  
  private monitorImageLoading() {
    // Monitor image loading performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            const resourceEntry = entry as PerformanceResourceTiming;
            const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
            this.recordMetric('imageLoadTime', loadTime);
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    }
  }
  
  private recordMetric(key: keyof PerformanceMetrics, value: number) {
    const metric: PerformanceMetrics = {
      [key]: value,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      connectionType: (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType,
    };
    
    this.metrics.push(metric);
    
    // Log performance issues
    this.checkPerformanceThresholds(key, value);
  }
  
  private checkPerformanceThresholds(key: keyof PerformanceMetrics, value: number) {
    const thresholds = PERFORMANCE_THRESHOLDS[key as keyof typeof PERFORMANCE_THRESHOLDS];
    if (!thresholds) return;
    
    if (value > thresholds.NEEDS_IMPROVEMENT) {
      console.warn(`⚠️ Performance issue detected: ${key} = ${value}ms (threshold: ${thresholds.NEEDS_IMPROVEMENT}ms)`);
    } else if (value > thresholds.GOOD) {
      console.info(`ℹ️ Performance could be improved: ${key} = ${value}ms (threshold: ${thresholds.GOOD}ms)`);
    }
  }
  
  // Get performance metrics
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }
  
  // Get latest metrics
  getLatestMetrics(): PerformanceMetrics | null {
    return this.metrics[this.metrics.length - 1] || null;
  }
  
  // Clear metrics
  clearMetrics() {
    this.metrics = [];
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Performance reporting utility
export function reportPerformance(metrics: PerformanceMetrics) {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Performance Metrics:', metrics);
  }
  
  // In production, send to analytics
  if (process.env.NODE_ENV === 'production') {
    // Send to Vercel Analytics or other analytics service
    if (typeof window !== 'undefined' && (window as Window & { va?: (action: string, event: string, data: unknown) => void }).va) {
      (window as Window & { va: (action: string, event: string, data: unknown) => void }).va('track', 'performance', metrics);
    }
  }
}
