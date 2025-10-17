'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LuxuryFeedbackProps {
  show?: boolean;
  message?: string;
  variant?: 'success' | 'error' | 'info';
  className?: string;
}

export function LuxuryFeedback({ show = false, message, variant = 'info', className }: LuxuryFeedbackProps) {
  const colors = {
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    error: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
    info: 'bg-luxury-accent-copper/15 text-luxury-accent-copper border-luxury-accent-copper/30',
  };

  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('px-3 py-2 rounded-luxury border text-sm', colors[variant], className)}
      role="status"
      aria-live="polite"
    >
      {message}
    </motion.div>
  );
}

export default LuxuryFeedback;


