import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '../button'
import PageTitle from '.'

storiesOf('PageTitle', module)
  .add('Default', () => (
    <div style={{ width: '600px' }}>
      <PageTitle title="Personal Wallet" />
    </div>
  ))
  .add('With description', () => (
    <div style={{ width: '600px' }}>
      <PageTitle title="Personal Wallet" description="amazing wallet" />
    </div>
  ))
  .add('With children', () => (
    <div style={{ width: '600px' }}>
      <PageTitle title="Personal Wallet" description="amazing wallet">
        <div>
          <Button>Click Me</Button>
        </div>
      </PageTitle>
    </div>
  ))
