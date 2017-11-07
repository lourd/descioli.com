export const animationDelays = ({ numChildren, delta, start }) => {
  let str = '';
  for (let i = 1; i <= numChildren; i++) {
    str += `
      &:nth-child(${i}) {
        animation-delay: ${start + (i - 1) * delta}s;
      }
    `;
  }
  return str;
};

/**
 * Helpful for lazy started animations & styled components
 */
export const ifSeen = cssValue => props =>
  'seen' in props && !props.seen ? null : cssValue;
