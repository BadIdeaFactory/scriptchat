/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input', () => {
  it('renders an input with a label', () => {
    render(<Input label="foo" />)

    expect(screen.getByText('foo')).toBeInTheDocument()
  })

  it('sets an empty string initial value', () => {
    render(<Input label="foo" />)

    expect(screen.getByLabelText('foo').value).toBe('')
  })

  it('sets an initial value if provided', () => {
    const value = 'bar'
    render(<Input label="foo" value={value} />)

    expect(screen.getByLabelText('foo').value).toBe(value)
  })

  it('runs change handler when value is changed', () => {
    const value = 'bar'
    const handler = jest.fn()

    render(<Input label="foo" onChange={handler} />)

    const input = screen.getByLabelText('foo')

    // Simulates a change event for each keystroke
    userEvent.type(input, value)

    // The onChange handler should be called for each keystroke
    expect(handler).toHaveBeenCalledTimes(value.length)
    expect(handler).toHaveBeenLastCalledWith(value.slice(-1))
  })

  it('is a no-op when change handler is not provided', () => {
    const value = 'bar'
    const handler = jest.fn()

    render(<Input label="foo" />)

    const input = screen.getByLabelText('foo')

    // Simulates a change event for each keystroke
    userEvent.type(input, value)

    // The onChange handler should be called for each keystroke
    expect(handler).not.toBeCalled()
  })
})
