import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RandomInt from 'lib/components/RandomInt';
import TextCarousel from 'components/TextCarousel';
import { fadeDownInCss } from 'style/snippets';

const BylinesContainer = styled.h2`
  font-size: 2.2em;
  font-weight: 300;
  max-width: 85vw;
  ${fadeDownInCss};
  animation-delay: ${props => props.delay}s;
`;

const Bylines = props => (
  <BylinesContainer title="Things that I am or have been" delay={props.delay}>
    <RandomInt
      max={props.bylines.length}
      interval={props.interval}
      delay={props.delay + props.interval}
      render={num => (
        <TextCarousel childKey={num}>{props.bylines[num]}</TextCarousel>
      )}
    />
  </BylinesContainer>
);

Bylines.propTypes = {
  bylines: PropTypes.arrayOf(PropTypes.string).isRequired,
  delay: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired
};

export default Bylines;
