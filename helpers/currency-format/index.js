const currencyFormat = (coin, money) => {
  const locale = {
    brl: 'pt-BR',
    bta: 'en-US',
    btc: 'de-DE',
  }

  if (coin === 'bta') {
    coin = 'usd'
  }

  const currency = coin.toUpperCase()

  return new Intl.NumberFormat(locale[coin], { style: 'currency', currency })
    .format(money)
    .replace(/BTC/, 'Ƀ')
}

export default currencyFormat
