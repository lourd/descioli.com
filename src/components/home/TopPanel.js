import React, { Component } from 'react';
import { fade } from 'style/animations';
import colors from 'style/colors';
import { stretchFull } from 'style/mixins';
import sizes from 'style/sizes';
import { fadeDownInCss } from 'style/snippets';
import styled, { keyframes } from 'styled-components';
import OnMouseMove from 'lib/components/OnMouseMove';
import Bylines from './Bylines';

import headerImg from './header.jpg';

const Panel = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
`;

const ImgBackground = styled.div.attrs({
  style: props => ({
    transform: `translate3d(${props.dX}, ${props.dY}, 0) scale(1.1)`
  })
})`
  ${stretchFull};
  background-image: url(${headerImg});
  background-size: cover;
  background-position: 75% center;
  z-index: -1;
  position: fixed;
  &:after {
    content: '';
    z-index: 1;
    ${stretchFull};
    background-color: ${colors.black};
    opacity: 1;
    animation: ${fade({ to: 0.25 })} 1s forwards 1.2s;
  }
`;

const TextContainer = styled.div`
  text-align: left;
  font-size: 0.8em;
  padding: 10% 0px 0px 5%;
  @media (min-width: ${sizes.medium}) {
    font-size: 1em;
    padding: 50px 0px 20px 50px;
  }
`;

const Name = styled.h1`
  ${fadeDownInCss};
  font-size: 4.5em;
  font-weight: lighter;
  letter-spacing: -1px;
  animation-delay: 0s;
  margin-bottom: 0;
  animation-delay: ${props => props.delay}s;
`;

const MovingImgBackground = () => (
  <OnMouseMove
    render={({ x, y }) => {
      const xd = x / window.innerWidth;
      const yd = y / window.innerHeight;
      const [xDist, yDist] = [xd, yd].map(delta => 2.5 - delta * 5);
      return <ImgBackground dX={`${xDist}%`} dY={`${yDist}%`} />;
    }}
  />
);

const TopPanel = props => (
  <Panel>
    <MovingImgBackground />
    <TextContainer>
      <Name delay={0.2}>Louis R. DeScioli</Name>
      <Bylines bylines={props.bylines} delay={2} interval={5} />
    </TextContainer>
  </Panel>
);

export default TopPanel;
