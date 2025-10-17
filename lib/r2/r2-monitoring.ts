/**
 * R2 Image Performance Monitoring
 * Comprehensive monitoring and alerting for image performance
 */

export interface PerformanceMetrics {
  imagePath: string;
  loadTime: number;
  success: boolean;
  error?: string;
  timestamp: Date;
  userAgent?: string;
  referrer?: string;
  cacheHit?: boolean;
  cdnHit?: boolean;
}

export interface MonitoringConfig {
  enabled: boolean;
  sampleRate: number; // 0-1, percentage of requests to monitor
  alertThresholds: {
    loadTime: number; // milliseconds
    errorRate: number; // percentage
    availability: number; // percentage
  };
  reportingInterval: number; // milliseconds
  maxMetrics: number; // maximum metrics to store
}

export interface Alert {
  id: string;
  type: 'performance' | 'error' | 'availability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metrics: PerformanceMetrics[];
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface MonitoringStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageLoadTime: number;
  p95LoadTime: number;
  p99LoadTime: number;
  errorRate: number;
  availability: number;
  cacheHitRate: number;
  cdnHitRate: number;
  timeRange: {
    start: Date;
    end: Date;
  };
}

/**
 * Performance monitoring class
 */
export class ImagePerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private alerts: Alert[] = [];
  private config: MonitoringConfig;
  private intervalId: NodeJS.Timeout | null = null;
  
  constructor(config: MonitoringConfig = {
    enabled: true,
    sampleRate: 1.0,
    alertThresholds: {
      loadTime: 2000, // 2 seconds
      errorRate: 5, // 5%
      availability: 95, // 95%
    },
    reportingInterval: 60000, // 1 minute
    maxMetrics: 10000,
  }) {
    this.config = config;
  }
  
  /**
   * Start monitoring
   */
  start(): void {
    if (!this.config.enabled) return;
    
    this.intervalId = setInterval(() => {
      this.checkAlerts();
    }, this.config.reportingInterval);
  }
  
  /**
   * Stop monitoring
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  /**
   * Record performance metric
   */
  recordMetric(metric: PerformanceMetrics): void {
    if (!this.config.enabled) return;
    
    // Apply sampling
    if (Math.random() > this.config.sampleRate) return;
    
    this.metrics.push(metric);
    
    // Keep only recent metrics
    if (this.metrics.length > this.config.maxMetrics) {
      this.metrics = this.metrics.slice(-this.config.maxMetrics);
    }
  }
  
  /**
   * Get performance statistics
   */
  getStats(timeRange?: { start: Date; end: Date }): MonitoringStats {
    const now = new Date();
    const start = timeRange?.start || new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    const end = timeRange?.end || now;
    
    const relevantMetrics = this.metrics.filter(m => 
      m.timestamp >= start && m.timestamp <= end
    );
    
    const totalRequests = relevantMetrics.length;
    const successfulRequests = relevantMetrics.filter(m => m.success).length;
    const failedRequests = totalRequests - successfulRequests;
    
    const loadTimes = relevantMetrics
      .filter(m => m.success)
      .map(m => m.loadTime)
      .sort((a, b) => a - b);
    
    const averageLoadTime = loadTimes.length > 0 
      ? loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length 
      : 0;
    
    const p95LoadTime = loadTimes.length > 0 
      ? loadTimes[Math.floor(loadTimes.length * 0.95)] 
      : 0;
    
    const p99LoadTime = loadTimes.length > 0 
      ? loadTimes[Math.floor(loadTimes.length * 0.99)] 
      : 0;
    
    const errorRate = totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;
    const availability = 100 - errorRate;
    
    const cacheHits = relevantMetrics.filter(m => m.cacheHit).length;
    const cacheHitRate = totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;
    
    const cdnHits = relevantMetrics.filter(m => m.cdnHit).length;
    const cdnHitRate = totalRequests > 0 ? (cdnHits / totalRequests) * 100 : 0;
    
    return {
      totalRequests,
      successfulRequests,
      failedRequests,
      averageLoadTime,
      p95LoadTime,
      p99LoadTime,
      errorRate,
      availability,
      cacheHitRate,
      cdnHitRate,
      timeRange: { start, end },
    };
  }
  
  /**
   * Check for alerts
   */
  private checkAlerts(): void {
    const stats = this.getStats();
    const now = new Date();
    
    // Check load time threshold
    if (stats.averageLoadTime > this.config.alertThresholds.loadTime) {
      this.createAlert({
        type: 'performance',
        severity: 'medium',
        message: `Average load time ${stats.averageLoadTime}ms exceeds threshold ${this.config.alertThresholds.loadTime}ms`,
        metrics: this.metrics.slice(-10), // Last 10 metrics
        timestamp: now,
        resolved: false,
      });
    }
    
    // Check error rate threshold
    if (stats.errorRate > this.config.alertThresholds.errorRate) {
      this.createAlert({
        type: 'error',
        severity: 'high',
        message: `Error rate ${stats.errorRate.toFixed(2)}% exceeds threshold ${this.config.alertThresholds.errorRate}%`,
        metrics: this.metrics.slice(-10),
        timestamp: now,
        resolved: false,
      });
    }
    
    // Check availability threshold
    if (stats.availability < this.config.alertThresholds.availability) {
      this.createAlert({
        type: 'availability',
        severity: 'critical',
        message: `Availability ${stats.availability.toFixed(2)}% below threshold ${this.config.alertThresholds.availability}%`,
        metrics: this.metrics.slice(-10),
        timestamp: now,
        resolved: false,
      });
    }
  }
  
  /**
   * Create alert
   */
  private createAlert(alert: Omit<Alert, 'id'>): void {
    const newAlert: Alert = {
      ...alert,
      id: this.generateAlertId(),
    };
    
    this.alerts.push(newAlert);
    
    // Log alert
    console.warn(`🚨 ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`);
    
    // Keep only recent alerts
    if (this.alerts.length > 1000) {
      this.alerts = this.alerts.slice(-1000);
    }
  }
  
  /**
   * Get active alerts
   */
  getActiveAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }
  
  /**
   * Resolve alert
   */
  resolveAlert(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      alert.resolvedAt = new Date();
      return true;
    }
    return false;
  }
  
  /**
   * Get alert statistics
   */
  getAlertStats(): {
    total: number;
    active: number;
    resolved: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
  } {
    const total = this.alerts.length;
    const active = this.alerts.filter(a => !a.resolved).length;
    const resolved = total - active;
    
    const byType = this.alerts.reduce((acc, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const bySeverity = this.alerts.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      active,
      resolved,
      byType,
      bySeverity,
    };
  }
  
  /**
   * Generate unique alert ID
   */
  private generateAlertId(): string {
    return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Global monitoring instance
 */
export const imageMonitor = new ImagePerformanceMonitor();

/**
 * Monitoring utilities
 */
export const Monitoring = {
  /**
   * Start monitoring
   */
  start: () => imageMonitor.start(),
  
  /**
   * Stop monitoring
   */
  stop: () => imageMonitor.stop(),
  
  /**
   * Record metric
   */
  record: (metric: PerformanceMetrics) => imageMonitor.recordMetric(metric),
  
  /**
   * Get statistics
   */
  getStats: (timeRange?: { start: Date; end: Date }) => imageMonitor.getStats(timeRange),
  
  /**
   * Get active alerts
   */
  getActiveAlerts: () => imageMonitor.getActiveAlerts(),
  
  /**
   * Resolve alert
   */
  resolveAlert: (alertId: string) => imageMonitor.resolveAlert(alertId),
  
  /**
   * Get alert statistics
   */
  getAlertStats: () => imageMonitor.getAlertStats(),
};

/**
 * Performance measurement helper
 */
export async function measureImagePerformance(
  imagePath: string,
  loadFunction: () => Promise<boolean>
): Promise<PerformanceMetrics> {
  const startTime = Date.now();
  const timestamp = new Date();
  
  try {
    const success = await loadFunction();
    const loadTime = Date.now() - startTime;
    
    const metric: PerformanceMetrics = {
      imagePath,
      loadTime,
      success,
      timestamp,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    };
    
    Monitoring.record(metric);
    return metric;
  } catch (error) {
    const loadTime = Date.now() - startTime;
    
    const metric: PerformanceMetrics = {
      imagePath,
      loadTime,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    };
    
    Monitoring.record(metric);
    return metric;
  }
}
