# Quickstart Guide: R2 Image Migration

**Feature**: R2 Image Migration  
**Created**: 2024-12-19  
**Status**: Implementation Ready  

## Overview

This guide provides step-by-step instructions for migrating static images from the local `/public` directory to Cloudflare R2 bucket 'juewei-assets' for the Juewei UI restaurant website.

## Prerequisites

- Cloudflare R2 bucket 'juewei-assets' created and accessible
- Cloudflare CDN configured for the R2 bucket
- Environment variables configured in `.env.local`
- Next.js 15 project with App Router
- Node.js 18+ installed

## Environment Setup

### 1. Configure Environment Variables

Create or update `.env.local` with R2 credentials:

```bash
# Cloudflare R2 Configuration
NEXT_PUBLIC_R2_BASE_URL=https://juewei-assets.r2.dev
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=juewei-assets
R2_REGION=auto
```

### 2. Update Next.js Configuration

Update `next.config.ts` to allow external image domains:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
}

export default nextConfig
```

## Implementation Steps

### Step 1: Create R2 Image Utility

Create `lib/r2-image.ts` for image URL generation:

```typescript
/**
 * R2 Image Utility Functions
 * Handles image URL generation and R2 integration
 */

export function getR2ImageUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_R2_BASE_URL is not configured');
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}/${cleanPath}`;
}

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
```

### Step 2: Create R2 Image Component

Create `components/ui/r2-image.tsx`:

```typescript
import Image from 'next/image';
import { getR2ImageUrl } from '@/lib/r2-image';

interface R2ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export const R2Image: React.FC<R2ImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  fill = false, 
  className,
  priority = false,
  quality = 75
}) => {
  const r2Url = getR2ImageUrl(src);
  
  return (
    <Image
      src={r2Url}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      priority={priority}
      quality={quality}
    />
  );
};
```

### Step 3: Update Product Data

Update `lib/data/products.ts` with R2 URLs:

```typescript
// Before: image: "/carousel2/hero-01.webp"
// After: image: "carousel2/hero-01.webp" (remove leading slash)

export const products: Product[] = [
  {
    id: 1,
    name: "麻辣虾球",
    nameEn: "Spicy Shrimp Balls",
    image: "carousel2/hero-01.webp", // Updated to R2 path
    // ... rest of product data
    floatingImage: "carousel2/product6.webp", // Updated to R2 path
  },
  // ... other products
];
```

### Step 4: Update Component References

Update image references in components:

#### Before (components/hero-carousel.tsx):
```typescript
<Image src="/carousel1/spicy-lobster6.webp" alt="麻辣龙虾" fill className="object-contain" />
```

#### After (components/hero-carousel.tsx):
```typescript
import { R2Image } from '@/components/ui/r2-image';

<R2Image src="carousel1/spicy-lobster6.webp" alt="麻辣龙虾" fill className="object-contain" />
```

### Step 5: Update All Components

Apply the same pattern to all components:

- `components/hero-carousel.tsx`
- `components/product-hero-carousel.tsx`
- `components/header.tsx`
- `components/banner-section.tsx`

### Step 6: Upload Images to R2

Create a migration script `scripts/upload-to-r2.js`:

```javascript
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const client = new S3Client({
  region: process.env.R2_REGION,
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadImage(filePath, r2Path) {
  const fileContent = fs.readFileSync(filePath);
  
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Path,
    Body: fileContent,
    ContentType: getMimeType(filePath),
  });
  
  try {
    await client.send(command);
    console.log(`Uploaded: ${filePath} -> ${r2Path}`);
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error);
  }
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Upload all images from public directory
async function migrateImages() {
  const publicDir = path.join(__dirname, '../public');
  const files = fs.readdirSync(publicDir, { recursive: true });
  
  for (const file of files) {
    if (file.endsWith('.webp') || file.endsWith('.jpg') || 
        file.endsWith('.png') || file.endsWith('.gif')) {
      const fullPath = path.join(publicDir, file);
      const r2Path = file.replace(/\\/g, '/'); // Normalize path separators
      await uploadImage(fullPath, r2Path);
    }
  }
}

migrateImages().catch(console.error);
```

### Step 7: Test and Validate

1. **Test Image Loading**:
   ```bash
   npm run dev
   ```
   Visit the website and verify all images load from R2 URLs.

2. **Check Network Tab**:
   - Open browser dev tools
   - Verify images load from `juewei-assets.r2.dev`
   - Check for any 404 errors

3. **Performance Testing**:
   - Test from different geographic locations
   - Measure image load times
   - Verify CDN caching

### Step 8: Cleanup Local Images

After successful migration and testing:

1. **Backup Local Images** (optional):
   ```bash
   mkdir -p backup/images
   cp -r public/*.webp public/*.jpg public/*.png public/*.gif backup/images/
   ```

2. **Remove Local Images**:
   ```bash
   # Remove image files but keep fonts and other assets
   rm public/*.webp public/*.jpg public/*.png public/*.gif
   rm -rf public/carousel1 public/carousel2
   ```

3. **Keep Essential Files**:
   - `public/fonts/` (Chinese fonts)
   - `public/manifest.json`
   - `public/robots.txt`
   - `public/sitemap.xml`
   - `public/favicon.ico`

## Verification Checklist

- [ ] Environment variables configured
- [ ] Next.js config updated for external domains
- [ ] R2Image component created
- [ ] All components updated to use R2Image
- [ ] Product data updated with R2 paths
- [ ] Images uploaded to R2 bucket
- [ ] All images load correctly from R2
- [ ] No 404 errors in browser console
- [ ] Performance improved (check Network tab)
- [ ] CDN caching working (check response headers)
- [ ] Local images cleaned up
- [ ] Build process still works

## Troubleshooting

### Common Issues

1. **Images not loading**:
   - Check environment variables
   - Verify R2 bucket permissions
   - Check Next.js external domain configuration

2. **CORS errors**:
   - Ensure R2 bucket has proper CORS configuration
   - Check CDN settings

3. **Performance issues**:
   - Verify CDN is enabled
   - Check cache headers
   - Monitor R2 usage

### Debug Commands

```bash
# Check environment variables
echo $NEXT_PUBLIC_R2_BASE_URL

# Test R2 connectivity
curl -I https://juewei-assets.r2.dev/carousel1/hero-01.webp

# Check build process
npm run build
npm run start
```

## Next Steps

After successful migration:

1. **Monitor Performance**: Set up monitoring for image load times and CDN hit rates
2. **Optimize Images**: Consider additional image optimization strategies
3. **Update Documentation**: Update team documentation with new image management process
4. **Set up Alerts**: Configure alerts for R2 service issues

## Support

For issues or questions:
- Check the implementation plan: `impl-plan.md`
- Review data model: `data-model.md`
- Consult research findings: `research.md`
- Check API contracts: `contracts/image-service.ts`
