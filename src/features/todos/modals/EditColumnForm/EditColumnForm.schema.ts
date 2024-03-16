import { z } from 'zod'

export const editColumnFormSchema = z.object({
  text: z.string().min(1, 'This field is required.'),
})
