const flatten = (array = []) => (Array.isArray(array) ? [].concat(...array.map(flatten)) : array)

module.exports = flatten
