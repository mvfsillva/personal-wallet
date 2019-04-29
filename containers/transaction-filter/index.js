import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { If, Choose } from 'react-extras'

import Select from '../../components/select'

import theme from '../../theme'

const { When, Otherwise } = Choose

const Wrapper = styled.div``

const Block = styled.div`
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
`

const TransactionFilter = ({
  options,
  isDisabled,
  label,
  optionsDestiny,
  onChangeCurrency,
  onChangeCoin,
}) => {
  return (
    <Wrapper>
      <Choose>
        <When condition={Boolean(label)}>
          <Block>
            <Select
              name="Selecione"
              options={options}
              disabled={isDisabled}
              onChange={onChangeCurrency}
              label={label}
            />
          </Block>
          <Block>
            <If condition={Boolean(optionsDestiny)}>
              <Select
                name="Selecione"
                options={optionsDestiny}
                disabled={isDisabled}
                onChange={onChangeCoin}
              />
            </If>
          </Block>
        </When>
        <Otherwise>
          <Select
            name="Selecione"
            options={options}
            disabled={isDisabled}
            onChange={onChangeCoin}
          />
        </Otherwise>
      </Choose>
    </Wrapper>
  )
}

TransactionFilter.defaultProps = {
  isDisabled: false,
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
