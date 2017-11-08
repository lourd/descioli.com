import React, { Component } from 'react';
import { fade } from 'style/animations';
import colors from 'style/colors';
import { stretchFull } from 'style/mixins';
import { media } from 'style/sizes';
import { fadeUpInCss } from 'style/snippets';
import styled, { keyframes } from 'styled-components';
import OnMouseMove from 'lib/components/OnMouseMove';

import headerImg from './header.jpg';

const Panel = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
`;

const ImgBackground = styled.div`
  ${stretchFull};
  background-image: url(${headerImg});
  background-size: cover;
  background-position: center right;
  z-index: -1;
  position: fixed;
  &:after {
    content: '';
    z-index: 1;
    ${stretchFull};
    background-color: ${colors.black};
    opacity: 1;
    animation: ${fade({ to: 0.5 })} 1s forwards 3s;
  }
`;

const TextContainer = styled.div`
  text-align: left;
  ${media.mediumOnly`
    text-align: center;
  `};
`;

export const SpacedAnimatedText = styled.h1`
  letter-spacing: -2px;
  ${fadeUpInCss};
`;

const GiantText = SpacedAnimatedText.extend`
  font-size: 9.5em;
  margin-left: -6px;
  letter-spacing: -5px;
  animation-delay: 0.5s;
`;

const SubText = SpacedAnimatedText.extend`
  font-size: 5em;
  margin-top: -25px;
  animation-delay: 1s;
`;

const SubberText = SpacedAnimatedText.extend`
  font-size: 3em;
  margin-top: -25px;
  animation-delay: 1.5s;
`;

const EmojiText = SpacedAnimatedText.extend`
  font-size: 2.5em;
  margin-top: -15px;
  margin-left: -3px;
  animation-delay: 2s;
`;

const peaceSpin = keyframes`
  0%, 90%, 100% {
    transform: scaleX(1) rotate(0deg);
  }
  93%, 97% {
    transform: scaleX(-1) rotate(20deg);
  }
`;

const RotatingHand = styled.span`
  display: inline-block;
  animation: ${peaceSpin} 10s infinite;
`;

class MovingImgBackground extends Component {
  render() {
    return (
      <OnMouseMove
        render={({ x, y }) => {
          const xd = x / window.innerWidth;
          const yd = y / window.innerHeight;
          const [xDist, yDist] = [xd, yd].map(delta => 2.5 - delta * 5);
          return (
            <ImgBackground
              style={{
                transform: `translate3d(${xDist}%, ${yDist}%, 0) scale(1.1)`
              }}
            />
          );
        }}
      />
    );
  }
}

class TopPanel extends Component {
  render() {
    return (
      <Panel>
        <MovingImgBackground />
        <TextContainer>
          <GiantText>Hey.</GiantText>
          <SubText>It me</SubText>
          <SubberText>Lou</SubberText>
          <EmojiText>
            <RotatingHand>✌🏼</RotatingHand>
          </EmojiText>
        </TextContainer>
      </Panel>
    );
  }
}

export default TopPanel;
