import React from 'react'
import { shallow, mount } from 'enzyme'
import Button from '.'

const wrap = (props = {}) => mount(<Button {...props} />)
const fn = jest.fn()

describe('[Component: Button]', () => {
  it('should mount component with different combinations props', () => {
    mount(<Button>Button</Button>)
    mount(<Button palette="secondary">Button</Button>)
    mount(<Button outline>Button</Button>)
    mount(<Button block>Button</Button>)
    mount(<Button disabled>Button</Button>)
  })

  it('should render button with type prop', () => {
    const button = type => wrap({ type, children: 'Personal Wallet' })

    expect(button('button').props().type).toBe('button')
    expect(button('submit').props().type).toBe('submit')
    expect(button('reset').props().type).toBe('reset')
  })

  it('should render button with size prop', () => {
    const button = size => wrap({ size, children: 'Personal Wallet' })

    expect(button('small').props().size).toBe('small')
    expect(button('medium').props().size).toBe('medium')
    expect(button('large').props().size).toBe('large')
  })

  it('should render button with palette prop', () => {
    const button = palette => wrap({ palette, children: 'Personal Wallet' })

    expect(button('primary').props().palette).toBe('primary')
    expect(button('secondary').props().palette).toBe('secondary')
    expect(button('gray').props().palette).toBe('gray')
  })

  it('should render button with outline prop', () => {
    const button = wrap({ outline: true })
    expect(button.props().outline).toBe(true)
  })

  it('should render button with block prop', () => {
    const button = wrap({ block: true })
    expect(button.props().block).toBe(true)
  })

  it('should render button with disabled prop', () => {
    const button = wrap({ disabled: true })
    expect(button.props().disabled).toBe(true)
  })

  it('should render button children prop', () => {
    const button = wrap({ children: <span>Personal Wallet</span> })
    expect(button.props().children).toEqual(<span>Personal Wallet</span>)
  })

  it('should register button click', () => {
    const button = shallow(<Button onClick={fn}>Personal Wallet</Button>)

    button.simulate('click')
    expect(fn).toHaveBeenCalled()
  })
})
