import React from 'react';
import { css } from '@emotion/core';

import useMouseCoords from 'hooks/useMouseCoords';
import { fade } from 'style/animations';
import { stretchFull } from 'style/snippets';
import BodyClass from 'components/BodyClass';
import { useTheme } from 'lib/useTheme';

interface MovingImgBackgroundProps {
  img: string;
  delay: number;
}

interface MovingImageProps extends MovingImgBackgroundProps {
  dX: string;
  dY: string;
}

const MovingImage = (props: MovingImageProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        ${stretchFull};
        background-size: cover;
        background-image: url(${props.img});
        background-position: 75% center;
        z-index: -1;
        position: fixed;
        &:after {
          content: '';
          z-index: 1;
          ${stretchFull};
          background-color: ${theme.black};
          animation: ${fade({ from: 1, to: 0.25 })} forwards 1.2s;
          animation-delay: ${props.delay}ms;
        }
      `}
      style={{
        transform: `translate3d(${props.dX}, ${props.dY}, 0) scale(1.1)`,
      }}
    />
  );
};

const MovingImgBackground = (props: MovingImgBackgroundProps) => {
  const { x, y } = useMouseCoords();
  let xDist = 0;
  let yDist = 0;
  if (typeof window !== 'undefined') {
    const xd = x / window.innerWidth;
    const yd = y / window.innerHeight;
    [xDist, yDist] = [xd, yd].map(delta => 2.5 - delta * 5);
  }
  return (
    <>
      <MovingImage
        dX={`${xDist}%`}
        dY={`${yDist}%`}
        img={props.img}
        delay={props.delay}
      />
      {/* Firefox scroll bug workaround */}
      <BodyClass className="noScroll" />
    </>
  );
};

export default MovingImgBackground;
