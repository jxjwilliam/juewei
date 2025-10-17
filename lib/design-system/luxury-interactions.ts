/**
 * Luxury Interaction System
 * 
 * Provides comprehensive interaction utilities for the luxury design system,
 * including hover effects, focus states, and interactive animations.
 */

import { motion } from 'framer-motion';

// Interaction types
export type InteractionType = 'hover' | 'focus' | 'active' | 'disabled' | 'loading';
export type InteractionVariant = 'subtle' | 'moderate' | 'dramatic' | 'luxury';

// Interaction configurations
export const luxuryInteractionConfig = {
  // Hover effects
  hover: {
    subtle: {
      scale: 1.02,
      opacity: 0.9,
      duration: 0.2,
      ease: 'easeOut',
    },
    moderate: {
      scale: 1.05,
      opacity: 0.95,
      duration: 0.3,
      ease: 'easeOut',
    },
    dramatic: {
      scale: 1.1,
      opacity: 1,
      duration: 0.4,
      ease: 'easeOut',
    },
    luxury: {
      scale: 1.08,
      opacity: 0.98,
      duration: 0.35,
      ease: 'easeOut',
      glow: true,
      shadow: true,
    },
  },
  
  // Focus effects
  focus: {
    subtle: {
      scale: 1.01,
      opacity: 1,
      duration: 0.15,
      ease: 'easeOut',
    },
    moderate: {
      scale: 1.03,
      opacity: 1,
      duration: 0.2,
      ease: 'easeOut',
    },
    dramatic: {
      scale: 1.05,
      opacity: 1,
      duration: 0.25,
      ease: 'easeOut',
    },
    luxury: {
      scale: 1.04,
      opacity: 1,
      duration: 0.2,
      ease: 'easeOut',
      glow: true,
      ring: true,
    },
  },
  
  // Active effects
  active: {
    subtle: {
      scale: 0.98,
      opacity: 0.8,
      duration: 0.1,
      ease: 'easeIn',
    },
    moderate: {
      scale: 0.95,
      opacity: 0.85,
      duration: 0.15,
      ease: 'easeIn',
    },
    dramatic: {
      scale: 0.9,
      opacity: 0.9,
      duration: 0.2,
      ease: 'easeIn',
    },
    luxury: {
      scale: 0.96,
      opacity: 0.88,
      duration: 0.12,
      ease: 'easeIn',
      glow: true,
    },
  },
  
  // Disabled effects
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    duration: 0.2,
    ease: 'easeOut',
  },
  
  // Loading effects
  loading: {
    opacity: 0.7,
    cursor: 'wait',
    duration: 0.3,
    ease: 'easeOut',
    animation: 'pulse',
  },
};

// Luxury interaction utilities
export class LuxuryInteractions {
  /**
   * Get interaction configuration
   */
  static getInteractionConfig(
    type: InteractionType,
    variant: InteractionVariant = 'luxury'
  ) {
    return luxuryInteractionConfig[type][variant] || luxuryInteractionConfig[type].luxury;
  }

  /**
   * Generate interaction classes
   */
  static generateInteractionClasses(
    type: InteractionType,
    variant: InteractionVariant = 'luxury'
  ): string {
    const config = this.getInteractionConfig(type, variant);
    const classes = ['luxury-interaction'];
    
    // Add type class
    classes.push(`luxury-interaction-${type}`);
    
    // Add variant class
    classes.push(`luxury-interaction-${variant}`);
    
    // Add specific classes based on config
    if (config.glow) {
      classes.push('luxury-glow');
    }
    
    if (config.shadow) {
      classes.push('luxury-shadow');
    }
    
    if (config.ring) {
      classes.push('luxury-ring');
    }
    
    return classes.join(' ');
  }

  /**
   * Generate interaction styles
   */
  static generateInteractionStyles(
    type: InteractionType,
    variant: InteractionVariant = 'luxury'
  ): Record<string, any> {
    const config = this.getInteractionConfig(type, variant);
    
    return {
      scale: config.scale || 1,
      opacity: config.opacity || 1,
      transition: {
        duration: config.duration || 0.2,
        ease: config.ease || 'easeOut',
      },
    };
  }

  /**
   * Create hover interaction
   */
  static createHoverInteraction(
    variant: InteractionVariant = 'luxury'
  ): Record<string, any> {
    const config = this.getInteractionConfig('hover', variant);
    
    return {
      whileHover: {
        scale: config.scale,
        opacity: config.opacity,
        transition: {
          duration: config.duration,
          ease: config.ease,
        },
      },
    };
  }

  /**
   * Create focus interaction
   */
  static createFocusInteraction(
    variant: InteractionVariant = 'luxury'
  ): Record<string, any> {
    const config = this.getInteractionConfig('focus', variant);
    
    return {
      whileFocus: {
        scale: config.scale,
        opacity: config.opacity,
        transition: {
          duration: config.duration,
          ease: config.ease,
        },
      },
    };
  }

  /**
   * Create active interaction
   */
  static createActiveInteraction(
    variant: InteractionVariant = 'luxury'
  ): Record<string, any> {
    const config = this.getInteractionConfig('active', variant);
    
    return {
      whileTap: {
        scale: config.scale,
        opacity: config.opacity,
        transition: {
          duration: config.duration,
          ease: config.ease,
        },
      },
    };
  }

  /**
   * Create disabled interaction
   */
  static createDisabledInteraction(): Record<string, any> {
    const config = luxuryInteractionConfig.disabled;
    
    return {
      style: {
        opacity: config.opacity,
        cursor: config.cursor,
      },
      transition: {
        duration: config.duration,
        ease: config.ease,
      },
    };
  }

