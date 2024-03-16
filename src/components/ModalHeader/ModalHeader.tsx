import { twMerge } from 'tailwind-merge'

import type { ModalHeaderProps } from '@/components/ModalHeader/ModalHeader.types'

export function ModalHeader(props: ModalHeaderProps) {
  const { className, header, onClose } = props

  return (
    <div
      className={twMerge(
        'flex items-center justify-between rounded-t border-b p-4',
        className,
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900">{header}</h3>

      {typeof onClose === 'function' && (
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
          type="button"
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="size-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M14.354 5.646a.5.5 0 01.708.708L10.707 10l4.354 4.354a.5.5 0 01-.708.708L10 10.707l-4.354 4.354a.5.5 0 01-.708-.708L9.293 10 5.646 5.646a.5.5 0 01.708-.708L10 9.293l4.354-4.354z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
