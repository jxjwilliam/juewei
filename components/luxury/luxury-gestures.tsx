'use client';

import { useRef } from 'react';
import { useDrag, usePinch, useWheel } from '@use-gesture/react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LuxuryGesturesProps {
  children: React.ReactNode;
  className?: string;
}

export function LuxuryGestures({ children, className }: LuxuryGesturesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 18 });
  const y = useSpring(0, { stiffness: 180, damping: 18 });
  const scale = useSpring(1, { stiffness: 180, damping: 18 });

  useDrag(({ offset: [dx, dy] }) => { x.set(dx); y.set(dy); }, { target: ref });
  usePinch(({ offset: [s] }) => { scale.set(s); }, { target: ref, scaleBounds: { min: 0.8, max: 1.2 } });
  useWheel(({ event }) => { if (event.ctrlKey) scale.set(Math.min(1.25, Math.max(0.75, scale.get() + (event.deltaY > 0 ? -0.05 : 0.05)))); });

  return (
    <motion.div ref={ref} className={cn('luxury-gestures relative inline-block', className)} style={{ x, y, scale }}>
      {children}
    </motion.div>
  );
}

export default LuxuryGestures;


