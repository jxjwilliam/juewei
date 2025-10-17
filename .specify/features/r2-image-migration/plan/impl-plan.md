# Implementation Plan: R2 Image Migration

**Feature**: R2 Image Migration  
**Created**: 2024-12-19  
**Status**: Planning  
**Branch**: r2-image-migration  

## Technical Context

### Current State Analysis
- **Images in `/public`**: 50+ image files (webp, jpg, png, gif)
- **Image References**: Found in components and product data
- **Key Components**: hero-carousel, product-hero-carousel, header, banner-section
- **Product Data**: `lib/data/products.ts` contains image paths
- **Existing Structure**: `/carousel1/`, `/carousel2/`, root level images
- **Font Files**: Chinese fonts in `/public/fonts/` (NOT to be migrated)

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Image Component**: Next.js Image component with external domain support
- **Storage**: Cloudflare R2 bucket 'juewei-assets'
- **CDN**: Cloudflare CDN for global distribution
- **Environment**: R2 credentials in `.env.local`

### Dependencies
- **Cloudflare R2**: Bucket 'juewei-assets' accessible
- **CDN Configuration**: Cloudflare CDN configured for R2
- **Next.js Config**: External image domains configured
- **Environment Variables**: R2 URL and credentials

### Integration Points
- **Image Components**: Next.js Image components in React components
- **Product Data**: Static product data with image references
- **Build Process**: Next.js build and deployment pipeline
- **Environment**: Development and production environments

## Constitution Check

### Code Quality Gates
- ✅ **TypeScript**: All components use TypeScript
- ✅ **Accessibility**: Image components have proper alt text
- ✅ **Performance**: Next.js Image optimization enabled
- ✅ **SEO**: Proper image metadata and alt text

### Architecture Gates
- ✅ **Separation of Concerns**: Images separated from code
- ✅ **Scalability**: CDN distribution for global performance
- ✅ **Maintainability**: Centralized image management
- ✅ **Security**: Public read-only access for web assets

### Business Gates
- ✅ **User Experience**: Faster image loading globally
- ✅ **Cost Efficiency**: Reduced build size and deployment time
- ✅ **Operational**: Easier image updates without deployments
- ✅ **Performance**: 40% improvement for international users

## Phase 0: Research & Analysis

### Research Tasks Completed
1. **Current Image Usage Analysis**
   - Identified 50+ images in `/public` directory
   - Found image references in 4 key components
   - Analyzed product data structure with image paths
   - Confirmed font files should remain local

2. **R2 Integration Research**
   - Cloudflare R2 bucket 'juewei-assets' available
   - CDN configuration for global distribution
   - Environment variables for R2 access
   - Next.js external domain configuration needed

3. **Migration Strategy Research**
   - Preserve existing directory structure in R2
   - Update all code references to R2 URLs
   - Maintain backward compatibility during transition
   - Implement fallback mechanisms for R2 unavailability

### Key Decisions Made
- **Migration Scope**: All images except fonts and non-image files
- **URL Structure**: Preserve existing paths with R2 base URL
- **Fallback Strategy**: Graceful degradation with local fallback (serve from local `/public` if R2 unavailable)
- **Error Handling**: Fail silently and show broken image icon for failed image loads
- **Image Versioning**: Cache busting with timestamp (e.g., ?v=timestamp)
- **Performance Monitoring**: Basic monitoring (CDN hit rate, error rate only)
- **Performance Measurement**: Measure from multiple geographic locations with alerting
- **Update Process**: No deployment required for image updates

## Phase 1: Design & Contracts

### Data Model

#### Image Asset Entity
```typescript
interface ImageAsset {
  id: string;
  originalPath: string;        // e.g., "/carousel1/hero-01.webp"
  r2Path: string;             // e.g., "carousel1/hero-01.webp"
  r2Url: string;              // e.g., "https://juewei-assets.r2.dev/carousel1/hero-01.webp"
  fileType: 'webp' | 'jpg' | 'png' | 'gif';
  size: number;               // File size in bytes
  dimensions?: { width: number; height: number };
  altText: string;
  category: 'product' | 'brand' | 'certification' | 'social' | 'icon';
  lastModified: Date;
  isActive: boolean;
  // Clarified requirements
  fallbackUrl?: string;       // Local fallback URL for R2 unavailability
  version?: string;           // Cache busting timestamp (e.g., "?v=1234567890")
  errorHandling: 'fail-silent' | 'retry' | 'placeholder'; // Clarified: fail-silent
}
```

#### Product Image Reference
```typescript
interface ProductImageReference {
  productId: number;
  imagePath: string;          // Original local path
  r2Url: string;              // New R2 URL
  imageType: 'main' | 'floating' | 'badge';
  altText: string;
}
```

### API Contracts

