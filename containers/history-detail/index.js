import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card from '../../components/card'

import currencyFormat from '../../helpers/currency-format'

import theme from '../../theme'

const Wrapper = styled.div`
  width: 600px;
  margin-right: ${theme.spacing.medium};

  span,
  h4,
  h5 {
    color: ${theme.colors.white};
  }

  @media ${theme.responsive.phone} {
    width: 300px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.small};
  h5 {
    color: ${theme.colors.white};
  }
`

const CardTitle = styled.div`
  white-space: nowrap;
  margin-bottom: ${theme.spacing.medium};
  display: flex;
  justify-content: space-between;
`

const HistoryDetail = ({ datetime, type, money, origin, destiny, quotation, balance }) => (
  <Wrapper>
    <Card palette={`${theme.colors.secondary}`}>
      <CardTitle>
        <span>{type}</span>
        <span>{datetime}</span>
      </CardTitle>
      <Row>
        <span>
          {origin} - {destiny}
        </span>
        <span>{money}</span>
      </Row>
      <Row>
        <h5>Quotation Details:</h5>
        <span>Buy: {quotation.buy}</span>
        <span>Sell: {quotation.sell}</span>
      </Row>
      <Row>
        <h5>Balance Details:</h5>
        <span>{currencyFormat('pt-BR', 'BRL', balance.brl)}</span>
        <span>{currencyFormat('en-US', 'USD', balance.bta)}</span>
        <span>{currencyFormat('de-DE', 'BTC', balance.bta)}</span>
      </Row>
    </Card>
  </Wrapper>
)

HistoryDetail.propTypes = {
  datetime: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  destiny: PropTypes.string.isRequired,
  money: PropTypes.number.isRequired,
  quotation: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
}

export default HistoryDetail