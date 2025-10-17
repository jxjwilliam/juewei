'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LuxuryCard, LuxuryCardHeader, LuxuryCardTitle, LuxuryCardDescription, LuxuryCardContent, LuxuryCardFooter } from './luxury-card';
import { LuxuryButton } from './luxury-button';
import { LuxuryText } from './luxury-typography';
import { LuxuryAnimation } from './luxury-animations';
import { R2Image } from '@/components/ui/r2-image';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

interface LuxuryProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    badge?: string;
    isNew?: boolean;
    isFeatured?: boolean;
    isOnSale?: boolean;
  };
  variant?: 'default' | 'minimal' | 'elevated' | 'glass' | 'featured';
  size?: 'sm' | 'md' | 'lg';
  showActions?: boolean;
  showRating?: boolean;
  className?: string;
  onAddToCart?: (product: any) => void;
  onViewDetails?: (product: any) => void;
  onToggleFavorite?: (product: any) => void;
}

export function LuxuryProductCard({
  product,
  variant = 'default',
  size = 'md',
  showActions = true,
  showRating = true,
  className,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
}: LuxuryProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const variants = {
    default: 'luxury-card',
    minimal: 'luxury-card-minimal',
    elevated: 'luxury-card-elevated',
    glass: 'luxury-card-glass',
    featured: 'luxury-card-featured',
  };

  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product);
  };

  return (
    <LuxuryCard
      variant={variant === 'glass' ? 'glass' : variant === 'elevated' ? 'elevated' : 'default'}
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        sizes[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-luxury-spice text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </span>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-luxury-background-secondary/80 backdrop-blur-sm hover:bg-luxury-background-secondary transition-all duration-200"
      >
        <Heart
          className={cn(
            'w-5 h-5 transition-colors duration-200',
            isFavorite ? 'text-luxury-spice fill-luxury-spice' : 'text-luxury-text-secondary'
          )}
        />
      </button>

      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-luxury">
        <R2Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className={cn(
            'w-full h-48 object-cover transition-transform duration-500',
            isHovered && 'scale-105'
          )}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-background-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <LuxuryButton
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails?.(product)}
            className="bg-luxury-background-secondary/90 backdrop-blur-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            快速查看
          </LuxuryButton>
        </div>
      </div>

      {/* Product Info */}
      <LuxuryCardContent>
        {/* Product Name */}
        <LuxuryCardTitle className="mb-2 text-luxury-text-primary group-hover:text-luxury-accent-copper transition-colors duration-200">
          {product.name}
        </LuxuryCardTitle>

        {/* Product Description */}
        <LuxuryCardDescription className="mb-4 text-luxury-text-secondary line-clamp-2">
          {product.description}
        </LuxuryCardDescription>

        {/* Rating */}
        {showRating && product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < Math.floor(product.rating!) ? 'text-luxury-accent-gold fill-luxury-accent-gold' : 'text-luxury-text-secondary'
                  )}
                />
              ))}
            </div>
            <LuxuryText variant="caption" className="text-luxury-text-secondary">
              ({product.reviews} 评价)
            </LuxuryText>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <LuxuryText variant="body" className="text-2xl font-bold text-luxury-text-primary">
            ¥{product.price}
          </LuxuryText>
          {product.originalPrice && product.originalPrice > product.price && (
            <LuxuryText variant="caption" className="text-luxury-text-secondary line-through">
              ¥{product.originalPrice}
            </LuxuryText>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            <LuxuryButton
              variant="primary"
              size="sm"
              onClick={() => onAddToCart?.(product)}
              className="flex-1"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              加入购物车
            </LuxuryButton>
            <LuxuryButton
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(product)}
            >
              详情
            </LuxuryButton>
          </div>
        )}
      </LuxuryCardContent>
    </LuxuryCard>
  );
}

// Luxury product card grid
interface LuxuryProductGridProps {
  products: Array<LuxuryProductCardProps['product']>;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  onAddToCart?: (product: any) => void;
  onViewDetails?: (product: any) => void;
  onToggleFavorite?: (product: any) => void;
}

export function LuxuryProductGrid({
  products,
  columns = 3,
  gap = 'md',
  className,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
}: LuxuryProductGridProps) {
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className={cn(
      'grid',
      gridColumns[columns],
      gaps[gap],
      className
    )}>
      {products.map((product, index) => (
        <LuxuryAnimation
          key={product.id}
          animation="slideUp"
          delay={index * 0.1}
        >
          <LuxuryProductCard
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
          />
        </LuxuryAnimation>
      ))}
    </div>
  );
}

// Luxury featured product card
export function LuxuryFeaturedProductCard({
  product,
  className,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
}: LuxuryProductCardProps) {
  return (
    <LuxuryProductCard
      product={product}
      variant="featured"
      size="lg"
      className={cn(
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-luxury-accent-copper/10 before:to-luxury-accent-gold/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
        className
      )}
      onAddToCart={onAddToCart}
      onViewDetails={onViewDetails}
      onToggleFavorite={onToggleFavorite}
    />
  );
}

// Luxury product card variants
export const LuxuryProductCardVariants = {
  // Default luxury product card
  Default: (props: Omit<LuxuryProductCardProps, 'variant'>) => (
    <LuxuryProductCard {...props} variant="default" />
  ),
  
  // Minimal luxury product card
  Minimal: (props: Omit<LuxuryProductCardProps, 'variant'>) => (
    <LuxuryProductCard {...props} variant="minimal" />
  ),
  
  // Elevated luxury product card
  Elevated: (props: Omit<LuxuryProductCardProps, 'variant'>) => (
    <LuxuryProductCard {...props} variant="elevated" />
  ),
  
  // Glass luxury product card
  Glass: (props: Omit<LuxuryProductCardProps, 'variant'>) => (
    <LuxuryProductCard {...props} variant="glass" />
  ),
  
  // Featured luxury product card
  Featured: (props: Omit<LuxuryProductCardProps, 'variant'>) => (
    <LuxuryProductCard {...props} variant="featured" />
  ),
};

export default LuxuryProductCard;
