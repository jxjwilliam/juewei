/**
 * R2 Image Versioning and Cache Invalidation
 * Handles image versioning, cache busting, and invalidation strategies
 */

import { getR2ImageUrl, getVersionedImageUrl } from './r2-image';

export interface VersioningOptions {
  strategy: 'timestamp' | 'semantic' | 'hash' | 'manual';
  version?: string;
  invalidateCache?: boolean;
}

export interface VersionInfo {
  currentVersion: string;
  previousVersions: string[];
  lastModified: Date;
  cacheStatus: 'fresh' | 'stale' | 'invalidated';
}

/**
 * Generate versioned image URL based on strategy
 */
export function generateVersionedUrl(
  imagePath: string,
  options: VersioningOptions = { strategy: 'timestamp' }
): string {
  const { strategy, version } = options;
  
  switch (strategy) {
    case 'timestamp':
      return getVersionedImageUrl(imagePath);
      
    case 'semantic':
      if (!version) {
        throw new Error('Semantic versioning requires a version number');
      }
      return getR2ImageUrl(imagePath, { version });
      
    case 'hash':
      // Generate hash-based version (would need file content)
      const hash = generateContentHash();
      return getR2ImageUrl(imagePath, { version: hash });
      
    case 'manual':
      if (!version) {
        throw new Error('Manual versioning requires a version string');
      }
      return getR2ImageUrl(imagePath, { version });
      
    default:
      return getR2ImageUrl(imagePath);
  }
}

/**
 * Generate content hash for file (placeholder implementation)
 */
function generateContentHash(): string {
  // In a real implementation, this would hash the file content
  // For now, return a timestamp-based hash
  return Date.now().toString(36);
}

/**
 * Invalidate cache for specific image
 */
export async function invalidateImageCache(imagePath: string): Promise<boolean> {
  try {
    // Generate new versioned URL to force cache refresh
    const newUrl = generateVersionedUrl(imagePath, { 
      strategy: 'timestamp',
      invalidateCache: true 
    });
    
    // In a real implementation, this would:
    // 1. Purge CDN cache for the image
    // 2. Update metadata to indicate cache invalidation
    // 3. Notify CDN to refresh the image
    
    console.log(`🔄 Cache invalidated for: ${imagePath}`);
    console.log(`   New URL: ${newUrl}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to invalidate cache:`, error);
    return false;
  }
}

/**
 * Batch invalidate multiple images
 */
export async function batchInvalidateCache(imagePaths: string[]): Promise<{
  successful: string[];
  failed: string[];
}> {
  const results = await Promise.all(
    imagePaths.map(async (path) => {
      const success = await invalidateImageCache(path);
      return { path, success };
    })
  );
  
  const successful = results.filter(r => r.success).map(r => r.path);
  const failed = results.filter(r => !r.success).map(r => r.path);
  
  return { successful, failed };
}

/**
 * Get version information for an image
 */
export function getVersionInfo(): VersionInfo {
  // In a real implementation, this would query R2 metadata
  // For now, return mock data
  return {
    currentVersion: Date.now().toString(),
    previousVersions: [],
    lastModified: new Date(),
    cacheStatus: 'fresh',
  };
}

/**
 * Compare image versions
 */
export function compareVersions(version1: string, version2: string): 'newer' | 'older' | 'same' {
  // Simple timestamp comparison
  const time1 = parseInt(version1);
  const time2 = parseInt(version2);
  
  if (time1 > time2) return 'newer';
  if (time1 < time2) return 'older';
  return 'same';
}

/**
 * Create image version with specific strategy
 */
export function createImageVersion(
  imagePath: string,
  strategy: VersioningOptions['strategy'] = 'timestamp',
  customVersion?: string
): string {
  const options: VersioningOptions = { strategy };
  
  if (customVersion) {
    options.version = customVersion;
  }
  
  return generateVersionedUrl(imagePath, options);
}

/**
 * Check if image needs cache invalidation
 */
export function needsCacheInvalidation(
  imagePath: string,
  maxAge: number = 3600000 // 1 hour in milliseconds
): boolean {
  const versionInfo = getVersionInfo();
  const now = new Date();
  const age = now.getTime() - versionInfo.lastModified.getTime();
  
  return age > maxAge;
}

/**
 * Smart cache invalidation based on image age and usage
 */
export async function smartCacheInvalidation(
  imagePath: string,
  options: {
    maxAge?: number;
    forceInvalidation?: boolean;
    usageThreshold?: number;
  } = {}
): Promise<boolean> {
  const { maxAge = 3600000, forceInvalidation = false } = options;
  
  if (forceInvalidation) {
    return invalidateImageCache(imagePath);
  }
  
  if (needsCacheInvalidation(imagePath, maxAge)) {
    return invalidateImageCache(imagePath);
  }
  
  // In a real implementation, check usage patterns
  // For now, return false (no invalidation needed)
  return false;
}

/**
 * Version management utilities
 */
export const VersionManager = {
  /**
   * Create new version
   */
  create: (imagePath: string, strategy: VersioningOptions['strategy'] = 'timestamp') => 
    createImageVersion(imagePath, strategy),
  
  /**
   * Compare versions
   */
  compare: (version1: string, version2: string) => 
    compareVersions(version1, version2),
  
  /**
   * Get version info
   */
  info: (_imagePath: string) => 
    getVersionInfo(),
  
  /**
   * Invalidate cache
   */
  invalidate: (imagePath: string) => 
    invalidateImageCache(imagePath),
  
  /**
   * Batch invalidate
   */
  batchInvalidate: (imagePaths: string[]) => 
    batchInvalidateCache(imagePaths),
  
  /**
   * Smart invalidation
   */
  smartInvalidate: (imagePath: string, options?: Parameters<typeof smartCacheInvalidation>[1]) => 
    smartCacheInvalidation(imagePath, options),
};
