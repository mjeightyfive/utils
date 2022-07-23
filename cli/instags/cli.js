#!/usr/bin/env node
'use strict' // eslint-disable-line @typescript-eslint/no-var-requires, strict

// This cannot be ESM until https://github.com/vadimdemedes/import-jsx/issues/15 is fixed.

const meow = require('meow') // eslint-disable-line @typescript-eslint/no-var-requires
const importJsx = require('import-jsx') // eslint-disable-line @typescript-eslint/no-var-requires
const React = require('react') // eslint-disable-line @typescript-eslint/no-var-requires
const { render } = require('ink') // eslint-disable-line @typescript-eslint/no-var-requires

const ui = importJsx('./ui.jsx')

const cli = meow(
  `
  Usage
    $ instags
    $ instags > file

  Options
    --test, -t   Description

  Examples
    $ instags --test > file && cat file
`,
  {
    flags: {
      test: {
        type: 'boolean',
        alias: 't'
      }
    }
  }
)

const main = async () => {
  const app = render(
    React.createElement(ui, {
      test: cli.flags.test
    })
  )

  await app.waitUntilExit()
}

main()
