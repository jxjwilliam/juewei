'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LuxuryCard } from './luxury-card';
import { Loader2, Image as ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';

interface LuxuryImageLoadingProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  showProgress?: boolean;
  retryOnError?: boolean;
  maxRetries?: number;
}

export function LuxuryImageLoading({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  onLoad,
  onError,
  fallbackSrc,
  showSkeleton = true,
  showProgress = false,
  retryOnError = true,
  maxRetries = 3,
}: LuxuryImageLoadingProps) {
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setLoadingState('loading');
    setProgress(0);
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = () => {
    setLoadingState('loaded');
    setProgress(100);
    onLoad?.();
  };

  const handleError = () => {
    if (retryOnError && retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setProgress(0);
      // Retry with exponential backoff
      setTimeout(() => {
        setCurrentSrc(`${src}?retry=${retryCount + 1}&t=${Date.now()}`);
      }, Math.pow(2, retryCount) * 1000);
    } else {
      setLoadingState('error');
      onError?.();
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setProgress(0);
    setCurrentSrc(src);
  };

  const handleProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      setProgress(percentComplete);
    }
  };

  return (
    <div className={cn('relative overflow-hidden rounded-luxury-lg', className)}>
      {/* Loading Skeleton */}
      {loadingState === 'loading' && showSkeleton && (
        <LuxuryCard variant="glass" className="w-full h-full p-0">
          <div className="relative w-full h-full bg-luxury-background-secondary/20">
            {/* Skeleton Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-accent-copper/20 to-transparent animate-pulse" />
            
            {/* Loading Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-luxury-accent-copper animate-spin mx-auto mb-2" />
                <p className="luxury-text text-sm text-luxury-text-secondary">Loading image...</p>
              </div>
            </div>

            {/* Progress Bar */}
            {showProgress && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="w-full bg-luxury-background-primary/20 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
                <p className="luxury-text text-xs text-luxury-text-secondary mt-1 text-center">
                  {Math.round(progress)}%
                </p>
              </div>
            )}
          </div>
        </LuxuryCard>
      )}

      {/* Error State */}
      {loadingState === 'error' && (
        <LuxuryCard variant="glass" className="w-full h-full p-0">
          <div className="relative w-full h-full bg-luxury-background-secondary/20 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-luxury-spice mx-auto mb-4" />
              <p className="luxury-text text-sm text-luxury-text-secondary mb-4">
                Failed to load image
              </p>
              {retryOnError && retryCount < maxRetries && (
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-luxury-accent-copper text-white rounded-luxury hover:bg-luxury-accent-gold transition-all duration-200 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry ({retryCount}/{maxRetries})
                </button>
              )}
              {fallbackSrc && (
                <button
                  onClick={() => setCurrentSrc(fallbackSrc)}
                  className="mt-2 px-4 py-2 bg-luxury-background-secondary text-luxury-text-primary rounded-luxury hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
                >
                  Use Fallback
                </button>
              )}
            </div>
          </div>
        </LuxuryCard>
      )}

      {/* Loaded Image */}
      {loadingState === 'loaded' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-cover"
            onLoad={handleLoad}
            onError={handleError}
            onProgress={handleProgress}
          />
        </motion.div>
      )}
    </div>
  );
}

// Luxury Image Skeleton
interface LuxuryImageSkeletonProps {
  width?: number;
  height?: number;
  variant?: 'default' | 'card' | 'hero' | 'thumbnail';
  className?: string;
}

