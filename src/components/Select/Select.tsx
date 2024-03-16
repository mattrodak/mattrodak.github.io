import { twMerge } from 'tailwind-merge'

import { InputLabel } from '../InputLabel/InputLabel'
import type { SelectProps } from './Select.types'

export function Select({
  className,
  containerClassName,
  label,
  name,
  options,
  ...props
}: SelectProps) {
  return (
    <div className={containerClassName}>
      {label && <InputLabel label={label} name={name} />}

      <select
        className={twMerge(
          'block w-full rounded-md border border-gray-300 p-2',
          className,
        )}
        id={name}
        name={name}
        {...props}
      >
        {options.map(({ label: optionLabel, value }) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  )
}
