import type { Todo } from '../../todosSlice'

export type TodoCardProps = {
  columnId: string
  index: number
  todo: Todo
  isDraggingOver?: boolean
}
