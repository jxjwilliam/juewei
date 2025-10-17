/**
 * R2 Fallback Mechanisms
 * Handles graceful degradation when R2 is unavailable
 */

import { getR2ImageUrl, getFallbackUrl } from './r2-image';

export interface FallbackOptions {
  enableFallback: boolean;
  fallbackStrategy: 'local' | 'placeholder' | 'retry';
  maxRetries: number;
  retryDelay: number;
  placeholderUrl?: string;
}

export interface FallbackResult {
  success: boolean;
  url: string;
  source: 'r2' | 'local' | 'placeholder';
  error?: string;
  retryCount?: number;
}

/**
 * Check R2 availability
 */
export async function checkR2Availability(): Promise<boolean> {
  try {
    const testUrl = getR2ImageUrl('test-connection.webp');
    const response = await fetch(testUrl, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    return response.ok;
  } catch (error) {
    console.warn('R2 availability check failed:', error);
    return false;
  }
}

/**
 * Get image URL with fallback handling
 */
export async function getImageUrlWithFallback(
  imagePath: string,
  options: FallbackOptions = {
    enableFallback: true,
    fallbackStrategy: 'local',
    maxRetries: 3,
    retryDelay: 1000,
  }
): Promise<FallbackResult> {
  let retryCount = 0;
  
  while (retryCount < options.maxRetries) {
    try {
      // Try R2 first
      const r2Url = getR2ImageUrl(imagePath);
      const response = await fetch(r2Url, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      
      if (response.ok) {
        return {
          success: true,
          url: r2Url,
          source: 'r2',
          retryCount
        };
      }
    } catch (error) {
      console.warn(`R2 attempt ${retryCount + 1} failed:`, error);
    }
    
    retryCount++;
    
    if (retryCount < options.maxRetries) {
      await new Promise(resolve => setTimeout(resolve, options.retryDelay));
    }
  }
  
  // R2 failed, try fallback
  if (options.enableFallback) {
    switch (options.fallbackStrategy) {
      case 'local':
        const localUrl = getFallbackUrl(imagePath);
        return {
          success: true,
          url: localUrl,
          source: 'local',
          retryCount
        };
        
      case 'placeholder':
        const placeholderUrl = options.placeholderUrl || '/placeholder-image.webp';
        return {
          success: true,
          url: placeholderUrl,
          source: 'placeholder',
          retryCount
        };
        
      case 'retry':
        return {
          success: false,
          url: '',
          source: 'r2',
          error: 'R2 unavailable after retries',
          retryCount
        };
    }
  }
  
  return {
    success: false,
    url: '',
    source: 'r2',
    error: 'R2 unavailable and fallback disabled',
    retryCount
  };
}

/**
 * Batch check multiple images
 */
export async function batchCheckImages(
  imagePaths: string[],
  options: FallbackOptions = {
    enableFallback: true,
    fallbackStrategy: 'local',
    maxRetries: 1,
    retryDelay: 500,
  }
): Promise<FallbackResult[]> {
  const results = await Promise.all(
    imagePaths.map(path => getImageUrlWithFallback(path, options))
  );
  
  return results;
}

/**
 * Get fallback statistics
 */
export function getFallbackStats(results: FallbackResult[]): {
  total: number;
  r2Success: number;
  localFallback: number;
  placeholderFallback: number;
  failures: number;
  successRate: number;
} {
  const total = results.length;
  const r2Success = results.filter(r => r.source === 'r2' && r.success).length;
  const localFallback = results.filter(r => r.source === 'local' && r.success).length;
  const placeholderFallback = results.filter(r => r.source === 'placeholder' && r.success).length;
  const failures = results.filter(r => !r.success).length;
  const successRate = (total - failures) / total;
  
  return {
    total,
    r2Success,
    localFallback,
    placeholderFallback,
    failures,
    successRate
  };
}

/**
 * Monitor R2 health
 */
export class R2HealthMonitor {
  private isHealthy: boolean = true;
  private lastCheck: Date = new Date();
  private checkInterval: number = 30000; // 30 seconds
  private intervalId: NodeJS.Timeout | null = null;
  
  constructor(private options: FallbackOptions = {
    enableFallback: true,
    fallbackStrategy: 'local',
    maxRetries: 3,
    retryDelay: 1000,
  }) {}
  
  start(): void {
    this.intervalId = setInterval(async () => {
      await this.checkHealth();
    }, this.checkInterval);
  }
  
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  private async checkHealth(): Promise<void> {
    const isHealthy = await checkR2Availability();
    this.isHealthy = isHealthy;
    this.lastCheck = new Date();
    
    if (!isHealthy) {
      console.warn('R2 health check failed - enabling fallback mode');
    } else {
      console.log('R2 health check passed');
    }
  }
  
  getHealthStatus(): {
    isHealthy: boolean;
    lastCheck: Date;
    checkInterval: number;
  } {
    return {
      isHealthy: this.isHealthy,
      lastCheck: this.lastCheck,
      checkInterval: this.checkInterval
    };
  }
}

/**
 * Fallback configuration
 */
export const FallbackConfig = {
  /**
   * Default fallback options
   */
  default: {
    enableFallback: true,
    fallbackStrategy: 'local' as const,
    maxRetries: 3,
    retryDelay: 1000,
  },
  
  /**
   * Aggressive fallback (fast local fallback)
   */
  aggressive: {
    enableFallback: true,
    fallbackStrategy: 'local' as const,
    maxRetries: 1,
    retryDelay: 500,
  },
  
  /**
   * Conservative fallback (more retries)
   */
  conservative: {
    enableFallback: true,
    fallbackStrategy: 'local' as const,
    maxRetries: 5,
    retryDelay: 2000,
  },
  
  /**
   * Placeholder fallback
   */
  placeholder: {
    enableFallback: true,
    fallbackStrategy: 'placeholder' as const,
    maxRetries: 2,
    retryDelay: 1000,
    placeholderUrl: '/placeholder-image.webp',
  },
};

/**
 * Fallback utilities
 */
export const FallbackUtils = {
  /**
   * Check R2 availability
   */
  checkAvailability: checkR2Availability,
  
  /**
   * Get image URL with fallback
   */
  getImageUrl: getImageUrlWithFallback,
  
  /**
   * Batch check images
   */
  batchCheck: batchCheckImages,
  
  /**
   * Get fallback statistics
   */
  getStats: getFallbackStats,
  
  /**
   * Create health monitor
   */
  createHealthMonitor: (options?: FallbackOptions) => new R2HealthMonitor(options),
};
