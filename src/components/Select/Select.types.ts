export type SelectOption = {
  label: string
  value: string
}

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'name'
> & {
  name: string
  options: SelectOption[]
  containerClassName?: string
  label?: string
}