export function LuxuryImageSkeleton({
  width = 400,
  height = 300,
  variant = 'default',
  className,
}: LuxuryImageSkeletonProps) {
  const variants = {
    default: 'rounded-luxury-lg',
    card: 'rounded-luxury-md',
    hero: 'rounded-luxury-xl',
    thumbnail: 'rounded-luxury-sm',
  };

  return (
    <LuxuryCard
      variant="glass"
      className={cn(
        'w-full h-full p-0 overflow-hidden',
        variants[variant],
        className
      )}
      style={{ width, height }}
    >
      <div className="relative w-full h-full bg-luxury-background-secondary/20">
        {/* Skeleton Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-accent-copper/20 to-transparent animate-pulse" />
        
        {/* Skeleton Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-8 h-8 text-luxury-accent-copper/50 mx-auto mb-2" />
            <p className="luxury-text text-xs text-luxury-text-secondary">Loading...</p>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
}

// Luxury Image Progress
interface LuxuryImageProgressProps {
  progress: number;
  showPercentage?: boolean;
  variant?: 'default' | 'minimal' | 'detailed';
  className?: string;
}

export function LuxuryImageProgress({
  progress,
  showPercentage = true,
  variant = 'default',
  className,
}: LuxuryImageProgressProps) {
  const variants = {
    default: 'p-4',
    minimal: 'p-2',
    detailed: 'p-6',
  };

  return (
    <LuxuryCard
      variant="glass"
      className={cn(
        'w-full',
        variants[variant],
        className
      )}
    >
      <div className="space-y-2">
        {/* Progress Bar */}
        <div className="w-full bg-luxury-background-primary/20 rounded-full h-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        
        {/* Progress Text */}
        {showPercentage && (
          <div className="flex justify-between items-center">
            <span className="luxury-text text-sm text-luxury-text-secondary">
              Loading image...
            </span>
            <span className="luxury-text text-sm font-semibold text-luxury-text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </LuxuryCard>
  );
}

// Luxury Image Error
interface LuxuryImageErrorProps {
  error?: string;
  onRetry?: () => void;
  onFallback?: () => void;
  showRetry?: boolean;
  showFallback?: boolean;
  className?: string;
}

export function LuxuryImageError({
  error = 'Failed to load image',
  onRetry,
  onFallback,
  showRetry = true,
  showFallback = true,
  className,
}: LuxuryImageErrorProps) {
  return (
    <LuxuryCard
      variant="glass"
      className={cn(
        'w-full h-full flex items-center justify-center p-8',
        className
      )}
    >
      <div className="text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-luxury-spice mx-auto" />
        <div>
          <h3 className="luxury-heading text-lg font-semibold text-luxury-text-primary mb-2">
            Image Error
          </h3>
          <p className="luxury-text text-sm text-luxury-text-secondary">
            {error}
          </p>
        </div>
        
        <div className="flex gap-2 justify-center">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 bg-luxury-accent-copper text-white rounded-luxury hover:bg-luxury-accent-gold transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          )}
          
          {showFallback && onFallback && (
            <button
              onClick={onFallback}
              className="px-4 py-2 bg-luxury-background-secondary text-luxury-text-primary rounded-luxury hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
            >
              Use Fallback
            </button>
          )}
        </div>
      </div>
    </LuxuryCard>
  );
}

// Luxury Image Loading States
export const luxuryImageLoadingStates = {
  loading: 'luxury-image-loading',
  loaded: 'luxury-image-loaded',
  error: 'luxury-image-error',
  skeleton: 'luxury-image-skeleton',
  progress: 'luxury-image-progress',
};

// Luxury Image Loading Utilities
export const luxuryImageLoadingUtils = {
  /**
   * Check if image is loaded
   */
  isImageLoaded: (img: HTMLImageElement): boolean => {
    return img.complete && img.naturalHeight !== 0;
  },

  /**
   * Preload image with progress tracking
   */
  preloadImage: (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  /**
   * Get image loading progress
   */
  getImageProgress: (img: HTMLImageElement): number => {
    if (img.complete) return 100;
    if (img.naturalHeight === 0) return 0;
    return (img.naturalHeight / img.naturalHeight) * 100;
  },

  /**
   * Create image loading state
   */
  createLoadingState: (state: 'loading' | 'loaded' | 'error') => ({
    state,
    timestamp: Date.now(),
  }),
};

export default LuxuryImageLoading;
