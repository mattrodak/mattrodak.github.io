import { forwardRef, useState } from 'react'
import { useDebouncedEffect, usePrevious } from '@react-hookz/web'

import { Input } from '../Input/Input'
import type { DebouncedInputProps } from './DebouncedInput.types'

export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  (
    { className, delay = 500, name, onChange, value: inputVale, ...props },
    ref,
  ) => {
    const [value, setValue] = useState(inputVale)
    const previousValue = usePrevious(value)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    }

    useDebouncedEffect(
      () => {
        if (value === previousValue || previousValue === undefined) {
          return
        }

        onChange(value ?? '')
      },
      [value],
      delay,
    )

    return (
      <Input
        ref={ref}
        {...props}
        onChange={handleInputChange}
        type="text"
        value={value}
      />
    )
  },
)
