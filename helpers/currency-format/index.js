const currencyFormat = (locale, currency, money) => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency })
    .format(money)
    .replace(/BTC/, 'Ƀ')
}

export default currencyFormat
