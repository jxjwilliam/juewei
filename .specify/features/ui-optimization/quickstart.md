# Quickstart Guide: UI Optimization

**Feature**: UI Optimization - CSS Improvements, Font Replacement, and Media Optimization  
**Created**: 2024-12-19  
**Status**: Ready for Implementation  

## Overview

This guide provides step-by-step instructions for implementing UI optimization improvements for the Juewei UI restaurant website. The implementation focuses on modernizing CSS architecture, replacing fonts with Next.js font optimization, and optimizing media assets.

## Prerequisites

- Next.js 15 with App Router
- Tailwind CSS 4.x
- TypeScript 5
- Cloudflare R2 CDN access
- Source Han Sans font files

## Implementation Steps

### Phase 1: Font System Modernization

#### Step 1.1: Replace Local Fonts with Next.js Font Optimization

1. **Install Next.js font optimization**:
   ```bash
   npm install next/font
   ```

2. **Create font configuration**:
   ```typescript
   // lib/fonts.ts
   import localFont from 'next/font/local'
   
   export const sourceHanSans = localFont({
     src: [
       {
         path: '../public/fonts/source_han_sans/SourceHanSansCN-Regular.otf',
         weight: '400',
         style: 'normal',
       },
       {
         path: '../public/fonts/source_han_sans/SourceHanSansCN-Medium.otf',
         weight: '500',
         style: 'normal',
       },
       {
         path: '../public/fonts/source_han_sans/SourceHanSansCN-Bold.otf',
         weight: '700',
         style: 'normal',
       },
     ],
     variable: '--font-source-han-sans',
     display: 'swap',
     fallback: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
   })
   ```

3. **Update layout.tsx**:
   ```typescript
   import { sourceHanSans } from '@/lib/fonts'
   
   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="en" className={sourceHanSans.variable}>
         <body className={sourceHanSans.className}>
           {children}
         </body>
       </html>
     )
   }
   ```

#### Step 1.2: Update CSS Variables

1. **Update globals.css**:
   ```css
   :root {
     --font-source-han-sans: var(--font-source-han-sans);
     --font-source-han-sans-heading: var(--font-source-han-sans);
   }
   ```

2. **Update Tailwind config**:
   ```typescript
   // tailwind.config.ts
   module.exports = {
     theme: {
       extend: {
         fontFamily: {
           sans: ['var(--font-source-han-sans)', 'system-ui', 'sans-serif'],
           heading: ['var(--font-source-han-sans)', 'system-ui', 'sans-serif'],
         },
       },
     },
   }
   ```

### Phase 2: Image Cleanup and Organization

#### Step 2.1: Audit Current Image Usage

1. **Run image audit script**:
   ```bash
   # Create audit script
   node scripts/audit-images.js
   ```

2. **Review audit results**:
   - Identify used vs unused images
   - Check scraped_media usage
   - Plan organization structure

#### Step 2.2: Organize Images into Subdirectories

1. **Create directory structure**:
   ```bash
   mkdir -p public/images/{logos,products,certifications,social,banners}
   ```

2. **Move images to appropriate directories**:
   ```bash
   # Move logos
   mv public/juewei-logo*.webp public/images/logos/
   
   # Move product images
   mv public/carousel* public/images/products/
   
   # Move certification images
   mv public/{cfia,fda,sqf}.jpg public/images/certifications/
   
   # Move social media icons
   mv public/{wechat,tiktok,xiaohongshu}.* public/images/social/
   ```

3. **Update component references**:
   ```typescript
   // Update image paths in components
   const logoPath = '/images/logos/juewei-logo2.webp'
   const productPath = '/images/products/carousel2/product6.webp'
   ```

#### Step 2.3: Remove Unused Assets

1. **Remove scraped_media folder**:
   ```bash
   rm -rf scraped_media/
   ```

2. **Remove unused images**:
   ```bash
   # Remove unused images based on audit results
   rm public/unused-image-*.webp
   ```

### Phase 3: CSS Architecture Improvement

#### Step 3.1: Reorganize CSS Variables

1. **Create design token system**:
   ```css
   /* globals.css - Design Tokens */
   :root {
     /* Food Brand Colors */
     --food-red: oklch(0.55 0.22 25);
     --food-orange: oklch(0.65 0.2 40);
     --food-yellow: oklch(0.8 0.15 60);
     
     /* Spacing Scale */
     --space-xs: 0.25rem;
     --space-sm: 0.5rem;
     --space-md: 1rem;
     --space-lg: 1.5rem;
     --space-xl: 2rem;
     
     /* Typography Scale */
     --text-xs: 0.75rem;
     --text-sm: 0.875rem;
     --text-base: 1rem;
     --text-lg: 1.125rem;
     --text-xl: 1.25rem;
   }
   ```

2. **Organize utility classes by category**:
   ```css
   /* Food Brand Utilities */
   .food-gradient-primary {
     background: linear-gradient(135deg, var(--food-red), var(--food-orange));
   }
   
   .food-text-primary {
     color: var(--food-red);
   }
   ```

