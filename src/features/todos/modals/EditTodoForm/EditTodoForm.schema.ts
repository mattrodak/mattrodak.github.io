import { z } from 'zod'

export const editTodoFormSchema = z.object({
  id: z.string(),
  isCompleted: z.boolean(),
  text: z.string().min(1, 'This field is required.'),
})
