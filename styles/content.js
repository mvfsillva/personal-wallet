import styled from 'styled-components'

import theme from '../theme'

const Content = styled.div`
  padding-top: ${theme.spacing.huge};
  padding-bottom: ${theme.spacing.huge};
  width: 75%;

  @media ${theme.responsive.phone} {
    width: 100%;
    display: flex;
    flex-direction: column;

    header {
      display: flex;
      flex-direction: column;
      width: 310px;

      div {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 100%;

        h4 {
          margin-top: ${theme.spacing.small};
          margin-bottom: ${theme.spacing.tiny};
        }
      }
    }
  }
`

export default Content
