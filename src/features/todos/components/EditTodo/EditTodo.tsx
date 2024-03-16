import { useCallback } from 'react'
import { MdEdit } from 'react-icons/md'

import { Button } from '@/components/Button/Button'

import { useAppDispatch } from '@/store/hooks'

import { useModal } from '@/hooks/useModal/useModal'

import { EditTodoForm } from '../../modals/EditTodoForm/EditTodoForm'
import type { EditTodoFormSchema } from '../../modals/EditTodoForm/EditTodoForm.types'
import { editTodoById } from '../../todosSlice'
import type { EditTodoProps } from './EditTodo.types'

export function EditTodo({ todoId }: EditTodoProps) {
  const dispatch = useAppDispatch()
  const { setModal } = useModal()

  const handleSubmit = useCallback(
    (values: EditTodoFormSchema) => {
      dispatch(editTodoById({ todo: values, todoId }))
    },
    [dispatch, todoId],
  )

  const openEditTodoModal = useCallback(() => {
    setModal({
      component: EditTodoForm,
      isOpen: true,
      props: {
        onSubmit: handleSubmit,
        todoId,
      },
    })
  }, [handleSubmit, setModal, todoId])

  return (
    <Button
      aria-label="Edit todo"
      className="p-1"
      onClick={openEditTodoModal}
      size="sm"
      title="Edit todo"
      type="button"
      variant="secondary"
    >
      <MdEdit />
    </Button>
  )
}
