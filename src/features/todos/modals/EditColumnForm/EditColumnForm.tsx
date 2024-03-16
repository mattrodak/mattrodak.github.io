import { Form, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button/Button'
import { Field } from '@/components/Field/Field'
import { ModalBody } from '@/components/ModalBody/ModalBody'
import { ModalContent } from '@/components/ModalContent/ModalContent'
import { ModalHeader } from '@/components/ModalHeader/ModalHeader'

import { useAppSelector } from '@/store/hooks'

import { selectColumnById } from '../../todosSlice'
import { editColumnFormSchema } from './EditColumnForm.schema'
import type {
  EditColumnFormProps,
  EditColumnFormSchema,
} from './EditColumnForm.types'

export function EditColumnForm({
  columnId,
  onClose,
  onSubmit,
}: EditColumnFormProps) {
  const column = useAppSelector(state => selectColumnById(state, columnId))
  const formMethods = useForm<EditColumnFormSchema>({
    resolver: zodResolver(editColumnFormSchema),
    values: column,
  })

  const handleSubmit = formMethods.handleSubmit(values => {
    onSubmit(values)

    onClose?.()
  })

  return (
    <ModalBody>
      <ModalHeader header="Edit column" onClose={onClose} />

      <ModalContent>
        <FormProvider {...formMethods}>
          <Form>
            <Field label="Column name" name="text" type="text" />

            <Button className="mt-4" onClick={handleSubmit} type="submit">
              Create
            </Button>
          </Form>
        </FormProvider>
      </ModalContent>
    </ModalBody>
  )
}
