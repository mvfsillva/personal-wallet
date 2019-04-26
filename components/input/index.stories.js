import React from 'react'
import { storiesOf } from '@storybook/react'

import Input from '.'

storiesOf('Input', module)
.add('Default', () => (
  <div style={{ width: '600px' }}>
    <Input name="input-component" placeholder="Example" />
  </div>
))
.add('With label', () => (
  <div style={{ width: '600px' }}>
    <Input name="input-component" label="e-mail" placeholder="Example" />
  </div>
))
.add('With error', () => (
  <div style={{ width: '600px' }}>
    <Input name="input-component" label="e-mail" placeholder="Example" error="error example" />
  </div>
))
