import type { InputErrorProps } from './InputError.types'

export function InputError({ errorMessage }: InputErrorProps) {
  return <span className="mt-1 block text-sm text-red-500">{errorMessage}</span>
}
