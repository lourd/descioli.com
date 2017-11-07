import Seen from 'lib/components/Seen';
import React, { Component } from 'react';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import colors from 'style/colors';
import styled from 'styled-components';

import birdFlyingKeyframes from './birdFlyingKeyframes';
import { fadeUpInCss } from './TopPanel';

const MovingBird = styled.a`
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 20px;
  font-size: 0.7em;
  color: ${colors.twitter};
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
