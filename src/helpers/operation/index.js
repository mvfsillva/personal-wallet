const operation = (value, quotaBTA, quotaBTC) => {
  return [
    {
      brl: {
        bta: value / quotaBTA,
        btc: value / quotaBTC,
      },
    },
    {
      btc: {
        brl: value * quotaBTC,
        bta: (quotaBTC * value) / quotaBTA,
      },
    },
    {
      bta: {
        brl: value * quotaBTA,
        btc: (quotaBTA * value) / quotaBTC,
      },
    },
  ]
}

const setEquation = (origin, value, quotaBTA, quotaBTC) => {
  const equation = operation(value, quotaBTA, quotaBTC).filter(item => [origin] && item[origin])[0]
  return equation
}

export default setEquation
