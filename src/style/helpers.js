import { css } from 'styled-components';

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

const topShadow = index => {
  const primaryOffset = [1.5, 3, 10, 14, 19][index];
  const blur = [1.5, 3, 10, 14, 19][index] * 4;
  const alpha = [0.12, 0.16, 0.19, 0.25, 0.3][index];
  return `0px ${primaryOffset}px ${blur}px rgba(0, 0, 0, ${alpha})`;
};

const bottomShadow = index => {
  const primaryOffset = [1.5, 3, 6, 10, 15][index];
  const blur = [1, 3, 3, 5, 6][index] * 4;
  const alpha = [0.24, 0.23, 0.23, 0.22, 0.22][index];
  return `0px ${primaryOffset}px ${blur}px rgba(0, 0, 0, ${alpha})`;
};

export const shadow = elevation => {
  let str = '';
  if (elevation < 1) {
    str = 'none';
  } else if (elevation > 5) {
    throw new Error(`Invalid elevation ${elevation} for shadow helper`);
  } else str = `${bottomShadow(elevation - 1)}, ${topShadow(elevation - 1)}`;
  return css`
    box-shadow: ${str};
  `;
};
