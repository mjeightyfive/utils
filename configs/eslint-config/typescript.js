module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
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
