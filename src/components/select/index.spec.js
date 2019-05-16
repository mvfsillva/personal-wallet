import React from 'react'
import { shallow, mount } from 'enzyme'

import Select from '.'

const wrap = (props = {}) => shallow(<Select {...props} />)
const fn = jest.fn()

const options = [{ value: '1', labelOption: 'option 01' }, { value: '2', labelOption: 'option 02' }]

describe('Component: Select', () => {
  it('should mount component with different combinations props', () => {
    mount(<Select name="select-mount" options={options} placeholder="select" />)
    mount(<Select name="quotation" options={options} placeholder="select disabled" disabled />)
    mount(<Select name="quotation" options={options} placeholder="select disabled" required />)
    mount(<Select name="onblur" options={options} onBlur={fn} placeholder="onblur" />)
    mount(<Select name="onfocus" options={options} onFocus={fn} placeholder="onfocus" />)
    mount(<Select name="onchange" options={options} onChange={fn} placeholder="onchange" />)
  })

  it('should verify option label', () => {
    const wrapper = wrap({ options })
    expect(wrapper.instance().props.options[0].labelOption).toBe('option 01')
    expect(wrapper.instance().props.options[1].labelOption).toBe('option 02')
  })

  it('should verify the type of options prop', () => {
    const wrapper = wrap({ options })
    expect(Array.isArray(wrapper.instance().props.options)).toBe(true)
  })

  it('should verify if the prop exists', () => {
    const wrapper = wrap({
      options,
      label: 'select',
      name: 'select',
      placeholder: 'unicorn',
    })
    expect(wrapper.instance().props).toBeTruthy()
  })

  it('should register Select change', () => {
    const wrapper = wrap({ onChange: fn() })
    wrapper.simulate('select')
    expect(fn).toHaveBeenCalled()
  })

  it('should register Select blur', () => {
    const wrapper = wrap({ onBlur: fn() })
    wrapper.simulate('select')
    expect(fn).toHaveBeenCalled()
  })

  it('should register Select focus', () => {
    const wrapper = wrap({ onFocus: fn() })
    wrapper.simulate('select')
    expect(fn).toHaveBeenCalled()
  })
})
