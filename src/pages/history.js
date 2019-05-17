import React, { PureComponent } from 'react'
import styled from 'styled-components'
import shortid from 'shortid'
import { theme } from 'styled-tools'

import { PageTitle, Loader } from '../components'
import { Logged, HistoryDetail } from '../containers'
import { history } from '../services'
import { Either } from '../helpers'

import withAuth from '../hocs/with-auth'

const Content = styled.div`
  padding-top: ${theme('spacing.huge')};
  padding-bottom: ${theme('spacing.huge')};

  @media ${theme('responsive.phone')} {
    .card__size {
      width: 300px;
    }
  }
`

class History extends PureComponent {
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
                {details.reverse().map(({ operation }) => (
                  <HistoryDetail
                    key={shortid.generate()}
                    datetime={operation.createdAt}
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

export default withAuth(History)
