import PageLocation from 'lib/components/PageLocation';
import wrapInSeen from 'lib/hoc/wrapInSeen';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { shadow } from 'style/helpers';
import sizes from 'style/sizes';
import { fadeUpInCss } from 'style/snippets';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  @media (min-width: ${sizes.large}) {
    padding-bottom: 40px;
  }
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
  @media (min-width: ${sizes.large}) {
    border-radius: 10px;
    ${shadow(2)};
    transition: box-shadow 200ms;
    &:hover {
      ${shadow(3)};
    }
  }
`;

const Title = wrapInSeen(styled.h1`
  text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.7);
  max-width: 800px;
  ${fadeUpInCss};
  font-size: 2.3em;
  @media (min-width: ${sizes.medium}) {
    font-size: 3.5em;
  }
`);

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
