# Feature Specification: R2 Image Migration

**Feature ID**: r2-image-migration  
**Created**: 2024-12-19  
**Status**: Draft  
**Priority**: Medium  

## Overview

Migrate all static images from the local `/public` directory to Cloudflare R2 bucket 'juewei-assets' to improve performance, reduce build size, and enable global CDN distribution for the Juewei UI restaurant website.

## Clarifications

### Session 2024-12-19

- Q: How should the system handle R2 unavailability - should it fall back to local images, show placeholders, or use a different strategy? → A: Graceful degradation with local fallback (serve from local `/public` if R2 unavailable)
- Q: What specific metrics should be monitored and what alerting thresholds should be set for image performance? → A: Basic monitoring (CDN hit rate, error rate only)
- Q: What should happen when an image fails to load from R2 - should the system retry, show a placeholder, or fail silently? → A: Fail silently and show broken image icon
- Q: How should image versioning be handled - should it use cache busting, semantic versioning, or a different approach? → A: Cache busting with timestamp (e.g., ?v=timestamp)
- Q: What should be the performance measurement approach and what action should be taken if the 2-second threshold isn't met? → A: Measure from multiple geographic locations with alerting

## Problem Statement

The Juewei UI website currently serves all images from the local `/public` directory, which:
- Increases build size and deployment time
- Limits global performance due to single origin serving
- Lacks CDN optimization for international users
- Creates maintenance overhead for image updates

## User Scenarios & Testing

### Primary User Scenarios

1. **Website Visitor Loading Images**
   - User visits the Juewei UI website
   - All images (logos, product photos, carousel images, icons) load from R2 CDN
   - Images load faster than before, especially for international users
   - No broken images or missing assets

2. **Developer Updating Images**
   - Developer uploads new product images to R2 bucket
   - Website automatically serves new images from CDN
   - No deployment required for image updates
   - Image URLs remain consistent

3. **Content Manager Adding Products**
   - Content manager adds new product with images
   - Images are uploaded to R2 bucket with proper naming convention
   - Product data references R2 URLs
   - Images display correctly on website

### Testing Scenarios

1. **Image Loading Test**
   - Verify all existing images load from R2 URLs
   - Test image loading performance from different geographic locations
   - Confirm no broken image links

2. **Fallback Test**
   - Test behavior when R2 is temporarily unavailable
   - Verify graceful degradation or fallback mechanisms

3. **Update Test**
   - Upload new image to R2 bucket
   - Verify website serves new image immediately
   - Test image replacement without code changes

## Functional Requirements

### FR1: Image Migration
- **Requirement**: All images from `/public` directory must be migrated to R2 bucket 'juewei-assets'
- **Acceptance Criteria**:
  - All image files (webp, jpg, png, gif) are uploaded to R2
  - Directory structure is preserved in R2 bucket
  - Font files remain in local `/public/fonts` directory (not migrated)
  - Non-image files (manifest.json, robots.txt, sitemap.xml) remain local

### FR2: URL Reference Updates
- **Requirement**: All code references to local images must be updated to R2 URLs
- **Acceptance Criteria**:
  - All `src="/path/to/image"` references updated to R2 URLs
  - Product data in `lib/data/products.ts` updated with R2 URLs
  - Component image references updated (hero-carousel, product-hero-carousel, etc.)
  - No hardcoded local image paths remain

### FR3: CDN Performance
- **Requirement**: Images must be served through Cloudflare CDN
- **Acceptance Criteria**:
  - All images load from Cloudflare CDN URLs
  - Image loading performance improves for international users
  - CDN caching headers are properly configured
  - Images support WebP format optimization

### FR4: Image Management
- **Requirement**: System must support easy image updates without code changes
- **Acceptance Criteria**:
  - New images can be uploaded to R2 bucket
  - Image URLs follow consistent naming convention
  - No deployment required for image updates
  - Cache busting with timestamp (e.g., ?v=timestamp) for image versioning

