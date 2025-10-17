'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LuxuryButton } from './luxury-button';

// Button interaction types
export type ButtonInteractionType = 
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'loading'
  | 'success'
  | 'error';

// Button interaction variants
export const buttonInteractionVariants = {
  hover: {
    scale: 1.05,
    opacity: 0.95,
    boxShadow: '0 10px 25px rgba(184, 134, 11, 0.3)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  focus: {
    scale: 1.02,
    opacity: 1,
    boxShadow: '0 0 0 3px rgba(184, 134, 11, 0.4)',
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  active: {
    scale: 0.98,
    opacity: 0.9,
    transition: {
      duration: 0.1,
      ease: 'easeIn',
    },
  },
  disabled: {
    scale: 1,
    opacity: 0.5,
    cursor: 'not-allowed',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  loading: {
    scale: 1,
    opacity: 0.8,
    cursor: 'wait',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  success: {
    scale: 1.1,
    opacity: 1,
    backgroundColor: '#10B981',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  error: {
    scale: 1.05,
    opacity: 1,
    backgroundColor: '#EF4444',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Luxury button interaction component
interface LuxuryButtonInteractionProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  className?: string;
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function LuxuryButtonInteraction({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  success = false,
  error = false,
  className,
  onClick,
  onHover,
  onFocus,
  onBlur,
}: LuxuryButtonInteractionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((event.clientX - centerX) / (rect.width / 2));
    mouseY.set((event.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  // Get current interaction state
  const getInteractionState = () => {
    if (disabled) return 'disabled';
    if (loading) return 'loading';
    if (success) return 'success';
    if (error) return 'error';
    if (isActive) return 'active';
    if (isFocused) return 'focus';
    if (isHovered) return 'hover';
    return 'default';
  };

  const interactionState = getInteractionState();

  return (
    <motion.div
      className={cn('luxury-button-interaction', className)}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.button
        className={cn(
          'luxury-button',
          `luxury-button-${variant}`,
          `luxury-button-${size}`,
          {
            'luxury-button-disabled': disabled,
            'luxury-button-loading': loading,
            'luxury-button-success': success,
            'luxury-button-error': error,
          }
        )}
        variants={buttonInteractionVariants}
        initial="default"
        animate={interactionState}
        whileHover={!disabled && !loading ? 'hover' : undefined}
        whileFocus={!disabled && !loading ? 'focus' : undefined}
        whileTap={!disabled && !loading ? 'active' : undefined}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={!disabled && !loading ? onClick : undefined}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        disabled={disabled || loading}
      >
        {/* Button content */}
        <motion.div
          className="luxury-button-content"
          style={{
            transform: 'translateZ(50px)',
          }}
        >
          {loading ? (
            <motion.div
              className="luxury-button-loading"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="luxury-button-spinner" />
            </motion.div>
          ) : success ? (
            <motion.div
              className="luxury-button-success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            >
              ✓
            </motion.div>
          ) : error ? (
            <motion.div
              className="luxury-button-error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            >
              ✕
            </motion.div>
          ) : (
            children
          )}
        </motion.div>

        {/* Button glow effect */}
        {isHovered && !disabled && !loading && (
          <motion.div
            className="luxury-button-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          />
        )}

        {/* Button ripple effect */}
        {isActive && !disabled && !loading && (
          <motion.div
            className="luxury-button-ripple"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}

// Luxury button with magnetic effect
interface LuxuryMagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function LuxuryMagneticButton({
  children,
  strength = 0.3,
  className,
  onClick,
}: LuxuryMagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      ref={ref}
      className={cn('luxury-magnetic-button', className)}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// Luxury button with wave effect
interface LuxuryWaveButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LuxuryWaveButton({
  children,
  className,
  onClick,
}: LuxuryWaveButtonProps) {
  const [waves, setWaves] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newWave = {
      id: Date.now(),
      x,
      y,
    };
    
    setWaves(prev => [...prev, newWave]);
    
    // Remove wave after animation
    setTimeout(() => {
      setWaves(prev => prev.filter(wave => wave.id !== newWave.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <motion.button
      className={cn('luxury-wave-button', className)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      
      {/* Wave effects */}
      {waves.map(wave => (
        <motion.div
          key={wave.id}
          className="luxury-wave-effect"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            left: wave.x,
            top: wave.y,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'rgba(184, 134, 11, 0.3)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </motion.button>
  );
}

// Luxury button interaction utilities
export const luxuryButtonInteractionUtils = {
  /**
   * Create button interaction config
   */
  createConfig: (type: ButtonInteractionType, options: any = {}) => ({
    type,
    ...options,
  }),

  /**
   * Get interaction variant
   */
  getVariant: (type: ButtonInteractionType) => {
    return buttonInteractionVariants[type];
  },

  /**
   * Create hover interaction
   */
  createHoverInteraction: () => ({
    whileHover: buttonInteractionVariants.hover,
    whileFocus: buttonInteractionVariants.focus,
    whileTap: buttonInteractionVariants.active,
  }),

  /**
   * Create loading interaction
   */
  createLoadingInteraction: () => ({
    animate: buttonInteractionVariants.loading,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  }),

  /**
   * Create success interaction
   */
  createSuccessInteraction: () => ({
    animate: buttonInteractionVariants.success,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  }),

  /**
   * Create error interaction
   */
  createErrorInteraction: () => ({
    animate: buttonInteractionVariants.error,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

// Export all components and utilities
export default {
  LuxuryButtonInteraction,
  LuxuryMagneticButton,
  LuxuryWaveButton,
  luxuryButtonInteractionUtils,
};
