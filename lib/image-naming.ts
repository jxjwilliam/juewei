/**
 * Automated Image Naming Convention
 * Provides standardized naming conventions for product images
 */

export interface NamingOptions {
  category: string;
  productName: string;
  variant?: string;
  size?: string;
  quality?: string;
  timestamp?: boolean;
  prefix?: string;
  suffix?: string;
}

export interface NamingResult {
  fileName: string;
  path: string;
  url: string;
  metadata: Record<string, string>;
}

/**
 * Generate standardized image name based on convention
 */
export function generateImageName(options: NamingOptions): string {
  const {
    category,
    productName,
    variant,
    size,
    quality,
    timestamp = true,
    prefix = '',
    suffix = ''
  } = options;

  // Sanitize inputs
  const sanitizedCategory = sanitizeString(category);
  const sanitizedProductName = sanitizeString(productName);
  const sanitizedVariant = variant ? sanitizeString(variant) : '';
  const sanitizedSize = size ? sanitizeString(size) : '';
  const sanitizedQuality = quality ? sanitizeString(quality) : '';

  // Build name parts
  const parts: string[] = [];

  // Add prefix if provided
  if (prefix) {
    parts.push(sanitizeString(prefix));
  }

  // Add category
  parts.push(sanitizedCategory);

  // Add product name
  parts.push(sanitizedProductName);

  // Add variant if provided
  if (sanitizedVariant) {
    parts.push(sanitizedVariant);
  }

  // Add size if provided
  if (sanitizedSize) {
    parts.push(sanitizedSize);
  }

  // Add quality if provided
  if (sanitizedQuality) {
    parts.push(sanitizedQuality);
  }

  // Add suffix if provided
  if (suffix) {
    parts.push(sanitizeString(suffix));
  }

  // Add timestamp if requested
  if (timestamp) {
    parts.push(Date.now().toString());
  }

  // Join parts with hyphens
  return parts.join('-');
}

/**
 * Generate complete image path with naming convention
 */
export function generateImagePath(
  fileName: string,
  category: string,
  fileExtension: string
): string {
  const sanitizedCategory = sanitizeString(category);
  const sanitizedFileName = sanitizeString(fileName);
  const sanitizedExtension = sanitizeString(fileExtension).toLowerCase();

  return `${sanitizedCategory}/${sanitizedFileName}.${sanitizedExtension}`;
}

/**
 * Generate complete image URL
 */
export function generateImageUrl(imagePath: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL || 'https://juewei-assets.r2.dev';
  return `${baseUrl}/${imagePath}`;
}

/**
 * Generate metadata for image
 */
export function generateImageMetadata(options: NamingOptions): Record<string, string> {
  const {
    category,
    productName,
    variant,
    size,
    quality,
    prefix,
    suffix
  } = options;

  return {
    'category': category,
    'product-name': productName,
    'variant': variant || '',
    'size': size || '',
    'quality': quality || '',
    'prefix': prefix || '',
    'suffix': suffix || '',
    'created-at': new Date().toISOString(),
    'naming-convention': 'automated',
    'version': '1.0'
  };
}

/**
 * Parse image name to extract information
 */
export function parseImageName(fileName: string): Partial<NamingOptions> {
  const parts = fileName.split('-');
  const result: Partial<NamingOptions> = {};

  // Try to extract information from parts
  if (parts.length >= 2) {
    result.category = parts[0];
    result.productName = parts[1];
  }

  // Look for common patterns
  const sizePattern = /(\d+x\d+)/;
  const qualityPattern = /(high|medium|low)/;
  const variantPattern = /(front|back|side|detail)/;

  for (const part of parts) {
    if (sizePattern.test(part)) {
      result.size = part;
    } else if (qualityPattern.test(part)) {
      result.quality = part;
    } else if (variantPattern.test(part)) {
      result.variant = part;
    }
  }

  return result;
}

/**
 * Validate image name against convention
 */
export function validateImageName(fileName: string): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for required parts
  const parts = fileName.split('-');
  if (parts.length < 2) {
    errors.push('Image name must have at least category and product name');
  }

  // Check for invalid characters
  if (!/^[a-zA-Z0-9-]+$/.test(fileName)) {
    errors.push('Image name contains invalid characters (only letters, numbers, and hyphens allowed)');
  }

  // Check for length
  if (fileName.length > 100) {
    warnings.push('Image name is very long, consider shortening');
  }

  // Check for common patterns
  if (!parts.some(part => /^\d+$/.test(part))) {
    warnings.push('Consider adding timestamp for uniqueness');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generate multiple image names for different variants
 */
export function generateImageVariants(
  baseOptions: NamingOptions,
  variants: Array<{
    variant: string;
    size?: string;
    quality?: string;
  }>
): NamingResult[] {
  return variants.map(variant => {
    const options = { ...baseOptions, ...variant };
    const fileName = generateImageName(options);
    const path = generateImagePath(fileName, options.category, 'webp');
    const url = generateImageUrl(path);
    const metadata = generateImageMetadata(options);

    return {
      fileName,
      path,
      url,
      metadata
    };
  });
}

/**
 * Generate product image set
 */
export function generateProductImageSet(
  productName: string,
  category: string = 'product'
): NamingResult[] {
  const baseOptions: NamingOptions = {
    category,
    productName,
    timestamp: true
  };

  const variants = [
    { variant: 'hero', size: '1920x1080', quality: 'high' },
    { variant: 'thumbnail', size: '300x300', quality: 'medium' },
    { variant: 'detail', size: '800x600', quality: 'high' },
    { variant: 'gallery', size: '600x400', quality: 'medium' }
  ];

  return generateImageVariants(baseOptions, variants);
}

/**
 * Generate carousel image set
 */
export function generateCarouselImageSet(
  productName: string,
  carouselType: 'hero' | 'product' = 'hero'
): NamingResult[] {
  const baseOptions: NamingOptions = {
    category: `carousel${carouselType === 'hero' ? '1' : '2'}`,
    productName,
    timestamp: true
  };

  const variants = [
    { variant: 'main', size: '1920x1080', quality: 'high' },
    { variant: 'floating', size: '400x400', quality: 'medium' },
    { variant: 'background', size: '1920x1080', quality: 'high' }
  ];

  return generateImageVariants(baseOptions, variants);
}

/**
 * Sanitize string for use in file names
 */
function sanitizeString(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Naming convention utilities
 */
export const NamingConvention = {
  /**
   * Generate image name
   */
  generate: generateImageName,
  
  /**
   * Generate image path
   */
  path: generateImagePath,
  
  /**
   * Generate image URL
   */
  url: generateImageUrl,
  
  /**
   * Generate metadata
   */
  metadata: generateImageMetadata,
  
  /**
   * Parse image name
   */
  parse: parseImageName,
  
  /**
   * Validate image name
   */
  validate: validateImageName,
  
  /**
   * Generate variants
   */
  variants: generateImageVariants,
  
  /**
   * Generate product set
   */
  productSet: generateProductImageSet,
  
  /**
   * Generate carousel set
   */
  carouselSet: generateCarouselImageSet,
};
