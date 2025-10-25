'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { luxuryAnimationUtils } from '@/lib/design-system/luxury-animations';

// Luxury animation wrapper component
interface LuxuryAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'stagger';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function LuxuryAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration,
  className,
  once = true,
  threshold = 0.1,
}: LuxuryAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    slideDown: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
    },
    stagger: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  };

  const animationConfig = animations[animation] || animations.fadeIn;
  const animationProps = luxuryAnimationUtils.generateFramerMotionProps(animation, 'default');

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? false : animationConfig.initial}
      animate={isInView ? animationConfig.animate : animationConfig.initial}
      transition={{
        duration: duration || animationProps.transition.duration,
        delay: delay,
        ease: (animationProps.transition.ease as any) || 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Luxury stagger animation for lists
interface LuxuryStaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function LuxuryStagger({
  children,
  staggerDelay = 0.1,
  className,
}: LuxuryStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}

// Luxury stagger item
interface LuxuryStaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function LuxuryStaggerItem({
  children,
  className,
}: LuxuryStaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Luxury parallax component
interface LuxuryParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function LuxuryParallax({
  children,
  speed = 0.5,
  className,
}: LuxuryParallaxProps) {
  const [offset, setOffset] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, shouldReduceMotion]);

  return (
    <motion.div
      className={className}
      style={{
        transform: shouldReduceMotion ? 'none' : `translateY(${offset}px)`,
      }}
    >
      {children}
    </motion.div>
  );
}

// Luxury hover animation
interface LuxuryHoverProps {
  children: React.ReactNode;
  scale?: number;
  rotate?: number;
  className?: string;
}

export function LuxuryHover({
  children,
  scale = 1.05,
  rotate = 0,
  className,
}: LuxuryHoverProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={shouldReduceMotion ? {} : {
        scale,
        rotate,
        transition: { duration: 0.3, ease: 'easeInOut' }
      }}
      whileTap={shouldReduceMotion ? {} : {
        scale: 0.95,
        transition: { duration: 0.1, ease: 'easeInOut' }
      }}
    >
      {children}
    </motion.div>
  );
}

// Luxury loading animation
interface LuxuryLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LuxuryLoading({
  size = 'md',
  color = 'var(--luxury-accent-copper)',
  className,
}: LuxuryLoadingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <motion.div
      className={cn('flex items-center justify-center', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        className={cn(
          'border-2 border-transparent border-t-current rounded-full',
          sizes[size]
        )}
        style={{ color }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}

// Luxury progress animation
interface LuxuryProgressProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export function LuxuryProgress({
  progress,
  className,
  showPercentage = false,
}: LuxuryProgressProps) {
  return (
    <motion.div
      className={cn('relative w-full bg-luxury-background-secondary rounded-full overflow-hidden', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      {showPercentage && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center luxury-text text-luxury-text-primary font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
        >
          {progress}%
        </motion.span>
      )}
    </motion.div>
  );
}

// Luxury counter animation
interface LuxuryCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function LuxuryCounter({
  value,
  duration = 2,
  className,
  prefix = '',
  suffix = '',
}: LuxuryCounterProps) {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (value - startValue) * easeOutCubic);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration, shouldReduceMotion]);

  return (
    <motion.span
      className={cn('luxury-text text-luxury-text-primary font-semibold', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}

// Luxury typing animation
interface LuxuryTypingProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function LuxuryTyping({
  text,
  speed = 50,
  className,
  onComplete,
}: LuxuryTypingProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      onComplete?.();
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, shouldReduceMotion]);

  return (
    <motion.span
      className={cn('luxury-text text-luxury-text-primary', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-luxury-accent-copper ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.span>
  );
}

// Utility function for conditional animations
export function useLuxuryAnimation() {
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);

  return {
    shouldReduceMotion,
    isInView,
    setIsInView,
    getAnimationProps: (animation: string, variant: 'default' | 'mobile' | 'reducedMotion' | 'highPerformance' = 'default') => {
      if (shouldReduceMotion) {
        return {
          initial: false,
          animate: false,
          transition: { duration: 0 }
        };
      }
      return luxuryAnimationUtils.generateFramerMotionProps(animation, variant);
    }
  };
}

export default LuxuryAnimation;
