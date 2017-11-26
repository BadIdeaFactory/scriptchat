/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import enzyme from 'enzyme'
import Input from '../Input'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Input label="foo" />, div)
})

it('runs change handler when value is changed', () => {
  const div = document.createElement('div')
  const handler = jest.fn()

  ReactDOM.render(<Input label="foo" onChange={handler} />, div)

  expect(handler.mock.calls[0][0]).toBe(0)
})

it('is a no-op when change handler is not provided', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Input label="foo" />, div)
})
