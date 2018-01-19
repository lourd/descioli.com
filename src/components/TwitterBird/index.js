import React, { Component } from 'react';
import styled from 'styled-components';
import TwitterIcon from 'react-icons/lib/fa/twitter';

import Seen from 'lib/components/Seen';
import { fadeUpInCss } from 'style/snippets';
import birdFlyingKeyframes from './birdFlyingKeyframes';

const MovingBird = styled.a`
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 20px;
  font-size: 0.7em;
  color: ${props => props.theme.twitter};
  opacity: 1;
  transition: opacity 200ms;
  animation: ${birdFlyingKeyframes} 13s infinite;
  &:hover {
    opacity: 0.5;
  }
`;

const MovingBirdContainer = styled.div`
  ${fadeUpInCss};
  font-size: 6em;
  height: 100px;
  margin-top: 100px;
`;

export default class TwitterBird extends Component {
  render() {
    return (
      <Seen
        render={seen => (
          <MovingBirdContainer seen={seen}>
            <MovingBird href="https://twitter.com/louisdescioli">
              <TwitterIcon />
            </MovingBird>
          </MovingBirdContainer>
        )}
      />
    );
  }
}
