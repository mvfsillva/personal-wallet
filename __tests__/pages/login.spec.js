import React from 'react'
import { shallow, mount } from 'enzyme'
import Router from 'next/router'

import Login from '../../pages'

const wrap = (props = {}) => mount(shallow(<Login {...props} />).get(0))

const mockedRouter = { push: () => {} }
Router.router = mockedRouter

describe('[Page: Login]', () => {
  it('should mount register page component', () => {
    mount(<Login />)
  })

  it('should render loader', () => {
    const wrapper = mount(<Login />)
    const instance = wrapper.instance()

    expect(instance.state.isLoading).toBeFalsy()
    instance.handleSubmit({
      preventDefault: () => {},
    })

    expect(instance.state.isLoading).toBeTruthy()
  })

  it('should render form', () => {
    const wrapper = wrap()
    expect(wrapper.find('form')).toHaveLength(1)
  })
})
