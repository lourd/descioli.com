import React from 'react';

class OnInterval extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(
      this.tick,
      (this.props.delay + this.props.interval) * 1000
    );
  }

  tick = () => {
    this.props.tick();
    this.timer = setTimeout(this.tick, this.props.interval * 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.props.children;
  }
}

export default OnInterval;
