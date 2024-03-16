import { useCallback } from 'react'
import { MdEdit } from 'react-icons/md'

import { Button } from '@/components/Button/Button'

import { useAppDispatch } from '@/store/hooks'

import { useModal } from '@/hooks/useModal/useModal'

import { EditColumnForm } from '../../modals/EditColumnForm/EditColumnForm'
import type { EditColumnFormSchema } from '../../modals/EditColumnForm/EditColumnForm.types'
import { editColumnById } from '../../todosSlice'
import type { EditColumnProps } from './EditColumn.types'

export function EditColumn({ columnId }: EditColumnProps) {
  const dispatch = useAppDispatch()
  const { setModal } = useModal()

  const handleSubmit = useCallback(
    (values: EditColumnFormSchema) => {
      dispatch(editColumnById({ columnId, text: values.text }))
    },
    [columnId, dispatch],
  )

  const openEditColumnModal = useCallback(() => {
    setModal({
      component: EditColumnForm,
      isOpen: true,
      props: {
        columnId,
        onSubmit: handleSubmit,
      },
    })
  }, [columnId, handleSubmit, setModal])

  return (
    <Button
      aria-label="Edit column"
      className="ml-1 p-1"
      onClick={openEditColumnModal}
      size="sm"
      title="Edit column"
      type="button"
      variant="secondary"
    >
      <MdEdit />
    </Button>
  )
}
