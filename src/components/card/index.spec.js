import React from 'react'
import { mount } from 'enzyme'

import Card from '.'

const wrap = (props = {}) => mount(<Card {...props} />)

describe('[Component: Card]', () => {
  it('should mount component with different combinations props', () => {
    mount(<Card />)
  })

  it('should render card with palette prop', () => {
    const card = palette => wrap({ palette, children: 'Personal Wallet' })
    expect(card('primary').props().palette).toBe('primary')
    expect(card('secondary').props().palette).toBe('secondary')
  })

  it('should render card children prop', () => {
    const card = wrap({ children: <h1>Personal Wallet</h1> })
    expect(card.props().children).toEqual(<h1>Personal Wallet</h1>)
  })
})
