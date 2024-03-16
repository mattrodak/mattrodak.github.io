import { useContext } from 'react'
import { isNil } from 'lodash-es'

import { ModalContext } from '@/providers/ModalProvider/ModalProvider'

/**
 * useModal hook is used to set modal context
 */
export const useModal = () => {
  const context = useContext(ModalContext)

  if (isNil(context)) {
    throw new Error('useModal must be used inside ModalProvider')
  }

  return context
}
