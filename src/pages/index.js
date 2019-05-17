import React, { PureComponent } from 'react'
import serializeForm from 'form-serialize'
import crypto from 'crypto-js'
import Router from 'next/router'
import Link from 'next/link'

import { Button, Input, Loader } from '../components'
import { user, cookie } from '../services'
import { Either } from '../helpers'
import { Container, Main, LinkBlock } from '../styles'
import { PersonalWallet } from '../icons'

import config from '../config'

class Home extends PureComponent {
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

      cookie.set(config.cookieToken, JSON.stringify(token))

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
            <PersonalWallet size={80} />
            <hgroup style={{ marginTop: '24px' }}>
              <h1>Welcome to Wallet!</h1>
              <h4>Sign in to your account.</h4>
            </hgroup>
            <Either
              when={isLoading}
              left={<Loader size={32} />}
              right={
                <form onSubmit={this.handleSubmit}>
                  <Input type="email" name="email" label="E-mail" placeholder="ex: marcus@wallet.com" required />
                  <Input type="password" name="password" label="Password" placeholder="******" required error={error} />
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

export default Home
