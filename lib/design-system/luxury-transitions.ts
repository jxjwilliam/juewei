/**
 * Luxury Transition System
 * 
 * Provides comprehensive transition utilities for the luxury design system,
 * including timing functions, easing curves, and transition presets.
 */

// Transition types
export type TransitionType = 
  | 'fade'
  | 'slide'
  | 'scale'
  | 'rotate'
  | 'flip'
  | 'bounce'
  | 'elastic'
  | 'back';

// Transition directions
export type TransitionDirection = 
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'in'
  | 'out';

// Transition timing functions
export const luxuryTransitionTiming = {
  // Standard easing functions
  linear: 'linear',
  ease: 'easeOut',
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  
  // Custom luxury easing functions
  luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  luxuryIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  luxuryOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  luxuryInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  
  // Spring-like easing
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  springIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  springOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Bounce easing
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  bounceIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  bounceOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Elastic easing
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elasticIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  elasticOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// Transition durations
export const luxuryTransitionDurations = {
  // Fast transitions
  fast: 0.15,
  quick: 0.2,
  normal: 0.3,
  
  // Medium transitions
  medium: 0.5,
  slow: 0.7,
  slower: 1.0,
  
  // Slow transitions
  slowest: 1.5,
  luxury: 0.35,
  dramatic: 0.8,
  
  // Custom durations
  custom: (duration: number) => duration,
};

// Transition presets
export const luxuryTransitionPresets = {
  // Fade transitions
  fade: {
    in: {
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
    out: {
      opacity: [1, 0],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryIn,
      },
    },
  },
  
  // Slide transitions
  slide: {
    up: {
      y: [50, 0],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
    down: {
      y: [-50, 0],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
    left: {
      x: [50, 0],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
    right: {
      x: [-50, 0],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
  },
  
  // Scale transitions
  scale: {
    in: {
      scale: [0.8, 1],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
    out: {
      scale: [1, 0.8],
      opacity: [1, 0],
      transition: {
        duration: luxuryTransitionDurations.normal,
        ease: luxuryTransitionTiming.luxuryIn,
      },
    },
  },
  
  // Rotate transitions
  rotate: {
    in: {
      rotate: [-180, 0],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
    out: {
      rotate: [0, 180],
      opacity: [1, 0],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.luxuryIn,
      },
    },
  },
  
  // Flip transitions
  flip: {
    in: {
      rotateY: [180, 0],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.luxuryOut,
      },
    },
    out: {
      rotateY: [0, 180],
      opacity: [1, 0],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.luxuryIn,
      },
    },
  },
  
  // Bounce transitions
  bounce: {
    in: {
      scale: [0, 1.1, 1],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.bounceOut,
      },
    },
    out: {
      scale: [1, 1.1, 0],
      opacity: [1, 0],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.bounceIn,
      },
    },
  },
  
  // Elastic transitions
  elastic: {
    in: {
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.slow,
        ease: luxuryTransitionTiming.elasticOut,
      },
    },
    out: {
      scale: [1, 1.2, 0],
      opacity: [1, 0],
      transition: {
        duration: luxuryTransitionDurations.slow,
        ease: luxuryTransitionTiming.elasticIn,
      },
    },
  },
  
  // Back transitions
  back: {
    in: {
      scale: [0, 1.1, 1],
      opacity: [0, 1],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.springOut,
      },
    },
    out: {
      scale: [1, 1.1, 0],
      opacity: [1, 0],
      transition: {
        duration: luxuryTransitionDurations.medium,
        ease: luxuryTransitionTiming.springIn,
      },
    },
  },
};

// Luxury transition utilities
export class LuxuryTransitions {
  /**
   * Get transition preset
   */
  static getTransitionPreset(
    type: TransitionType,
    direction?: TransitionDirection
  ) {
    if (type === 'fade') {
      return luxuryTransitionPresets.fade;
    }
    
    if (type === 'slide' && direction) {
      if (direction === 'in' || direction === 'out') {
        return luxuryTransitionPresets.slide.up; // Default to up for in/out
      }
      return luxuryTransitionPresets.slide[direction];
    }
    
    if (type === 'scale') {
      return luxuryTransitionPresets.scale;
    }
    
    if (type === 'rotate') {
      return luxuryTransitionPresets.rotate;
    }
    
    if (type === 'flip') {
      return luxuryTransitionPresets.flip;
    }
    
    if (type === 'bounce') {
      return luxuryTransitionPresets.bounce;
    }
    
    if (type === 'elastic') {
      return luxuryTransitionPresets.elastic;
    }
    
    if (type === 'back') {
      return luxuryTransitionPresets.back;
    }
    
    return luxuryTransitionPresets.fade;
  }

  /**
   * Create custom transition
   */
  static createCustomTransition(
    properties: Record<string, any>,
    duration: number = luxuryTransitionDurations.normal,
    ease: string = luxuryTransitionTiming.luxuryOut
  ) {
    return {
      ...properties,
      transition: {
        duration,
        ease,
      },
    };
  }

  /**
   * Create staggered transition
   */
  static createStaggeredTransition(
    children: number,
    stagger: number = 0.1,
    baseTransition: any = luxuryTransitionPresets.fade.in
  ) {
    return {
      ...baseTransition,
      transition: {
        ...baseTransition.transition,
        staggerChildren: stagger,
        delayChildren: 0,
      },
    };
  }

