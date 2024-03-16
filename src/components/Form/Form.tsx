import type { FormProps } from './Form.types'

export function Form({ children, ...props }: FormProps) {
  return (
    <form noValidate {...props}>
      {children}
    </form>
  )
}
