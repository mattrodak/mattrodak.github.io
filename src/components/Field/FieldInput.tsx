import { useFormContext } from 'react-hook-form'

import { Input } from '../Input/Input'
import type { FieldInputProps } from './Field.types'

export function FieldInput({ name, ...props }: FieldInputProps) {
  const { register } = useFormContext()

  return <Input {...props} {...register(name)} />
}
