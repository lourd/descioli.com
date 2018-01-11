import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import { fadeUpInCss } from 'style/snippets';
import { shadow } from 'style/helpers';
import { media, breakpoints } from 'style/sizes';
import wrapInSeen from 'lib/hoc/wrapInSeen';
import windowMoved from 'lib/windowMoved';
import clamp from 'lib/clamp';

const Container = styled.div`
  background-color: white;
  ${media.large`
    padding-bottom: 40px;
  `};
`;

const Inner = styled.section`
  height: 70vh;
  min-height: 500px;
  width: 100%;
  max-width: ${breakpoints.large}px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  color: white;
  padding: 0px 2.5%;
  position: relative;
  z-index: 1;
`;

const BgImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  z-index: -1;
  ${media.large`
    border-radius: 10px;
    ${shadow(2)};
    transition: box-shadow 200ms;
    &:hover {
      ${shadow(3)};
    }
  `};
`;

const Title = wrapInSeen(styled.h1`
  text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.7);
  max-width: 800px;
  ${fadeUpInCss};
  font-size: 2.3em;
  ${media.medium`
  font-size: 3.5em;
  `};
`);

/**
 * Passing an object to the render prop with properties:
 *  position: 0 to 1, representing where the element is relative to to the
 *      visible screen. 1 for bottom and below, 0 for top and above.
 */
class PageLocation extends Component {
  state = {
    position: 0
  };

  componentDidMount() {
    this.loop = requestAnimationFrame(this.update);
  }

  update = timestamp => {
    if (windowMoved(timestamp)) {
      const el = findDOMNode(this);
      const top = el.getBoundingClientRect().top;
      const height = el.getBoundingClientRect().height;
      const middle = top + height / 2;
      const position = clamp(middle / window.innerHeight, 0, 1);
      this.setState({ position });
    }
    this.loop = requestAnimationFrame(this.update);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.loop);
  }

  render() {
    return this.props.render(this.state.position);
  }
}

export default class ProjectPanel extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired
  };

  render() {
    return (
      <Container>
        <Inner>
          <PageLocation
            render={t => {
              // const saturation = (1 - t) * 2;
              const float = t < 0.5 ? 2 * t : -2 * (t - 1);
              return (
                <BgImg
                  img={this.props.img}
                  style={{ filter: `saturate(${float * 100}%)` }}
                />
              );
            }}
          />
          <Title>{this.props.copy}</Title>
        </Inner>
      </Container>
    );
  }
}
