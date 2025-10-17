# Data Model: R2 Image Migration

**Feature**: R2 Image Migration  
**Created**: 2024-12-19  
**Status**: Design Complete  

## Entity Definitions

### ImageAsset Entity

Represents a migrated image asset stored in Cloudflare R2 bucket.

```typescript
interface ImageAsset {
  // Primary identifiers
  id: string;                    // Unique identifier (UUID)
  originalPath: string;          // Original local path (e.g., "/carousel1/hero-01.webp")
  
  // R2 storage information
  r2Path: string;               // R2 bucket path (e.g., "carousel1/hero-01.webp")
  r2Url: string;                // Full R2 CDN URL
  bucketName: string;           // R2 bucket name ('juewei-assets')
  
  // File metadata
  fileType: 'webp' | 'jpg' | 'jpeg' | 'png' | 'gif';
  fileSize: number;             // Size in bytes
  mimeType: string;            // MIME type (e.g., "image/webp")
  dimensions?: {                // Optional image dimensions
    width: number;
    height: number;
  };
  
  // Content information
  altText: string;              // Accessibility alt text
  category: ImageCategory;      // Image classification
  tags: string[];              // Searchable tags
  
  // Status and lifecycle
  isActive: boolean;           // Whether image is currently used
  isOptimized: boolean;        // Whether image is optimized for web
  lastModified: Date;          // Last update timestamp
  createdAt: Date;             // Creation timestamp
  
  // Usage tracking
  usageCount: number;          // How many times referenced
  lastAccessed?: Date;        // Last access timestamp
}
```

### ImageCategory Enum

Classification system for different types of images.

```typescript
enum ImageCategory {
  PRODUCT = 'product',           // Product photos and carousel images
  BRAND = 'brand',              // Logos and brand assets
  CERTIFICATION = 'certification', // FDA, CFIA, SQF badges
  SOCIAL = 'social',            // Social media icons
  ICON = 'icon',               // UI icons and graphics
  BANNER = 'banner',           // Banner and hero images
  BACKGROUND = 'background'     // Background images
}
```

### ProductImageReference Entity

Represents the relationship between products and their associated images.

```typescript
interface ProductImageReference {
  // Product relationship
  productId: number;            // Reference to product
  productName: string;          // Product name for reference
  
  // Image relationship
  imageAssetId: string;        // Reference to ImageAsset
  imagePath: string;          // Original local path
  r2Url: string;              // R2 CDN URL
  
  // Usage context
  imageType: ProductImageType; // How image is used
  altText: string;            // Accessibility text
  priority: number;            // Display priority (1-10)
  
  // Metadata
  isPrimary: boolean;         // Whether this is the main product image
  isActive: boolean;          // Whether currently displayed
  lastUpdated: Date;          // Last modification
}
```

### ProductImageType Enum

Defines how images are used within product contexts.

```typescript
enum ProductImageType {
  MAIN = 'main',               // Primary product image
  FLOATING = 'floating',       // Floating carousel images
  BADGE = 'badge',            // Certification badges
  THUMBNAIL = 'thumbnail',    // Small preview images
  HERO = 'hero',              // Hero section images
  GALLERY = 'gallery'         // Product gallery images
}
```

### R2Configuration Entity

Configuration for R2 bucket and CDN settings.

```typescript
interface R2Configuration {
  // Bucket configuration
  bucketName: string;          // 'juewei-assets'
  region: string;             // R2 region
  baseUrl: string;            // CDN base URL
  
  // Access credentials
  accessKeyId: string;        // R2 access key
  secretAccessKey: string;    // R2 secret key
  
  // CDN settings
  cdnEnabled: boolean;        // Whether CDN is active
  cacheTtl: number;          // Cache time-to-live in seconds
  compressionEnabled: boolean; // Whether compression is enabled
  
  // Environment
  environment: 'development' | 'staging' | 'production';
  isActive: boolean;          // Whether configuration is active
}
```

## Relationships

### ImageAsset ↔ ProductImageReference
- **One-to-Many**: One image asset can be referenced by multiple products
- **Relationship**: `ImageAsset.id` → `ProductImageReference.imageAssetId`
- **Cascade**: When image is deleted, references are updated to inactive

### Product ↔ ProductImageReference
- **One-to-Many**: One product can have multiple image references
- **Relationship**: `Product.id` → `ProductImageReference.productId`
- **Cascade**: When product is deleted, image references are removed

