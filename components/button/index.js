import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { transitions } from 'polished'

import theme from '../../theme'
import transition from '../../mixins/transition'

const Wrapper = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  ${transitions([
    transition({ property: 'background-color', duration: '0.5s' }),
    transition({ property: 'border-color', duration: '0.5s' }),
    transition({ property: 'color', duration: '0.5s', delay: '0.2s' }),
  ])};

  &.primary {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
    &:hover {
      background-color: ${theme.colors.primary.darker};
      border-color: ${theme.colors.primary.darker};
    }

    &.outline {
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      background-color: transparent;
      &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        border-color: ${theme.colors.primary};
      }
    }
  }

  &.secondary {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.secondary.dark};
    &:hover {
      background-color: ${theme.colors.secondary.lighter};
      border-color: ${theme.colors.secondary.lighter};
    }

    &.outline {
      color: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};
      background-color: transparent;
      &:hover {
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
        border-color: ${theme.colors.secondary};
      }
    }
  }

  &.small {
    font-size: ${theme.font.paragraph.fontSize};
    line-height: ${theme.font.paragraph.lineHeight};
    font-weight: ${theme.font.paragraph.fontWeight};
    padding: ${theme.spacing.tiny};
    border-radius: ${theme.radius.tiny};
  }

  &.medium {
    font-size: ${theme.font.paragraph.fontSize};
    line-height: ${theme.font.paragraph.lineHeight};
    font-weight: ${theme.font.paragraph.fontWeight};
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    border-radius: ${theme.radius.tiny};
  }

  &.large {
    font-size: ${theme.font.paragraph.fontSize};
    line-height: ${theme.font.paragraph.lineHeight};
    font-weight: ${theme.font.paragraph.fontWeight};
    padding: ${theme.spacing.medium} ${theme.spacing.large};
    border-radius: ${theme.radius.tiny};
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.block {
    display: block;
    width: 100%;
  }
`

const Button = ({ type, palette, size, disabled, block, outline, onClick, children }) => {
  const classname = classnames({
    small: size === 'small',
    medium: size === 'medium',
    large: size === 'large',
    primary: palette === 'primary',
    secondary: palette === 'secondary',
    disabled,
    block,
    outline,
  })

  return (
    <Wrapper className={classname} type={type} size={size} onClick={onClick}>
      {children}
    </Wrapper>
  )
}

Button.defaultProps = {
  type: 'button',
  palette: 'primary',
  size: 'medium',
  disabled: false,
  block: false,
  outline: false,
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  palette: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  outline: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export default Button
