import React from 'react'
import { mount } from 'enzyme'

import Either from '.'

const wrap = (props = {}) => mount(<Either {...props} />)

describe('[Helper: Either]', () => {
  it('should render right component', () => {
    const either = wrap({ when: true, left: 'render', right: 'not render' })
    expect(either.props().when).toBeTruthy()
    expect(either.props().left).toEqual('render')
    expect(either.props().right).toEqual('not render')
  })

  it('should render left component', () => {
    const either = wrap({ when: false, left: 'not render', right: 'render' })
    expect(either.props().when).toBeFalsy()
    expect(either.props().left).toEqual('not render')
    expect(either.props().right).toEqual('render')
  })
})
