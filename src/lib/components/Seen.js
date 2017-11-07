import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import isElementInViewport from 'lib/isElementInViewport';
import PropTypes from 'prop-types';

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
    this.raf = window.requestAnimationFrame(this.checkForSeen);
  }

  checkForSeen = () => {
    let { seen } = this.state;
    // Don't do unnecessary calculations if page hasn't moved
    if (
      this.lastPosition !== window.pageYOffset ||
      this.lastWidth !== window.innerWidth ||
      this.lastHeight !== window.innerHeight
    ) {
      seen = isElementInViewport(findDOMNode(this), {
        within: this.props.within
      });
    }
    this.lastPosition = window.pageYOffset;
    this.lastWidth = window.innerWidth;
    this.lastHeight = window.innerHeight;
    if (seen) this.setState({ seen });
    else this.raf = window.requestAnimationFrame(this.checkForSeen);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  render() {
    return this.props.render(this.state.seen);
  }
}
