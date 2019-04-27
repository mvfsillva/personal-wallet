import React, { PureComponent } from 'react'
import styled from 'styled-components'
import serializeForm from 'form-serialize'
import crypto from 'crypto-js'
import Router from 'next/router'
import Link from 'next/link'
import { transitions } from 'polished'

import Button from '../components/button'
import Input from '../components/input'
import Loader from '../components/loader'

import Container from '../styles/container'
import Main from '../styles/main'

import transition from '../mixins/transition'

import Either from '../helpers/either'
import user from '../services/user'

import theme from '../theme'

const Account = styled.div`
  text-align: left;
  margin-top: ${theme.spacing.large};
  > a {
    cursor: pointer;
    ${transitions(transition({ property: 'color', duration: '0.5s', delay: '0.2s' }))};
    &:hover {
      color: ${theme.colors.primary.darker};
    }
  }
`

class Login extends PureComponent {
  state = {
    isLoading: false,
    error: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { email, password } = serializeForm(e.target, { hash: true })
    this.validateUser(email, password)
  }

  validateUser = async (email, password) => {
    const userInfo = await user.get()
    const token = userInfo.value

    try {
      const bytes = crypto.AES.decrypt(token, `${password}${email}`)
      const decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8))

      return Boolean(decrypted) && Router.push('/balance')
    } catch (error) {
      console.error({ error })
      return this.setState({ error: 'username or password is invalid :[', isLoading: false })
    }
  }

  render() {
    const { isLoading, error } = this.state

    return (
      <Container>
        <Main column>
          <div>
            <hgroup>
              <h1>Welcome to Wallet!</h1>
              <h4>Sign in to your account.</h4>
            </hgroup>
            <Either
              when={isLoading}
              left={<Loader size={32} />}
              right={
                <form onSubmit={this.handleSubmit}>
                  <Input
                    type="email"
                    name="email"
                    label="E-mail"
                    placeholder="ex: marcus@wallet.com"
                    required
                  />
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="******"
                    required
                    error={error}
                  />
                  <Button type="submit" size="large" palette="primary" block>
                    Sign in
                  </Button>
                  <Account>
                    <Link href="/register">create your account</Link>
                  </Account>
                </form>
              }
            />
          </div>
        </Main>
      </Container>
    )
  }
}

export default Login
