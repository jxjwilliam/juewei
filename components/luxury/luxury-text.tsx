'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LuxuryAnimation } from './luxury-animations';
import { luxuryTypographyPresets, luxuryTextEffects } from '@/lib/design-system/luxury-typography-system';

interface LuxuryTextProps {
  children: React.ReactNode;
  variant?: 'body' | 'lead' | 'caption' | 'accent' | 'display';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'muted';
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  decoration?: 'none' | 'underline' | 'line-through';
  effect?: 'none' | 'gradient' | 'shadow' | 'glow';
  animation?: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
  delay?: number;
  className?: string;
}

export function LuxuryText({
  children,
  variant = 'body',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  transform = 'none',
  decoration = 'none',
  effect = 'none',
  animation = 'none',
  delay = 0,
  className,
}: LuxuryTextProps) {
  // Get typography preset
  const getPreset = () => {
    switch (variant) {
      case 'display':
        return luxuryTypographyPresets.display;
      case 'lead':
        return luxuryTypographyPresets.body.large;
      case 'caption':
        return luxuryTypographyPresets.caption;
      case 'accent':
        return luxuryTypographyPresets.accent;
      default:
        return luxuryTypographyPresets.body.base;
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    const sizeMap = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };
    return sizeMap[size];
  };

  // Get weight classes
  const getWeightClasses = () => {
    const weightMap = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };
    return weightMap[weight];
  };

  // Get color classes
  const getColorClasses = () => {
    const colorMap = {
      primary: 'text-luxury-text-primary',
      secondary: 'text-luxury-text-secondary',
      tertiary: 'text-luxury-text-tertiary',
      accent: 'text-luxury-accent-copper',
      muted: 'text-luxury-text-secondary/70',
    };
    return colorMap[color];
  };

  // Get alignment classes
  const getAlignClasses = () => {
    const alignMap = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
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
      shadow: luxuryTextEffects.shadow.md,
      glow: 'luxury-glow-copper',
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
    'luxury-text',
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

  // Render with animation if specified
  if (animation !== 'none') {
    return (
      <LuxuryAnimation animation={animation} delay={delay}>
        <span className={classes}>
          {children}
        </span>
      </LuxuryAnimation>
    );
  }

  return (
    <span className={classes}>
      {children}
    </span>
  );
}

// Luxury text variants
export const LuxuryTextVariants = {
  // Body text
  Body: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="body" />
  ),
  
  // Lead text
  Lead: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="lead" />
  ),
  
  // Caption text
  Caption: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="caption" />
  ),
  
  // Accent text
  Accent: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="accent" />
  ),
  
  // Display text
  Display: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="display" />
  ),
};

// Luxury text utilities
export const luxuryTextUtils = {
  /**
   * Generate text classes
   */
  generateClasses: (props: Partial<LuxuryTextProps>): string => {
    const classes = ['luxury-text'];
    
    if (props.size) {
      const sizeMap = {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
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
      };
      classes.push(weightMap[props.weight]);
    }
    
    if (props.color) {
      const colorMap = {
        primary: 'text-luxury-text-primary',
        secondary: 'text-luxury-text-secondary',
        tertiary: 'text-luxury-text-tertiary',
        accent: 'text-luxury-accent-copper',
        muted: 'text-luxury-text-secondary/70',
      };
      classes.push(colorMap[props.color]);
    }
    
    if (props.align) {
      const alignMap = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
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
        shadow: luxuryTextEffects.shadow.md,
        glow: 'luxury-glow-copper',
      };
      classes.push(effectMap[props.effect]);
    }
    
    return classes.join(' ');
  },

  /**
   * Get text preset
   */
  getPreset: (variant: LuxuryTextProps['variant']) => {
    switch (variant) {
      case 'display':
        return luxuryTypographyPresets.display;
      case 'lead':
        return luxuryTypographyPresets.body.large;
      case 'caption':
        return luxuryTypographyPresets.caption;
      case 'accent':
        return luxuryTypographyPresets.accent;
      default:
        return luxuryTypographyPresets.body.base;
    }
  },

  /**
   * Check text accessibility
   */
  isAccessible: (textColor: string, backgroundColor: string): boolean => {
    // This would integrate with the color accessibility system
    return true; // Placeholder
  },
};

export default LuxuryText;
