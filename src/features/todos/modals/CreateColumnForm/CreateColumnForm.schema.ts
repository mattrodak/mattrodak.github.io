import { z } from 'zod'

export const createColumnFormSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'This field is required.'),
  todoIds: z.array(z.any()),
})
