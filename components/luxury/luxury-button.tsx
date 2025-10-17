'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { luxuryAnimationUtils } from '@/lib/design-system/luxury-animations';

interface LuxuryButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function LuxuryButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  onClick,
  type = 'button',
}: LuxuryButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-luxury-copper to-luxury-gold text-white hover:from-luxury-gold hover:to-luxury-copper',
    secondary: 'bg-luxury-background-secondary text-luxury-text-primary border border-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white',
    accent: 'bg-luxury-spice text-white hover:bg-red-600',
    ghost: 'text-luxury-text-primary hover:bg-luxury-background-secondary',
    outline: 'border-2 border-luxury-accent-copper text-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const animationProps = luxuryAnimationUtils.generateFramerMotionProps('hover', 'default');

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        // Base styles
        'relative overflow-hidden rounded-luxury font-luxury-body font-semibold transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Luxury hover effects
        'luxury-hover',
        
        className
      )}
      whileHover={!disabled && !loading ? {
        y: -2,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeInOut' }
      } : {}}
      whileTap={!disabled && !loading ? {
        scale: 0.98,
        transition: { duration: 0.1, ease: 'easeInOut' }
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
      
      {/* Button content */}
      <motion.span
        className={cn(
          'flex items-center justify-center gap-2',
          loading && 'opacity-0'
        )}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
      
      {/* Luxury shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.button>
  );
}

// Luxury button variants for different use cases
export const LuxuryButtonVariants = {
  // Primary luxury button for main CTAs
  Primary: (props: Omit<LuxuryButtonProps, 'variant'>) => (
    <LuxuryButton {...props} variant="primary" />
  ),
  
  // Secondary luxury button for secondary actions
  Secondary: (props: Omit<LuxuryButtonProps, 'variant'>) => (
    <LuxuryButton {...props} variant="secondary" />
  ),
  
  // Accent luxury button for special actions
  Accent: (props: Omit<LuxuryButtonProps, 'variant'>) => (
    <LuxuryButton {...props} variant="accent" />
  ),
  
  // Ghost luxury button for subtle actions
  Ghost: (props: Omit<LuxuryButtonProps, 'variant'>) => (
    <LuxuryButton {...props} variant="ghost" />
  ),
  
  // Outline luxury button for alternative actions
  Outline: (props: Omit<LuxuryButtonProps, 'variant'>) => (
    <LuxuryButton {...props} variant="outline" />
  ),
};

// Luxury button group for multiple buttons
export function LuxuryButtonGroup({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      className={cn(
        'flex flex-wrap gap-4',
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

export default LuxuryButton;
