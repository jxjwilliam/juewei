'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { LuxuryAnimation } from './luxury-animations';
import { LuxuryCard } from './luxury-card';
import { R2Image } from '@/components/ui/r2-image';
import { Zoom, Heart, Share2, Download, Eye, X, ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';

interface LuxuryGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
  }>;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'grid' | 'masonry' | 'carousel' | 'lightbox';
  showFilters?: boolean;
  showSearch?: boolean;
  showLightbox?: boolean;
  className?: string;
  onImageClick?: (index: number) => void;
}

export function LuxuryGallery({
  images,
  columns = 4,
  gap = 'lg',
  variant = 'grid',
  showFilters = true,
  showSearch = true,
  showLightbox = true,
  className,
  onImageClick,
}: LuxuryGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];

  // Filter images based on search and category
  const filteredImages = images.filter(img => {
    const matchesSearch = !searchTerm || 
      img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
    grid: 'grid',
    masonry: 'columns-1 md:columns-2 lg:columns-3 xl:columns-4',
    carousel: 'flex overflow-x-auto',
    lightbox: 'grid',
  };

  const handleImageClick = (index: number) => {
    if (showLightbox) {
      setSelectedImage(index);
    }
    onImageClick?.(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Gallery Controls */}
      {(showFilters || showSearch) && (
        <LuxuryAnimation animation="slideDown" delay={0.2}>
          <LuxuryCard variant="glass" className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              {showSearch && (
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-luxury-background-secondary/50 border border-luxury-accent-copper/30 rounded-luxury text-luxury-text-primary placeholder-luxury-text-secondary focus:outline-none focus:ring-2 focus:ring-luxury-accent-copper/50"
                  />
                </div>
              )}

              {/* Filters */}
              {showFilters && (
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Category Filter */}
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          'px-3 py-1 rounded-luxury text-sm font-medium transition-all duration-200',
                          selectedCategory === category
                            ? 'bg-luxury-accent-copper text-white'
                            : 'bg-luxury-background-secondary/50 text-luxury-text-secondary hover:bg-luxury-accent-copper hover:text-white'
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        'p-2 rounded-luxury transition-all duration-200',
                        viewMode === 'grid'
                          ? 'bg-luxury-accent-copper text-white'
                          : 'bg-luxury-background-secondary/50 text-luxury-text-secondary hover:bg-luxury-accent-copper hover:text-white'
                      )}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        'p-2 rounded-luxury transition-all duration-200',
                        viewMode === 'list'
                          ? 'bg-luxury-accent-copper text-white'
                          : 'bg-luxury-background-secondary/50 text-luxury-text-secondary hover:bg-luxury-accent-copper hover:text-white'
                      )}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </LuxuryCard>
        </LuxuryAnimation>
      )}

      {/* Gallery Grid */}
      <div
        ref={ref}
        className={cn(
          variants[variant],
          variant === 'grid' && columnClasses[columns],
          gaps[gap],
          viewMode === 'list' && 'flex flex-col space-y-4'
        )}
      >
        {filteredImages.map((image, index) => (
          <LuxuryAnimation
            key={index}
            animation="slideUp"
            delay={index * 0.1}
          >
            <LuxuryGalleryItem
              image={image}
              index={index}
              viewMode={viewMode}
              onClick={() => handleImageClick(index)}
            />
          </LuxuryAnimation>
        ))}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && selectedImage !== null && (
        <LuxuryLightbox
          images={filteredImages}
          currentIndex={selectedImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}

// Luxury Gallery Item
interface LuxuryGalleryItemProps {
  image: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
  };
  index: number;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

function LuxuryGalleryItem({ image, index, viewMode, onClick }: LuxuryGalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <LuxuryCard
        variant="glass"
        className="flex items-center gap-4 p-4 hover:bg-luxury-background-secondary/70 transition-all duration-300 cursor-pointer"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-20 h-20 rounded-luxury overflow-hidden">
          <R2Image
            src={image.src}
            alt={image.alt}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          {image.title && (
            <h3 className="luxury-heading text-lg font-semibold text-luxury-text-primary mb-1">
              {image.title}
            </h3>
          )}
          {image.description && (
            <p className="luxury-text text-sm text-luxury-text-secondary mb-2">
              {image.description}
            </p>
          )}
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {image.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-luxury-accent-copper/20 text-luxury-accent-copper text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-luxury bg-luxury-background-secondary/50 text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-luxury bg-luxury-background-secondary/50 text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </LuxuryCard>
    );
  }

  return (
    <LuxuryCard
      variant="glass"
      className="group overflow-hidden rounded-luxury-lg cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <R2Image
          src={image.src}
          alt={image.alt}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            isHovered && 'scale-105'
          )}
        />
        
        {/* Overlay */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-luxury-background-primary/80 via-transparent to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        )} />

        {/* Actions */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        )}>
          <div className="flex gap-2">
            <motion.button
              className="p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        {(image.title || image.description) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-luxury-background-primary/90 to-transparent">
            {image.title && (
              <h3 className="luxury-heading text-lg font-semibold text-luxury-text-primary mb-1">
                {image.title}
              </h3>
            )}
            {image.description && (
              <p className="luxury-text text-sm text-luxury-text-secondary">
                {image.description}
              </p>
            )}
          </div>
        )}
      </div>
    </LuxuryCard>
  );
}

// Luxury Lightbox
interface LuxuryLightboxProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function LuxuryLightbox({ images, currentIndex, onClose, onNext, onPrev }: LuxuryLightboxProps) {
  const currentImage = images[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-background-primary/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-background-secondary/90 backdrop-blur-sm rounded-full text-luxury-text-primary hover:bg-luxury-accent-copper hover:text-white transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image */}
        <LuxuryCard variant="glass" className="w-full h-full p-4">
          <div className="relative w-full h-full">
            <R2Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
            />
          </div>
        </LuxuryCard>

        {/* Image Info */}
        {(currentImage.title || currentImage.description) && (
          <LuxuryCard variant="glass" className="absolute bottom-4 left-4 right-4 p-4">
            {currentImage.title && (
              <h3 className="luxury-heading text-xl font-semibold text-luxury-text-primary mb-2">
                {currentImage.title}
              </h3>
            )}
            {currentImage.description && (
              <p className="luxury-text text-sm text-luxury-text-secondary">
                {currentImage.description}
              </p>
            )}
          </LuxuryCard>
        )}

        {/* Image Counter */}
        <LuxuryCard variant="glass" className="absolute top-4 left-4 px-3 py-1">
          <span className="luxury-text text-sm text-luxury-text-primary">
            {currentIndex + 1} / {images.length}
          </span>
        </LuxuryCard>
      </motion.div>
    </motion.div>
  );
}

// Luxury Gallery Variants
export const LuxuryGalleryVariants = {
  // Grid gallery
  Grid: (props: Omit<LuxuryGalleryProps, 'variant'>) => (
    <LuxuryGallery {...props} variant="grid" />
  ),
  
  // Masonry gallery
  Masonry: (props: Omit<LuxuryGalleryProps, 'variant'>) => (
    <LuxuryGallery {...props} variant="masonry" />
  ),
  
  // Carousel gallery
  Carousel: (props: Omit<LuxuryGalleryProps, 'variant'>) => (
    <LuxuryGallery {...props} variant="carousel" />
  ),
  
  // Lightbox gallery
  Lightbox: (props: Omit<LuxuryGalleryProps, 'variant'>) => (
    <LuxuryGallery {...props} variant="lightbox" />
  ),
};

export default LuxuryGallery;
