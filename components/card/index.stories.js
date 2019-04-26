import React from 'react'
import { storiesOf } from '@storybook/react'

import theme from '../../theme'

import Card from '.'

storiesOf('Card', module)
  .add('Default', () => (
    <Card>
      <h1 style={{ color: theme.colors.secondary }}>Personal Wallet</h1>
    </Card>
  ))
  .add('With palette', () => (
    <div>
      <Card palette={theme.colors.primary}>
        <h1 style={{ color: theme.colors.white }}>Personal Wallet</h1>
      </Card>
      <Card palette={theme.colors.secondary}>
        <h1 style={{ color: theme.colors.white }}>Personal Wallet</h1>
      </Card>
      <Card palette={theme.colors.gray}>
        <h1 style={{ color: theme.colors.white }}>Personal Wallet</h1>
      </Card>
    </div>
  ))
