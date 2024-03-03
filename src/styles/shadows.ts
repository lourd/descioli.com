/**
 * Computes a top-shadow for an elevation effect.
 * @param elevation - elevation level
 */
function topShadow(elevation: number): string {
  const offset = [1.5, 3, 10, 14, 19][elevation]
  const blur = [1.5, 3, 10, 14, 19][elevation] * 4
  const color = [0.12, 0.16, 0.19, 0.25, 0.3][elevation]
  return `0 ${offset}px ${blur}px rgba(0,0,0, ${color})`
}

/**
 * Computes a bottom-shadow for an elevation effect.
 * @param  elevation - elevation level
 */
function bottomShadow(elevation: number): string {
  const offset = [1.5, 3, 6, 10, 15][elevation] * 1
  const blur = [1, 3, 3, 5, 6][elevation] * 4
  const color = [0.24, 0.23, 0.23, 0.22, 0.22][elevation]
  return `0 ${offset}px ${blur}px rgba(0,0,0, ${color})`
}

/**
 * Gives a elevation effect.
 * @param elevation - elevation level (between 1 and 5)
 * @link http://www.google.com/design/spec/layout/layout-principles.html#layout-principles-dimensionality Google Design
 */
export function elevate(elevation: number): string {
  if (elevation >= 5 || elevation < 1) {
    throw new Error(`Invalid elevation ${elevation}`)
  }
  return `${bottomShadow(elevation - 1)}, ${topShadow(elevation - 1)};`
}

export function shadows({
  startingElevation = 1,
  transition = 200,
} = {}): string {
  return `
      transition: box-shadow ${transition}ms;
      ${elevate(startingElevation)};
      &:hover,
      &:focus {
        ${elevate(startingElevation + 1)};
      }
      &:active {
        ${elevate(startingElevation + 2)};
      }
    `
}
