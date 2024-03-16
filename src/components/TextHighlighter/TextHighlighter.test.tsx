import { render, screen } from '@testing-library/react'

import { TextHighlighter } from './TextHighlighter'
import type { TextHighlighterProps } from './TextHighlighter.types'

const defaultProps: TextHighlighterProps = {
  searchQuery: ['search'],
  textToHighlight: 'search text',
}

const setup = (props = defaultProps) => ({
  ...render(<TextHighlighter {...props} />),
})

describe('TextHighlighter', () => {
  it('renders highlighted text', () => {
    setup()

    expect(screen.getByText('search')).toHaveClass('highlight')
  })

  it('renders text without highlighting', () => {
    setup({ ...defaultProps, searchQuery: ['not'] })

    expect(screen.getByText('search text')).not.toHaveClass('highlight')
  })

  it('renders multiple highlighted texts', () => {
    setup({ ...defaultProps, searchQuery: ['search', 'text'] })

    expect(screen.getByText('search')).toHaveClass('highlight')
    expect(screen.getByText('text')).toHaveClass('highlight')
  })

  it('renders text without highlighting when search query contains empty strings', () => {
    setup({ ...defaultProps, searchQuery: ['', ''] })

    expect(screen.getByText('search text')).not.toHaveClass('highlight')
  })

  it('renders text without highlighting when search query is empty', () => {
    setup({ ...defaultProps, searchQuery: [] })

    expect(screen.getByText('search text')).not.toHaveClass('highlight')
  })
})
