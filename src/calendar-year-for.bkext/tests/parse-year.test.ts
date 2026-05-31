import { parseYear } from '../app/parse-year'

describe('parseYear', () => {
  it('accepts a valid 4-digit year', () => {
    assert(parseYear('2027') === 2027, `Expected 2027 but got ${parseYear('2027')}`)
  })
  it('trims surrounding whitespace', () => {
    assert(parseYear('  2027  ') === 2027, `Expected 2027 but got ${parseYear('  2027  ')}`)
  })
  it('accepts the lower bound 1000', () => {
    assert(parseYear('1000') === 1000, `Expected 1000 but got ${parseYear('1000')}`)
  })
  it('accepts the upper bound 9999', () => {
    assert(parseYear('9999') === 9999, `Expected 9999 but got ${parseYear('9999')}`)
  })
  it('rejects non-numeric input', () => {
    assert(parseYear('abc') === null, `Expected null but got ${parseYear('abc')}`)
  })
  it('rejects fewer than 4 digits', () => {
    assert(parseYear('27') === null, `Expected null but got ${parseYear('27')}`)
  })
  it('rejects more than 4 digits', () => {
    assert(parseYear('20270') === null, `Expected null but got ${parseYear('20270')}`)
  })
  it('rejects a negative number', () => {
    assert(parseYear('-2027') === null, `Expected null but got ${parseYear('-2027')}`)
  })
  it('rejects a 4-digit value below 1000 with a leading zero', () => {
    assert(parseYear('0999') === null, `Expected null but got ${parseYear('0999')}`)
  })
  it('rejects the empty string', () => {
    assert(parseYear('') === null, `Expected null but got ${parseYear('')}`)
  })
})
