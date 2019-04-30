import currencyFormat from '.'

describe('[Helper: CurrencyFormat]', () => {
  it('should convert the currency number to REAL format', () => {
    expect(currencyFormat('brl', 1000)).toEqual('R$1,000.00')
  })

  it('should convert the currency number to USD format', () => {
    expect(currencyFormat('bta', 1000)).toEqual('$1,000.00')
  })

  it('should convert the currency number to BTC format', () => {
    console.log(currencyFormat('btc', 1000))
    expect(
      currencyFormat('btc', 1000)
        .replace('Ƀ', '')
        .trim(),
    ).toBe('1,000.00')
  })
})
