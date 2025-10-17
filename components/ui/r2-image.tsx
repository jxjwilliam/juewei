'use client';

import Image from 'next/image';
import { getImageUrlWithFallback, getFallbackUrl } from '@/lib/r2';
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
  version,
  fallback = true,
  onError,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(() => {
    // Use local fallback for now since R2 upload needs investigation
    console.log('Using local fallback for image:', src);
    return getFallbackUrl(src);
  });

  // Handle error with fail-silent approach
  const handleError = () => {
    if (!imageError && fallback) {
      // Try local fallback
      const localUrl = getFallbackUrl(src);
      console.warn('Image failed to load, using local fallback:', src, '->', localUrl);
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
    
    // Use local fallback for now since R2 upload needs investigation
    console.log('Using local fallback for image:', src);
    setCurrentSrc(getFallbackUrl(src));
  }, [src]);

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
