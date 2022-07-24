#!/usr/bin/env node
'use strict' // eslint-disable-line strict

// This cannot be ESM until https://github.com/vadimdemedes/import-jsx/issues/15 is fixed.
/* eslint-disable @typescript-eslint/no-var-requires, n/no-unpublished-require */
const { resolve } = require('path')
const meow = require('meow')
const importJsx = require('import-jsx')
const React = require('react')
const { render } = require('ink')

const ui = importJsx('./lib/ui/ui.jsx')
const { searchDB } = require('./lib/db/db.js')
const { writeMarkdown } = require('./lib/utils/markdown.js')

const cli = meow(
  `
  Usage
    $ instags -db

  Options
    --database, -db   Use static data from a collection of hashtags

  Examples
    $ instags --db
`,
  {
    flags: {
      database: {
        type: 'boolean',
        alias: 'db'
      }
    }
  }
)

const path = cli.input[0] || '.'
const dest = resolve(path)

const main = async () => {
  if(!cli.flags.database) {
    console.log('\nOnly `instags --db` is supported at the moment')
    return
  }

  if (cli.flags.database) {
    const data = await searchDB(path)
    await writeMarkdown(dest, data)

    return
  }

  const data = []
  const app = render(
    React.createElement(ui, {
      test: cli.flags.test,
      data
    })
  )
  await app.waitUntilExit()
}

main()
