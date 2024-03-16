import type { CheckboxProps } from '../Checkbox/Checkbox.types'
import type { InputProps } from '../Input/Input.types'
import type { TextareaProps } from '../Textarea/Textarea.types'

export enum FieldTypes {
  'checkbox' = 'checkbox',
  'email' = 'email',
  'password' = 'password',
  'text' = 'text',
  'textarea' = 'textarea',
}

export type InputTypes = Exclude<
  FieldTypes,
  FieldTypes.textarea | FieldTypes.checkbox
>

export interface FieldInputProps extends InputProps {
  name: string
  type: `${InputTypes}`
}

export interface FieldTextareaProps extends TextareaProps {
  name: string
}

export interface FieldCheckboxProps extends CheckboxProps {
  label: string
  name: string
}

type FieldPropsWithInput = {
  type: `${InputTypes}`
}

type FieldPropsWithTextarea = {
  type: `${FieldTypes.textarea}`
}

type FieldPropsWithCheckbox = {
  label: string
  type: `${FieldTypes.checkbox}`
}

export type FieldPropsBase = {
  name: string
  containerClassName?: string
  isDisabled?: boolean
  label?: string
  markAsRequired?: boolean
}

export type FieldProps = FieldPropsBase &
  (FieldPropsWithInput | FieldPropsWithTextarea | FieldPropsWithCheckbox)
