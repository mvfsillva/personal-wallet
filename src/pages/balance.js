import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { Card, PageTitle, Loader } from '../components'
import { Logged } from '../containers'
import { history } from '../services'
import { Either, currencyFormat } from '../helpers'

import withAuth from '../hocs/with-auth'

const Content = styled.div`
  padding-top: ${theme('spacing.huge')};
  padding-bottom: ${theme('spacing.huge')};

  section {
    display: flex;
  }

  .card__size {
    width: 300px;
    height: 120px;
    margin: ${theme('spacing.tiny')};
  }

  .card__title {
    white-space: nowrap;
    color: ${theme('colors.white')};
    margin-bottom: ${theme('spacing.medium')};
  }

  h4 {
    color: ${theme('colors.white')};
  }

  @media ${theme('responsive.phone')} {
    padding-bottom: ${theme('spacing.tiny')};
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
                    <Card palette={theme('colors.secondary')}>
                      <h2 className="card__title">Real</h2>
                      <h4>{currencyFormat('brl', balance.brl)}</h4>
                    </Card>
                  </div>
                  <div className="card__size">
                    <Card palette={theme('colors.secondary')}>
                      <h2 className="card__title">Brita</h2>
                      <h4>{currencyFormat('bta', balance.bta)}</h4>
                    </Card>
                  </div>
                  <div className="card__size">
                    <Card palette={theme('colors.secondary')}>
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
