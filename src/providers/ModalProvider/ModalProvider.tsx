import { createContext, useCallback, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { Transition } from 'react-transition-group'
import { isNil } from 'lodash-es'
import { twMerge } from 'tailwind-merge'

import { INITIAL_MODAL_STATE } from './ModalProvider.constants'
import type { ModalProviderContextType } from './ModalProvider.types'

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root')
}

export const ModalContext = createContext<ModalProviderContextType | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(INITIAL_MODAL_STATE)

  const hideModal = useCallback(() => {
    setModal({ ...modal, isOpen: false })
  }, [modal])

  const resetState = () => {
    setModal(INITIAL_MODAL_STATE)
  }

  const setOnAfterClose = (onAfterClose: () => void) => {
    setModal(state => ({ ...state, onAfterClose }))
  }

  const contextValue = useMemo(
    () => ({ hideModal, isModalOpen: modal.isOpen, setModal }),
    [hideModal, modal.isOpen],
  )

  const {
    component: Component,
    contentClassName,
    isOpen,
    onAfterClose,
    overlayClassName,
    props,
  } = modal

  return (
    <ModalContext.Provider value={contextValue} {...props}>
      {children}

      <Transition in={isOpen} onExited={resetState} timeout={300}>
        <ReactModal
          ariaHideApp={process.env.NODE_ENV !== 'test'}
          className={twMerge(
            `flex h-full items-center justify-center`,
            contentClassName,
          )}
          closeTimeoutMS={300}
          isOpen={isOpen}
          onAfterClose={onAfterClose}
          onRequestClose={hideModal}
          overlayClassName={twMerge(
            'fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/10 outline-none backdrop-blur-sm transition-all duration-300 ease-[ease-in-out] focus:outline-none',
            overlayClassName,
          )}
        >
          {!isNil(Component) ? (
            <Component
              onClose={hideModal}
              setOnAfterClose={setOnAfterClose}
              {...modal.props}
            />
          ) : null}
        </ReactModal>
      </Transition>
    </ModalContext.Provider>
  )
}
