module.exports = {
    extends: ['next', 'prettier'],
    settings: {
        next: {
            rootDir: ['packages/*/']
        }
    },
    rules: {
        'no-html-link-for-pages': 'off'
    }
};
