import type { InputProps } from '../Input/Input.types'

export interface DebouncedInputProps
  extends Omit<InputProps, 'onChange' | 'value'> {
  onChange: (value: string) => void
  value: string | undefined
  delay?: number
}
