import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Choose, If } from 'react-extras'

import PageTitle from '../components/page-title'
import Input from '../components/input'
import Button from '../components/button'
import Loader from '../components/loader'

import Logged from '../containers/logged'
import TransactionFilter from '../containers/transaction-filter'

import currencyFormat from '../helpers/currency-format'
import setEquation from '../helpers/operation'

import history from '../services/history'
import api from '../services/api'

import config from '../config'

import theme from '../theme'

const Content = styled.div`
  padding-top: ${theme.spacing.huge};
  padding-bottom: ${theme.spacing.huge};
  width: 600px;
`

const Block = styled.div`
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
  button {
    margin-right: ${theme.spacing.medium};
  }
`

const coins = [
  { value: 'brl', label: 'Real' },
  { value: 'bta', label: 'Brita' },
  { value: 'btc', label: 'Bitcoin' },
]
class Transaction extends Component {
  static async getInitialProps() {
    try {
      const request = (service, endpoint, params = {}) => {
        return api(service)(endpoint, {
          params: Object.assign(params),
        })
      }

      const [bitcoin, brita] = await Promise.all([
        request(config.bitcoinApi, '/BTC/ticker'),
        request(config.olindaApi, '/CotacaoDolarDia(dataCotacao=@dataCotacao)', {
          '@dataCotacao': "'04-18-2019'",
        }),
      ])

      return { bitcoin, brita: brita.value[0] }
    } catch (error) {
      console.error(error)
      return false
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      bitcoin: props.bitcoin,
      brita: props.brita,
      balance: '',
      options: [],
      optionsDestiny: [],
      label: '',
      type: '',
      operation: '',
      error: '',
      isDisabled: true,
      isLoading: false,
      isRenderForm: false,
    }
  }

  async componentDidMount() {
    await this.getBalance()
  }

  getBalance = async () => {
    const {
      operation: { balance },
    } = await history.balance()
    this.setState({ balance })
  }

  handleChangeOperation = change => {
    if (change === 'sell') {
      return this.handleSell()
    }

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

    this.setState({ operation, value })
  }

  createOperation = async () => {
    const data = await history.balance()
    const { origin, destiny, type } = this.state
    const { balance } = data.operation
    const newQuotation = this.quotationForOperation(destiny)
    const newBalance = this.updateBalance(balance)

    if (balance[origin] > 0.01 || newBalance[origin] > 0) {
      return this.createTransaction(
        type,
        Object.assign({}, { buy: newQuotation[0], sell: newQuotation[1] }),
        newBalance,
      )
    }

    return this.setState({ error: `You don't have money enough to complete this transaction` })
  }

  createTransaction = async (type, quotation, balance) => {
    const { origin, destiny, value } = this.state
    const formatValue = currencyFormat(origin, value)

    history.create(type, origin, destiny, formatValue, quotation, balance)
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
    } = this.state
    const transactionProps = { options, isDisabled, label, optionsDestiny }

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
                  <Input name="money" label="value" onChange={this.onChangeInput} error={error} />
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

Transaction.propTypes = {
  bitcoin: PropTypes.object.isRequired,
  brita: PropTypes.object.isRequired,
}

export default Transaction
