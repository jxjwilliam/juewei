'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MicroInteractionProps {
  children: React.ReactNode;
  type?: 'tap' | 'hover' | 'press' | 'pulse' | 'bounce' | 'shine';
  delay?: number;
  className?: string;
}

export function LuxuryMicroInteraction({
  children,
  type = 'tap',
  delay = 0,
  className,
}: MicroInteractionProps) {
  const variants: Record<string, any> = {
    tap: { whileTap: { scale: 0.96 } },
    hover: { whileHover: { scale: 1.03 } },
    press: { whileTap: { scale: 0.94, rotate: -1 } },
    pulse: { animate: { scale: [1, 1.04, 1] }, transition: { duration: 1.2, repeat: Infinity } },
    bounce: { animate: { y: [0, -4, 0] }, transition: { duration: 0.8, repeat: Infinity } },
    shine: {},
  };

  return (
    <motion.span
      {...variants[type]}
      transition={{ delay, ease: 'easeOut' }}
      className={cn('inline-flex items-center', className)}
    >
      {children}
    </motion.span>
  );
}

export function LuxuryShine({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('relative overflow-hidden inline-flex', className)}>
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent will-change-transform"
        style={{ animation: 'lux-shine 2.2s ease-out infinite' }}
      />
      <style jsx>{`
        @keyframes lux-shine { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
      `}</style>
    </span>
  );
}

export const LuxuryMicro = { LuxuryMicroInteraction, LuxuryShine };

export default LuxuryMicroInteraction;