### FR5: Fallback Handling
- **Requirement**: System must handle R2 unavailability gracefully
- **Acceptance Criteria**:
  - Graceful degradation with local fallback (serve from local `/public` if R2 unavailable)
  - Fail silently and show broken image icon for failed image loads
  - User-friendly error messages for missing images
  - Monitoring for image load failures

## Success Criteria

### Performance Metrics
- **Image Load Time**: 95% of images load within 2 seconds globally (measured from multiple geographic locations with alerting)
- **CDN Hit Rate**: 90% of image requests served from CDN cache
- **Build Size Reduction**: Local build size reduced by at least 50MB
- **Global Performance**: Image loading time improves by 40% for users outside primary region

### User Experience Metrics
- **Image Availability**: 99.9% uptime for image serving
- **Error Rate**: Less than 0.1% of image requests result in 404 errors
- **User Satisfaction**: No user complaints about slow or missing images

### Technical Metrics
- **Migration Completion**: 100% of images successfully migrated to R2
- **URL Update Success**: All code references updated to R2 URLs
- **CDN Integration**: All images served through Cloudflare CDN
- **Monitoring**: Basic monitoring (CDN hit rate, error rate only)

## Key Entities

### Image Assets
- **Product Images**: Carousel images, product photos, hero images
- **Brand Assets**: Logos, icons, banners
- **Certification Images**: FDA, CFIA, SQF certification badges
- **Social Media Icons**: WeChat, TikTok, Xiaohongshu icons

### R2 Bucket Structure
- **Bucket Name**: juewei-assets
- **Directory Structure**: Preserve existing `/public` structure
- **File Types**: webp, jpg, png, gif (exclude fonts and non-image files)
- **Naming Convention**: Maintain existing file names and paths

### URL Configuration
- **Base URL**: Cloudflare R2 CDN URL for juewei-assets bucket
- **Path Structure**: `/carousel1/`, `/carousel2/`, root level images
- **File Extensions**: Preserve original file extensions
- **Caching**: Appropriate cache headers for different image types

## Assumptions

1. **Cloudflare R2 Access**: R2 bucket 'juewei-assets' is already created and accessible
2. **CDN Configuration**: Cloudflare CDN is properly configured for the R2 bucket
3. **Image Formats**: Current WebP, JPG, PNG, GIF formats are sufficient
4. **Font Files**: Chinese fonts (Source Han Sans) remain in local `/public/fonts` directory
5. **Non-Image Files**: Files like manifest.json, robots.txt, sitemap.xml remain local
6. **Backward Compatibility**: No need to maintain local image copies after migration
7. **Performance**: R2 + CDN will provide better performance than local serving
8. **Cost**: R2 storage and bandwidth costs are acceptable for the project
9. **Security**: R2 bucket has appropriate public read permissions for web assets
10. **Monitoring**: Basic monitoring and alerting can be set up for image availability

## Dependencies

- **Cloudflare R2**: R2 bucket 'juewei-assets' must be accessible
- **Cloudflare CDN**: CDN must be configured for the R2 bucket
- **Next.js Image Component**: Must support external image domains
- **Environment Variables**: R2 bucket URL must be configurable
- **Build Process**: Migration must not break existing build pipeline

## Constraints

- **Font Files**: Chinese fonts must remain local for proper rendering
- **Non-Image Assets**: Static files like manifest.json, robots.txt, sitemap.xml remain local
- **Backward Compatibility**: Migration must not break existing functionality
- **Performance**: Image loading must not be slower than current implementation
- **Cost**: R2 usage must stay within budget constraints
- **Security**: Only public web assets should be in R2 bucket

## Out of Scope

- **Video Assets**: No video files in current `/public` directory
- **Font Optimization**: Font files remain local (not migrated to R2)
- **Image Processing**: No real-time image processing or transformations
- **User Uploads**: No user-generated content upload functionality
- **Image Editing**: No built-in image editing capabilities
- **Multiple Buckets**: Single R2 bucket for all images
- **Image Versioning**: No complex versioning system for images
