import React from 'react'
import { mount } from 'enzyme'

import PageTitle from '.'

const wrap = (props = {}) => mount(<PageTitle {...props} />)

describe('[Component: PageTitle]', () => {
  it('expected behavior', () => {
    mount(<PageTitle title="personal wallet" />)
    mount(<PageTitle title="personal wallet" description="amazing code" />)
    mount(
      <PageTitle title="personal wallet" description="amazing code">
        <div>This is a children!!!</div>
      </PageTitle>,
    )
  })

  it('should render prop title', () => {
    const wrapper = wrap({ title: 'Personal Wallet' })
    expect(wrapper.props().title).toEqual('Personal Wallet')
  })

  it('should render prop description', () => {
    const wrapper = wrap({ description: 'amazing code' })
    expect(wrapper.props().description).toEqual('amazing code')
  })

  it('should render prop children', () => {
    const wrapper = wrap({ children: <div>hello world</div> })
    expect(wrapper.props().children).toEqual(<div>hello world</div>)
  })
})
