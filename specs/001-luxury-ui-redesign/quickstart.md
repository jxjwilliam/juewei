# Quickstart Guide: Luxury UI Redesign

**Feature**: 001-luxury-ui-redesign  
**Date**: 2024-12-19  
**Purpose**: Quick implementation guide for luxury design system

## Prerequisites

- Next.js 15.5.4+ with App Router
- TypeScript 5+
- Tailwind CSS 4.x
- React 19.1.0+
- Framer Motion (for animations)

## Installation

### 1. Install Dependencies

```bash
npm install framer-motion
npm install @next/font
```

### 2. Install Luxury Fonts

```bash
# Add to package.json or install via Google Fonts
npm install @next/font
```

## Quick Setup

### 1. Configure Luxury Color Palette

Create `lib/design-system/luxury-colors.ts`:

```typescript
export const luxuryColors = {
  primary: {
    background: '#1A1A1A',
    secondary: '#2A2A2A',
  },
  accent: {
    copper: '#B8860B',
    gold: '#D4AF37',
    spice: '#D43D2A',
  },
  text: {
    primary: '#F5F5F5',
    secondary: '#CCCCCC',
    accent: '#B8860B',
  },
} as const;
```

### 2. Configure Luxury Typography

Create `lib/design-system/luxury-typography.ts`:

```typescript
import { Playfair_Display, Inter } from 'next/font/google';

export const luxuryFonts = {
  heading: Playfair_Display({
    subsets: ['latin'],
    variable: '--font-luxury-heading',
    display: 'swap',
  }),
  body: Inter({
    subsets: ['latin'],
    variable: '--font-luxury-body',
    display: 'swap',
  }),
};

export const luxuryTypography = {
  heading: {
    fontFamily: 'var(--font-luxury-heading)',
    fontWeight: '400',
  },
  body: {
    fontFamily: 'var(--font-luxury-body)',
    fontWeight: '400',
  },
} as const;
```

### 3. Configure Luxury Animations

Create `lib/design-system/luxury-animations.ts`:

```typescript
export const luxuryAnimations = {
  hover: {
    duration: 0.3,
    ease: 'ease-in-out',
    transform: 'translateY(-2px)',
  },
  fadeIn: {
    duration: 0.8,
    ease: 'ease-out',
    opacity: [0, 1],
  },
  slideUp: {
    duration: 0.6,
    ease: 'ease-out',
    y: [30, 0],
    opacity: [0, 1],
  },
} as const;
```

### 4. Update Tailwind Configuration

Update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        luxury: {
          background: '#1A1A1A',
          secondary: '#2A2A2A',
          copper: '#B8860B',
          gold: '#D4AF37',
          spice: '#D43D2A',
        },
        text: {
          luxury: '#F5F5F5',
          secondary: '#CCCCCC',
          accent: '#B8860B',
        },
      },
      fontFamily: {
        'luxury-heading': ['var(--font-luxury-heading)', 'serif'],
        'luxury-body': ['var(--font-luxury-body)', 'sans-serif'],
      },
    },
  },
};
```

### 5. Create Luxury Components

Create `components/luxury/luxury-button.tsx`:

```typescript
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LuxuryButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function LuxuryButton({ 
  children, 
  variant = 'primary', 
  className 
}: LuxuryButtonProps) {
  const variants = {
    primary: 'bg-luxury-copper hover:bg-luxury-gold text-white',
    secondary: 'bg-luxury-background border border-luxury-copper text-luxury-copper',
    accent: 'bg-luxury-spice hover:bg-red-600 text-white',
  };

  return (
    <motion.button
      className={cn(
        'px-6 py-3 rounded-lg font-luxury-body font-semibold transition-all duration-300',
        variants[variant],
        className
      )}
      whileHover={{ 
        y: -2,
        scale: 1.02,
      }}
      whileTap={{ 
        scale: 0.98,
      }}
    >
      {children}
    </motion.button>
  );
}
```

### 6. Create Luxury Card Component

Create `components/luxury/luxury-card.tsx`:

```typescript
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LuxuryCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function LuxuryCard({ 
  children, 
  className,
  hover = true 
}: LuxuryCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-luxury-secondary border border-luxury-copper/20 rounded-xl p-6',
        'backdrop-blur-sm shadow-lg',
        className
      )}
      whileHover={hover ? {
        y: -4,
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      } : {}}
      transition={{ duration: 0.3, ease: 'ease-in-out' }}
    >
      {children}
    </motion.div>
  );
}
```

### 7. Update Global Styles

Update `app/globals.css`:

```css
@import 'tailwindcss';

