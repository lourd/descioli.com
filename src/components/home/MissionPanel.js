import wrapInSeen from 'lib/hoc/wrapInSeen';
import React, { Component } from 'react';
import colors from 'style/colors';
import { media } from 'style/sizes';
import { fadeUpInCss } from 'style/snippets';
import styled from 'styled-components';

import LetterCarousel from './LetterCarousel';
import { SpacedAnimatedText } from './TopPanel';

export const Container = styled.div`
  background-color: white;
  color: ${colors.black};
  padding: 0px 2.5%;
  display: flex;
  justify-content: center;
`;

const Line1 = wrapInSeen(SpacedAnimatedText.extend`
  letter-spacing: -5px;
  font-size: 5em;
  ${media.large`
    font-size: 6em;
  `};
  width: 100%;
  line-height: 0.9;
  text-align: center;
  position: relative;
`);

const Icon = styled.span`
  position: relative;
  text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5);
  ${media.mediumOnly`
    margin-top: 25px;
    display: inline-block;
    font-size: 1.2em;
  `};
`;

const BigIcon = Icon.extend`
  ${media.medium`
    margin-left: 25px;
    margin-top: 30px;
    top: -5px;
    font-size: 0.6em;
  `};
`;

const Inner = styled.div`
  margin: 50px 0px 30px;
`;

export default function MissionPanel() {
  return (
    <Container>
      <Inner>
        <Line1>
          I make software
          <BigIcon>
            <LetterCarousel letters={['☁️', '📱', ' 💻', '👾']} />
          </BigIcon>
        </Line1>
      </Inner>
    </Container>
  );
}
