import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Router from 'next/router'

import Sidebar from '../../components/sidebar'

import cookie from '../../services/cookies'

import theme from '../../theme'

import config from '../../config'

const Container = styled.div`
  background-color: ${theme.colors.gray.whitish};
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  width: 100%;

  section {
    display: flex;
    justify-content: center;
    flex-basis: calc(100% - 400px);
  }

  @media ${theme.responsive.phone} {
    flex-basis: 100%;
    justify-content: center;
  }
`

class Logged extends Component {
  state = {
    name: '',
    selected: '',
  }

  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  componentDidMount() {
    const name = this.getName()
    const selected = Router.route
    this.setState({ name, selected })
  }

  onLogout = () => {
    cookie.remove(config.cookieToken)
    Router.push('/')
  }

  getName = () => localStorage.getItem('name') || ''

  render() {
    const { name, selected } = this.state
    const { children } = this.props
    const item = [
      { url: 'balance', label: 'Balance' },
      { url: 'history', label: 'History' },
      { url: 'transaction', label: 'Transaction' },
    ]
    const router = selected ? selected.replace('/', '') : ''

    return (
      <Container>
        <Sidebar
          title="Personal Wallet"
          name={name}
          item={item}
          selected={router}
          onLogout={this.onLogout}
        />
        <section>{children}</section>
      </Container>
    )
  }
}

export default Logged
