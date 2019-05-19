import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import TextCarousel from 'components/TextCarousel';
import { Bag } from 'lib/Bag';
import useInterval from 'hooks/useInterval';
import { fadeDownInCss } from 'style/snippets';

const BylinesContainer = styled.h2<{
  delay: number;
}>`
  font-size: 2.2em;
  font-weight: 300;
  ${fadeDownInCss};
  animation-delay: ${props => props.delay}ms;
`;

interface Props {
  bylines: string[];
  delay: number;
  interval: number;
}

function Bylines(props: Props) {
  const [byline, setByline] = useState(props.bylines[0]);
  const bag = useRef(new Bag(props.bylines.length));
  const change = useCallback(() => {
    setByline(props.bylines[bag.current.grab()]);
  }, []);
  useInterval({ delay: props.delay, interval: props.interval, tick: change });
  return (
    <BylinesContainer delay={props.delay}>
      <TextCarousel childKey={byline}>{byline}</TextCarousel>
    </BylinesContainer>
  );
}

export default Bylines;
