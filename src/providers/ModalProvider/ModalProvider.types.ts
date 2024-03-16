import type { ComponentType, ReactNode } from 'react'

export type ModalProviderProps = {
  children: ReactNode
  className?: string
}

export type ModalProviderState<T = any> = {
  component: ComponentType<T> | null
  isOpen: boolean
  props: JSX.IntrinsicAttributes & T
  contentClassName?: string
  onAfterClose?: () => void
  overlayClassName?: string
}

export type ModalProviderContextType = {
  hideModal: () => void
  isModalOpen: boolean
  setModal: <T>(state: React.SetStateAction<ModalProviderState<T>>) => void
}

export interface WithModalProviderProps {
  onClose?: () => void
}
