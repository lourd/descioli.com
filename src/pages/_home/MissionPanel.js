import wrapInSeen from 'lib/hoc/wrapInSeen';
import React, { Component } from 'react';
import colors from 'style/colors';
import { media } from 'style/sizes';
import styled from 'styled-components';

import LetterCarousel from './LetterCarousel';
import { fadeUpInCss, SpacedAnimatedText } from './TopPanel';

export const Container = styled.div`
  background-color: white;
  color: ${colors.black};
  padding: 0px 2.5%;
  display: flex;
  justify-content: flex-end;
`;

const Line1 = wrapInSeen(SpacedAnimatedText.extend`
  letter-spacing: -5px;
  animation-delay: 0.5s;
  font-size: 5em;
  ${media.large`
    font-size: 6em;
  `};
  width: 100%;
  line-height: 0.9;
  text-align: center;
  ${media.medium`
    text-align: right;
  `};
  position: relative;
`);

const Icon = styled.span`
  position: relative;
  text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5);
  ${media.mediumOnly`
    display: inline-block;
    font-size: 2em;
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
  margin: 50px 0px;
  ${media.medium`
  margin-right: 1%;
  `};
  ${media.large`
  margin-right: 8%;
  `};
  ${media.xl`
    margin-right: 17%;
  `};
`;

const BigLine = wrapInSeen(styled.span`
  font-size: 1.7em;
  ${fadeUpInCss};
  ${media.medium`
    font-size: 1.5em;
  `};
  ${media.large`
    max-width: 820px;
    font-size: 2em;
  `};
`);

let SmallLine = wrapInSeen(styled.span`
  position: relative;
  ${fadeUpInCss};
  ${media.smallOnly`
    display: block;
    margin-bottom: 10px;
  `};
  ${media.medium`
    left: -72px;
  `};
  ${media.large`
    left: -83px;
  `};
`);

const Block2 = styled.h2`
  text-align: center;
  line-height: 1.3;
  ${media.medium`
    text-align: right;
  `};
  ${Icon} {
    ${media.medium`
      font-size: 0.75em;
      top: -3px;
      margin-right: 7px;
      margin-left: 30px;
    `};
    ${media.large`
      margin-right: 4px;
    `};
  }
`;

// beginning plus delay
const d = i => 3 + i * 0.23;

const SoftwareIcons = () => (
  <BigIcon>
    <LetterCarousel letters={['☁️', '📱', ' 💻', '👾']} delay={d(0)} />
  </BigIcon>
);

const CommunityIcons = () => (
  <Icon>
    <LetterCarousel letters={['✊🏿', '✊🏾', '✊🏼', '🇺🇸']} delay={d(1)} />
  </Icon>
);

const NotOnSmall = styled.span`
  ${media.mediumOnly`
  display: none;
  `};
`;

const FamilyIcons = () => (
  <Icon>
    <LetterCarousel
      letters={['👶🏽', '👨‍👩‍👧‍👦', '👬', '👭']}
      delay={d(2)}
    />
  </Icon>
);

const NatureIcons = () => (
  <Icon>
    <LetterCarousel letters={['🌱', '🐟', '🌎', '🌍']} delay={d(3)} />
  </Icon>
);

const Row = wrapInSeen(styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-around;
  ${fadeUpInCss};
  ${media.medium`
    display: none;
  `};
`);

const IconRow = () => (
  <Row>
    <SoftwareIcons />
    <CommunityIcons />
    <FamilyIcons />
    <NatureIcons />
  </Row>
);

export default function MissionPanel() {
  return (
    <Container>
      <Inner>
        <Line1>
          I make software
          <NotOnSmall>
            <SoftwareIcons />
          </NotOnSmall>
        </Line1>
        <Block2>
          <SmallLine>
            that strengthens<br />
          </SmallLine>
          <BigLine>
            our communities
            <NotOnSmall>
              <CommunityIcons />
            </NotOnSmall>
          </BigLine>
          <br />
          <BigLine>
            our relationships
            <NotOnSmall>
              <FamilyIcons />
            </NotOnSmall>
          </BigLine>
          <br />
          <BigLine>
            & our connection with Nature
            <NotOnSmall>
              <NatureIcons />
            </NotOnSmall>
          </BigLine>
          <IconRow />
        </Block2>
      </Inner>
    </Container>
  );
}
