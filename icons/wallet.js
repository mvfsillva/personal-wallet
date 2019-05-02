import React from 'react'
import PropTypes from 'prop-types'

import theme from '../theme'

const PersonalWallet = ({ size, color }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 500 430" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M335.821 0H169.776L0 283.582L83.9552 429.105H419.776L500 283.582L335.821 0Z" />
    </svg>
  )
}

PersonalWallet.defaultProps = {
  size: 60,
  color: `${theme.colors.primary}`,
}

PersonalWallet.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default PersonalWallet