#### Step 3.2: Implement Component-Specific CSS

1. **Create component CSS modules**:
   ```css
   /* components/hero-carousel.module.css */
   .heroCarousel {
     @apply relative overflow-hidden;
   }
   
   .heroImage {
     @apply w-full h-auto object-cover;
   }
   ```

2. **Update component imports**:
   ```typescript
   import styles from './hero-carousel.module.css'
   
   export function HeroCarousel() {
     return (
       <div className={styles.heroCarousel}>
         <img className={styles.heroImage} src="..." alt="..." />
       </div>
     )
   }
   ```

### Phase 4: Performance Optimization

#### Step 4.1: Implement Critical CSS

1. **Create critical CSS extraction**:
   ```typescript
   // lib/critical-css.ts
   export function extractCriticalCSS() {
     // Implementation for critical CSS extraction
   }
   ```

2. **Inline critical CSS**:
   ```typescript
   // app/layout.tsx
   import { extractCriticalCSS } from '@/lib/critical-css'
   
   export default function RootLayout({ children }: { children: React.ReactNode }) {
     const criticalCSS = extractCriticalCSS()
     
     return (
       <html>
         <head>
           <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
         </head>
         <body>{children}</body>
       </html>
     )
   }
   ```

#### Step 4.2: Optimize Image Loading

1. **Implement responsive images**:
   ```typescript
   import Image from 'next/image'
   
   export function OptimizedImage({ src, alt, priority = false }) {
     return (
       <Image
         src={src}
         alt={alt}
         width={800}
         height={600}
         priority={priority}
         loading={priority ? 'eager' : 'lazy'}
         placeholder="blur"
         blurDataURL="data:image/jpeg;base64,..."
       />
     )
   }
   ```

2. **Configure image optimization**:
   ```typescript
   // next.config.ts
   const nextConfig = {
     images: {
       formats: ['image/webp', 'image/avif'],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
       imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
     },
   }
   ```

## Testing and Validation

### Performance Testing

1. **Run Lighthouse audit**:
   ```bash
   npm run lighthouse
   ```

2. **Check Core Web Vitals**:
   - First Contentful Paint < 1.5s
   - Cumulative Layout Shift < 0.1
   - Largest Contentful Paint < 2.5s

### Font Testing

1. **Test Chinese text rendering**:
   - Verify Source Han Sans loads correctly
   - Check fallback fonts work properly
   - Test font loading performance

2. **Test English text rendering**:
   - Verify typography hierarchy
   - Check responsive font scaling
   - Test accessibility compliance

### Image Testing

1. **Test image optimization**:
   - Verify WebP format delivery
   - Check responsive image loading
   - Test lazy loading performance

2. **Test image organization**:
   - Verify all images load correctly
   - Check broken image links
   - Test CDN delivery

## Monitoring and Maintenance

### Performance Monitoring

1. **Set up Core Web Vitals tracking**:
   ```typescript
   // lib/analytics.ts
   export function trackWebVitals(metric: any) {
     // Implementation for Web Vitals tracking
   }
   ```

2. **Monitor font loading performance**:
   ```typescript
   // lib/font-monitoring.ts
   export function monitorFontPerformance() {
     // Implementation for font performance monitoring
   }
   ```

### Maintenance Tasks

1. **Regular image audits**:
   - Check for unused images
   - Optimize new images
   - Update image references

2. **CSS maintenance**:
   - Review unused CSS
   - Update design tokens
   - Optimize component styles

## Troubleshooting

### Common Issues

1. **Font loading issues**:
   - Check font file paths
   - Verify fallback fonts
   - Test font display swap

2. **Image loading issues**:
   - Check image paths
   - Verify CDN configuration
   - Test responsive images

3. **CSS organization issues**:
   - Check CSS variable references
   - Verify Tailwind configuration
   - Test component styling

### Debug Tools

1. **Font debugging**:
   ```typescript
   // Debug font loading
   console.log('Font loaded:', document.fonts.check('16px Source Han Sans'))
   ```

2. **Image debugging**:
   ```typescript
   // Debug image loading
   const img = new Image()
   img.onload = () => console.log('Image loaded')
   img.src = '/images/products/hero-01.webp'
   ```

3. **CSS debugging**:
   ```css
   /* Debug CSS variables */
   * {
     outline: 1px solid red;
   }
   ```

## Success Metrics

### Performance Targets
- **First Contentful Paint**: < 1.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Largest Contentful Paint**: < 2.5 seconds
- **CSS Bundle Size**: 20% reduction

### Quality Targets
- **Font Loading Time**: 30% improvement
- **Image File Sizes**: 25% reduction
- **CSS Organization**: 90% follows patterns
- **Accessibility**: WCAG 2.1 AA compliance

### User Experience Targets
- **Typography**: 15% readability improvement
- **Mobile Performance**: Optimized for restaurant customers
- **Visual Consistency**: Maintained design system
- **Brand Identity**: Preserved food brand aesthetics
