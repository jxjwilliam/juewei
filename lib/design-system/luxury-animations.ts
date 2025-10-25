/**
 * Luxury Animation System
 * 
 * Defines luxury animation presets and performance settings for the Juewei
 * luxury brand experience with smooth, sophisticated interactions.
 */

export interface LuxuryAnimation {
  duration: number;
  easing: string;
  transform: {
    translateY?: string;
    scale?: number;
    rotate?: number;
  };
  opacity: {
    from: number;
    to: number;
  };
  performance: {
    targetFPS: number;
    gracefulDegradation: boolean;
  };
  accessibility: {
    respectReducedMotion: boolean;
    reducedMotionDuration: number;
  };
}

export const luxuryAnimations: Record<string, LuxuryAnimation> = {
  // Hover animations for luxury interactions
  hover: {
    duration: 0.3,
    easing: 'easeInOut',
    transform: {
      translateY: '-2px',
      scale: 1.02,
    },
    opacity: {
      from: 1,
      to: 1,
    },
    performance: {
      targetFPS: 60,
      gracefulDegradation: true,
    },
    accessibility: {
      respectReducedMotion: true,
      reducedMotionDuration: 0.1,
    },
  },

  // Fade in animations for content reveal
  fadeIn: {
    duration: 0.8,
    easing: 'easeOut',
    transform: {
      translateY: '0px',
      scale: 1,
    },
    opacity: {
      from: 0,
      to: 1,
    },
    performance: {
      targetFPS: 60,
      gracefulDegradation: true,
    },
    accessibility: {
      respectReducedMotion: true,
      reducedMotionDuration: 0.2,
    },
  },

  // Slide up animations for content entrance
  slideUp: {
    duration: 0.6,
    easing: 'easeOut',
    transform: {
      translateY: '30px',
      scale: 1,
    },
    opacity: {
      from: 0,
      to: 1,
    },
    performance: {
      targetFPS: 60,
      gracefulDegradation: true,
    },
    accessibility: {
      respectReducedMotion: true,
      reducedMotionDuration: 0.2,
    },
  },

  // Scale animations for button interactions
  scale: {
    duration: 0.2,
    easing: 'easeInOut',
    transform: {
      translateY: '0px',
      scale: 0.98,
    },
    opacity: {
      from: 1,
      to: 1,
    },
    performance: {
      targetFPS: 60,
      gracefulDegradation: true,
    },
    accessibility: {
      respectReducedMotion: true,
      reducedMotionDuration: 0.1,
    },
  },

  // Stagger animations for list items
  stagger: {
    duration: 0.4,
    easing: 'easeOut',
    transform: {
      translateY: '20px',
      scale: 1,
    },
    opacity: {
      from: 0,
      to: 1,
    },
    performance: {
      targetFPS: 60,
      gracefulDegradation: true,
    },
    accessibility: {
      respectReducedMotion: true,
      reducedMotionDuration: 0.2,
    },
  },

  // Parallax animations for background elements
  parallax: {
    duration: 1.0,
    easing: 'easeOut',
    transform: {
      translateY: '-10px',
      scale: 1,
    },
    opacity: {
      from: 1,
      to: 1,
    },
    performance: {
      targetFPS: 60,
      gracefulDegradation: true,
    },
    accessibility: {
      respectReducedMotion: true,
      reducedMotionDuration: 0.1,
    },
  },
};

export const luxuryAnimationVariants = {
  // Mobile optimized animations
  mobile: {
    hover: {
      ...luxuryAnimations.hover,
      duration: 0.2,
      transform: {
        translateY: '-1px',
        scale: 1.01,
      },
    },
    fadeIn: {
      ...luxuryAnimations.fadeIn,
      duration: 0.6,
    },
    slideUp: {
      ...luxuryAnimations.slideUp,
      duration: 0.4,
      transform: {
        translateY: '20px',
        scale: 1,
      },
    },
  },

  // Reduced motion animations for accessibility
  reducedMotion: {
    hover: {
      ...luxuryAnimations.hover,
      duration: 0.1,
      transform: {
        translateY: '0px',
        scale: 1,
      },
    },
    fadeIn: {
      ...luxuryAnimations.fadeIn,
      duration: 0.2,
      transform: {
        translateY: '0px',
        scale: 1,
      },
    },
    slideUp: {
      ...luxuryAnimations.slideUp,
      duration: 0.2,
      transform: {
        translateY: '0px',
        scale: 1,
      },
    },
  },

  // High performance animations for capable devices
  highPerformance: {
    hover: {
      ...luxuryAnimations.hover,
      duration: 0.4,
      transform: {
        translateY: '-4px',
        scale: 1.05,
      },
    },
    fadeIn: {
      ...luxuryAnimations.fadeIn,
      duration: 1.0,
    },
    slideUp: {
      ...luxuryAnimations.slideUp,
      duration: 0.8,
      transform: {
        translateY: '40px',
        scale: 1,
      },
    },
  },
} as const;

