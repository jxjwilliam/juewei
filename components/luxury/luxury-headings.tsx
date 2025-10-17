'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LuxuryAnimation } from './luxury-animations';
import { luxuryTypographyPresets, luxuryTextEffects } from '@/lib/design-system/luxury-typography-system';

interface LuxuryHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'display' | 'hero' | 'section' | 'subsection' | 'card' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'gradient';
  align?: 'left' | 'center' | 'right';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  decoration?: 'none' | 'underline' | 'line-through';
  effect?: 'none' | 'gradient' | 'shadow' | 'glow' | 'outline';
  animation?: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
}

export function LuxuryHeading({
  children,
  level = 1,
  variant = 'section',
  size,
  weight,
  color = 'primary',
  align = 'left',
  transform = 'none',
  decoration = 'none',
  effect = 'none',
  animation = 'none',
  delay = 0,
  className,
  as,
}: LuxuryHeadingProps) {
  // Get typography preset
  const getPreset = () => {
    switch (variant) {
      case 'display':
        return luxuryTypographyPresets.display;
      case 'hero':
        return luxuryTypographyPresets.heading.h1;
      case 'section':
        return luxuryTypographyPresets.heading.h2;
      case 'subsection':
        return luxuryTypographyPresets.heading.h3;
      case 'card':
        return luxuryTypographyPresets.heading.h4;
      case 'accent':
        return luxuryTypographyPresets.accent;
      default:
        return luxuryTypographyPresets.heading[`h${level}` as keyof typeof luxuryTypographyPresets.heading];
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    if (size) {
      const sizeMap = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
      };
      return sizeMap[size];
    }
    
    // Use preset size if no size specified
    const preset = getPreset();
    return preset.fontSize ? `text-${preset.fontSize.replace('rem', '').replace('.', '')}` : '';
  };

  // Get weight classes
  const getWeightClasses = () => {
    if (weight) {
      const weightMap = {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
      };
      return weightMap[weight];
    }
    
    // Use preset weight if no weight specified
    const preset = getPreset();
    return preset.fontWeight ? `font-${preset.fontWeight}` : '';
  };

  // Get color classes
  const getColorClasses = () => {
    const colorMap = {
      primary: 'text-luxury-text-primary',
      secondary: 'text-luxury-text-secondary',
      tertiary: 'text-luxury-text-tertiary',
      accent: 'text-luxury-accent-copper',
      gradient: luxuryTextEffects.gradient.primary,
    };
    return colorMap[color];
  };

  // Get alignment classes
  const getAlignClasses = () => {
    const alignMap = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };
    return alignMap[align];
  };

  // Get transform classes
  const getTransformClasses = () => {
    const transformMap = {
      none: '',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    };
    return transformMap[transform];
  };

  // Get decoration classes
  const getDecorationClasses = () => {
    const decorationMap = {
      none: '',
      underline: 'underline',
      'line-through': 'line-through',
    };
    return decorationMap[decoration];
  };

  // Get effect classes
  const getEffectClasses = () => {
    const effectMap = {
      none: '',
      gradient: luxuryTextEffects.gradient.primary,
      shadow: luxuryTextEffects.shadow.lg,
      glow: 'luxury-glow-copper',
      outline: 'luxury-text-outline',
    };
    return effectMap[effect];
  };

  // Get animation classes
  const getAnimationClasses = () => {
    const animationMap = {
      none: '',
      fadeIn: luxuryTextEffects.animation.fadeIn,
      slideUp: luxuryTextEffects.animation.slideUp,
      slideDown: luxuryTextEffects.animation.slideDown,
      slideLeft: luxuryTextEffects.animation.slideLeft,
      slideRight: luxuryTextEffects.animation.slideRight,
      scale: luxuryTextEffects.animation.scale,
      bounce: luxuryTextEffects.animation.bounce,
    };
    return animationMap[animation];
  };

  // Generate all classes
  const classes = cn(
    // Base typography
    'luxury-heading',
    getSizeClasses(),
    getWeightClasses(),
    getColorClasses(),
    getAlignClasses(),
    getTransformClasses(),
    getDecorationClasses(),
    getEffectClasses(),
    getAnimationClasses(),
    className
  );

  // Determine the HTML element to use
  const Tag = as || `h${level}` as keyof JSX.IntrinsicElements;

  // Render with animation if specified
  if (animation !== 'none') {
    return (
      <LuxuryAnimation animation={animation} delay={delay}>
        <Tag className={classes}>
          {children}
        </Tag>
      </LuxuryAnimation>
    );
  }

  return (
    <Tag className={classes}>
      {children}
    </Tag>
  );
}

// Luxury heading variants
export const LuxuryHeadingVariants = {
  // Display heading
  Display: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="display" />
  ),
  
  // Hero heading
  Hero: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="hero" />
  ),
  
  // Section heading
  Section: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="section" />
  ),
  
  // Subsection heading
  Subsection: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="subsection" />
  ),
  
  // Card heading
  Card: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="card" />
  ),
  
  // Accent heading
  Accent: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="accent" />
  ),
};

// Luxury heading utilities
export const luxuryHeadingUtils = {
  /**
   * Generate heading classes
   */
  generateClasses: (props: Partial<LuxuryHeadingProps>): string => {
    const classes = ['luxury-heading'];
    
    if (props.size) {
      const sizeMap = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
      };
      classes.push(sizeMap[props.size]);
    }
    
    if (props.weight) {
      const weightMap = {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
      };
      classes.push(weightMap[props.weight]);
    }
    
    if (props.color) {
      const colorMap = {
        primary: 'text-luxury-text-primary',
        secondary: 'text-luxury-text-secondary',
        tertiary: 'text-luxury-text-tertiary',
        accent: 'text-luxury-accent-copper',
        gradient: luxuryTextEffects.gradient.primary,
      };
      classes.push(colorMap[props.color]);
    }
    
    if (props.align) {
      const alignMap = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      };
      classes.push(alignMap[props.align]);
    }
    
    if (props.transform) {
      const transformMap = {
        none: '',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      };
      classes.push(transformMap[props.transform]);
    }
    
    if (props.decoration) {
      const decorationMap = {
        none: '',
        underline: 'underline',
        'line-through': 'line-through',
      };
      classes.push(decorationMap[props.decoration]);
    }
    
    if (props.effect) {
      const effectMap = {
        none: '',
        gradient: luxuryTextEffects.gradient.primary,
        shadow: luxuryTextEffects.shadow.lg,
        glow: 'luxury-glow-copper',
        outline: 'luxury-text-outline',
      };
      classes.push(effectMap[props.effect]);
    }
    
    return classes.join(' ');
  },

  /**
   * Get heading preset
   */
  getPreset: (variant: LuxuryHeadingProps['variant']) => {
    switch (variant) {
      case 'display':
        return luxuryTypographyPresets.display;
      case 'hero':
        return luxuryTypographyPresets.heading.h1;
      case 'section':
        return luxuryTypographyPresets.heading.h2;
      case 'subsection':
        return luxuryTypographyPresets.heading.h3;
      case 'card':
        return luxuryTypographyPresets.heading.h4;
      case 'accent':
        return luxuryTypographyPresets.accent;
      default:
        return luxuryTypographyPresets.heading.h1;
    }
  },

  /**
   * Check heading accessibility
   */
  isAccessible: (headingColor: string, backgroundColor: string): boolean => {
    // This would integrate with the color accessibility system
    return true; // Placeholder
  },
};

export default LuxuryHeading;
