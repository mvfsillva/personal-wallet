import React, { PureComponent } from 'react'
import serializeForm from 'form-serialize'
import crypto from 'crypto-js'
import Router from 'next/router'
import Link from 'next/link'

import Button from '../components/button'
import Input from '../components/input'
import Loader from '../components/loader'

import user from '../services/user'
import cookie from '../services/cookies'

import Either from '../helpers/either'

import Container from '../styles/container'
import Main from '../styles/main'
import LinkBlock from '../styles/link-block'

import PersonalWallet from '../icons/wallet'

import theme from '../theme'

const { COOKIE_TOKEN } = process.env
class Login extends PureComponent {
  state = {
    isLoading: false,
    error: '',
  }

  componentDidMount() {
    const token = cookie.get()

    return token && Router.push('/balance')
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { email, password } = serializeForm(e.target, { hash: true })
    this.validateUser(email, password)
  }

  validateUser = async (email, password) => {
    const userInfo = await user.get()

    try {
      const token = userInfo.value
      const bytes = crypto.AES.decrypt(token, `${password}${email}`)
      const decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8))

      cookie.set(COOKIE_TOKEN, JSON.stringify(token))

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
            <PersonalWallet size={100} />
            <hgroup style={{ marginTop: theme.spacing.large }}>
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
                  <LinkBlock>
                    <Link href="/register">
                      <a>create your account</a>
                    </Link>
                  </LinkBlock>
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
