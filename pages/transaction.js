import React, { Component } from 'react'
import Router from 'next/router'
import Swal from 'sweetalert2'
import { Choose, If } from 'react-extras'
import { toPattern } from 'vanilla-masker'

import PageTitle from '../components/page-title'
import Input from '../components/input'
import Button from '../components/button'
import Loader from '../components/loader'

import Logged from '../containers/logged'
import TransactionFilter from '../containers/transaction-filter'

import currencyFormat from '../helpers/currency-format'
import setEquation from '../helpers/operation'
import olindaPromise from '../helpers/olinda-promise'
import date from '../helpers/datetime'
import notification from '../helpers/notification'

import history from '../services/history'
import api from '../services/api'

import Content from '../styles/content'
import Block from '../styles/block'

import theme from '../theme'

const coins = [
  { value: 'brl', label: 'Real' },
  { value: 'bta', label: 'Brita' },
  { value: 'btc', label: 'Bitcoin' },
]
class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bitcoin: '',
      brita: '',
      balance: '',
      options: [],
      optionsDestiny: [],
      label: '',
      origin: 'brl',
      type: '',
      operation: '',
      value: '',
      error: '',
      isDisabled: true,
      isLoading: false,
      isRenderForm: false,
    }
  }

  async componentDidMount() {
    await this.getBalance()
    await this.getQuotations()
  }

  request = (service, endpoint, params = {}) => {
    return api(service)(endpoint, {
      params: Object.assign(params),
    })
  }

  getQuotations = async () => {
    const bitcoin = await this.request('mercado-bitcoin', '')
    const brita = await olindaPromise(`${date.olinda}`)

    this.setState({ bitcoin, brita: brita.value[0] })
  }

  getBalance = async () => {
    const {
      operation: { balance },
    } = await history.balance()
    this.setState({ balance })
  }

  handleChangeOperation = change => {
    if (change === 'sell') return this.handleSell()

    this.setState({ isLoading: false, isRenderForm: false })

    return this.handleTransfer()
  }

  handleSell = () => {
    const options = coins.filter(currency => currency.value !== 'brl')
    this.setState({ isDisabled: false, options, label: '', optionsDestiny: '', type: 'sell' })
  }

  handleTransfer = () => {
    this.setState({ isDisabled: false, options: coins, label: 'origin', type: 'transfer' })
  }

  onChangeTransferOrigin = ({ target: { value } }) => {
    const optionsDestiny = coins.filter(currency => currency.value !== value)
    this.setState({ optionsDestiny, origin: value })
  }

  onChangeCoin = ({ target: { value } }) => {
    const { type } = this.state

    this.setState({ isRenderForm: true })

    return type === 'sell'
      ? this.setState({ origin: value, destiny: 'brl' })
      : this.setState({ destiny: value })
  }

  quotationForOperation = destiny => {
    const { brita, bitcoin } = this.state

    const value =
      destiny === 'bta'
        ? [brita.cotacaoCompra, Number(bitcoin.ticker.sell)]
        : [brita.cotacaoVenda, Number(bitcoin.ticker.buy)]

    return value
  }

  onChangeInput = ({ target: { value } }) => {
    const { origin, destiny } = this.state
    const operation = setEquation(origin, value, ...this.quotationForOperation(destiny))

    return this.setState({ operation, value })
  }

  createOperation = async () => {
    const data = await history.balance()
    const { origin, destiny, type } = this.state
    const { balance } = data.operation
    const newQuotation = this.quotationForOperation(destiny)
    const newBalance = this.updateBalance(balance)

    const operation = type === 'sell' ? '💵 sell' : '🔄 transfer'

    if (balance[origin] > 0.01 || newBalance[origin] > 0) {
      return this.createTransaction(
        operation,
        Object.assign({}, { buy: newQuotation[0], sell: newQuotation[1] }),
        newBalance,
      )
    }

    if (origin === destiny) {
      return notification('warning', 'Source currency cannot be the same as destination currency')
    }

    return notification(
      'error',
      `You don't have ${origin.toUpperCase()} enough to complete this transaction`,
    )
  }

  createTransaction = async (type, quotation, balance) => {
    const { origin, destiny, value } = this.state
    const formatValue = currencyFormat(origin, value)

    this.confirmTransaction(type, origin, destiny, formatValue, quotation, balance)
  }

  confirmTransaction = (type, origin, destiny, formatValue, quotation, balance) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: `${theme.colors.red}`,
      confirmButtonColor: `${theme.colors.primary}`,
      confirmButtonText: type === '💵 sell' ? 'sell' : 'Purchase',
    }).then(result => {
      if (result.value) {
        notification('success', '', 'Exchanged!')

        history.create(type, origin, destiny, formatValue, quotation, balance)
        return Router.push('/history')
      }
    })
  }

  updateBalance = balance => {
    const { operation, origin, destiny, value } = this.state

    balance[origin] -= value
    balance[destiny] += operation[origin][destiny]

    return balance
  }

  render() {
    const {
      balance,
      options,
      label,
      optionsDestiny,
      isDisabled,
      isLoading,
      isRenderForm,
      error,
      value,
    } = this.state
    const transactionProps = { options, isDisabled, label, optionsDestiny }
    const currencyValue = toPattern(value, '99999.99')

    return (
      <Logged>
        <Content>
          <div style={{ height: '200px' }}>
            <PageTitle title="Transaction" description="buy or exchange your coins">
              <div>
                <h4>{currencyFormat('brl', balance && balance.brl)}</h4>
                <h4>{currencyFormat('bta', balance && balance.bta)}</h4>
                <h4>{currencyFormat('btc', balance && balance.btc)}</h4>
              </div>
            </PageTitle>
            <Block>
              <Button palette="gray" outline onClick={() => this.handleChangeOperation('transfer')}>
                Transfer
              </Button>
              <Button palette="gray" outline onClick={() => this.handleChangeOperation('sell')}>
                Sell
              </Button>
            </Block>
          </div>
          <Choose>
            <Choose.When condition={isLoading}>
              <Loader size={42} />
            </Choose.When>
            <Choose.Otherwise>
              <TransactionFilter
                {...transactionProps}
                onChangeCurrency={this.onChangeTransferOrigin}
                onChangeCoin={this.onChangeCoin}
              />
              <Block>
                <If condition={isRenderForm}>
                  <Input
                    name="money"
                    label="value"
                    error={error}
                    onChange={this.onChangeInput}
                    value={currencyValue}
                  />
                  <Button size="large" onClick={this.createOperation}>
                    Make a transaction
                  </Button>
                </If>
              </Block>
            </Choose.Otherwise>
          </Choose>
        </Content>
      </Logged>
    )
  }
}

export default Transaction
