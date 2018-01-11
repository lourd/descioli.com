import React from 'react';
import styled from 'styled-components';
import { fadeDownInCss } from 'style/snippets';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fadeInFrom, fadeOutTo } from 'style/animations';
import RandomInt from 'lib/components/RandomInt';

const BylinesContainer = styled.h2`
  ${fadeDownInCss};
  font-size: 2.2em;
  font-weight: 300;
  animation-delay: ${props => props.delay}s;
  position: relative;
`;

const Byline = styled.span`
  position: absolute;
  max-width: 85vw;
  &.anim-enter-active {
    animation: ${fadeInFrom({ x: 15, y: -25 })} 0.8s forwards;
  }
  &.anim-exit-active {
    animation: ${fadeOutTo({ x: 5, y: 20 })} 0.6s forwards;
  }
`;

const Bylines = props => (
  <RandomInt
    max={props.bylines.length}
    delay={props.delay}
    render={num => (
      <BylinesContainer
        delay={props.delay}
        title="Things that I am or have been"
      >
        <TransitionGroup>
          <CSSTransition key={num} timeout={1000} classNames="anim">
            <Byline>{props.bylines[num].text}</Byline>
          </CSSTransition>
        </TransitionGroup>
      </BylinesContainer>
    )}
  />
);

export default Bylines;
