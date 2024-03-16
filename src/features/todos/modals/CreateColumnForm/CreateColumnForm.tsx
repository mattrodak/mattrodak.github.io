import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from 'nanoid'

import { Button } from '@/components/Button/Button'
import { Field } from '@/components/Field/Field'
import { Form } from '@/components/Form/Form'
import { ModalBody } from '@/components/ModalBody/ModalBody'
import { ModalContent } from '@/components/ModalContent/ModalContent'
import { ModalHeader } from '@/components/ModalHeader/ModalHeader'

import { createColumnFormSchema } from './CreateColumnForm.schema'
import type {
  CreateColumnFormProps,
  CreateColumnFormSchema,
} from './CreateColumnForm.types'
import { createColumnFormDefaultValues } from './CreateColumnForm.values'

export function CreateColumnForm({ onClose, onSubmit }: CreateColumnFormProps) {
  const formMethods = useForm<CreateColumnFormSchema>({
    resolver: zodResolver(createColumnFormSchema),
    values: createColumnFormDefaultValues,
  })

  const handleSubmit = formMethods.handleSubmit(values => {
    onSubmit({
      ...values,
      id: nanoid(8),
    })

    onClose?.()
  })

  return (
    <ModalBody>
      <ModalHeader header="Create column" onClose={onClose} />

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