  /**
   * Create sequence transition
   */
  static createSequenceTransition(
    transitions: Array<{
      properties: Record<string, any>;
      duration: number;
      ease: string;
      delay?: number;
    }>
  ) {
    return transitions.map((transition, index) => ({
      ...transition.properties,
      transition: {
        duration: transition.duration,
        ease: transition.ease,
        delay: transition.delay || index * 0.1,
      },
    }));
  }

  /**
   * Create loop transition
   */
  static createLoopTransition(
    properties: Record<string, any>,
    duration: number = luxuryTransitionDurations.normal,
    ease: string = luxuryTransitionTiming.luxuryOut
  ) {
    return {
      ...properties,
      transition: {
        duration,
        ease,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    };
  }

  /**
   * Create spring transition
   */
  static createSpringTransition(
    properties: Record<string, any>,
    stiffness: number = 100,
    damping: number = 10
  ) {
    return {
      ...properties,
      transition: {
        type: 'spring',
        stiffness,
        damping,
      },
    };
  }

  /**
   * Create tween transition
   */
  static createTweenTransition(
    properties: Record<string, any>,
    duration: number = luxuryTransitionDurations.normal,
    ease: string = luxuryTransitionTiming.luxuryOut
  ) {
    return {
      ...properties,
      transition: {
        type: 'tween',
        duration,
        ease,
      },
    };
  }

  /**
   * Create keyframe transition
   */
  static createKeyframeTransition(
    keyframes: Record<string, any>[],
    duration: number = luxuryTransitionDurations.normal,
    ease: string = luxuryTransitionTiming.luxuryOut
  ) {
    return {
      animate: keyframes,
      transition: {
        duration,
        ease,
      },
    };
  }

  /**
   * Create conditional transition
   */
  static createConditionalTransition(
    condition: boolean,
    trueTransition: any,
    falseTransition: any
  ) {
    return condition ? trueTransition : falseTransition;
  }

  /**
   * Create responsive transition
   */
  static createResponsiveTransition(
    breakpoints: Record<string, any>
  ) {
    return breakpoints;
  }

  /**
   * Create accessibility transition
   */
  static createAccessibilityTransition(
    baseTransition: any,
    reducedMotion: boolean = false
  ) {
    if (reducedMotion) {
      return {
        ...baseTransition,
        transition: {
          ...baseTransition.transition,
          duration: 0.01,
        },
      };
    }
    
    return baseTransition;
  }
}

// Luxury transition utilities
export const luxuryTransitionUtils = {
  /**
   * Get transition preset
   */
  getTransitionPreset: (type: TransitionType, direction?: TransitionDirection) => {
    return LuxuryTransitions.getTransitionPreset(type, direction);
  },

  /**
   * Create custom transition
   */
  createCustomTransition: (properties: Record<string, any>, duration?: number, ease?: string) => {
    return LuxuryTransitions.createCustomTransition(properties, duration, ease);
  },

  /**
   * Create staggered transition
   */
  createStaggeredTransition: (children: number, stagger?: number, baseTransition?: any) => {
    return LuxuryTransitions.createStaggeredTransition(children, stagger, baseTransition);
  },

  /**
   * Create sequence transition
   */
  createSequenceTransition: (transitions: Array<any>) => {
    return LuxuryTransitions.createSequenceTransition(transitions);
  },

  /**
   * Create loop transition
   */
  createLoopTransition: (properties: Record<string, any>, duration?: number, ease?: string) => {
    return LuxuryTransitions.createLoopTransition(properties, duration, ease);
  },

  /**
   * Create spring transition
   */
  createSpringTransition: (properties: Record<string, any>, stiffness?: number, damping?: number) => {
    return LuxuryTransitions.createSpringTransition(properties, stiffness, damping);
  },

  /**
   * Create tween transition
   */
  createTweenTransition: (properties: Record<string, any>, duration?: number, ease?: string) => {
    return LuxuryTransitions.createTweenTransition(properties, duration, ease);
  },

  /**
   * Create keyframe transition
   */
  createKeyframeTransition: (keyframes: Record<string, any>[], duration?: number, ease?: string) => {
    return LuxuryTransitions.createKeyframeTransition(keyframes, duration, ease);
  },

  /**
   * Create conditional transition
   */
  createConditionalTransition: (condition: boolean, trueTransition: any, falseTransition: any) => {
    return LuxuryTransitions.createConditionalTransition(condition, trueTransition, falseTransition);
  },

  /**
   * Create responsive transition
   */
  createResponsiveTransition: (breakpoints: Record<string, any>) => {
    return LuxuryTransitions.createResponsiveTransition(breakpoints);
  },

  /**
   * Create accessibility transition
   */
  createAccessibilityTransition: (baseTransition: any, reducedMotion?: boolean) => {
    return LuxuryTransitions.createAccessibilityTransition(baseTransition, reducedMotion);
  },
};

// Export all utilities
export default {
  LuxuryTransitions,
  luxuryTransitionTiming,
  luxuryTransitionDurations,
  luxuryTransitionPresets,
  luxuryTransitionUtils,
};
