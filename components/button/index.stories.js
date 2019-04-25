import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

import Button from '.'

const Wrapper = styled.div`
  display: flex;
  width: 750px;
  justify-content: space-evenly;
`

storiesOf('Button', module)
  .add('Colors', () => (
    <Wrapper>
      <Button onClick={action('click event')}>Primary color</Button>
      <Button palette="secondary" onClick={action('click event')}>
        Secondary color
      </Button>
      <Button outline onClick={action('click event')}>
        Primary outline color
      </Button>
      <Button palette="secondary" outline onClick={action('click event')}>
        Secondary outline color
      </Button>
      <Button disabled>disabled</Button>
    </Wrapper>
  ))
  .add('Size', () => (
    <Wrapper>
      <Button size="small" onClick={action('click event')}>
        small button
      </Button>
      <Button size="medium" onClick={action('click event')}>
        medium button
      </Button>
      <Button size="large" onClick={action('click event')}>
        large button
      </Button>
    </Wrapper>
  ))
