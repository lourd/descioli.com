import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fadeInFrom, fadeOutTo } from 'style/animations';

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselItem = styled.span`
  position: absolute;
  &.anim-enter-active {
    animation: ${fadeInFrom({ x: 15, y: -25 })} 0.8s forwards;
  }
  &.anim-exit-active {
    animation: ${fadeOutTo({ x: 5, y: 20 })} 0.6s forwards;
  }
`;

const TextCarousel = props => (
  <TransitionGroup component={CarouselContainer}>
    <CSSTransition key={props.childKey} timeout={1000} classNames="anim">
      <CarouselItem>{props.children}</CarouselItem>
    </CSSTransition>
  </TransitionGroup>
);

TextCarousel.propTypes = {
  delay: PropTypes.number,
  childKey: PropTypes.any.isRequired,
  children: PropTypes.node
};

export default TextCarousel;
