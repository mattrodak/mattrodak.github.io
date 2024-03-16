import type { CreateTodoFormSchema } from './CreateTodoForm.types'

export const CreateTodoFormDefaultValues: CreateTodoFormSchema = {
  id: '',
  isCompleted: false,
  text: '',
}
