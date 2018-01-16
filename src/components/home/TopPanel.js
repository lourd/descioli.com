import React, { Component } from 'react';
import styled from 'styled-components';

import sizes from 'style/sizes';
import { fadeDownInCss } from 'style/snippets';
import { fadeIn } from 'style/animations';
import MovingImgBackground from 'components/MovingImgBackground';
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

const TextContainer = styled.div`
  text-align: left;
  font-size: 0.8em;
  padding: 10% 5% 0px 5%;
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

const CTA = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  font-size: 1.5em;
  opacity: 0;
  animation: ${fadeIn} 1.2s forwards;
  animation-delay: ${props => props.delay}s;
  @media (max-width: ${sizes.smallMax}) {
    max-width: 70vw;
  }
  h4 {
    font-weight: lighter;
    margin-bottom: 5px;
    font-size: 1.3em;
  }
  h3 {
    font-size: 2em;
    transition: transform 250ms;
  }
  a {
    color: white;
    text-decoration: none;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const TopPanel = props => (
  <Panel>
    <MovingImgBackground img={headerImg} delay={1} />
    <TextContainer>
      <Name delay={0.2}>Louis R. DeScioli</Name>
      <Bylines bylines={props.bylines} delay={1.8} interval={3} />
      <CTA delay={2.5}>
        <h4>Play with my latest creation</h4>
        <h3>
          <a
            href="https://itunes.apple.com/us/app/out-here-archery/id1309822636?mt=8"
            target="_blank"
          >
            Out Here Archery
          </a>
        </h3>
      </CTA>
    </TextContainer>
  </Panel>
);

export default TopPanel;
