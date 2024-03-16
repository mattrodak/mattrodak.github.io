import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button/Button'
import { Field } from '@/components/Field/Field'
import { Form } from '@/components/Form/Form'
import { ModalBody } from '@/components/ModalBody/ModalBody'
import { ModalContent } from '@/components/ModalContent/ModalContent'
import { ModalHeader } from '@/components/ModalHeader/ModalHeader'

import { useAppSelector } from '@/store/hooks'

import { selectTodoById } from '../../todosSlice'
import { editTodoFormSchema } from './EditTodoForm.schema'
import type {
  EditTodoFormModalProps,
  EditTodoFormSchema,
} from './EditTodoForm.types'

export function EditTodoForm({
  onClose,
  onSubmit,
  todoId,
}: EditTodoFormModalProps) {
  const todo = useAppSelector(state => selectTodoById(state, todoId))
  const formMethods = useForm<EditTodoFormSchema>({
    resolver: zodResolver(editTodoFormSchema),
    values: todo,
  })

  const handleSubmit = formMethods.handleSubmit(values => {
    onSubmit(values)

    onClose?.()
  })

  return (
    <ModalBody>
      <ModalHeader header="Edit todo" onClose={onClose} />

      <ModalContent>
        <FormProvider {...formMethods}>
          <Form onSubmit={handleSubmit}>
            <Field label="Content" name="text" type="textarea" />

            <Button className="mt-4" onClick={handleSubmit} type="submit">
              Save
            </Button>
          </Form>
        </FormProvider>
      </ModalContent>
    </ModalBody>
  )
}
