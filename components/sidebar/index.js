import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import shortid from 'shortid'
import Link from 'next/link'

import theme from '../../theme'

import PersonalWallet from '../../icons/wallet'
import Logout from '../../icons/logout'

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

const Exit = styled.div`
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
    > a {
      color: ${theme.colors.secondary};
    }
  }

  .selected {
    border-left: 4px solid ${theme.colors.primary};
    border-top-left-radius: ${theme.radius.small};
    border-bottom-left-radius: ${theme.radius.small};
    > a {
      color: ${theme.colors.primary};
    }
  }
`

const Logo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  > div {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
`

const Sidebar = ({ title, name, item, palette, onLogout, selected }) => (
  <Wrapper>
    <nav>
      <Logo>
        <PersonalWallet />
        <div>
          <h4>{title}</h4>
          <h5>{name}</h5>
        </div>
      </Logo>
      <List palette={palette}>
        {item.map(({ label, url }) => (
          <li key={shortid.generate()} className={selected === url ? 'selected' : ''}>
            <Link href={url}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </List>
    </nav>
    <Exit onClick={onLogout}>
      <Logout />
    </Exit>
  </Wrapper>
)

Sidebar.defaultProps = {
  item: [],
  palette: `${theme.colors.secondary}`,
}

Sidebar.propTypes = {
  item: PropTypes.array,
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
  palette: PropTypes.string,
  selected: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default Sidebar
