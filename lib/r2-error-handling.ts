/**
 * R2 Error Handling
 * Comprehensive error handling for R2 image operations
 */

export interface ErrorContext {
  imagePath: string;
  operation: 'load' | 'upload' | 'replace' | 'delete';
  timestamp: Date;
  userAgent?: string;
  referrer?: string;
  retryCount?: number;
}

export interface ErrorDetails {
  code: string;
  message: string;
  context: ErrorContext;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
  suggestions: string[];
}

export interface ErrorReport {
  id: string;
  error: ErrorDetails;
  resolved: boolean;
  resolution?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

/**
 * Error codes and their meanings
 */
export const ERROR_CODES = {
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  CONNECTION_REFUSED: 'CONNECTION_REFUSED',
  
  // R2 specific errors
  R2_UNAVAILABLE: 'R2_UNAVAILABLE',
  R2_ACCESS_DENIED: 'R2_ACCESS_DENIED',
  R2_BUCKET_NOT_FOUND: 'R2_BUCKET_NOT_FOUND',
  R2_OBJECT_NOT_FOUND: 'R2_OBJECT_NOT_FOUND',
  
  // Image specific errors
  IMAGE_NOT_FOUND: 'IMAGE_NOT_FOUND',
  IMAGE_FORMAT_UNSUPPORTED: 'IMAGE_FORMAT_UNSUPPORTED',
  IMAGE_TOO_LARGE: 'IMAGE_TOO_LARGE',
  IMAGE_CORRUPTED: 'IMAGE_CORRUPTED',
  
  // Fallback errors
  FALLBACK_FAILED: 'FALLBACK_FAILED',
  LOCAL_IMAGE_NOT_FOUND: 'LOCAL_IMAGE_NOT_FOUND',
  PLACEHOLDER_NOT_FOUND: 'PLACEHOLDER_NOT_FOUND',
  
  // System errors
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  RATE_LIMITED: 'RATE_LIMITED',
} as const;

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
} as const;

/**
 * Create error details from error
 */
export function createErrorDetails(
  error: Error,
  context: ErrorContext
): ErrorDetails {
  const code = classifyError(error);
  const severity = getErrorSeverity(code);
  const recoverable = isRecoverableError(code);
  const suggestions = getErrorSuggestions(code);
  
  return {
    code,
    message: error.message,
    context,
    severity,
    recoverable,
    suggestions,
  };
}

/**
 * Classify error by type
 */
function classifyError(error: Error): string {
  const message = error.message.toLowerCase();
  
  if (message.includes('network') || message.includes('fetch')) {
    return ERROR_CODES.NETWORK_ERROR;
  }
  
  if (message.includes('timeout')) {
    return ERROR_CODES.TIMEOUT_ERROR;
  }
  
  if (message.includes('connection refused')) {
    return ERROR_CODES.CONNECTION_REFUSED;
  }
  
  if (message.includes('r2') || message.includes('cloudflare')) {
    return ERROR_CODES.R2_UNAVAILABLE;
  }
  
  if (message.includes('not found') || message.includes('404')) {
    return ERROR_CODES.IMAGE_NOT_FOUND;
  }
  
  if (message.includes('format') || message.includes('unsupported')) {
    return ERROR_CODES.IMAGE_FORMAT_UNSUPPORTED;
  }
  
  if (message.includes('too large') || message.includes('size')) {
    return ERROR_CODES.IMAGE_TOO_LARGE;
  }
  
  if (message.includes('corrupted') || message.includes('invalid')) {
    return ERROR_CODES.IMAGE_CORRUPTED;
  }
  
  if (message.includes('permission') || message.includes('access')) {
    return ERROR_CODES.PERMISSION_DENIED;
  }
  
  if (message.includes('quota') || message.includes('limit')) {
    return ERROR_CODES.QUOTA_EXCEEDED;
  }
  
  if (message.includes('rate limit')) {
    return ERROR_CODES.RATE_LIMITED;
  }
  
  return ERROR_CODES.NETWORK_ERROR; // Default fallback
}

/**
 * Get error severity level
 */
