/* eslint-disable react/button-has-type */
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  BUTTON_SIZE_CLASSNAME_MAP,
  BUTTON_VARIANT_CLASSNAME_MAP,
} from './Button.constants'
import type { ButtonProps } from './Button.types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      size = 'lg',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={twMerge(
        'flex rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        BUTTON_SIZE_CLASSNAME_MAP[size],
        BUTTON_VARIANT_CLASSNAME_MAP[variant],
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  ),
)
