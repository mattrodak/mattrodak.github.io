import { z } from 'zod'

export const createTodoFormSchema = z.object({
  id: z.string(),
  isCompleted: z.boolean(),
  text: z.string().min(1, 'This field is required.'),
})
