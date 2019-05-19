import { fadeIn, fadeUpIn, fadeDownIn } from "style/animations";
import { ifSeen } from "style/helpers";
import { css } from "styled-components";

export const fadeUpInCss = css`
  opacity: 0;
  animation: ${ifSeen(
    css`
      ${fadeUpIn} 1.2s forwards
    `
  )};
`;

export const fadeDownInCss = css`
  opacity: 0;
  animation: ${ifSeen(
    css`
      ${fadeDownIn} 1.2s forwards
    `
  )};
`;

export const fadeInCss = css`
  opacity: 0;
  animation: ${ifSeen(
    css`
      ${fadeIn} 1.2s forwards
    `
  )};
`;

/**
 * Computes a top-shadow for an elevation effect.
 * @param {Number} elevation - elevation level
 * @return {String}
 */
function topShadow(elevation) {
  const offset = [1.5, 3, 10, 14, 19][elevation];
  const blur = [1.5, 3, 10, 14, 19][elevation] * 4;
  const color = [0.12, 0.16, 0.19, 0.25, 0.3][elevation];
  return `0 ${offset}px ${blur}px rgba(0,0,0, ${color})`;
}

/**
 * Computes a bottom-shadow for an elevation effect.
 * @param  {Number} elevation - elevation level
 * @return {String}
 */
function bottomShadow(elevation) {
  const offset = [1.5, 3, 6, 10, 15][elevation] * 1;
  const blur = [1, 3, 3, 5, 6][elevation] * 4;
  const color = [0.24, 0.23, 0.23, 0.22, 0.22][elevation];
  return `0 ${offset}px ${blur}px rgba(0,0,0, ${color})`;
}

/**
 * Gives a elevation effect.
 * @param {Number} $elevation - elevation level (between 1 and 5)
 * @link http://www.google.com/design/spec/layout/layout-principles.html#layout-principles-dimensionality Google Design
 */
export function elevate($elevation) {
  if ($elevation < 1) {
    return css`
      box-shadow: none;
    `;
  } else if ($elevation > 5) {
    console.warn(`Invalid $elevation ${$elevation}`);
  } else {
    return `
      box-shadow: ${bottomShadow($elevation)}, ${topShadow($elevation)};
    `;
  }
}

export function shadows({ startingElevation = 1, transition = 200 } = {}) {
  return css`
    transition: box-shadow ${transition}ms;
    ${elevate(startingElevation)};
    &:hover,
    &:focus {
      ${elevate(startingElevation + 1)};
    }
    &:active {
      ${elevate(startingElevation + 2)};
    }
  `;
}

export const stretchFull = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
