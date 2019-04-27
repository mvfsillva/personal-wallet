import styled from 'styled-components'

import theme from '../../../theme'

const Main = styled.main`
  text-align: center;
  display: flex;
  width: 100%;
  height: 70vh;
  align-items: center;
  padding: ${theme.spacing.medium};
  background-color: ${theme.colors.white};

  > div {
    width: 100%;
  }

  form {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  h4 {
    margin-top: ${theme.spacing.small};
    margin-bottom: ${theme.spacing.xxLarge};
    color: ${theme.colors.gray.lighter};
  }

  @media ${theme.responsive.phone} {
    box-shadow: none;
  }
`

export default Main
