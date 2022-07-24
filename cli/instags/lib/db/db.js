/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires, n/no-extraneous-require, n/no-missing-require */
const ora = require('ora')
const exifr = require('exifr')

const { scan } = require('../utils/scan.js')
const { create } = require('./create.js')

const spinner = ora()
/* prettier-ignore */
const asyncPipe = (...fns) => (arg) => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const parse = (file) => exifr.parse(file, { iptc: true, silentErrors: false })
const build = async (file) => ({ exif: await parse(file), filename: file, onComplete: () => spinner.succeed(file) })
const get = async (file) => await asyncPipe(spinner.start(file), build)(file)
const read = async (files) => await Promise.all(files.map(get))

const searchDB = async (path) => asyncPipe(read, create)(scan(path))

exports.searchDB = searchDB
