import type { DraggableLocation } from '@hello-pangea/dnd'

import type { AppStore } from '@/store/store'
import { makeStore } from '@/store/store'

import {
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
  todosSlice,
  type TodosSliceState,
} from './todosSlice'

interface LocalTestContext {
  store: AppStore
}

describe('todos reducer', () => {
  beforeEach<LocalTestContext>(context => {
    const initialState: TodosSliceState = {
      columnOrder: [],
      columns: {},
      filterBy: 'all',
      searchQuery: '',
      todos: {},
    }

    const store = makeStore({ todos: initialState })

    context.store = store
  })

  it('should handle initialState', () => {
    expect(todosSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      columnOrder: [],
      columns: {},
      filterBy: 'all',
      searchQuery: '',
      todos: {},
    })
  })

  it<LocalTestContext>('should handle setFilterBy', ({ store }) => {
    expect(store.getState().todos.filterBy).toEqual('all')

    store.dispatch(setFilterBy({ filterBy: 'completed' }))

    expect(store.getState().todos.filterBy).toEqual('completed')
  })

  it<LocalTestContext>('should handle createColumn', ({ store }) => {
    expect(store.getState().todos.columns).toEqual({})

    const column = { id: '1', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column }))

    expect(store.getState().todos.columns).toEqual({ '1': column })
  })

  it<LocalTestContext>('should handle createTodo', ({ store }) => {
    expect(store.getState().todos.todos).toEqual({})

    const column = { id: '1', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column }))

    const todo = { id: '1', isCompleted: false, text: 'Test' }

    store.dispatch(createTodo({ columnId: '1', todo }))

    expect(store.getState().todos.todos).toEqual({ '1': todo })
    expect(store.getState().todos.columns['1'].todoIds).toEqual(['1'])
  })

  it<LocalTestContext>('should handle deleteColumn', ({ store }) => {
    expect(store.getState().todos.columns).toEqual({})

    const column = { id: '1', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column }))

    expect(store.getState().todos.columns).toEqual({ '1': column })

    store.dispatch(deleteColumn({ columnId: '1' }))

    expect(store.getState().todos.columns).toEqual({})
  })

  it<LocalTestContext>('should handle deleteTodo', ({ store }) => {
    expect(store.getState().todos.todos).toEqual({})

    const column = { id: '1', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column }))

    const todo = { id: '1', isCompleted: false, text: 'Test' }

    store.dispatch(createTodo({ columnId: '1', todo }))

    expect(store.getState().todos.todos).toEqual({ '1': todo })

    store.dispatch(deleteTodo({ columnId: '1', todoId: '1' }))

    expect(store.getState().todos.todos).toEqual({})
  })

  it<LocalTestContext>('should handle editColumnById', ({ store }) => {
    expect(store.getState().todos.columns).toEqual({})

    const column = { id: '1', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column }))

    expect(store.getState().todos.columns['1'].text).toEqual('Test')

    store.dispatch(editColumnById({ columnId: '1', text: 'Updated' }))

    expect(store.getState().todos.columns['1'].text).toEqual('Updated')
  })

  it<LocalTestContext>('should handle editTodoById', ({ store }) => {
    expect(store.getState().todos.todos).toEqual({})

    const column = { id: '1', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column }))

    const todo = { id: '1', isCompleted: false, text: 'Test' }

    store.dispatch(createTodo({ columnId: '1', todo }))

    expect(store.getState().todos.todos['1'].text).toEqual('Test')

    store.dispatch(
      editTodoById({
        todo: { id: '1', isCompleted: false, text: 'Updated' },
        todoId: '1',
      }),
    )

    expect(store.getState().todos.todos['1'].text).toEqual('Updated')
  })

  it<LocalTestContext>('should handle reorderColumn', ({ store }) => {
    expect(store.getState().todos.columnOrder).toEqual([])

    const firstColumn = { id: '1', text: 'Test', todoIds: [] }
    const secondColumn = { id: '2', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column: firstColumn }))

    expect(store.getState().todos.columnOrder).toEqual(['1'])

    store.dispatch(createColumn({ column: secondColumn }))

    expect(store.getState().todos.columnOrder).toEqual(['1', '2'])

    const destination: DraggableLocation = { droppableId: '1', index: 1 }
    const source: DraggableLocation = { droppableId: '2', index: 0 }

    store.dispatch(reorderColumn({ destination, source }))

    expect(store.getState().todos.columnOrder).toEqual(['2', '1'])
  })

  it<LocalTestContext>('should handle reorder', ({ store }) => {
    expect(store.getState().todos.columns).toEqual({})

    const column = { id: '1', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column }))

    const firstTodo = { id: '1', isCompleted: false, text: 'Test' }
    const secondTodo = { id: '2', isCompleted: false, text: 'Test' }

    store.dispatch(createTodo({ columnId: '1', todo: firstTodo }))
    store.dispatch(createTodo({ columnId: '1', todo: secondTodo }))

    expect(store.getState().todos.columns['1'].todoIds).toEqual(['1', '2'])

    const destination: DraggableLocation = { droppableId: '1', index: 1 }
    const source: DraggableLocation = { droppableId: '1', index: 0 }

    store.dispatch(reorder({ destination, source }))

    expect(store.getState().todos.columns['1'].todoIds).toEqual(['2', '1'])
  })

  it<LocalTestContext>('should handle move', ({ store }) => {
    expect(store.getState().todos.columns).toEqual({})

    const firstColumn = { id: '1', text: 'Test', todoIds: [] }
    const secondColumn = { id: '2', text: 'Test', todoIds: [] }

    store.dispatch(createColumn({ column: firstColumn }))
    store.dispatch(createColumn({ column: secondColumn }))

    const todo = { id: '1', isCompleted: false, text: 'Test' }

    store.dispatch(createTodo({ columnId: '1', todo }))

    expect(store.getState().todos.columns['1'].todoIds).toEqual(['1'])
    expect(store.getState().todos.columns['2'].todoIds).toEqual([])

    const destination: DraggableLocation = { droppableId: '2', index: 0 }
    const source: DraggableLocation = { droppableId: '1', index: 0 }

    store.dispatch(move({ destination, source }))

    expect(store.getState().todos.columns['1'].todoIds).toEqual([])
    expect(store.getState().todos.columns['2'].todoIds).toEqual(['1'])
  })
})
