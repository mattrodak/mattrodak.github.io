import type { z } from 'zod'

import type { WithModalProviderProps } from '@/providers/ModalProvider/ModalProvider.types'

import type { createColumnFormSchema } from './CreateColumnForm.schema'

export type CreateColumnFormSchema = z.infer<typeof createColumnFormSchema>

export interface CreateColumnFormProps extends WithModalProviderProps {
  onSubmit: (values: CreateColumnFormSchema) => void
}
