# R2 Image Migration: Process & Rollback Guide

## Overview

This guide documents the complete R2 image migration process and provides detailed rollback procedures in case issues arise. The migration moves all static images from the local `/public` directory to Cloudflare R2 bucket 'juewei-assets' for improved performance and global CDN distribution.

## Migration Process

### Phase 1: Pre-Migration Setup

#### 1.1 Environment Configuration
```bash
# Create .env.local file
cp env.template .env.local

# Fill in R2 credentials
NEXT_PUBLIC_R2_BASE_URL=https://juewei-assets.r2.dev
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=juewei-assets
R2_REGION=auto
R2_ACCOUNT_ID=your_account_id_here
```

#### 1.2 R2 Bucket Setup
1. **Create R2 Bucket**:
   - Log into Cloudflare dashboard
   - Navigate to R2 Object Storage
   - Create new bucket named 'juewei-assets'
   - Set region to 'auto' for global distribution

2. **Configure Public Access**:
   - Enable public access for web assets
   - Set CORS policy for web requests
   - Configure cache headers for images

3. **Get CDN URL**:
   - Note the R2.dev URL (e.g., https://juewei-assets.r2.dev)
   - This will be used in environment variables

#### 1.3 Dependencies Installation
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### Phase 2: Image Migration

#### 2.1 Image Inventory
```bash
# Generate comprehensive image inventory
node scripts/inventory-images.js
```

#### 2.2 Image Upload
```bash
# Upload all images to R2 bucket
node scripts/migrate-images.js
```

#### 2.3 Component Updates
- Update all components to use `R2Image` wrapper
- Test image loading from R2 CDN
- Verify fallback mechanisms

### Phase 3: Testing & Validation

#### 3.1 Connectivity Testing
```bash
# Test R2 connection
node scripts/test-r2-connection.js

# Test image loading
node scripts/test-r2-integration.js
```

#### 3.2 Workflow Testing
```bash
# Test image update workflow
node scripts/test-image-workflow.js

# Test product addition workflow
node scripts/test-product-workflow.js
```

#### 3.3 Comprehensive Testing
```bash
# Run full test suite
node scripts/test-migration-suite.js
```

### Phase 4: Cleanup & Optimization

#### 4.1 Local Image Cleanup
```bash
# Dry run to see what will be removed
node scripts/cleanup-local-images.js --dry-run

# Perform actual cleanup
node scripts/cleanup-local-images.js
```

#### 4.2 Build Process Updates
- Update `.gitignore` to exclude migrated images
- Create `.buildignore` for build process
- Update deployment configurations

## Rollback Procedures

### Emergency Rollback (Immediate)

#### Step 1: Disable R2 Image Loading
```typescript
// In lib/r2-image.ts, temporarily disable R2
export function getImageUrlWithFallback(path: string): string {
  // Force local fallback
  return getR2ImageUrl(path, { useLocal: true });
}
```

#### Step 2: Restore Local Images
```bash
# Restore from backup
cp -r backup/local-images/* public/

# Or restore from git
git checkout HEAD~1 -- public/
```

#### Step 3: Revert Component Changes
```bash
# Revert to local Image components
git checkout HEAD~1 -- components/
```

#### Step 4: Update Environment
```bash
# Comment out R2 configuration
# NEXT_PUBLIC_R2_BASE_URL=https://juewei-assets.r2.dev
```

### Complete Rollback (Full Restoration)

#### Step 1: Stop R2 Services
```bash
# Disable R2 monitoring
# Stop any R2-related processes
```

#### Step 2: Restore Local Images
```bash
# Restore all local images
cp -r backup/local-images/* public/

# Verify image restoration
ls -la public/carousel1/
ls -la public/carousel2/
```

#### Step 3: Revert Code Changes
```bash
# Revert all migration-related changes
git revert <migration-commit-hash>

# Or reset to pre-migration state
git reset --hard <pre-migration-commit-hash>
```

#### Step 4: Update Configuration
```bash
# Remove R2 configuration from .env.local
# Remove R2 dependencies from package.json
npm uninstall @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

#### Step 5: Rebuild and Deploy
```bash
# Clean build
rm -rf .next/
npm run build

# Deploy restored version
npm run deploy
```

### Partial Rollback (Selective Restoration)

#### Rollback Specific Images
```bash
# Restore specific image categories
cp backup/local-images/carousel1/* public/carousel1/
cp backup/local-images/carousel2/* public/carousel2/

# Update components to use local images for specific cases
```

#### Rollback Specific Components
```bash
# Revert specific component changes
git checkout HEAD~1 -- components/hero-carousel.tsx
git checkout HEAD~1 -- components/product-hero-carousel.tsx
```

### Rollback Verification

#### 1. Test Image Loading
```bash
# Test local image loading
curl -I http://localhost:3000/carousel1/hero-01.webp
curl -I http://localhost:3000/carousel2/product6.webp
```

#### 2. Test Component Functionality
```bash
# Test hero carousel
# Test product carousel
# Test all image components
```

#### 3. Test Performance
```bash
# Run performance tests
npm run test:performance
```

## Troubleshooting

### Common Issues

#### Images Not Loading
1. **Check R2 connectivity**:
   ```bash
   node scripts/test-r2-connection.js
   ```

2. **Check fallback mechanism**:
   ```bash
   # Verify local images exist
   ls -la public/carousel1/
   ```

3. **Check component configuration**:
   ```typescript
   // Ensure R2Image component is properly configured
   import { R2Image } from '@/components/ui/r2-image';
   ```

#### Performance Issues
1. **Check CDN configuration**:
   ```bash
   # Test CDN response times
   curl -w "@curl-format.txt" -o /dev/null -s "https://juewei-assets.r2.dev/carousel1/hero-01.webp"
   ```

2. **Check cache headers**:
   ```bash
   # Verify cache headers
   curl -I https://juewei-assets.r2.dev/carousel1/hero-01.webp
   ```

#### Build Issues
1. **Check .gitignore configuration**:
   ```bash
   # Verify .gitignore excludes migrated images
   cat .gitignore | grep -A 10 "R2 migrated images"
   ```

2. **Check build process**:
   ```bash
   # Clean and rebuild
   rm -rf .next/
   npm run build
   ```

### Recovery Procedures

#### Data Recovery
```bash
# Restore from backup
cp -r backup/local-images/* public/

# Restore from git history
git checkout HEAD~1 -- public/
```

#### Configuration Recovery
```bash
# Restore environment configuration
cp .env.local.backup .env.local

# Restore package.json
git checkout HEAD~1 -- package.json
npm install
```

#### Code Recovery
```bash
# Restore component files
git checkout HEAD~1 -- components/

# Restore utility files
git checkout HEAD~1 -- lib/
```

## Monitoring & Maintenance

### Health Checks
```bash
# Daily health check
node scripts/test-r2-connection.js

# Weekly performance check
node scripts/test-r2-integration.js

# Monthly comprehensive test
node scripts/test-migration-suite.js
```

### Performance Monitoring
```bash
# Monitor image load times
# Check CDN hit rates
# Monitor error rates
```

### Backup Procedures
```bash
# Daily backup of local images
cp -r public/ backup/daily/$(date +%Y%m%d)/

# Weekly backup of R2 images
node scripts/backup-r2-images.js
```

## Best Practices

### Before Migration
1. **Create comprehensive backup**
2. **Test in staging environment**
3. **Verify R2 configuration**
4. **Plan rollback procedures**

### During Migration
1. **Monitor each step carefully**
2. **Test after each phase**
3. **Keep backups updated**
4. **Document any issues**

### After Migration
1. **Monitor performance closely**
2. **Test all functionality**
3. **Keep rollback procedures ready**
4. **Update documentation**

## Support & Resources

### Documentation
- [R2 Migration Guide](./r2-migration-guide.md)
- [Developer Image Management](./developer-image-management.md)
- [Content Manager Guide](./content-manager-guide.md)

### Scripts
- `scripts/test-r2-connection.js` - R2 connectivity testing
- `scripts/test-r2-integration.js` - Image loading validation
- `scripts/test-migration-suite.js` - Comprehensive testing
- `scripts/cleanup-local-images.js` - Local image cleanup

### Emergency Contacts
- **Technical Support**: support@juewei.com
- **Development Team**: dev@juewei.com
- **Emergency Hotline**: Available 24/7 for critical issues

## Conclusion

The R2 image migration provides significant performance benefits, but proper rollback procedures are essential for maintaining system reliability. By following this guide, you can safely migrate images to R2 while maintaining the ability to quickly rollback if issues arise.

Remember to always test rollback procedures in a staging environment before performing them in production.
