import { useCallback } from 'react'

import { Button } from '@/components/Button/Button'

import { useAppDispatch } from '@/store/hooks'

import { useModal } from '@/hooks/useModal/useModal'

import { CreateColumnForm } from '../../modals/CreateColumnForm/CreateColumnForm'
import type { CreateColumnFormSchema } from '../../modals/CreateColumnForm/CreateColumnForm.types'
import { createColumn } from '../../todosSlice'
import type { CreateColumnProps } from './CreateColumn.types'

export function CreateColumn({ className }: CreateColumnProps) {
  const dispatch = useAppDispatch()
  const { setModal } = useModal()

  const handleSubmit = useCallback(
    (values: CreateColumnFormSchema) => {
      dispatch(createColumn({ column: values }))
    },
    [dispatch],
  )

  const openCreateColumnModal = useCallback(() => {
    setModal({
      component: CreateColumnForm,
      isOpen: true,
      props: {
        onSubmit: handleSubmit,
      },
    })
  }, [handleSubmit, setModal])

  return (
    <Button
      aria-label="Create column"
      className={className}
      onClick={openCreateColumnModal}
      title="Create column"
      type="button"
    >
      Create column
    </Button>
  )
}
