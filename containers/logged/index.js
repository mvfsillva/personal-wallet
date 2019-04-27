import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Router from 'next/router'

import Sidebar from '../../components/sidebar'

import theme from '../../theme'

const Container = styled.div`
  background-color: ${theme.colors.gray.whitish};
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  width: 100%;

  section {
    display: flex;
    justify-content: center;
    flex-basis: calc(100% - 250px);
  }

  aside {
    width: 180px;
  }

  @media ${theme.responsive.phone} {
    flex-basis: 100%;
    justify-content: center;
  }
`

class Logged extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  onLogout = () => {
    Router.push('/login')
  }

  render() {
    const { children } = this.props
    const item = [
      { url: 'balance', label: 'Balance' },
      { url: 'history', label: 'History' },
      { url: 'transaction', label: 'Transaction' },
      { url: 'quotations', label: 'Quotations' },
    ]

    return (
      <Container>
        <Sidebar title="Personal Wallet" item={item} />
        <section>{children}</section>
      </Container>
    )
  }
}

export default Logged
