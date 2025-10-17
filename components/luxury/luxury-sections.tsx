'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LuxuryAnimation } from './luxury-animations';
import { LuxuryHeading, LuxuryText } from './luxury-typography';
import { LuxuryCard } from './luxury-card';

interface LuxurySectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'light' | 'gradient' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function LuxurySection({
  children,
  variant = 'default',
  size = 'lg',
  padding = 'lg',
  className,
}: LuxurySectionProps) {
  const variants = {
    default: 'bg-luxury-background-primary',
    dark: 'bg-luxury-background-primary',
    light: 'bg-luxury-background-secondary',
    gradient: 'bg-gradient-to-br from-luxury-background-primary via-luxury-background-secondary to-luxury-background-primary',
    glass: 'luxury-bg-glass',
    minimal: 'bg-transparent',
  };

  const sizes = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
    full: 'py-24',
  };

  const paddings = {
    none: 'px-0',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
    xl: 'px-12',
  };

  return (
    <motion.section
      className={cn(
        'relative w-full',
        variants[variant],
        sizes[size],
        paddings[padding],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

// Luxury section header
interface LuxurySectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export function LuxurySectionHeader({
  title,
  subtitle,
  description,
  alignment = 'center',
  className,
}: LuxurySectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn(
      'mb-12 max-w-4xl mx-auto',
      alignments[alignment],
      className
    )}>
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

      <LuxuryAnimation animation="slideUp" delay={0.4}>
        <LuxuryHeading
          level={2}
          variant="display"
          className="mb-6"
        >
          {title}
        </LuxuryHeading>
      </LuxuryAnimation>

      {description && (
        <LuxuryAnimation animation="slideUp" delay={0.6}>
          <LuxuryText
            variant="lead"
            className="text-luxury-text-secondary max-w-3xl mx-auto"
          >
            {description}
          </LuxuryText>
        </LuxuryAnimation>
      )}
    </div>
  );
}

// Luxury section content
interface LuxurySectionContentProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function LuxurySectionContent({
  children,
  columns = 1,
  gap = 'lg',
  className,
}: LuxurySectionContentProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  return (
    <div className={cn(
      'grid',
      columnClasses[columns],
      gaps[gap],
      className
    )}>
      {children}
    </div>
  );
}

// Luxury section footer
interface LuxurySectionFooterProps {
  children: React.ReactNode;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export function LuxurySectionFooter({
  children,
  alignment = 'center',
  className,
}: LuxurySectionFooterProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <LuxuryAnimation animation="slideUp" delay={0.8}>
      <div className={cn(
        'mt-12',
        alignments[alignment],
        className
      )}>
        {children}
      </div>
    </LuxuryAnimation>
  );
}

// Luxury feature section
interface LuxuryFeatureSectionProps {
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  title?: string;
  subtitle?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'cards' | 'minimal';
  className?: string;
}

export function LuxuryFeatureSection({
  features,
  title,
  subtitle,
  description,
  columns = 3,
  variant = 'default',
  className,
}: LuxuryFeatureSectionProps) {
  const variants = {
    default: 'space-y-8',
    cards: 'grid gap-8',
    minimal: 'space-y-6',
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <LuxurySection className={className}>
      {(title || subtitle || description) && (
        <LuxurySectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
        />
      )}

      <LuxurySectionContent columns={columns}>
        {features.map((feature, index) => (
          <LuxuryAnimation
            key={index}
            animation="slideUp"
            delay={0.2 + index * 0.1}
          >
            {variant === 'cards' ? (
              <LuxuryCard variant="elevated" className="text-center">
                <div className="mb-4 text-luxury-accent-copper">
                  {feature.icon}
                </div>
                <LuxuryHeading level={3} className="mb-2">
                  {feature.title}
                </LuxuryHeading>
                <LuxuryText variant="body" className="text-luxury-text-secondary">
                  {feature.description}
                </LuxuryText>
              </LuxuryCard>
            ) : (
              <div className="text-center">
                <div className="mb-4 text-luxury-accent-copper">
                  {feature.icon}
                </div>
                <LuxuryHeading level={3} className="mb-2">
                  {feature.title}
                </LuxuryHeading>
                <LuxuryText variant="body" className="text-luxury-text-secondary">
                  {feature.description}
                </LuxuryText>
              </div>
            )}
          </LuxuryAnimation>
        ))}
      </LuxurySectionContent>
    </LuxurySection>
  );
}

// Luxury testimonial section
interface LuxuryTestimonialSectionProps {
  testimonials: Array<{
    content: string;
    author: string;
    role: string;
    avatar?: string;
    rating?: number;
  }>;
  title?: string;
  subtitle?: string;
  description?: string;
  variant?: 'default' | 'cards' | 'minimal';
  className?: string;
}

export function LuxuryTestimonialSection({
  testimonials,
  title,
  subtitle,
  description,
  variant = 'default',
  className,
}: LuxuryTestimonialSectionProps) {
  return (
    <LuxurySection variant="gradient" className={className}>
      {(title || subtitle || description) && (
        <LuxurySectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
        />
      )}

      <LuxurySectionContent columns={testimonials.length > 1 ? 2 : 1}>
        {testimonials.map((testimonial, index) => (
          <LuxuryAnimation
            key={index}
            animation="slideUp"
            delay={0.2 + index * 0.1}
          >
            {variant === 'cards' ? (
              <LuxuryCard variant="glass" className="text-center">
                <LuxuryText variant="lead" className="mb-6 italic">
                  "{testimonial.content}"
                </LuxuryText>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < (testimonial.rating || 5)
                          ? 'text-luxury-accent-gold'
                          : 'text-luxury-text-secondary'
                      )}
                    >
                      ★
                    </div>
                  ))}
                </div>
                <LuxuryHeading level={4} className="mb-1">
                  {testimonial.author}
                </LuxuryHeading>
                <LuxuryText variant="caption" className="text-luxury-text-secondary">
                  {testimonial.role}
                </LuxuryText>
              </LuxuryCard>
            ) : (
              <div className="text-center">
                <LuxuryText variant="lead" className="mb-6 italic">
                  "{testimonial.content}"
                </LuxuryText>
                <LuxuryHeading level={4} className="mb-1">
                  {testimonial.author}
                </LuxuryHeading>
                <LuxuryText variant="caption" className="text-luxury-text-secondary">
                  {testimonial.role}
                </LuxuryText>
              </div>
            )}
          </LuxuryAnimation>
        ))}
      </LuxurySectionContent>
    </LuxurySection>
  );
}

