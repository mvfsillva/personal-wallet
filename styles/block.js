import styled from 'styled-components'
import { theme } from 'styled-tools'

const Block = styled.div`
  padding-top: ${theme('spacing.medium')};
  padding-bottom: ${theme('spacing.medium')};
  button {
    margin-right: ${theme('spacing.medium')};
  }
`

export default Block
