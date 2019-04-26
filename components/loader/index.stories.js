import React from 'react'
import { storiesOf } from '@storybook/react'

import theme from '../../theme'

import Loader from '.'

storiesOf('Loader', module).add('Default', () => (
  <div>
    <Loader />
    <Loader palette={theme.colors.secondary} />
    <Loader palette={theme.colors.gray} size={16} />
  </div>
))
