import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Luxury color palette
      colors: {
        luxury: {
          // Deep charcoal backgrounds for sophisticated contrast
          background: '#1A1A1A',
          'background-secondary': '#2A2A2A',
          
          // Warm metallic accents for premium feel
          copper: '#B8860B',
          gold: '#D4AF37',
          
          // Chili-inspired red for spice indicators and CTAs
          spice: '#D43D2A',
          
          // Off-white/cream text for luxury aesthetic
          'text-primary': '#F5F5F5',
          'text-secondary': '#CCCCCC',
          'text-accent': '#B8860B',
        },
        
        // High contrast variants for accessibility
        'luxury-hc': {
          background: '#000000',
          'background-secondary': '#1A1A1A',
          'text-primary': '#FFFFFF',
          'text-secondary': '#E0E0E0',
          copper: '#FFD700',
          gold: '#FFA500',
          spice: '#FF0000',
        },
      },
      
      // Luxury typography
      fontFamily: {
        'luxury-heading': ['Playfair Display', 'Lora', 'Merriweather', 'serif'],
        'luxury-body': ['Inter', 'Montserrat', 'Roboto', 'sans-serif'],
      },
      
      // Luxury font sizes
      fontSize: {
        'luxury-h1': ['4rem', { lineHeight: '1.1', fontWeight: '600' }],
        'luxury-h2': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],
        'luxury-h3': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'luxury-h4': ['1.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        'luxury-h5': ['1.5rem', { lineHeight: '1.5', fontWeight: '600' }],
        'luxury-h6': ['1.25rem', { lineHeight: '1.6', fontWeight: '600' }],
        'luxury-body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'luxury-body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'luxury-caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      
      // Luxury spacing
      spacing: {
        'luxury-xs': '0.5rem',
        'luxury-sm': '1rem',
        'luxury-md': '1.5rem',
        'luxury-lg': '2rem',
        'luxury-xl': '3rem',
        'luxury-2xl': '4rem',
        'luxury-3xl': '6rem',
      },
      
      // Luxury shadows
      boxShadow: {
        'luxury-sm': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'luxury-md': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'luxury-lg': '0 8px 16px rgba(0, 0, 0, 0.2)',
        'luxury-xl': '0 16px 32px rgba(0, 0, 0, 0.25)',
        'luxury-glow': '0 0 20px rgba(184, 134, 11, 0.3)',
        'luxury-glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      
      // Luxury animations
      animation: {
        'luxury-hover': 'luxury-hover 0.3s ease-in-out',
        'luxury-fade-in': 'luxury-fade-in 0.8s ease-out',
        'luxury-slide-up': 'luxury-slide-up 0.6s ease-out',
        'luxury-scale': 'luxury-scale 0.2s ease-in-out',
        'luxury-stagger': 'luxury-stagger 0.4s ease-out',
        'luxury-parallax': 'luxury-parallax 1.0s ease-out',
      },
      
      // Luxury keyframes
      keyframes: {
        'luxury-hover': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-2px) scale(1.02)' },
        },
        'luxury-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'luxury-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'luxury-scale': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        'luxury-stagger': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'luxury-parallax': {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      
      // Luxury gradients
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
        'luxury-gradient-copper': 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)',
        'luxury-gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
        'luxury-gradient-spice': 'linear-gradient(135deg, #D43D2A 0%, #FF6B47 100%)',
      },
      
      // Luxury backdrop blur
      backdropBlur: {
        'luxury': '10px',
        'luxury-lg': '20px',
      },
      
      // Luxury border radius
      borderRadius: {
        'luxury': '0.75rem',
        'luxury-lg': '1rem',
        'luxury-xl': '1.5rem',
      },
      
      // Luxury transitions
      transitionDuration: {
        'luxury': '300ms',
        'luxury-slow': '600ms',
        'luxury-fast': '150ms',
      },
      
      // Luxury z-index
      zIndex: {
        'luxury-overlay': '10',
        'luxury-modal': '20',
        'luxury-tooltip': '30',
        'luxury-dropdown': '40',
      },
    },
  },
  plugins: [
    // Custom luxury utilities
    function({ addUtilities, addComponents, theme }) {
      // Luxury utility classes
      addUtilities({
        '.luxury-hover': {
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: theme('boxShadow.luxury-lg'),
          },
        },
        '.luxury-fade-in': {
          animation: 'luxury-fade-in 0.8s ease-out',
        },
        '.luxury-slide-up': {
          animation: 'luxury-slide-up 0.6s ease-out',
        },
        '.luxury-scale': {
          animation: 'luxury-scale 0.2s ease-in-out',
        },
        '.luxury-glow': {
          boxShadow: theme('boxShadow.luxury-glow'),
        },
        '.luxury-glow-gold': {
          boxShadow: theme('boxShadow.luxury-glow-gold'),
        },
        '.luxury-glass': {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          border: '1px solid rgba(184, 134, 11, 0.2)',
        },
        '.luxury-glass-lg': {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          border: '1px solid rgba(184, 134, 11, 0.3)',
        },
      });
      
      // Luxury component classes
      addComponents({
        '.luxury-button': {
          fontFamily: theme('fontFamily.luxury-body'),
          fontWeight: '600',
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.luxury'),
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.luxury-lg'),
          },
        },
        '.luxury-card': {
          backgroundColor: theme('colors.luxury.background-secondary'),
          borderRadius: theme('borderRadius.luxury-lg'),
          padding: theme('spacing.luxury-lg'),
          boxShadow: theme('boxShadow.luxury-md'),
          border: '1px solid rgba(184, 134, 11, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.luxury-xl'),
            borderColor: 'rgba(184, 134, 11, 0.3)',
          },
        },
        '.luxury-heading': {
          fontFamily: theme('fontFamily.luxury-heading'),
          color: theme('colors.luxury.text-primary'),
          fontWeight: '600',
        },
        '.luxury-text': {
          fontFamily: theme('fontFamily.luxury-body'),
          color: theme('colors.luxury.text-primary'),
          lineHeight: '1.6',
        },
        '.luxury-text-secondary': {
          fontFamily: theme('fontFamily.luxury-body'),
          color: theme('colors.luxury.text-secondary'),
          lineHeight: '1.6',
        },
      });
    },
  ],
};

export default config;
