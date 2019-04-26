import React from 'react'
import { storiesOf } from '@storybook/react'

import Sidebar from '.'

const item = [
  { url: 'balance', label: 'Balance' },
  { url: 'history', label: 'History' },
  { url: 'transaction', label: 'Transaction' },
  { url: 'quotations', label: 'Quotations' },
]

storiesOf('Sidebar', module).add('Default', () => <Sidebar title="Personal Wallet" item={item} />)
