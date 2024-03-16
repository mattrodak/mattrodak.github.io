import type { DraggableLocation } from '@hello-pangea/dnd'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

export const TODO_STATUS_FILTERS = ['all', 'completed'] as const

export type TodoStatusFilter = (typeof TODO_STATUS_FILTERS)[number]

export type Todo = {
  id: string
  isCompleted: boolean
  text: string
  isSelected?: boolean
}

export type TodoColumn = {
  id: string
  text: string
  todoIds: string[]
}

export interface TodosSliceState {
  columnOrder: string[]
  columns: Record<string, TodoColumn>
  filterBy: TodoStatusFilter
  searchQuery: string
  todos: Record<string, Todo>
}

const initialState: TodosSliceState = {
  columnOrder: [],
  columns: {},
  filterBy: TODO_STATUS_FILTERS[0],
  searchQuery: '',
  todos: {},
}

export const todosSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: create => ({
    bulkDeleteSelected: create.reducer(state => {
      const selectedTodos = Object.values(state.todos).filter(
        todo => todo.isSelected,
      )

      selectedTodos.forEach(todo => {
        delete state.todos[todo.id]

        Object.values(state.columns).forEach(column => {
          column.todoIds = column.todoIds.filter(id => id !== todo.id)
        })
      })
    }),
    bulkToggleMarkAsCompleted: create.reducer(state => {
      const selectedTodos = Object.values(state.todos).filter(
        todo => todo.isSelected,
      )

      selectedTodos.forEach(todo => {
        todo.isCompleted = !todo.isCompleted
      })
    }),
    createColumn: create.reducer(
      (state, action: PayloadAction<{ column: TodoColumn }>) => {
        state.columns[action.payload.column.id] = action.payload.column
        state.columnOrder.push(action.payload.column.id)
      },
    ),
    createTodo: create.reducer(
      (state, action: PayloadAction<{ columnId: string; todo: Todo }>) => {
        const { columnId, todo } = action.payload

        state.todos[todo.id] = todo
        state.columns[columnId].todoIds.push(todo.id)
      },
    ),
    deleteColumn: create.reducer(
      (state, action: PayloadAction<{ columnId: string }>) => {
        const { columnId } = action.payload

        state.columnOrder = state.columnOrder.filter(id => id !== columnId)
        delete state.columns[columnId]
      },
    ),
    deleteTodo: create.reducer(
      (state, action: PayloadAction<{ columnId: string; todoId: string }>) => {
        const { columnId, todoId } = action.payload
        const column = state.columns[columnId]

        column.todoIds = column.todoIds.filter(id => id !== todoId)
        delete state.todos[todoId]
      },
    ),
    editColumnById: create.reducer(
      (
        state,
        action: PayloadAction<{ columnId: string; text: TodoColumn['text'] }>,
      ) => {
        const { columnId, text } = action.payload

        state.columns[columnId].text = text
      },
    ),
    editTodoById: create.reducer(
      (state, action: PayloadAction<{ todo: Todo; todoId: string }>) => {
        const { todo, todoId } = action.payload

        state.todos[todoId] = todo
      },
    ),
    move: create.reducer(
      (
        state,
        action: PayloadAction<{
          destination: DraggableLocation
          source: DraggableLocation
        }>,
      ) => {
        const { destination, source } = action.payload

        const sourceColumn = state.columns[source.droppableId]
        const destinationColumn = state.columns[destination.droppableId]

        const sourceTodos = Array.from(sourceColumn.todoIds)
        const destinationTodos = Array.from(destinationColumn.todoIds)

        const [removed] = sourceTodos.splice(source.index, 1)

        destinationTodos.splice(destination.index, 0, removed)

        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...sourceColumn,
            todoIds: sourceTodos,
          },
          [destination.droppableId]: {
            ...destinationColumn,
            todoIds: destinationTodos,
          },
        }
      },
    ),
    reorder: create.reducer(
      (
        state,
        action: PayloadAction<{
          destination: DraggableLocation
          source: DraggableLocation
        }>,
      ) => {
        const { destination, source } = action.payload

        const column = state.columns[source.droppableId]
        const newTodos = Array.from(column.todoIds)

        newTodos.splice(source.index, 1)
        newTodos.splice(destination.index, 0, column.todoIds[source.index])

        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...column,
            todoIds: newTodos,
          },
        }
      },
    ),
    reorderColumn: create.reducer(
      (
        state,
        action: PayloadAction<{
          destination: DraggableLocation
          source: DraggableLocation
        }>,
      ) => {
        const { destination, source } = action.payload
        const newColumnOrder = Array.from(state.columnOrder)

        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(
          destination.index,
          0,
          state.columnOrder[source.index],
        )

        state.columnOrder = newColumnOrder
      },
    ),
    setFilterBy: create.reducer(
      (state, action: PayloadAction<{ filterBy: TodoStatusFilter }>) => {
        state.filterBy = action.payload.filterBy
      },
    ),
    setSearchQuery: create.reducer(
      (state, action: PayloadAction<{ searchQuery: string }>) => {
        state.searchQuery = action.payload.searchQuery
      },
    ),
    toggleAllAsSelected: create.reducer(
      (state, action: PayloadAction<{ columnId: string }>) => {
        const { columnId } = action.payload
        const column = state.columns[columnId]

        const allSelected = column.todoIds.every(
          todoId => state.todos[todoId].isSelected,
        )

        column.todoIds.forEach(todoId => {
          state.todos[todoId].isSelected = !allSelected
        })
      },
    ),
    toggleMarkAsCompleted: create.reducer(
      (state, action: PayloadAction<{ todoId: string }>) => {
        const { todoId } = action.payload

        state.todos[todoId].isCompleted = !state.todos[todoId].isCompleted
      },
    ),
    toggleMarkAsSelected: create.reducer(
      (state, action: PayloadAction<{ todoId: string }>) => {
        const { todoId } = action.payload

        state.todos[todoId].isSelected = !state.todos[todoId].isSelected
      },
    ),
  }),
  selectors: {
    countSelectedTodos: state =>
      Object.values(state.todos).filter(todo => todo.isSelected).length,
    getCheckboxValueForBulkSelection: createSelector(
      (state: TodosSliceState) => state.columns,
      (state: TodosSliceState) => state.todos,
      (_: unknown, columnId: string) => columnId,
      (columns, todos, columnId) => {
        const column = columns[columnId]
        const all = column.todoIds.length
        const selected = column.todoIds.filter(
          todoId => todos[todoId].isSelected,
        ).length

        if (selected > 0 && selected < all) {
          return -1
        }

        return all === selected ? 1 : 0
      },
    ),
    selectColumnById: (state, columnId: string) => state.columns[columnId],
    selectColumnOrder: state => state.columnOrder,
    selectColumns: state => state.columns,
    selectFilteredTodos: createSelector(
      (state: TodosSliceState) => state.todos,
      (state: TodosSliceState) => state.searchQuery,
      (state: TodosSliceState) => state.filterBy,
      (todos, searchQuery, filterBy) => {
        const query = searchQuery.toLowerCase()

        const filteredTodos = Object.values(todos)
          .filter(todo => todo.text.toLowerCase().includes(query))
          .filter(
            todo =>
              filterBy === 'all' ||
              (filterBy === 'completed' && todo.isCompleted),
          )

        return filteredTodos.reduce(
          (result, todo) => {
            result[todo.id] = todo

            return result
          },
          {} as Record<string, Todo>,
        )
      },
    ),
    selectSearchQuery: state => state.searchQuery,
    selectTodoById: (state, todoId: string) => state.todos[todoId],
    selectTodosByColumnId: (state, columnId: string) => {
      const column = state.columns[columnId]

      return column.todoIds.map(todoId => state.todos[todoId])
    },
  },
})

export const {
  bulkDeleteSelected,
  bulkToggleMarkAsCompleted,
  createColumn,
  createTodo,
  deleteColumn,
  deleteTodo,
  editColumnById,
  editTodoById,
  move,
  reorder,
  reorderColumn,
  setFilterBy,
  setSearchQuery,
  toggleAllAsSelected,
  toggleMarkAsCompleted,
  toggleMarkAsSelected,
} = todosSlice.actions

export const {
  countSelectedTodos,
  getCheckboxValueForBulkSelection,
  selectColumnById,
  selectColumnOrder,
  selectColumns,
  selectFilteredTodos,
  selectSearchQuery,
  selectTodoById,
} = todosSlice.selectors
