import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Card from '../components/card'
import Button from '../components/button'
import PageTitle from '../components/page-title'
import Loader from '../components/loader'

import Logged from '../containers/logged'

import Either from '../helpers/either'
import currencyFormat from '../helpers/currency-format'

import history from '../services/history'

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

const Transaction = styled.div`
  button {
    margin-right: ${theme.spacing.medium};
  }

  @media ${theme.responsive.phone} {
    display: none;
  }
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
          <PageTitle title="Balance" description="balance broken down by currency">
            <Transaction>
              <Button palette="gray" outline onClick={() => console.log('Purchase')}>
                Purchase
              </Button>
              <Button palette="gray" outline onClick={() => console.log('Sell')}>
                Sell
              </Button>
            </Transaction>
          </PageTitle>
          <section>
            <Either
              when={isLoading}
              left={<Loader size={32} />}
              right={
                <FlexWrap>
                  <div className="card__size">
                    <Card palette={`${theme.colors.secondary}`}>
                      <h2 className="card__title">Real</h2>
                      <h4>{currencyFormat('pt-BR', 'BRL', balance.brl)}</h4>
                    </Card>
                  </div>
                  <div className="card__size">
                    <Card palette={`${theme.colors.secondary}`}>
                      <h2 className="card__title">Brita</h2>
                      <h4>{currencyFormat('en-US', 'USD', balance.bta)}</h4>
                    </Card>
                  </div>
                  <div className="card__size">
                    <Card palette={`${theme.colors.secondary}`}>
                      <h2 className="card__title">Bitcoin</h2>
                      <h4>{currencyFormat('de-DE', 'BTC', balance.bta)}</h4>
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

export default Balance
