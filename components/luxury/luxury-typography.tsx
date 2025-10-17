'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { luxuryTypographyUtils } from '@/lib/design-system/luxury-typography';

// Luxury heading component
interface LuxuryHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'display' | 'subtitle' | 'accent';
  className?: string;
  animate?: boolean;
}

export function LuxuryHeading({
  children,
  level = 1,
  variant = 'default',
  className,
  animate = true,
}: LuxuryHeadingProps) {
  const variants = {
    default: 'luxury-heading text-luxury-text-primary',
    display: 'luxury-heading text-luxury-text-primary text-6xl md:text-7xl lg:text-8xl font-bold',
    subtitle: 'luxury-heading text-luxury-text-secondary text-lg md:text-xl',
    accent: 'luxury-heading text-luxury-accent-copper',
  };

  const sizes = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl',
  };

  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const content = (
    <Component
      className={cn(
        'luxury-heading font-semibold leading-tight',
        variants[variant],
        sizes[level],
        className
      )}
    >
      {children}
    </Component>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {content}
    </motion.div>
  );
}

// Luxury text component
interface LuxuryTextProps {
  children: React.ReactNode;
  variant?: 'body' | 'caption' | 'small' | 'large' | 'lead';
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
  className?: string;
  animate?: boolean;
}

