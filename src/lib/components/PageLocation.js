import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import clamp from 'lib/clamp';
import windowMoved from 'lib/windowMoved';

class PageLocation extends Component {
  state = {
    position: 0
  };

  componentDidMount() {
    this.frame = requestAnimationFrame(this.update);
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
    this.frame = requestAnimationFrame(this.update);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
  }

  render() {
    return this.props.render(this.state.position);
  }
}

export default PageLocation;
