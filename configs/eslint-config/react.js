module.exports = {
  root: true,
  globals: {
    JSX: 'readonly'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['react-app', 'react-app/jest', 'plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }],
    'react/jsx-fragments': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
