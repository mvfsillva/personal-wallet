import currencyFormat from '.'

describe('[Helper: CurrencyFormat]', () => {
  it('should convert the currency number to REAL format', () => {
    expect(currencyFormat('pt-BR', 'BRL', 1000)).toEqual('R$1,000.00')
  })

  it('should convert the currency number to USD format', () => {
    expect(currencyFormat('en-US', 'USD', 1000)).toEqual('$1,000.00')
  })
})
