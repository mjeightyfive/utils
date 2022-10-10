const { ESLint } = require('eslint')

const eslint = new ESLint()

test('load config in eslint to validate rule syntax is correct', async () => {
  const code = 'const foo = 1\nconst bar = function () {}\nbar(foo)\n'
  const [lintResult] = await eslint.lintText(code)
  expect(lintResult.errorCount).toBe(0)
})

test('import syntax is correct', async () => {
  const code = `import { foo } from './index.js'\nconsole.log(foo)\n`
  const [lintResult] = await eslint.lintText(code)
  expect(lintResult.errorCount).toBe(0)
})

test('async fn', async () => {
  const code = `;(async () => {})()\n`
  const [lintResult] = await eslint.lintText(code)
  expect(lintResult.errorCount).toBe(0)
})

test('key spacing', async () => {
  const code = `const obj = { foo: 42 }\nconsole.log(obj)\n`
  const [lintResult] = await eslint.lintText(code)
  expect(lintResult.errorCount).toBe(0)
})

test('comma dangle', async () => {
  const code = `const obj = { foo: 42, bar: 29, }\nconsole.log(obj)\n`
  const [lintResult] = await eslint.lintText(code)
  expect(lintResult.errorCount).toBe(1)
})

test('semi', async () => {
  const code = `const hi = 'hi';\nconsole.log(hi)\n`
  const [lintResult] = await eslint.lintText(code)
  expect(lintResult.errorCount).toBe(1)
})
