import React, { PureComponent } from 'react'
import serializeForm from 'form-serialize'
import crypto from 'crypto-js'
import Router from 'next/router'
import Link from 'next/link'

import Button from '../components/button'
import Input from '../components/input'
import Loader from '../components/loader'

import user from '../services/user'
import history from '../services/history'

import Either from '../helpers/either'

import Container from '../styles/container'
import Main from '../styles/main'
import LinkBlock from '../styles/link-block'

class Register extends PureComponent {
  state = {
    isLoading: false,
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })

    const payload = serializeForm(e.target, { hash: true })
    const secret = `${payload.password}${payload.email}`
    const token = this.handleEncrypt(payload, secret)

    user.save(payload.username, token)
    this.generateHistory(payload.email)

    return Router.push('/')
  }

  generateHistory = email => {
    const balance = {
      brl: 100000,
      bta: 0,
      btc: 0,
    }

    const quotation = {
      buy: 1,
      sell: 1,
    }

    return history.create('deposity', 'personal-wallet', email, 100000, quotation, balance)
  }

  handleEncrypt = (payload, secret) => {
    return crypto.AES.encrypt(JSON.stringify(payload), secret).toString()
  }

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
                  <LinkBlock>
                    <Link href="/">
                      <a>return to home</a>
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

export default Register