#### Image URL Generation
```typescript
// Utility function for generating R2 URLs with fallback and versioning
function getR2ImageUrl(path: string, options?: { 
  fallback?: boolean; 
  version?: string; 
  useLocal?: boolean;
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use local fallback if R2 unavailable
  if (options?.useLocal) {
    return `/${cleanPath}`;
  }
  
  // Add cache busting version if provided
  const versionParam = options?.version ? `?v=${options.version}` : '';
  return `${baseUrl}/${cleanPath}${versionParam}`;
}

// Fallback handling with graceful degradation
function getImageUrlWithFallback(path: string): string {
  try {
    return getR2ImageUrl(path);
  } catch (error) {
    // Graceful degradation to local fallback
    return getR2ImageUrl(path, { useLocal: true });
  }
}
```

#### Environment Configuration
```typescript
// Environment variables
interface R2Config {
  NEXT_PUBLIC_R2_BASE_URL: string;    // R2 CDN URL
  R2_ACCESS_KEY_ID: string;           // R2 access key
  R2_SECRET_ACCESS_KEY: string;       // R2 secret key
  R2_BUCKET_NAME: string;            // 'juewei-assets'
  R2_REGION: string;                 // R2 region
}
```

### Component Updates

#### Next.js Image Configuration
```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'juewei-assets.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
```

#### Image Component Wrapper
```typescript
// components/ui/r2-image.tsx
interface R2ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  version?: string;           // Cache busting timestamp
  fallback?: boolean;        // Enable local fallback
}

export const R2Image: React.FC<R2ImageProps> = ({ 
  src, 
  version,
  fallback = true,
  ...props 
}) => {
  const r2Url = getImageUrlWithFallback(src);
  
  // Handle error with fail-silent approach
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallback) {
      // Try local fallback
      const localUrl = getR2ImageUrl(src, { useLocal: true });
      e.currentTarget.src = localUrl;
    }
    // Otherwise fail silently (show broken image icon)
  };
  
  return (
    <Image 
      src={r2Url} 
      onError={handleError}
      {...props} 
    />
  );
};
```

## Phase 2: Implementation Strategy

### Migration Steps

1. **Environment Setup**
   - Configure R2 credentials in `.env.local`
   - Update Next.js config for external domains
   - Test R2 connectivity
   - Set up basic monitoring (CDN hit rate, error rate)

2. **Image Upload to R2**
   - Upload all images from `/public` to R2 bucket
   - Preserve directory structure
   - Add cache busting timestamps to URLs
   - Verify all images accessible via R2 URLs

3. **Code Updates**
   - Update product data with R2 URLs
   - Update component image references to use R2Image wrapper
   - Implement graceful degradation with local fallback
   - Add error handling (fail-silent approach)

4. **Testing & Validation**
   - Test all images load from R2
   - Verify performance improvements (measure from multiple geographic locations)
   - Test fallback scenarios (R2 unavailability)
   - Validate CDN distribution and caching

5. **Cleanup & Monitoring**
   - Remove local images from `/public` (keep fonts and non-image files)
   - Update build process
   - Set up performance monitoring with alerting
   - Monitor CDN hit rates and error rates

### Risk Mitigation

1. **Fallback Strategy**
   - Implement graceful degradation with local fallback
   - Fail-silent error handling (show broken image icon)
   - Monitor R2 availability with basic monitoring
   - Alert on CDN hit rate and error rate issues

2. **Performance Monitoring**
   - Track image load times from multiple geographic locations
   - Monitor CDN hit rates (target: 90%)
   - Measure user experience improvements (target: 40% improvement)
   - Set up alerting for performance thresholds

3. **Rollback Plan**
   - Keep local images during transition
   - Ability to revert to local serving
   - Gradual migration approach
   - Cache busting ensures immediate updates

## Success Metrics

### Performance Targets
- **Image Load Time**: 95% of images load within 2 seconds globally (measured from multiple geographic locations with alerting)
- **CDN Hit Rate**: 90% of requests served from CDN cache
- **Build Size**: 50MB+ reduction in local build
- **Global Performance**: 40% improvement for international users

### Operational Metrics
- **Migration Success**: 100% of images migrated to R2
- **URL Updates**: All code references updated to R2 URLs
- **Availability**: 99.9% uptime for image serving
- **Error Rate**: <0.1% of image requests fail
- **Monitoring**: Basic monitoring (CDN hit rate, error rate only)
- **Fallback**: Graceful degradation with local fallback when R2 unavailable

## Next Steps

1. **Create R2 bucket and configure CDN**
2. **Set up environment variables and basic monitoring**
3. **Upload images to R2 bucket with cache busting**
4. **Update code references with R2Image wrapper**
5. **Implement fallback mechanisms and error handling**
6. **Test and validate from multiple geographic locations**
7. **Monitor performance with alerting**

## Dependencies

- Cloudflare R2 bucket 'juewei-assets'
- Cloudflare CDN configuration
- Environment variables setup
- Next.js external domain configuration
- Image upload and migration tools
- Basic monitoring setup (CDN hit rate, error rate)
- Cache busting implementation
- Fallback mechanism implementation
- Performance monitoring from multiple geographic locations
