import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import shortid from 'shortid'

import theme from '../../theme'

const Wrapper = styled.aside`
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadow.tiny(theme.colors.black)};

  nav {
    padding: ${theme.spacing.medium};
  }

  @media ${theme.responsive.phone} {
    display: none;
  }
`

const Logout = styled.div`
  padding: ${theme.spacing.small};
  cursor: pointer;
`

const List = styled.ul`
  margin-top: ${theme.spacing.xxxLarge};
  color: ${props => props.palette};

  li {
    display: flex;
    align-items: center;
    list-style: none;
    font-size: ${theme.font.paragraph.fontSize};
    font-weight: ${theme.font.paragraph.fontWeight};
    line-height: ${theme.font.paragraph.lineHeight};
    padding: ${theme.spacing.medium};
  }
`

const Sidebar = ({ title, item, palette, onLogout }) => (
  <Wrapper>
    <nav>
      <h3>{title}</h3>
      <List palette={palette}>
        {item.map(({ label }) => (
          <li key={shortid.generate()}>{label}</li>
        ))}
      </List>
    </nav>
    <Logout onClick={onLogout}>logout</Logout>
  </Wrapper>
)

Sidebar.defaultProps = {
  item: [],
  palette: `${theme.colors.secondary}`,
}

Sidebar.propTypes = {
  item: PropTypes.array,
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.string,
  palette: PropTypes.string,
}

export default Sidebar