export function LuxuryText({
  children,
  variant = 'body',
  color = 'primary',
  className,
  animate = true,
}: LuxuryTextProps) {
  const variants = {
    body: 'luxury-text text-base md:text-lg',
    caption: 'luxury-text text-sm md:text-base',
    small: 'luxury-text text-xs md:text-sm',
    large: 'luxury-text text-lg md:text-xl',
    lead: 'luxury-text text-xl md:text-2xl font-medium',
  };

  const colors = {
    primary: 'text-luxury-text-primary',
    secondary: 'text-luxury-text-secondary',
    accent: 'text-luxury-accent-copper',
    muted: 'text-luxury-text-secondary/70',
  };

  const content = (
    <p
      className={cn(
        'luxury-text leading-relaxed',
        variants[variant],
        colors[color],
        className
      )}
    >
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.p
      className={cn(
        'luxury-text leading-relaxed',
        variants[variant],
        colors[color],
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.p>
  );
}

// Luxury link component
interface LuxuryLinkProps {
  children: React.ReactNode;
  href: string;
  variant?: 'default' | 'accent' | 'underline' | 'button';
  className?: string;
  external?: boolean;
}

export function LuxuryLink({
  children,
  href,
  variant = 'default',
  className,
  external = false,
}: LuxuryLinkProps) {
  const variants = {
    default: 'luxury-text text-luxury-text-primary hover:text-luxury-accent-copper transition-colors duration-200',
    accent: 'luxury-text text-luxury-accent-copper hover:text-luxury-accent-gold transition-colors duration-200',
    underline: 'luxury-text text-luxury-text-primary hover:text-luxury-accent-copper transition-colors duration-200 underline decoration-luxury-accent-copper hover:decoration-luxury-accent-gold',
    button: 'luxury-button inline-block px-4 py-2 text-center',
  };

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-block transition-all duration-200',
        variants[variant],
        className
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
      {external && (
        <motion.span
          className="ml-1 inline-block"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          ↗
        </motion.span>
      )}
    </motion.a>
  );
}

// Luxury quote component
interface LuxuryQuoteProps {
  children: React.ReactNode;
  author?: string;
  className?: string;
}

export function LuxuryQuote({
  children,
  author,
  className,
}: LuxuryQuoteProps) {
  return (
    <motion.blockquote
      className={cn(
        'relative pl-8 border-l-4 border-luxury-accent-copper',
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute -left-2 -top-2 text-4xl text-luxury-accent-copper"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
      >
        "
      </motion.div>
      <LuxuryText variant="lead" className="italic">
        {children}
      </LuxuryText>
      {author && (
        <motion.cite
          className="block mt-4 text-right luxury-text text-luxury-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
        >
          — {author}
        </motion.cite>
      )}
    </motion.blockquote>
  );
}

// Luxury code component
interface LuxuryCodeProps {
  children: React.ReactNode;
  variant?: 'inline' | 'block';
  language?: string;
  className?: string;
}

export function LuxuryCode({
  children,
  variant = 'inline',
  language,
  className,
}: LuxuryCodeProps) {
  if (variant === 'inline') {
    return (
      <motion.code
        className={cn(
          'luxury-text text-sm bg-luxury-background-secondary px-2 py-1 rounded border border-luxury-accent-copper/20',
          className
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.code>
    );
  }

  return (
    <motion.pre
      className={cn(
        'luxury-text text-sm bg-luxury-background-secondary p-4 rounded-luxury border border-luxury-accent-copper/20 overflow-x-auto',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.code
        className="block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
      >
        {children}
      </motion.code>
    </motion.pre>
  );
}

// Luxury list component
interface LuxuryListProps {
  children: React.ReactNode;
  variant?: 'bullet' | 'number' | 'check' | 'star';
  className?: string;
}

export function LuxuryList({
  children,
  variant = 'bullet',
  className,
}: LuxuryListProps) {
  const variants = {
    bullet: 'list-disc list-inside space-y-2',
    number: 'list-decimal list-inside space-y-2',
    check: 'space-y-2',
    star: 'space-y-2',
  };

  const markers = {
    bullet: '•',
    number: '',
    check: '✓',
    star: '★',
  };

  return (
    <motion.ul
      className={cn(
        'luxury-text text-luxury-text-primary',
        variants[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 }}
    >
      {children}
    </motion.ul>
  );
}

// Luxury list item component
interface LuxuryListItemProps {
  children: React.ReactNode;
  variant?: 'bullet' | 'number' | 'check' | 'star';
  className?: string;
}

export function LuxuryListItem({
  children,
  variant = 'bullet',
  className,
}: LuxuryListItemProps) {
  const markers = {
    bullet: '•',
    number: '',
    check: '✓',
    star: '★',
  };

  return (
    <motion.li
      className={cn(
        'luxury-text text-luxury-text-primary flex items-start',
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {variant !== 'number' && (
        <motion.span
          className="text-luxury-accent-copper mr-2 flex-shrink-0"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {markers[variant]}
        </motion.span>
      )}
      <span>{children}</span>
    </motion.li>
  );
}

// Luxury text gradient component
interface LuxuryTextGradientProps {
  children: React.ReactNode;
  gradient?: 'copper' | 'gold' | 'spice' | 'rainbow';
  className?: string;
}

export function LuxuryTextGradient({
  children,
  gradient = 'copper',
  className,
}: LuxuryTextGradientProps) {
  const gradients = {
    copper: 'bg-gradient-to-r from-luxury-accent-copper to-luxury-accent-gold bg-clip-text text-transparent',
    gold: 'bg-gradient-to-r from-luxury-accent-gold to-yellow-400 bg-clip-text text-transparent',
    spice: 'bg-gradient-to-r from-luxury-spice to-red-500 bg-clip-text text-transparent',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent',
  };

  return (
    <motion.span
      className={cn(
        'luxury-heading font-bold',
        gradients[gradient],
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  );
}

// Luxury typography variants
export const LuxuryTypographyVariants = {
  // Display heading
  Display: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="display" />
  ),
  
  // Subtitle heading
  Subtitle: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="subtitle" />
  ),
  
  // Accent heading
  Accent: (props: Omit<LuxuryHeadingProps, 'variant'>) => (
    <LuxuryHeading {...props} variant="accent" />
  ),
  
  // Large text
  Large: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="large" />
  ),
  
  // Lead text
  Lead: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="lead" />
  ),
  
  // Caption text
  Caption: (props: Omit<LuxuryTextProps, 'variant'>) => (
    <LuxuryText {...props} variant="caption" />
  ),
};

export default LuxuryHeading;
