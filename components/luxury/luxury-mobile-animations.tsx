'use client'

import { motion } from 'framer-motion'

/**
 * Mobile-friendly animation presets optimized for touch devices.
 */

export const mobileAnimations = {
  fadeInUp: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slideInRight: { initial: { x: 24, opacity: 0 }, animate: { x: 0, opacity: 1 } },
}

export const mobileTransition = { duration: 0.4, ease: 'easeOut' }

export function MobileAnimate({
  children,
  variant = 'fadeInUp',
  delay = 0,
}: {
  children: React.ReactNode
  variant?: keyof typeof mobileAnimations
  delay?: number
}) {
  const a = mobileAnimations[variant]
  return (
    <motion.div initial={a.initial} animate={a.animate} transition={{ ...mobileTransition, delay }}>
      {children}
    </motion.div>
  )
}

export default {
  MobileAnimate,
  mobileAnimations,
  mobileTransition,
}


