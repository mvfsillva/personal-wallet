import { configure, addDecorator } from '@storybook/react'
import centered from '@storybook/addon-centered'

import GlobalStyle from '../theme/global-style'

const req = require.context('../components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(centered)

const withGlobal = sb => (
  <>
    <GlobalStyle />
    {sb()}
  </>
)

addDecorator(withGlobal)
configure(loadStories, module)
