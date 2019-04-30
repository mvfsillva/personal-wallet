const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')
const axios = require('axios')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams),
  }),
  send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

  server.get('/mercado-bitcoin', async (req, res) => {
    const { ticker } = await axios
      .get('https://www.mercadobitcoin.net/api/BTC/ticker')
      .then(({ data }) => data)
      .catch(error => console.error({ error }))
    ssrCache({ req, res, pagePath: 'mercado-bitcoin' })
    res.send({ ticker })
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
