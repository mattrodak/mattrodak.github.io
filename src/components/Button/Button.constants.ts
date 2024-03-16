import type { ButtonSize, ButtonVariant } from './Button.types'

export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const
export const BUTTON_VARIANTS = ['primary', 'secondary', 'danger'] as const

export const BUTTON_SIZE_CLASSNAME_MAP: Record<ButtonSize, string> = {
  lg: 'px-4 py-2 text-base',
  md: 'px-3 py-2 text-sm',
  sm: 'px-2.5 py-1.5 text-xs',
}

export const BUTTON_VARIANT_CLASSNAME_MAP: Record<ButtonVariant, string> = {
  danger:
    'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  secondary:
    'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
}
