import { keyframes } from "styled-components";

interface Coords {
  x: number;
  y: number;
}

export const fadeInFrom = ({ x, y }: Coords) => keyframes`
  from {
    transform: translate3d(${x}px, ${y}px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`;

export const fadeOutTo = ({ x, y }: Coords) => keyframes`
  from {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
  to {
    transform: translate3d(${x}px, ${y}px, 0);
    opacity: 0;
  }
`;

interface FloatControls {
  /** 0 to 1 */
  from: number;
  /** 0 to 1 */
  to: number;
}

export const fade = ({ to = 1, from }: FloatControls) => keyframes`
  from {
    opacity: ${from};
  }
  to {
    opacity: ${to};
  }
`;

export const scaleFromTo = ({ from = 1, to = 0.7 } = {}) => keyframes`
  0%, 100% {
    transform: scale(${from});
  }
  10%, 90% {
    transform: scale(${to});
  }
`;

export const fadeUpIn = fadeInFrom({ x: 0, y: 10 });

export const fadeDownIn = fadeInFrom({ x: 0, y: -10 });

export const fadeIn = fade({ from: 0, to: 1 });

export const fadeOut = fade({ from: 1, to: 0 });
