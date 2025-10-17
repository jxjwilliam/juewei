'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Luxury mobile touch interactions: tap feedback, long-press, and swipe wrapper.
 */

export function useLongPress(
  onLongPress: () => void,
  { delay = 500 }: { delay?: number } = {},
) {
  const timeoutRef = useRef<number | null>(null)
  const [pressing, setPressing] = useState(false)

  const start = () => {
    setPressing(true)
    timeoutRef.current = window.setTimeout(() => {
      onLongPress()
    }, delay)
  }

  const clear = () => {
    setPressing(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => clear, [])

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
    pressing,
  }
}

export function TapFeedback({
  children,
  className,
  as = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode
  className?: string
  as?: 'button' | 'div'
  disabled?: boolean
  'aria-label'?: string
}) {
  const Comp: any = as
  return (
    <motion.div
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.08, ease: 'easeOut' }}
      className={cn('inline-flex', className)}
    >
      <Comp aria-label={ariaLabel} aria-disabled={disabled} className="contents">
        {children}
      </Comp>
    </motion.div>
  )
}

export function Swipeable({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 40,
  className,
}: {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  className?: string
}) {
  const startX = useRef<number | null>(null)
  const deltaX = useRef(0)

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    startX.current = e.touches[0].clientX
    deltaX.current = 0
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (startX.current == null) return
    deltaX.current = e.touches[0].clientX - startX.current
  }

  function onTouchEnd() {
    if (Math.abs(deltaX.current) > threshold) {
      if (deltaX.current < 0) onSwipeLeft?.()
      else onSwipeRight?.()
    }
    startX.current = null
    deltaX.current = 0
  }

  return (
    <div
      className={cn('touch-pan-x select-none', className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="group"
    >
      {children}
    </div>
  )
}

export default {
  useLongPress,
  TapFeedback,
  Swipeable,
}


