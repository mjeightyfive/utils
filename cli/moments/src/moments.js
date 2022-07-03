import fs from 'fs'

import ora from 'ora'
import dayjs from 'dayjs'
import subdirs from 'subdirs'

const moments = (path) => {
  if (!path) {
    throw new Error('No path specified.')
  }

  return new Promise((resolve) => {
    return subdirs(path, 0, (err, dirs) => {
      if (!dirs) {
        return
      }

      if (err) throw Error('Error: ', err)

      dirs.forEach((dir) => {
        const session = dir.replace(`${path}/`, '')
        const parts = session.split(',')
        const names = parts.slice(0, -1)
        const date = dayjs(parts[parts.length - 1].trim()).format('YYYY-MM-DD')
        const formatted = names.length < 1 ? date : `${date} - ${names.join()}`

        fs.rename(dir, `${path}/${formatted}`, (error) => {
          const spinner = ora(session).start()

          if (error) {
            console.error(error) // eslint-disable-line no-console
            spinner.fail(session)
          }

          spinner.succeed(formatted)
          resolve(formatted)
        })
      })
    })
  })
}

export default moments
