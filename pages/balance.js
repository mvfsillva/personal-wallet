import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Card from '../components/card'
import PageTitle from '../components/page-title'
import Loader from '../components/loader'

import Logged from '../containers/logged'

import history from '../services/history'

import Either from '../helpers/either'
import currencyFormat from '../helpers/currency-format'

import withAuth from '../hocs/with-auth'

import theme from '../theme'

const Content = styled.div`
  padding-top: ${theme.spacing.huge};
  padding-bottom: ${theme.spacing.huge};

  section {
    margin-bottom: ${theme.spacing.xxLarge};
    display: flex;
  }

  .card__size {
    width: 300px;
    height: 160px;
    margin-right: ${theme.spacing.medium};
  }

  .card__title {
    white-space: nowrap;
    color: ${theme.colors.white};
    margin-bottom: ${theme.spacing.medium};
  }

  h4 {
    color: ${theme.colors.white};
  }
`

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

class Balance extends PureComponent {
  state = {
    balance: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getBalance()
  }

  getBalance = async () => {
    const { operation } = (await history.balance()) || []
    this.setState({ balance: operation.balance, isLoading: false })
  }

  render() {
    const { balance, isLoading } = this.state

    return (
      <Logged>
        <Content>
          <PageTitle title="Balance" description="balance broken down by currency" />
          <section>
            <Either
              when={isLoading}
              left={<Loader size={32} />}
              right={
                <FlexWrap>
                  <div className="card__size">
                    <Card palette={`${theme.colors.secondary}`}>
                      <h2 className="card__title">Real</h2>
                      <h4>{currencyFormat('brl', balance.brl)}</h4>
                    </Card>
                  </div>
                  <div className="card__size">
                    <Card palette={`${theme.colors.secondary}`}>
                      <h2 className="card__title">Brita</h2>
                      <h4>{currencyFormat('bta', balance.bta)}</h4>
                    </Card>
                  </div>
                  <div className="card__size">
                    <Card palette={`${theme.colors.secondary}`}>
                      <h2 className="card__title">Bitcoin</h2>
                      <h4>{currencyFormat('btc', balance.btc)}</h4>
                    </Card>
                  </div>
                </FlexWrap>
              }
            />
          </section>
        </Content>
      </Logged>
    )
  }
}

export default withAuth(Balance)
