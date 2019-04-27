const STORAGE_USER = process.env.STORAGE_TOKEN

const save = (name, value) => {
  const createdAt = new Date()

  localStorage.setItem('name', name)
  localStorage.setItem(STORAGE_USER, JSON.stringify({ value, createdAt }))
}

const get = async () => {
  const data = await localStorage.getItem(STORAGE_USER)
  return JSON.parse(data)
}

const user = {
  save,
  get,
}

export default user