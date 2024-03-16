import { act, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { ModalProviderProps } from '@/providers/ModalProvider/ModalProvider.types'

import { useModal } from '@/hooks/useModal/useModal'

import { renderWithModalProvider } from '@/tests/utils/test-utils'

const defaultProps: ModalProviderProps = {
  children: <div>children mock</div>,
}

const setup = (props = defaultProps) => ({
  user: userEvent.setup(),
  ...renderWithModalProvider(<div>{props.children}</div>),
})

function Component() {
  return <div>modal content mock</div>
}

describe('ModalProvider', () => {
  it('renders the children when they are provided', ({ expect }) => {
    setup()

    const childrenElement = screen.getByText('children mock')

    expect(childrenElement).toBeInTheDocument()
  })

  it('opens modal and closes it', async ({ expect }) => {
    const { wrapper } = setup(defaultProps)

    const { result } = renderHook(() => useModal(), { wrapper })

    act(() => {
      result.current.setModal({
        component: Component,
        isOpen: true,
        props: {},
      })
    })

    await waitFor(() => {
      expect(result.current.isModalOpen).toBe(true)
    })

    expect(screen.getByText('modal content mock')).toBeInTheDocument()

    result.current.hideModal()

    await waitFor(() => {
      expect(result.current.isModalOpen).toBe(false)
      expect(screen.queryByText('modal content mock')).not.toBeInTheDocument()
    })
  })
})
