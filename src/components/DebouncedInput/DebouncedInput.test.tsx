import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DebouncedInput } from '@/components/DebouncedInput/DebouncedInput'
import type { DebouncedInputProps } from '@/components/DebouncedInput/DebouncedInput.types'

const defaultProps: DebouncedInputProps = {
  name: 'test',
  onChange: () => {},
  value: 'test',
}

const setup = (props = defaultProps) => ({
  user: userEvent.setup(),
  ...render(<DebouncedInput {...props} />),
})

describe('DebouncedInput', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders input with default props', () => {
    setup()

    const inputElement = screen.getByRole('textbox')

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('test')
  })

  it('renders new value when tiggered by user', async () => {
    const { user } = setup()

    const inputElement = screen.getByRole<HTMLInputElement>('textbox')

    expect(inputElement).toHaveValue('test')

    await user.type(inputElement, 'test')

    expect(inputElement).toHaveValue('testtest')
  })

  it('calls onChange with the new value after the delay', async () => {
    const onChange = vi.fn()

    const { user } = setup({ ...defaultProps, onChange })

    const inputElement = screen.getByRole<HTMLInputElement>('textbox')

    await user.type(inputElement, 'test')

    expect(onChange).not.toHaveBeenCalled()

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('testtest')
    })
  })

  it('does not call onChange when inital value is undefined', async () => {
    vi.useFakeTimers()

    const onChange = vi.fn()

    setup({ ...defaultProps, delay: 300, onChange, value: undefined })

    const inputElement = screen.getByRole<HTMLInputElement>('textbox')

    inputElement.focus()
    inputElement.dispatchEvent(new Event('input', { bubbles: true }))

    expect(onChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)

    expect(onChange).not.toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('does not call onChange when value is the same as the previous value', async () => {
    vi.useFakeTimers()

    const onChange = vi.fn()

    setup({ ...defaultProps, delay: 300, onChange, value: 'test' })

    const inputElement = screen.getByRole<HTMLInputElement>('textbox')

    inputElement.focus()
    inputElement.dispatchEvent(new Event('input', { bubbles: true }))

    expect(onChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)

    expect(onChange).not.toHaveBeenCalled()

    vi.useRealTimers()
  })
})
