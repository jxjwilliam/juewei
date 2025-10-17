/**
 * Image Service API Contracts
 * 
 * Defines the interface for image management operations in the R2 Image Migration feature.
 * This service handles image upload, retrieval, and management operations.
 */

// ============================================================================
// Core Image Service Interface
// ============================================================================

export interface ImageService {
  // Image operations
  uploadImage(file: File, path: string): Promise<ImageUploadResult>;
  getImageUrl(path: string): Promise<string>;
  deleteImage(path: string): Promise<boolean>;
  listImages(prefix?: string): Promise<ImageAsset[]>;
  
  // Batch operations
  uploadBatch(files: FileUpload[]): Promise<BatchUploadResult>;
  deleteBatch(paths: string[]): Promise<BatchDeleteResult>;
  
  // Health and status
  checkHealth(): Promise<ServiceHealth>;
  getUsageStats(): Promise<UsageStats>;
}

// ============================================================================
// Data Transfer Objects
// ============================================================================

export interface ImageUploadResult {
  success: boolean;
  imageAsset?: ImageAsset;
  error?: string;
  r2Url?: string;
  uploadTime: number;
}

export interface BatchUploadResult {
  totalFiles: number;
  successfulUploads: number;
  failedUploads: number;
  results: ImageUploadResult[];
  totalTime: number;
}

export interface BatchDeleteResult {
  totalPaths: number;
  successfulDeletions: number;
  failedDeletions: number;
  results: DeleteResult[];
  totalTime: number;
}

export interface DeleteResult {
  path: string;
  success: boolean;
  error?: string;
}

export interface ServiceHealth {
  isHealthy: boolean;
  r2Connection: boolean;
  cdnStatus: boolean;
  lastCheck: Date;
  responseTime: number;
}

export interface UsageStats {
  totalImages: number;
  totalSize: number;
  cdnHitRate: number;
  averageLoadTime: number;
  lastUpdated: Date;
}

// ============================================================================
// Image Asset Models
// ============================================================================

export interface ImageAsset {
  id: string;
  originalPath: string;
  r2Path: string;
  r2Url: string;
  bucketName: string;
  fileType: ImageFileType;
  fileSize: number;
  mimeType: string;
  dimensions?: ImageDimensions;
  altText: string;
  category: ImageCategory;
  tags: string[];
  isActive: boolean;
  isOptimized: boolean;
  lastModified: Date;
  createdAt: Date;
  usageCount: number;
  lastAccessed?: Date;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface FileUpload {
  file: File;
  path: string;
  altText: string;
  category: ImageCategory;
  tags?: string[];
}

// ============================================================================
// Enums and Types
// ============================================================================

export type ImageFileType = 'webp' | 'jpg' | 'jpeg' | 'png' | 'gif';

export enum ImageCategory {
  PRODUCT = 'product',
  BRAND = 'brand',
  CERTIFICATION = 'certification',
  SOCIAL = 'social',
  ICON = 'icon',
  BANNER = 'banner',
  BACKGROUND = 'background'
}

// ============================================================================
// Configuration Interface
// ============================================================================

export interface R2ImageServiceConfig {
  bucketName: string;
  region: string;
  baseUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
  cdnEnabled: boolean;
  cacheTtl: number;
  compressionEnabled: boolean;
  environment: 'development' | 'staging' | 'production';
}

// ============================================================================
// Error Types
// ============================================================================

export class ImageServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ImageServiceError';
  }
}

export class UploadError extends ImageServiceError {
  constructor(message: string, public filePath: string) {
    super(message, 'UPLOAD_ERROR', 400);
  }
}

export class NotFoundError extends ImageServiceError {
  constructor(message: string, public imagePath: string) {
    super(message, 'NOT_FOUND', 404);
  }
}

export class ConfigurationError extends ImageServiceError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

export interface ImageUrlGenerator {
  generateUrl(path: string): string;
  generateOptimizedUrl(path: string, options?: ImageOptimizationOptions): string;
  generateThumbnailUrl(path: string, size: number): string;
}

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFileType;
  progressive?: boolean;
}

// ============================================================================
// Migration Utilities
// ============================================================================

export interface MigrationService {
  scanLocalImages(): Promise<LocalImageInfo[]>;
  migrateImages(images: LocalImageInfo[]): Promise<MigrationResult>;
  updateReferences(references: ImageReference[]): Promise<UpdateResult>;
  cleanupLocalImages(paths: string[]): Promise<CleanupResult>;
}

export interface LocalImageInfo {
  path: string;
  size: number;
  type: ImageFileType;
  lastModified: Date;
  altText?: string;
  category?: ImageCategory;
}

export interface ImageReference {
  filePath: string;
  codeLocation: string;
  componentName: string;
  lineNumber: number;
  newR2Url: string;
}

export interface MigrationResult {
  totalImages: number;
  successfulMigrations: number;
  failedMigrations: number;
  results: ImageUploadResult[];
  totalTime: number;
}

export interface UpdateResult {
  totalReferences: number;
  successfulUpdates: number;
  failedUpdates: number;
  results: ReferenceUpdateResult[];
  totalTime: number;
}

export interface ReferenceUpdateResult {
  filePath: string;
  success: boolean;
  error?: string;
  oldUrl: string;
  newUrl: string;
}

export interface CleanupResult {
  totalFiles: number;
  successfulDeletions: number;
  failedDeletions: number;
  results: DeleteResult[];
  totalTime: number;
}

// ============================================================================
// Monitoring and Observability
// ============================================================================

export interface ImageMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  cdnHitRate: number;
  errorRate: number;
  lastUpdated: Date;
}

export interface PerformanceMetrics {
  imageLoadTime: number;
  cdnHitRate: number;
  errorRate: number;
  throughput: number;
  latency: number;
}

export interface HealthCheck {
  service: 'healthy' | 'degraded' | 'unhealthy';
  r2Connection: 'connected' | 'disconnected';
  cdnStatus: 'active' | 'inactive';
  lastCheck: Date;
  responseTime: number;
  errorCount: number;
}
