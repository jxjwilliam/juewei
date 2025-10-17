/**
 * Luxury Font Loading System
 * 
 * Configures Google Fonts for luxury typography (Playfair Display + Inter)
 * with progressive enhancement and fallback systems.
 */

import { Playfair_Display, Inter } from 'next/font/google';

// Luxury serif font for headings
export const luxuryHeadingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-luxury-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

// Luxury sans-serif font for body text
export const luxuryBodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-luxury-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
});

// Font loading utilities
export const luxuryFontUtils = {
  /**
   * Get font CSS variables for Tailwind
   */
  getFontVariables: () => ({
    '--font-luxury-heading': luxuryHeadingFont.variable,
    '--font-luxury-body': luxuryBodyFont.variable,
  }),

  /**
   * Get font class names for components
   */
  getFontClasses: () => ({
    heading: `${luxuryHeadingFont.variable} font-luxury-heading`,
    body: `${luxuryBodyFont.variable} font-luxury-body`,
  }),

  /**
   * Check if fonts are loaded
   */
  isFontLoaded: (fontFamily: string): boolean => {
    if (typeof document === 'undefined') return false;
    
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return false;
      
      // Test font loading by comparing metrics
      context.font = `12px ${fontFamily}`;
      const testText = 'Test';
      const metrics1 = context.measureText(testText);
      
      context.font = '12px monospace';
      const metrics2 = context.measureText(testText);
      
      return metrics1.width !== metrics2.width;
    } catch {
      return false;
    }
  },

  /**
   * Generate font loading CSS
   */
  generateFontLoadingCSS: () => {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      
      .font-luxury-heading {
        font-family: var(--font-luxury-heading), 'Playfair Display', 'Lora', 'Merriweather', serif;
      }
      
      .font-luxury-body {
        font-family: var(--font-luxury-body), 'Inter', 'Montserrat', 'Roboto', sans-serif;
      }
      
      /* Font loading optimization */
      .font-luxury-heading,
      .font-luxury-body {
        font-display: swap;
      }
      
      /* Fallback fonts for better performance */
      .font-luxury-heading {
        font-family: var(--font-luxury-heading), 'Playfair Display', 'Lora', 'Merriweather', 'Times New Roman', serif;
      }
      
      .font-luxury-body {
        font-family: var(--font-luxury-body), 'Inter', 'Montserrat', 'Roboto', 'Arial', sans-serif;
      }
    `;
  },

  /**
   * Preload critical fonts
   */
  preloadFonts: () => {
    if (typeof document === 'undefined') return;
    
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800&display=swap';
    preloadLink.as = 'style';
    preloadLink.crossOrigin = 'anonymous';
    
    document.head.appendChild(preloadLink);
  },

  /**
   * Generate font loading script
   */
  generateFontLoadingScript: () => {
    return `
      <script>
        // Preload luxury fonts
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800&display=swap';
        preloadLink.as = 'style';
        preloadLink.crossOrigin = 'anonymous';
        document.head.appendChild(preloadLink);
        
        // Font loading detection
        function checkFontLoaded(fontFamily) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) return false;
          
          context.font = '12px ' + fontFamily;
          const testText = 'Test';
          const metrics1 = context.measureText(testText);
          
          context.font = '12px monospace';
          const metrics2 = context.measureText(testText);
          
          return metrics1.width !== metrics2.width;
        }
        
        // Wait for fonts to load
        document.fonts.ready.then(() => {
          console.log('Luxury fonts loaded successfully');
        });
      </script>
    `;
  },
};

// Export font configurations
export const luxuryFonts = {
  heading: luxuryHeadingFont,
  body: luxuryBodyFont,
  utils: luxuryFontUtils,
};

export default luxuryFonts;
