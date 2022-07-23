/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires, n/no-extraneous-require, n/no-missing-require */
const { fdir: Fdir } = require('fdir') // https://github.com/thecodrr/fdir/blob/master/documentation.md

const scan = (path = '.') => new Fdir().glob('./**/*.jpg').withMaxDepth(0).withFullPaths().crawl(path).sync()

exports.scan = scan
