/* eslint import/no-named-as-default: 0 */
import React, { Component } from 'react'

import cookie from '../services/cookies'

export default App => {
  return class WithData extends Component {
    static displayName = `WithData(${App.displayName})`

    static async getInitialProps(ctx) {
      const { Component, router, req, res } = ctx // eslint-disable-line no-unused-vars
      try {
        const user = cookie.get(ctx, { parsed: true })
        console.log(user)

        if (user) {
          const { username, email } = cookie

          if (req) {
            req.user = { username, email }
          }

          let appProps = {}
          if (App.getInitialProps) {
            appProps = await App.getInitialProps(ctx)
          }

          if (res && res.finished) {
            return {}
          }

          return { ...appProps, username, email }
        }

        if (res) {
          res.writeHead(302, { Location: '/' })
          res.end()
        }

        throw new TypeError('Unauthorized')
      } catch (error) {
        console.error({ error })
        res.redirect('/')
        throw new TypeError(error)
      }
    }

    render() {
      return <App {...this.props} />
    }
  }
}
