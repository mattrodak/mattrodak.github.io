import { useCallback } from 'react'
import { MdDelete } from 'react-icons/md'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/Button/Button'
import { Checkbox } from '@/components/Checkbox/Checkbox'

import { useAppDispatch, useAppSelector } from '@/store/hooks'

import {
  deleteColumn,
  getCheckboxValueForBulkSelection,
  toggleAllAsSelected,
} from '../../todosSlice'
import { CreateTodo } from '../CreateTodo/CreateTodo'
import { EditColumn } from '../EditColumn/EditColumn'
import { TodoCard } from '../TodoCard/TodoCard'
import type { DraggableColumnProps } from './DraggableColumn.types'

export function DraggableColumn({
  column,
  index,
  todos,
}: DraggableColumnProps) {
  const dispatch = useAppDispatch()
  const checkboxValue = useAppSelector(state =>
    getCheckboxValueForBulkSelection(state, column.id),
  )

  const handleDelete = useCallback(() => {
    dispatch(deleteColumn({ columnId: column.id }))
  }, [column.id, dispatch])

  const handleToggleAllAsSelected = useCallback(() => {
    dispatch(toggleAllAsSelected({ columnId: column.id }))
  }, [column.id, dispatch])

  return (
    <Draggable draggableId={column.id} index={index}>
      {(colProvided, colSnapshot) => (
        <div
          ref={colProvided.innerRef}
          className={twMerge(
            'flex select-none flex-col rounded-lg bg-gray-100 p-2',
            colSnapshot.isDragging ? 'bg-gray-200' : 'bg-gray-100',
          )}
          {...colProvided.draggableProps}
        >
          <div
            className="mb-2 flex items-center justify-between"
            {...colProvided.dragHandleProps}
          >
            <Checkbox
              name={column.id}
              onChange={handleToggleAllAsSelected}
              value={checkboxValue}
            />

            <h2 className="text-xl font-bold">{column.text}</h2>

            <div className="flex items-center">
              <CreateTodo columnId={column.id} />

              <EditColumn columnId={column.id} />

              <Button
                aria-label="Delete"
                className="ml-1 bg-white p-1"
                onClick={handleDelete}
                size="sm"
                title="Delete column"
                variant="danger"
              >
                <MdDelete />
              </Button>
            </div>
          </div>

          <Droppable droppableId={column.id} type="todo">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todos.map((todo, todoIndex) => {
                  if (!todo) {
                    return null
                  }

                  return (
                    <TodoCard
                      key={todo.id}
                      columnId={column.id}
                      index={todoIndex}
                      isDraggingOver={snapshot.isDraggingOver}
                      todo={todo}
                    />
                  )
                })}

                {provided.placeholder}

                {todos.length === 0 && (
                  <p className="text-center text-gray-500">
                    No todos yet. Add one above.
                  </p>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
