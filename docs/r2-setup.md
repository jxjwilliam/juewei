# R2 Bucket Setup Guide

## T001: Create R2 bucket 'juewei-assets' and configure public access

### Steps to complete:

1. **Create R2 Bucket**:
   - Log into Cloudflare dashboard
   - Navigate to R2 Object Storage
   - Create new bucket named 'juewei-assets'
   - Set region to 'auto' for global distribution

2. **Configure Public Access**:
   - Go to bucket settings
   - Enable public access for web assets
   - Set CORS policy for web requests
   - Configure cache headers for images

3. **Get CDN URL**:
   - Note the R2.dev URL (e.g., https://juewei-assets.r2.dev)
   - This will be used in environment variables

### Verification:
- Bucket is accessible via R2.dev URL
- Public read access is enabled
- CORS is configured for web requests
