import { render, screen } from '@testing-library/react'

import { ModalBody } from '@/components/ModalBody/ModalBody'
import type { ModalBodyProps } from '@/components/ModalBody/ModalBody.types'

const defaultProps: ModalBodyProps = {
  children: 'modal body',
}

const setup = (props = defaultProps) => ({
  ...render(<ModalBody {...props} />),
})

describe('ModalBody', () => {
  it('renders the children when they are provided', () => {
    setup()

    const childrenElement = screen.getByText('modal body')

    expect(childrenElement).toBeInTheDocument()
  })
})
