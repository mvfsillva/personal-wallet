import { createGlobalStyle } from 'styled-components'

import theme from '.'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Avenir Next', 'SF UI Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    color: ${theme.colors.black};
    text-size-adjust: none;
  }

  body {
    background-color: ${theme.colors.white};
    font-size: ${theme.font.base};
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};

    &:hover {
      color: ${theme.colors.primary.dark};
    }
  }

  svg {
    vertical-align: middle;
  }

  img {
    max-width: 100%;
  }

  li {
    list-style: none;
  }

  h1 {
    font-size: ${theme.font.h100.fontSize};
    line-height: ${theme.font.h100.lineHeight};
    font-weight: ${theme.font.h100.fontWeight};
  }

  h2 {
    font-size: ${theme.font.h200.fontSize};
    line-height: ${theme.font.h200.lineHeight};
    font-weight: ${theme.font.h200.fontWeight};
  }

  h3 {
    font-size: ${theme.font.h300.fontSize};
    line-height: ${theme.font.h300.lineHeight};
    font-weight: ${theme.font.h300.fontWeight};
    color: ${theme.colors.secondary};
  }

  h4 {
    font-size: ${theme.font.h400.fontSize};
    line-height: ${theme.font.h400.lineHeight};
    font-weight: ${theme.font.h400.fontWeight};
    color: ${theme.colors.secondary};
  }

  h5 {
    font-size: ${theme.font.h500.fontSize};
    line-height: ${theme.font.h500.lineHeight};
    font-weight: ${theme.font.h500.fontWeight};
    color: ${theme.colors.secondary};
  }

  h6 {
    font-size: ${theme.font.h600.fontSize};
    line-height: ${theme.font.h600.lineHeight};
    font-weight: ${theme.font.h600.fontWeight};
    color: ${theme.colors.secondary};
  }

  p {
    font-size: ${theme.font.paragraph.fontSize};
    line-height: ${theme.font.paragraph.lineHeight};
    font-weight: ${theme.font.paragraph.fontWeight};
    color: ${theme.colors.secondary};
  }
`

export default GlobalStyle
