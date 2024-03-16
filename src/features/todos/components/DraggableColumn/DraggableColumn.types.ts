import type { Todo, TodoColumn } from '../../todosSlice'

export type DraggableColumnProps = {
  column: TodoColumn
  index: number
  todos: Todo[]
}
