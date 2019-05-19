import React, { ReactNode } from "react";
import { findDOMNode } from "react-dom";
import isElementInViewport from "lib/isElementInViewport";
import windowMoved from "lib/windowMoved";

interface State {
  seen: boolean;
}

interface Props {
  within?: number;
  render: (seen: boolean) => ReactNode;
}

export default class Seen extends React.Component<Props, State> {
  state = { seen: false };

  lastPosition = -1;
  innerWidth = -1;
  innerHeight = -1;
  frame = -1;

  componentDidMount() {
    this.frame = window.requestAnimationFrame(this.update);
  }

  update = (timestamp: number) => {
    let { seen } = this.state;
    // Don't do unnecessary calculations if page hasn't moved
    if (windowMoved(timestamp)) {
      seen = isElementInViewport(findDOMNode(this) as Element, {
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
