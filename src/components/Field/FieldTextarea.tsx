import { useFormContext } from 'react-hook-form'

import { Textarea } from '../Textarea/Textarea'
import type { FieldTextareaProps } from './Field.types'

export function FieldTextarea({ name, ...props }: FieldTextareaProps) {
  const { register } = useFormContext()

  return <Textarea {...props} {...register(name)} />
}
