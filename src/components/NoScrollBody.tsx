import React from 'react';
import { Global, css } from '@emotion/core';
import BodyClass from './BodyClass';

export default function NoScrollBody() {
  return (
    <>
      <Global
        styles={css`
          .noScroll {
            overflow: hidden;
          }
        `}
      />
      <BodyClass className="noScroll" />
    </>
  );
}
