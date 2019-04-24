import { configure, addDecorator } from '@storybook/react'
import centered from '@storybook/addon-centered'

const req = require.context('../', true, /.stories.js$/)

addDecorator(centered)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
