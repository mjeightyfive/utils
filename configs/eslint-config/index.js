module.exports = {
    extends: ['plugin:jest/recommended', 'prettier', './es.js'],
    plugins: ['prettier', 'jest'],
    env: {
        node: true,
        es6: true,
        'jest/globals': true
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        indent: ['error', 4, { SwitchCase: 1 }],
        // 'comma-dangle': ['error', 'never'],
        'key-spacing': ['error', { afterColon: true, beforeColon: false }],
        'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
        'max-len': ['off'],
        'eol-last': ['error', 'always'],
        // import
        'import/extensions': ['error', 'always', { ignorePackages: true }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
    }
};
