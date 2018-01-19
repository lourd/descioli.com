import { css } from 'styled-components';

export const breakpoints = {
  small: 481,
  medium: 768,
  large: 1025,
  xl: 1281,
  xxl: 1440,
  xxxl: 1601
};

/**
 * Produces small, smallMax, medium, mediumMax, etc. using ems for
 * units because it's more consistent across all resolutions and
 * browsers for correct responsiveness
 */
const sizes = Object.keys(breakpoints).reduce((acc, key, i, keys) => {
  acc[key] = `${breakpoints[key] / 16}em`;
  if (i > 0) {
    const lastKey = keys[i - 1];
    acc[`${lastKey}Max`] = `${(breakpoints[key] - 1) / 16}em`;
  }
  return acc;
}, {});

export default sizes;
