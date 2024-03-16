import type { WithModalProviderProps } from '@/providers/ModalProvider/ModalProvider.types'

export interface ModalHeaderProps extends WithModalProviderProps {
  header: string
  className?: string
}
