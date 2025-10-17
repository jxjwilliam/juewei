'use client'

import { cn } from '@/lib/utils'

export function MobileContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-screen-sm px-4', className)}>{children}</div>
}

export function MobileStack({ children, gap = 4, className }: { children: React.ReactNode; gap?: 2 | 3 | 4 | 6 | 8; className?: string }) {
  const gapClass = `gap-${gap}`
  return <div className={cn('flex flex-col', gapClass, className)}>{children}</div>
}

export function MobileGrid({ children, cols = 2, className }: { children: React.ReactNode; cols?: 1 | 2 | 3; className?: string }) {
  return <div className={cn(`grid grid-cols-${cols} gap-4`, className)}>{children}</div>
}

export default { MobileContainer, MobileStack, MobileGrid }


