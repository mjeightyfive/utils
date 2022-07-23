/* eslint-disable @typescript-eslint/no-var-requires */
const { create } = require('./create.js')
const { BW } = require('./tags/bw.js')
const { STREET } = require('./tags/street.js')

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

describe('create output', () => {
  const input = [
    {
      filename: 'landscape.jpg',
      exif: {
        Sublocation: 'Sportowa',
        City: 'Bukowina Tatrzańska',
        State: 'Lesser Poland',
        Country: 'Poland',
        CreateDate: '2020-09-07T16:56:21.000Z',
        Make: 'FUJIFILM',
        Model: 'X-T3',
        Keywords: ['moody', 'nature', 'outdoor', 'polishmountains', 'tree', 'landscape']
      },
      onComplete: noop
    }
  ]

  const output = [
    {
      filename: 'landscape.jpg',
      caption: `${input.Sublocation}, ${input.City}, ${input.State}, ${input.Country}`
    }
  ]

  it('creates caption', () => {
    expect(create(input).caption).toBe(output.caption)
  })

  it('creates filename', () => {
    expect(create(input).filename).toBe(output.filename)
  })

  it('creates hashtags', () => {
    expect(create(input).hashtags).not.toBeNull()
  })

  it('handles no keywords', () => {
    expect(() =>
      create([
        {
          filename: 'untagged.jpg',
          exif: {
            Sublocation: 'Sportowa',
            City: 'Bukowina Tatrzańska',
            State: 'Lesser Poland',
            Country: 'Poland',
            CreateDate: '2020-09-07T16:56:21.000Z',
            Make: 'FUJIFILM',
            Model: 'X-T3'
          },
          onComplete: noop
        }
      ])
    ).toThrowError('✗ No Keywords in: untagged.jpg')
  })
})

describe('create tags replacement - any', () => {
  const input = [
    {
      filename: 'city.jpg',
      exif: {
        Sublocation: 'High Street',
        City: 'Glasgow',
        State: 'Scotland',
        Country: 'United Kingdom',
        CreateDate: '2020-09-07T16:56:21.000Z',
        Make: 'FUJIFILM',
        Model: 'X-T3',
        Keywords: ['bus', 'train', 'tram', 'clyde', 'urban', 'city']
      },
      onComplete: noop
    }
  ]

  it('removes specified keywords if any found', () => {
    const hashtags = create(input)[0].hashtags

    expect(hashtags).not.toContain('bus')
    expect(hashtags).not.toContain('train')
    expect(hashtags).not.toContain('tram')
  })
})

describe('create tags replacement - all', () => {
  const input = [
    {
      filename: 'bw.jpg',
      exif: {
        Sublocation: 'High Street',
        City: 'Glasgow',
        State: 'Scotland',
        Country: 'United Kingdom',
        CreateDate: '2020-09-07T16:56:21.000Z',
        Make: 'FUJIFILM',
        Model: 'X-T3',
        Keywords: ['street', 'bw', 'tram', 'clyde', 'urban', 'city']
      },
      onComplete: noop
    }
  ]

  it('removes specified keywords if all found', () => {
    expect(create(input)).not.toContain('street')
    expect(create(input)).not.toContain('bw')
  })

  it('replaces with tags from specified groups', () => {
    const intersections = (a1, a2) => a1.filter((e) => a2.indexOf(e) !== -1)
    const output = create(input)[0]
    expect(intersections(output.hashtags, BW)).toBeTruthy()
    expect(intersections(output.hashtags, STREET)).toBeTruthy()
  })
})
