import { act, renderHook, screen } from '@testing-library/react'

import { useModal } from '@/hooks/useModal/useModal'

import { suppressConsoleLogs } from '@/tests/utils/suppress-console.logs'

import { ModalProvider } from '@/providers/ModalProvider/ModalProvider'

function Component() {
  return <div>Modal Content Mock</div>
}

describe.concurrent('useModal', () => {
  it('should apply correct modal props and render passed component', async ({
    expect,
  }) => {
    const wrapper = ({ children }: React.PropsWithChildren<{}>) => (
      <ModalProvider>{children}</ModalProvider>
    )

    const { result } = renderHook(() => useModal(), {
      wrapper,
    })

    act(() => {
      result.current.setModal({
        component: Component,
        isOpen: true,
        props: {},
      })
    })

    expect(result.current.isModalOpen).toBe(true)
    expect(screen.getByText('Modal Content Mock')).toBeInTheDocument()
  })

  it("should throw an error when it's used outside of ModalProvider", async ({
    expect,
  }) => {
    suppressConsoleLogs(() =>
      expect(() => renderHook(() => useModal())).toThrow(
        'useModal must be used inside ModalProvider',
      ),
    )
  })
})
