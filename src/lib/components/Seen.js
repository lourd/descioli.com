import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import isElementInViewport from 'lib/isElementInViewport';
import PropTypes from 'prop-types';
import windowMoved from 'lib/windowMoved';

export default class Seen extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    within: PropTypes.number
  };

  state = { seen: false };

  lastPosition = -1;
  innerWidth = -1;
  innerHeight = -1;

  componentDidMount() {
    this.frame = window.requestAnimationFrame(this.update);
  }

  update = timestamp => {
    let { seen } = this.state;
    // Don't do unnecessary calculations if page hasn't moved
    if (windowMoved(timestamp)) {
      seen = isElementInViewport(findDOMNode(this), {
        within: this.props.within
      });
    }
    if (seen) this.setState({ seen });
    else this.frame = window.requestAnimationFrame(this.update);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
  }

  render() {
    return this.props.render(this.state.seen);
  }
}
