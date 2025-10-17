'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LuxuryCard } from './luxury-card';
import { LuxuryButton } from './luxury-button';
import { LuxuryAnimation } from './luxury-animations';
import { Filter, X, RotateCcw, Palette, Contrast, Brightness, Blur, Crop } from 'lucide-react';

interface LuxuryImageFiltersProps {
  children: React.ReactNode;
  filters?: Array<{
    name: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
  }>;
  presets?: Array<{
    name: string;
    filters: Record<string, number>;
  }>;
  onFilterChange?: (filters: Record<string, number>) => void;
  onPresetApply?: (preset: string) => void;
  onReset?: () => void;
  className?: string;
}

export function LuxuryImageFilters({
  children,
  filters = [],
  presets = [],
  onFilterChange,
  onPresetApply,
  onReset,
  className,
}: LuxuryImageFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize filters with default values
    const initialFilters = filters.reduce((acc, filter) => {
      acc[filter.name] = filter.value;
      return acc;
    }, {} as Record<string, number>);
    setActiveFilters(initialFilters);
  }, [filters]);

  const handleFilterChange = (name: string, value: number) => {
    const newFilters = { ...activeFilters, [name]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePresetApply = (preset: { name: string; filters: Record<string, number> }) => {
    setActiveFilters(preset.filters);
    onPresetApply?.(preset.name);
  };

  const handleReset = () => {
    const resetFilters = filters.reduce((acc, filter) => {
      acc[filter.name] = filter.value;
      return acc;
    }, {} as Record<string, number>);
    setActiveFilters(resetFilters);
    onReset?.();
  };

  const generateFilterCSS = () => {
    const filterValues = Object.entries(activeFilters)
      .map(([name, value]) => {
        const filter = filters.find(f => f.name === name);
        if (!filter) return '';
        
        const unit = filter.unit || '';
        return `${name}(${value}${unit})`;
      })
      .filter(Boolean)
      .join(' ');
    
    return filterValues;
  };

  return (
    <div className={cn('relative', className)}>
      {/* Filter Toggle Button */}
      <LuxuryButton
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 z-10"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </LuxuryButton>

      {/* Filter Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 right-4 z-20 w-80"
        >
          <LuxuryCard variant="glass" className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="luxury-heading text-lg font-semibold text-luxury-text-primary">
                  Image Filters
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-luxury hover:bg-luxury-background-secondary transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-luxury-text-secondary" />
                </button>
              </div>

              {/* Presets */}
              {presets.length > 0 && (
                <div className="space-y-3">
                  <h4 className="luxury-text text-sm font-semibold text-luxury-text-primary">
                    Presets
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset, index) => (
                      <LuxuryAnimation
                        key={index}
                        animation="slideUp"
                        delay={index * 0.1}
                      >
                        <LuxuryButton
                          variant="outline"
                          size="sm"
                          onClick={() => handlePresetApply(preset)}
                          className="w-full justify-start"
                        >
                          <Palette className="w-4 h-4 mr-2" />
                          {preset.name}
                        </LuxuryButton>
                      </LuxuryAnimation>
                    ))}
                  </div>
                </div>
              )}

              {/* Filter Controls */}
              <div className="space-y-4">
                <h4 className="luxury-text text-sm font-semibold text-luxury-text-primary">
                  Adjustments
                </h4>
                {filters.map((filter, index) => (
                  <LuxuryAnimation
                    key={filter.name}
                    animation="slideUp"
                    delay={index * 0.1}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="luxury-text text-sm text-luxury-text-secondary capitalize">
                          {filter.name}
                        </label>
                        <span className="luxury-text text-sm font-semibold text-luxury-text-primary">
                          {activeFilters[filter.name] || filter.value}{filter.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={filter.min}
                        max={filter.max}
                        step={filter.step}
                        value={activeFilters[filter.name] || filter.value}
                        onChange={(e) => handleFilterChange(filter.name, Number(e.target.value))}
                        className="w-full h-2 bg-luxury-background-primary rounded-luxury appearance-none cursor-pointer slider"
                      />
                    </div>
                  </LuxuryAnimation>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-luxury-accent-copper/20">
                <LuxuryButton
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </LuxuryButton>
                <LuxuryButton
                  variant="primary"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Apply
                </LuxuryButton>
              </div>
            </div>
          </LuxuryCard>
        </motion.div>
      )}

      {/* Filtered Content */}
      <div
        style={{
          filter: generateFilterCSS(),
        }}
        className="transition-all duration-300"
      >
        {children}
      </div>
    </div>
  );
}

// Luxury Image Filter Presets
export const luxuryImageFilterPresets = {
  vintage: {
    name: 'Vintage',
    filters: {
      sepia: 0.8,
      contrast: 1.2,
      brightness: 0.9,
      saturate: 0.8,
    },
  },
  dramatic: {
    name: 'Dramatic',
    filters: {
      contrast: 1.5,
      brightness: 0.8,
      saturate: 1.3,
      hueRotate: 10,
    },
  },
  soft: {
    name: 'Soft',
    filters: {
      contrast: 0.8,
      brightness: 1.1,
      saturate: 0.7,
      blur: 0.5,
    },
  },
  warm: {
    name: 'Warm',
    filters: {
      hueRotate: 20,
      saturate: 1.2,
      brightness: 1.05,
      contrast: 1.1,
    },
  },
  cool: {
    name: 'Cool',
    filters: {
      hueRotate: -20,
      saturate: 0.8,
      brightness: 0.95,
      contrast: 1.1,
    },
  },
  monochrome: {
    name: 'Monochrome',
    filters: {
      grayscale: 1,
      contrast: 1.2,
      brightness: 0.9,
    },
  },
};

