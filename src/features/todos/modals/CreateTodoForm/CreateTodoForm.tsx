import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button/Button'
import { Field } from '@/components/Field/Field'
import { Form } from '@/components/Form/Form'
import { ModalBody } from '@/components/ModalBody/ModalBody'
import { ModalContent } from '@/components/ModalContent/ModalContent'
import { ModalHeader } from '@/components/ModalHeader/ModalHeader'

import { createTodoFormSchema } from './CreateTodoForm.schema'
import type {
  CreateTodoFormModalProps,
  CreateTodoFormSchema,
} from './CreateTodoForm.types'
import { CreateTodoFormDefaultValues } from './CreateTodoForm.values'

export function CreateTodoForm({
  onClose,
  onSubmit,
}: CreateTodoFormModalProps) {
  const formMethods = useForm<CreateTodoFormSchema>({
    resolver: zodResolver(createTodoFormSchema),
    values: CreateTodoFormDefaultValues,
  })

  const handleSubmit = formMethods.handleSubmit(values => {
    onSubmit(values)

    onClose?.()
  })

  return (
    <ModalBody>
      <ModalHeader header="Create todo" onClose={onClose} />

      <ModalContent>
        <FormProvider {...formMethods}>
          <Form onSubmit={handleSubmit}>
            <Field label="Content" name="text" type="textarea" />

            <Field
              containerClassName="mt-2"
              label="Is completed"
              name="isCompleted"
              type="checkbox"
            />

            <Button className="mt-4" onClick={handleSubmit} type="submit">
              Create
            </Button>
          </Form>
        </FormProvider>
      </ModalContent>
    </ModalBody>
  )
}
