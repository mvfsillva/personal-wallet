import React from 'react'
import { mount } from 'enzyme'
import HistoryDetail from '.'

const payload = {
  datetime: '28 April 2019 20:00',
  type: 'deposit',
  money: 100,
  origin: 'personal-wallet',
  destiny: 'username',
  quotation: {
    buy: 1,
    sell: 1,
  },
  balance: {
    brl: 1,
    bta: 1,
    btc: 1,
  },
}

describe('[Component: HistoryDetail]', () => {
  it('should mount logged container', () => {
    mount(<HistoryDetail {...payload} />)
  })
})
