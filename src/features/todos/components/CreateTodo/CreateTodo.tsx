import { useCallback } from 'react'
import { MdAdd } from 'react-icons/md'

import { Button } from '@/components/Button/Button'

import { useAppDispatch } from '@/store/hooks'

import { useModal } from '@/hooks/useModal/useModal'

import { CreateTodoForm } from '../../modals/CreateTodoForm/CreateTodoForm'
import type { CreateTodoFormSchema } from '../../modals/CreateTodoForm/CreateTodoForm.types'
import { createTodo } from '../../todosSlice'
import type { CreateTodoProps } from './CreateTodo.types'

export function CreateTodo({ columnId }: CreateTodoProps) {
  const dispatch = useAppDispatch()
  const { setModal } = useModal()

  const handleSubmit = useCallback(
    (values: CreateTodoFormSchema) => {
      dispatch(createTodo({ columnId, todo: values }))
    },
    [columnId, dispatch],
  )

  const openCreateTodoModal = useCallback(() => {
    setModal({
      component: CreateTodoForm,
      isOpen: true,
      props: {
        onSubmit: handleSubmit,
      },
    })
  }, [handleSubmit, setModal])

  return (
    <Button
      aria-label="Create todo"
      className="p-1"
      onClick={openCreateTodoModal}
      size="sm"
      title="Create todo"
      type="button"
      variant="secondary"
    >
      <MdAdd />
    </Button>
  )
}
