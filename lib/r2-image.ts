/**
 * R2 Image Utility Functions
 * Handles image URL generation, fallback mechanisms, and versioning for Cloudflare R2
 */

export interface R2ImageOptions {
  fallback?: boolean;
  version?: string;
  useLocal?: boolean;
}

/**
 * Generate R2 image URL with optional fallback and versioning
 */
export function getR2ImageUrl(path: string, options?: R2ImageOptions): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_R2_BASE_URL is not configured');
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use local fallback if R2 unavailable
  if (options?.useLocal) {
    return `/${cleanPath}`;
  }
  
  // Add cache busting version if provided
  const versionParam = options?.version ? `?v=${options.version}` : '';
  return `${baseUrl}/${cleanPath}${versionParam}`;
}

/**
 * Generate image URL with fallback handling
 * Graceful degradation to local fallback when R2 unavailable
 */
export function getImageUrlWithFallback(path: string): string {
  try {
    return getR2ImageUrl(path);
  } catch (error) {
    console.warn('R2 unavailable, falling back to local images:', error);
    // Graceful degradation to local fallback
    return getR2ImageUrl(path, { useLocal: true });
  }
}

/**
 * Generate optimized image URL with specific dimensions
 */
export function getOptimizedImageUrl(
  path: string, 
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  const baseUrl = getR2ImageUrl(path);
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  
  return params.toString() ? `${baseUrl}?${params}` : baseUrl;
}

/**
 * Generate cache busting URL with timestamp
 */
export function getVersionedImageUrl(path: string): string {
  const timestamp = Date.now().toString();
  return getR2ImageUrl(path, { version: timestamp });
}

/**
 * Check if R2 is available
 */
export async function checkR2Availability(): Promise<boolean> {
  try {
    const testUrl = getR2ImageUrl('test-image.webp');
    const response = await fetch(testUrl, { method: 'HEAD' });
    return response.ok;
  } catch (_error) {
    return false;
  }
}

/**
 * Get fallback URL for local image serving
 */
export function getFallbackUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${cleanPath}`;
}
