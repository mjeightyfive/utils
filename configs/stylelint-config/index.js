module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'color-named': 'always-where-possible',
        'declaration-no-important': true,
        indentation: 4,
        'string-quotes': 'single',
        'alpha-value-notation': 'number',
        'custom-property-empty-line-before': null,
        'value-keyword-case': null,
        'declaration-colon-newline-after': null,
        'value-list-comma-newline-after': null,
        'max-line-length': 140,
        'number-max-precision': 5,
        'selector-pseudo-class-no-unknown': null
    }
};
