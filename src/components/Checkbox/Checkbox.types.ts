export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean
  isInvalid?: boolean
  label?: string
}
