import styled from 'styled-components'
import { transitions } from 'polished'
import { theme } from 'styled-tools'

import transition from '../mixins/transition'

const LinkBlock = styled.div`
  text-align: ${props => (props.align ? `${props.align}` : 'left')};
  margin-top: ${theme('spacing.large')};
  > a {
    cursor: pointer;
    ${transitions(transition({ property: 'color', duration: '0.5s', delay: '0.2s' }))};
    &:hover {
      color: ${theme('colors.primary.darker')};
    }
  }
`

export default LinkBlock
