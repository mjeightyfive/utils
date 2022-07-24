const getRandomN = (arr, n) => {
  let len = arr.length
  const result = new Array(n)
  const taken = new Array(len)

  if (n > len) {
    // console.log('getRandom: not enough tags')
    n = len
  }

  while (n--) {
    const x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

exports.getRandomN = getRandomN
