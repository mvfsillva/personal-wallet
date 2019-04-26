import React from 'react'
import { shallow, mount } from 'enzyme'

import Input from '.'

const wrap = (props = {}) => mount(<Input {...props} />)

describe('[Component: Input]', () => {
  it('expected behavior', () => {
    mount(<Input name="personal-wallet" />)
    mount(<Input name="personal-wallet" disabled />)
    mount(<Input name="personal-wallet" required />)
    mount(<Input name="personal-wallet" placeholder="personal wallet" />)
    mount(<Input name="personal-wallet" label="personal wallet" />)
  })

  it('should render input with type prop', () => {
    const input = type => wrap({ type })

    expect(input('text').props().type).toBe('text')
    expect(input('email').props().type).toBe('email')
    expect(input('password').props().type).toBe('password')
    expect(input('number').props().type).toBe('number')
  })

  it('should render input label prop', () => {
    const input = wrap({ label: 'Personal Wallet' })
    expect(input.props().label).toEqual('Personal Wallet')
  })

  it('should render input error prop', () => {
    const input = wrap({ error: 'error example' })
    expect(input.props().error).toEqual('error example')
  })

  it('should render required', () => {
    const wrapper = mount(<Input disabled />)
    expect(wrapper.prop('disabled')).toBeTruthy()
  })

  it('should render disabled', () => {
    const wrapper = mount(<Input required />)
    expect(wrapper.prop('required')).toBeTruthy()
  })

  it('should register onChange call', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Input onChange={fn()} />)

    wrapper.simulate('input')
    expect(fn).toHaveBeenCalled()
  })
})
