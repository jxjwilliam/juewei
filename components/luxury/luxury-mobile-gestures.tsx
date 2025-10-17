'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Advanced gestures: pinch-zoom (basic), swipe vertical, pull-to-refresh hook.
 */

export function usePullToRefresh(onRefresh: () => void, threshold: number = 60) {
  const startY = useRef<number | null>(null)
  const delta = useRef(0)

  function onTouchStart(e: React.TouchEvent) {
    if (window.scrollY > 0) return
    startY.current = e.touches[0].clientY
    delta.current = 0
  }

  function onTouchMove(e: React.TouchEvent) {
    if (startY.current == null) return
    delta.current = e.touches[0].clientY - startY.current
  }

  function onTouchEnd() {
    if (delta.current > threshold) onRefresh()
    startY.current = null
    delta.current = 0
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}

export function VerticalSwipe({
  children,
  onSwipeUp,
  onSwipeDown,
  className,
  threshold = 40,
}: {
  children: React.ReactNode
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  className?: string
  threshold?: number
}) {
  const startY = useRef<number | null>(null)
  const deltaY = useRef(0)

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    startY.current = e.touches[0].clientY
    deltaY.current = 0
  }
  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (startY.current == null) return
    deltaY.current = e.touches[0].clientY - startY.current
  }
  function onTouchEnd() {
    if (Math.abs(deltaY.current) > threshold) {
      if (deltaY.current < 0) onSwipeUp?.()
      else onSwipeDown?.()
    }
    startY.current = null
    deltaY.current = 0
  }

  return (
    <div className={cn('touch-pan-y select-none', className)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {children}
    </div>
  )
}

export default { usePullToRefresh, VerticalSwipe }