function getErrorSeverity(code: string): 'low' | 'medium' | 'high' | 'critical' {
  const severityMap: Record<string, string> = {
    [ERROR_CODES.NETWORK_ERROR]: 'medium',
    [ERROR_CODES.TIMEOUT_ERROR]: 'medium',
    [ERROR_CODES.CONNECTION_REFUSED]: 'high',
    [ERROR_CODES.R2_UNAVAILABLE]: 'high',
    [ERROR_CODES.R2_ACCESS_DENIED]: 'critical',
    [ERROR_CODES.R2_BUCKET_NOT_FOUND]: 'critical',
    [ERROR_CODES.R2_OBJECT_NOT_FOUND]: 'medium',
    [ERROR_CODES.IMAGE_NOT_FOUND]: 'medium',
    [ERROR_CODES.IMAGE_FORMAT_UNSUPPORTED]: 'low',
    [ERROR_CODES.IMAGE_TOO_LARGE]: 'low',
    [ERROR_CODES.IMAGE_CORRUPTED]: 'medium',
    [ERROR_CODES.FALLBACK_FAILED]: 'high',
    [ERROR_CODES.LOCAL_IMAGE_NOT_FOUND]: 'medium',
    [ERROR_CODES.PLACEHOLDER_NOT_FOUND]: 'high',
    [ERROR_CODES.PERMISSION_DENIED]: 'critical',
    [ERROR_CODES.QUOTA_EXCEEDED]: 'high',
    [ERROR_CODES.RATE_LIMITED]: 'medium',
  };
  
  return (severityMap[code] || 'medium') as 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Check if error is recoverable
 */
function isRecoverableError(code: string): boolean {
  const recoverableCodes = [
    ERROR_CODES.NETWORK_ERROR,
    ERROR_CODES.TIMEOUT_ERROR,
    ERROR_CODES.R2_UNAVAILABLE,
    ERROR_CODES.IMAGE_NOT_FOUND,
    ERROR_CODES.FALLBACK_FAILED,
    ERROR_CODES.RATE_LIMITED,
  ];
  
  return recoverableCodes.includes(code as typeof recoverableCodes[number]);
}

/**
 * Get error suggestions
 */
function getErrorSuggestions(code: string): string[] {
  const suggestionsMap: Record<string, string[]> = {
    [ERROR_CODES.NETWORK_ERROR]: [
      'Check internet connection',
      'Retry the operation',
      'Use fallback image',
    ],
    [ERROR_CODES.TIMEOUT_ERROR]: [
      'Retry with longer timeout',
      'Use fallback image',
      'Check R2 connectivity',
    ],
    [ERROR_CODES.CONNECTION_REFUSED]: [
      'Check R2 configuration',
      'Verify network settings',
      'Use fallback image',
    ],
    [ERROR_CODES.R2_UNAVAILABLE]: [
      'Check R2 service status',
      'Use fallback image',
      'Retry later',
    ],
    [ERROR_CODES.R2_ACCESS_DENIED]: [
      'Check R2 credentials',
      'Verify permissions',
      'Contact administrator',
    ],
    [ERROR_CODES.R2_BUCKET_NOT_FOUND]: [
      'Check bucket configuration',
      'Verify bucket name',
      'Contact administrator',
    ],
    [ERROR_CODES.R2_OBJECT_NOT_FOUND]: [
      'Check image path',
      'Verify image exists',
      'Use fallback image',
    ],
    [ERROR_CODES.IMAGE_NOT_FOUND]: [
      'Check image path',
      'Verify image exists',
      'Use fallback image',
    ],
    [ERROR_CODES.IMAGE_FORMAT_UNSUPPORTED]: [
      'Convert to supported format',
      'Use different image',
      'Check file extension',
    ],
    [ERROR_CODES.IMAGE_TOO_LARGE]: [
      'Compress image',
      'Use smaller image',
      'Optimize file size',
    ],
    [ERROR_CODES.IMAGE_CORRUPTED]: [
      'Use different image',
      'Re-upload image',
      'Check file integrity',
    ],
    [ERROR_CODES.FALLBACK_FAILED]: [
      'Check local images',
      'Verify fallback configuration',
      'Use placeholder image',
    ],
    [ERROR_CODES.LOCAL_IMAGE_NOT_FOUND]: [
      'Check local image path',
      'Verify local image exists',
      'Use placeholder image',
    ],
    [ERROR_CODES.PLACEHOLDER_NOT_FOUND]: [
      'Check placeholder configuration',
      'Verify placeholder exists',
      'Use default placeholder',
    ],
    [ERROR_CODES.PERMISSION_DENIED]: [
      'Check user permissions',
      'Contact administrator',
      'Verify access rights',
    ],
    [ERROR_CODES.QUOTA_EXCEEDED]: [
      'Check storage quota',
      'Clean up old images',
      'Contact administrator',
    ],
    [ERROR_CODES.RATE_LIMITED]: [
      'Wait before retrying',
      'Reduce request frequency',
      'Use fallback image',
    ],
  };
  
  return suggestionsMap[code] || ['Contact support'];
}

/**
 * Error reporting system
 */
export class ErrorReporter {
  private errors: ErrorReport[] = [];
  private maxErrors: number = 1000;
  
  constructor(maxErrors: number = 1000) {
    this.maxErrors = maxErrors;
  }
  
  /**
   * Report an error
   */
  reportError(error: Error, context: ErrorContext): ErrorReport {
    const errorDetails = createErrorDetails(error, context);
    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      error: errorDetails,
      resolved: false,
      createdAt: new Date(),
    };
    
    this.errors.push(errorReport);
    
    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }
    
    // Log error based on severity
    this.logError(errorReport);
    
    return errorReport;
  }
  
  /**
   * Resolve an error
   */
  resolveError(errorId: string, resolution: string): boolean {
    const errorReport = this.errors.find(e => e.id === errorId);
    if (errorReport) {
      errorReport.resolved = true;
      errorReport.resolution = resolution;
      errorReport.resolvedAt = new Date();
      return true;
    }
    return false;
  }
  
  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    resolved: number;
    unresolved: number;
    bySeverity: Record<string, number>;
    byCode: Record<string, number>;
  } {
    const total = this.errors.length;
    const resolved = this.errors.filter(e => e.resolved).length;
    const unresolved = total - resolved;
    
    const bySeverity = this.errors.reduce((acc, error) => {
      const severity = error.error.severity;
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byCode = this.errors.reduce((acc, error) => {
      const code = error.error.code;
      acc[code] = (acc[code] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      resolved,
      unresolved,
      bySeverity,
      byCode,
    };
  }
  
  /**
   * Get recent errors
   */
  getRecentErrors(limit: number = 10): ErrorReport[] {
    return this.errors
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  
  /**
   * Get unresolved errors
   */
  getUnresolvedErrors(): ErrorReport[] {
    return this.errors.filter(e => !e.resolved);
  }
  
  /**
   * Generate unique error ID
   */
  private generateErrorId(): string {
    return `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Log error based on severity
   */
  private logError(errorReport: ErrorReport): void {
    const { error } = errorReport;
    const message = `[${error.severity.toUpperCase()}] ${error.code}: ${error.message}`;
    
    switch (error.severity) {
      case 'low':
        console.log(message);
        break;
      case 'medium':
        console.warn(message);
        break;
      case 'high':
        console.error(message);
        break;
      case 'critical':
        console.error(`🚨 CRITICAL ERROR: ${message}`);
        break;
    }
  }
}

/**
 * Global error reporter instance
 */
export const errorReporter = new ErrorReporter();

/**
 * Error handling utilities
 */
export const ErrorHandling = {
  /**
   * Create error details
   */
  createDetails: createErrorDetails,
  
  /**
   * Report error
   */
  report: (error: Error, context: ErrorContext) => errorReporter.reportError(error, context),
  
  /**
   * Resolve error
   */
  resolve: (errorId: string, resolution: string) => errorReporter.resolveError(errorId, resolution),
  
  /**
   * Get error statistics
   */
  getStats: () => errorReporter.getErrorStats(),
  
  /**
   * Get recent errors
   */
  getRecent: (limit?: number) => errorReporter.getRecentErrors(limit),
  
  /**
   * Get unresolved errors
   */
  getUnresolved: () => errorReporter.getUnresolvedErrors(),
};
