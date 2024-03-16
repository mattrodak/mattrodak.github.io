import type { BUTTON_SIZES, BUTTON_VARIANTS } from './Button.constants'

export type ButtonSize = (typeof BUTTON_SIZES)[number]
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variant?: ButtonVariant
}
