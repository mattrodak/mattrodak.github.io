import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import type { TextareaProps } from './Textarea.types'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={twMerge(
        'block w-full resize-y rounded-md border border-gray-300 p-2',
        isInvalid && 'border-red-500',
        className,
      )}
      {...props}
    />
  ),
)
