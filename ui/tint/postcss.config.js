module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-env-function')({
            importFrom: './postcss.env.js'
        }),
        require('precss')()
    ]
};
