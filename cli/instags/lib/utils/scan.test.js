/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires, n/no-extraneous-require */
const mockFs = require('mock-fs')

/* eslint-disable @typescript-eslint/no-var-requires */
const { scan } = require('./scan.js')

const folder = {
  'lake.jpg': 'file content here',
  'landscape.jpg': 'file content here',
  'sunset.jpg': 'file content here'
}

beforeEach(() => {
  mockFs(folder)
})

afterEach(() => {
  mockFs.restore()
})

describe('scan', () => {
  test('input', () => {
    scan().forEach((item, index) => expect(item).toContain(Object.keys(folder)[index]))
  })
})
