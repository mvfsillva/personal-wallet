import React, { PureComponent } from 'react'
import serializeForm from 'form-serialize'
import crypto from 'crypto-js'
import Router from 'next/router'

import Button from '../../components/button'
import Input from '../../components/input'
import Loader from '../../components/loader'

import Either from '../../helpers/either'

import user from '../../services/user'

import { Container, Main } from './styles'

class Register extends PureComponent {
  state = {
    isLoading: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ isLoading: true })

    const payload = serializeForm(e.target, { hash: true })
    const secret = `${payload.password}${payload.email}`
    const token = this.handleEncrypt(payload, secret)

    user.save(payload.username, token)

    return Router.push('/login')
  }

  handleEncrypt = (payload, secret) =>
    crypto.AES.encrypt(JSON.stringify(payload), secret).toString()

  render() {
    const { isLoading } = this.state

    return (
      <Container>
        <Main>
          <div>
            <hgroup>
              <h1>Welcome to Wallet!</h1>
              <h4>Create your account.</h4>
            </hgroup>

            <Either
              when={isLoading}
              left={<Loader size={32} />}
              right={
                <form onSubmit={this.handleSubmit}>
                  <Input
                    type="text"
                    name="username"
                    label="Name"
                    placeholder="ex: Marcus"
                    required
                  />
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
                  />
                  <Input type="password" name="token" label="Token" placeholder="****" required />
                  <Button type="submit" size="large" palette="primary" block>
                    Register
                  </Button>
                </form>
              }
            />
          </div>
        </Main>
      </Container>
    )
  }
}

export default Register
