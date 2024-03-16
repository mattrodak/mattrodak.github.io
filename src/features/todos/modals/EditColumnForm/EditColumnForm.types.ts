import type { z } from 'zod'

import type { WithModalProviderProps } from '@/providers/ModalProvider/ModalProvider.types'

import type { editColumnFormSchema } from './EditColumnForm.schema'

export type EditColumnFormSchema = z.infer<typeof editColumnFormSchema>

export interface EditColumnFormProps extends WithModalProviderProps {
  columnId: string
  onSubmit: (values: EditColumnFormSchema) => void
}
