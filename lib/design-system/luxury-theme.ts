/**
 * Luxury Color Theme System
 * 
 * Provides comprehensive theme management for the luxury design system,
 * including theme switching, customization, and persistence.
 */

import { luxuryColorPalettes, luxuryColorThemes } from './luxury-color-variants';

// Theme types
export type ThemeType = 'light' | 'dark' | 'luxury' | 'warm' | 'cool' | 'custom';
export type ThemeMode = 'light' | 'dark' | 'auto';

// Theme configuration
export interface ThemeConfig {
  name: string;
  type: ThemeType;
  mode: ThemeMode;
  colors: Record<string, string>;
  customProperties: Record<string, string>;
  description?: string;
}

// Theme state
export interface ThemeState {
  current: ThemeConfig;
  available: ThemeConfig[];
  isSystemTheme: boolean;
  isCustomTheme: boolean;
}

// Luxury theme system
export class LuxuryThemeSystem {
  private static instance: LuxuryThemeSystem;
  private themes: Map<string, ThemeConfig> = new Map();
  private currentTheme: ThemeConfig;
  private listeners: Set<(theme: ThemeConfig) => void> = new Set();

  constructor() {
    this.initializeDefaultThemes();
    this.currentTheme = this.getTheme('luxury') || this.getDefaultTheme();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): LuxuryThemeSystem {
    if (!LuxuryThemeSystem.instance) {
      LuxuryThemeSystem.instance = new LuxuryThemeSystem();
    }
    return LuxuryThemeSystem.instance;
  }

  /**
   * Initialize default themes
   */
  private initializeDefaultThemes(): void {
    // Luxury theme
    this.addTheme({
      name: 'Luxury',
      type: 'luxury',
      mode: 'dark',
      colors: luxuryColorPalettes.primary,
      customProperties: {
        '--luxury-bg-primary': '#1A1A1A',
        '--luxury-bg-secondary': '#2A2A2A',
        '--luxury-accent-copper': '#B8860B',
        '--luxury-accent-gold': '#D4AF37',
        '--luxury-spice': '#D43D2A',
        '--luxury-text-primary': '#F5F5F5',
        '--luxury-text-secondary': '#CCCCCC',
      },
      description: 'Classic luxury theme with deep charcoal backgrounds and warm copper accents',
    });

    // Dark theme
    this.addTheme({
      name: 'Dark',
      type: 'dark',
      mode: 'dark',
      colors: luxuryColorPalettes.alternative.dark,
      customProperties: {
        '--luxury-bg-primary': '#0F0F0F',
        '--luxury-bg-secondary': '#1F1F1F',
        '--luxury-accent-copper': '#C9A96E',
        '--luxury-accent-gold': '#E6C547',
        '--luxury-spice': '#E74C3C',
        '--luxury-text-primary': '#FFFFFF',
        '--luxury-text-secondary': '#E0E0E0',
      },
      description: 'Ultra-dark luxury theme for maximum contrast and sophistication',
    });

    // Warm theme
    this.addTheme({
      name: 'Warm',
      type: 'warm',
      mode: 'dark',
      colors: luxuryColorPalettes.alternative.warm,
      customProperties: {
        '--luxury-bg-primary': '#2D1B1B',
        '--luxury-bg-secondary': '#3D2B2B',
        '--luxury-accent-copper': '#D2691E',
        '--luxury-accent-gold': '#FFD700',
        '--luxury-spice': '#DC143C',
        '--luxury-text-primary': '#FFF8DC',
        '--luxury-text-secondary': '#F5F5DC',
      },
      description: 'Warm luxury theme with rich browns and golden accents',
    });

    // Cool theme
    this.addTheme({
      name: 'Cool',
      type: 'cool',
      mode: 'dark',
      colors: luxuryColorPalettes.alternative.cool,
      customProperties: {
        '--luxury-bg-primary': '#1B1B2D',
        '--luxury-bg-secondary': '#2B2B3D',
        '--luxury-accent-copper': '#8B7D6B',
        '--luxury-accent-gold': '#B8860B',
        '--luxury-spice': '#B22222',
        '--luxury-text-primary': '#F0F8FF',
        '--luxury-text-secondary': '#E6E6FA',
      },
      description: 'Cool luxury theme with blue undertones and sophisticated grays',
    });
  }

