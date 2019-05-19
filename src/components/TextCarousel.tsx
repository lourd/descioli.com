import React, { ReactNode } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { fadeInFrom, fadeOutTo } from 'style/animations';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselItem = styled.span`
  position: absolute;
  &.entering {
    animation: ${fadeInFrom({ x: 15, y: -25 })} 0.8s forwards;
  }
  &.exiting {
    animation: ${fadeOutTo({ x: 5, y: 20 })} 0.6s forwards;
  }
`;

interface Props {
  childKey: React.Key;
  children: ReactNode;
}

function TextCarousel(props: Props) {
  return (
    <TransitionGroup component={CarouselContainer}>
      <Transition key={props.childKey} timeout={1000}>
        {state => (
          <CarouselItem className={state}>{props.children}</CarouselItem>
        )}
      </Transition>
    </TransitionGroup>
  );
}

export default TextCarousel;
