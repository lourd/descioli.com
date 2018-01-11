import React, { Component } from 'react';
import styled from 'styled-components';

import sizes from 'style/sizes';
import { fadeDownInCss } from 'style/snippets';
import Bylines from './Bylines';
import headerImg from './header.jpg';
import MovingImgBackground from './MovingImgBackground';

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

const TopPanel = props => (
  <Panel>
    <MovingImgBackground img={headerImg} />
    <TextContainer>
      <Name delay={0.2}>Louis R. DeScioli</Name>
      <Bylines bylines={props.bylines} delay={2} interval={5} />
    </TextContainer>
  </Panel>
);

export default TopPanel;
