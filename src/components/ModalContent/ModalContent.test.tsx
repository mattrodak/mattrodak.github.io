import { render, screen } from '@testing-library/react'

import { ModalContent } from '@/components/ModalContent/ModalContent'
import type { ModalContentProps } from '@/components/ModalContent/ModalContent.types'

const defaultProps: ModalContentProps = {
  children: 'modal content',
}

const setup = (props = defaultProps) => ({
  ...render(<ModalContent {...props} />),
})

describe('ModalContent', () => {
  it('renders the children when they are provided', () => {
    setup()

    const childrenElement = screen.getByText('modal content')

    expect(childrenElement).toBeInTheDocument()
  })
})