// Luxury Image Filter Component
interface LuxuryImageFilterProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  filters?: Record<string, number>;
  presets?: Array<keyof typeof luxuryImageFilterPresets>;
  className?: string;
  onFilterChange?: (filters: Record<string, number>) => void;
}

export function LuxuryImageFilter({
  src,
  alt,
  width = 400,
  height = 300,
  filters = {},
  presets = ['vintage', 'dramatic', 'soft', 'warm', 'cool', 'monochrome'],
  className,
  onFilterChange,
}: LuxuryImageFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, number>>(filters);

  const handleFilterChange = (newFilters: Record<string, number>) => {
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const generateFilterCSS = () => {
    return Object.entries(activeFilters)
      .map(([name, value]) => {
        const unit = name === 'blur' ? 'px' : name === 'hueRotate' ? 'deg' : '';
        return `${name}(${value}${unit})`;
      })
      .join(' ');
  };

  const presetOptions = presets.map(preset => luxuryImageFilterPresets[preset]);

  return (
    <LuxuryImageFilters
      filters={[
        { name: 'brightness', value: 1, min: 0, max: 2, step: 0.1 },
        { name: 'contrast', value: 1, min: 0, max: 2, step: 0.1 },
        { name: 'saturate', value: 1, min: 0, max: 2, step: 0.1 },
        { name: 'hueRotate', value: 0, min: -180, max: 180, step: 1, unit: 'deg' },
        { name: 'sepia', value: 0, min: 0, max: 1, step: 0.1 },
        { name: 'grayscale', value: 0, min: 0, max: 1, step: 0.1 },
        { name: 'blur', value: 0, min: 0, max: 10, step: 0.1, unit: 'px' },
      ]}
      presets={presetOptions}
      onFilterChange={handleFilterChange}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover rounded-luxury-lg"
        style={{
          filter: generateFilterCSS(),
        }}
      />
    </LuxuryImageFilters>
  );
}

// Luxury Image Filter Utilities
export const luxuryImageFilterUtils = {
  /**
   * Apply filter to image element
   */
  applyFilter: (img: HTMLImageElement, filters: Record<string, number>): void => {
    const filterCSS = Object.entries(filters)
      .map(([name, value]) => {
        const unit = name === 'blur' ? 'px' : name === 'hueRotate' ? 'deg' : '';
        return `${name}(${value}${unit})`;
      })
      .join(' ');
    
    img.style.filter = filterCSS;
  },

  /**
   * Reset image filters
   */
  resetFilters: (img: HTMLImageElement): void => {
    img.style.filter = 'none';
  },

  /**
   * Get current filter values from image
   */
  getCurrentFilters: (img: HTMLImageElement): Record<string, number> => {
    const filter = img.style.filter;
    if (!filter || filter === 'none') return {};
    
    const filters: Record<string, number> = {};
    const filterRegex = /(\w+)\(([^)]+)\)/g;
    let match;
    
    while ((match = filterRegex.exec(filter)) !== null) {
      const [, name, value] = match;
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        filters[name] = numericValue;
      }
    }
    
    return filters;
  },

  /**
   * Create filter preset
   */
  createPreset: (name: string, filters: Record<string, number>) => ({
    name,
    filters,
  }),

  /**
   * Merge filter presets
   */
  mergePresets: (preset1: Record<string, number>, preset2: Record<string, number>) => ({
    ...preset1,
    ...preset2,
  }),
};

// Luxury Image Filter Variants
export const LuxuryImageFilterVariants = {
  // Default luxury image filter
  Default: (props: Omit<LuxuryImageFilterProps, 'presets'>) => (
    <LuxuryImageFilter {...props} />
  ),
  
  // Vintage luxury image filter
  Vintage: (props: Omit<LuxuryImageFilterProps, 'presets'>) => (
    <LuxuryImageFilter {...props} presets={['vintage']} />
  ),
  
  // Dramatic luxury image filter
  Dramatic: (props: Omit<LuxuryImageFilterProps, 'presets'>) => (
    <LuxuryImageFilter {...props} presets={['dramatic']} />
  ),
  
  // Soft luxury image filter
  Soft: (props: Omit<LuxuryImageFilterProps, 'presets'>) => (
    <LuxuryImageFilter {...props} presets={['soft']} />
  ),
  
  // Warm luxury image filter
  Warm: (props: Omit<LuxuryImageFilterProps, 'presets'>) => (
    <LuxuryImageFilter {...props} presets={['warm']} />
  ),
  
  // Cool luxury image filter
  Cool: (props: Omit<LuxuryImageFilterProps, 'presets'>) => (
    <LuxuryImageFilter {...props} presets={['cool']} />
  ),
  
  // Monochrome luxury image filter
  Monochrome: (props: Omit<LuxuryImageFilterProps, 'presets'>) => (
    <LuxuryImageFilter {...props} presets={['monochrome']} />
  ),
};

export default LuxuryImageFilters;
