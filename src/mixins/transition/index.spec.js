import { transitions } from 'polished'

import transition from '.'

describe('Helper: Transition', () => {
  it('should verify of default transition', () => {
    expect(transition()).toBe('all 150ms ease-out 0ms')
  })

  it('should verify of pure transition', () => {
    expect(transition({ property: 'color' })).toBe('color 150ms ease-out 0ms')
    expect(transition({ property: 'border-bottom', duration: '1s', delay: '700ms' })).toBe(
      'border-bottom 1s ease-out 700ms',
    )
  })

  it('should verify of transition with polished', () => {
    expect(transitions(transition({ property: 'border-color' }))).toEqual({
      transition: 'border-color 150ms ease-out 0ms',
    })
    expect(transitions(transition({ property: 'button', ease: 'ease-in' }))).toEqual({
      transition: 'button 150ms ease-in 0ms',
    })
  })

  it('should verify of array transitions with polished', () => {
    expect(transitions([transition({ property: 'color' }), transition({ property: 'background-color' })])).toEqual({
      transition: 'color 150ms ease-out 0ms,background-color 150ms ease-out 0ms',
    })
  })
})
