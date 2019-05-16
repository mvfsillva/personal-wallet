import date from '../helpers/datetime'
import config from '../config'

const save = (name, value) => {
  const createdAt = date.full
  localStorage.clear()
  localStorage.setItem('name', name)
  localStorage.setItem(config.storageUser, JSON.stringify({ value, createdAt }))
}

const get = async () => {
  const data = await localStorage.getItem(config.storageUser)
  return JSON.parse(data)
}

const user = {
  save,
  get,
}

export default user
