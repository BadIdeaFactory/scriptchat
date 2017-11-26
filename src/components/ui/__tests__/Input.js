/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Input from '../Input'

describe('Input', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Input label="foo" />, div)
  })

  it('sets an empty string initial value', () => {
    const wrapper = shallow(<Input label="foo" />)
    expect(wrapper.find('input').props().value).toBe('')
  })

  it('sets an initial value if provided', () => {
    const value = 'foo'
    const wrapper = shallow(<Input label="foo" value={value} />)
    expect(wrapper.find('input').props().value).toBe(value)
  })

  it('runs change handler when value is changed', () => {
    const value = 'foo'
    const handler = jest.fn()
    const wrapper = shallow(<Input label="foo" onChange={handler} />)
    const input = wrapper.find('input')

    // Simulates a change event for each keystroke
    for (let i = 1; i <= value.length; i++) {
      input.simulate('change', { target: { value: value.substr(0, i) } })
    }

    // The onChange handler should be called for each keystroke
    expect(handler).toHaveBeenCalledTimes(value.length)
    expect(handler).toHaveBeenLastCalledWith(value)
  })

  it('is a no-op when change handler is not provided', () => {
    const value = 'foo'
    const handler = jest.fn()
    const wrapper = shallow(<Input label="foo" />)
    wrapper.find('input').simulate('change', { target: { value } })
    expect(handler).not.toBeCalled()
  })
})
