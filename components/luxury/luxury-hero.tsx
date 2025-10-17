'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LuxuryButton } from './luxury-button';
import { LuxuryHeading, LuxuryText } from './luxury-typography';
import { LuxuryAnimation } from './luxury-animations';
import { luxuryMobileManager } from '@/lib/design-system/luxury-mobile';
import { MobileContainer } from '@/components/luxury/luxury-mobile-layout';
import { mobileHeading, mobileBody } from '@/lib/design-system/luxury-mobile-typography';
import { mobileSizes, mobilePriority } from '@/lib/design-system/luxury-mobile-images';

interface LuxuryHeroProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  variant?: 'default' | 'minimal' | 'video' | 'parallax' | 'split';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  alignment?: 'left' | 'center' | 'right';
  actions?: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
    external?: boolean;
  }>;
  className?: string;
}

export function LuxuryHero({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 0.4,
  variant = 'default',
  size = 'lg',
  alignment = 'center',
  actions = [],
  className,
}: LuxuryHeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(luxuryMobileManager.isMobile());
  }, []);

  const variants = {
    default: 'relative overflow-hidden',
    minimal: 'relative',
    video: 'relative overflow-hidden',
    parallax: 'relative overflow-hidden',
    split: 'relative overflow-hidden',
  };

  const sizes = {
    sm: 'h-[50vh] min-h-[400px]',
    md: 'h-[60vh] min-h-[500px]',
    lg: 'h-[70vh] min-h-[600px]',
    xl: 'h-[80vh] min-h-[700px]',
    full: 'h-screen',
  };

  const alignments = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <motion.section
      ref={ref}
      className={cn(
        'relative w-full flex flex-col justify-center',
        variants[variant],
        sizes[size],
        alignments[alignment],
        className
      )}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading={mobilePriority('hero') ? 'eager' : 'lazy'}
            sizes={mobileSizes('hero')}
            onLoad={() => setIsVideoLoaded(true)}
          />
        </motion.div>
      )}

      {/* Background Video */}
      {backgroundVideo && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Overlay */}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-luxury-background-primary/80 via-luxury-background-primary/60 to-luxury-background-primary/80"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: overlayOpacity } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}

      {/* Parallax Background Elements */}
      {variant === 'parallax' && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-luxury-accent-copper/20 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-luxury-accent-gold/20 rounded-full blur-xl" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-luxury-spice/20 rounded-full blur-xl" />
        </motion.div>
      )}

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <MobileContainer>
        <div className={cn(
          'max-w-4xl mx-auto',
          alignment === 'left' && 'ml-0',
          alignment === 'right' && 'mr-0'
        )}>
          {/* Subtitle */}
          {subtitle && (
            <LuxuryAnimation animation="slideUp" delay={0.2}>
              <LuxuryText
                variant="caption"
                color="accent"
                className="mb-4 uppercase tracking-wider font-semibold"
              >
                {subtitle}
              </LuxuryText>
            </LuxuryAnimation>
          )}

          {/* Title */}
          <LuxuryAnimation animation="slideUp" delay={0.4}>
            <LuxuryHeading
              level={1}
              variant="display"
              className="mb-6 text-3xl sm:text-4xl md:text-5xl"
            >
              {title}
            </LuxuryHeading>
          </LuxuryAnimation>

          {/* Description */}
          {description && (
            <LuxuryAnimation animation="slideUp" delay={0.6}>
              <LuxuryText
                variant="lead"
                className="mb-8 max-w-2xl text-base sm:text-lg"
              >
                {description}
              </LuxuryText>
            </LuxuryAnimation>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <LuxuryAnimation animation="slideUp" delay={0.8}>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {actions.map((action, index) => (
                  <LuxuryButton
                    key={index}
                    variant={action.variant || 'primary'}
                    size={isMobile ? 'md' : 'lg'}
                    onClick={() => {
                      if (action.external) {
                        window.open(action.href, '_blank', 'noopener,noreferrer');
                      } else {
                        window.location.href = action.href;
                      }
                    }}
                    className="luxury-hover"
                  >
                    {action.label}
                  </LuxuryButton>
                ))}
              </div>
            </LuxuryAnimation>
          )}
        </div>
        </MobileContainer>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-luxury-accent-copper rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-3 bg-luxury-accent-copper rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// Luxury hero variants for different use cases
export const LuxuryHeroVariants = {
  // Default luxury hero
  Default: (props: Omit<LuxuryHeroProps, 'variant'>) => (
    <LuxuryHero {...props} variant="default" />
  ),
  
  // Minimal luxury hero
  Minimal: (props: Omit<LuxuryHeroProps, 'variant'>) => (
    <LuxuryHero {...props} variant="minimal" />
  ),
  
  // Video luxury hero
  Video: (props: Omit<LuxuryHeroProps, 'variant'>) => (
    <LuxuryHero {...props} variant="video" />
  ),
  
  // Parallax luxury hero
  Parallax: (props: Omit<LuxuryHeroProps, 'variant'>) => (
    <LuxuryHero {...props} variant="parallax" />
  ),
  
  // Split luxury hero
  Split: (props: Omit<LuxuryHeroProps, 'variant'>) => (
    <LuxuryHero {...props} variant="split" />
  ),
};

// Luxury hero with image background
export function LuxuryHeroWithImage({
  image,
  ...props
}: LuxuryHeroProps & { image: string }) {
  return (
    <LuxuryHero
      {...props}
      backgroundImage={image}
      overlay={true}
    />
  );
}

// Luxury hero with video background
export function LuxuryHeroWithVideo({
  video,
  ...props
}: LuxuryHeroProps & { video: string }) {
  return (
    <LuxuryHero
      {...props}
      backgroundVideo={video}
      overlay={true}
    />
  );
}

// Luxury hero with parallax effect
export function LuxuryHeroParallax(props: LuxuryHeroProps) {
  return (
    <LuxuryHero
      {...props}
      variant="parallax"
      overlay={true}
    />
  );
}

export default LuxuryHero;
