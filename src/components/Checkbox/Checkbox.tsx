import { forwardRef, useEffect, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import { twMerge } from 'tailwind-merge'

import type { CheckboxProps } from './Checkbox.types'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, isInvalid, label, name, value, ...props }, ref) => {
    const checkboxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      const { current: checkbox } = checkboxRef

      if (!checkbox) {
        return
      }

      checkbox.checked = value === 1
      checkbox.indeterminate = value === -1
    }, [value])

    return (
      <div className="flex items-center">
        <input
          ref={mergeRefs([checkboxRef, ref])}
          className={twMerge(
            'size-4 rounded border-gray-300 bg-white text-blue-600',
            isInvalid && 'border-red-500',
            className,
          )}
          id={name}
          name={name}
          {...props}
          type="checkbox"
        />

        {label && (
          <label
            className="ms-2 text-sm font-medium text-gray-900 "
            htmlFor={name}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)
