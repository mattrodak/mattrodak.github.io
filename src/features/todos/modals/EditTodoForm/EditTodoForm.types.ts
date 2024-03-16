import type { z } from 'zod'

import type { WithModalProviderProps } from '@/providers/ModalProvider/ModalProvider.types'

import type { editTodoFormSchema } from './EditTodoForm.schema'

export type EditTodoFormSchema = z.infer<typeof editTodoFormSchema>

export interface EditTodoFormModalProps extends WithModalProviderProps {
  onSubmit: (values: EditTodoFormSchema) => void
  todoId: string
}
