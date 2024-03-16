import type { DropResult } from '@hello-pangea/dnd'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useMediaQuery } from '@react-hookz/web'

import { useAppDispatch, useAppSelector } from '@/store/hooks'

import { BulkActions } from './components/BulkActions/BulkActions'
import { CreateColumn } from './components/CreateColumn/CreateColumn'
import { DraggableColumn } from './components/DraggableColumn/DraggableColumn'
import { Searchbar } from './components/Searchbar/Searchbar'
import {
  move,
  reorder,
  reorderColumn,
  selectColumnOrder,
  selectColumns,
  selectFilteredTodos,
} from './todosSlice'

export function Todos() {
  const dispatch = useAppDispatch()
  const columns = useAppSelector(selectColumns)
  const columnOrder = useAppSelector(selectColumnOrder)
  const todos = useAppSelector(selectFilteredTodos)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceId = source.droppableId
    const destinationId = destination.droppableId

    if (type === 'columns') {
      dispatch(reorderColumn({ destination, source }))

      return
    }

    if (sourceId === destinationId) {
      // same column - reorder
      dispatch(reorder({ destination, source }))
    } else {
      // different column - move
      dispatch(move({ destination, source }))
    }
  }

  return (
    <>
      <div className="mb-6 block pt-6 sm:flex sm:items-center">
        <Searchbar />

        <CreateColumn className="mt-2 w-full sm:ml-4 sm:mt-0 sm:w-auto" />
      </div>

      <BulkActions />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          direction={isDesktop ? 'horizontal' : 'vertical'}
          droppableId="all-columns"
          type="columns"
        >
          {provided => (
            <div
              ref={provided.innerRef}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              {...provided.droppableProps}
            >
              {columnOrder.map((columnId, columndIndex) => {
                const column = columns[columnId]
                const todosInColumn = column.todoIds.map(
                  todoId => todos[todoId],
                )

                return (
                  <DraggableColumn
                    key={column.id}
                    column={column}
                    index={columndIndex}
                    todos={todosInColumn}
                  />
                )
              })}

              {provided.placeholder}

              {columnOrder.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  No columns yet. Add first!
                </p>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
