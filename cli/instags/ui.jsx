'use strict'

const React = require('react')
const { useEffect } = require('react')
const { Text, useApp, useStdout } = require('ink')

const EXIT_AFTER_MS = 2000

const App = () => {
  const { exit } = useApp()
  const { write } = useStdout()

  useEffect(() => {
    const timer = setTimeout(() => {
      write('test')
      exit()
    }, EXIT_AFTER_MS)
    return () => clearTimeout(timer)
  }, [])

  return <Text>Instags</Text>
}

module.exports = App
