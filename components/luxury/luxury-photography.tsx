'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { LuxuryAnimation } from './luxury-animations';
import { LuxuryCard } from './luxury-card';
import { R2Image } from '@/components/ui/r2-image';
import { Zoom, Heart, Share2, Download, Eye, Star, Award, Shield } from 'lucide-react';

interface LuxuryProductPhotoProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  price?: string;
  rating?: number;
  badges?: string[];
  width?: number;
  height?: number;
  variant?: 'default' | 'elevated' | 'glass' | 'minimal' | 'hero' | 'showcase';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'wide' | 'ultrawide';
  showOverlay?: boolean;
  showActions?: boolean;
  showRating?: boolean;
  showBadges?: boolean;
  className?: string;
  onImageClick?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}

export function LuxuryProductPhoto({
  src,
  alt,
  title,
  description,
  price,
  rating = 5,
  badges = [],
  width = 400,
  height = 300,
  variant = 'default',
  size = 'md',
  aspectRatio = 'landscape',
  showOverlay = true,
  showActions = true,
  showRating = true,
  showBadges = true,
  className,
  onImageClick,
  onFavorite,
  onShare,
  onDownload,
}: LuxuryProductPhotoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const variants = {
    default: 'luxury-card',
    elevated: 'luxury-card-elevated',
    glass: 'luxury-card-glass',
    minimal: 'luxury-card-minimal',
    hero: 'luxury-card-hero',
    showcase: 'luxury-card-showcase',
  };

  const sizes = {
    sm: 'w-48 h-36',
    md: 'w-64 h-48',
    lg: 'w-80 h-60',
    xl: 'w-96 h-72',
  };

  const aspectRatios = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
    ultrawide: 'aspect-[21/9]',
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative group overflow-hidden rounded-luxury-lg',
        sizes[size],
        aspectRatios[aspectRatio],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <LuxuryCard
        variant={variant === 'glass' ? 'glass' : variant === 'elevated' ? 'elevated' : 'default'}
        className="p-0 h-full"
      >
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          <R2Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500',
              isHovered && 'scale-105'
            )}
            priority={variant === 'hero'}
          />

          {/* Luxury Overlay */}
          {showOverlay && (
            <div className={cn(
              'absolute inset-0 bg-gradient-to-t from-luxury-background-primary/80 via-transparent to-transparent',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            )} />

          {/* Badges */}
          {showBadges && badges.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <LuxuryAnimation key={index} animation="slideUp" delay={index * 0.1}>
                  <LuxuryCard variant="glass" className="px-2 py-1 text-xs font-semibold text-luxury-text-primary">
                    {badge}
                  </LuxuryCard>
                </LuxuryAnimation>
              ))}
            </div>
          )}

          {/* Actions Overlay */}
          {showActions && (
            <div className={cn(
              'absolute inset-0 flex items-center justify-center',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            )}>
              <div className="flex gap-2">
                <motion.button
                  onClick={onImageClick}
                  className="p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={handleFavorite}
                  className={cn(
                    'p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full transition-all duration-200',
                    isFavorite ? 'text-luxury-spice' : 'text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
                </motion.button>
                
                <motion.button
                  onClick={onShare}
                  className="p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={onDownload}
                  className="p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Content Overlay */}
          {(title || description || price) && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-luxury-background-primary/90 to-transparent">
              {title && (
                <h3 className="luxury-heading text-lg font-semibold text-luxury-text-primary mb-1">
                  {title}
                </h3>
              )}
              {description && (
                <p className="luxury-text text-sm text-luxury-text-secondary mb-2">
                  {description}
                </p>
              )}
              {price && (
                <p className="luxury-text text-lg font-bold text-luxury-accent-copper">
                  {price}
                </p>
              )}
              {showRating && (
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < rating ? 'text-luxury-accent-gold fill-current' : 'text-luxury-text-secondary'
                      )}
                    />
                  ))}
                  <span className="luxury-text text-sm text-luxury-text-secondary ml-1">
                    ({rating})
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </LuxuryCard>
    </motion.div>
  );
}

// Luxury product showcase
interface LuxuryProductShowcaseProps {
  featured: {
    src: string;
    alt: string;
    title: string;
    description: string;
    price: string;
    rating: number;
    badges: string[];
  };
  gallery: Array<{
    src: string;
    alt: string;
    title?: string;
    price?: string;
  }>;
  className?: string;
  onImageClick?: (index: number) => void;
}

