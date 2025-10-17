'use client';

import Image from 'next/image';
import { getImageUrlWithFallback, getFallbackUrl } from '@/lib/r2-image';
import React, { useState, useEffect } from 'react';

interface R2ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  version?: string;           // Cache busting timestamp
  fallback?: boolean;        // Enable local fallback
  onError?: (error: Error) => void;
}

export const R2Image: React.FC<R2ImageProps> = ({ 
  src, 
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 75,
  // version, // Unused for now
  fallback = true,
  onError,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(() => {
    // Check if R2 is configured, if not, use local fallback immediately
    if (!process.env.NEXT_PUBLIC_R2_BASE_URL) {
      console.warn('R2 not configured, using local fallback for:', src);
      return getFallbackUrl(src);
    }
    
    try {
      return getImageUrlWithFallback(src);
    } catch (error) {
      console.warn('Failed to generate R2 URL, using fallback:', error);
      return getFallbackUrl(src);
    }
  });

  // Handle error with fail-silent approach
  const handleError = (_e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!imageError && fallback) {
      // Try local fallback
      const localUrl = getFallbackUrl(src);
      console.warn('R2 image failed to load, using local fallback:', src, '->', localUrl);
      setCurrentSrc(localUrl);
      setImageError(false); // Reset error state for fallback attempt
    } else {
      // Fail silently (show broken image icon)
      console.error('Image failed to load:', src);
      setImageError(true);
      onError?.(new Error(`Failed to load image: ${src}`));
    }
  };

  // Reset error state when src changes
  useEffect(() => {
    setImageError(false);
    
    // Check if R2 is configured, if not, use local fallback immediately
    if (!process.env.NEXT_PUBLIC_R2_BASE_URL) {
      setCurrentSrc(getFallbackUrl(src));
      return;
    }
    
    try {
      const newSrc = getImageUrlWithFallback(src);
      setCurrentSrc(newSrc);
      
      // Add timeout-based fallback for R2 URLs
      if (newSrc.includes('r2.dev')) {
        const timeout = setTimeout(() => {
          console.warn('R2 image timeout, falling back to local:', src);
          setCurrentSrc(getFallbackUrl(src));
        }, 3000); // 3 second timeout
        
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.warn('Failed to generate R2 URL, using fallback:', error);
      setCurrentSrc(getFallbackUrl(src));
    }
  }, [src, imageError]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      priority={priority}
      quality={quality}
      onError={handleError}
      onLoad={() => {
        // Reset error state on successful load
        if (imageError) {
          setImageError(false);
        }
      }}
      {...props}
    />
  );
};

export default R2Image;
