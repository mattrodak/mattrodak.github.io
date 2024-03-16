import { useCallback } from 'react'
import { MdCheck, MdDelete, MdOutlineClose } from 'react-icons/md'
import { Draggable } from '@hello-pangea/dnd'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card/Card'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { TextHighlighter } from '@/components/TextHighlighter/TextHighlighter'

import { useAppDispatch, useAppSelector } from '@/store/hooks'

import {
  deleteTodo,
  selectSearchQuery,
  toggleMarkAsCompleted,
  toggleMarkAsSelected,
} from '../../todosSlice'
import { EditTodo } from '../EditTodo/EditTodo'
import type { TodoCardProps } from './TodoCard.types'

export function TodoCard({
  columnId,
  index,
  isDraggingOver,
  todo,
}: TodoCardProps) {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)

  const handleDelete = useCallback(() => {
    dispatch(deleteTodo({ columnId, todoId: todo.id }))
  }, [columnId, dispatch, todo.id])

  const handleToggleMarkAsCompleted = useCallback(() => {
    dispatch(toggleMarkAsCompleted({ todoId: todo.id }))
  }, [dispatch, todo.id])

  const handleToggleMarkAsSelected = useCallback(() => {
    dispatch(toggleMarkAsSelected({ todoId: todo.id }))
  }, [dispatch, todo.id])

  return (
    <Draggable draggableId={todo.id} index={index}>
      {provided => (
        <Card
          ref={provided.innerRef}
          className={twMerge(
            isDraggingOver ? 'bg-slate-300' : 'bg-white',
            todo.isCompleted && 'border-green-300 line-through',
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Checkbox
            name={todo.id}
            onChange={handleToggleMarkAsSelected}
            value={todo.isSelected ? 1 : 0}
          />

          <TextHighlighter
            highlightClassName="bg-yellow-200 rounded-md px-1 py-0.5"
            searchQuery={[searchQuery]}
            textToHighlight={todo.text}
          />

          <div className="flex items-center">
            <EditTodo todoId={todo.id} />

            <Button
              aria-label="Mark as completed"
              className="ml-1 p-1"
              onClick={handleToggleMarkAsCompleted}
              size="sm"
              title="Mark as completed"
              variant="secondary"
            >
              {todo.isCompleted ? <MdOutlineClose /> : <MdCheck />}
            </Button>

            <Button
              aria-label="Delete"
              className="ml-1 p-1"
              onClick={handleDelete}
              size="sm"
              title="Delete"
              variant="danger"
            >
              <MdDelete />
            </Button>
          </div>
        </Card>
      )}
    </Draggable>
  )
}
