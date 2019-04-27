import React from 'react'
import { shallow, mount } from 'enzyme'
import Router from 'next/router'

import Logged from '.'

const wrap = (props = {}) => shallow(<Logged {...props} />)

const mockedRouter = { push: () => {} }
Router.router = mockedRouter

describe('[Page: Login]', () => {
  it('should mount logged container', () => {
    mount(<Logged />)
  })

  it('should render children', () => {
    const wrapper = wrap({ children: <div>Personal Wallet</div> })
    expect(wrapper.instance().props.children).toEqual(<div>Personal Wallet</div>)
  })
})
