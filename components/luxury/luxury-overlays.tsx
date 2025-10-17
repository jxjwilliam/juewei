'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LuxuryAnimation } from './luxury-animations';
import { LuxuryCard } from './luxury-card';
import { Star, Award, Shield, Heart, Share2, Download, Eye, Zoom } from 'lucide-react';

interface LuxuryOverlayProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'minimal' | 'elevated';
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'full';
  opacity?: 'light' | 'medium' | 'dark';
  className?: string;
}

export function LuxuryOverlay({
  children,
  variant = 'default',
  position = 'full',
  opacity = 'medium',
  className,
}: LuxuryOverlayProps) {
  const variants = {
    default: 'bg-luxury-background-primary/50',
    glass: 'luxury-bg-glass',
    gradient: 'bg-gradient-to-br from-luxury-background-primary/60 via-luxury-background-secondary/40 to-luxury-background-primary/60',
    minimal: 'bg-luxury-background-primary/20',
    elevated: 'bg-luxury-background-secondary/80',
  };

  const positions = {
    top: 'absolute top-0 left-0 right-0',
    bottom: 'absolute bottom-0 left-0 right-0',
    left: 'absolute top-0 left-0 bottom-0',
    right: 'absolute top-0 right-0 bottom-0',
    center: 'absolute inset-0 flex items-center justify-center',
    full: 'absolute inset-0',
  };

  const opacities = {
    light: 'opacity-30',
    medium: 'opacity-60',
    dark: 'opacity-90',
  };

  return (
    <motion.div
      className={cn(
        variants[variant],
        positions[position],
        opacities[opacity],
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Luxury text overlay
interface LuxuryTextOverlayProps {
  title?: string;
  subtitle?: string;
  description?: string;
  position?: 'top' | 'bottom' | 'center';
  alignment?: 'left' | 'center' | 'right';
  variant?: 'default' | 'glass' | 'gradient' | 'minimal';
  className?: string;
}

export function LuxuryTextOverlay({
  title,
  subtitle,
  description,
  position = 'bottom',
  alignment = 'left',
  variant = 'default',
  className,
}: LuxuryTextOverlayProps) {
  const positions = {
    top: 'absolute top-0 left-0 right-0',
    bottom: 'absolute bottom-0 left-0 right-0',
    center: 'absolute inset-0 flex items-center justify-center',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const variants = {
    default: 'bg-gradient-to-t from-luxury-background-primary/90 to-transparent',
    glass: 'luxury-bg-glass',
    gradient: 'bg-gradient-to-br from-luxury-background-primary/80 via-luxury-background-secondary/60 to-luxury-background-primary/80',
    minimal: 'bg-luxury-background-primary/40',
  };

  return (
    <LuxuryOverlay
      variant={variant}
      position={position}
      className={cn(alignments[alignment], className)}
    >
      <div className="p-6">
        {subtitle && (
          <LuxuryAnimation animation="slideUp" delay={0.2}>
            <p className="luxury-text text-sm font-semibold text-luxury-accent-copper uppercase tracking-wider mb-2">
              {subtitle}
            </p>
          </LuxuryAnimation>
        )}

        {title && (
          <LuxuryAnimation animation="slideUp" delay={0.4}>
            <h3 className="luxury-heading text-2xl font-bold text-luxury-text-primary mb-2">
              {title}
            </h3>
          </LuxuryAnimation>
        )}

        {description && (
          <LuxuryAnimation animation="slideUp" delay={0.6}>
            <p className="luxury-text text-sm text-luxury-text-secondary leading-relaxed">
              {description}
            </p>
          </LuxuryAnimation>
        )}
      </div>
    </LuxuryOverlay>
  );
}

// Luxury action overlay
interface LuxuryActionOverlayProps {
  actions: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    variant?: 'default' | 'primary' | 'secondary' | 'accent';
  }>;
  position?: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  variant?: 'default' | 'glass' | 'minimal';
  className?: string;
}

export function LuxuryActionOverlay({
  actions,
  position = 'center',
  variant = 'default',
  className,
}: LuxuryActionOverlayProps) {
  const positions = {
    center: 'absolute inset-0 flex items-center justify-center',
    'top-right': 'absolute top-4 right-4',
    'top-left': 'absolute top-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
  };

  const variants = {
    default: 'bg-luxury-background-secondary/90 backdrop-blur-sm',
    glass: 'luxury-bg-glass',
    minimal: 'bg-luxury-background-primary/20',
  };

  return (
    <LuxuryOverlay
      variant={variant}
      position={position}
      className={className}
    >
      <div className={cn(
        'flex gap-2 p-2 rounded-luxury',
        variants[variant]
      )}>
        {actions.map((action, index) => (
          <LuxuryAnimation
            key={index}
            animation="slideUp"
            delay={index * 0.1}
          >
            <motion.button
              onClick={action.onClick}
              className={cn(
                'p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper/50',
                action.variant === 'primary' && 'bg-luxury-accent-copper text-white hover:bg-luxury-accent-gold',
                action.variant === 'secondary' && 'bg-luxury-background-secondary text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white',
                action.variant === 'accent' && 'bg-luxury-spice text-white hover:bg-red-600',
                action.variant === 'default' && 'bg-luxury-background-secondary/90 text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={action.label}
            >
              {action.icon}
            </motion.button>
          </LuxuryAnimation>
        ))}
      </div>
    </LuxuryOverlay>
  );
}

// Luxury badge overlay
interface LuxuryBadgeOverlayProps {
  badges: Array<{
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
    icon?: React.ReactNode;
  }>;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function LuxuryBadgeOverlay({
  badges,
  position = 'top-left',
  className,
}: LuxuryBadgeOverlayProps) {
  const positions = {
    'top-left': 'absolute top-4 left-4',
    'top-right': 'absolute top-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
  };

  const badgeVariants = {
    default: 'bg-luxury-background-secondary text-luxury-text-primary',
    primary: 'bg-luxury-accent-copper text-white',
    secondary: 'bg-luxury-background-primary text-luxury-text-primary',
    accent: 'bg-luxury-spice text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  return (
    <div className={cn(positions[position], 'flex flex-wrap gap-2', className)}>
      {badges.map((badge, index) => (
        <LuxuryAnimation
          key={index}
          animation="slideUp"
          delay={index * 0.1}
        >
          <LuxuryCard
            variant="glass"
            className={cn(
              'px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1',
              badgeVariants[badge.variant || 'default']
            )}
          >
            {badge.icon && <span className="w-3 h-3">{badge.icon}</span>}
            {badge.text}
          </LuxuryCard>
        </LuxuryAnimation>
      ))}
    </div>
  );
}

// Luxury rating overlay
interface LuxuryRatingOverlayProps {
  rating: number;
  maxRating?: number;
  showText?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  variant?: 'default' | 'glass' | 'minimal';
  className?: string;
}

export function LuxuryRatingOverlay({
  rating,
  maxRating = 5,
  showText = true,
  position = 'top-right',
  variant = 'default',
  className,
}: LuxuryRatingOverlayProps) {
  const positions = {
    'top-right': 'absolute top-4 right-4',
    'top-left': 'absolute top-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
  };

  const variants = {
    default: 'bg-luxury-background-secondary/90 backdrop-blur-sm',
    glass: 'luxury-bg-glass',
    minimal: 'bg-luxury-background-primary/20',
  };

  return (
    <LuxuryAnimation animation="slideUp" delay={0.2}>
      <LuxuryCard
        variant={variant === 'glass' ? 'glass' : 'default'}
        className={cn(
          positions[position],
          'p-2 rounded-luxury flex items-center gap-1',
          variants[variant],
          className
        )}
      >
        <div className="flex items-center gap-1">
          {[...Array(maxRating)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < rating
                  ? 'text-luxury-accent-gold fill-current'
                  : 'text-luxury-text-secondary'
              )}
            />
          ))}
        </div>
        {showText && (
          <span className="luxury-text text-sm font-semibold text-luxury-text-primary ml-1">
            {rating}
          </span>
        )}
      </LuxuryCard>
    </LuxuryAnimation>
  );
}

// Luxury progress overlay
interface LuxuryProgressOverlayProps {
  progress: number;
  label?: string;
  position?: 'top' | 'bottom';
  variant?: 'default' | 'glass' | 'minimal';
  className?: string;
}

export function LuxuryProgressOverlay({
  progress,
  label,
  position = 'bottom',
  variant = 'default',
  className,
}: LuxuryProgressOverlayProps) {
  const positions = {
    top: 'absolute top-0 left-0 right-0',
    bottom: 'absolute bottom-0 left-0 right-0',
  };

  const variants = {
    default: 'bg-luxury-background-secondary/90 backdrop-blur-sm',
    glass: 'luxury-bg-glass',
    minimal: 'bg-luxury-background-primary/20',
  };

  return (
    <LuxuryAnimation animation="slideUp" delay={0.2}>
      <div className={cn(positions[position], 'p-4', className)}>
        <LuxuryCard
          variant={variant === 'glass' ? 'glass' : 'default'}
          className={cn('p-3', variants[variant])}
        >
          {label && (
            <p className="luxury-text text-sm font-semibold text-luxury-text-primary mb-2">
              {label}
            </p>
          )}
          <div className="w-full bg-luxury-background-primary/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </LuxuryCard>
      </div>
    </LuxuryAnimation>
  );
}

// Luxury overlay variants
export const LuxuryOverlayVariants = {
  // Default luxury overlay
  Default: (props: Omit<LuxuryOverlayProps, 'variant'>) => (
    <LuxuryOverlay {...props} variant="default" />
  ),
  
  // Glass luxury overlay
  Glass: (props: Omit<LuxuryOverlayProps, 'variant'>) => (
    <LuxuryOverlay {...props} variant="glass" />
  ),
  
  // Gradient luxury overlay
  Gradient: (props: Omit<LuxuryOverlayProps, 'variant'>) => (
    <LuxuryOverlay {...props} variant="gradient" />
  ),
  
  // Minimal luxury overlay
  Minimal: (props: Omit<LuxuryOverlayProps, 'variant'>) => (
    <LuxuryOverlay {...props} variant="minimal" />
  ),
  
  // Elevated luxury overlay
  Elevated: (props: Omit<LuxuryOverlayProps, 'variant'>) => (
    <LuxuryOverlay {...props} variant="elevated" />
  ),
};

export default LuxuryOverlay;
