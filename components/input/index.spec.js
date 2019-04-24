import React from 'react'
import { shallow, mount } from 'enzyme'

import Input from '.'

const wrap = (props = {}) => shallow(<Input {...props} />)

describe('[Component: Input]', () => {
  it('expected behavior', () => {
    mount(<Input name="personal-wallet" />)
    mount(<Input name="personal-wallet" disabled />)
    mount(<Input name="personal-wallet" required />)
    mount(<Input name="personal-wallet" placeholder="personal wallet" />)
  })

  it('renders props when passed in', () => {
    const wrapper = wrap({ type: 'text' })
    expect(wrapper.find({ type: 'text' })).toHaveLength(1)
  })

  it('renders props when passed in', () => {
    const wrapper = wrap({ size: 'medium' })
    expect(wrapper.find({ size: 'medium' })).toHaveLength(1)
  })

  it('renders props when passed in', () => {
    const wrapper = wrap({ placeholder: 'personal wallet' })
    expect(wrapper.find({ placeholder: 'personal wallet' })).toHaveLength(1)
  })

  it('should render name prop', () => {
    const wrapper = mount(<Input name="Success!" />)
    expect(wrapper.prop('name')).toEqual('Success!')
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
    const wrapper = wrap({ onChange: fn() })

    wrapper.simulate('input')
    expect(fn).toHaveBeenCalled()
  })
})