export function LuxuryProductShowcase({
  featured,
  gallery,
  className,
  onImageClick,
}: LuxuryProductShowcaseProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Featured Product */}
      <LuxuryAnimation animation="slideUp" delay={0.2}>
        <LuxuryProductPhoto
          src={featured.src}
          alt={featured.alt}
          title={featured.title}
          description={featured.description}
          price={featured.price}
          rating={featured.rating}
          badges={featured.badges}
          variant="showcase"
          size="xl"
          aspectRatio="wide"
          className="w-full"
        />
      </LuxuryAnimation>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((product, index) => (
          <LuxuryAnimation
            key={index}
            animation="slideUp"
            delay={0.4 + index * 0.1}
          >
            <LuxuryProductPhoto
              src={product.src}
              alt={product.alt}
              title={product.title}
              price={product.price}
              onImageClick={() => onImageClick?.(index)}
            />
          </LuxuryAnimation>
        ))}
      </div>
    </div>
  );
}

// Luxury product carousel
interface LuxuryProductCarouselProps {
  products: Array<{
    src: string;
    alt: string;
    title: string;
    description: string;
    price: string;
    rating: number;
    badges: string[];
  }>;
  autoplay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  variant?: 'default' | 'minimal' | 'hero';
  className?: string;
  onImageClick?: (index: number) => void;
}

export function LuxuryProductCarousel({
  products,
  autoplay = true,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  variant = 'default',
  className,
  onImageClick,
}: LuxuryProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const variants = {
    default: 'h-96',
    minimal: 'h-64',
    hero: 'h-screen',
  };

  return (
    <div className={cn(
      'relative overflow-hidden rounded-luxury-lg',
      variants[variant],
      className
    )}>
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <LuxuryProductPhoto
              src={product.src}
              alt={product.alt}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={product.rating}
              badges={product.badges}
              variant="hero"
              size="xl"
              aspectRatio="wide"
              className="w-full h-full"
              onImageClick={() => onImageClick?.(index)}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && products.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && products.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                index === currentIndex
                  ? 'bg-luxury-accent-copper'
                  : 'bg-luxury-text-secondary/50 hover:bg-luxury-text-secondary'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Luxury product grid
interface LuxuryProductGridProps {
  products: Array<{
    src: string;
    alt: string;
    title: string;
    description: string;
    price: string;
    rating: number;
    badges: string[];
  }>;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'masonry' | 'grid';
  className?: string;
  onImageClick?: (index: number) => void;
}

export function LuxuryProductGrid({
  products,
  columns = 4,
  gap = 'lg',
  variant = 'default',
  className,
  onImageClick,
}: LuxuryProductGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
  };

  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const variants = {
    default: 'grid',
    masonry: 'columns-1 md:columns-2 lg:columns-3 xl:columns-4',
    grid: 'grid',
  };

  return (
    <div className={cn(
      variants[variant],
      variant === 'grid' && columnClasses[columns],
      gaps[gap],
      className
    )}>
      {products.map((product, index) => (
        <LuxuryAnimation
          key={index}
          animation="slideUp"
          delay={index * 0.1}
        >
          <LuxuryProductPhoto
            src={product.src}
            alt={product.alt}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
            badges={product.badges}
            onImageClick={() => onImageClick?.(index)}
            className="mb-4"
          />
        </LuxuryAnimation>
      ))}
    </div>
  );
}

// Luxury product photography variants
export const LuxuryProductPhotographyVariants = {
  // Default luxury product photo
  Default: (props: Omit<LuxuryProductPhotoProps, 'variant'>) => (
    <LuxuryProductPhoto {...props} variant="default" />
  ),
  
  // Elevated luxury product photo
  Elevated: (props: Omit<LuxuryProductPhotoProps, 'variant'>) => (
    <LuxuryProductPhoto {...props} variant="elevated" />
  ),
  
  // Glass luxury product photo
  Glass: (props: Omit<LuxuryProductPhotoProps, 'variant'>) => (
    <LuxuryProductPhoto {...props} variant="glass" />
  ),
  
  // Minimal luxury product photo
  Minimal: (props: Omit<LuxuryProductPhotoProps, 'variant'>) => (
    <LuxuryProductPhoto {...props} variant="minimal" />
  ),
  
  // Hero luxury product photo
  Hero: (props: Omit<LuxuryProductPhotoProps, 'variant'>) => (
    <LuxuryProductPhoto {...props} variant="hero" />
  ),
  
  // Showcase luxury product photo
  Showcase: (props: Omit<LuxuryProductPhotoProps, 'variant'>) => (
    <LuxuryProductPhoto {...props} variant="showcase" />
  ),
};

export default LuxuryProductPhoto;
