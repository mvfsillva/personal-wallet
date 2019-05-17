import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import shortid from 'shortid'
import Link from 'next/link'
import { transitions } from 'polished'
import { theme, ifProp } from 'styled-tools'

import transition from '../../mixins/transition'

import { PersonalWallet, Logout } from '../../icons'

const Wrapper = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: ${theme('colors.white')};
  box-shadow: ${theme('shadow.tiny(themecolors.black')};
  left: 0;
  overflow-x: hidden;
  ${transitions(transition({ property: 'width', duration: '0.5s' }))};

  .nav__container {
    width: 280px;
    padding: ${theme('spacing.medium')};
  }

  .close__sidebar {
    display: none;
  }

  @media ${theme('responsive.phone')} {
    width: ${ifProp('isMobile', '280px', 0)};

    .nav__container {
      margin-top: ${theme('spacing.xHuge')};
    }

    .close__sidebar {
      position: absolute;
      display: block;
      top: 0;
      right: ${theme('spacing.large')};
      margin-left: ${theme('spacing.medium')};
      font-size: ${theme('font.b100')};
    }
  }
`

const Exit = styled.div`
  padding: ${theme('spacing.medium')};
  margin-bottom: ${theme('spacing.large')};
  cursor: pointer;
`

const List = styled.ul`
  margin-top: ${theme('spacing.xxxLarge')};
  color: ${props => props.palette};

  li {
    display: flex;
    align-items: center;
    list-style: none;
    font-size: ${theme('font.paragraph.fontSize')};
    font-weight: ${theme('font.paragraph.fontWeight')};
    line-height: ${theme('font.paragraph.lineHeight')};
    padding: ${theme('spacing.medium')};
    > a {
      color: ${theme('colors.secondary')};
    }
  }

  .selected {
    border-left: 4px solid ${theme('colors.primary')};
    border-top-left-radius: ${theme('radius.small')};
    border-bottom-left-radius: ${theme('radius.small')};
    > a {
      color: ${theme('colors.primary')};
    }
  }
`

const Hero = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  > div {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
`

const Sandwich = styled.div`
  @media ${theme('responsive.phone')} {
    position: fixed;
    display: flex;
    outline: ${theme('colors.white')};
    left: ${theme('spacing.tiny')};
    z-index: ${theme('zindex.dropdown')};
    cursor: pointer;
  }
`

const Menu = styled.label`
  display: none;

  @media ${theme('responsive.phone')} {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    height: 50px;
    padding: ${theme('spacing.medium')};

    span {
      display: block;
      width: 25px;
      height: 10px;
      border-top: 2px solid ${theme('palette.black')};
    }
  }
`

const Sidebar = ({ title, name, item, palette, onLogout, selected }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Sandwich onClick={toggle}>
      <Menu>
        <span />
        <span />
        <span />
      </Menu>
      <Wrapper isMobile={isOpen}>
        <nav className="nav__container">
          <Hero>
            <PersonalWallet />
            <div>
              <h4>{title}</h4>
              <h5>{name}</h5>
            </div>
            <span className="close__sidebar" onClick={toggle}>
              &times;
            </span>
          </Hero>
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
    </Sandwich>
  )
}

Sidebar.defaultProps = {
  item: [],
  palette: `${theme('colors.secondary')}`,
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
