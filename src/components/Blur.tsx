import React, { ReactNode } from 'react';
import { css } from '@emotion/core';

interface Props {
  blur?: number;
  transitionIn?: number;
  transitionOut?: number;
  blurred: boolean;
  children: ReactNode;
}

export default function Blur({
  blur = 10,
  transitionIn = 0.5,
  transitionOut = 0.25,
  blurred,
  children,
}: Props) {
  return (
    <div
      css={css`
        transition: filter ${blurred ? transitionIn : transitionOut}s;
        /* the 0px blur appears to prime chrome and safari for the transition,
        making for a smooth experience, but it causes a big perf hit on
        Firefox. Sorry, Firefox! */
        filter: blur(${blurred ? blur : 0}px);
        will-change: filter;
      `}
    >
      {children}
    </div>
  );
}
