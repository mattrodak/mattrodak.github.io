import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import type { CardProps } from './Card.types'

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        'mb-2 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-4 shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
