import type { InputLabelProps } from './InputLabel.types'

export function InputLabel({
  isRequired,
  label,
  name,
  ...props
}: InputLabelProps) {
  return (
    <label className="mb-1 block" htmlFor={name} {...props}>
      {label}

      {isRequired && <span className="text-red-500">*</span>}
    </label>
  )
}
