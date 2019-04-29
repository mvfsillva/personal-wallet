import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { If } from 'react-extras'

import PageTitle from '../components/page-title'
import Input from '../components/input'
import Button from '../components/button'

import Logged from '../containers/logged'
import TransactionFilter from '../containers/transaction-filter'

import date from '../helpers/datetime'
import currencyFormat from '../helpers/currency-format'
import setEquation from '../helpers/operation'

import history from '../services/history'
import api from '../services/api'

import theme from '../theme'

const Content = styled.div`
  padding-top: ${theme.spacing.huge};
  padding-bottom: ${theme.spacing.huge};
  width: 600px;
`

const Block = styled.div`
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
`

const OLINDA_API = process.env.OLINDA_API
const BITCOIN_API = process.env.BITCOIN_API

const coins = [
  { value: 'btc', label: 'Bitcoin' },
  { value: 'bta', label: 'Brita' },
  { value: 'brl', label: 'Real' },
]

class Transaction extends Component {
  static async getInitialProps() {
    try {
      const request = (service, endpoint, params = {}) => {
        return api(service)(endpoint, {
          params: Object.assign(params)
        })
      }

      const [bitcoin, brita] = await Promise.all([
        request(BITCOIN_API, '/BTC/ticker'),
        request(OLINDA_API, '/CotacaoDolarDia(dataCotacao=@dataCotacao)', { '@dataCotacao': "'04-18-2019'" })
      ])

      return { bitcoin, brita: brita.value[0] }
    } catch (error) {
      console.error(error)
      return false
    }
  }

  static propTypes = {
    bitcoin: PropTypes.object.isRequired,
    brita: PropTypes.object.isRequired,
  }

  state = {
    bitcoin: this.props.bitcoin,
    brita: this.props.brita,
    balance: '',
    isDisabled: true,
    options: [],
    optionsDestiny: [],
    label: '',
    type: '',
    operation: '',
    error: ''
  }

  componentDidMount() {
    this.getBalance()
  }

  componentDidUpdate() {
    console.log('update')
  }

  getBalance = async () => {
    const { operation: { balance } } = await history.balance()
    this.setState({ real: balance.brl, balance })
  }

  handleChangeOperation = change => {
    if (change === 'sell') {
      return this.handleSell()
    }
    return this.handleTransfer()
  }

  handleSell = () => {
    const options = coins.filter((currency) => currency.value !== 'brl')
    this.setState({ isDisabled: false, options, label: '', optionsDestiny: '', type: 'sell' })
  }

  handleTransfer = () => {
    this.setState({ isDisabled: false, options: coins, label: 'origem', type: 'transfer' })
  }

  onChangeTransferOrigin = ({ target: { value } }, label) => {
    const optionsDestiny = coins.filter((currency) => currency.value !== value)
    this.setState({ optionsDestiny, origin: value })
  }

  onChangeCoin = ({ target: { value } }, label) => {
    const { type } = this.state

    return type === 'sell'
      ? this.setState({ origin: value, destiny: 'brl' })
      : this.setState({ destiny: value })
  }

  quotationForOperation = (destiny) => {
    const { brita, bitcoin } = this.state
    const value = destiny !== 'bta'
      ? [brita.cotacaoVenda, Number(bitcoin.ticker.buy)]
      : [brita.cotacaoCompra, Number(bitcoin.ticker.sell)]

    return value
  }

  onChangeInput = ({ target: { value }}) => {
    const { origin, destiny } = this.state
    const operation =  setEquation(origin, value, ...this.quotationForOperation(destiny))

    this.setState({ operation, value })
  }

  createOperation = async () => {
    const data = await history.balance()
    const { origin, destiny, type } = this.state
    const { balance } = data.operation
    const newQuotation = this.quotationForOperation(destiny)
    const newBalance = this.updateBalance(balance)

    if (balance[origin] >  0.01 || newBalance[origin] > 0)  {
      return this.createTransaction(type, Object.assign({}, { buy: newQuotation[0], sell: newQuotation[1] }), newBalance)
    }

    return this.setState({error: `You don't have money enough to complete this transaction` })
  }

  createTransaction = async (type, quotation, balance) => {
    const { origin, destiny, value } = this.state

    history.create(type, origin, destiny, value, quotation, balance)
  }

  updateBalance = (balance) => {
    const { operation, origin, destiny, value } = this.state

    balance[origin] = balance[origin] - value
    balance[destiny] = balance[destiny] + operation[origin][destiny]

    return balance
  }

  render () {
    const { balance, options, isDisabled, label, optionsDestiny, destiny, error, bitcoin, brita } = this.state
    const transactionProps = { options, isDisabled, label, optionsDestiny }

    return(
      <Logged>
        <Content>
          <PageTitle title="Transaction" description="buy or exchange your coins">
          <div>
            <h4>{currencyFormat('pt-BR', 'BRL', balance.brl)}</h4>
            <h4>{currencyFormat('en-US', 'USD', balance.bta)}</h4>
            <h4>{currencyFormat('de-DE', 'BTC', balance.btc)}</h4>
          </div>
          </PageTitle>
          <Block>
            <Button palette="gray" size="medium" onClick={()=> this.handleChangeOperation('change')} outline>Transfer</Button>
            <Button palette="gray" size="medium" onClick={()=> this.handleChangeOperation('sell')} outline>Sell</Button>
          </Block>
          <TransactionFilter
            {...transactionProps}
            onChangeCurrency={this.onChangeTransferOrigin}
            onChangeCoin={this.onChangeCoin}
          />
          <Block>
            <Input name="money" onChange={this.onChangeInput} error={error} />
            <Button size='large' onClick={this.createOperation} >Make a transaction</Button>
          </Block>
        </Content>
      </Logged>
    )
  }
}

export default Transaction
