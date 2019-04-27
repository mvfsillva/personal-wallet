import styled from 'styled-components'

import theme from '../theme'

const Container = styled.section`
  width: 100%;
  max-width: 1000px;
  height: 100vh;
  padding-left: ${theme.spacing.large};
  padding-right: ${theme.spacing.large};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Container
