/* eslint-disable @typescript-eslint/no-var-requires */
const { createPost } = require('./createPost.js')

const create = (data) => data.map(createPost)

exports.create = create