// Luxury CTA section
interface LuxuryCTASectionProps {
  title: string;
  description?: string;
  actions: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
    external?: boolean;
  }>;
  variant?: 'default' | 'gradient' | 'glass';
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export function LuxuryCTASection({
  title,
  description,
  actions,
  variant = 'default',
  alignment = 'center',
  className,
}: LuxuryCTASectionProps) {
  const variants = {
    default: 'bg-luxury-background-secondary',
    gradient: 'bg-gradient-to-br from-luxury-accent-copper to-luxury-accent-gold',
    glass: 'luxury-bg-glass',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <LuxurySection variant={variant} className={className}>
      <div className={cn(
        'max-w-4xl mx-auto',
        alignments[alignment]
      )}>
        <LuxuryHeading level={2} variant="display" className="mb-6">
          {title}
        </LuxuryHeading>
        
        {description && (
          <LuxuryText variant="lead" className="mb-8 text-luxury-text-secondary">
            {description}
          </LuxuryText>
        )}

        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {actions.map((action, index) => (
            <LuxuryAnimation
              key={index}
              animation="slideUp"
              delay={0.2 + index * 0.1}
            >
              <a
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'inline-flex items-center justify-center px-6 py-3 rounded-luxury font-semibold transition-all duration-300',
                  action.variant === 'primary' && 'bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold text-white hover:from-luxury-accent-gold hover:to-luxury-accent-copper',
                  action.variant === 'secondary' && 'bg-luxury-background-secondary text-luxury-text-primary border border-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white',
                  action.variant === 'accent' && 'bg-luxury-spice text-white hover:bg-red-600',
                  action.variant === 'ghost' && 'text-luxury-text-primary hover:bg-luxury-background-secondary',
                  action.variant === 'outline' && 'border-2 border-luxury-accent-copper text-luxury-accent-copper hover:bg-luxury-accent-copper hover:text-white'
                )}
              >
                {action.label}
              </a>
            </LuxuryAnimation>
          ))}
        </div>
      </div>
    </LuxurySection>
  );
}

// Luxury section variants
export const LuxurySectionVariants = {
  // Default luxury section
  Default: (props: Omit<LuxurySectionProps, 'variant'>) => (
    <LuxurySection {...props} variant="default" />
  ),
  
  // Dark luxury section
  Dark: (props: Omit<LuxurySectionProps, 'variant'>) => (
    <LuxurySection {...props} variant="dark" />
  ),
  
  // Light luxury section
  Light: (props: Omit<LuxurySectionProps, 'variant'>) => (
    <LuxurySection {...props} variant="light" />
  ),
  
  // Gradient luxury section
  Gradient: (props: Omit<LuxurySectionProps, 'variant'>) => (
    <LuxurySection {...props} variant="gradient" />
  ),
  
  // Glass luxury section
  Glass: (props: Omit<LuxurySectionProps, 'variant'>) => (
    <LuxurySection {...props} variant="glass" />
  ),
  
  // Minimal luxury section
  Minimal: (props: Omit<LuxurySectionProps, 'variant'>) => (
    <LuxurySection {...props} variant="minimal" />
  ),
};

export default LuxurySection;
