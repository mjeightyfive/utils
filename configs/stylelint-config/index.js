module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['include', 'media', 'mixin']
            }
        ],
        'color-named': 'always-where-possible',
        'declaration-no-important': true,
        indentation: 4,
        'string-quotes': 'single'
    }
};
