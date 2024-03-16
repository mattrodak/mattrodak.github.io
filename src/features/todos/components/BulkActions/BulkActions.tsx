import { useCallback } from 'react'
import { MdCheck, MdDelete } from 'react-icons/md'

import { Button } from '@/components/Button/Button'

import { useAppDispatch, useAppSelector } from '@/store/hooks'

import {
  bulkDeleteSelected,
  bulkToggleMarkAsCompleted,
  countSelectedTodos,
} from '../../todosSlice'

export function BulkActions() {
  const dispatch = useAppDispatch()
  const selectedTodosCount = useAppSelector(countSelectedTodos)

  const handleBulkDeleteSelected = useCallback(() => {
    dispatch(bulkDeleteSelected())
  }, [dispatch])

  const handleBulkToggleMarkAsCompleted = useCallback(() => {
    dispatch(bulkToggleMarkAsCompleted())
  }, [dispatch])

  return (
    <div className="mb-2 flex items-center justify-between">
      <p className="text-sm text-gray-500">{selectedTodosCount} selected</p>
      <div className="flex items-center">
        <h5 className="ml-2 text-lg font-bold">Bulk actions:</h5>

        <div className="ml-2 flex items-center">
          <Button
            aria-label="Mark as completed"
            className="p-1"
            disabled={!selectedTodosCount}
            onClick={handleBulkToggleMarkAsCompleted}
            title="Mark as completed"
            variant="secondary"
          >
            <MdCheck />
          </Button>

          <Button
            aria-label="Delete"
            className="ml-1 p-1"
            disabled={!selectedTodosCount}
            onClick={handleBulkDeleteSelected}
            title="Delete"
            variant="danger"
          >
            <MdDelete />
          </Button>
        </div>
      </div>
    </div>
  )
}
