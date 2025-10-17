'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { luxuryAnimationUtils } from '@/lib/design-system/luxury-animations';

interface LuxuryNavigationProps {
  items: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
    children?: Array<{
      label: string;
      href: string;
      icon?: React.ReactNode;
    }>;
  }>;
  variant?: 'default' | 'sticky' | 'floating' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LuxuryNavigation({
  items,
  variant = 'default',
  size = 'md',
  className,
}: LuxuryNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variants = {
    default: 'bg-luxury-background-secondary/80 backdrop-blur-xl border-b border-luxury-accent-copper/20',
    sticky: 'bg-luxury-background-secondary/95 backdrop-blur-xl border-b border-luxury-accent-copper/20',
    floating: 'bg-luxury-background-secondary/90 backdrop-blur-xl border border-luxury-accent-copper/20 rounded-luxury-lg shadow-luxury-lg',
    minimal: 'bg-transparent',
  };

  const sizes = {
    sm: 'py-3',
    md: 'py-4',
    lg: 'py-6',
  };

  const animationProps = luxuryAnimationUtils.generateFramerMotionProps('hover', 'default');

  return (
    <motion.nav
      className={cn(
        // Base styles
        'relative z-50 transition-all duration-300 ease-in-out',
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Scroll effect
        isScrolled && 'shadow-luxury-md',
        
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <a href="/" className="luxury-heading text-2xl font-bold text-luxury-text-primary">
              Juewei
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item, index) => (
              <LuxuryNavigationItem
                key={item.href}
                item={item}
                index={index}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="luxury-button p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pt-4 border-t border-luxury-accent-copper/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="space-y-2">
                {items.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 luxury-text text-luxury-text-primary hover:bg-luxury-background-secondary rounded-luxury transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Luxury navigation item component
function LuxuryNavigationItem({
  item,
  index,
  activeItem,
  setActiveItem,
}: {
  item: LuxuryNavigationProps['items'][0];
  index: number;
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
    >
      <motion.a
        href={item.href}
        className={cn(
          'flex items-center space-x-2 luxury-text text-luxury-text-primary hover:text-luxury-accent-copper transition-colors duration-200',
          activeItem === item.href && 'text-luxury-accent-copper'
        )}
        onMouseEnter={() => setActiveItem(item.href)}
        onMouseLeave={() => setActiveItem(null)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {item.icon && <span className="w-5 h-5">{item.icon}</span>}
        <span>{item.label}</span>
      </motion.a>

      {/* Active indicator */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-accent-copper"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: activeItem === item.href ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Hover effect */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-accent-copper/50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

// Luxury navigation variants
export const LuxuryNavigationVariants = {
  // Default luxury navigation
  Default: (props: Omit<LuxuryNavigationProps, 'variant'>) => (
    <LuxuryNavigation {...props} variant="default" />
  ),
  
  // Sticky luxury navigation
  Sticky: (props: Omit<LuxuryNavigationProps, 'variant'>) => (
    <LuxuryNavigation {...props} variant="sticky" />
  ),
  
  // Floating luxury navigation
  Floating: (props: Omit<LuxuryNavigationProps, 'variant'>) => (
    <LuxuryNavigation {...props} variant="floating" />
  ),
  
  // Minimal luxury navigation
  Minimal: (props: Omit<LuxuryNavigationProps, 'variant'>) => (
    <LuxuryNavigation {...props} variant="minimal" />
  ),
};

// Luxury breadcrumb component
export function LuxuryBreadcrumb({ 
  items, 
  className 
}: { 
  items: Array<{ label: string; href: string }>; 
  className?: string; 
}) {
  return (
    <motion.nav
      className={cn(
        'flex items-center space-x-2 luxury-text text-luxury-text-secondary',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.href}
          className="flex items-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
        >
          {index > 0 && (
            <motion.span
              className="mx-2 text-luxury-accent-copper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 + 0.1 }}
            >
              /
            </motion.span>
          )}
          <a
            href={item.href}
            className="hover:text-luxury-accent-copper transition-colors duration-200"
          >
            {item.label}
          </a>
        </motion.div>
      ))}
    </motion.nav>
  );
}

export default LuxuryNavigation;
