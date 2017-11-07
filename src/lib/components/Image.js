import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Seen from 'lib/components/Seen';
import styled from 'styled-components';

const ImageHolder = styled.div`
  position: relative;
`;

const ImageActual = styled.img`
  opacity: ${props => (props.loaded ? 1 : 0)};
  transition: opacity 1s ease;
`;

class FadeInImage extends Component {
  state = {
    loaded: false
  };

  onImgLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    return (
      <ImageActual
        {...this.props}
        onLoad={this.onImgLoad}
        loaded={this.state.loaded}
      />
    );
  }
}

class LazyImage extends Component {
  render() {
    return (
      <Seen
        render={seen => (
          <ImageHolder>
            {seen ? <FadeInImage {...this.props} /> : null}
          </ImageHolder>
        )}
      />
    );
  }
}

export default LazyImage;
