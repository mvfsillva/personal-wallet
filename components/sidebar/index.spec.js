import React from 'react'
import { shallow, mount } from 'enzyme'
import Sidebar from '.'

const wrap = (props = {}) => mount(<Sidebar {...props} />)
const fn = jest.fn()
const item = [
  { url: 'balance', label: 'Balance' },
  { url: 'history', label: 'History' },
  { url: 'transaction', label: 'Transaction' },
  { url: 'quotations', label: 'Quotations' },
]

describe('[Component: Sidebar]', () => {
  it('should mount component with different combinations props', () => {
    mount(<Sidebar title="example" />)
    mount(<Sidebar palette="black" />)
    mount(<Sidebar onLogout={fn()} />)
  })

  it('should render sidebar title prop', () => {
    const sidebar = wrap({ title: 'title example' })
    expect(sidebar.props().title).toEqual('title example')
  })

  it('should render sidebar with palette prop', () => {
    const sidebar = palette => wrap({ palette })

    expect(sidebar('primary').props().palette).toBe('primary')
    expect(sidebar('gray').props().palette).toBe('gray')
    expect(sidebar('black').props().palette).toBe('black')
    expect(sidebar('white').props().palette).toBe('white')
  })

  it('should verify the type of item prop', () => {
    const sidebar = wrap({ item })
    expect(Array.isArray(sidebar.props().item)).toBeTruthy()
  })

  it('should verify item url', () => {
    const sidebar = wrap({ item })
    expect(sidebar.props().item[0].url).toEqual('balance')
    expect(sidebar.props().item[1].url).toEqual('history')
    expect(sidebar.props().item[2].url).toEqual('transaction')
    expect(sidebar.props().item[3].url).toEqual('quotations')
  })

  it('should verify item label', () => {
    const sidebar = wrap({ item })
    expect(sidebar.props().item[0].label).toEqual('Balance')
    expect(sidebar.props().item[1].label).toEqual('History')
    expect(sidebar.props().item[2].label).toEqual('Transaction')
    expect(sidebar.props().item[3].label).toEqual('Quotations')
  })

  it('should register sidebar click', () => {
    const sidebar = shallow(<Sidebar onLogout={fn()} />)

    sidebar.simulate('click')
    expect(fn).toHaveBeenCalled()
  })
})
