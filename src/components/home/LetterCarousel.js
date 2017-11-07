import wait from 'lib/wait';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const CarouselItem = styled.span`
  display: inline-block;
  transform: scale(${props => (props.inPlace ? 1 : 0)});
  transition: transform ${props => props.duration}s;
`;

class LetterCarousel extends Component {
  state = {
    index: 0,
    inPlace: true
  };
  static propTypes = {
    letters: PropTypes.array.isRequired,
    duration: PropTypes.number.isRequired,
    delay: PropTypes.number
  };

  static defaultProps = {
    duration: 1.1,
    iterationDelay: 7,
    delay: 0
  };

  componentDidMount() {
    this._timer = setTimeout(this.startTransition, this.props.delay * 1000);
  }

  startTransition = () => {
    this.setState({ inPlace: false });
    this._timer = setTimeout(this.updateIndex, this.props.duration / 2 * 1000);
  };

  updateIndex = () => {
    this.setState({
      index: this.getNextIndex(),
      inPlace: true
    });
    this._timer = setTimeout(
      this.startTransition,
      this.props.iterationDelay * 1000
    );
  };

  getNextIndex() {
    // return (this.state.index + 1) % this.props.letters.length;
    return Math.floor(Math.random() * this.props.letters.length);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  render() {
    return (
      <CarouselItem
        duration={this.props.duration / 2}
        inPlace={this.state.inPlace}
      >
        {this.props.letters[this.state.index]}
      </CarouselItem>
    );
  }
}

export default LetterCarousel;
