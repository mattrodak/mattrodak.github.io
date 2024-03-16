import { useFormContext } from 'react-hook-form'

import { Checkbox } from '../Checkbox/Checkbox'
import type { FieldCheckboxProps } from './Field.types'

export function FieldCheckbox({ label, name, ...props }: FieldCheckboxProps) {
  const { register } = useFormContext()

  return <Checkbox {...props} label={label} {...register(name)} />
}
