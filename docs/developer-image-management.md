# Developer Image Management Guide

## Overview

This guide provides developers with comprehensive instructions for managing images in the R2 bucket without requiring code deployments. The system allows for seamless image updates, replacements, and versioning.

## Quick Start

### Prerequisites
- R2 bucket configured and accessible
- Environment variables set in `.env.local`
- Node.js and npm installed

### Basic Commands

```bash
# Replace existing image
node scripts/replace-image.js replace carousel1/hero-01.webp ./new-hero.webp

# Upload new image
node scripts/replace-image.js upload products/new-product.webp ./product.jpg

# Get image information
node scripts/replace-image.js info carousel1/hero-01.webp

# List images (requires additional permissions)
node scripts/replace-image.js list carousel1/
```

## Image Management Workflows

### 1. Replacing Existing Images

#### Scenario: Update hero carousel image
```bash
# 1. Prepare new image file
cp ./new-hero-image.webp ./temp-hero.webp

# 2. Replace in R2 bucket
node scripts/replace-image.js replace carousel1/hero-01.webp ./temp-hero.webp

# 3. Verify replacement
node scripts/replace-image.js info carousel1/hero-01.webp
```

#### What happens:
- ✅ Image is replaced in R2 bucket
- ✅ Cache is automatically invalidated
- ✅ New version is created with timestamp
- ✅ Website serves new image immediately
- ✅ No code deployment required

### 2. Adding New Images

#### Scenario: Add new product image
```bash
# 1. Prepare image file
cp ./new-product.jpg ./temp-product.jpg

# 2. Upload to R2 bucket
node scripts/replace-image.js upload products/new-product.webp ./temp-product.jpg

# 3. Verify upload
node scripts/replace-image.js info products/new-product.webp
```

#### What happens:
- ✅ Image is uploaded to R2 bucket
- ✅ Proper cache headers are set
- ✅ Image is immediately accessible via CDN
- ✅ No code deployment required

### 3. Batch Operations

#### Scenario: Update multiple images
```bash
# Create batch script
cat > update-images.sh << 'EOF'
#!/bin/bash
node scripts/replace-image.js replace carousel1/hero-01.webp ./new-hero.webp
node scripts/replace-image.js replace carousel1/duck-kidney-7.webp ./new-duck.webp
node scripts/replace-image.js replace carousel1/spicy-lobster6.webp ./new-lobster.webp
EOF

chmod +x update-images.sh
./update-images.sh
```

## Advanced Features

### Image Versioning

#### Timestamp Versioning (Default)
```typescript
import { createImageVersion } from '@/lib/r2-versioning';

// Create versioned URL
const versionedUrl = createImageVersion('carousel1/hero-01.webp', 'timestamp');
// Result: https://juewei-assets.r2.dev/carousel1/hero-01.webp?v=1703123456789
```

#### Semantic Versioning
```typescript
import { createImageVersion } from '@/lib/r2-versioning';

// Create semantic version
const versionedUrl = createImageVersion('carousel1/hero-01.webp', 'semantic', '2.1.0');
// Result: https://juewei-assets.r2.dev/carousel1/hero-01.webp?v=2.1.0
```

#### Manual Versioning
```typescript
import { createImageVersion } from '@/lib/r2-versioning';

// Create custom version
const versionedUrl = createImageVersion('carousel1/hero-01.webp', 'manual', 'spring-2024');
// Result: https://juewei-assets.r2.dev/carousel1/hero-01.webp?v=spring-2024
```

### Cache Invalidation

#### Single Image
```typescript
import { invalidateImageCache } from '@/lib/r2-versioning';

// Invalidate cache for specific image
await invalidateImageCache('carousel1/hero-01.webp');
```

#### Batch Invalidation
```typescript
import { batchInvalidateCache } from '@/lib/r2-versioning';

// Invalidate multiple images
const imagePaths = [
  'carousel1/hero-01.webp',
  'carousel1/duck-kidney-7.webp',
  'carousel1/spicy-lobster6.webp'
];

const result = await batchInvalidateCache(imagePaths);
console.log(`Successful: ${result.successful.length}`);
console.log(`Failed: ${result.failed.length}`);
```

#### Smart Invalidation
```typescript
import { smartCacheInvalidation } from '@/lib/r2-versioning';

// Smart invalidation based on age and usage
await smartCacheInvalidation('carousel1/hero-01.webp', {
  maxAge: 3600000, // 1 hour
  forceInvalidation: false,
  usageThreshold: 100
});
```

## Programmatic API

