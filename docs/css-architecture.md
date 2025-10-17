# CSS Architecture Documentation

## Overview

This document outlines the CSS architecture for the Juewei UI restaurant website, including design tokens, component styling patterns, and performance optimization strategies.

## Design System

### Color Palette

The Juewei UI design system uses a warm, appetizing color palette optimized for restaurant branding:

```css
/* Primary Colors - Food Brand */
--food-red: oklch(0.55 0.22 25);        /* Warm red for appetizing appeal */
--food-orange: oklch(0.65 0.2 40);      /* Orange for energy and warmth */
--food-yellow: oklch(0.8 0.15 60);       /* Yellow for freshness and joy */

/* Secondary Colors */
--food-green: oklch(0.6 0.15 120);      /* Green for freshness */
--food-blue: oklch(0.6 0.15 240);       /* Blue for trust and reliability */

/* Neutral Colors */
--gray-50: oklch(0.98 0.005 106);
--gray-100: oklch(0.96 0.01 106);
--gray-900: oklch(0.15 0.01 106);
--gray-950: oklch(0.08 0.01 106);
```

### Typography Scale

The typography system supports both Chinese and English text with Source Han Sans:

```css
/* Font Families */
--font-source-han-sans: 'Source Han Sans', system-ui, sans-serif;
--font-source-han-serif: 'Source Han Serif', Georgia, serif;
--font-system: system-ui, -apple-system, sans-serif;

/* Typography Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Spacing System

Consistent spacing scale for layout and component spacing:

```css
/* Spacing Scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-24: 6rem;      /* 96px */
```

## Component Styling Patterns

### CSS Modules

Each component has its own CSS module for scoped styling:

```css
/* components/hero-carousel.module.css */
.heroCarousel {
  @apply relative w-full h-screen overflow-hidden;
}

.heroImage {
  @apply w-full h-full object-cover transition-opacity duration-500;
}

.heroContent {
  @apply absolute inset-0 flex items-center justify-center;
  @apply bg-gradient-to-t from-black/50 to-transparent;
}
```

### Utility Classes

Common utility classes for consistent styling:

```css
/* Utility Classes */
.food-gradient-primary {
  @apply bg-gradient-to-br from-orange-50 to-red-50;
  @apply dark:from-orange-900/20 dark:to-red-900/20;
}

.food-gradient-secondary {
  @apply bg-gradient-to-br from-yellow-50 to-orange-50;
  @apply dark:from-yellow-900/20 dark:to-orange-900/20;
}

.text-chinese {
  @apply font-source-han-sans;
  font-feature-settings: 'kern' 1, 'liga' 1;
}

.text-english {
  @apply font-system;
}
```

## Performance Optimization

### Critical CSS

Critical CSS is inlined for above-the-fold content:

```css
/* Critical CSS - Inlined in <head> */
.hero-carousel {
  display: block;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### CSS Purging

Unused CSS is automatically purged in production:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // Purging configuration
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
  },
}
```

### Font Loading Strategy

Fonts are loaded with optimal performance:

```css
/* Font loading with font-display: swap */
@font-face {
  font-family: 'Source Han Sans';
  src: url('/fonts/source_han_sans/SourceHanSansCN-Regular.otf');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}
```

## Responsive Design

### Breakpoints

Mobile-first responsive design with consistent breakpoints:

```css
/* Breakpoints */
/* Mobile: 0px - 767px */
/* Tablet: 768px - 1023px */
/* Desktop: 1024px+ */

@media (min-width: 768px) {
  .hero-content {
    @apply text-4xl;
  }
}

@media (min-width: 1024px) {
  .hero-content {
    @apply text-6xl;
  }
}
```

### Touch Targets

All interactive elements meet accessibility guidelines:

```css
/* Touch targets - minimum 44px */
.touch-target {
  @apply min-h-[44px] min-w-[44px];
}

.button {
  @apply touch-target px-4 py-2;
}
```

## Animation System

### GPU-Accelerated Animations

Animations use GPU acceleration for smooth performance:

```css
/* GPU-accelerated animations */
.smooth-transition {
  @apply transition-transform duration-300 ease-out;
  transform: translateZ(0); /* Force GPU acceleration */
}

.hover-lift {
  @apply smooth-transition hover:scale-105 hover:shadow-lg;
}
```

### Animation Performance

Animations are optimized for performance:

```css
/* Performance-optimized animations */
.fade-in {
  @apply opacity-0 animate-fade-in;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Accessibility

### WCAG 2.1 AA Compliance

All styles meet accessibility standards:

```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .food-gradient-primary {
    @apply bg-orange-100 text-orange-900;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .smooth-transition {
    @apply transition-none;
  }
}
```

### Focus States

Clear focus indicators for keyboard navigation:

```css
/* Focus states */
.focus-visible {
  @apply focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2;
}

.button:focus-visible {
  @apply focus-visible;
}
```

## Maintenance Guidelines

### CSS Organization

1. **Component-specific styles** go in CSS modules
2. **Global styles** go in `globals.css`
3. **Utility classes** are defined in Tailwind config
4. **Design tokens** are defined as CSS variables

### Performance Monitoring

1. **Bundle size** is monitored with webpack-bundle-analyzer
2. **Runtime performance** is tracked with Core Web Vitals
3. **Font loading** is measured with Performance Observer API
4. **Image optimization** is validated with Lighthouse

### Code Quality

1. **CSS linting** with stylelint
2. **Formatting** with Prettier
3. **Type safety** with TypeScript
4. **Testing** with Jest and React Testing Library

## Migration Guide

### From Old CSS to New Architecture

1. **Move component styles** to CSS modules
2. **Replace hardcoded values** with design tokens
3. **Update responsive breakpoints** to use consistent scale
4. **Optimize font loading** with Next.js font optimization
5. **Implement performance monitoring** for ongoing optimization

### Best Practices

1. **Use CSS variables** for design tokens
2. **Leverage Tailwind utilities** for common patterns
3. **Implement CSS modules** for component-specific styles
4. **Monitor performance** continuously
5. **Test accessibility** with automated tools
