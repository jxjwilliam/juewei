# CDN Configuration Guide

## T002: Configure Cloudflare CDN for R2 bucket with appropriate cache headers

### Steps to complete:

1. **Enable CDN for R2 Bucket**:
   - In Cloudflare dashboard, go to R2 Object Storage
   - Select 'juewei-assets' bucket
   - Enable CDN for the bucket
   - Configure custom domain if needed

2. **Set Cache Headers**:
   - Configure cache rules for different image types:
     - WebP images: Cache for 1 year
     - JPG/PNG images: Cache for 6 months
     - GIF images: Cache for 1 month
   - Set appropriate cache-control headers

3. **Configure CORS**:
   - Allow origins: your domain
   - Allow methods: GET, HEAD
   - Allow headers: Content-Type, Cache-Control

### Verification:
- CDN is active for the bucket
- Cache headers are properly set
- CORS is configured for web requests
