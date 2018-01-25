import { knuthShuffle as shuffle } from 'knuth-shuffle'

class Bag {
  indices = []
  index = 0

  constructor(numKeys) {
    this.numKeys = numKeys
    this.fill()
  }

  fill(numKeys) {
    if (typeof numKeys !== 'undefined') {
      this.numKeys = numKeys
    }
    const indices = [
      ...Array(this.numKeys)
        .fill(true)
        .map((bool, i) => i),
    ]
    shuffle(indices)
    this.indices = indices
    this.index = 0
  }

  grab() {
    if (this.indices.length === 0) return
    if (this.index === this.indices.length) {
      this.fill()
    }
    const result = this.indices[this.index]
    this.index++
    return result
  }
}

export default Bag
