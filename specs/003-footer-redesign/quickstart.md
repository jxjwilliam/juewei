# Quickstart: Footer Redesign

**Feature**: Footer Redesign  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

This quickstart guide provides step-by-step instructions for implementing the footer redesign feature. The footer will be modernized with improved visual hierarchy, enhanced mobile experience, and brand consistency while maintaining all existing functionality.

## Prerequisites

- Next.js 15 with App Router
- TypeScript 5
- Tailwind CSS 4.x
- shadcn/ui components
- Lucide React icons
- R2Image component for optimized images

## Implementation Steps

### 1. Analyze Current Footer

**Current Location**: `/components/footer.tsx`

**Current Structure**:
- Contact information section with phone, address, email
- Quick navigation links
- Business hours information
- Social media links with QR codes
- Trust badges (CFIA认证, 本地工厂, 新鲜配送)
- Copyright notice

**Current Issues**:
- Poor visual hierarchy
- Inconsistent spacing
- Mobile experience needs improvement
- Brand consistency issues

### 2. Design System Integration

**Use Existing Design System**:
```typescript
// Leverage existing Tailwind CSS utilities
import { cn } from '@/lib/utils'

// Use existing color system
className="bg-[#fcefea] text-gray-800"

// Apply food brand colors
className="bg-gradient-to-br from-orange-50 to-red-50"
```

**Typography Hierarchy**:
```typescript
// Use established typography scale
<h2 className="text-2xl lg:text-3xl font-black mb-3">
<h3 className="text-xl font-bold">
<p className="text-lg text-gray-600">
```

### 3. Responsive Design Implementation

**Mobile-First Approach**:
```typescript
// Base styles for mobile
<div className="grid grid-cols-1 gap-8">

// Tablet styles
<div className="md:grid-cols-2">

// Desktop styles  
<div className="lg:grid-cols-4">
```

**Touch-Friendly Interactions**:
```typescript
// Minimum 44px touch targets
<button className="min-h-[44px] min-w-[44px]">

// Proper spacing for touch
<div className="space-y-4">
```

### 4. Accessibility Implementation

**Semantic HTML Structure**:
```typescript
<footer className="bg-[#fcefea]">
  <div className="text-gray-800 py-16">
    <div className="container-wide">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Info */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-black mb-3">联系我们</h2>
          {/* Contact details */}
        </section>
        
        {/* Navigation */}
        <nav>
          <h3 className="text-xl font-bold">快速导航</h3>
          {/* Navigation links */}
        </nav>
      </div>
    </div>
  </div>
</footer>
```

**ARIA Labels and Focus Management**:
```typescript
<Link
  href={link.href}
  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 py-1"
  aria-label={`Navigate to ${link.name}`}
>
  {link.name}
</Link>
```

### 5. Performance Optimization

**Image Optimization**:
```typescript
import { R2Image } from '@/components/ui/r2-image'

<R2Image
  src={social.qrCode}
  alt={`${social.name} QR Code`}
  width={83}
  height={83}
  className="w-full h-auto"
  loading="lazy"
/>
```

**CSS Optimization**:
```typescript
// Use CSS variables for consistent theming
className="bg-[#fcefea] text-gray-800"

// Efficient animations
className="transition-colors duration-300"
```

### 6. Multi-language Support

**Chinese Font Optimization**:
```typescript
// Use Source Han Sans for Chinese text
className="font-source-han-sans"

// Proper text rendering
className="text-chinese"
```

**Language-Specific Content**:
```typescript
// Support both Chinese and English
const footerLinks = {
  navigation: [
    { name: "首页", href: "/" },
    { name: "产品", href: "/products" },
    // ... other links
  ]
}
```

### 7. Testing Implementation

**Component Tests**:
```typescript
// tests/components/footer.test.tsx
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

describe('Footer Component', () => {
  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByText('联系我们')).toBeInTheDocument()
  })
  
  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('快速导航')).toBeInTheDocument()
  })
})
```

