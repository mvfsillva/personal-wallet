import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../theme'

const Wrapper = styled.div`
  padding: ${theme.spacing.large};
  margin-bottom: ${theme.spacing.large};
  border-radius: ${theme.radius.small};
  box-shadow: ${theme.shadow.medium(theme.colors.black)};
  background-color: ${props => props.palette};
`

const Card = ({ palette, children }) => <Wrapper palette={palette}>{children}</Wrapper>

Card.defaultProps = {
  palette: theme.colors.white,
}

Card.propTypes = {
  palette: PropTypes.string,
  children: PropTypes.any.isRequired,
}

export default Card
