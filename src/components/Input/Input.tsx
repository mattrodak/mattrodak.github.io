import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid, ...props }, ref) => (
    <input
      ref={ref}
      className={twMerge(
        'block w-full rounded-md border border-gray-300 p-2',
        isInvalid && 'border-red-500',
        className,
      )}
      {...props}
    />
  ),
)
