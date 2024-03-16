import { twMerge } from 'tailwind-merge'

import type { ModalContentProps } from '@/components/ModalContent/ModalContent.types'

export function ModalContent(props: ModalContentProps) {
  const { children, className } = props

  return <div className={twMerge('space-y-4 p-4', className)}>{children}</div>
}
