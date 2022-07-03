import mockFs from 'mock-fs' // eslint-disable-line n/no-unpublished-import

import moments from '../src/moments.js'

beforeEach(() => {
  mockFs({
    'input/date-only': {
      '5 June 2019': {}
    },
    'input/common-case': {
      'Place - City, Country, 28 June 2019': {}
    },
    'input/hyphens': {
      'Some - Area - High Street, 28 June 2019': {}
    },
    'input/title-only': {
      'Title, 28 June 2019': {}
    }
  })
})

afterEach(() => {
  mockFs.restore()
})

describe('input', () => {
  test('does not allow empty path', async () => {
    expect(() => {
      moments()
    }).toThrow('No path specified.')
  })
})

describe('output', () => {
  test('converts date only correctly', async () => {
    await expect(Promise.resolve(moments('input/date-only'))).resolves.toBe('2019-06-05')
  })

  test('converts common formats', async () => {
    await expect(Promise.resolve(moments('input/common-case'))).resolves.toBe('2019-06-28 - Place - City, Country')
  })

  test('converts sessions with hyphens', async () => {
    await expect(Promise.resolve(moments('input/hyphens'))).resolves.toBe('2019-06-28 - Some - Area - High Street')
  })

  test('converts titles and dates', async () => {
    await expect(Promise.resolve(moments('input/title-only'))).resolves.toBe('2019-06-28 - Title')
  })
})