  /**
   * Create loading interaction
   */
  static createLoadingInteraction(): Record<string, any> {
    const config = luxuryInteractionConfig.loading;
    
    return {
      style: {
        opacity: config.opacity,
        cursor: config.cursor,
      },
      animate: {
        opacity: [0.7, 1, 0.7],
      },
      transition: {
        duration: config.duration,
        ease: config.ease,
        repeat: Infinity,
      },
    };
  }

  /**
   * Create comprehensive interaction
   */
  static createComprehensiveInteraction(
    variant: InteractionVariant = 'luxury'
  ): Record<string, any> {
    return {
      ...this.createHoverInteraction(variant),
      ...this.createFocusInteraction(variant),
      ...this.createActiveInteraction(variant),
    };
  }

  /**
   * Create luxury interaction with glow
   */
  static createLuxuryInteraction(): Record<string, any> {
    return {
      whileHover: {
        scale: 1.08,
        opacity: 0.98,
        boxShadow: '0 0 20px rgba(184, 134, 11, 0.3)',
        transition: {
          duration: 0.35,
          ease: 'easeOut',
        },
      },
      whileFocus: {
        scale: 1.04,
        opacity: 1,
        boxShadow: '0 0 15px rgba(184, 134, 11, 0.4)',
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      },
      whileTap: {
        scale: 0.96,
        opacity: 0.88,
        transition: {
          duration: 0.12,
          ease: 'easeIn',
        },
      },
    };
  }

  /**
   * Create subtle interaction
   */
  static createSubtleInteraction(): Record<string, any> {
    return {
      whileHover: {
        scale: 1.02,
        opacity: 0.9,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      },
      whileFocus: {
        scale: 1.01,
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: 'easeOut',
        },
      },
      whileTap: {
        scale: 0.98,
        opacity: 0.8,
        transition: {
          duration: 0.1,
          ease: 'easeIn',
        },
      },
    };
  }

  /**
   * Create dramatic interaction
   */
  static createDramaticInteraction(): Record<string, any> {
    return {
      whileHover: {
        scale: 1.1,
        opacity: 1,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        transition: {
          duration: 0.4,
          ease: 'easeOut',
        },
      },
      whileFocus: {
        scale: 1.05,
        opacity: 1,
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
        transition: {
          duration: 0.25,
          ease: 'easeOut',
        },
      },
      whileTap: {
        scale: 0.9,
        opacity: 0.9,
        transition: {
          duration: 0.2,
          ease: 'easeIn',
        },
      },
    };
  }
}

// Luxury interaction presets
export const luxuryInteractionPresets = {
  // Luxury interaction preset
  luxury: {
    hover: luxuryInteractionConfig.hover.luxury,
    focus: luxuryInteractionConfig.focus.luxury,
    active: luxuryInteractionConfig.active.luxury,
    description: 'Luxury interaction with glow and shadow effects',
  },
  
  // Subtle interaction preset
  subtle: {
    hover: luxuryInteractionConfig.hover.subtle,
    focus: luxuryInteractionConfig.focus.subtle,
    active: luxuryInteractionConfig.active.subtle,
    description: 'Subtle interaction for minimal impact',
  },
  
  // Moderate interaction preset
  moderate: {
    hover: luxuryInteractionConfig.hover.moderate,
    focus: luxuryInteractionConfig.focus.moderate,
    active: luxuryInteractionConfig.active.moderate,
    description: 'Moderate interaction for balanced experience',
  },
  
  // Dramatic interaction preset
  dramatic: {
    hover: luxuryInteractionConfig.hover.dramatic,
    focus: luxuryInteractionConfig.focus.dramatic,
    active: luxuryInteractionConfig.active.dramatic,
    description: 'Dramatic interaction for maximum impact',
  },
};

// Luxury interaction utilities
export const luxuryInteractionUtils = {
  /**
   * Get interaction config
   */
  getInteractionConfig: (type: InteractionType, variant: InteractionVariant = 'luxury') => {
    return LuxuryInteractions.getInteractionConfig(type, variant);
  },

  /**
   * Generate interaction classes
   */
  generateInteractionClasses: (type: InteractionType, variant: InteractionVariant = 'luxury') => {
    return LuxuryInteractions.generateInteractionClasses(type, variant);
  },

  /**
   * Generate interaction styles
   */
  generateInteractionStyles: (type: InteractionType, variant: InteractionVariant = 'luxury') => {
    return LuxuryInteractions.generateInteractionStyles(type, variant);
  },

  /**
   * Create hover interaction
   */
  createHoverInteraction: (variant: InteractionVariant = 'luxury') => {
    return LuxuryInteractions.createHoverInteraction(variant);
  },

  /**
   * Create focus interaction
   */
  createFocusInteraction: (variant: InteractionVariant = 'luxury') => {
    return LuxuryInteractions.createFocusInteraction(variant);
  },

  /**
   * Create active interaction
   */
  createActiveInteraction: (variant: InteractionVariant = 'luxury') => {
    return LuxuryInteractions.createActiveInteraction(variant);
  },

  /**
   * Create comprehensive interaction
   */
  createComprehensiveInteraction: (variant: InteractionVariant = 'luxury') => {
    return LuxuryInteractions.createComprehensiveInteraction(variant);
  },

  /**
   * Create luxury interaction
   */
  createLuxuryInteraction: () => {
    return LuxuryInteractions.createLuxuryInteraction();
  },

  /**
   * Create subtle interaction
   */
  createSubtleInteraction: () => {
    return LuxuryInteractions.createSubtleInteraction();
  },

  /**
   * Create dramatic interaction
   */
  createDramaticInteraction: () => {
    return LuxuryInteractions.createDramaticInteraction();
  },
};

// Export all utilities
export default {
  LuxuryInteractions,
  luxuryInteractionConfig,
  luxuryInteractionPresets,
  luxuryInteractionUtils,
};