### R2Configuration ↔ ImageAsset
- **One-to-Many**: One R2 configuration serves multiple image assets
- **Relationship**: Configuration provides base URL for all assets
- **Dependency**: All assets depend on active R2 configuration

## Validation Rules

### ImageAsset Validation
```typescript
const imageAssetValidation = {
  id: { required: true, type: 'string', format: 'uuid' },
  originalPath: { required: true, type: 'string', pattern: '^/[^/].*' },
  r2Path: { required: true, type: 'string', minLength: 1 },
  r2Url: { required: true, type: 'string', format: 'url' },
  fileType: { required: true, enum: ['webp', 'jpg', 'jpeg', 'png', 'gif'] },
  fileSize: { required: true, type: 'number', min: 1 },
  altText: { required: true, type: 'string', minLength: 1 },
  category: { required: true, enum: Object.values(ImageCategory) },
  isActive: { required: true, type: 'boolean' }
};
```

### ProductImageReference Validation
```typescript
const productImageReferenceValidation = {
  productId: { required: true, type: 'number', min: 1 },
  imageAssetId: { required: true, type: 'string', format: 'uuid' },
  imageType: { required: true, enum: Object.values(ProductImageType) },
  altText: { required: true, type: 'string', minLength: 1 },
  priority: { required: true, type: 'number', min: 1, max: 10 },
  isPrimary: { required: true, type: 'boolean' },
  isActive: { required: true, type: 'boolean' }
};
```

## State Transitions

### ImageAsset Lifecycle
```
CREATED → UPLOADING → ACTIVE → INACTIVE → DELETED
    ↓         ↓         ↓         ↓
  ERROR   UPLOAD_FAIL  ARCHIVED  REMOVED
```

### ProductImageReference Lifecycle
```
CREATED → ACTIVE → INACTIVE → DELETED
    ↓        ↓        ↓
  ERROR   UPDATED   ARCHIVED
```

## Data Migration Strategy

### Phase 1: Asset Discovery
- Scan `/public` directory for image files
- Create ImageAsset records for each file
- Preserve original directory structure
- Generate R2 paths and URLs

### Phase 2: Upload to R2
- Upload each image to R2 bucket
- Update ImageAsset records with R2 URLs
- Verify upload success
- Mark assets as active

### Phase 3: Update References
- Find all code references to local images
- Create ProductImageReference records
- Update code with R2 URLs
- Test all references

### Phase 4: Cleanup
- Remove local image files
- Update build process
- Monitor performance
- Archive old records

## Performance Considerations

### Indexing Strategy
- **Primary Key**: `ImageAsset.id` (UUID)
- **Search Index**: `ImageAsset.category` + `ImageAsset.tags`
- **Usage Index**: `ProductImageReference.productId` + `ProductImageReference.imageType`
- **Performance Index**: `ImageAsset.isActive` + `ImageAsset.lastAccessed`

### Caching Strategy
- **CDN Caching**: All images cached at edge locations
- **Application Caching**: R2 URLs cached in memory
- **Database Caching**: Frequently accessed assets cached
- **Browser Caching**: Long-term caching for static assets

### Query Optimization
- **Batch Operations**: Upload multiple images in batches
- **Lazy Loading**: Load image metadata on demand
- **Connection Pooling**: Reuse R2 connections
- **Async Operations**: Non-blocking image operations

## Security Considerations

### Access Control
- **Public Read**: All images publicly readable via CDN
- **No Write Access**: Web application cannot modify images
- **Authentication**: R2 credentials stored securely
- **Monitoring**: Track access patterns and anomalies

### Data Protection
- **Encryption**: Images encrypted at rest in R2
- **Transit Security**: HTTPS for all image requests
- **Access Logging**: Log all image access attempts
- **Rate Limiting**: Prevent abuse of image serving

## Monitoring and Observability

### Key Metrics
- **Upload Success Rate**: Percentage of successful uploads
- **CDN Hit Rate**: Percentage of requests served from CDN
- **Load Time**: Average image load time by region
- **Error Rate**: Percentage of failed image requests

### Alerting Thresholds
- **Upload Failures**: >5% of uploads fail
- **CDN Miss Rate**: >20% of requests miss CDN cache
- **Load Time**: >3 seconds for 95th percentile
- **Error Rate**: >1% of image requests fail

### Logging Strategy
- **Access Logs**: Track all image requests
- **Error Logs**: Log failed uploads and requests
- **Performance Logs**: Track load times and CDN performance
- **Security Logs**: Monitor for unusual access patterns
