import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../theme'

const Wrapper = styled.input`
  width: 100%;
  border-radius: ${theme.radius.tiny};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray.darker};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  font-size: ${theme.font.paragraph.fontSize};
  font-weight: ${theme.font.paragraph.fontWeight};
  line-height: ${theme.font.paragraph.lineHeight};
  color: ${theme.colors.black.whitish};
  appearance: none;

  &[required] {
    box-shadow: none;
  }

  &[readonly] {
    background-color: ${theme.colors.gray.darker};
    cursor: not-allowed;
  }
`

const Label = styled.label`
  display: block;
  font-size: ${theme.font.h600.fontSize};
  font-weight: ${theme.font.h600.fontWeight};
  line-height: ${theme.font.h600.lineHeight};
  color: ${props => props.error ? theme.colors.red : theme.colors.black};
  margin-top: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.small};
`

const Input = ({ type, placeholder, name, label, required, value, error, onChange, disabled }) => {

  return (
    <>
      {label && <Label>{label}</Label>}
      <Wrapper
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
      {error && <Label error={error}>{error}</Label>}
    </>
  )
}


Input.defaultProps = {
  type: 'text',
  size: 'medium',
  required: false
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string
}

export default Input
