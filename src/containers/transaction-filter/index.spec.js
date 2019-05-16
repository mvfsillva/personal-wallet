import React from 'react'
import { mount } from 'enzyme'

import TransactionFilter from '.'

describe('[Container: TransactionFilter]', () => {
  it('should mount TransactionFilter container', () => {
    mount(<TransactionFilter />)
  })
})
