/**
 * Helpful for lazy started animations & styled components
 */
export const ifSeen = cssValue => props =>
  "seen" in props && !props.seen ? null : cssValue;
