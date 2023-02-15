module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'n/no-missing-import': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        pattern: {
          ts: 'never',
          tsx: 'never'
        }
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
}
