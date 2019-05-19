const breakpoints = {
  small: 481,
  medium: 768,
  large: 1025,
  xl: 1281,
  xxl: 1440,
  xxxl: 1601,
};

const sizes = {
  small: `${breakpoints.small / 16}rem`,
  smallMax: `${(breakpoints.medium - 1) / 16}rem`,
  medium: `${breakpoints.medium / 16}rem`,
  mediumMax: `${(breakpoints.large - 1) / 16}rem`,
  large: `${breakpoints.large / 16}rem`,
  largeMax: `${(breakpoints.xl - 1) / 16}rem`,
  xl: `${breakpoints.xl / 16}rem`,
  xlMax: `${(breakpoints.xxl - 1) / 16}rem`,
  xxl: `${breakpoints.xxl / 16}rem`,
  xxlMax: `${(breakpoints.xxxl - 1) / 16}rem`,
  xxxl: `${breakpoints.xxxl / 16}rem`,
};

export { breakpoints, sizes };
export default sizes;
