import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../theme'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xLarge};

  h2 {
    margin-bottom: ${theme.spacing.small};
  }
`
const PageTitle = ({ children, title, description }) => (
  <Wrapper>
    <div>
      <h2>{title}</h2>
      <h5>{description}</h5>
    </div>
    {children}
  </Wrapper>
)

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.any,
}

export default PageTitle
