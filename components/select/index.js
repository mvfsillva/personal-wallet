import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { For, If, autoBind, Choose } from 'react-extras'
import KeyHandler from 'react-key-handler'

import ArrowDown from '../../icons/arrow-down'
import ArrowUp from '../../icons/arrow-up'

import theme from '../../theme'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray.dark};
  border-radius: ${theme.radius.small};
  font-size: ${theme.font.b200.fontSize};
  font-weight: ${theme.font.b200.fontWeight};

  svg {
    position: absolute;
    right: ${theme.spacing.small};
    pointer-events: none;
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: ${theme.colors.gray.lighter};
  }
`

const StyledLabel = styled.label`
  margin-top: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.small};
  color: ${theme.colors.black};
  font-size: ${theme.font.caption.fontSize};
  font-weight: ${theme.font.caption.fontWeight};
  display: block;
`

const Selected = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${theme.spacing.medium};

  span {
    color: ${theme.colors.black};
  }
`

const Options = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid ${theme.colors.gray.dark};
  background: ${theme.colors.white};
  cursor: pointer;
  z-index: ${theme.zindex.dropdown};
  display: ${props => (props.open ? 'block' : 'none')};
  max-height: 350px;
  overflow-y: auto;
`

const StyledOption = styled.span`
  display: flex;
  padding: ${theme.spacing.medium};
  border-bottom: 1px solid ${theme.colors.gray.dark};
  cursor: pointer;

  &:hover,
  &.active {
    background-color: ${theme.colors.gray};
  }
`

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isActive: false,
    }

    autoBind(this)
  }

  handleShowOptions() {
    const { disabled } = this.props

    if (!disabled) {
      this.setState({ isOpen: !this.state.isOpen })
    }
  }

  handleSelectOption({ currentTarget } = {}) {
    const { onChange, name } = this.props
    const { value } = currentTarget.dataset
    const info = { target: { name, value } }
    const label = currentTarget.textContent

    onChange(info, label)
    this.setState({ labelOption: label })
    this.closeSelect()
  }

  closeSelect() {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen, labelOption } = this.state
    const {
      name,
      options,
      onChange,
      selected,
      selectedLabel,
      required,
      disabled,
      placeholder,
      label,
    } = this.props

    return (
      <>
        <If condition={Boolean(label)} render={() => <StyledLabel>{label}</StyledLabel>} />
        <KeyHandler keyEventName="keydown" keyValue="Escape" onKeyHandle={this.closeSelect} />
        <Wrapper name={name} onChange={onChange} required={required} disabled={disabled}>
          <Selected onClick={this.handleShowOptions}>
            <span>
              <Choose>
                <Choose.When condition={Boolean(labelOption || selectedLabel)}>
                  <Choose>
                    <Choose.When condition={Boolean(selectedLabel)}>{selectedLabel}</Choose.When>
                    <Choose.Otherwise>{labelOption}</Choose.Otherwise>
                  </Choose>
                </Choose.When>
                <Choose.Otherwise>{placeholder}</Choose.Otherwise>
              </Choose>
            </span>
          </Selected>
          <Options open={isOpen}>
            <For
              of={options}
              render={option => (
                <StyledOption
                  className={selected === option.value && 'active'}
                  key={option.value}
                  data-value={option.value}
                  onClick={this.handleSelectOption}
                >
                  {option.label}
                </StyledOption>
              )}
            />
          </Options>
          <Choose>
            <Choose.When condition={Boolean(isOpen)}>
              <ArrowUp />
            </Choose.When>
            <Choose.Otherwise>
              <ArrowDown />
            </Choose.Otherwise>
          </Choose>
        </Wrapper>
      </>
    )
  }
}

Select.defaultProps = {
  options: [],
  placeholder: 'select',
  disabled: false,
  required: false,
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  selected: PropTypes.string,
  selectedLabel: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}

export default Select
