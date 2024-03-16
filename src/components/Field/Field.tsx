import { useCallback, useMemo } from 'react'
import { get, useFormContext } from 'react-hook-form'

import { InputError } from '../InputError/InputError'
import { InputLabel } from '../InputLabel/InputLabel'
import { type FieldProps, FieldTypes } from './Field.types'
import { FieldCheckbox } from './FieldCheckbox'
import { FieldInput } from './FieldInput'
import { FieldTextarea } from './FieldTextarea'

export function Field({
  containerClassName,
  label,
  markAsRequired,
  name,
  type,
  ...props
}: FieldProps) {
  const { formState } = useFormContext()
  const { errors } = formState
  const errorMessage = get(errors, name)?.message
  const hasError = Boolean(errorMessage)

  const renderInput = useCallback(() => {
    if (type !== 'email' && type !== 'password' && type !== 'text') {
      return null
    }

    return (
      <FieldInput isInvalid={hasError} name={name} type={type} {...props} />
    )
  }, [hasError, name, props, type])

  const renderTextarea = useCallback(() => {
    if (type !== 'textarea') {
      return null
    }

    return <FieldTextarea isInvalid={hasError} name={name} {...props} />
  }, [hasError, name, props, type])

  const renderCheckbox = useCallback(() => {
    if (type !== 'checkbox') {
      return null
    }

    return (
      <FieldCheckbox
        isInvalid={hasError}
        label={label}
        name={name}
        {...props}
      />
    )
  }, [hasError, label, name, props, type])

  const renderInputOfType = useMemo(() => {
    switch (type) {
      case FieldTypes.textarea:
        return renderTextarea()
      case FieldTypes.checkbox:
        return renderCheckbox()
      default:
        return renderInput()
    }
  }, [renderCheckbox, renderInput, renderTextarea, type])

  const renderLabel = useMemo(() => {
    if (!label || type === FieldTypes.checkbox) {
      return null
    }

    return <InputLabel isRequired={markAsRequired} label={label} name={name} />
  }, [label, markAsRequired, name, type])

  const renderError = useMemo(() => {
    if (!hasError) {
      return null
    }

    return <InputError errorMessage={errorMessage} />
  }, [errorMessage, hasError])

  return (
    <div className={containerClassName}>
      {renderLabel}

      {renderInputOfType}

      {renderError}
    </div>
  )
}
