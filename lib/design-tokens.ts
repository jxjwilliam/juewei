/**
 * Design Tokens for Juewei UI Restaurant Website
 * Centralized design system tokens for consistent styling
 */

// Color Tokens
export const colors = {
  // Food Brand Colors
  food: {
    red: {
      50: 'oklch(0.98 0.01 25)',
      100: 'oklch(0.95 0.02 25)',
      200: 'oklch(0.9 0.05 25)',
      300: 'oklch(0.8 0.1 25)',
      400: 'oklch(0.7 0.15 25)',
      500: 'oklch(0.55 0.22 25)', // Primary
      600: 'oklch(0.45 0.25 25)',
      700: 'oklch(0.35 0.25 25)',
      800: 'oklch(0.25 0.2 25)',
      900: 'oklch(0.15 0.15 25)',
      950: 'oklch(0.08 0.1 25)',
    },
    orange: {
      50: 'oklch(0.98 0.01 40)',
      100: 'oklch(0.95 0.02 40)',
      200: 'oklch(0.9 0.05 40)',
      300: 'oklch(0.8 0.1 40)',
      400: 'oklch(0.7 0.15 40)',
      500: 'oklch(0.65 0.2 40)', // Primary
      600: 'oklch(0.55 0.22 40)',
      700: 'oklch(0.45 0.22 40)',
      800: 'oklch(0.35 0.2 40)',
      900: 'oklch(0.25 0.15 40)',
      950: 'oklch(0.15 0.1 40)',
    },
    yellow: {
      50: 'oklch(0.98 0.01 60)',
      100: 'oklch(0.95 0.02 60)',
      200: 'oklch(0.9 0.05 60)',
      300: 'oklch(0.8 0.1 60)',
      400: 'oklch(0.7 0.15 60)',
      500: 'oklch(0.8 0.15 60)', // Primary
      600: 'oklch(0.7 0.18 60)',
      700: 'oklch(0.6 0.2 60)',
      800: 'oklch(0.5 0.18 60)',
      900: 'oklch(0.4 0.15 60)',
      950: 'oklch(0.3 0.1 60)',
    },
    green: {
      50: 'oklch(0.98 0.01 120)',
      100: 'oklch(0.95 0.02 120)',
      200: 'oklch(0.9 0.05 120)',
      300: 'oklch(0.8 0.1 120)',
      400: 'oklch(0.7 0.15 120)',
      500: 'oklch(0.6 0.15 120)', // Primary
      600: 'oklch(0.5 0.18 120)',
      700: 'oklch(0.4 0.18 120)',
      800: 'oklch(0.3 0.15 120)',
      900: 'oklch(0.2 0.1 120)',
      950: 'oklch(0.1 0.05 120)',
    },
    blue: {
      50: 'oklch(0.98 0.01 240)',
      100: 'oklch(0.95 0.02 240)',
      200: 'oklch(0.9 0.05 240)',
      300: 'oklch(0.8 0.1 240)',
      400: 'oklch(0.7 0.15 240)',
      500: 'oklch(0.6 0.15 240)', // Primary
      600: 'oklch(0.5 0.18 240)',
      700: 'oklch(0.4 0.18 240)',
      800: 'oklch(0.3 0.15 240)',
      900: 'oklch(0.2 0.1 240)',
      950: 'oklch(0.1 0.05 240)',
    },
  },
  // Neutral Colors
  neutral: {
    50: 'oklch(0.98 0.005 106)',
    100: 'oklch(0.96 0.01 106)',
    200: 'oklch(0.92 0.01 106)',
    300: 'oklch(0.85 0.01 106)',
    400: 'oklch(0.7 0.01 106)',
    500: 'oklch(0.5 0.01 106)',
    600: 'oklch(0.4 0.01 106)',
    700: 'oklch(0.3 0.01 106)',
    800: 'oklch(0.2 0.01 106)',
    900: 'oklch(0.15 0.01 106)',
    950: 'oklch(0.08 0.01 106)',
  },
} as const;

// Typography Tokens
export const typography = {
  fontFamily: {
    sans: [
      'var(--font-source-han-sans)',
      'PingFang SC',
      'Hiragino Sans GB',
      'Microsoft YaHei',
      'system-ui',
      'sans-serif',
    ],
    serif: [
      'var(--font-source-han-serif)',
      'Georgia',
      'Times New Roman',
      'serif',
    ],
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// Spacing Tokens
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
} as const;

// Border Radius Tokens
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// Shadow Tokens
export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  none: '0 0 #0000',
  // Food brand specific shadows
  food: '0 4px 6px -1px rgba(220, 38, 38, 0.1), 0 2px 4px -2px rgba(220, 38, 38, 0.1)',
  'food-lg': '0 10px 15px -3px rgba(220, 38, 38, 0.1), 0 4px 6px -4px rgba(220, 38, 38, 0.1)',
  'food-xl': '0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 8px 10px -6px rgba(220, 38, 38, 0.1)',
} as const;

// Animation Tokens
export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const;

// Breakpoint Tokens
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-Index Tokens
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Gradient Tokens
export const gradients = {
  primary: 'linear-gradient(135deg, var(--food-red), var(--food-orange))',
  'primary-soft': 'linear-gradient(135deg, var(--food-red-light), var(--food-orange-light))',
  secondary: 'linear-gradient(135deg, var(--food-orange), var(--food-yellow))',
  'secondary-soft': 'linear-gradient(135deg, var(--food-orange-light), var(--food-yellow-light))',
  accent: 'linear-gradient(135deg, var(--food-green), var(--food-blue))',
  'accent-soft': 'linear-gradient(135deg, var(--food-green-light), var(--food-blue-light))',
  mesh: `
    radial-gradient(circle at 20% 50%, var(--food-red) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, var(--food-orange) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, var(--food-yellow) 0%, transparent 50%)
  `,
  radial: 'radial-gradient(circle, var(--food-red) 0%, var(--food-orange) 50%, var(--food-yellow) 100%)',
  conic: 'conic-gradient(from 0deg, var(--food-red), var(--food-orange), var(--food-yellow), var(--food-red))',
} as const;

// Component Tokens
export const components = {
  button: {
    height: {
      sm: '2rem',
      base: '2.5rem',
      lg: '3rem',
      xl: '3.5rem',
    },
    padding: {
      sm: '0.5rem 1rem',
      base: '0.75rem 1.5rem',
      lg: '1rem 2rem',
      xl: '1.25rem 2.5rem',
    },
  },
  input: {
    height: {
      sm: '2rem',
      base: '2.5rem',
      lg: '3rem',
    },
    padding: {
      sm: '0.5rem 0.75rem',
      base: '0.75rem 1rem',
      lg: '1rem 1.25rem',
    },
  },
  card: {
    padding: {
      sm: '1rem',
      base: '1.5rem',
      lg: '2rem',
    },
    radius: {
      sm: '0.5rem',
      base: '0.75rem',
      lg: '1rem',
    },
  },
} as const;

// Export all tokens
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  breakpoints,
  zIndex,
  gradients,
  components,
} as const;

// Type definitions for design tokens
export type ColorToken = keyof typeof colors.food | keyof typeof colors.neutral;
export type SpacingToken = keyof typeof spacing;
export type TypographyToken = keyof typeof typography.fontSize;
export type ShadowToken = keyof typeof shadows;
export type AnimationToken = keyof typeof animations.duration;
export type BreakpointToken = keyof typeof breakpoints;
export type ZIndexToken = keyof typeof zIndex;
export type GradientToken = keyof typeof gradients;
