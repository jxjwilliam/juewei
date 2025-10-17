'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Scroll animation types
export type ScrollAnimationType = 
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'rotate'
  | 'parallax'
  | 'stagger';

// Scroll animation variants
export const scrollAnimationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 },
  },
  parallax: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Scroll animation configuration
export interface ScrollAnimationConfig {
  type: ScrollAnimationType;
  delay?: number;
  duration?: number;
  ease?: string;
  threshold?: number;
  once?: boolean;
  amount?: number;
  stagger?: number;
  parallax?: {
    speed: number;
    direction: 'up' | 'down' | 'left' | 'right';
  };
}

// Luxury scroll animation component
interface LuxuryScrollAnimationProps {
  children: React.ReactNode;
  config: ScrollAnimationConfig;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function LuxuryScrollAnimation({
  children,
  config,
  className,
  as: Component = 'div',
}: LuxuryScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: config.once ?? true,
    amount: config.amount ?? 0.3,
    margin: '0px 0px -100px 0px',
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax transform
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    config.parallax?.direction === 'up' 
      ? [config.parallax.speed * 100, -config.parallax.speed * 100]
      : config.parallax?.direction === 'down'
      ? [-config.parallax.speed * 100, config.parallax.speed * 100]
      : [0, 0]
  );

  const parallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    config.parallax?.direction === 'left'
      ? [config.parallax.speed * 100, -config.parallax.speed * 100]
      : config.parallax?.direction === 'right'
      ? [-config.parallax.speed * 100, config.parallax.speed * 100]
      : [0, 0]
  );

  // Get animation variant
  const getAnimationVariant = () => {
    const baseVariant = scrollAnimationVariants[config.type];
    
    if (config.type === 'parallax' && config.parallax) {
      return {
        ...baseVariant,
        visible: {
          ...baseVariant.visible,
          y: parallaxY,
          x: parallaxX,
        },
      };
    }
    
    return baseVariant;
  };

  // Get transition configuration
  const getTransition = () => ({
    duration: config.duration ?? 0.6,
    ease: config.ease ?? 'easeOut',
    delay: config.delay ?? 0,
  });

  return (
    <motion.div
      ref={ref}
      as={Component}
      className={cn('luxury-scroll-animation', className)}
      variants={getAnimationVariant()}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={getTransition()}
    >
      {children}
    </motion.div>
  );
}

// Luxury scroll animation with stagger
interface LuxuryScrollStaggerProps {
  children: React.ReactNode[];
  config: Omit<ScrollAnimationConfig, 'type'>;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function LuxuryScrollStagger({
  children,
  config,
  className,
  as: Component = 'div',
}: LuxuryScrollStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: config.once ?? true,
    amount: config.amount ?? 0.3,
  });

  return (
    <motion.div
      ref={ref}
      as={Component}
      className={cn('luxury-scroll-stagger', className)}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: config.stagger ?? 0.1,
            delayChildren: config.delay ?? 0,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={scrollAnimationVariants.fadeIn}
          transition={{
            duration: config.duration ?? 0.6,
            ease: config.ease ?? 'easeOut',
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Luxury parallax scroll
interface LuxuryParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function LuxuryParallaxScroll({
  children,
  speed = 0.5,
  direction = 'up',
  className,
  as: Component = 'div',
}: LuxuryParallaxScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [speed * 100, -speed * 100]
      : direction === 'down'
      ? [-speed * 100, speed * 100]
      : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left'
      ? [speed * 100, -speed * 100]
      : direction === 'right'
      ? [-speed * 100, speed * 100]
      : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      as={Component}
      className={cn('luxury-parallax-scroll', className)}
      style={{ y, x }}
    >
      {children}
    </motion.div>
  );
}

// Luxury scroll reveal
interface LuxuryScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function LuxuryScrollReveal({
  children,
  threshold = 0.3,
  rootMargin = '0px 0px -100px 0px',
  className,
  as: Component = 'div',
}: LuxuryScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    rootMargin,
    once: true,
  });

  return (
    <motion.div
      ref={ref}
      as={Component}
      className={cn('luxury-scroll-reveal', className)}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Luxury scroll progress
interface LuxuryScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export function LuxuryScrollProgress({
  className,
  color = '#B8860B',
  height = 4,
}: LuxuryScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className={cn('luxury-scroll-progress', className)}
      style={{
        scaleX,
        transformOrigin: 'left',
        height: `${height}px`,
        backgroundColor: color,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    />
  );
}

// Luxury scroll animations utilities
export const luxuryScrollAnimationUtils = {
  /**
   * Create scroll animation config
   */
  createConfig: (
    type: ScrollAnimationType,
    options: Partial<ScrollAnimationConfig> = {}
  ): ScrollAnimationConfig => ({
    type,
    delay: 0,
    duration: 0.6,
    ease: 'easeOut',
    threshold: 0.3,
    once: true,
    amount: 0.3,
    ...options,
  }),

  /**
   * Get animation variant
   */
  getVariant: (type: ScrollAnimationType) => {
    return scrollAnimationVariants[type];
  },

  /**
   * Create stagger animation
   */
  createStagger: (stagger: number = 0.1) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  }),

  /**
   * Create parallax animation
   */
  createParallax: (speed: number, direction: 'up' | 'down' | 'left' | 'right') => ({
    speed,
    direction,
  }),
};

// Luxury scroll animation presets
export const luxuryScrollAnimationPresets = {
  // Fade in preset
  fadeIn: {
    type: 'fadeIn' as ScrollAnimationType,
    duration: 0.6,
    ease: 'easeOut',
    threshold: 0.3,
  },
  
  // Slide up preset
  slideUp: {
    type: 'slideUp' as ScrollAnimationType,
    duration: 0.8,
    ease: 'easeOut',
    threshold: 0.3,
  },
  
  // Scale preset
  scale: {
    type: 'scale' as ScrollAnimationType,
    duration: 0.7,
    ease: 'easeOut',
    threshold: 0.3,
  },
  
  // Parallax preset
  parallax: {
    type: 'parallax' as ScrollAnimationType,
    duration: 1.0,
    ease: 'easeOut',
    threshold: 0.3,
    parallax: {
      speed: 0.5,
      direction: 'up' as const,
    },
  },
  
  // Stagger preset
  stagger: {
    type: 'stagger' as ScrollAnimationType,
    duration: 0.6,
    ease: 'easeOut',
    threshold: 0.3,
    stagger: 0.1,
  },
};

// Export all components and utilities
export default {
  LuxuryScrollAnimation,
  LuxuryScrollStagger,
  LuxuryParallaxScroll,
  LuxuryScrollReveal,
  LuxuryScrollProgress,
  luxuryScrollAnimationUtils,
  luxuryScrollAnimationPresets,
};
