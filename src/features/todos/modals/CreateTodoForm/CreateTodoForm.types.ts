import type { z } from 'zod'

import type { WithModalProviderProps } from '@/providers/ModalProvider/ModalProvider.types'

import type { createTodoFormSchema } from './CreateTodoForm.schema'

export type CreateTodoFormSchema = z.infer<typeof createTodoFormSchema>

export interface CreateTodoFormModalProps extends WithModalProviderProps {
  onSubmit: (values: CreateTodoFormSchema) => void
}
