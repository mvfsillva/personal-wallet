import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { If, Choose } from 'react-extras'
import { theme } from 'styled-tools'

import Select from '../../components/select'

const Block = styled.div`
  padding-top: ${theme('spacing.medium')};
  padding-bottom: ${theme('spacing.medium')};
`

const TransactionFilter = ({ options, isDisabled, label, optionsDestiny, onChangeCurrency, onChangeCoin }) => (
  <Choose>
    <Choose.When condition={Boolean(label)}>
      <Block>
        <Select name="Selecione" options={options} disabled={isDisabled} onChange={onChangeCurrency} label={label} />
        <If condition={Boolean(optionsDestiny)}>
          <Select
            name="Selecione"
            options={optionsDestiny}
            disabled={!(optionsDestiny.length > 0)}
            onChange={onChangeCoin}
            label="destiny"
          />
        </If>
      </Block>
    </Choose.When>
    <Choose.Otherwise>
      <Block>
        <Select name="Selecione" options={options} disabled={isDisabled} onChange={onChangeCoin} label="coin" />
      </Block>
    </Choose.Otherwise>
  </Choose>
)

TransactionFilter.defaultProps = {
  isDisabled: false,
  optionsDestiny: [],
  options: [],
}

TransactionFilter.propTypes = {
  options: PropTypes.array,
  optionsDestiny: PropTypes.array,
  onChangeCurrency: PropTypes.func,
  onChangeCoin: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default TransactionFilter
