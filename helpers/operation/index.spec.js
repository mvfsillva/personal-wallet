import setEquation from '.'

describe('[Helper: Operation]', () => {
  it('should (Exchange BRL to BTA) and (Exchange BRL to BTC)', () => {
    const test = setEquation('brl', 100, 4.1, 1800)
    expect(test).toEqual({ brl: { bta: 24.390243902439025, btc: 0.05555555555555555 } })
  })

  it('should (Brita sells) and  (Exchange BTA to BTC)', () => {
    const test = setEquation('bta', 250, 4.1, 1800)
    expect(test).toEqual({ bta: { brl: 1025, btc: 0.5694444444444444 } })
  })

  it('should (Bitcoin sells) and (Exchange BTC to BTA)', () => {
    const test = setEquation('btc', 250, 4.1, 1800)
    expect(test).toEqual({ btc: { brl: 450000, bta: 109756.09756097561 } })
  })
})
