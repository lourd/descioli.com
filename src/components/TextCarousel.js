import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import { fadeInFrom, fadeOutTo } from 'style/animations';

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

const TextCarousel = props => (
  <TransitionGroup component={CarouselContainer}>
    <Transition key={props.childKey} timeout={1000}>
      {state => <CarouselItem className={state}>{props.children}</CarouselItem>}
    </Transition>
  </TransitionGroup>
);

TextCarousel.propTypes = {
  delay: PropTypes.number,
  childKey: PropTypes.any.isRequired,
  children: PropTypes.node
};

export default TextCarousel;
