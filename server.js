const { createServer } = require('http')
const next = require('next')
const routes = require('./routes')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 3001

app.prepare().then(() =>
  createServer(handler).listen(port, err => {
    if (err) throw err

    console.log(`> Ready on http://localhost:${port}`)
}))
