# Footer Component Documentation

**Component**: `Footer`  
**Location**: `/components/footer.tsx`  
**Type**: React Functional Component  
**Framework**: Next.js 15 with App Router  

## Overview

The Footer component provides a comprehensive footer section for the Juewei website, including contact information, navigation links, business hours, social media integration, and trust badges. It's designed with responsive layout and accessibility in mind.

## Features

### Core Functionality
- **Contact Information**: Phone, address, email with business hours
- **Navigation Links**: Quick access to main site sections
- **Social Media Integration**: QR codes and links to social platforms
- **Trust Badges**: CFIA certification, local factory, fresh delivery
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Multi-language Support**: Chinese and English content

### Visual Design
- **Background**: Light pink/beige color (`#fcefea`)
- **Typography**: Clear hierarchy with proper font weights and sizes
- **Layout**: 4-column grid on desktop, responsive on mobile
- **Icons**: Lucide React icons for contact information
- **Social Media**: Custom SVG icons for platforms

## Component Structure

```typescript
export function Footer() {
  return (
    <footer className="bg-[#fcefea]">
      <div className="text-gray-800 py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Info Section */}
            {/* Navigation Section */}
            {/* Business Hours Section */}
            {/* Social Media Section */}
          </div>
        </div>
        {/* Copyright Section */}
      </div>
    </footer>
  )
}
```

## Sections

### 1. Contact Information
- **Title**: "联系我们" (Contact Us)
- **Subtitle**: "专业团队随时为您服务" (Professional team ready to serve you)
- **Phone**: (604) 521-7618 with hours
- **Address**: 1531 Derwent Way, Delta, BC V3M6K8
- **Email**: jueweifoodca@gmail.com with 24/7 support note

### 2. Quick Navigation
- **Title**: "快速导航" (Quick Navigation)
- **Links**: Home, Products, About, Contact, Partnership
- **Accessibility**: Proper ARIA labels and semantic navigation

### 3. Business Hours
- **Title**: "营业时间" (Business Hours)
- **Service Hours**: Monday to Sunday, 9:00 AM - 9:00 PM
- **Support**: 24/7 customer support

### 4. Social Media
- **Title**: "社交媒体" (Social Media)
- **Platforms**: Instagram, 小红书 (Xiaohongshu), TikTok, WeChat
- **Features**: QR codes for easy mobile access
- **Icons**: Custom SVG icons for each platform

### 5. Trust Badges
- **CFIA认证**: CFIA certification badge
- **本地工厂**: Local factory badge
- **新鲜配送**: Fresh delivery badge

## Props

Currently, the Footer component doesn't accept any props and uses static data defined within the component.

## Dependencies

### External Dependencies
- `next/link` - Next.js Link component for navigation
- `lucide-react` - Icon library for contact and business icons
- `@/components/ui/r2-image` - Optimized image component
- `@/components/ui/badge` - Badge component for trust indicators

### Internal Dependencies
- `@/lib/r2/get-r2-url` - R2 URL generation for social media QR codes

## Styling

### CSS Classes
- **Container**: `container-wide` (custom utility class)
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`
- **Typography**: Responsive text sizing with `text-2xl lg:text-3xl`
- **Colors**: Food brand colors with `bg-[#fcefea]` and `text-gray-800`

### Responsive Design
- **Mobile**: Single column layout
- **Tablet**: Two column layout (md:grid-cols-2)
- **Desktop**: Four column layout (lg:grid-cols-4)

## Accessibility Features

### Semantic HTML
- `<footer>` element with proper role
- `<nav>` element for navigation links
- Proper heading hierarchy (h2, h3)
- Semantic section organization

### ARIA Attributes
- Navigation links have proper labels
- Images have descriptive alt text
- Proper focus management for keyboard navigation

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Proper tab order for navigation
- Focus indicators for better visibility

## Testing

### Unit Tests
Located in `/tests/components/footer.test.tsx`

**Test Coverage**:
- Component rendering
- Contact information display
- Navigation links functionality
- Social media integration
- Trust badges display
- Accessibility attributes
- Responsive design classes

### Test Commands
```bash
# Run footer component tests
npm test tests/components/footer.test.tsx

# Run all component tests
npm test tests/components/

# Run tests with coverage
npm test -- --coverage
```

## Performance Considerations

### Image Optimization
- **R2Image Component**: Optimized loading for social media QR codes
- **Lazy Loading**: Images load only when needed
- **WebP Format**: Modern image format for better performance

### CSS Optimization
- **Tailwind CSS**: Utility-first approach for minimal CSS
- **Responsive Design**: Mobile-first approach reduces unused CSS
- **Component Isolation**: Self-contained styling

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Responsive**: Works on all screen sizes from 320px to 4K

## Future Enhancements

### Planned Improvements
- **Dynamic Content**: Support for CMS-driven content
- **Multi-language**: Full i18n support with language switching
- **Analytics**: Track footer interactions and conversions
- **A/B Testing**: Test different footer layouts and content

### Accessibility Improvements
- **High Contrast Mode**: Support for accessibility preferences
- **Reduced Motion**: Respect user motion preferences
- **Screen Reader**: Enhanced announcements and navigation

## Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check R2Image component configuration
   - Verify R2 URL generation
   - Check network connectivity

2. **Layout Issues**
   - Verify Tailwind CSS classes
   - Check responsive breakpoints
   - Validate container classes

3. **Accessibility Warnings**
   - Ensure proper semantic HTML
   - Check ARIA attributes
   - Validate heading hierarchy

### Debug Steps
1. Check browser console for errors
2. Verify component props and data
3. Test responsive design across devices
4. Run accessibility audit
5. Check performance metrics

## Related Components

- **Header**: Main site navigation
- **Layout**: Root layout component
- **R2Image**: Image optimization component
- **Badge**: Trust indicator component

## Changelog

### Version 1.0.0 (2025-01-27)
- Initial implementation
- Basic footer structure
- Contact information display
- Navigation links
- Social media integration
- Trust badges
- Responsive design
- Accessibility features

---

**Last Updated**: 2025-01-27  
**Maintainer**: Development Team  
**Status**: Active Development