### Upload Images
```typescript
import { uploadImage, uploadOptimizedImage } from '@/lib/r2-upload';

// Basic upload
const result = await uploadImage('products/new-product.webp', imageBuffer, {
  contentType: 'image/webp',
  cacheControl: 'public, max-age=31536000',
  metadata: {
    'uploaded-by': 'developer',
    'category': 'product'
  }
});

// Optimized upload
const result = await uploadOptimizedImage(
  'products/new-product.webp',
  imageBuffer,
  'webp',
  {
    metadata: {
      'uploaded-by': 'developer',
      'category': 'product'
    }
  }
);
```

### Replace Images
```typescript
import { replaceImage } from '@/lib/r2-upload';

// Replace existing image
const result = await replaceImage('carousel1/hero-01.webp', newImageBuffer, {
  contentType: 'image/webp',
  metadata: {
    'replaced-by': 'developer',
    'reason': 'updated-design'
  }
});
```

### Delete Images
```typescript
import { deleteImage } from '@/lib/r2-upload';

// Delete image
const result = await deleteImage('products/old-product.webp');
```

### Check Image Status
```typescript
import { imageExists, getImageInfo } from '@/lib/r2-upload';

// Check if image exists
const exists = await imageExists('carousel1/hero-01.webp');

// Get image information
const info = await getImageInfo('carousel1/hero-01.webp');
console.log(`Size: ${info.size} bytes`);
console.log(`Type: ${info.contentType}`);
console.log(`Modified: ${info.lastModified}`);
```

## Best Practices

### 1. Image Optimization
- Use WebP format for better compression
- Optimize images before upload
- Set appropriate cache headers
- Use proper dimensions for different use cases

### 2. Naming Conventions
```
carousel1/hero-01.webp          # Hero carousel images
carousel2/product-01.webp       # Product carousel images
products/product-name.webp      # Product images
brands/logo.webp               # Brand assets
certifications/cfia.jpg        # Certification images
social/instagram-qr.png         # Social media assets
```

### 3. Version Management
- Use timestamp versioning for automatic updates
- Use semantic versioning for major changes
- Document version changes
- Test new versions before deployment

### 4. Cache Strategy
- Set appropriate cache headers
- Use cache invalidation when needed
- Monitor cache hit rates
- Implement smart invalidation

### 5. Error Handling
- Always check upload results
- Implement fallback mechanisms
- Log errors for debugging
- Test image loading after changes

## Troubleshooting

### Common Issues

#### Image Not Loading
```bash
# Check if image exists
node scripts/replace-image.js info carousel1/hero-01.webp

# Test R2 connection
node scripts/test-r2-connection.js
```

#### Cache Issues
```typescript
// Force cache invalidation
await invalidateImageCache('carousel1/hero-01.webp');

// Check cache status
const info = getVersionInfo('carousel1/hero-01.webp');
console.log(`Cache status: ${info.cacheStatus}`);
```

#### Upload Failures
```bash
# Check environment variables
echo $NEXT_PUBLIC_R2_BASE_URL
echo $R2_ACCESS_KEY_ID

# Test R2 connection
node scripts/test-r2-connection.js
```

### Debug Commands
```bash
# Test R2 connectivity
node scripts/test-r2-connection.js

# Test image loading
node scripts/test-r2-integration.js

# Generate image inventory
node scripts/inventory-images.js
```

## Monitoring and Maintenance

### Key Metrics to Monitor
- Upload success rate
- Image load times
- Cache hit rates
- Error rates
- Storage usage

### Regular Maintenance Tasks
- Monitor image performance
- Clean up unused images
- Update cache headers as needed
- Test fallback mechanisms
- Review versioning strategy

### Automated Monitoring
```typescript
// Example monitoring script
import { getImageInfo, imageExists } from '@/lib/r2-upload';

async function monitorImages() {
  const criticalImages = [
    'carousel1/hero-01.webp',
    'carousel1/duck-kidney-7.webp',
    'juewei-logo2.webp'
  ];
  
  for (const imagePath of criticalImages) {
    const exists = await imageExists(imagePath);
    const info = await getImageInfo(imagePath);
    
    console.log(`${imagePath}: ${exists ? '✅' : '❌'} ${info?.size || 0} bytes`);
  }
}
```

## Security Considerations

### Access Control
- Use environment variables for credentials
- Implement proper IAM policies
- Monitor access logs
- Regular credential rotation

### Image Validation
- Validate file types before upload
- Check file sizes
- Scan for malicious content
- Implement content policies

### Backup Strategy
- Regular backups of critical images
- Version history maintenance
- Disaster recovery procedures
- Cross-region replication

## Conclusion

The R2 image management system provides developers with powerful tools for managing images without code deployments. By following these guidelines and best practices, developers can efficiently update, replace, and manage images while maintaining optimal performance and reliability.

For additional support or questions, refer to the main R2 migration guide or contact the development team.
