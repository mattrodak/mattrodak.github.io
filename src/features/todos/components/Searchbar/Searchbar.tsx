import { useCallback } from 'react'

import { DebouncedInput } from '@/components/DebouncedInput/DebouncedInput'
import { Select } from '@/components/Select/Select'

import { useAppDispatch, useAppSelector } from '@/store/hooks'

import type { TodoStatusFilter } from '../../todosSlice'
import {
  selectSearchQuery,
  setFilterBy,
  setSearchQuery,
  TODO_STATUS_FILTERS,
} from '../../todosSlice'

export function Searchbar() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)

  const handleSearch = useCallback(
    (value: string) => {
      dispatch(setSearchQuery({ searchQuery: value }))
    },
    [dispatch],
  )

  const handleFilter = useCallback(
    (value: React.ChangeEvent<HTMLSelectElement>) => {
      const { value: filterBy } = value.target

      dispatch(setFilterBy({ filterBy: filterBy as TodoStatusFilter }))
    },
    [dispatch],
  )

  return (
    <div className="flex shrink grow items-center">
      <DebouncedInput
        className="shrink grow"
        name="searchQuery"
        onChange={handleSearch}
        placeholder="Search todos"
        value={searchQuery}
      />

      <Select
        containerClassName="ml-2 min-w-32"
        name="filter"
        onChange={handleFilter}
        options={TODO_STATUS_FILTERS.map(status => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
        }))}
      />
    </div>
  )
}
