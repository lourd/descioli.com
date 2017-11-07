import { css } from "styled-components";

const breakpoints = {
  small: 481,
  medium: 768,
  large: 1025,
  xl: 1281,
  xxl: 1601
};

// Iterate through the sizes and create a media template
const media = Object.keys(breakpoints).reduce((acc, key) => {
  // Makes a rule for the minimum width, using mobile-first approach
  acc[key] = (...args) => css`
    @media (min-width: ${breakpoints[key] / 16}em) {
      ${css(...args)};
    }
  `;
  // Makes a rule for using max-width, in cases where it's needed
  acc[`${key}Only`] = (...args) => css`
    @media (max-width: ${(breakpoints[key] - 1) / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export { breakpoints, media };
