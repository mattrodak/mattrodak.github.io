import { uniqueId } from 'lodash-es'

import type { CreateColumnFormSchema } from './CreateColumnForm.types'

export const createColumnFormDefaultValues: CreateColumnFormSchema = {
  id: uniqueId('column-'),
  text: '',
  todoIds: [],
}
