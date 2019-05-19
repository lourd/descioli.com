/**
 * Creates an array where the values correspond to their index
 */
export default function range(size: number) {
  //return Array(n)].fill((_, i) => i);  // not working cause of some transpilation bug
  const indices = Array(size);
  for (let i = 0; i < indices.length; i++) {
    indices[i] = i;
  }
  return indices;
}
