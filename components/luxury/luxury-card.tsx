'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { luxuryAnimationUtils } from '@/lib/design-system/luxury-animations';

interface LuxuryCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export function LuxuryCard({
  children,
  variant = 'default',
  size = 'md',
  hover = true,
  className,
  onClick,
}: LuxuryCardProps) {
  const variants = {
    default: 'bg-luxury-background-secondary border border-luxury-accent-copper/20',
    elevated: 'bg-luxury-background-secondary border border-luxury-accent-copper/30 shadow-luxury-lg',
    glass: 'luxury-glass backdrop-blur-xl',
    minimal: 'bg-transparent border border-luxury-accent-copper/10',
  };

  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const animationProps = luxuryAnimationUtils.generateFramerMotionProps('hover', 'default');

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        // Base styles
        'relative overflow-hidden rounded-luxury-lg transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper focus:ring-offset-2',
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Luxury hover effects
        hover && 'luxury-hover cursor-pointer',
        
        className
      )}
      whileHover={hover ? {
        y: -4,
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: { duration: 0.3, ease: 'easeInOut' }
      } : {}}
      whileTap={hover ? {
        scale: 0.98,
        transition: { duration: 0.1, ease: 'easeInOut' }
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Luxury shine effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-accent-copper/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Luxury card header component
export function LuxuryCardHeader({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      className={cn(
        'mb-4 pb-4 border-b border-luxury-accent-copper/20',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Luxury card title component
export function LuxuryCardTitle({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.h3
      className={cn(
        'luxury-heading text-xl font-semibold text-luxury-text-primary',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
    >
      {children}
    </motion.h3>
  );
}

// Luxury card description component
export function LuxuryCardDescription({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.p
      className={cn(
        'luxury-text-secondary text-sm leading-relaxed',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
    >
      {children}
    </motion.p>
  );
}

// Luxury card content component
export function LuxuryCardContent({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      className={cn(
        'space-y-4',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Luxury card footer component
export function LuxuryCardFooter({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      className={cn(
        'mt-4 pt-4 border-t border-luxury-accent-copper/20',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// Luxury card variants for different use cases
export const LuxuryCardVariants = {
  // Default luxury card
  Default: (props: Omit<LuxuryCardProps, 'variant'>) => (
    <LuxuryCard {...props} variant="default" />
  ),
  
  // Elevated luxury card with shadow
  Elevated: (props: Omit<LuxuryCardProps, 'variant'>) => (
    <LuxuryCard {...props} variant="elevated" />
  ),
  
  // Glass luxury card with backdrop blur
  Glass: (props: Omit<LuxuryCardProps, 'variant'>) => (
    <LuxuryCard {...props} variant="glass" />
  ),
  
  // Minimal luxury card
  Minimal: (props: Omit<LuxuryCardProps, 'variant'>) => (
    <LuxuryCard {...props} variant="minimal" />
  ),
};

// Luxury card group for multiple cards
export function LuxuryCardGroup({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default LuxuryCard;
