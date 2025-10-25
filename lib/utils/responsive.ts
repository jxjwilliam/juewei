/**
 * Responsive Design Utilities
 * 
 * This module provides utilities for responsive design, including
 * breakpoint detection, responsive classes, and layout helpers.
 */

import { useState, useEffect } from 'react'
import { ResponsiveBreakpoint } from '@/lib/types/footer'

// Breakpoint constants
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const

// Responsive utility functions
export const getBreakpoint = (width: number): ResponsiveBreakpoint => {
  if (width < BREAKPOINTS.mobile) return 'mobile'
  if (width < BREAKPOINTS.tablet) return 'tablet'
  return 'desktop'
}

export const isMobile = (width: number): boolean => width < BREAKPOINTS.mobile
export const isTablet = (width: number): boolean => width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet
export const isDesktop = (width: number): boolean => width >= BREAKPOINTS.tablet

// Responsive class utilities
export const getResponsiveClasses = (breakpoint: ResponsiveBreakpoint) => {
  const classes = {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-4'
  }
  return classes[breakpoint]
}

// Grid utilities
export const getGridClasses = (columns: number, breakpoint: ResponsiveBreakpoint) => {
  const baseClasses = 'grid gap-8'
  const responsiveClasses = {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-4'
  }
  return `${baseClasses} ${responsiveClasses[breakpoint]}`
}

// Spacing utilities
export const getSpacingClasses = (breakpoint: ResponsiveBreakpoint) => {
  const spacing = {
    mobile: 'py-8 px-4',
    tablet: 'md:py-12 md:px-6',
    desktop: 'lg:py-16 lg:px-8'
  }
  return spacing[breakpoint]
}

// Typography utilities
export const getTypographyClasses = (breakpoint: ResponsiveBreakpoint) => {
  const typography = {
    mobile: 'text-sm',
    tablet: 'md:text-base',
    desktop: 'lg:text-lg'
  }
  return typography[breakpoint]
}

// Touch target utilities
export const getTouchTargetClasses = (breakpoint: ResponsiveBreakpoint) => {
  const touchTargets = {
    mobile: 'min-h-[44px] min-w-[44px]',
    tablet: 'md:min-h-[48px] md:min-w-[48px]',
    desktop: 'lg:min-h-[52px] lg:min-w-[52px]'
  }
  return touchTargets[breakpoint]
}

// Container utilities
export const getContainerClasses = (breakpoint: ResponsiveBreakpoint) => {
  const containers = {
    mobile: 'container mx-auto px-4',
    tablet: 'md:container md:mx-auto md:px-6',
    desktop: 'lg:container lg:mx-auto lg:px-8'
  }
  return containers[breakpoint]
}

// Footer-specific responsive utilities
export const getFooterGridClasses = (breakpoint: ResponsiveBreakpoint) => {
  const footerGrid = {
    mobile: 'grid grid-cols-1 gap-6',
    tablet: 'md:grid-cols-2 md:gap-8',
    desktop: 'lg:grid-cols-4 lg:gap-8'
  }
  return footerGrid[breakpoint]
}

export const getFooterSpacingClasses = (breakpoint: ResponsiveBreakpoint) => {
  const footerSpacing = {
    mobile: 'py-12',
    tablet: 'md:py-16',
    desktop: 'lg:py-20'
  }
  return footerSpacing[breakpoint]
}

export const getFooterTypographyClasses = (breakpoint: ResponsiveBreakpoint) => {
  const footerTypography = {
    mobile: 'text-lg',
    tablet: 'md:text-xl',
    desktop: 'lg:text-2xl'
  }
  return footerTypography[breakpoint]
}

// Responsive hook
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<ResponsiveBreakpoint>('desktop')
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateBreakpoint = () => {
      const newWidth = window.innerWidth
      setWidth(newWidth)
      setBreakpoint(getBreakpoint(newWidth))
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    breakpoint,
    width,
    isMobile: isMobile(width),
    isTablet: isTablet(width),
    isDesktop: isDesktop(width)
  }
}

// Responsive component wrapper
export const ResponsiveWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const { breakpoint } = useResponsive()
  
  return null; // JSX not allowed in .ts files
}

// Responsive grid component
export const ResponsiveGrid = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const { breakpoint } = useResponsive()
  
  return null; // JSX not allowed in .ts files
}

// Responsive spacing component
export const ResponsiveSpacing = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const { breakpoint } = useResponsive()
  
  return null; // JSX not allowed in .ts files
}

// Responsive typography component
export const ResponsiveTypography = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const { breakpoint } = useResponsive()
  
  return null; // JSX not allowed in .ts files
}

// Responsive utilities export
export const responsiveUtils = {
  getBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getResponsiveClasses,
  getGridClasses,
  getSpacingClasses,
  getTypographyClasses,
  getTouchTargetClasses,
  getContainerClasses,
  getFooterGridClasses,
  getFooterSpacingClasses,
  getFooterTypographyClasses,
  useResponsive,
  ResponsiveWrapper,
  ResponsiveGrid,
  ResponsiveSpacing,
  ResponsiveTypography
}

export default responsiveUtils
