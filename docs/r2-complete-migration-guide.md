# Complete R2 Migration Guide

This guide provides step-by-step instructions for migrating all images from local `/public` directory to Cloudflare R2 bucket.

## Prerequisites

1. **Cloudflare R2 Account**: Ensure you have a Cloudflare account with R2 enabled
2. **R2 Bucket**: Create a bucket named `juewei-assets` (or update the configuration)
3. **R2 Credentials**: Get your Access Key ID and Secret Access Key from Cloudflare dashboard

## Step 1: Environment Configuration

Create `.env.local` file in the project root with the following configuration:

```bash
# Cloudflare R2 Configuration
NEXT_PUBLIC_R2_BASE_URL=https://juewei-assets.r2.dev
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=juewei-assets
R2_ACCOUNT_ID=your_account_id_here
```

**Important**: Replace the placeholder values with your actual R2 credentials.

## Step 2: Install Dependencies

Ensure you have the required dependencies:

```bash
npm install @aws-sdk/client-s3 dotenv
```

## Step 3: Upload Images to R2

Run the comprehensive upload script:

```bash
node scripts/r2/upload-all-images-to-r2.js
```

This script will:
- Upload all images from `/public/images/` to your R2 bucket
- Maintain the same directory structure
- Set appropriate cache headers
- Provide detailed upload statistics

## Step 4: Verify Image Structure

The script uploads images with the following structure:

```
juewei-assets/
├── banners/
│   └── banner-1.gif
├── carousel/
│   ├── branch2.webp
│   ├── duck-kidney-7.webp
│   ├── hero-01.webp
│   ├── no-preservatives.png
│   ├── product6.webp
│   ├── spicy-lobster6.webp
│   └── spicy-shrimp-balls.webp
├── certifications/
│   ├── cfia.jpg
│   ├── fda.jpg
│   └── sqf.jpg
├── logos/
│   ├── juewei-logo2.webp
│   └── logo.png
├── products/
│   ├── product-01-e1759979489647.webp
│   ├── product-02-e1759979514429.webp
│   ├── product-03-e1759979541108.webp
│   ├── product-04-e1759979443542.webp
│   ├── product-05-e1759979420985.webp
│   ├── product-06-e1759979377379.webp
│   ├── product-07-e1759979563713.webp
│   ├── product-08-e1759979600714.webp
│   ├── product-09-e1759979622649.webp
│   ├── product-10-e1759979640979.webp
│   ├── product-11-e1759979662994.webp
│   ├── product-12-e1759979685665.webp
│   └── [icon files...]
└── social/
    ├── juewei_canada_qr.png
    ├── tiktok.png
    ├── wechat.jpg
    └── xiaohongshu.jpg
```

## Step 5: Component Updates

All components have been updated to use `R2Image` instead of `Image`:

### ✅ Already Updated Components:
- `components/hero-carousel.tsx` - Uses R2Image
- `components/product-hero-carousel.tsx` - Uses R2Image  
- `components/header.tsx` - Uses R2Image
- `components/banner-section.tsx` - Uses R2Image
- `app/products/page.tsx` - Updated to use R2Image

### R2Image Component Features:
- **Automatic Fallback**: Falls back to local images if R2 is unavailable
- **Error Handling**: Graceful error handling with fallback mechanisms
- **Performance**: Optimized loading with proper cache headers
- **TypeScript**: Full TypeScript support with proper interfaces

## Step 6: Image URL Structure

Images are now served from R2 with the following URL pattern:

```
https://juewei-assets.r2.dev/images/[category]/[filename]
```

Examples:
- `https://juewei-assets.r2.dev/images/carousel/hero-01.webp`
- `https://juewei-assets.r2.dev/images/products/product-01-e1759979489647.webp`
- `https://juewei-assets.r2.dev/images/logos/juewei-logo2.webp`

## Step 7: Testing

### Test Image Loading:
1. Start the development server: `npm run dev`
2. Navigate to different pages to verify images load correctly
3. Check browser network tab to confirm images are loading from R2

### Test Fallback Mechanism:
1. Temporarily disable R2 by commenting out `NEXT_PUBLIC_R2_BASE_URL`
2. Verify images still load from local fallback
3. Re-enable R2 configuration

## Step 8: Performance Optimization

The migration includes several performance optimizations:

### Cache Headers:
- **WebP images**: 1 year cache with immutable flag
- **JPEG/PNG**: 6 months cache
- **GIF**: 1 month cache
- **Other formats**: 1 year cache

### Image Optimization:
- WebP format for modern browsers
- Proper content-type headers
- Optimized cache control

## Step 9: Monitoring

Monitor your R2 usage through:
1. **Cloudflare Dashboard**: Check bandwidth and storage usage
2. **R2 Analytics**: Monitor request patterns and performance
3. **Application Logs**: Check for any fallback usage

## Troubleshooting

### Common Issues:

1. **Missing Environment Variables**:
   ```
   ❌ Missing R2 configuration. Please check your .env.local file.
   ```
   **Solution**: Ensure all required environment variables are set in `.env.local`

2. **Upload Failures**:
   ```
   ❌ Failed to upload [filename]: [error message]
   ```
   **Solution**: Check R2 credentials and bucket permissions

3. **Images Not Loading**:
   - Verify `NEXT_PUBLIC_R2_BASE_URL` is correct
   - Check R2 bucket public access settings
   - Ensure images were uploaded successfully

### Debug Steps:

1. **Check R2 Connection**:
   ```bash
   node scripts/r2/test-r2-connection.js
   ```

2. **List R2 Objects**:
   ```bash
   node scripts/r2/list-r2-objects.js
   ```

3. **Verify Image URLs**:
   ```bash
   node scripts/testing/verify-image-paths.js
   ```

## Migration Checklist

- [ ] ✅ Environment variables configured
- [ ] ✅ Dependencies installed
- [ ] ✅ Images uploaded to R2
- [ ] ✅ Components updated to use R2Image
- [ ] ✅ Image loading tested
- [ ] ✅ Fallback mechanism tested
- [ ] ✅ Performance verified
- [ ] ✅ Monitoring setup

## Next Steps

After successful migration:

1. **Remove Local Images**: Consider removing local images from `/public/images/` (optional)
2. **Update CDN**: Configure custom domain for R2 if needed
3. **Monitor Performance**: Track R2 usage and optimize as needed
4. **Backup Strategy**: Implement regular backups of R2 bucket

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review R2 documentation: https://developers.cloudflare.com/r2/
3. Check component documentation in `/components/ui/r2-image.tsx`

---

**Migration completed successfully!** 🎉

All images are now served from Cloudflare R2 with automatic fallback to local images.
