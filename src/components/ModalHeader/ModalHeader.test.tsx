import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ModalHeader } from '@/components/ModalHeader/ModalHeader'
import type { ModalHeaderProps } from '@/components/ModalHeader/ModalHeader.types'

const defaultProps: ModalHeaderProps = {
  header: 'modal header',
}

const setup = (props = defaultProps) => ({
  ...render(<ModalHeader {...props} />),
  user: userEvent.setup(),
})

describe('ModalHeader', () => {
  it('renders the children when they are provided', () => {
    setup()

    const childrenElement = screen.getByText('modal header')

    expect(childrenElement).toBeInTheDocument()
  })

  it('renders the close button when the onClose prop is provided', () => {
    setup({ ...defaultProps, onClose: vi.fn() })

    const closeButtonElement = screen.getByRole('button')

    expect(closeButtonElement).toBeInTheDocument()
  })

  it('calls the onClose prop when the close button is clicked', async () => {
    const onClose = vi.fn()

    const { user } = setup({ ...defaultProps, onClose })

    const closeButtonElement = screen.getByRole('button')

    await user.click(closeButtonElement)

    expect(onClose).toHaveBeenCalled()
  })
})