**E2E Tests**:
```typescript
// tests/e2e/footer.spec.ts
import { test, expect } from '@playwright/test'

test('footer displays correctly on mobile', async ({ page }) => {
  await page.goto('/')
  await page.setViewportSize({ width: 375, height: 667 })
  
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()
  
  // Test mobile layout
  const contactSection = footer.locator('section').first()
  await expect(contactSection).toBeVisible()
})
```

### 8. Deployment Checklist

**Pre-deployment**:
- [ ] All tests passing
- [ ] Accessibility audit completed
- [ ] Performance metrics within targets
- [ ] Cross-browser testing completed
- [ ] Mobile device testing completed

**Post-deployment**:
- [ ] Footer loads within 2 seconds
- [ ] All links functional
- [ ] Images load correctly
- [ ] Responsive design works across devices
- [ ] Accessibility standards met

## Code Examples

### Modern Footer Structure
```typescript
export function Footer() {
  return (
    <footer className="bg-[#fcefea]">
      <div className="text-gray-800 py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Info */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black mb-3">联系我们</h2>
                <p className="text-lg text-gray-600">专业团队随时为您服务</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold">(604) 521-7618</div>
                    <div className="text-gray-600 text-sm">Mon-Sun: 9AM-9PM</div>
                  </div>
                </div>
                {/* More contact info */}
              </div>
            </section>
            
            {/* Navigation */}
            <nav className="space-y-4">
              <h3 className="text-xl font-bold">快速导航</h3>
              <div className="space-y-2">
                {footerLinks.navigation.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
            
            {/* Business Hours */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold">营业时间</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-800 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">服务时间</div>
                    <div className="text-sm">周一至周日: 9:00 AM - 9:00 PM</div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Social Media */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold">社交媒体</h3>
              <div className="space-y-5">
                {footerLinks.social.map((social) => {
                  const Icon = social.icon
                  return (
                    <div key={social.name} className="flex items-center gap-3">
                      <div className="w-[83px] h-auto flex-shrink-0">
                        <R2Image
                          src={social.qrCode}
                          alt={`${social.name} QR Code`}
                          width={83}
                          height={83}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-gray-800" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{social.name}</div>
                          <div className="text-gray-600 text-sm">{social.handle}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© 2025 绝味 JUEWEI all right reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Responsive Design Classes
```typescript
// Mobile-first responsive design
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"

// Responsive typography
className="text-2xl lg:text-3xl font-black mb-3"

// Responsive spacing
className="py-16 lg:py-20"

// Touch-friendly interactions
className="min-h-[44px] min-w-[44px]"
```

### Accessibility Features
```typescript
// Semantic HTML structure
<footer>
  <section>
    <h2>联系我们</h2>
    {/* Contact content */}
  </section>
  <nav>
    <h3>快速导航</h3>
    {/* Navigation links */}
  </nav>
</footer>

// ARIA labels
<Link
  href={link.href}
  aria-label={`Navigate to ${link.name}`}
>
  {link.name}
</Link>

// Focus management
className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

## Success Metrics

### Performance Targets
- Footer loads within 2 seconds
- 95% brand alignment consistency
- 100% WCAG 2.1 AA compliance
- 100% functionality preservation

### User Experience Goals
- 50% faster information finding
- Improved mobile experience
- Better visual hierarchy
- Enhanced brand consistency

## Troubleshooting

### Common Issues
1. **Images not loading**: Check R2Image component configuration
2. **Responsive layout issues**: Verify Tailwind CSS classes
3. **Accessibility warnings**: Ensure proper semantic HTML
4. **Performance issues**: Optimize images and CSS

### Debug Steps
1. Check browser console for errors
2. Verify component props and data
3. Test responsive design across devices
4. Run accessibility audit
5. Check performance metrics

## Next Steps

After implementing the footer redesign:

1. **Testing**: Run comprehensive tests
2. **Accessibility Audit**: Verify WCAG compliance
3. **Performance Testing**: Check loading times
4. **User Testing**: Gather feedback on new design
5. **Documentation**: Update component documentation
6. **Deployment**: Deploy to production environment
