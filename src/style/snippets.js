import { fadeIn, fadeUpIn } from 'style/animations';
import { ifSeen } from 'style/helpers';
import { css } from 'styled-components';

export const fadeUpInCss = css`
  opacity: 0;
  animation: ${ifSeen(`${fadeUpIn} 1.2s forwards`)};
`;

export const fadeInCss = css`
  opacity: 0;
  animation: ${ifSeen(`${fadeIn} 1.2s forwards`)};
`;
