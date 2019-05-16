import nookies from 'nookies'

import config from '../config'

const set = (name, value, { ctx } = {}) => {
  const now = new Date()
  now.setDate(now.getDate() + 14)

  console.log({ name, value, ctx })

  return nookies.set(ctx, name, value, {
    expires: now,
    path: '/',
  })
}

const remove = (name, { ctx } = {}) => {
  nookies.destroy(ctx, name)
}

const get = ctx => {
  if (Object.keys(nookies.get(ctx)).length > 0) {
    const hasCookie = nookies.get(ctx)[config.cookieToken]
    return hasCookie ? JSON.parse(nookies.get(ctx)[config.cookieToken]) : false
  }

  return false
}

const cookie = {
  set,
  get,
  remove,
}

export default cookie
