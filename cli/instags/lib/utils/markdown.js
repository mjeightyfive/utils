/* eslint-disable @typescript-eslint/no-var-requires, n/no-unpublished-require */
const fs = require('fs')
const json2md = require('json2md')
const mkdirp = require('mkdirp')
const ora = require('ora')

const flatten = require('./flatten.js')

const LIMIT = 30

const createMarkdown = (items) => {
  const all = items.map(({ filename, caption, hashtags }) => [
    { h1: filename },
    {
      p: `${caption}\n•\r•\r•\n${hashtags
        .filter(Boolean)
        .map((tag) => tag.replace(/-/g, ''))
        .slice(0, LIMIT)
        .join(' ')}`
    },
    {
      p: `\`\`\`TRIMMED: ${hashtags
        .filter(Boolean)
        .slice(LIMIT, hashtags.length)
        .map((tag) => tag.replace(/-/g, ''))
        .join(' ')}\`\`\``
    }
  ])

  const flat = flatten(all)
  return json2md(flat)
}

const writeMarkdown = async (dest, data) => {
  const md = createMarkdown(data)
  await mkdirp(dest).then(() => {
    const spinner = ora().start()
    fs.writeFile(`${dest}/instagram.md`, md, 'utf8', () => {
      spinner.succeed(`New file: ${dest}/instagram.md`)
    })
  })
}

module.exports = {
  createMarkdown,
  writeMarkdown
}
