const { STORAGE_HISTORY } = process.env

const create = async (type, origin, destiny, value, quotation, balance) => {
  const { buy = 1, sell = 1 } = quotation
  const { brl = 0, bta = 0, btc = 0 } = balance

  const history = await {
    operation: {
      type,
      origin,
      destiny,
      value,
      quotation: {
        buy,
        sell,
      },
      balance: {
        brl,
        bta,
        btc,
        createdAt: new Date(),
      },
    },
  }

  return save(history)
}

const save = async history => {
  const payload = (await get()) || []
  payload.push(history)
  return localStorage.setItem(STORAGE_HISTORY, JSON.stringify(payload))
}

const get = async () => {
  const data = await localStorage.getItem(STORAGE_HISTORY)
  return JSON.parse(data)
}

const balance = async () => {
  const data = await get()
  return data[data.length - 1]
}

const history = {
  create,
  save,
  get,
  balance,
}

export default history
