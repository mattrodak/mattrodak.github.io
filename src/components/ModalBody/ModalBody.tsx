import { twMerge } from 'tailwind-merge'

import type { ModalBodyProps } from '@/components/ModalBody/ModalBody.types'

export function ModalBody(props: ModalBodyProps) {
  const { children, className } = props

  return (
    <div
      className={twMerge(
        'relative max-h-full w-full max-w-2xl px-2',
        className,
      )}
    >
      <div className="rounded-lg bg-white shadow">{children}</div>
    </div>
  )
}
