import React from 'react'
import { mount } from 'enzyme'
import Loader from '.'

const wrap = (props = {}) => mount(<Loader {...props} />)

describe('[Component: Loader]', () => {
  it('should mount component with different combinations props', () => {
    mount(<Loader />)
    mount(<Loader palette="red" />)
    mount(<Loader size={12} />)
  })

  it('should render loader size prop', () => {
    const loader = wrap({ size: 50 })
    expect(loader.props().size).toEqual(50)
  })

  it('should render loader color prop', () => {
    const loader = wrap({ palette: 'red' })
    expect(loader.props().palette).toBe('red')
  })
})
