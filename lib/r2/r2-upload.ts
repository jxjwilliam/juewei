/**
 * R2 Image Upload Utility for Developers
 * Provides functions for uploading, replacing, and managing images in R2 bucket
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

// Initialize R2 client
const client = new S3Client({
  region: process.env.R2_REGION || 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'juewei-assets';

export interface UploadOptions {
  contentType?: string;
  cacheControl?: string;
  metadata?: Record<string, string>;
  version?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
  version?: string;
}

export interface ImageInfo {
  path: string;
  size: number;
  lastModified: Date;
  contentType: string;
  metadata?: Record<string, string>;
}

/**
 * Upload image to R2 bucket
 */
export async function uploadImage(
  filePath: string,
  fileContent: Buffer | Uint8Array,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    const { contentType, cacheControl, metadata, version } = options;
    
    // Generate versioned path if version provided
    // const finalPath = version ? `${filePath}?v=${version}` : filePath;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: fileContent,
      ContentType: contentType || 'application/octet-stream',
      CacheControl: cacheControl || 'public, max-age=31536000',
      Metadata: {
        ...metadata,
        'uploaded-at': new Date().toISOString(),
        'version': version || '1',
      },
    });
    
    await client.send(command);
    
    const url = `${process.env.NEXT_PUBLIC_R2_BASE_URL}/${filePath}`;
    
    return {
      success: true,
      url,
      path: filePath,
      version: version || '1',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Replace existing image with new version
 */
export async function replaceImage(
  filePath: string,
  fileContent: Buffer | Uint8Array,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    // Check if image exists
    const exists = await imageExists(filePath);
    if (!exists) {
      return {
        success: false,
        error: `Image ${filePath} does not exist`,
      };
    }
    
    // Upload new version with timestamp
    const version = Date.now().toString();
    const result = await uploadImage(filePath, fileContent, {
      ...options,
      version,
    });
    
    if (result.success) {
      // Update metadata to indicate replacement
      const updateCommand = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filePath,
        Body: fileContent,
        ContentType: options.contentType || 'application/octet-stream',
        CacheControl: options.cacheControl || 'public, max-age=31536000',
        Metadata: {
          ...options.metadata,
          'replaced-at': new Date().toISOString(),
          'version': version,
          'replaced': 'true',
        },
      });
      
      await client.send(updateCommand);
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete image from R2 bucket
 */
export async function deleteImage(filePath: string): Promise<UploadResult> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
    });
    
    await client.send(command);
    
    return {
      success: true,
      path: filePath,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if image exists in R2 bucket
 */
export async function imageExists(filePath: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
    });
    
    await client.send(command);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get image information from R2 bucket
 */
export async function getImageInfo(filePath: string): Promise<ImageInfo | null> {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
    });
    
    const response = await client.send(command);
    
    return {
      path: filePath,
      size: response.ContentLength || 0,
      lastModified: response.LastModified || new Date(),
      contentType: response.ContentType || 'application/octet-stream',
      metadata: response.Metadata,
    };
  } catch {
    return null;
  }
}

/**
 * Upload image with automatic optimization
 */
export async function uploadOptimizedImage(
  filePath: string,
  fileContent: Buffer | Uint8Array,
  fileType: 'webp' | 'jpg' | 'png' | 'gif',
  options: UploadOptions = {}
): Promise<UploadResult> {
  const mimeTypes = {
    webp: 'image/webp',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
  };
  
  const cacheControls = {
    webp: 'public, max-age=31536000, immutable', // 1 year
    jpg: 'public, max-age=15552000', // 6 months
    jpeg: 'public, max-age=15552000', // 6 months
    png: 'public, max-age=15552000', // 6 months
    gif: 'public, max-age=2592000', // 1 month
  };
  
  return uploadImage(filePath, fileContent, {
    ...options,
    contentType: mimeTypes[fileType] || 'application/octet-stream',
    cacheControl: cacheControls[fileType] || 'public, max-age=31536000',
  });
}

/**
 * Batch upload multiple images
 */
export async function batchUploadImages(
  images: Array<{
    path: string;
    content: Buffer | Uint8Array;
    type: 'webp' | 'jpg' | 'png' | 'gif';
    options?: UploadOptions;
  }>
): Promise<UploadResult[]> {
  const results = await Promise.all(
    images.map(async ({ path, content, type, options }) => {
      return uploadOptimizedImage(path, content, type, options);
    })
  );
  
  return results;
}

/**
 * Get upload statistics
 */
export async function getUploadStats(): Promise<{
  totalImages: number;
  totalSize: number;
  lastUpload: Date | null;
}> {
  // This would require listing all objects in the bucket
  // For now, return basic stats
  return {
    totalImages: 0,
    totalSize: 0,
    lastUpload: null,
  };
}
