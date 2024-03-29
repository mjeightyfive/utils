const config = require('../index.js')
const fs = require('fs')
const stylelint = require('stylelint')

const validCss = fs.readFileSync('./tests/css-valid.css', 'utf-8')
const invalidCss = fs.readFileSync('./tests/css-invalid.css', 'utf-8')

describe('flags no warnings with valid css', () => {
  let result

  beforeEach(() => {
    return stylelint
      .lint({
        code: validCss,
        config
      })
      .then((res) => {
        result = res
      })
  })

  it('did not error', () => {
    expect(result.errored).toBeFalsy()
  })

  it('flags no warnings', () => {
    expect(result.results[0].warnings.length).toBe(0)
  })
})

describe('flags warnings with invalid css', () => {
  let result

  beforeEach(() => {
    result = stylelint.lint({
      code: invalidCss,
      config
    })
  })

  it('did error', () => {
    return result.then((data) => expect(data.errored).toBeTruthy())
  })

  it('flags one warning', () => {
    return result.then((data) => expect(data.results[0].warnings.length).toBe(1))
  })

  it('correct warning text', () => {
    return result.then((data) => expect(data.results[0].warnings[0].text).toBe('Expected indentation of 2 spaces (indentation)'))
  })

  it('correct rule flagged', () => {
    return result.then((data) => expect(data.results[0].warnings[0].rule).toBe('indentation'))
  })

  it('correct severity flagged', () => {
    return result.then((data) => expect(data.results[0].warnings[0].severity).toBe('error'))
  })

  it('correct line number', () => {
    return result.then((data) => expect(data.results[0].warnings[0].line).toBe(3))
  })

  it('correct column number', () => {
    return result.then((data) => expect(data.results[0].warnings[0].column).toBe(5))
  })
})