  /**
   * Add theme
   */
  addTheme(theme: ThemeConfig): void {
    this.themes.set(theme.name, theme);
  }

  /**
   * Get theme
   */
  getTheme(name: string): ThemeConfig | undefined {
    return this.themes.get(name);
  }

  /**
   * Get all themes
   */
  getAllThemes(): ThemeConfig[] {
    return Array.from(this.themes.values());
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): ThemeConfig {
    return this.currentTheme;
  }

  /**
   * Set current theme
   */
  setCurrentTheme(name: string): boolean {
    const theme = this.getTheme(name);
    if (!theme) return false;

    this.currentTheme = theme;
    this.applyTheme(theme);
    this.notifyListeners(theme);
    this.saveTheme(name);
    return true;
  }

  /**
   * Apply theme
   */
  private applyTheme(theme: ThemeConfig): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Apply custom properties
    Object.entries(theme.customProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply theme class
    root.className = root.className.replace(/luxury-theme-\w+/g, '');
    root.classList.add(`luxury-theme-${theme.type}`);

    // Apply theme mode
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  /**
   * Create custom theme
   */
  createCustomTheme(
    name: string,
    colors: Record<string, string>,
    customProperties: Record<string, string>
  ): ThemeConfig {
    const theme: ThemeConfig = {
      name,
      type: 'custom',
      mode: 'dark',
      colors,
      customProperties,
      description: 'Custom luxury theme',
    };

    this.addTheme(theme);
    return theme;
  }

  /**
   * Update theme
   */
  updateTheme(name: string, updates: Partial<ThemeConfig>): boolean {
    const theme = this.getTheme(name);
    if (!theme) return false;

    const updatedTheme = { ...theme, ...updates };
    this.themes.set(name, updatedTheme);

    if (this.currentTheme.name === name) {
      this.currentTheme = updatedTheme;
      this.applyTheme(updatedTheme);
      this.notifyListeners(updatedTheme);
    }

    return true;
  }

  /**
   * Delete theme
   */
  deleteTheme(name: string): boolean {
    if (this.currentTheme.name === name) return false;
    
    return this.themes.delete(name);
  }

  /**
   * Get default theme
   */
  getDefaultTheme(): ThemeConfig {
    return this.getTheme('Luxury') || this.getAllThemes()[0];
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(name: string): void {
    if (typeof localStorage === 'undefined') return;
    
    try {
      localStorage.setItem('luxury-theme', name);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  /**
   * Load theme from localStorage
   */
  loadTheme(): string | null {
    if (typeof localStorage === 'undefined') return null;
    
    try {
      return localStorage.getItem('luxury-theme');
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      return null;
    }
  }

  /**
   * Initialize theme system
   */
  initialize(): void {
    const savedTheme = this.loadTheme();
    if (savedTheme && this.getTheme(savedTheme)) {
      this.setCurrentTheme(savedTheme);
    } else {
      this.setCurrentTheme('Luxury');
    }
  }

  /**
   * Subscribe to theme changes
   */
  subscribe(listener: (theme: ThemeConfig) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify listeners
   */
  private notifyListeners(theme: ThemeConfig): void {
    this.listeners.forEach(listener => listener(theme));
  }

  /**
   * Get theme state
   */
  getThemeState(): ThemeState {
    return {
      current: this.currentTheme,
      available: this.getAllThemes(),
      isSystemTheme: this.currentTheme.type !== 'custom',
      isCustomTheme: this.currentTheme.type === 'custom',
    };
  }

  /**
   * Reset to default theme
   */
  resetToDefault(): void {
    this.setCurrentTheme('Luxury');
  }

  /**
   * Export theme
   */
  exportTheme(name: string): string | null {
    const theme = this.getTheme(name);
    if (!theme) return null;

    return JSON.stringify(theme, null, 2);
  }

  /**
   * Import theme
   */
  importTheme(themeJson: string): boolean {
    try {
      const theme = JSON.parse(themeJson) as ThemeConfig;
      this.addTheme(theme);
      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  }
}

// Luxury theme utilities
export const luxuryThemeUtils = {
  /**
   * Get theme system instance
   */
  getInstance: () => LuxuryThemeSystem.getInstance(),

  /**
   * Set theme
   */
  setTheme: (name: string) => {
    const system = LuxuryThemeSystem.getInstance();
    return system.setCurrentTheme(name);
  },

  /**
   * Get current theme
   */
  getCurrentTheme: () => {
    const system = LuxuryThemeSystem.getInstance();
    return system.getCurrentTheme();
  },

  /**
   * Get all themes
   */
  getAllThemes: () => {
    const system = LuxuryThemeSystem.getInstance();
    return system.getAllThemes();
  },

  /**
   * Create custom theme
   */
  createCustomTheme: (name: string, colors: Record<string, string>, customProperties: Record<string, string>) => {
    const system = LuxuryThemeSystem.getInstance();
    return system.createCustomTheme(name, colors, customProperties);
  },

  /**
   * Subscribe to theme changes
   */
  subscribe: (listener: (theme: ThemeConfig) => void) => {
    const system = LuxuryThemeSystem.getInstance();
    return system.subscribe(listener);
  },

  /**
   * Initialize theme system
   */
  initialize: () => {
    const system = LuxuryThemeSystem.getInstance();
    return system.initialize();
  },
};

// Luxury theme presets
export const luxuryThemePresets = {
  // Default luxury theme
  luxury: {
    name: 'Luxury',
    type: 'luxury' as ThemeType,
    mode: 'dark' as ThemeMode,
    colors: luxuryColorPalettes.primary,
    customProperties: {
      '--luxury-bg-primary': '#1A1A1A',
      '--luxury-bg-secondary': '#2A2A2A',
      '--luxury-accent-copper': '#B8860B',
      '--luxury-accent-gold': '#D4AF37',
      '--luxury-spice': '#D43D2A',
      '--luxury-text-primary': '#F5F5F5',
      '--luxury-text-secondary': '#CCCCCC',
    },
  },
  
  // Dark theme
  dark: {
    name: 'Dark',
    type: 'dark' as ThemeType,
    mode: 'dark' as ThemeMode,
    colors: luxuryColorPalettes.alternative.dark,
    customProperties: {
      '--luxury-bg-primary': '#0F0F0F',
      '--luxury-bg-secondary': '#1F1F1F',
      '--luxury-accent-copper': '#C9A96E',
      '--luxury-accent-gold': '#E6C547',
      '--luxury-spice': '#E74C3C',
      '--luxury-text-primary': '#FFFFFF',
      '--luxury-text-secondary': '#E0E0E0',
    },
  },
  
  // Warm theme
  warm: {
    name: 'Warm',
    type: 'warm' as ThemeType,
    mode: 'dark' as ThemeMode,
    colors: luxuryColorPalettes.alternative.warm,
    customProperties: {
      '--luxury-bg-primary': '#2D1B1B',
      '--luxury-bg-secondary': '#3D2B2B',
      '--luxury-accent-copper': '#D2691E',
      '--luxury-accent-gold': '#FFD700',
      '--luxury-spice': '#DC143C',
      '--luxury-text-primary': '#FFF8DC',
      '--luxury-text-secondary': '#F5F5DC',
    },
  },
  
  // Cool theme
  cool: {
    name: 'Cool',
    type: 'cool' as ThemeType,
    mode: 'dark' as ThemeMode,
    colors: luxuryColorPalettes.alternative.cool,
    customProperties: {
      '--luxury-bg-primary': '#1B1B2D',
      '--luxury-bg-secondary': '#2B2B3D',
      '--luxury-accent-copper': '#8B7D6B',
      '--luxury-accent-gold': '#B8860B',
      '--luxury-spice': '#B22222',
      '--luxury-text-primary': '#F0F8FF',
      '--luxury-text-secondary': '#E6E6FA',
    },
  },
};

// Export all utilities
export default {
  LuxuryThemeSystem,
  luxuryThemeUtils,
  luxuryThemePresets,
};
