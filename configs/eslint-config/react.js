module.exports = {
    extends: ['react-app', 'react-hooks', 'react-app/jest', 'plugin:jsx-a11y/recommended'],
    plugins: ['jsx-a11y'],
    rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }],
        'react/jsx-fragments': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    }
};