export const luxuryAnimationUtils = {
  /**
   * Get animation configuration for a specific variant
   */
  getAnimation: (name: string, variant: 'default' | 'mobile' | 'reducedMotion' | 'highPerformance' = 'default') => {
    // Resolve base animation first
    const baseAnimation = luxuryAnimations[name as keyof typeof luxuryAnimations];

    // Attempt variant-specific overrides with graceful fallback
    if (variant === 'mobile') {
      return (
        luxuryAnimationVariants.mobile[name as keyof typeof luxuryAnimationVariants.mobile] ||
        baseAnimation ||
        luxuryAnimations.fadeIn
      );
    }
    if (variant === 'reducedMotion') {
      return (
        luxuryAnimationVariants.reducedMotion[name as keyof typeof luxuryAnimationVariants.reducedMotion] ||
        baseAnimation ||
        luxuryAnimations.fadeIn
      );
    }
    if (variant === 'highPerformance') {
      return (
        luxuryAnimationVariants.highPerformance[name as keyof typeof luxuryAnimationVariants.highPerformance] ||
        baseAnimation ||
        luxuryAnimations.fadeIn
      );
    }

    // Default variant fallback
    return baseAnimation || luxuryAnimations.fadeIn;
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Check device performance capabilities
   */
  getDevicePerformance: (): 'high' | 'medium' | 'low' => {
    if (typeof navigator === 'undefined') return 'medium';
    
    // Simple performance detection based on hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    
    if (cores >= 8 && memory >= 8) return 'high';
    if (cores >= 4 && memory >= 4) return 'medium';
    return 'low';
  },

  /**
   * Generate Framer Motion animation props
   */
  generateFramerMotionProps: (animationName: string, variant: 'default' | 'mobile' | 'reducedMotion' | 'highPerformance' = 'default') => {
    const animation = luxuryAnimationUtils.getAnimation(animationName, variant) || luxuryAnimations.fadeIn;
    const prefersReducedMotion = luxuryAnimationUtils.prefersReducedMotion();
    const performance = luxuryAnimationUtils.getDevicePerformance();
    
    // Adjust animation based on user preferences and device capabilities
    let adjustedAnimation = animation;
    if (prefersReducedMotion) {
      adjustedAnimation = luxuryAnimationUtils.getAnimation(animationName, 'reducedMotion') || luxuryAnimations.fadeIn;
    } else if (performance === 'high' && variant === 'default') {
      adjustedAnimation = luxuryAnimationUtils.getAnimation(animationName, 'highPerformance') || luxuryAnimations.fadeIn;
    }

    // Final safety guards in case of malformed configs
    const opacityFrom = (adjustedAnimation && adjustedAnimation.opacity && typeof adjustedAnimation.opacity.from === 'number')
      ? adjustedAnimation.opacity.from
      : 0;
    const opacityTo = (adjustedAnimation && adjustedAnimation.opacity && typeof adjustedAnimation.opacity.to === 'number')
      ? adjustedAnimation.opacity.to
      : 1;
    const translateY = (adjustedAnimation && adjustedAnimation.transform && adjustedAnimation.transform.translateY)
      ? parseInt(adjustedAnimation.transform.translateY)
      : 0;
    const scale = (adjustedAnimation && adjustedAnimation.transform && typeof adjustedAnimation.transform.scale === 'number')
      ? adjustedAnimation.transform.scale
      : 1;
    const duration = (adjustedAnimation && typeof adjustedAnimation.duration === 'number')
      ? adjustedAnimation.duration
      : 0.5;
    const ease = (adjustedAnimation && typeof adjustedAnimation.easing === 'string')
      ? adjustedAnimation.easing
      : 'easeOut';

    return {
      initial: {
        opacity: opacityFrom,
        y: translateY,
        scale: scale,
      },
      animate: {
        opacity: opacityTo,
        y: 0,
        scale: 1,
      },
      transition: {
        duration: duration,
        ease: ease,
      },
    };
  },

  /**
   * Generate CSS animation classes
   */
  generateCSSAnimations: () => {
    return `
      @keyframes luxury-hover {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-2px) scale(1.02); }
      }
      
      @keyframes luxury-fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes luxury-slide-up {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes luxury-scale {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
      }
      
      .luxury-hover {
        transition: transform 0.3s ease-in-out;
      }
      
      .luxury-hover:hover {
        transform: translateY(-2px) scale(1.02);
      }
      
      .luxury-fade-in {
        animation: luxury-fade-in 0.8s ease-out;
      }
      
      .luxury-slide-up {
        animation: luxury-slide-up 0.6s ease-out;
      }
      
      .luxury-scale {
        animation: luxury-scale 0.2s ease-in-out;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .luxury-hover,
        .luxury-fade-in,
        .luxury-slide-up,
        .luxury-scale {
          animation: none;
          transition: none;
        }
      }
    `;
  },

  /**
   * Performance monitoring for animations
   */
  monitorPerformance: (callback: (fps: number) => void) => {
    if (typeof window === 'undefined') return;
    
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        callback(fps);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  },
};

export default luxuryAnimations;
