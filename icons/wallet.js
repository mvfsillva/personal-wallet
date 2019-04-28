import React from 'react'
import PropTypes from 'prop-types'

import theme from '../theme'

const PersonalWallet = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="256" cy="256" r="251" stroke={color} strokeWidth="10" />
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
