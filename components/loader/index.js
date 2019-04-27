import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import theme from '../../theme'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  animation: ${rotate} 1s infinite linear;
  border: ${theme.radius.large} solid ${props => props.palette};
  border-right-color: transparent;
  border-radius: ${theme.radius.rounded};
  margin: auto;
`

const Loader = ({ size, palette }) => <Wrapper palette={palette} size={size} />

Loader.defaultProps = {
  size: 24,
  palette: theme.colors.primary,
}

Loader.propTypes = {
  size: PropTypes.number,
  palette: PropTypes.string,
}

export default Loader
