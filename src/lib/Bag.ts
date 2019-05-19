import { knuthShuffle as shuffle } from 'knuth-shuffle';

/**
 * Creates an array where the values correspond to their index
 */
function range(size: number) {
  //return Array(n)].fill((_, i) => i);  // not working cause of some transpilation bug
  const indices = Array(size);
  for (let i = 0; i < indices.length; i++) {
    indices[i] = i;
  }
  return indices;
}

export class Bag {
  private indices: number[];
  private index = 0;

  /**
   * @param size number of possibilities in the bag. must be a positive integer
   */
  constructor(size: number) {
    this.indices = range(size);
    shuffle(this.indices);
  }

  grab() {
    // once end is reached, re-sort and start from the beginning
    if (this.index === this.indices.length) {
      shuffle(this.indices);
      this.index = 0;
    }
    const result = this.indices[this.index];
    this.index++;
    return result;
  }
}
