import { darken, lighten } from 'polished'
import hexRgb from 'hex-rgb'

const theme = {}

const transformHexRgb = color => {
  const hex = color.replace('#', '')
  const { red, green, blue } = hexRgb(hex)

  return `${red}, ${green}, ${blue}`
}

theme.shadow = {
  tiny: color => `0 2px 6px rgba(${transformHexRgb(color)}, .25)`,
  small: color => `0 1px 1px rgba(${transformHexRgb(color)}, .16)`,
  medium: color => `0 8px 10px rgba(${transformHexRgb(color)}, .16)`,
  large: color => `0 24px 32px rgba(${transformHexRgb(color)}, .16)`,
  tooltip: color => `0 0px 24px rgba(${transformHexRgb(color)}, .16)`,
}

theme.radius = {
  tiny: '2px',
  small: '3px',
  medium: '4px',
  large: '6px',
  rounded: '50%',
}

theme.spacing = {
  tiny: '4px',
  small: '8px',
  medium: '16px',
  large: '24px',
  xLarge: '32px',
  xxLarge: '40px',
  xxxLarge: '48px',
  huge: '56px',
  xHuge: '64px',
  xxHuge: '72px',
  xxxHuge: '80px',
}

theme.responsive = {
  smallPhone: 'screen and (min-width: 320px) and (max-width: 480px)',
  smallTablet: 'screen and (min-width: 481px) and (max-width: 767px)',
  smallDesktop: 'screen and (min-width: 1025px) and (max-width: 1280px)',
  phone: 'screen and (min-width: 320px) and (max-width: 767px)',
  tablet: 'screen and (min-width: 768px) and (max-width: 1024px)',
  desktop: 'screen and (min-width: 1281px)',
}

theme.zindex = {
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
}

const b100 = '2.625rem'
const b200 = '1.75rem'
const b300 = '1.625rem'
const b400 = '1.25rem'
const b500 = '1rem'
const b600 = '0.875rem'
const b700 = '0.75rem'

theme.font = {
  base: '16px',
  b100,
  b200,
  b300,
  b400,
  b500,
  b600,
  b700,
  h100: {
    fontSize: b100,
    lineHeight: '44px',
    fontWeight: 700,
  },
  h200: {
    fontSize: b200,
    lineHeight: '32px',
    fontWeight: 700,
  },
  h300: {
    fontSize: b300,
    lineHeight: '32px',
    fontWeight: 500,
  },
  h400: {
    fontSize: b400,
    lineHeight: '24px',
    fontWeight: 500,
  },
  h500: {
    fontSize: b500,
    lineHeight: '24px',
    fontWeight: 700,
  },
  h600: {
    fontSize: b700,
    lineHeight: '16px',
    fontWeight: 700,
  },
  paragraph: {
    fontSize: b600,
    lineHeight: '20px',
    fontWeight: '400',
    marginBottom: '12px',
  },
  caption: {
    fontSize: b700,
    lineHeight: '16px',
    fontWeight: 500,
  },
}

const primary = '#0DB14B'
const secondary = '#2D3844'
const gray = '#96A0AF'
const black = '#000000'
const white = '#FFFFFF'
const red = '#E15554'

theme.colors = {
  white,
  red,
  primary: Object.assign(primary, {
    whitish: lighten(0.45, primary),
    lighter: lighten(0.2, primary),
    light: lighten(0.1, primary),
    dark: darken(0.1, primary),
    darker: darken(0.2, primary),
  }),
  secondary: Object.assign(secondary, {
    whitish: lighten(0.45, secondary),
    lighter: lighten(0.2, secondary),
    light: lighten(0.1, secondary),
    dark: darken(0.1, secondary),
    darker: darken(0.2, secondary),
  }),
  black: Object.assign(black, {
    whitish: lighten(0.45, black),
    lighter: lighten(0.2, black),
    light: lighten(0.1, black),
    dark: darken(0.1, black),
    darker: darken(0.2, black),
  }),
  gray: Object.assign(gray, {
    whitish: lighten(0.3, gray),
    lighter: lighten(0.2, gray),
    light: lighten(0.1, gray),
    dark: darken(0.1, gray),
    darker: darken(0.2, gray),
  }),
}

export default theme
