import nookies from 'nookies'

const { COOKIE_TOKEN } = process.env

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
    const hasCookie = nookies.get(ctx)[COOKIE_TOKEN]
    return hasCookie ? JSON.parse(nookies.get(ctx)[COOKIE_TOKEN]) : false
  }

  return false
}

const cookie = {
  set,
  get,
  remove,
}

export default cookie
