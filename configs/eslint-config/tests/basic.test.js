const config = require('../index.js')

const isObject = (obj) => typeof obj === 'object' && obj !== null

test('basic properties of config', () => {
  expect(isObject(config.parserOptions)).toBe(true)
  expect(isObject(config.env)).toBe(true)
  expect(isObject(config.rules)).toBe(true)
})
