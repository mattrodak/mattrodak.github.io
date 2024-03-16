import { uniqueId } from 'lodash-es'

import type { CreateTodoFormSchema } from './CreateTodoForm.types'

export const CreateTodoFormDefaultValues: CreateTodoFormSchema = {
  id: uniqueId('todo-'),
  isCompleted: false,
  text: '',
}