:root {
  --luxury-background: #1A1A1A;
  --luxury-secondary: #2A2A2A;
  --luxury-copper: #B8860B;
  --luxury-gold: #D4AF37;
  --luxury-spice: #D43D2A;
  --luxury-text: #F5F5F5;
  --luxury-text-secondary: #CCCCCC;
  --luxury-text-accent: #B8860B;
}

body {
  background-color: var(--luxury-background);
  color: var(--luxury-text);
  font-family: var(--font-luxury-body);
}

.luxury-heading {
  font-family: var(--font-luxury-heading);
  color: var(--luxury-text);
}

.luxury-text {
  color: var(--luxury-text);
  font-family: var(--font-luxury-body);
}
```

## Usage Examples

### 1. Luxury Hero Section

```typescript
import { LuxuryButton } from '@/components/luxury/luxury-button';
import { LuxuryCard } from '@/components/luxury/luxury-card';

export function LuxuryHero() {
  return (
    <section className="min-h-screen bg-luxury-background flex items-center justify-center">
      <LuxuryCard className="text-center max-w-4xl">
        <h1 className="luxury-heading text-6xl font-bold mb-6">
          Premium Food Experience
        </h1>
        <p className="luxury-text text-xl mb-8">
          Discover the finest culinary delights with our luxury brand
        </p>
        <LuxuryButton variant="primary" className="text-lg px-8 py-4">
          Explore Collection
        </LuxuryButton>
      </LuxuryCard>
    </section>
  );
}
```

### 2. Luxury Product Grid

```typescript
import { LuxuryCard } from '@/components/luxury/luxury-card';

export function LuxuryProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <LuxuryCard key={product.id} className="group">
          <div className="aspect-square bg-luxury-secondary rounded-lg mb-4 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="luxury-heading text-xl font-semibold mb-2">
            {product.name}
          </h3>
          <p className="luxury-text text-luxury-text-secondary mb-4">
            {product.description}
          </p>
          <LuxuryButton variant="accent" className="w-full">
            Add to Cart
          </LuxuryButton>
        </LuxuryCard>
      ))}
    </div>
  );
}
```

## Accessibility Features

### 1. High Contrast Mode

```typescript
// Add to your component
const [highContrast, setHighContrast] = useState(false);

const contrastClasses = highContrast 
  ? 'bg-black text-white border-white' 
  : 'bg-luxury-background text-luxury-text border-luxury-copper';
```

### 2. Reduced Motion Support

```typescript
import { useReducedMotion } from 'framer-motion';

export function LuxuryComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Content
    </motion.div>
  );
}
```

## Performance Optimization

### 1. Font Loading

```typescript
// In your layout.tsx
import { luxuryFonts } from '@/lib/design-system/luxury-typography';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${luxuryFonts.heading.variable} ${luxuryFonts.body.variable}`}>
      <body className="font-luxury-body">
        {children}
      </body>
    </html>
  );
}
```

### 2. Image Optimization

```typescript
import Image from 'next/image';

export function LuxuryImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      priority
      quality={90}
      className="object-cover transition-transform duration-300 hover:scale-105"
      {...props}
    />
  );
}
```

## Testing

### 1. Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { LuxuryButton } from '@/components/luxury/luxury-button';

test('renders luxury button with correct styling', () => {
  render(<LuxuryButton>Test Button</LuxuryButton>);
  
  const button = screen.getByRole('button');
  expect(button).toHaveClass('bg-luxury-copper');
  expect(button).toHaveClass('font-luxury-body');
});
```

### 2. Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

test('luxury component meets accessibility standards', async () => {
  const { container } = render(<LuxuryComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Next Steps

1. **Implement Core Components**: Create luxury variants for all existing components
2. **Add Animations**: Implement luxury animations with Framer Motion
3. **Optimize Performance**: Add performance monitoring and graceful degradation
4. **Test Accessibility**: Ensure WCAG 2.1 AA compliance
5. **Mobile Optimization**: Adapt luxury design for mobile devices

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
