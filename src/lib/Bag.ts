import { knuthShuffle as shuffle } from 'knuth-shuffle';
import range from './range';

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
