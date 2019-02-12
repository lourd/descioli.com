import { knuthShuffle as shuffle } from 'knuth-shuffle'

export class Bag {
  private indices: number[];
  private index = 0;

  constructor(numKeys: number) {
    // creates an array where the values correspond to their index
    this.indices = Array(length).fill(true).map((_, i) => i);
    shuffle(this.indices);
  }

  grab() {
    if (this.indices.length === 0) return
    // once end is reached, re-sort and start from the beginning
    if (this.index === this.indices.length) {
      shuffle(this.indices)
      this.index = 0;
    }
    const result = this.indices[this.index]
    this.index++
    return result
  }
}