// export type TextareaProps = Omit<
//   React.TextareaHTMLAttributes<HTMLTextAreaElement>,
//   'name'
// > & {
//   name: string
//   containerClassName?: string
//   label?: string
// }

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean
}
