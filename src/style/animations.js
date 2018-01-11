import { keyframes } from 'styled-components';

export const fadeInFrom = ({ x, y }) => keyframes`
  from {
    transform: translate3d(${x}px, ${y}px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`;

export const fadeOutTo = ({ x, y }) => keyframes`
  from {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
  to {
    transform: translate3d(${x}px, ${y}px, 0);
    opacity: 0;
  }
`;

export const fade = ({ to = 1, from }) => keyframes`
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
