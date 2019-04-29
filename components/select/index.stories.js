import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from '.'

const options = [
  { value: 'water', label: 'Water' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'bazinga', label: 'Bazinga' },
]

const onChangeSelect = action('onChange <Select />')

storiesOf('Select', module).add('Default', () => (
  <Select options={options} onChange={onChangeSelect} />
))
