/* eslint-disable @typescript-eslint/no-var-requires */
const removeDiacritics = require('diacritics').remove

const { getRandomN } = require('../utils/getRandomN.js')
const { BLACKLIST } = require('./blacklist.js')

const { XT3 } = require('./tags/xt3.js')
const { X100V } = require('./tags/x100v.js')
const { CANON80D } = require('./tags/canon80d.js')
const { RX100VI } = require('./tags/rx100vi.js')
const { BW } = require('./tags/bw.js')
const { STREET } = require('./tags/street.js')
const { BIRD } = require('./tags/bird.js')
const { BUILDING } = require('./tags/building.js')
const { HORSE } = require('./tags/horse.js')
const { BW_STREET } = require('./tags/bwstreet.js')
const { ARCHITECTURE } = require('./tags/architecture.js')
const { LANDSCAPE } = require('./tags/landscape.js')
const { NATURE } = require('./tags/nature.js')
const { SUNSET } = require('./tags/sunset.js')
const { BRANCH } = require('./tags/branch.js')
const { SUNRISE } = require('./tags/sunrise.js')
const { TREE } = require('./tags/tree.js')
const { XT3_STREET } = require('./tags/xt3street.js')
const { X100V_STREET } = require('./tags/x100vstreet.js')
const { TRAVEL } = require('./tags/travel.js')
const { HIKE } = require('./tags/hike.js')
const { IPHONE } = require('./tags/iphone.js')
const { MINIMAL } = require('./tags/minimal.js')
const { MOODY } = require('./tags/moody.js')
const { MOODY_NATURE } = require('./tags/moodynature.js')
const { FLOWER } = require('./tags/flower.js')
const { RIVER } = require('./tags/river.js')
const { BEACH } = require('./tags/beach.js')
const { SUN } = require('./tags/sun.js')
const { SEA } = require('./tags/sea.js')
const { BOAT } = require('./tags/boat.js')
const { MOUNTAIN } = require('./tags/mountain.js')
const { ANIMAL } = require('./tags/animal.js')
const { WILDLIFE } = require('./tags/wildlife.js')
const { FOREST } = require('./tags/forest.js')
const { PALM } = require('./tags/palm.js')
const { ROAD } = require('./tags/road.js')
const { CLOUDS } = require('./tags/clouds.js')
const { SKY } = require('./tags/sky.js')
const { WINTER } = require('./tags/winter.js')
const { SPRING } = require('./tags/spring.js')
const { SUMMER } = require('./tags/summer.js')
const { AUTUMN } = require('./tags/autumn.js')
const { CAR } = require('./tags/car.js')
const { SAIL } = require('./tags/sail.js')
const { SNOW } = require('./tags/snow.js')
const { COLD } = require('./tags/cold.js')
const { CITY } = require('./tags/city.js')
const { BUS } = require('./tags/bus.js')
const { WALK } = require('./tags/walk.js')
const { ROOF } = require('./tags/roof.js')
const { DOG } = require('./tags/dog.js')
const { CAT } = require('./tags/cat.js')
const { BIKE } = require('./tags/bike.js')
const { PARK } = require('./tags/park.js')
const { TRACK } = require('./tags/track.js')
const { NIGHT } = require('./tags/night.js')
const { PLANT } = require('./tags/plant.js')
const { SHADOW } = require('./tags/shadow.js')
const { GOPRO } = require('./tags/gopro.js')
const { GENERIC } = require('./tags/generic.js')
const { GLASGOW } = require('./tags/glasgow.js')
const { SCOTLAND } = require('./tags/scotland.js')

const LIMIT = 30
const FIXED_TAGS = 5 // VISIT + #untitledsnaps

