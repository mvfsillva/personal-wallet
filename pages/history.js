import React, { PureComponent } from 'react'
import styled from 'styled-components'
import shortid from 'shortid'

import PageTitle from '../components/page-title'
import Loader from '../components/loader'

import Logged from '../containers/logged'
import HistoryDetail from '../containers/history-detail'

import Either from '../helpers/either'

import history from '../services/history'

import theme from '../theme'

const Content = styled.div`
  padding-top: ${theme.spacing.huge};
  padding-bottom: ${theme.spacing.huge};

  @media ${theme.responsive.phone} {
    .card__size {
      width: 300px;
    }
  }
`

class Balance extends PureComponent {
  state = {
    details: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getHistory()
  }

  getHistory = async () => {
    const details = (await history.get()) || []
    this.setState({ details, isLoading: false })
  }

  render() {
    const { details, isLoading } = this.state

    return (
      <Logged>
        <Content>
          <PageTitle title="History" description="Details of your transactions" />
          <Either
            when={isLoading}
            left={<Loader size={32} />}
            right={
              <>
                {details.map(({ operation }) => (
                  <HistoryDetail
                    key={shortid.generate()}
                    type={operation.type}
                    origin={operation.origin}
                    destiny={operation.destiny}
                    money={operation.value}
                    quotation={operation.quotation}
                    balance={operation.balance}
                  />
                ))}
              </>
            }
          />
        </Content>
      </Logged>
    )
  }
}

export default Balance