const trimNonLetters = (str) => (str && str.replace(/'/g, '')) || ''
const maxTagsPerKeyword = (length) => Math.ceil((LIMIT + FIXED_TAGS) / length)
const hashify = (str) => (str && `#${trimNonLetters(str).replace(/ /g, '').toLowerCase()}`) || ''

const createPost = ({ exif, filename, onComplete }) => {
  if (!exif) throw new Error('No exif data found')

  let specificTags = []

  const place = exif.Sublocation ? (parseInt(exif.Sublocation, 10) ? '' : exif.Sublocation) : '' // eslint-disable-line no-nested-ternary
  const City = exif.City || ''
  const State = (exif.State && exif.State) || ''
  const Country = (exif.Country && exif.Country) || ''

  const hashPlace = hashify(removeDiacritics(place))
  const hashCity = hashify(removeDiacritics(City))
  const hashState = hashify(removeDiacritics(State))
  const hashCountry = hashify(removeDiacritics(Country))

  const LOCATION = [
    Country && hashify(`${removeDiacritics(Country)}trip`),
    City && hashify(`explore${removeDiacritics(City)}`),
    City && hashify(City && `${removeDiacritics(City)}life`),
    Country && hashify(`hidden${removeDiacritics(Country)}`),
    City && hashify(City && `hidden${removeDiacritics(City)}`),
    hashCity,
    hashState,
    hashCountry
  ].filter(Boolean)

  const VISIT = [
    Country && hashify(`visit${removeDiacritics(Country)}`),
    City && hashify(City && `visit${removeDiacritics(City)}`),
    State && hashify(`visit${removeDiacritics(State)}`),
    Country && hashify(`travel${removeDiacritics(Country)}`),
    hashPlace
  ].filter(Boolean)

  const keywords = exif.Keywords && Array.isArray(exif.Keywords) ? exif.Keywords : [exif.Keywords]

  let exifTags = []

  if (keywords && keywords[0]) {
    exifTags = keywords && keywords.length > 0 ? keywords.map((k) => `#${k}`) : ''
    // console.log(`Tags found: ${exifTags.length}: [${exifTags.join(' ')}]\n`) // eslint-disable-line no-console
  } else {
    throw new Error(`✗ No Keywords in: ${filename}`)
  }

  const maxTagsPerKeyWordToTake = maxTagsPerKeyword(exifTags.length)
  // console.log('# Tags per keyword:', maxTagsPerKeyWordToTake)

  if (exif.Model === 'X-T3') specificTags = [...specificTags, ...getRandomN(XT3, maxTagsPerKeyword(maxTagsPerKeyWordToTake))]
  if (exif.Model === 'X100V') specificTags = [...specificTags, ...getRandomN(X100V, maxTagsPerKeyword(maxTagsPerKeyWordToTake))]
  if (exif.Model === 'Canon EOS 80D') specificTags = [...specificTags, ...getRandomN(CANON80D, maxTagsPerKeyWordToTake)]
  if (exif.Make === 'SONY') specificTags = [...specificTags, ...getRandomN(RX100VI, maxTagsPerKeyWordToTake)]
  if (exif.Make === 'Apple') specificTags = [...specificTags, ...getRandomN(IPHONE, maxTagsPerKeyWordToTake)]
  if (exif.Make === 'GoPro') specificTags = [...specificTags, ...getRandomN(GOPRO, maxTagsPerKeyWordToTake)]

  const replaceKeywords = (kws, queries, include, match = 'any') => {
    const shouldReplace = match === 'any' ? queries.some((query) => kws.includes(query)) : queries.every((query) => kws.includes(query))

    queries.forEach((query) => {
      if (shouldReplace) {
        specificTags = [...specificTags, ...include]
        exifTags = exifTags.filter((exifTag) => exifTag !== `#${query}`)
      }
    })
  }

  // single specific
  replaceKeywords(keywords, ['clyde'], ['#riverclyde'])

  // single
  replaceKeywords(keywords, ['shadow'], getRandomN(SHADOW, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['track'], getRandomN(TRACK, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['dog'], getRandomN(DOG, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['night'], getRandomN(NIGHT, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['park'], getRandomN(PARK, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['cat'], getRandomN(CAT, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['snow'], getRandomN(SNOW, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['walk'], getRandomN(WALK, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['sail'], getRandomN(SAIL, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['roof'], getRandomN(ROOF, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['road'], getRandomN(ROAD, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['cold'], getRandomN(COLD, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['winter'], getRandomN(WINTER, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['spring'], getRandomN(SPRING, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['summer'], getRandomN(SUMMER, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['horse'], getRandomN(HORSE, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['minimal'], getRandomN(MINIMAL, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['street'], getRandomN(STREET, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['bw'], getRandomN(BW, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['wildlife'], getRandomN(WILDLIFE, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['moody'], getRandomN(MOODY, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['river'], getRandomN(RIVER, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['sky'], getRandomN(SKY, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['beach'], getRandomN(BEACH, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['sun'], getRandomN(SUN, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['sea'], getRandomN(SEA, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['branch'], getRandomN(BRANCH, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['forest'], getRandomN(FOREST, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['sunset'], getRandomN(SUNSET, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['sunrise'], getRandomN(SUNRISE, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['nature'], getRandomN(NATURE, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['travel'], getRandomN(TRAVEL, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['landscape'], getRandomN(LANDSCAPE, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['architecture'], getRandomN(ARCHITECTURE, maxTagsPerKeyWordToTake))

  // double
  replaceKeywords(keywords, ['car', 'cars'], getRandomN(CAR, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['plant', 'plants'], getRandomN(PLANT, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['city', 'urban'], getRandomN(CITY, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['hike', 'hiking'], getRandomN(HIKE, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['autumn', 'fall'], getRandomN(AUTUMN, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['tree', 'trees'], getRandomN(TREE, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['cloud', 'clouds'], getRandomN(CLOUDS, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['palm', 'palms'], getRandomN(PALM, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['boat', 'boats'], getRandomN(BOAT, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['animal', 'animals'], getRandomN(ANIMAL, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['mountain', 'mountains'], getRandomN(MOUNTAIN, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['flower', 'flowers'], getRandomN(FLOWER, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['bird', 'birds'], getRandomN(BIRD, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['building', 'buildling'], getRandomN(BUILDING, maxTagsPerKeyWordToTake))

  // triple
  replaceKeywords(keywords, ['bus', 'train', 'tram'], getRandomN(BUS, maxTagsPerKeyWordToTake))
  replaceKeywords(keywords, ['bike', 'bicycle', 'cycling'], getRandomN(BIKE, maxTagsPerKeyWordToTake))

  // multiple matches
  replaceKeywords(keywords, ['moody', 'nature'], getRandomN(MOODY_NATURE, maxTagsPerKeyWordToTake), 'all')

  replaceKeywords(
    keywords,
    ['street', 'bw'],
    [...getRandomN(STREET, maxTagsPerKeyWordToTake), ...getRandomN(BW_STREET, maxTagsPerKeyWordToTake)],
    'all'
  )

  // custom
  if (keywords.includes('street') && exif.Model === 'X-T3') {
    specificTags = [...specificTags, ...getRandomN(XT3_STREET, maxTagsPerKeyWordToTake)]
  }

  if (keywords.includes('street') && exif.Model === 'X100V') {
    specificTags = [...specificTags, ...getRandomN(X100V_STREET, maxTagsPerKeyWordToTake)]
  }

  if (City.includes('Glasgow')) {
    specificTags = [...specificTags, ...getRandomN(GLASGOW, maxTagsPerKeyWordToTake)]
  }

  if (Country.includes('Scotland') || State.includes('Scotland')) {
    specificTags = [...specificTags, ...getRandomN(SCOTLAND, maxTagsPerKeyWordToTake)]
  }

  if (Country.includes('United Kingdom')) {
    specificTags = ['#ukshots', '#ukshooters', ...specificTags]
  }

  if (Country.includes('United Kingdom') && exif.Make === 'Canon') {
    specificTags = [...specificTags, '#canonuk']
  }

  if (Country.includes('United Kingdom') && (exif.Model === 'X-T3' || exif.Model === 'X100V')) {
    specificTags = [...specificTags, '#fujifilm_uk']
  }

  const caption = `${(place && `${place}, `) || ''}${(City && `${City}, `) || ''}${(State && `${State}, `) || ''}${
    (Country && `${Country}`) || ''
  }`

  let hashtags = [...VISIT, '#untitledsnaps', ...exifTags, ...specificTags, ...getRandomN(GENERIC, 3), ...LOCATION]

  hashtags = hashtags.filter((tag) => !BLACKLIST.includes(tag)).filter((a, b, self) => self.indexOf(a) === b)

  onComplete(filename)

  return {
    filename,
    caption,
    hashtags
  }
}

exports.createPost = createPost
